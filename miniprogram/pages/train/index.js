const { F, boot, planInput, today } = require("../../utils/mp.js");

Page({
  data: {
    hasPlan: false,
    planName: "",
    rationale: "",
    days: [],
    venueName: "",
    inProgressId: ""
  },

  onShow() {
    this.load();
  },

  async load() {
    const { profile, venues } = await boot();
    const venue = venues.find((v) => v.isDefault) || venues[0];
    const plan = await F.getActivePlan();
    const sessions = await F.listSessions();
    const inProgress = sessions.find((s) => s.status === "in_progress");
    this._profile = profile;
    this._venue = venue;

    this.setData({
      hasPlan: !!plan,
      planName: plan ? plan.name : "",
      rationale: plan ? plan.rationale : "",
      venueName: venue ? venue.name : "未设置场馆",
      days: plan
        ? plan.days.map((d) => ({
            id: d.id,
            title: d.title,
            meta: d.items.length + " 个动作 · 约 " + d.estimatedMinutes + " 分钟",
            items: d.items.map((it) => ({
              id: it.id,
              name: (F.EXERCISE_MAP[it.exerciseId] || {}).name || it.exerciseId,
              sets: it.sets.length,
              reps: it.sets[0] && it.sets[0].durationSec ? it.sets[0].durationSec + " 秒" : (it.sets[0] ? it.sets[0].repsMin + "-" + it.sets[0].repsMax + " 次" : ""),
              rest: it.sets[0] ? it.sets[0].restSec : 60
            }))
          }))
        : [],
      inProgressId: inProgress ? inProgress.id : ""
    });
  },

  async generate() {
    const { profile, venues } = await boot();
    const venue = venues.find((v) => v.isDefault) || venues[0];
    const plan = F.generatePlan(planInput(profile, venue), profile.displayName ? undefined : undefined);
    await F.savePlan(plan);
    wx.showToast({ title: "已生成计划", icon: "success" });
    this.load();
  },

  async start(e) {
    const dayId = e.currentTarget.dataset.id;
    const plan = await F.getActivePlan();
    if (!plan) return;
    const day = plan.days.find((d) => d.id === dayId);
    if (!day) return;
    const existing = await F.getInProgressSession();
    if (existing) {
      if (existing.planDayId === day.id) {
        wx.navigateTo({ url: "/pages/run/index?id=" + existing.id });
        return;
      }
      const res = await wx.showModal({
        title: "还有一节未结束的训练",
        content: "「" + existing.title + "」还没结束。继续它会保留已记录内容；放弃它则按未完成结束，再开始新的训练。",
        confirmText: "继续旧的",
        cancelText: "放弃旧的"
      });
      if (res.confirm) {
        wx.navigateTo({ url: "/pages/run/index?id=" + existing.id });
        return;
      }
      await F.saveSession(Object.assign({}, existing, { status: "abandoned", endedAt: new Date().toISOString(), updatedAt: new Date().toISOString() }));
      await F.clearSessionUi();
    }
    const venue = (await F.listVenues()).find((v) => v.isDefault);
    const session = F.newSession(day, venue && venue.id);
    await F.saveSession(session);
    wx.navigateTo({ url: "/pages/run/index?id=" + session.id });
  },

  resume() {
    if (this.data.inProgressId) wx.navigateTo({ url: "/pages/run/index?id=" + this.data.inProgressId });
  }
});
