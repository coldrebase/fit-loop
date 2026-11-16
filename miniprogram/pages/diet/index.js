const { F, SLOTS, today, boot, dayTotals } = require("../../utils/mp.js");

Page({
  data: {
    date: "",
    slots: [],
    totals: { kcal: 0, protein: 0, carb: 0, fat: 0 },
    targets: { kcal: 0, proteinG: 0 },
    pct: { kcal: 0, protein: 0 },
    adding: false,
    keyword: "",
    results: [],
    picked: null,
    grams: 100,
    slot: "lunch",
    preview: null,
    slotOptions: SLOTS
  },

  onShow() {
    this.load();
  },

  async load() {
    const { profile } = await boot();
    const date = today();
    const [entries, foods] = await Promise.all([F.listEntriesByDate(date), F.listFoods()]);
    this.foods = foods;
    const targets = F.targetsFor(profile);
    const totals = dayTotals(entries, foods);

    const slots = SLOTS.map((s) => {
      const list = entries
        .filter((e) => e.slot === s.value)
        .map((e) => {
          const food = F.FOOD_MAP[e.foodId] || foods.find((f) => f.id === e.foodId);
          const per100 = (food && food.per100g) || { kcal: 0, proteinG: 0, carbG: 0, fatG: 0 };
          const n = F.nutrientsFor(e, per100);
          return {
            id: e.id,
            name: (food && food.name) || e.foodName || "自定义",
            detail: e.grams + "g · " + Math.round(n.kcal) + " kcal · 蛋白 " + n.proteinG + "g"
          };
        });
      return { value: s.value, label: s.label, list, kcal: list.length };
    });

    this.setData({
      date,
      slots,
      totals,
      targets: { kcal: targets.kcal, proteinG: targets.proteinG },
      pct: {
        kcal: Math.min(999, Math.round((totals.kcal / targets.kcal) * 100)),
        protein: Math.min(999, Math.round((totals.protein / targets.proteinG) * 100))
      }
    });
  },

  openAdd(e) {
    const slot = (e && e.currentTarget && e.currentTarget.dataset.slot) || "lunch";
    this.setData({ adding: true, slot, keyword: "", results: [], picked: null, grams: 100, preview: null });
  },
  closeAdd() {
    this.setData({ adding: false, picked: null });
  },

  onSearch(e) {
    const kw = (e.detail.value || "").trim();
    this.setData({ keyword: kw });
    if (!kw) { this.setData({ results: [] }); return; }
    const list = F.searchLocalFoods(this.foods || [], kw).slice(0, 12).map((f) => ({
      id: f.id,
      name: f.name,
      meta: "每 100g " + Math.round(f.per100g.kcal) + " kcal · 蛋白 " + f.per100g.proteinG + "g"
    }));
    this.setData({ results: list });
  },

  pick(e) {
    const id = e.currentTarget.dataset.id;
    const food = this.foods.find((f) => f.id === id);
    if (!food) return;
    this.setData({ picked: { id: food.id, name: food.name, per100: food.per100g }, grams: 100 });
    this.updatePreview();
  },

  onGrams(e) {
    this.setData({ grams: Number(e.detail.value) || 0 });
    this.updatePreview();
  },

  setSlot(e) {
    this.setData({ slot: e.currentTarget.dataset.value });
  },

  updatePreview() {
    const p = this.data.picked;
    if (!p) return;
    const n = F.nutrientsFor({ grams: this.data.grams, oilG: 0 }, p.per100);
    this.setData({ preview: { kcal: Math.round(n.kcal), protein: n.proteinG, carb: n.carbG, fat: n.fatG } });
  },

  async addEntry() {
    const p = this.data.picked;
    if (!p) return;
    const entry = {
      id: F.uid("fe"),
      date: today(),
      slot: this.data.slot,
      foodId: p.id,
      grams: this.data.grams,
      oilG: 0,
      basis: "na",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    await F.saveEntry(entry);
    wx.showToast({ title: "已加入", icon: "success" });
    this.setData({ adding: false, picked: null });
    this.load();
  },

  async del(e) {
    const id = e.currentTarget.dataset.id;
    await F.deleteEntry(id);
    this.load();
  }
});
