const { F, today, boot } = require("../../utils/mp.js");

Page({
  data: {
    rate: null,
    rateText: "",
    series: "",
    volumes: 0,
    nutrition: {},
    weight: {},
    recovery: {},
    cautions: [],
    sessions: []
  },

  onShow() {
    this.load();
  },

  async load() {
    const { profile } = await boot();
    const date = today();
    const [plan, sessions, entries, weights, recovery, foods] = await Promise.all([
      F.getActivePlan(),
      F.listSessions(),
      F.listEntries(),
      F.listBodyWeights(),
      F.listRecovery(),
      F.listFoods()
    ]);

    const report = F.buildWeeklyReport({
      today: date,
      plan,
      sessions,
      entries,
      weights,
      recovery,
      targets: F.targetsFor(profile),
      foods
    });

    this.setData({
      rate: report.completionRate === null ? null : Math.round(report.completionRate * 100),
      rateText: report.completionNote,
      volumes: report.totalVolumeKg,
      nutrition: report.nutrition,
      weight: report.weight,
      recovery: report.recovery,
      cautions: report.cautions,
      sessions: sessions.slice(0, 8).map((s) => ({
        id: s.id,
        title: s.title,
        when: F.isoDateOf(s.startedAt),
        status: s.status === "completed" ? "已完成" : s.status === "abandoned" ? "未完成" : "进行中"
      }))
    });
  }
});
