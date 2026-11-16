const { F } = require("../../utils/mp.js");

Page({
  data: {
    ready: false,
    title: "",
    exName: "",
    exIndex: 0,
    exTotal: 0,
    setIndex: 0,
    setTotal: 0,
    weight: 0,
    reps: 0,
    isTimed: false,
    duration: 30,
    doneSets: 0,
    rpe: 0,
    finished: false
  },

  async onLoad(query) {
    this.id = query.id;
    this.session = await F.getSession(this.id);
    const plan = await F.getActivePlan();
    this.plan = plan;
    if (!this.session) {
      wx.showToast({ title: "训练不存在", icon: "none" });
      return;
    }
    this.day = plan && plan.days ? plan.days.find((d) => d.id === this.session.planDayId) : null;
    this.render();
  },

  plannedSet(exIndex, setIndex) {
    const item = this.day && this.day.items[exIndex];
    if (!item || !item.sets) return null;
    return item.sets[Math.min(setIndex, item.sets.length - 1)] || null;
  },

  render() {
    const s = this.session;
    const logs = s.logs || [];
    let exIndex = 0, setIndex = 0, found = false;
    for (let i = 0; i < logs.length; i++) {
      const pending = logs[i].sets.findIndex((x) => x.status === "planned");
      if (pending >= 0) { exIndex = i; setIndex = pending; found = true; break; }
    }
    const doneSets = logs.reduce((a, l) => a + l.sets.filter((x) => x.status === "done").length, 0);

    if (!found) {
      this.setData({ ready: true, finished: true, title: s.title, doneSets });
      return;
    }

    const log = logs[exIndex];
    const ex = F.EXERCISE_MAP[log.exerciseId];
    const planned = this.plannedSet(exIndex, setIndex) || {};
    this.current = { exIndex, setIndex };
    this.setData({
      ready: true,
      finished: false,
      title: s.title,
      exName: ex ? ex.name : log.exerciseId,
      exIndex,
      exTotal: logs.length,
      setIndex,
      setTotal: log.sets.length,
      isTimed: !!planned.durationSec,
      duration: planned.durationSec || 30,
      weight: planned.weightKg || 0,
      reps: planned.repsMin || 10,
      doneSets,
      rpe: 0
    });
  },

  onWeight(e) { this.setData({ weight: Number(e.detail.value) || 0 }); },
  onReps(e) { this.setData({ reps: Number(e.detail.value) || 0 }); },
  onDuration(e) { this.setData({ duration: Number(e.detail.value) || 0 }); },
  setRpe(e) { this.setData({ rpe: Number(e.currentTarget.dataset.v) }); },

  async completeSet() {
    const s = this.session;
    const { exIndex, setIndex } = this.current;
    const set = s.logs[exIndex].sets[setIndex];
    const isTimed = this.data.isTimed;
    s.logs[exIndex].sets[setIndex] = Object.assign({}, set, {
      status: "done",
      completedAt: new Date().toISOString(),
      weightKg: isTimed ? undefined : (this.data.weight || undefined),
      reps: isTimed ? undefined : (this.data.reps || undefined),
      durationSec: isTimed ? this.data.duration : undefined,
      rpe: this.data.rpe || undefined
    });
    s.updatedAt = new Date().toISOString();
    this.session = await F.saveSession(s);
    this.render();
  },

  async skipSet() {
    const s = this.session;
    const { exIndex, setIndex } = this.current;
    s.logs[exIndex].sets[setIndex] = Object.assign({}, s.logs[exIndex].sets[setIndex], { status: "skipped" });
    s.updatedAt = new Date().toISOString();
    this.session = await F.saveSession(s);
    this.render();
  },

  async finish() {
    const s = this.session;
    const settled = s.logs.every((l) => l.sets.every((x) => x.status !== "planned"));
    s.status = settled ? "completed" : "abandoned";
    s.endedAt = new Date().toISOString();
    s.updatedAt = new Date().toISOString();
    await F.saveSession(s);
    await F.clearSessionUi();
    wx.showToast({ title: settled ? "训练已保存" : "已结束（未完成）", icon: "none" });
    wx.navigateBack();
  }
});
