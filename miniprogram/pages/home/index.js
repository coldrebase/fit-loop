const { F, SLOTS, today, boot, dayTotals } = require("../../utils/mp.js");

Page({
  data: {
    date: "",
    weekday: "",
    nickname: "我",
    targetKcal: 0,
    targetProtein: 0,
    totals: { kcal: 0, protein: 0, carb: 0, fat: 0 },
    waterMl: 0,
    waterTarget: 0,
    weight: null,
    planTitle: "",
    planMeta: "",
    inProgressTitle: "",
    recent: []
  },

  onShow() {
    this.load();
  },

  async load() {
    const { profile } = await boot();
    const date = today();
    const [entries, foods, water, weights, plan, sessions] = await Promise.all([
      F.listEntriesByDate(date),
      F.listFoods(),
      F.listWater(),
      F.listBodyWeights(),
      F.getActivePlan(),
      F.listSessions()
    ]);

    const targets = F.targetsFor(profile);
    const totals = dayTotals(entries, foods);
    const todayWater = water.filter((x) => x.date === date).reduce((a, b) => a + (b.ml || 0), 0);
    const lastWeight = weights.length ? weights[weights.length - 1] : null;
    const todayWeekday = (new Date().getDay() + 6) % 7;
    const day = plan ? (plan.days || []).find((d) => d.weekday === todayWeekday) || null : null;
    const inProgress = sessions.find((s) => s.status === "in_progress");
    const recent = sessions.slice(0, 3).map((s) => ({
      id: s.id,
      title: s.title,
      when: F.isoDateOf ? F.isoDateOf(s.startedAt) : s.startedAt.slice(0, 10),
      status: s.status === "completed" ? "已完成" : s.status === "abandoned" ? "未完成" : "进行中"
    }));

    const d = new Date();
    this.setData({
      date,
      weekday: ["日", "一", "二", "三", "四", "五", "六"][d.getDay()],
      nickname: profile.displayName || "我",
      targetKcal: targets.kcal,
      targetProtein: targets.proteinG,
      totals,
      waterMl: todayWater,
      waterTarget: 2000,
      weight: lastWeight ? lastWeight.weightKg : null,
      planTitle: day ? day.title : plan ? "今天休息" : "还没有训练计划",
      planMeta: day ? day.items.length + " 个动作 · 约 " + day.estimatedMinutes + " 分钟" : "",
      inProgressTitle: inProgress ? inProgress.title : "",
      recent
    });
  },

  async addWater(e) {
    const ml = Number(e.currentTarget.dataset.ml);
    await F.addWater(today(), ml);
    this.load();
  },

  async recordWeight() {
    const res = await wx.showModal({ title: "记录体重", editable: true, placeholderText: "例如 62.5" });
    if (!res.confirm) return;
    const kg = Number(res.content);
    if (!kg || kg < 25 || kg > 250) {
      wx.showToast({ title: "请输入 25-250 之间的数字", icon: "none" });
      return;
    }
    const date = today();
    const all = await F.listBodyWeights();
    const exist = all.find((x) => x.date === date);
    await F.saveBodyWeight({ id: exist ? exist.id : F.uid("bw"), date, weightKg: kg, createdAt: (exist && exist.createdAt) || new Date().toISOString(), updatedAt: new Date().toISOString() });
    wx.showToast({ title: "已记录", icon: "success" });
    this.load();
  },

  goTrain() {
    wx.switchTab({ url: "/pages/train/index" });
  },
  goDiet() {
    wx.switchTab({ url: "/pages/diet/index" });
  }
});
