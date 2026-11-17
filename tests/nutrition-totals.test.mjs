import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { FOODS, nutrientTotals, nutrientsFor, sumNutrients } from "./.build/lib.mjs";

/**
 * 首页 / 饮食页共用的营养合计口径。
 * 关键点：内置库与用户自建食物都要算进去，查不到时按 0 计而不是抛错。
 */

const entry = (over = {}) => ({
  id: "e1",
  date: "2026-11-17",
  slot: "lunch",
  foodName: "测试食物",
  grams: 100,
  basis: "raw",
  source: { kind: "user", note: "test" },
  createdAt: "2026-11-17T00:00:00.000Z",
  updatedAt: "2026-11-17T00:00:00.000Z",
  ...over,
});

describe("营养合计（nutrientTotals）", () => {
  it("空记录返回全 0", () => {
    assert.deepEqual(nutrientTotals([]), { kcal: 0, proteinG: 0, carbG: 0, fatG: 0 });
  });

  it("内置食物按 FOOD_MAP 折算", () => {
    const rice = FOODS.find((f) => f.name.includes("米饭"));
    assert.ok(rice, "内置库里应该有米饭");
    const t = nutrientTotals([entry({ foodId: rice.id, foodName: rice.name, grams: 150 })]);
    const expect = nutrientsFor(entry({ grams: 150 }), rice.per100g);
    assert.equal(t.kcal, Math.round(expect.kcal));
    assert.ok(t.carbG > 0, "米饭应该计入碳水");
  });

  it("用户自建食物（不在内置库）也要计入，不能按 0 算", () => {
    const custom = {
      id: "food_custom_1",
      name: "自制鸡胸沙拉",
      per100g: { kcal: 120, proteinG: 18, carbG: 4, fatG: 3 },
      custom: true,
    };
    const t = nutrientTotals(
      [entry({ foodId: custom.id, foodName: custom.name, grams: 200 })],
      [custom],
    );
    assert.equal(t.kcal, 240);
    assert.equal(t.proteinG, 36);
  });

  it("既不在内置库也没有 foodId：按 0 计，不报错", () => {
    const t = nutrientTotals([entry({ foodId: undefined, grams: 200 })]);
    assert.deepEqual(t, { kcal: 0, proteinG: 0, carbG: 0, fatG: 0 });
  });

  it("烹调用油计入热量与脂肪", () => {
    const rice = FOODS.find((f) => f.name.includes("米饭"));
    const plain = nutrientTotals([entry({ foodId: rice.id, grams: 100, oilG: 0 })]);
    const oily = nutrientTotals([entry({ foodId: rice.id, grams: 100, oilG: 10 })]);
    assert.ok(oily.kcal > plain.kcal, "加了油热量应更高");
    assert.ok(Math.abs(oily.fatG - plain.fatG - 10) < 0.01, "10g 油应计入 10g 脂肪");
  });

  it("与逐条 nutrientsFor + sumNutrients 的结果一致（同一口径）", () => {
    const list = [
      entry({ id: "a", foodId: FOODS[0].id, grams: 80 }),
      entry({ id: "b", foodId: FOODS[1].id, grams: 200, oilG: 5 }),
    ];
    const manual = sumNutrients(
      list.map((e) => {
        const food = FOODS.find((f) => f.id === e.foodId);
        return nutrientsFor(e, food.per100g);
      }),
    );
    const viaTotals = nutrientTotals(list);
    assert.deepEqual(viaTotals, manual);
  });
});