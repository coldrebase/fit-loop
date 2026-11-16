const { F, boot, GOAL_LABEL, LEVEL_LABEL } = require("../../utils/mp.js");

const GOALS = ["fat_loss", "muscle_gain", "strength", "recomp", "health"];
const LEVELS = ["beginner", "intermediate", "advanced"];

Page({
  data: {
    goal: "",
    level: "",
    daysPerWeek: 3,
    sessionMinutes: 45,
    heightCm: 170,
    weightKg: 65,
    targetText: "",
    basis: "",
    theme: "light",
    editing: false,
    goalOptions: [],
    levelOptions: []
  },

  onShow() {
    this.load();
  },

  async load() {
    const { profile } = await boot();
    this.profile = profile;
    const targets = F.targetsFor(profile);
    this.setData({
      goal: GOAL_LABEL[profile.goal],
      level: LEVEL_LABEL[profile.experience],
      daysPerWeek: profile.daysPerWeek,
      sessionMinutes: profile.sessionMinutes,
      heightCm: profile.heightCm,
      weightKg: profile.weightKg,
      targetText: targets.kcal + " kcal · 蛋白 " + targets.proteinG + "g · 碳水 " + targets.carbG + "g · 脂肪 " + targets.fatG + "g",
      basis: targets.basis,
      theme: wx.getStorageSync("fitloop-mode") === "dark" ? "dark" : "light",
      goalOptions: GOALS.map((g) => ({ value: g, label: GOAL_LABEL[g] })),
      levelOptions: LEVELS.map((l) => ({ value: l, label: LEVEL_LABEL[l] }))
    });
  },

  toggleTheme() {
    const next = this.data.theme === "dark" ? "light" : "dark";
    wx.setStorageSync("fitloop-mode", next);
    this.setData({ theme: next });
    wx.showToast({ title: next === "dark" ? "夜间模式" : "日间模式", icon: "none" });
  },

  openEdit() { this.setData({ editing: true }); },
  closeEdit() { this.setData({ editing: false }); },

  pickGoal(e) {
    this.profile.goal = e.currentTarget.dataset.value;
    this.setData({ goal: GOAL_LABEL[this.profile.goal] });
  },
  pickLevel(e) {
    this.profile.experience = e.currentTarget.dataset.value;
    this.setData({ level: LEVEL_LABEL[this.profile.experience] });
  },
  onDays(e) { this.profile.daysPerWeek = Number(e.detail.value) || 3; this.setData({ daysPerWeek: this.profile.daysPerWeek }); },
  onMinutes(e) { this.profile.sessionMinutes = Number(e.detail.value) || 45; this.setData({ sessionMinutes: this.profile.sessionMinutes }); },
  onHeight(e) { this.profile.heightCm = Number(e.detail.value) || 170; this.setData({ heightCm: this.profile.heightCm }); },
  onWeight(e) { this.profile.weightKg = Number(e.detail.value) || 65; this.setData({ weightKg: this.profile.weightKg }); },

  async saveEdit() {
    this.profile.updatedAt = new Date().toISOString();
    await F.saveProfile(this.profile);
    this.setData({ editing: false });
    wx.showToast({ title: "已保存", icon: "success" });
    this.load();
  },

  async exportData() {
    const data = await F.exportUserData();
    const text = JSON.stringify(data, null, 2);
    wx.setClipboardData({ data: text });
  },

  async wipe() {
    const res = await wx.showModal({ title: "删除全部个人数据", content: "训练、饮食、体重记录都会被清空，且无法恢复。确定继续？", confirmText: "删除", confirmColor: "#B0473E" });
    if (!res.confirm) return;
    await F.wipeUserData();
    wx.showToast({ title: "已清空", icon: "success" });
    this.load();
  }
});
