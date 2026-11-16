"use strict";
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// .mp-build/index.ts
var index_exports = {};
__export(index_exports, {
  COOKING_LABEL: () => COOKING_LABEL,
  DB_NAME: () => DB_NAME,
  DB_VERSION: () => DB_VERSION,
  DEFAULT_PROFILE: () => DEFAULT_PROFILE,
  EQUIPMENT_LABEL: () => EQUIPMENT_LABEL,
  EXERCISES: () => EXERCISES,
  EXERCISE_MAP: () => EXERCISE_MAP,
  FOODS: () => FOODS,
  FOOD_CATEGORY_LABEL: () => FOOD_CATEGORY_LABEL,
  FOOD_MAP: () => FOOD_MAP,
  FOOD_SUBSTITUTES: () => FOOD_SUBSTITUTES,
  GOAL_LABEL: () => GOAL_LABEL,
  LEVEL_LABEL: () => LEVEL_LABEL,
  MIN_KCAL_BY_SEX: () => MIN_KCAL_BY_SEX,
  MOVEMENT_PATTERN_LABEL: () => MOVEMENT_PATTERN_LABEL,
  MUSCLES: () => MUSCLES,
  MUSCLE_MAP: () => MUSCLE_MAP,
  OIL_BY_METHOD: () => OIL_BY_METHOD,
  REGION_LABEL: () => REGION_LABEL,
  SAMPLE_VENUES: () => SAMPLE_VENUES,
  SLOT_LABEL: () => SLOT_LABEL,
  WEEKDAY_MAP: () => WEEKDAY_MAP,
  ZERO: () => ZERO,
  activityFactor: () => activityFactor,
  addDays: () => addDays,
  addWater: () => addWater,
  avgRpe: () => avgRpe,
  best1RM: () => best1RM,
  bestSetVolume: () => bestSetVolume,
  buildDemoEntries: () => buildDemoEntries,
  buildDemoMealPlan: () => buildDemoMealPlan,
  buildDemoPlan: () => buildDemoPlan,
  buildDemoRecovery: () => buildDemoRecovery,
  buildDemoSessions: () => buildDemoSessions,
  buildDemoShopping: () => buildDemoShopping,
  buildDemoWeights: () => buildDemoWeights,
  buildWarmups: () => buildWarmups,
  buildWeeklyReport: () => buildWeeklyReport,
  calcBMR: () => calcBMR,
  calcTDEE: () => calcTDEE,
  clamp: () => clamp,
  clearDemoData: () => clearDemoData,
  clearSessionUi: () => clearSessionUi,
  clearStore: () => clearStore,
  computeTargets: () => computeTargets,
  coreDurationSec: () => coreDurationSec,
  cx: () => cx,
  dateRangeOfWeek: () => dateRangeOfWeek,
  daysBetween: () => daysBetween,
  deleteCustomExercise: () => deleteCustomExercise,
  deleteEntry: () => deleteEntry,
  deletePlan: () => deletePlan,
  deleteSession: () => deleteSession,
  deleteShoppingItem: () => deleteShoppingItem,
  deleteVenue: () => deleteVenue,
  demoFoodCountHint: () => demoFoodCountHint,
  demoNewId: () => demoNewId,
  difficultyFit: () => difficultyFit,
  equipmentAvailable: () => equipmentAvailable,
  equipmentOf: () => equipmentOf,
  estimate1RM: () => estimate1RM,
  estimateDayMinutes: () => estimateDayMinutes,
  estimateExerciseSec: () => estimateExerciseSec,
  exportAll: () => exportAll,
  exportUserData: () => exportUserData,
  fatPerKg: () => fatPerKg,
  findSubstitutes: () => findSubstitutes,
  formatDateCN: () => formatDateCN,
  formatDuration: () => formatDuration,
  formatHM: () => formatHM,
  generatePlan: () => generatePlan,
  getActivePlan: () => getActivePlan,
  getAll: () => getAll,
  getByIndex: () => getByIndex,
  getInProgressSession: () => getInProgressSession,
  getMeta: () => getMeta,
  getOne: () => getOne,
  getProfile: () => getProfile,
  getRecovery: () => getRecovery,
  getSession: () => getSession,
  goalKcalAdjust: () => goalKcalAdjust,
  hasAnyDemo: () => hasAnyDemo,
  historyFor: () => historyFor,
  isOnline: () => isOnline,
  isPersistenceAvailable: () => isPersistenceAvailable,
  isUsingFallback: () => isUsingFallback,
  isoDateOf: () => isoDateOf,
  lastPerformanceOf: () => lastPerformanceOf,
  listBodyWeights: () => listBodyWeights,
  listCustomExercises: () => listCustomExercises,
  listEntries: () => listEntries,
  listEntriesByDate: () => listEntriesByDate,
  listExercises: () => listExercises,
  listFoods: () => listFoods,
  listMealPlans: () => listMealPlans,
  listPlans: () => listPlans,
  listRecovery: () => listRecovery,
  listSessions: () => listSessions,
  listShopping: () => listShopping,
  listVenues: () => listVenues,
  listWater: () => listWater,
  loadSessionUi: () => loadSessionUi,
  makeRng: () => makeRng,
  muscleIdsOfDay: () => muscleIdsOfDay,
  muscleName: () => muscleName,
  newSession: () => newSession,
  nowISO: () => nowISO,
  nutrientsFor: () => nutrientsFor,
  patternAllowed: () => patternAllowed,
  pickExercise: () => pickExercise,
  prescribe: () => prescribe,
  proteinPerKg: () => proteinPerKg,
  put: () => put,
  putMany: () => putMany,
  remove: () => remove,
  round: () => round,
  saveBodyWeight: () => saveBodyWeight,
  saveCustomExercise: () => saveCustomExercise,
  saveEntry: () => saveEntry,
  saveFood: () => saveFood,
  saveMealPlan: () => saveMealPlan,
  savePlan: () => savePlan,
  saveProfile: () => saveProfile,
  saveRecovery: () => saveRecovery,
  saveSession: () => saveSession,
  saveSessionUi: () => saveSessionUi,
  saveShoppingItem: () => saveShoppingItem,
  saveVenue: () => saveVenue,
  searchLocalFoods: () => searchLocalFoods,
  setDefaultVenue: () => setDefaultVenue,
  slimForTime: () => slimForTime,
  splitFor: () => splitFor,
  startOfWeekISO: () => startOfWeekISO,
  subscribe: () => subscribe,
  suggestAll: () => suggestAll,
  suggestForExercise: () => suggestForExercise,
  suggestOilG: () => suggestOilG,
  sumNutrients: () => sumNutrients,
  targetsFor: () => targetsFor,
  toISODate: () => toISODate,
  todayISO: () => todayISO,
  todayISODate: () => todayISODate,
  uid: () => uid,
  weekdayCN: () => weekdayCN,
  weekdayOf: () => weekdayOf,
  wipeAll: () => wipeAll,
  wipeUserData: () => wipeUserData
});
module.exports = __toCommonJS(index_exports);

// .mp-build/utils.ts
function uid(prefix = "id") {
  const rnd = typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID().slice(0, 8) : Math.random().toString(36).slice(2, 10);
  return `${prefix}_${Date.now().toString(36)}_${rnd}`;
}
function todayISO() {
  return toISODate(/* @__PURE__ */ new Date());
}
function toISODate(d) {
  const y = d.getFullYear();
  const m = `${d.getMonth() + 1}`.padStart(2, "0");
  const day = `${d.getDate()}`.padStart(2, "0");
  return `${y}-${m}-${day}`;
}
function nowISO() {
  return (/* @__PURE__ */ new Date()).toISOString();
}
function isoDateOf(isoDateTime) {
  return toISODate(new Date(isoDateTime));
}
function clamp(n, min, max) {
  return Math.min(max, Math.max(min, n));
}
function round(n, digits = 0) {
  const f = 10 ** digits;
  return Math.round(n * f) / f;
}
function daysBetween(aISO, bISO) {
  const a = (/* @__PURE__ */ new Date(`${aISO}T00:00:00`)).getTime();
  const b = (/* @__PURE__ */ new Date(`${bISO}T00:00:00`)).getTime();
  return Math.round((b - a) / 864e5);
}
function addDays(iso, n) {
  const d = /* @__PURE__ */ new Date(`${iso}T00:00:00`);
  d.setDate(d.getDate() + n);
  return toISODate(d);
}
function weekdayOf(iso) {
  const d = (/* @__PURE__ */ new Date(`${iso}T00:00:00`)).getDay();
  return (d + 6) % 7;
}
function startOfWeekISO(iso) {
  return addDays(iso, -weekdayOf(iso));
}
function formatDateCN(iso) {
  const d = /* @__PURE__ */ new Date(`${iso}T00:00:00`);
  return `${d.getMonth() + 1}\u6708${d.getDate()}\u65E5`;
}
function weekdayCN(weekday) {
  var _a;
  return (_a = ["\u5468\u4E00", "\u5468\u4E8C", "\u5468\u4E09", "\u5468\u56DB", "\u5468\u4E94", "\u5468\u516D", "\u5468\u65E5"][weekday]) != null ? _a : "";
}
function formatDuration(sec) {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}:${`${s}`.padStart(2, "0")}`;
}
function formatHM(iso) {
  const d = new Date(iso);
  return `${`${d.getHours()}`.padStart(2, "0")}:${`${d.getMinutes()}`.padStart(2, "0")}`;
}
function cx(...parts) {
  return parts.filter(Boolean).join(" ");
}
function makeRng(seed) {
  let s = seed >>> 0 || 1;
  return () => {
    s ^= s << 13;
    s >>>= 0;
    s ^= s >> 17;
    s ^= s << 5;
    s >>>= 0;
    return s / 4294967296;
  };
}

// .mp-build/nutrition.ts
var MIN_KCAL_BY_SEX = {
  female: 1200,
  male: 1500,
  unspecified: 1300
};
function calcBMR(p) {
  const age = p.birthYear ? clamp((/* @__PURE__ */ new Date()).getFullYear() - p.birthYear, 14, 90) : 30;
  const base = 10 * p.weightKg + 6.25 * p.heightCm - 5 * age;
  if (p.sex === "male") return base + 5;
  if (p.sex === "female") return base - 161;
  return base - 78;
}
function activityFactor(daysPerWeek) {
  if (daysPerWeek <= 1) return 1.2;
  if (daysPerWeek <= 2) return 1.34;
  if (daysPerWeek <= 3) return 1.42;
  if (daysPerWeek <= 4) return 1.5;
  if (daysPerWeek <= 5) return 1.56;
  return 1.62;
}
function calcTDEE(p) {
  return Math.round(calcBMR(p) * activityFactor(p.daysPerWeek));
}
function goalKcalAdjust(goal) {
  switch (goal) {
    case "fat_loss":
      return 0.85;
    // 温和赤字 15%
    case "muscle_gain":
      return 1.1;
    // 温和盈余 10%
    case "recomp":
      return 0.95;
    // 小幅赤字
    case "strength":
      return 1.03;
    case "health":
    default:
      return 1;
  }
}
function proteinPerKg(goal) {
  switch (goal) {
    case "fat_loss":
      return 2;
    case "muscle_gain":
      return 1.8;
    case "recomp":
      return 1.9;
    case "strength":
      return 1.7;
    default:
      return 1.5;
  }
}
function fatPerKg() {
  return 0.9;
}
function computeTargets(p) {
  const tdee = calcTDEE(p);
  const adjusted = tdee * goalKcalAdjust(p.goal);
  const floor = MIN_KCAL_BY_SEX[p.sex];
  const clamped = Math.max(Math.round(adjusted), floor);
  const hitFloor = clamped > Math.round(adjusted);
  const proteinG = Math.round(p.weightKg * proteinPerKg(p.goal));
  const fatG = Math.round(p.weightKg * fatPerKg());
  const kcalFromPF = proteinG * 4 + fatG * 9;
  let carbG = Math.round((clamped - kcalFromPF) / 4);
  let finalFatG = fatG;
  if (carbG < 50) {
    finalFatG = Math.max(Math.round((clamped - proteinG * 4 - 50 * 4) / 9), 30);
    carbG = Math.max(50, Math.round((clamped - proteinG * 4 - finalFatG * 9) / 4));
  }
  const caveats = [
    "\u4F30\u7B97\u503C\uFF0C\u8BEF\u5DEE\u5E38\u89C1\u5728 \xB110-15%\uFF0C\u8BF7\u7ED3\u5408\u4F53\u91CD\u4E0E\u4F53\u611F\u5728 2-4 \u5468\u5185\u5FAE\u8C03\u3002",
    "\u4E0D\u9002\u7528\u4E8E\u5B55\u671F\u3001\u54FA\u4E73\u671F\u3001\u672A\u6210\u5E74\u4EBA\u3001\u8FDB\u98DF\u969C\u788D\u53F2\u53CA\u9700\u533B\u5B66\u8425\u517B\u6CBB\u7597\u7684\u60C5\u51B5\uFF0C\u8BF7\u54A8\u8BE2\u533B\u751F\u6216\u6CE8\u518C\u8425\u517B\u5E08\u3002"
  ];
  if (hitFloor) {
    caveats.unshift(
      `\u76EE\u6807\u70ED\u91CF\u5DF2\u89E6\u53CA ${floor} kcal \u5B89\u5168\u4E0B\u9650\uFF0C\u672A\u7EE7\u7EED\u4E0B\u8C03\uFF1B\u5982\u9700\u8FDB\u4E00\u6B65\u51CF\u8102\uFF0C\u8BF7\u901A\u8FC7\u589E\u52A0\u65E5\u5E38\u6D3B\u52A8\u91CF\u800C\u975E\u7EE7\u7EED\u524A\u51CF\u70ED\u91CF\u3002`
    );
  }
  if (p.goal === "fat_loss") {
    caveats.unshift("\u91C7\u7528\u6E29\u548C\u8D64\u5B57\uFF08\u7EA6 15%\uFF09\uFF0C\u4E0D\u5EFA\u8BAE\u4F4E\u4E8E\u4E0B\u9650\uFF1B\u6BCF\u5468\u4F53\u91CD\u4E0B\u964D 0.3-0.8% \u5C5E\u5E38\u89C1\u8303\u56F4\u3002");
  }
  const fatBasis = finalFatG === fatG ? `\u8102\u80AA\u6309 ${fatPerKg()} g/kg = ${finalFatG} g` : `\u8102\u80AA\u6309 ${fatPerKg()} g/kg \u4E3A ${fatG} g\uFF0C\u56E0\u78B3\u6C34\u6700\u4F4E\u4FDD\u969C\u56DE\u8C03\u4E3A ${finalFatG} g`;
  return {
    kcal: clamped,
    proteinG,
    carbG,
    fatG: finalFatG,
    basis: `Mifflin-St Jeor \u4F30\u7B97 BMR \u2248 ${Math.round(calcBMR(p))} kcal \xD7 \u6D3B\u52A8\u7CFB\u6570 ${activityFactor(
      p.daysPerWeek
    )}\uFF08\u6BCF\u5468 ${p.daysPerWeek} \u6B21\u8BAD\u7EC3\uFF09\u2248 TDEE ${tdee} kcal\uFF1B\u6309\u300C${{ fat_loss: "\u51CF\u8102", muscle_gain: "\u589E\u808C", recomp: "\u5851\u5F62", strength: "\u529B\u91CF", health: "\u5065\u5EB7\u7EF4\u6301" }[p.goal]}\u300D\u76EE\u6807 \xD7${goalKcalAdjust(p.goal)} \u2248 ${Math.round(adjusted)} kcal${hitFloor ? `\uFF0C\u53D7 ${floor} kcal \u5B89\u5168\u4E0B\u9650\u7EA6\u675F` : ""}\u3002\u86CB\u767D\u8D28\u6309 ${proteinPerKg(p.goal)} g/kg \u4F53\u91CD\uFF08${p.weightKg} kg\uFF09= ${proteinG} g\uFF0C${fatBasis}\uFF0C\u78B3\u6C34\u4E3A\u5269\u4F59\u70ED\u91CF\u3002`,
    caveats
  };
}
function targetsFor(p) {
  var _a;
  return (_a = p.nutritionOverride) != null ? _a : computeTargets(p);
}
function nutrientsFor(entry, per100g) {
  var _a;
  const k = entry.grams / 100;
  const oil = (_a = entry.oilG) != null ? _a : 0;
  return {
    kcal: round(per100g.kcal * k + oil * 8.84, 0),
    proteinG: round(per100g.proteinG * k, 1),
    carbG: round(per100g.carbG * k, 1),
    fatG: round(per100g.fatG * k + oil, 1)
  };
}
var ZERO = { kcal: 0, proteinG: 0, carbG: 0, fatG: 0 };
function sumNutrients(list) {
  return list.reduce(
    (acc, n) => ({
      kcal: acc.kcal + n.kcal,
      proteinG: acc.proteinG + n.proteinG,
      carbG: acc.carbG + n.carbG,
      fatG: acc.fatG + n.fatG
    }),
    __spreadValues({}, ZERO)
  );
}
var OIL_BY_METHOD = {
  raw: { oilPer100g: 0, note: "\u751F\u98DF/\u514D\u70F9\u996A\uFF0C\u65E0\u70F9\u8C03\u7528\u6CB9" },
  steamed: { oilPer100g: 0, note: "\u84B8\u5236\uFF0C\u901A\u5E38\u65E0\u989D\u5916\u7528\u6CB9" },
  boiled: { oilPer100g: 0, note: "\u6C34\u716E\uFF0C\u901A\u5E38\u65E0\u989D\u5916\u7528\u6CB9" },
  stir_fried: { oilPer100g: 5, note: "\u5BB6\u5E38\u5C0F\u7092\u7EA6 5g \u6CB9 / 100g \u98DF\u6750" },
  pan_fried: { oilPer100g: 7, note: "\u714E\u5236\u7EA6 7g \u6CB9 / 100g \u98DF\u6750" },
  deep_fried: { oilPer100g: 12, note: "\u6CB9\u70B8\u5438\u6CB9\u91CF\u9AD8\uFF0C\u4F30\u7B97\u8BEF\u5DEE\u5927" },
  braised: { oilPer100g: 5, note: "\u7EA2\u70E7\u901A\u5E38\u5148\u714E\u540E\u70E7\uFF0C\u7EA6 5g \u6CB9" },
  roasted: { oilPer100g: 3, note: "\u70E4\u5236\u7EA6 3g \u6CB9 / 100g \u98DF\u6750" },
  air_fryer: { oilPer100g: 1, note: "\u7A7A\u6C14\u70B8\u9505\u7EA6 1g \u6CB9" },
  other: { oilPer100g: 3, note: "\u672A\u77E5\u65B9\u5F0F\u6309 3g \u6CB9\u4FDD\u5B88\u4F30\u7B97\uFF0C\u8BF7\u5C3D\u91CF\u624B\u52A8\u4FEE\u6B63" }
};
function suggestOilG(method, grams) {
  if (!method) return 0;
  const conf = OIL_BY_METHOD[method];
  if (!conf) return 0;
  return Math.round(conf.oilPer100g * grams / 100);
}
var COOKING_LABEL = {
  raw: "\u751F\u98DF/\u4E0D\u52A0\u70ED",
  steamed: "\u84B8",
  boiled: "\u6C34\u716E",
  stir_fried: "\u5C0F\u7092",
  pan_fried: "\u714E",
  deep_fried: "\u6CB9\u70B8",
  braised: "\u7EA2\u70E7/\u7096",
  roasted: "\u70E4",
  air_fryer: "\u7A7A\u6C14\u70B8\u9505",
  other: "\u5176\u4ED6"
};
var SLOT_LABEL = {
  breakfast: "\u65E9\u9910",
  lunch: "\u5348\u9910",
  dinner: "\u665A\u9910",
  snack: "\u52A0\u9910"
};

// .mp-build/seed/exercises.ts
var T0 = "2026-01-01T00:00:00.000Z";
var ILLU = (note) => ({ kind: "illustration", note });
var RAW = [
  /* ----------------------------- 胸 · 水平推 ----------------------------- */
  {
    id: "barbell_bench_press",
    name: "\u6760\u94C3\u5367\u63A8",
    alias: ["\u5367\u63A8", "bench press"],
    primaryMuscles: ["chest_mid"],
    secondaryMuscles: ["triceps", "front_delts"],
    equipment: ["barbell", "bench"],
    movementPattern: "horizontal_push",
    difficulty: 4,
    steps: [
      "\u4EF0\u5367\u4E8E\u5367\u63A8\u51F3\uFF0C\u53CC\u773C\u4F4D\u4E8E\u6760\u94C3\u6B63\u4E0B\u65B9\uFF0C\u53CC\u811A\u8E29\u5B9E\u5730\u9762\u3002",
      "\u53CC\u624B\u7565\u5BBD\u4E8E\u80A9\u63E1\u6760\uFF0C\u80A9\u80DB\u540E\u7F29\u4E0B\u6C89\u5E76\u538B\u5728\u51F3\u9762\u4E0A\u3002",
      "\u7F13\u6162\u4E0B\u653E\u6760\u94C3\u81F3\u4E0B\u80F8/\u4E73\u7EBF\u9644\u8FD1\uFF0C\u8098\u90E8\u7EA6\u4E0E\u8EAF\u5E72\u6210 45\xB0\u3002",
      "\u80F8\u808C\u4E3B\u52A8\u53D1\u529B\u63A8\u8D77\u81F3\u8098\u90E8\u63A5\u8FD1\u4F38\u76F4\uFF0C\u4FDD\u6301\u80A9\u80DB\u7A33\u5B9A\u3002"
    ],
    breathing: "\u4E0B\u653E\u65F6\u5438\u6C14\uFF0C\u63A8\u8D77\u8FC7\u7C98\u6EDE\u70B9\u540E\u547C\u6C14\u3002",
    commonMistakes: [
      "\u8170\u90E8\u8FC7\u5EA6\u53CD\u5F13\u3001\u81C0\u90E8\u79BB\u51F3",
      "\u6760\u94C3\u5F39\u80F8\u501F\u529B",
      "\u624B\u8155\u8FC7\u5EA6\u540E\u7FFB\u5BFC\u81F4\u8155\u5173\u8282\u538B\u529B",
      "\u80A9\u80DB\u6CA1\u6709\u6536\u7D27\uFF0C\u80A9\u524D\u4FA7\u649E\u51FB\u4E0D\u9002"
    ],
    cues: ["\u80A9\u80DB\u540E\u7F29\u4E0B\u6C89", "\u6760\u94C3\u8F68\u8FF9\u7565\u5448\u5F27\u7EBF\uFF0C\u843D\u70B9\u5728\u4E0B\u80F8"],
    substitutions: ["dumbbell_bench_press", "machine_chest_press", "push_up"],
    media: ILLU("\u793A\u610F\u56FE\uFF1A\u4EF0\u5367\u63A8\u4E3E\u52A8\u4F5C\u8F68\u8FF9\uFF08\u672C\u5730\u7ED8\u5236\uFF0C\u975E\u771F\u4EBA\u6F14\u793A\uFF09"),
    safetyNote: "\u5EFA\u8BAE\u4F7F\u7528\u4FDD\u62A4\u67B6\u6216\u6709\u4EBA\u4FDD\u62A4\uFF1B\u5927\u91CD\u91CF\u52A1\u5FC5\u4E0A\u4FDD\u9669\u6760\u3002"
  },
  {
    id: "dumbbell_bench_press",
    name: "\u54D1\u94C3\u5367\u63A8",
    alias: ["\u54D1\u94C3\u63A8\u80F8"],
    primaryMuscles: ["chest_mid"],
    secondaryMuscles: ["triceps", "front_delts"],
    equipment: ["dumbbell", "bench"],
    movementPattern: "horizontal_push",
    difficulty: 3,
    steps: [
      "\u4EF0\u5367\u51F3\u4E0A\uFF0C\u53CC\u624B\u6301\u54D1\u94C3\u7F6E\u4E8E\u80A9\u4E0A\u65B9\uFF0C\u638C\u5FC3\u671D\u524D\u3002",
      "\u4E0B\u653E\u65F6\u8098\u90E8\u7565\u4F4E\u4E8E\u8EAF\u5E72\u5E73\u9762\uFF0C\u611F\u53D7\u80F8\u808C\u62C9\u4F38\u3002",
      "\u63A8\u8D77\u65F6\u4E24\u53EA\u54D1\u94C3\u5411\u4E2D\u95F4\u9760\u62E2\u4F46\u4E0D\u78B0\u649E\uFF0C\u9876\u70B9\u4E0D\u9501\u6B7B\u3002"
    ],
    breathing: "\u4E0B\u653E\u5438\u6C14\uFF0C\u63A8\u8D77\u547C\u6C14\u3002",
    commonMistakes: ["\u8098\u90E8\u5916\u5C55 90\xB0 \u9020\u6210\u80A9\u90E8\u538B\u529B", "\u4E0B\u653E\u8FC7\u5FEB\u5931\u53BB\u5F20\u529B"],
    substitutions: ["barbell_bench_press", "machine_chest_press", "push_up"],
    media: ILLU("\u793A\u610F\u56FE\uFF1A\u4EF0\u5367\u5206\u81C2\u63A8\u4E3E\uFF08\u672C\u5730\u7ED8\u5236\uFF0C\u975E\u771F\u4EBA\u6F14\u793A\uFF09")
  },
  {
    id: "machine_chest_press",
    name: "\u5668\u68B0\u63A8\u80F8",
    primaryMuscles: ["chest_mid"],
    secondaryMuscles: ["triceps", "front_delts"],
    equipment: ["machine"],
    movementPattern: "horizontal_push",
    difficulty: 2,
    steps: ["\u8C03\u6574\u5EA7\u6905\u4F7F\u628A\u624B\u4E0E\u4E2D\u80F8\u540C\u9AD8\u3002", "\u80CC\u90E8\u8D34\u7D27\u9760\u57AB\uFF0C\u63A8\u81F3\u8098\u90E8\u63A5\u8FD1\u4F38\u76F4\u3002", "\u7F13\u6162\u56DE\u653E\uFF0C\u4FDD\u6301\u80F8\u90E8\u5F20\u529B\u3002"],
    breathing: "\u63A8\u8D77\u547C\u6C14\uFF0C\u56DE\u653E\u5438\u6C14\u3002",
    commonMistakes: ["\u8038\u80A9\u53D1\u529B", "\u56DE\u653E\u8FC7\u5FEB\u649E\u51FB\u914D\u91CD"],
    substitutions: ["dumbbell_bench_press", "cable_chest_press", "push_up"],
    media: ILLU("\u793A\u610F\u56FE\uFF1A\u5750\u59FF\u6C34\u5E73\u63A8\uFF08\u672C\u5730\u7ED8\u5236\uFF0C\u975E\u771F\u4EBA\u6F14\u793A\uFF09")
  },
  {
    id: "cable_chest_press",
    name: "\u9F99\u95E8\u67B6\u5939\u80F8",
    alias: ["\u7EF3\u7D22\u5939\u80F8", "cable fly"],
    primaryMuscles: ["chest_mid"],
    secondaryMuscles: ["front_delts"],
    equipment: ["cable"],
    movementPattern: "horizontal_push",
    difficulty: 2,
    steps: ["\u6ED1\u8F6E\u8C03\u81F3\u80F8\u4E2D\u90E8\u9AD8\u5EA6\uFF0C\u53CC\u624B\u63E1\u628A\u624B\u524D\u4F38\u3002", "\u5FAE\u5C48\u8098\uFF0C\u5411\u80F8\u524D\u73AF\u62B1\u81F3\u53CC\u624B\u9760\u8FD1\u3002", "\u7F13\u6162\u56DE\u653E\u81F3\u80F8\u808C\u6709\u62C9\u4F38\u611F\u3002"],
    breathing: "\u5939\u62E2\u547C\u6C14\uFF0C\u56DE\u653E\u5438\u6C14\u3002",
    commonMistakes: ["\u505A\u6210\u63A8\u4E3E\uFF08\u8098\u90E8\u5C48\u4F38\u8FC7\u591A\uFF09", "\u91CD\u91CF\u8FC7\u5927\u5BFC\u81F4\u8EAF\u5E72\u6643\u52A8"],
    substitutions: ["machine_chest_press", "dumbbell_bench_press"],
    media: ILLU("\u793A\u610F\u56FE\uFF1A\u7AD9\u59FF\u73AF\u62B1\u52A8\u4F5C\uFF08\u672C\u5730\u7ED8\u5236\uFF0C\u975E\u771F\u4EBA\u6F14\u793A\uFF09")
  },
  {
    id: "push_up",
    name: "\u4FEF\u5367\u6491",
    primaryMuscles: ["chest_mid"],
    secondaryMuscles: ["triceps", "front_delts", "abs"],
    equipment: [],
    movementPattern: "horizontal_push",
    difficulty: 2,
    steps: [
      "\u53CC\u624B\u7565\u5BBD\u4E8E\u80A9\u6491\u5730\uFF0C\u8EAB\u4F53\u6210\u4E00\u6761\u76F4\u7EBF\u3002",
      "\u80A9\u80DB\u540E\u7F29\uFF0C\u5C48\u8098\u4E0B\u653E\u81F3\u80F8\u53E3\u63A5\u8FD1\u5730\u9762\u3002",
      "\u63A8\u8D77\u81F3\u8098\u90E8\u63A5\u8FD1\u4F38\u76F4\uFF0C\u5168\u7A0B\u6536\u7D27\u6838\u5FC3\u4E0E\u81C0\u90E8\u3002"
    ],
    breathing: "\u4E0B\u653E\u5438\u6C14\uFF0C\u63A8\u8D77\u547C\u6C14\u3002",
    commonMistakes: ["\u584C\u8170\u6216\u6485\u81C0", "\u8098\u90E8\u8FC7\u5EA6\u5916\u5C55", "\u53EA\u505A\u534A\u7A0B"],
    substitutions: ["dumbbell_bench_press", "machine_chest_press", "incline_push_up"],
    media: ILLU("\u793A\u610F\u56FE\uFF1A\u4FEF\u8EAB\u63A8\u8D77\uFF08\u672C\u5730\u7ED8\u5236\uFF0C\u975E\u771F\u4EBA\u6F14\u793A\uFF09"),
    safetyNote: "\u624B\u8155\u4E0D\u9002\u53EF\u6539\u7528\u63E1\u62F3\u6216\u4FEF\u5367\u6491\u67B6\u3002"
  },
  {
    id: "incline_push_up",
    name: "\u4E0A\u659C\u4FEF\u5367\u6491\uFF08\u624B\u6491\u9AD8\uFF09",
    primaryMuscles: ["chest_mid"],
    secondaryMuscles: ["triceps", "abs"],
    equipment: [],
    movementPattern: "horizontal_push",
    difficulty: 1,
    steps: ["\u53CC\u624B\u6491\u4E8E\u7A33\u56FA\u53F0\u9636\u6216\u6C99\u53D1\u6276\u624B\uFF0C\u8EAB\u4F53\u6210\u76F4\u7EBF\u3002", "\u4E0B\u653E\u81F3\u80F8\u53E3\u63A5\u8FD1\u652F\u6491\u9762\u540E\u63A8\u8D77\u3002"],
    breathing: "\u4E0B\u653E\u5438\u6C14\uFF0C\u63A8\u8D77\u547C\u6C14\u3002",
    commonMistakes: ["\u652F\u6491\u9762\u4E0D\u7A33", "\u5934\u90E8\u524D\u63A2"],
    substitutions: ["push_up", "machine_chest_press"],
    media: ILLU("\u793A\u610F\u56FE\uFF1A\u624B\u6491\u9AD8\u4F4D\u4FEF\u8EAB\u63A8\u8D77\uFF08\u672C\u5730\u7ED8\u5236\uFF0C\u975E\u771F\u4EBA\u6F14\u793A\uFF09")
  },
  /* ----------------------------- 胸 · 上斜 ------------------------------ */
  {
    id: "incline_dumbbell_press",
    name: "\u4E0A\u659C\u54D1\u94C3\u5367\u63A8",
    primaryMuscles: ["chest_upper"],
    secondaryMuscles: ["front_delts", "triceps"],
    equipment: ["dumbbell", "bench"],
    movementPattern: "horizontal_push",
    difficulty: 3,
    steps: ["\u5367\u63A8\u51F3\u8C03\u81F3 30\xB0 \u5DE6\u53F3\uFF0C\u907F\u514D\u63A5\u8FD1\u76F4\u7ACB\u3002", "\u4E0B\u653E\u81F3\u4E0A\u80F8/\u9501\u9AA8\u4E0B\u65B9\uFF0C\u63A8\u8D77\u65F6\u4FDD\u6301\u80A9\u80DB\u7A33\u5B9A\u3002"],
    breathing: "\u4E0B\u653E\u5438\u6C14\uFF0C\u63A8\u8D77\u547C\u6C14\u3002",
    commonMistakes: ["\u89D2\u5EA6\u8FC7\u9AD8\u53D8\u6210\u80A9\u63A8", "\u91CD\u91CF\u8FC7\u5927\u9760\u80A9\u524D\u675F"],
    substitutions: ["incline_push_up", "machine_chest_press", "dumbbell_bench_press"],
    media: ILLU("\u793A\u610F\u56FE\uFF1A\u659C\u677F\u5206\u81C2\u63A8\u4E3E\uFF08\u672C\u5730\u7ED8\u5236\uFF0C\u975E\u771F\u4EBA\u6F14\u793A\uFF09")
  },
  /* ------------------------------ 背 · 垂直拉 ---------------------------- */
  {
    id: "pull_up",
    name: "\u5F15\u4F53\u5411\u4E0A",
    primaryMuscles: ["lats"],
    secondaryMuscles: ["biceps", "upper_back", "forearms"],
    equipment: [],
    movementPattern: "vertical_pull",
    difficulty: 5,
    steps: ["\u53CC\u624B\u7565\u5BBD\u4E8E\u80A9\u6B63\u63E1\u60AC\u5782\uFF0C\u80A9\u80DB\u4E0B\u6C89\u3002", "\u60F3\u8C61\u628A\u8098\u90E8\u62C9\u5411\u88E4\u515C\uFF0C\u4E0A\u62C9\u81F3\u4E0B\u5DF4\u8FC7\u6760\u3002", "\u7F13\u6162\u4E0B\u653E\u81F3\u624B\u81C2\u5B8C\u5168\u4F38\u76F4\u3002"],
    breathing: "\u4E0A\u62C9\u547C\u6C14\uFF0C\u4E0B\u653E\u5438\u6C14\u3002",
    commonMistakes: ["\u9760\u6446\u6D6A\u501F\u529B", "\u53EA\u62C9\u534A\u7A0B", "\u8038\u80A9\u5BFC\u81F4\u80A9\u90E8\u4E0D\u9002"],
    substitutions: ["lat_pulldown", "band_pulldown", "inverted_row"],
    media: ILLU("\u793A\u610F\u56FE\uFF1A\u60AC\u5782\u4E0A\u62C9\uFF08\u672C\u5730\u7ED8\u5236\uFF0C\u975E\u771F\u4EBA\u6F14\u793A\uFF09")
  },
  {
    id: "lat_pulldown",
    name: "\u9AD8\u4F4D\u4E0B\u62C9",
    primaryMuscles: ["lats"],
    secondaryMuscles: ["biceps", "upper_back"],
    equipment: ["machine"],
    movementPattern: "vertical_pull",
    difficulty: 2,
    steps: ["\u5927\u817F\u56FA\u5B9A\u597D\uFF0C\u53CC\u624B\u7565\u5BBD\u4E8E\u80A9\u63E1\u6746\u3002", "\u8EAF\u5E72\u5FAE\u540E\u503E\u7EA6 10-15\xB0\uFF0C\u4E0B\u62C9\u81F3\u4E0A\u80F8\u3002", "\u7F13\u6162\u56DE\u653E\u81F3\u624B\u81C2\u4F38\u76F4\u3001\u80CC\u9614\u808C\u6709\u62C9\u4F38\u611F\u3002"],
    breathing: "\u4E0B\u62C9\u547C\u6C14\uFF0C\u56DE\u653E\u5438\u6C14\u3002",
    commonMistakes: ["\u8EAF\u5E72\u5927\u5E45\u540E\u4EF0\u501F\u529B", "\u7528\u80B1\u4E8C\u5934\u808C\u4E3B\u5BFC"],
    substitutions: ["pull_up", "band_pulldown", "inverted_row"],
    media: ILLU("\u793A\u610F\u56FE\uFF1A\u5750\u59FF\u4E0B\u62C9\uFF08\u672C\u5730\u7ED8\u5236\uFF0C\u975E\u771F\u4EBA\u6F14\u793A\uFF09")
  },
  {
    id: "band_pulldown",
    name: "\u5F39\u529B\u5E26\u9AD8\u4F4D\u4E0B\u62C9",
    primaryMuscles: ["lats"],
    secondaryMuscles: ["biceps", "upper_back"],
    equipment: ["band"],
    movementPattern: "vertical_pull",
    difficulty: 1,
    steps: ["\u5F39\u529B\u5E26\u56FA\u5B9A\u4E8E\u95E8\u6846\u4E0A\u65B9\u6216\u5355\u6760\u3002", "\u8DEA\u59FF\u6216\u5750\u59FF\uFF0C\u53CC\u624B\u63E1\u5E26\u4E0B\u62C9\u81F3\u4E0A\u80F8\u3002", "\u7F13\u6162\u56DE\u653E\u4FDD\u6301\u5F20\u529B\u3002"],
    breathing: "\u4E0B\u62C9\u547C\u6C14\uFF0C\u56DE\u653E\u5438\u6C14\u3002",
    commonMistakes: ["\u56FA\u5B9A\u4E0D\u7262", "\u56DE\u653E\u65F6\u5F39\u529B\u5E26\u677E\u8131"],
    substitutions: ["lat_pulldown", "inverted_row"],
    media: ILLU("\u793A\u610F\u56FE\uFF1A\u5F39\u529B\u5E26\u4E0B\u62C9\uFF08\u672C\u5730\u7ED8\u5236\uFF0C\u975E\u771F\u4EBA\u6F14\u793A\uFF09"),
    safetyNote: "\u4F7F\u7528\u524D\u786E\u8BA4\u5F39\u529B\u5E26\u56FA\u5B9A\u70B9\u7262\u56FA\u3001\u65E0\u88C2\u53E3\u3002"
  },
  /* ------------------------------ 背 · 水平拉 ---------------------------- */
  {
    id: "barbell_row",
    name: "\u6760\u94C3\u5212\u8239",
    primaryMuscles: ["lats", "upper_back"],
    secondaryMuscles: ["biceps", "lower_back", "forearms"],
    equipment: ["barbell"],
    movementPattern: "horizontal_pull",
    difficulty: 4,
    steps: [
      "\u5C48\u9ACB\u4FEF\u8EAB\u81F3\u8EAF\u5E72\u7EA6 45\xB0\uFF0C\u810A\u67F1\u4FDD\u6301\u4E2D\u7ACB\u3002",
      "\u53CC\u624B\u7565\u5BBD\u4E8E\u80A9\u63E1\u6760\uFF0C\u6CBF\u5927\u817F\u65B9\u5411\u62C9\u5411\u4E0B\u8179\u3002",
      "\u9876\u70B9\u6324\u538B\u80A9\u80DB\u540E\u7F13\u6162\u653E\u56DE\u3002"
    ],
    breathing: "\u62C9\u8D77\u547C\u6C14\uFF0C\u56DE\u653E\u5438\u6C14\u3002",
    commonMistakes: ["\u5706\u80CC\u786C\u62C9", "\u9760\u8EAF\u5E72\u6643\u52A8\u8D77\u6760", "\u62C9\u5411\u80F8\u53E3\u5BFC\u81F4\u80A9\u90E8\u524D\u79FB"],
    substitutions: ["dumbbell_row", "seated_cable_row", "inverted_row"],
    media: ILLU("\u793A\u610F\u56FE\uFF1A\u4FEF\u8EAB\u62C9\uFF08\u672C\u5730\u7ED8\u5236\uFF0C\u975E\u771F\u4EBA\u6F14\u793A\uFF09"),
    safetyNote: "\u4E0B\u80CC\u6709\u4E0D\u9002\u53F2\u8005\u614E\u505A\uFF0C\u4F18\u5148\u9009\u62E9\u652F\u6491\u5F0F\u5212\u8239\u3002"
  },
  {
    id: "dumbbell_row",
    name: "\u5355\u81C2\u54D1\u94C3\u5212\u8239",
    primaryMuscles: ["lats", "upper_back"],
    secondaryMuscles: ["biceps", "lower_back"],
    equipment: ["dumbbell", "bench"],
    movementPattern: "horizontal_pull",
    difficulty: 2,
    steps: ["\u4E00\u624B\u4E00\u819D\u652F\u6491\u4E8E\u51F3\u9762\uFF0C\u80CC\u90E8\u4E0E\u5730\u9762\u63A5\u8FD1\u5E73\u884C\u3002", "\u54D1\u94C3\u6CBF\u8EAB\u4F53\u4FA7\u540E\u65B9\u62C9\u81F3\u9ACB\u90E8\u4E0A\u65B9\u3002", "\u9876\u70B9\u80A9\u80DB\u540E\u7F29\uFF0C\u7F13\u6162\u4E0B\u653E\u3002"],
    breathing: "\u62C9\u8D77\u547C\u6C14\uFF0C\u4E0B\u653E\u5438\u6C14\u3002",
    commonMistakes: ["\u8EAF\u5E72\u968F\u52A8\u4F5C\u65CB\u8F6C", "\u8098\u90E8\u8FC7\u5EA6\u5916\u5C55"],
    substitutions: ["seated_cable_row", "barbell_row", "inverted_row"],
    media: ILLU("\u793A\u610F\u56FE\uFF1A\u5355\u81C2\u652F\u6491\u62C9\uFF08\u672C\u5730\u7ED8\u5236\uFF0C\u975E\u771F\u4EBA\u6F14\u793A\uFF09")
  },
  {
    id: "seated_cable_row",
    name: "\u5750\u59FF\u5212\u8239",
    primaryMuscles: ["upper_back", "lats"],
    secondaryMuscles: ["biceps", "rear_delts"],
    equipment: ["machine"],
    movementPattern: "horizontal_pull",
    difficulty: 2,
    steps: ["\u53CC\u811A\u8E29\u7A33\u8E0F\u677F\uFF0C\u819D\u90E8\u5FAE\u5C48\u3002", "\u62C9\u5411\u8179\u90E8\u540C\u65F6\u80A9\u80DB\u540E\u7F29\uFF0C\u8EAF\u5E72\u4E0D\u524D\u503E\u3002", "\u7F13\u6162\u56DE\u653E\u81F3\u624B\u81C2\u4F38\u76F4\u3002"],
    breathing: "\u62C9\u8D77\u547C\u6C14\uFF0C\u56DE\u653E\u5438\u6C14\u3002",
    commonMistakes: ["\u9760\u8EAF\u5E72\u524D\u540E\u6446\u52A8", "\u56DE\u653E\u65F6\u80F8\u690E\u584C\u9677"],
    substitutions: ["dumbbell_row", "inverted_row", "band_row"],
    media: ILLU("\u793A\u610F\u56FE\uFF1A\u5750\u59FF\u6C34\u5E73\u62C9\uFF08\u672C\u5730\u7ED8\u5236\uFF0C\u975E\u771F\u4EBA\u6F14\u793A\uFF09")
  },
  {
    id: "band_row",
    name: "\u5F39\u529B\u5E26\u5750\u59FF\u5212\u8239",
    primaryMuscles: ["upper_back"],
    secondaryMuscles: ["biceps", "rear_delts"],
    equipment: ["band"],
    movementPattern: "horizontal_pull",
    difficulty: 1,
    steps: ["\u5750\u5730\u4F38\u817F\uFF0C\u5F39\u529B\u5E26\u7ED5\u8FC7\u811A\u638C\u3002", "\u53CC\u624B\u63E1\u4E24\u7AEF\u62C9\u5411\u8179\u90E8\uFF0C\u80A9\u80DB\u540E\u7F29\u3002", "\u7F13\u6162\u56DE\u653E\u3002"],
    breathing: "\u62C9\u8D77\u547C\u6C14\uFF0C\u56DE\u653E\u5438\u6C14\u3002",
    commonMistakes: ["\u4EC5\u9760\u624B\u81C2\u5C48\u4F38", "\u5F39\u529B\u5E26\u6253\u6ED1"],
    substitutions: ["seated_cable_row", "inverted_row"],
    media: ILLU("\u793A\u610F\u56FE\uFF1A\u5F39\u529B\u5E26\u6C34\u5E73\u62C9\uFF08\u672C\u5730\u7ED8\u5236\uFF0C\u975E\u771F\u4EBA\u6F14\u793A\uFF09")
  },
  {
    id: "inverted_row",
    name: "\u53CD\u5411\u5212\u8239\uFF08\u6FB3\u5F0F\u5F15\u4F53\uFF09",
    primaryMuscles: ["upper_back", "lats"],
    secondaryMuscles: ["biceps", "abs"],
    equipment: [],
    movementPattern: "horizontal_pull",
    difficulty: 3,
    steps: ["\u6A2A\u6760\u7F6E\u4E8E\u8170\u9AD8\uFF0C\u8EAB\u4F53\u659C\u8EBA\u5728\u6760\u4E0B\u6210\u76F4\u7EBF\u3002", "\u80A9\u80DB\u540E\u7F29\u5C06\u80F8\u53E3\u62C9\u5411\u6A2A\u6760\u3002", "\u7F13\u6162\u4E0B\u964D\u81F3\u624B\u81C2\u4F38\u76F4\u3002"],
    breathing: "\u4E0A\u62C9\u547C\u6C14\uFF0C\u4E0B\u964D\u5438\u6C14\u3002",
    commonMistakes: ["\u81C0\u90E8\u4E0B\u6C89", "\u53EA\u505A\u534A\u7A0B"],
    substitutions: ["seated_cable_row", "lat_pulldown", "band_row"],
    media: ILLU("\u793A\u610F\u56FE\uFF1A\u659C\u8EAB\u62C9\uFF08\u672C\u5730\u7ED8\u5236\uFF0C\u975E\u771F\u4EBA\u6F14\u793A\uFF09")
  },
  {
    id: "face_pull",
    name: "\u9762\u62C9",
    primaryMuscles: ["rear_delts", "upper_back"],
    secondaryMuscles: ["traps"],
    equipment: ["cable"],
    movementPattern: "horizontal_pull",
    difficulty: 2,
    steps: ["\u6ED1\u8F6E\u8C03\u81F3\u4E0A\u80F8\u9AD8\u5EA6\uFF0C\u4F7F\u7528\u7EF3\u7D22\u3002", "\u62C9\u5411\u9762\u90E8\u4E24\u4FA7\uFF0C\u524D\u81C2\u5916\u65CB\u5448\u300C\u6295\u964D\u300D\u59FF\u52BF\u3002", "\u9876\u70B9\u505C\u987F\u540E\u7F13\u6162\u56DE\u653E\u3002"],
    breathing: "\u62C9\u8D77\u547C\u6C14\uFF0C\u56DE\u653E\u5438\u6C14\u3002",
    commonMistakes: ["\u53D8\u6210\u5212\u8239\uFF08\u8098\u90E8\u8D34\u8EAB\uFF09", "\u91CD\u91CF\u8FC7\u5927\u8EAF\u5E72\u524D\u503E"],
    substitutions: ["band_face_pull", "reverse_fly"],
    media: ILLU("\u793A\u610F\u56FE\uFF1A\u7EF3\u7D22\u9762\u62C9\uFF08\u672C\u5730\u7ED8\u5236\uFF0C\u975E\u771F\u4EBA\u6F14\u793A\uFF09")
  },
  {
    id: "band_face_pull",
    name: "\u5F39\u529B\u5E26\u9762\u62C9",
    primaryMuscles: ["rear_delts", "upper_back"],
    secondaryMuscles: ["traps"],
    equipment: ["band"],
    movementPattern: "horizontal_pull",
    difficulty: 1,
    steps: ["\u5F39\u529B\u5E26\u56FA\u5B9A\u4E8E\u4E0E\u773C\u540C\u9AD8\u5904\u3002", "\u53CC\u624B\u63E1\u5E26\u62C9\u5411\u9762\u90E8\u4E24\u4FA7\uFF0C\u5916\u65CB\u524D\u81C2\u3002", "\u7F13\u6162\u56DE\u653E\u3002"],
    breathing: "\u62C9\u8D77\u547C\u6C14\uFF0C\u56DE\u653E\u5438\u6C14\u3002",
    commonMistakes: ["\u56FA\u5B9A\u70B9\u8FC7\u4F4E", "\u8038\u80A9\u4EE3\u507F"],
    substitutions: ["face_pull", "reverse_fly"],
    media: ILLU("\u793A\u610F\u56FE\uFF1A\u5F39\u529B\u5E26\u9762\u62C9\uFF08\u672C\u5730\u7ED8\u5236\uFF0C\u975E\u771F\u4EBA\u6F14\u793A\uFF09")
  },
  /* ------------------------------ 肩 · 垂直推 ---------------------------- */
  {
    id: "overhead_press",
    name: "\u7AD9\u59FF\u6760\u94C3\u80A9\u63A8",
    primaryMuscles: ["front_delts", "side_delts"],
    secondaryMuscles: ["triceps", "abs", "upper_back"],
    equipment: ["barbell"],
    movementPattern: "vertical_push",
    difficulty: 4,
    steps: ["\u53CC\u624B\u7565\u5BBD\u4E8E\u80A9\u63E1\u6760\uFF0C\u6760\u94C3\u7F6E\u4E8E\u9501\u9AA8\u4E0A\u65B9\u3002", "\u6536\u7D27\u6838\u5FC3\u4E0E\u81C0\u90E8\uFF0C\u5934\u90E8\u5728\u6760\u8FC7\u8138\u540E\u5FAE\u5FAE\u524D\u9001\u3002", "\u63A8\u81F3\u5934\u9876\u624B\u81C2\u4F38\u76F4\uFF0C\u8098\u90E8\u524D\u4FA7\u671D\u524D\u3002"],
    breathing: "\u63A8\u8D77\u8FC7\u8138\u540E\u547C\u6C14\uFF0C\u4E0B\u653E\u5438\u6C14\u3002",
    commonMistakes: ["\u8170\u690E\u8FC7\u5EA6\u53CD\u5F13", "\u6760\u94C3\u8F68\u8FF9\u504F\u79BB\u4E2D\u7EBF", "\u80A9\u90E8\u6D3B\u52A8\u5EA6\u4E0D\u8DB3\u5F3A\u63A8"],
    substitutions: ["dumbbell_shoulder_press", "machine_shoulder_press", "pike_push_up"],
    media: ILLU("\u793A\u610F\u56FE\uFF1A\u7AD9\u59FF\u4E0A\u4E3E\uFF08\u672C\u5730\u7ED8\u5236\uFF0C\u975E\u771F\u4EBA\u6F14\u793A\uFF09"),
    safetyNote: "\u80A9\u90E8\u6709\u75BC\u75DB\u6216\u6D3B\u52A8\u53D7\u9650\u65F6\u907F\u514D\uFF0C\u6539\u4E3A\u5668\u68B0\u6216\u5730\u96F7\u6746\u63A8\u4E3E\u3002"
  },
  {
    id: "dumbbell_shoulder_press",
    name: "\u54D1\u94C3\u80A9\u63A8",
    primaryMuscles: ["front_delts", "side_delts"],
    secondaryMuscles: ["triceps"],
    equipment: ["dumbbell"],
    movementPattern: "vertical_push",
    difficulty: 3,
    steps: ["\u5750\u59FF\u6216\u7AD9\u59FF\uFF0C\u54D1\u94C3\u7F6E\u4E8E\u80A9\u4E24\u4FA7\u638C\u5FC3\u671D\u524D\u3002", "\u63A8\u8D77\u81F3\u5934\u9876\uFF0C\u4E24\u4E2A\u54D1\u94C3\u4E0D\u78B0\u649E\u3002", "\u7F13\u6162\u4E0B\u653E\u81F3\u8033\u4FA7\u9AD8\u5EA6\u3002"],
    breathing: "\u63A8\u8D77\u547C\u6C14\uFF0C\u4E0B\u653E\u5438\u6C14\u3002",
    commonMistakes: ["\u8170\u90E8\u53CD\u5F13\u4EE3\u507F", "\u4E0B\u653E\u8FC7\u4F4E\u5BFC\u81F4\u80A9\u524D\u4FA7\u6324\u538B"],
    substitutions: ["overhead_press", "machine_shoulder_press", "pike_push_up"],
    media: ILLU("\u793A\u610F\u56FE\uFF1A\u5206\u81C2\u4E0A\u4E3E\uFF08\u672C\u5730\u7ED8\u5236\uFF0C\u975E\u771F\u4EBA\u6F14\u793A\uFF09")
  },
  {
    id: "machine_shoulder_press",
    name: "\u5668\u68B0\u80A9\u63A8",
    primaryMuscles: ["front_delts", "side_delts"],
    secondaryMuscles: ["triceps"],
    equipment: ["machine"],
    movementPattern: "vertical_push",
    difficulty: 2,
    steps: ["\u8C03\u6574\u5EA7\u6905\u4F7F\u628A\u624B\u4E0E\u80A9\u540C\u9AD8\u3002", "\u80CC\u90E8\u8D34\u7D27\u9760\u57AB\u63A8\u8D77\uFF0C\u9876\u70B9\u4E0D\u9501\u6B7B\u3002", "\u7F13\u6162\u56DE\u653E\u3002"],
    breathing: "\u63A8\u8D77\u547C\u6C14\uFF0C\u56DE\u653E\u5438\u6C14\u3002",
    commonMistakes: ["\u5EA7\u6905\u8FC7\u9AD8\u4F7F\u80A9\u90E8\u53D7\u529B\u5F02\u5E38", "\u8038\u80A9"],
    substitutions: ["dumbbell_shoulder_press", "overhead_press"],
    media: ILLU("\u793A\u610F\u56FE\uFF1A\u5750\u59FF\u4E0A\u4E3E\uFF08\u672C\u5730\u7ED8\u5236\uFF0C\u975E\u771F\u4EBA\u6F14\u793A\uFF09")
  },
  {
    id: "pike_push_up",
    name: "\u6D3E\u514B\u4FEF\u5367\u6491",
    primaryMuscles: ["front_delts", "side_delts"],
    secondaryMuscles: ["triceps", "abs"],
    equipment: [],
    movementPattern: "vertical_push",
    difficulty: 3,
    steps: ["\u8EAB\u4F53\u5448\u5012 V\uFF0C\u81C0\u90E8\u5C3D\u91CF\u62AC\u9AD8\u3002", "\u5C48\u8098\u4F7F\u5934\u9876\u5411\u5730\u9762\u9760\u8FD1\u3002", "\u63A8\u8D77\u56DE\u5230\u8D77\u59CB\u59FF\u52BF\u3002"],
    breathing: "\u4E0B\u653E\u5438\u6C14\uFF0C\u63A8\u8D77\u547C\u6C14\u3002",
    commonMistakes: ["\u81C0\u90E8\u4E0D\u591F\u9AD8\u53D8\u6210\u5E73\u677F\u652F\u6491", "\u624B\u8098\u5916\u5C55\u8FC7\u5927"],
    substitutions: ["dumbbell_shoulder_press", "machine_shoulder_press"],
    media: ILLU("\u793A\u610F\u56FE\uFF1A\u5012 V \u4FEF\u8EAB\u63A8\uFF08\u672C\u5730\u7ED8\u5236\uFF0C\u975E\u771F\u4EBA\u6F14\u793A\uFF09")
  },
  {
    id: "lateral_raise",
    name: "\u54D1\u94C3\u4FA7\u5E73\u4E3E",
    primaryMuscles: ["side_delts"],
    secondaryMuscles: ["traps"],
    equipment: ["dumbbell"],
    movementPattern: "isolation_shoulder",
    difficulty: 2,
    steps: ["\u5FAE\u5C48\u8098\uFF0C\u53CC\u624B\u6301\u54D1\u94C3\u7F6E\u4E8E\u4F53\u4FA7\u3002", "\u5411\u4E24\u4FA7\u62AC\u8D77\u81F3\u4E0E\u80A9\u540C\u9AD8\u6216\u7565\u4F4E\u3002", "\u7F13\u6162\u4E0B\u653E\uFF0C\u907F\u514D\u5B8C\u5168\u5378\u529B\u3002"],
    breathing: "\u62AC\u8D77\u547C\u6C14\uFF0C\u4E0B\u653E\u5438\u6C14\u3002",
    commonMistakes: ["\u7528\u60EF\u6027\u7529\u8D77", "\u8038\u80A9\u4EE3\u507F", "\u62AC\u5F97\u8FC7\u9AD8\u9020\u6210\u649E\u51FB"],
    substitutions: ["cable_lateral_raise", "band_lateral_raise"],
    media: ILLU("\u793A\u610F\u56FE\uFF1A\u53CC\u81C2\u4FA7\u5C55\uFF08\u672C\u5730\u7ED8\u5236\uFF0C\u975E\u771F\u4EBA\u6F14\u793A\uFF09")
  },
  {
    id: "cable_lateral_raise",
    name: "\u7EF3\u7D22\u4FA7\u5E73\u4E3E",
    primaryMuscles: ["side_delts"],
    secondaryMuscles: ["traps"],
    equipment: ["cable"],
    movementPattern: "isolation_shoulder",
    difficulty: 2,
    steps: ["\u6ED1\u8F6E\u8C03\u81F3\u6700\u4F4E\uFF0C\u5BF9\u4FA7\u624B\u63E1\u628A\u624B\u3002", "\u6CBF\u8EAB\u4F53\u4FA7\u65B9\u62AC\u8D77\u81F3\u80A9\u9AD8\u3002", "\u7F13\u6162\u56DE\u653E\u4FDD\u6301\u5F20\u529B\u3002"],
    breathing: "\u62AC\u8D77\u547C\u6C14\uFF0C\u56DE\u653E\u5438\u6C14\u3002",
    commonMistakes: ["\u8EAF\u5E72\u4FA7\u503E\u501F\u529B"],
    substitutions: ["lateral_raise", "band_lateral_raise"],
    media: ILLU("\u793A\u610F\u56FE\uFF1A\u5355\u81C2\u7EF3\u7D22\u4FA7\u5C55\uFF08\u672C\u5730\u7ED8\u5236\uFF0C\u975E\u771F\u4EBA\u6F14\u793A\uFF09")
  },
  {
    id: "band_lateral_raise",
    name: "\u5F39\u529B\u5E26\u4FA7\u5E73\u4E3E",
    primaryMuscles: ["side_delts"],
    secondaryMuscles: ["traps"],
    equipment: ["band"],
    movementPattern: "isolation_shoulder",
    difficulty: 1,
    steps: ["\u53CC\u811A\u8E29\u4F4F\u5F39\u529B\u5E26\u4E2D\u90E8\u3002", "\u53CC\u624B\u63E1\u4E24\u7AEF\u5411\u4E24\u4FA7\u62AC\u8D77\u81F3\u80A9\u9AD8\u3002", "\u7F13\u6162\u4E0B\u653E\u3002"],
    breathing: "\u62AC\u8D77\u547C\u6C14\uFF0C\u4E0B\u653E\u5438\u6C14\u3002",
    commonMistakes: ["\u5F39\u529B\u5E26\u8FC7\u957F\u65E0\u5F20\u529B"],
    substitutions: ["lateral_raise", "cable_lateral_raise"],
    media: ILLU("\u793A\u610F\u56FE\uFF1A\u8E29\u5E26\u4FA7\u5C55\uFF08\u672C\u5730\u7ED8\u5236\uFF0C\u975E\u771F\u4EBA\u6F14\u793A\uFF09")
  },
  {
    id: "reverse_fly",
    name: "\u54D1\u94C3\u53CD\u5411\u98DE\u9E1F",
    primaryMuscles: ["rear_delts", "upper_back"],
    secondaryMuscles: ["traps"],
    equipment: ["dumbbell"],
    movementPattern: "isolation_shoulder",
    difficulty: 2,
    steps: ["\u4FEF\u8EAB\u81F3\u8EAF\u5E72\u63A5\u8FD1\u6C34\u5E73\u3002", "\u5FAE\u5C48\u8098\u5411\u4E24\u4FA7\u5C55\u5F00\u81F3\u80A9\u80DB\u6536\u7D27\u3002", "\u7F13\u6162\u4E0B\u653E\u3002"],
    breathing: "\u5C55\u5F00\u547C\u6C14\uFF0C\u4E0B\u653E\u5438\u6C14\u3002",
    commonMistakes: ["\u7528\u659C\u65B9\u808C\u8038\u80A9", "\u91CD\u91CF\u8FC7\u5927\u8EAF\u5E72\u6643\u52A8"],
    substitutions: ["face_pull", "band_face_pull"],
    media: ILLU("\u793A\u610F\u56FE\uFF1A\u4FEF\u8EAB\u53CD\u5411\u5C55\uFF08\u672C\u5730\u7ED8\u5236\uFF0C\u975E\u771F\u4EBA\u6F14\u793A\uFF09")
  },
  /* --------------------------------- 手臂 -------------------------------- */
  {
    id: "barbell_curl",
    name: "\u6760\u94C3\u5F2F\u4E3E",
    primaryMuscles: ["biceps"],
    secondaryMuscles: ["forearms"],
    equipment: ["barbell"],
    movementPattern: "isolation_arm",
    difficulty: 2,
    steps: ["\u7AD9\u59FF\u53CC\u624B\u4E0E\u80A9\u540C\u5BBD\u53CD\u63E1\u6760\u94C3\u3002", "\u4E0A\u81C2\u56FA\u5B9A\uFF0C\u4EC5\u9760\u8098\u90E8\u5C48\u4F38\u62AC\u8D77\u6760\u94C3\u3002", "\u7F13\u6162\u4E0B\u653E\u81F3\u624B\u81C2\u4F38\u76F4\u3002"],
    breathing: "\u5F2F\u4E3E\u547C\u6C14\uFF0C\u4E0B\u653E\u5438\u6C14\u3002",
    commonMistakes: ["\u8EAF\u5E72\u6446\u52A8\u501F\u529B", "\u624B\u8155\u8FC7\u5EA6\u5F2F\u66F2"],
    substitutions: ["dumbbell_curl", "cable_curl", "hammer_curl"],
    media: ILLU("\u793A\u610F\u56FE\uFF1A\u53CC\u81C2\u5C48\u8098\u4E0A\u4E3E\uFF08\u672C\u5730\u7ED8\u5236\uFF0C\u975E\u771F\u4EBA\u6F14\u793A\uFF09"),
    safetyNote: "\u8155\u90E8\u4E0D\u9002\u53EF\u6539\u7528 EZ \u6760\u6216\u54D1\u94C3\u3002"
  },
  {
    id: "dumbbell_curl",
    name: "\u54D1\u94C3\u5F2F\u4E3E",
    primaryMuscles: ["biceps"],
    secondaryMuscles: ["forearms"],
    equipment: ["dumbbell"],
    movementPattern: "isolation_arm",
    difficulty: 1,
    steps: ["\u7AD9\u59FF\u6216\u5750\u59FF\uFF0C\u53CC\u624B\u6301\u54D1\u94C3\u5782\u4E8E\u4F53\u4FA7\u3002", "\u4EA4\u66FF\u6216\u540C\u65F6\u5C48\u8098\u4E0A\u4E3E\uFF0C\u9876\u70B9\u6324\u538B\u3002", "\u7F13\u6162\u4E0B\u653E\u3002"],
    breathing: "\u5F2F\u4E3E\u547C\u6C14\uFF0C\u4E0B\u653E\u5438\u6C14\u3002",
    commonMistakes: ["\u8098\u90E8\u524D\u79FB\u501F\u529B", "\u4E0B\u653E\u8FC7\u5FEB"],
    substitutions: ["hammer_curl", "cable_curl", "barbell_curl"],
    media: ILLU("\u793A\u610F\u56FE\uFF1A\u5206\u81C2\u5C48\u8098\u4E0A\u4E3E\uFF08\u672C\u5730\u7ED8\u5236\uFF0C\u975E\u771F\u4EBA\u6F14\u793A\uFF09")
  },
  {
    id: "hammer_curl",
    name: "\u9524\u5F0F\u5F2F\u4E3E",
    primaryMuscles: ["biceps", "forearms"],
    secondaryMuscles: [],
    equipment: ["dumbbell"],
    movementPattern: "isolation_arm",
    difficulty: 1,
    steps: ["\u4E2D\u7ACB\u63E1\uFF08\u638C\u5FC3\u76F8\u5BF9\uFF09\u6301\u54D1\u94C3\u3002", "\u5C48\u8098\u4E0A\u4E3E\uFF0C\u4FDD\u6301\u638C\u5FC3\u76F8\u5BF9\u3002", "\u7F13\u6162\u4E0B\u653E\u3002"],
    breathing: "\u5F2F\u4E3E\u547C\u6C14\uFF0C\u4E0B\u653E\u5438\u6C14\u3002",
    commonMistakes: ["\u4E0A\u81C2\u6446\u52A8", "\u91CD\u91CF\u8FC7\u5927"],
    substitutions: ["dumbbell_curl", "cable_curl"],
    media: ILLU("\u793A\u610F\u56FE\uFF1A\u4E2D\u7ACB\u63E1\u5C48\u8098\uFF08\u672C\u5730\u7ED8\u5236\uFF0C\u975E\u771F\u4EBA\u6F14\u793A\uFF09")
  },
  {
    id: "cable_curl",
    name: "\u7EF3\u7D22\u5F2F\u4E3E",
    primaryMuscles: ["biceps"],
    secondaryMuscles: ["forearms"],
    equipment: ["cable"],
    movementPattern: "isolation_arm",
    difficulty: 2,
    steps: ["\u6ED1\u8F6E\u8C03\u81F3\u6700\u4F4E\uFF0C\u53CC\u624B\u63E1\u7EF3\u7D22\u3002", "\u5C48\u8098\u4E0A\u4E3E\uFF0C\u5168\u7A0B\u4FDD\u6301\u5F20\u529B\u3002", "\u7F13\u6162\u56DE\u653E\u3002"],
    breathing: "\u5F2F\u4E3E\u547C\u6C14\uFF0C\u56DE\u653E\u5438\u6C14\u3002",
    commonMistakes: ["\u80A9\u90E8\u53C2\u4E0E", "\u56DE\u653E\u5230\u5E95\u5378\u529B"],
    substitutions: ["dumbbell_curl", "barbell_curl"],
    media: ILLU("\u793A\u610F\u56FE\uFF1A\u7EF3\u7D22\u5C48\u8098\uFF08\u672C\u5730\u7ED8\u5236\uFF0C\u975E\u771F\u4EBA\u6F14\u793A\uFF09")
  },
  {
    id: "triceps_pushdown",
    name: "\u7EF3\u7D22\u4E0B\u538B",
    primaryMuscles: ["triceps"],
    secondaryMuscles: [],
    equipment: ["cable"],
    movementPattern: "isolation_arm",
    difficulty: 2,
    steps: ["\u6ED1\u8F6E\u8C03\u81F3\u6700\u9AD8\uFF0C\u53CC\u624B\u63E1\u6746\u6216\u7EF3\u7D22\u3002", "\u4E0A\u81C2\u8D34\u7D27\u8EAF\u5E72\uFF0C\u4EC5\u4F38\u8098\u4E0B\u538B\u3002", "\u672B\u7AEF\u5206\u5F00\u7EF3\u7D22\u5E76\u505C\u987F\u540E\u56DE\u653E\u3002"],
    breathing: "\u4E0B\u538B\u547C\u6C14\uFF0C\u56DE\u653E\u5438\u6C14\u3002",
    commonMistakes: ["\u8098\u90E8\u5916\u5C55", "\u8EAF\u5E72\u524D\u503E\u501F\u529B"],
    substitutions: ["overhead_triceps_extension", "band_pushdown", "close_grip_push_up"],
    media: ILLU("\u793A\u610F\u56FE\uFF1A\u7AD9\u59FF\u4F38\u8098\u4E0B\u538B\uFF08\u672C\u5730\u7ED8\u5236\uFF0C\u975E\u771F\u4EBA\u6F14\u793A\uFF09")
  },
  {
    id: "band_pushdown",
    name: "\u5F39\u529B\u5E26\u81C2\u5C48\u4F38",
    primaryMuscles: ["triceps"],
    secondaryMuscles: [],
    equipment: ["band"],
    movementPattern: "isolation_arm",
    difficulty: 1,
    steps: ["\u5F39\u529B\u5E26\u56FA\u5B9A\u4E8E\u9AD8\u5904\u3002", "\u4E0A\u81C2\u8D34\u8EAB\uFF0C\u4F38\u8098\u4E0B\u538B\u81F3\u624B\u81C2\u4F38\u76F4\u3002", "\u7F13\u6162\u56DE\u653E\u3002"],
    breathing: "\u4E0B\u538B\u547C\u6C14\uFF0C\u56DE\u653E\u5438\u6C14\u3002",
    commonMistakes: ["\u8098\u90E8\u968F\u52A8\u4F5C\u524D\u79FB"],
    substitutions: ["triceps_pushdown", "close_grip_push_up"],
    media: ILLU("\u793A\u610F\u56FE\uFF1A\u5F39\u529B\u5E26\u4F38\u8098\uFF08\u672C\u5730\u7ED8\u5236\uFF0C\u975E\u771F\u4EBA\u6F14\u793A\uFF09")
  },
  {
    id: "overhead_triceps_extension",
    name: "\u8FC7\u9876\u54D1\u94C3\u81C2\u5C48\u4F38",
    primaryMuscles: ["triceps"],
    secondaryMuscles: [],
    equipment: ["dumbbell"],
    movementPattern: "isolation_arm",
    difficulty: 2,
    steps: ["\u53CC\u624B\u6258\u4F4F\u4E00\u4E2A\u54D1\u94C3\u4E3E\u8FC7\u5934\u9876\u3002", "\u5C48\u8098\u5C06\u54D1\u94C3\u4E0B\u653E\u81F3\u8111\u540E\u3002", "\u4F38\u8098\u8FD8\u539F\uFF0C\u4E0A\u81C2\u5C3D\u91CF\u56FA\u5B9A\u3002"],
    breathing: "\u4F38\u8098\u547C\u6C14\uFF0C\u4E0B\u653E\u5438\u6C14\u3002",
    commonMistakes: ["\u8098\u90E8\u5916\u5F20", "\u8170\u690E\u53CD\u5F13"],
    substitutions: ["triceps_pushdown", "band_pushdown"],
    media: ILLU("\u793A\u610F\u56FE\uFF1A\u8FC7\u9876\u4F38\u8098\uFF08\u672C\u5730\u7ED8\u5236\uFF0C\u975E\u771F\u4EBA\u6F14\u793A\uFF09")
  },
  {
    id: "close_grip_push_up",
    name: "\u7A84\u8DDD\u4FEF\u5367\u6491",
    primaryMuscles: ["triceps"],
    secondaryMuscles: ["chest_mid", "abs"],
    equipment: [],
    movementPattern: "horizontal_push",
    difficulty: 2,
    steps: ["\u53CC\u624B\u4E0E\u80A9\u540C\u5BBD\u6216\u7565\u7A84\u6491\u5730\u3002", "\u8098\u90E8\u8D34\u8FD1\u8EAF\u5E72\u4E0B\u653E\u3002", "\u63A8\u8D77\u81F3\u8098\u90E8\u63A5\u8FD1\u4F38\u76F4\u3002"],
    breathing: "\u4E0B\u653E\u5438\u6C14\uFF0C\u63A8\u8D77\u547C\u6C14\u3002",
    commonMistakes: ["\u8098\u90E8\u5916\u5C55", "\u584C\u8170"],
    substitutions: ["triceps_pushdown", "band_pushdown"],
    media: ILLU("\u793A\u610F\u56FE\uFF1A\u7A84\u8DDD\u4FEF\u8EAB\u63A8\u8D77\uFF08\u672C\u5730\u7ED8\u5236\uFF0C\u975E\u771F\u4EBA\u6F14\u793A\uFF09")
  },
  /* -------------------------------- 下肢 · 蹲 ------------------------------ */
  {
    id: "barbell_back_squat",
    name: "\u6760\u94C3\u6DF1\u8E72",
    primaryMuscles: ["quads", "glutes"],
    secondaryMuscles: ["hamstrings", "lower_back", "abs"],
    equipment: ["barbell"],
    movementPattern: "squat",
    difficulty: 4,
    steps: [
      "\u6760\u94C3\u7F6E\u4E8E\u4E0A\u80CC\uFF08\u9AD8\u4F4D\u6216\u4F4E\u4F4D\uFF09\uFF0C\u53CC\u624B\u63E1\u7D27\u5E76\u6536\u7D27\u4E0A\u80CC\u3002",
      "\u53CC\u811A\u4E0E\u80A9\u540C\u5BBD\u6216\u7565\u5BBD\uFF0C\u811A\u5C16\u81EA\u7136\u5916\u5C55\u3002",
      "\u5C48\u9ACB\u5C48\u819D\u540C\u65F6\u542F\u52A8\u4E0B\u8E72\uFF0C\u819D\u76D6\u6CBF\u811A\u5C16\u65B9\u5411\u3002",
      "\u8E72\u81F3\u5927\u817F\u63A5\u8FD1\u6C34\u5E73\u6216\u66F4\u4F4E\uFF08\u4EE5\u65E0\u75DB\u6D3B\u52A8\u5EA6\u4E3A\u9650\uFF09\uFF0C\u7AD9\u8D77\u65F6\u9ACB\u819D\u540C\u65F6\u4F38\u5C55\u3002"
    ],
    breathing: "\u4E0B\u8E72\u524D\u5438\u6C14\u5E76\u7EF7\u7D27\u6838\u5FC3\uFF0C\u8D77\u8EAB\u8FC7\u7C98\u6EDE\u70B9\u540E\u547C\u6C14\u3002",
    commonMistakes: ["\u819D\u76D6\u5185\u6263", "\u8D77\u8EAB\u65F6\u81C0\u90E8\u5148\u62AC\u53D8\u6210\u65E9\u5B89\u5F0F", "\u8170\u690E\u584C\u9677", "\u811A\u8DDF\u79BB\u5730"],
    cues: ["\u5168\u7A0B\u4FDD\u6301\u810A\u67F1\u4E2D\u7ACB", "\u91CD\u5FC3\u843D\u5728\u5168\u811A\u638C"],
    substitutions: ["goblet_squat", "leg_press", "bodyweight_squat"],
    media: ILLU("\u793A\u610F\u56FE\uFF1A\u8D1F\u91CD\u5C48\u819D\u4E0B\u8E72\uFF08\u672C\u5730\u7ED8\u5236\uFF0C\u975E\u771F\u4EBA\u6F14\u793A\uFF09"),
    safetyNote: "\u819D\u6216\u4E0B\u80CC\u6709\u4E0D\u9002\u8005\uFF0C\u5148\u7528\u7BB1\u5F0F\u6DF1\u8E72\u6216\u817F\u4E3E\u8FC7\u6E21\u3002"
  },
  {
    id: "goblet_squat",
    name: "\u9AD8\u811A\u676F\u6DF1\u8E72",
    primaryMuscles: ["quads", "glutes"],
    secondaryMuscles: ["abs", "upper_back"],
    equipment: [],
    equipmentAlternatives: ["dumbbell", "kettlebell"],
    movementPattern: "squat",
    difficulty: 2,
    steps: ["\u53CC\u624B\u6258\u4F4F\u54D1\u94C3/\u58F6\u94C3\u8D34\u4E8E\u80F8\u53E3\u3002", "\u4E0B\u8E72\u65F6\u8098\u90E8\u5728\u819D\u5185\u4FA7\uFF0C\u4FDD\u6301\u8EAF\u5E72\u76F4\u7ACB\u3002", "\u7AD9\u8D77\u65F6\u81C0\u90E8\u4E0E\u80A9\u540C\u65F6\u4E0A\u5347\u3002"],
    breathing: "\u4E0B\u8E72\u5438\u6C14\uFF0C\u7AD9\u8D77\u547C\u6C14\u3002",
    commonMistakes: ["\u8D1F\u91CD\u8FDC\u79BB\u8EAB\u4F53\u5BFC\u81F4\u524D\u503E", "\u4E0B\u8E72\u4E0D\u8DB3"],
    substitutions: ["bodyweight_squat", "leg_press", "barbell_back_squat"],
    media: ILLU("\u793A\u610F\u56FE\uFF1A\u8D1F\u91CD\u80F8\u524D\u6DF1\u8E72\uFF08\u672C\u5730\u7ED8\u5236\uFF0C\u975E\u771F\u4EBA\u6F14\u793A\uFF09")
  },
  {
    id: "bodyweight_squat",
    name: "\u5F92\u624B\u6DF1\u8E72",
    primaryMuscles: ["quads", "glutes"],
    secondaryMuscles: ["hamstrings"],
    equipment: [],
    movementPattern: "squat",
    difficulty: 1,
    steps: ["\u53CC\u811A\u4E0E\u80A9\u540C\u5BBD\uFF0C\u53CC\u624B\u524D\u5E73\u4E3E\u4FDD\u6301\u5E73\u8861\u3002", "\u5C48\u9ACB\u5C48\u819D\u4E0B\u8E72\u81F3\u8212\u9002\u6DF1\u5EA6\u3002", "\u7AD9\u8D77\u65F6\u6536\u7D27\u81C0\u90E8\u3002"],
    breathing: "\u4E0B\u8E72\u5438\u6C14\uFF0C\u7AD9\u8D77\u547C\u6C14\u3002",
    commonMistakes: ["\u819D\u76D6\u5185\u6263", "\u811A\u8DDF\u79BB\u5730"],
    substitutions: ["goblet_squat", "leg_press", "split_squat"],
    media: ILLU("\u793A\u610F\u56FE\uFF1A\u5F92\u624B\u4E0B\u8E72\uFF08\u672C\u5730\u7ED8\u5236\uFF0C\u975E\u771F\u4EBA\u6F14\u793A\uFF09")
  },
  {
    id: "leg_press",
    name: "\u817F\u4E3E",
    primaryMuscles: ["quads", "glutes"],
    secondaryMuscles: ["hamstrings"],
    equipment: ["machine"],
    movementPattern: "squat",
    difficulty: 2,
    steps: ["\u80CC\u90E8\u8D34\u7D27\u9760\u57AB\uFF0C\u53CC\u811A\u8E29\u5728\u8E0F\u677F\u4E2D\u90E8\u3002", "\u7F13\u6162\u5C48\u819D\u81F3\u5927\u817F\u63A5\u8FD1\u80F8\u90E8\uFF08\u4EE5\u4E0D\u584C\u8170\u4E3A\u9650\uFF09\u3002", "\u63A8\u8D77\u65F6\u819D\u76D6\u4E0D\u9501\u6B7B\u3002"],
    breathing: "\u4E0B\u653E\u5438\u6C14\uFF0C\u63A8\u8D77\u547C\u6C14\u3002",
    commonMistakes: ["\u81C0\u90E8\u79BB\u57AB\u5BFC\u81F4\u8170\u690E\u53D7\u538B", "\u4E0B\u653E\u8FC7\u6DF1\u9AA8\u76C6\u540E\u503E"],
    substitutions: ["goblet_squat", "barbell_back_squat", "bodyweight_squat"],
    media: ILLU("\u793A\u610F\u56FE\uFF1A\u5750\u59FF\u8E6C\u4F38\uFF08\u672C\u5730\u7ED8\u5236\uFF0C\u975E\u771F\u4EBA\u6F14\u793A\uFF09")
  },
  {
    id: "split_squat",
    name: "\u5206\u817F\u8E72",
    primaryMuscles: ["quads", "glutes"],
    secondaryMuscles: ["glute_med", "hamstrings"],
    equipment: [],
    movementPattern: "lunge",
    difficulty: 3,
    unilateral: true,
    steps: ["\u524D\u540E\u811A\u5206\u5F00\uFF0C\u540E\u811A\u811A\u5C16\u70B9\u5730\u3002", "\u91CD\u5FC3\u4FDD\u6301\u5728\u4E2D\u95F4\uFF0C\u5782\u76F4\u4E0B\u8E72\u3002", "\u524D\u811A\u811A\u8DDF\u53D1\u529B\u7AD9\u8D77\u3002"],
    breathing: "\u4E0B\u8E72\u5438\u6C14\uFF0C\u7AD9\u8D77\u547C\u6C14\u3002",
    commonMistakes: ["\u91CD\u5FC3\u8FC7\u5206\u524D\u79FB", "\u540E\u819D\u7838\u5730"],
    substitutions: ["bulgarian_split_squat", "reverse_lunge", "bodyweight_squat"],
    media: ILLU("\u793A\u610F\u56FE\uFF1A\u524D\u540E\u5206\u817F\u4E0B\u8E72\uFF08\u672C\u5730\u7ED8\u5236\uFF0C\u975E\u771F\u4EBA\u6F14\u793A\uFF09")
  },
  {
    id: "bulgarian_split_squat",
    name: "\u4FDD\u52A0\u5229\u4E9A\u5206\u817F\u8E72",
    primaryMuscles: ["quads", "glutes"],
    secondaryMuscles: ["glute_med", "hamstrings"],
    equipment: ["dumbbell", "bench"],
    movementPattern: "lunge",
    difficulty: 4,
    unilateral: true,
    steps: ["\u540E\u811A\u80CC\u642D\u5728\u51F3\u9762\uFF0C\u524D\u811A\u8DDD\u79BB\u7EA6\u4E00\u5C0F\u817F\u957F\u3002", "\u8EAF\u5E72\u7565\u524D\u503E\uFF0C\u5782\u76F4\u4E0B\u8E72\u81F3\u524D\u817F\u63A5\u8FD1\u6C34\u5E73\u3002", "\u524D\u811A\u811A\u8DDF\u53D1\u529B\u7AD9\u8D77\u3002"],
    breathing: "\u4E0B\u8E72\u5438\u6C14\uFF0C\u7AD9\u8D77\u547C\u6C14\u3002",
    commonMistakes: ["\u524D\u811A\u8DDD\u79BB\u8FC7\u8FD1\u5BFC\u81F4\u819D\u76D6\u538B\u529B\u5927", "\u8EAB\u4F53\u8FC7\u5EA6\u524D\u503E"],
    substitutions: ["split_squat", "reverse_lunge", "leg_press"],
    media: ILLU("\u793A\u610F\u56FE\uFF1A\u540E\u811A\u62AC\u9AD8\u4E0B\u8E72\uFF08\u672C\u5730\u7ED8\u5236\uFF0C\u975E\u771F\u4EBA\u6F14\u793A\uFF09")
  },
  {
    id: "reverse_lunge",
    name: "\u540E\u64A4\u6B65\u5F13\u6B65",
    primaryMuscles: ["quads", "glutes"],
    secondaryMuscles: ["glute_med"],
    equipment: [],
    movementPattern: "lunge",
    difficulty: 2,
    unilateral: true,
    steps: ["\u7AD9\u59FF\uFF0C\u4E00\u811A\u5411\u540E\u64A4\u4E00\u5927\u6B65\u3002", "\u540E\u819D\u4E0B\u964D\u81F3\u63A5\u8FD1\u5730\u9762\u3002", "\u524D\u811A\u53D1\u529B\u56DE\u5230\u7AD9\u59FF\u3002"],
    breathing: "\u540E\u64A4\u5438\u6C14\uFF0C\u7AD9\u8D77\u547C\u6C14\u3002",
    commonMistakes: ["\u6B65\u5E45\u8FC7\u5C0F", "\u8EAF\u5E72\u8FC7\u5EA6\u524D\u503E"],
    substitutions: ["split_squat", "bodyweight_squat", "bulgarian_split_squat"],
    media: ILLU("\u793A\u610F\u56FE\uFF1A\u540E\u64A4\u6B65\u4E0B\u8E72\uFF08\u672C\u5730\u7ED8\u5236\uFF0C\u975E\u771F\u4EBA\u6F14\u793A\uFF09")
  },
  /* ------------------------------- 下肢 · 髋铰链 ----------------------------- */
  {
    id: "conventional_deadlift",
    name: "\u6760\u94C3\u786C\u62C9",
    primaryMuscles: ["hamstrings", "glutes", "lower_back"],
    secondaryMuscles: ["traps", "forearms", "lats"],
    equipment: ["barbell"],
    movementPattern: "hinge",
    difficulty: 5,
    steps: [
      "\u53CC\u811A\u4E0E\u9ACB\u540C\u5BBD\uFF0C\u6760\u94C3\u8D34\u8FD1\u5C0F\u817F\uFF08\u8DDD\u5C0F\u817F\u7EA6\u4E00\u6307\uFF09\u3002",
      "\u5C48\u9ACB\u63E1\u4F4F\u6760\u94C3\uFF0C\u810A\u67F1\u4E2D\u7ACB\uFF0C\u80A9\u7565\u524D\u4E8E\u6760\u3002",
      "\u8E6C\u5730\u4F38\u9ACB\u4F38\u819D\u5C06\u6760\u94C3\u8D34\u8EAB\u62C9\u8D77\uFF0C\u7AD9\u76F4\u540E\u80A9\u80DB\u540E\u7F29\u3002",
      "\u4E0B\u653E\u65F6\u5148\u5C48\u9ACB\uFF0C\u6760\u8FC7\u819D\u540E\u518D\u5C48\u819D\u3002"
    ],
    breathing: "\u62C9\u8D77\u524D\u5438\u6C14\u7EF7\u7D27\u6838\u5FC3\uFF0C\u9501\u5B9A\u540E\u547C\u6C14\uFF0C\u4E0D\u8981\u618B\u6C14\u5168\u7A0B\u3002",
    commonMistakes: ["\u5706\u80CC\u8D77\u62C9", "\u6760\u94C3\u8FDC\u79BB\u8EAB\u4F53", "\u5148\u4F38\u819D\u53D8\u6210\u6DF1\u8E72\u8D77"],
    substitutions: ["romanian_deadlift", "hip_thrust", "kettlebell_swing"],
    media: ILLU("\u793A\u610F\u56FE\uFF1A\u5730\u9762\u63D0\u62C9\uFF08\u672C\u5730\u7ED8\u5236\uFF0C\u975E\u771F\u4EBA\u6F14\u793A\uFF09"),
    safetyNote: "\u4E0B\u80CC\u6709\u75BC\u75DB\u53F2\u8005\u5148\u7531\u4E13\u4E1A\u4EBA\u58EB\u8BC4\u4F30\u540E\u518D\u505A\uFF1B\u4F18\u5148\u4ECE\u7F57\u9A6C\u5C3C\u4E9A\u786C\u62C9\u5C0F\u91CD\u91CF\u5B66\u8D77\u3002"
  },
  {
    id: "romanian_deadlift",
    name: "\u7F57\u9A6C\u5C3C\u4E9A\u786C\u62C9",
    primaryMuscles: ["hamstrings", "glutes"],
    secondaryMuscles: ["lower_back", "forearms"],
    // 杠铃版是主版本，哑铃版同样可做：两者是「二选一」，不是同时需要。
    equipment: [],
    equipmentAlternatives: ["barbell", "dumbbell"],
    movementPattern: "hinge",
    difficulty: 3,
    steps: ["\u7AD9\u59FF\u53CC\u624B\u6301\u6760\uFF0C\u819D\u90E8\u5FAE\u5C48\u5E76\u4FDD\u6301\u89D2\u5EA6\u3002", "\u9ACB\u90E8\u5411\u540E\u63A8\uFF0C\u6760\u94C3\u8D34\u817F\u4E0B\u653E\u81F3\u8158\u7EF3\u808C\u6709\u62C9\u4F38\u611F\u3002", "\u4F38\u9ACB\u7AD9\u8D77\uFF0C\u9876\u70B9\u6536\u7D27\u81C0\u90E8\u3002"],
    breathing: "\u4E0B\u653E\u5438\u6C14\uFF0C\u7AD9\u8D77\u547C\u6C14\u3002",
    commonMistakes: ["\u53D8\u6210\u6DF1\u8E72\uFF08\u5C48\u819D\u8FC7\u591A\uFF09", "\u80CC\u90E8\u584C\u9677", "\u6760\u94C3\u8FDC\u79BB\u8EAB\u4F53"],
    substitutions: ["conventional_deadlift", "hip_thrust", "good_morning"],
    media: ILLU("\u793A\u610F\u56FE\uFF1A\u5C48\u9ACB\u540E\u63A8\u63D0\u62C9\uFF08\u672C\u5730\u7ED8\u5236\uFF0C\u975E\u771F\u4EBA\u6F14\u793A\uFF09")
  },
  {
    id: "hip_thrust",
    name: "\u6760\u94C3\u81C0\u63A8",
    primaryMuscles: ["glutes"],
    secondaryMuscles: ["hamstrings", "abs"],
    equipment: ["barbell", "bench"],
    movementPattern: "hinge",
    difficulty: 3,
    steps: ["\u4E0A\u80CC\u9760\u5728\u51F3\u8FB9\uFF0C\u6760\u94C3\u7F6E\u4E8E\u9ACB\u90E8\uFF08\u57AB\u62A4\u57AB\uFF09\u3002", "\u4E0B\u5DF4\u5FAE\u6536\uFF0C\u811A\u8DDF\u53D1\u529B\u9876\u9ACB\u81F3\u8EAF\u5E72\u4E0E\u5927\u817F\u5E73\u884C\u3002", "\u9876\u70B9\u505C\u987F\u540E\u7F13\u6162\u4E0B\u653E\u3002"],
    breathing: "\u9876\u8D77\u547C\u6C14\uFF0C\u4E0B\u653E\u5438\u6C14\u3002",
    commonMistakes: ["\u8170\u690E\u8FC7\u5EA6\u53CD\u5F13\u9876\u8D77", "\u811A\u79BB\u8EAB\u4F53\u8FC7\u8FDC\u6216\u8FC7\u8FD1", "\u4E0B\u5DF4\u4E0A\u62AC"],
    substitutions: ["glute_bridge", "romanian_deadlift", "kettlebell_swing"],
    media: ILLU("\u793A\u610F\u56FE\uFF1A\u4EF0\u5367\u9876\u9ACB\uFF08\u672C\u5730\u7ED8\u5236\uFF0C\u975E\u771F\u4EBA\u6F14\u793A\uFF09")
  },
  {
    id: "glute_bridge",
    name: "\u81C0\u6865",
    primaryMuscles: ["glutes"],
    secondaryMuscles: ["hamstrings", "abs"],
    equipment: [],
    movementPattern: "hinge",
    difficulty: 1,
    steps: ["\u4EF0\u5367\u5C48\u819D\uFF0C\u811A\u8DDF\u8DDD\u81C0\u90E8\u7EA6\u4E00\u638C\u3002", "\u6536\u7D27\u81C0\u90E8\u9876\u9ACB\u81F3\u80A9-\u9ACB-\u819D\u6210\u76F4\u7EBF\u3002", "\u9876\u70B9\u505C\u987F 1 \u79D2\u540E\u7F13\u6162\u4E0B\u843D\u3002"],
    breathing: "\u9876\u8D77\u547C\u6C14\uFF0C\u4E0B\u843D\u5438\u6C14\u3002",
    commonMistakes: ["\u7528\u8170\u9876\u8D77", "\u4E0B\u843D\u8FC7\u5FEB"],
    substitutions: ["hip_thrust", "romanian_deadlift"],
    media: ILLU("\u793A\u610F\u56FE\uFF1A\u4EF0\u5367\u62AC\u9ACB\uFF08\u672C\u5730\u7ED8\u5236\uFF0C\u975E\u771F\u4EBA\u6F14\u793A\uFF09")
  },
  {
    id: "kettlebell_swing",
    name: "\u58F6\u94C3\u6446\u8361",
    primaryMuscles: ["glutes", "hamstrings"],
    secondaryMuscles: ["lower_back", "abs", "forearms"],
    equipment: ["kettlebell"],
    movementPattern: "hinge",
    difficulty: 4,
    steps: ["\u58F6\u94C3\u7F6E\u4E8E\u8EAB\u524D\uFF0C\u5C48\u9ACB\u63E1\u4F4F\u628A\u624B\u3002", "\u9ACB\u90E8\u7206\u53D1\u6027\u524D\u63A8\u4F7F\u58F6\u94C3\u6446\u81F3\u80F8\u9AD8\u3002", "\u58F6\u94C3\u4E0B\u843D\u65F6\u5C48\u9ACB\u7F13\u51B2\uFF0C\u4E0D\u7528\u624B\u81C2\u62AC\u3002"],
    breathing: "\u6446\u51FA\u65F6\u547C\u6C14\uFF0C\u56DE\u843D\u65F6\u5438\u6C14\u3002",
    commonMistakes: ["\u7528\u624B\u81C2\u4E3E\u8D77", "\u53D8\u6210\u6DF1\u8E72", "\u8170\u90E8\u4EE3\u507F"],
    substitutions: ["hip_thrust", "romanian_deadlift", "glute_bridge"],
    media: ILLU("\u793A\u610F\u56FE\uFF1A\u9ACB\u90E8\u6446\u8361\uFF08\u672C\u5730\u7ED8\u5236\uFF0C\u975E\u771F\u4EBA\u6F14\u793A\uFF09"),
    safetyNote: "\u9700\u5148\u638C\u63E1\u57FA\u672C\u9ACB\u94F0\u94FE\u6A21\u5F0F\uFF1B\u5468\u56F4\u7559\u8DB3\u7A7A\u95F4\u3002"
  },
  {
    id: "good_morning",
    name: "\u65E9\u5B89\u5F0F\uFF08\u6760\u94C3\uFF09",
    primaryMuscles: ["hamstrings", "lower_back"],
    secondaryMuscles: ["glutes"],
    equipment: ["barbell"],
    movementPattern: "hinge",
    difficulty: 4,
    steps: ["\u6760\u94C3\u7F6E\u4E8E\u4E0A\u80CC\uFF0C\u819D\u5FAE\u5C48\u3002", "\u9ACB\u90E8\u540E\u63A8\uFF0C\u8EAF\u5E72\u524D\u503E\u81F3\u8158\u7EF3\u808C\u62C9\u4F38\u3002", "\u4F38\u9ACB\u8FD8\u539F\u3002"],
    breathing: "\u524D\u503E\u5438\u6C14\uFF0C\u8FD8\u539F\u547C\u6C14\u3002",
    commonMistakes: ["\u91CD\u91CF\u8FC7\u5927", "\u80CC\u90E8\u584C\u9677"],
    substitutions: ["romanian_deadlift", "glute_bridge"],
    media: ILLU("\u793A\u610F\u56FE\uFF1A\u8D1F\u91CD\u524D\u503E\uFF08\u672C\u5730\u7ED8\u5236\uFF0C\u975E\u771F\u4EBA\u6F14\u793A\uFF09"),
    safetyNote: "\u4E0B\u80CC\u654F\u611F\u8005\u4E0D\u5EFA\u8BAE\u3002"
  },
  {
    id: "bodyweight_rdl",
    name: "\u5F92\u624B\u7F57\u9A6C\u5C3C\u4E9A\u786C\u62C9",
    alias: ["\u5F92\u624B\u5C48\u9ACB"],
    primaryMuscles: ["hamstrings", "glutes"],
    secondaryMuscles: ["lower_back"],
    equipment: [],
    movementPattern: "hinge",
    difficulty: 2,
    steps: [
      "\u7AD9\u59FF\uFF0C\u53CC\u624B\u81EA\u7136\u5782\u653E\u6216\u8F7B\u89E6\u5927\u817F\u3002",
      "\u819D\u76D6\u5FAE\u5C48\u5E76\u9501\u5B9A\u89D2\u5EA6\uFF0C\u9ACB\u90E8\u5411\u540E\u63A8\uFF0C\u8EAF\u5E72\u524D\u503E\u3002",
      "\u8158\u7EF3\u808C\u6709\u660E\u663E\u62C9\u4F38\u540E\u4F38\u9ACB\u8FD8\u539F\uFF0C\u5168\u7A0B\u4FDD\u6301\u80CC\u90E8\u5E73\u76F4\u3002"
    ],
    breathing: "\u524D\u503E\u5438\u6C14\uFF0C\u8FD8\u539F\u547C\u6C14\u3002",
    commonMistakes: ["\u53D8\u6210\u8E72\u4E0B", "\u80CC\u90E8\u584C\u9677", "\u524D\u503E\u5E45\u5EA6\u4E0D\u8DB3"],
    substitutions: ["romanian_deadlift", "glute_bridge", "kettlebell_swing"],
    media: ILLU("\u793A\u610F\u56FE\uFF1A\u5F92\u624B\u5C48\u9ACB\u540E\u63A8\uFF08\u672C\u5730\u7ED8\u5236\uFF0C\u975E\u771F\u4EBA\u6F14\u793A\uFF09")
  },
  {
    id: "single_leg_glute_bridge",
    name: "\u5355\u817F\u81C0\u6865",
    primaryMuscles: ["glutes"],
    secondaryMuscles: ["hamstrings", "glute_med", "abs"],
    equipment: [],
    movementPattern: "hinge",
    difficulty: 3,
    unilateral: true,
    steps: ["\u4EF0\u5367\u5C48\u819D\uFF0C\u4E00\u817F\u4F38\u76F4\u62AC\u8D77\u3002", "\u652F\u6491\u817F\u811A\u8DDF\u53D1\u529B\u9876\u9ACB\u81F3\u80A9-\u9ACB-\u819D\u6210\u76F4\u7EBF\u3002", "\u4FDD\u6301\u9AA8\u76C6\u4E0D\u503E\u659C\uFF0C\u7F13\u6162\u4E0B\u843D\u3002"],
    breathing: "\u9876\u8D77\u547C\u6C14\uFF0C\u4E0B\u843D\u5438\u6C14\u3002",
    commonMistakes: ["\u9AA8\u76C6\u6B6A\u659C", "\u7528\u8170\u90E8\u9876\u8D77"],
    substitutions: ["glute_bridge", "hip_thrust", "bodyweight_rdl"],
    media: ILLU("\u793A\u610F\u56FE\uFF1A\u5355\u817F\u4EF0\u5367\u62AC\u9ACB\uFF08\u672C\u5730\u7ED8\u5236\uFF0C\u975E\u771F\u4EBA\u6F14\u793A\uFF09")
  },
  {
    id: "superman",
    name: "\u8D85\u4EBA\u5F0F\uFF08\u4FEF\u5367\u80CC\u4F38\u5C55\uFF09",
    primaryMuscles: ["lower_back"],
    secondaryMuscles: ["glutes", "upper_back"],
    equipment: [],
    movementPattern: "hinge",
    difficulty: 1,
    steps: ["\u4FEF\u5367\uFF0C\u53CC\u81C2\u524D\u4F38\u3002", "\u540C\u65F6\u62AC\u8D77\u5BF9\u4FA7\u624B\u81C2\u4E0E\u817F\uFF08\u6216\u53CC\u81C2\u53CC\u817F\u540C\u65F6\uFF09\u3002", "\u9876\u70B9\u505C\u987F\u540E\u7F13\u6162\u653E\u4E0B\u3002"],
    breathing: "\u62AC\u8D77\u547C\u6C14\uFF0C\u653E\u4E0B\u5438\u6C14\u3002",
    commonMistakes: ["\u8FC7\u5EA6\u4EF0\u5934\u6324\u538B\u9888\u690E", "\u62AC\u5F97\u8FC7\u9AD8\u9760\u7206\u53D1"],
    substitutions: ["glute_bridge", "bodyweight_rdl"],
    media: ILLU("\u793A\u610F\u56FE\uFF1A\u4FEF\u5367\u4E24\u5934\u62AC\u8D77\uFF08\u672C\u5730\u7ED8\u5236\uFF0C\u975E\u771F\u4EBA\u6F14\u793A\uFF09"),
    safetyNote: "\u4E0B\u80CC\u6709\u75BC\u75DB\u65F6\u505C\u6B62\u3002"
  },
  {
    id: "wall_sit",
    name: "\u9760\u5899\u9759\u8E72",
    primaryMuscles: ["quads"],
    secondaryMuscles: ["glutes"],
    equipment: [],
    movementPattern: "squat",
    difficulty: 2,
    steps: ["\u80CC\u9760\u5899\uFF0C\u53CC\u811A\u4E0E\u80A9\u540C\u5BBD\u8E29\u5B9E\u5730\u9762\u3002", "\u4E0B\u6ED1\u81F3\u5927\u817F\u4E0E\u5730\u9762\u5E73\u884C\u6216\u8212\u9002\u89D2\u5EA6\u3002", "\u4FDD\u6301\u59FF\u52BF\uFF0C\u5747\u5300\u547C\u5438\u3002"],
    breathing: "\u4FDD\u6301\u81EA\u7136\u547C\u5438\uFF0C\u4E0D\u8981\u618B\u6C14\u3002",
    commonMistakes: ["\u819D\u76D6\u8D85\u8FC7\u811A\u5C16\u8FC7\u591A", "\u618B\u6C14"],
    substitutions: ["bodyweight_squat", "goblet_squat", "leg_press"],
    media: ILLU("\u793A\u610F\u56FE\uFF1A\u9760\u5899\u5C48\u819D\u9759\u6B62\uFF08\u672C\u5730\u7ED8\u5236\uFF0C\u975E\u771F\u4EBA\u6F14\u793A\uFF09")
  },
  {
    id: "leg_curl",
    name: "\u817F\u5F2F\u4E3E\uFF08\u5668\u68B0\uFF09",
    primaryMuscles: ["hamstrings"],
    secondaryMuscles: ["calves"],
    equipment: ["machine"],
    movementPattern: "isolation_leg",
    difficulty: 1,
    steps: ["\u8C03\u6574\u6EDA\u57AB\u8D34\u5408\u811A\u8E1D\u4E0A\u65B9\u3002", "\u5411\u81C0\u90E8\u65B9\u5411\u5C48\u819D\uFF0C\u7F13\u6162\u56DE\u653E\u3002"],
    breathing: "\u5C48\u819D\u547C\u6C14\uFF0C\u56DE\u653E\u5438\u6C14\u3002",
    commonMistakes: ["\u81C0\u90E8\u62AC\u79BB\u57AB\u9762", "\u56DE\u653E\u8FC7\u5FEB"],
    substitutions: ["romanian_deadlift", "glute_bridge"],
    media: ILLU("\u793A\u610F\u56FE\uFF1A\u4FEF/\u5750\u59FF\u5C48\u819D\uFF08\u672C\u5730\u7ED8\u5236\uFF0C\u975E\u771F\u4EBA\u6F14\u793A\uFF09")
  },
  {
    id: "leg_extension",
    name: "\u817F\u4F38\u5C55\uFF08\u5668\u68B0\uFF09",
    primaryMuscles: ["quads"],
    secondaryMuscles: [],
    equipment: ["machine"],
    movementPattern: "isolation_leg",
    difficulty: 1,
    steps: ["\u8C03\u6574\u9760\u80CC\u4E0E\u6EDA\u57AB\u4F4D\u7F6E\u3002", "\u4F38\u819D\u81F3\u63A5\u8FD1\u4F38\u76F4\uFF0C\u7F13\u6162\u56DE\u653E\u3002"],
    breathing: "\u4F38\u819D\u547C\u6C14\uFF0C\u56DE\u653E\u5438\u6C14\u3002",
    commonMistakes: ["\u91CD\u91CF\u8FC7\u5927", "\u819D\u5173\u8282\u6709\u6324\u538B\u611F\u4ECD\u7EE7\u7EED"],
    substitutions: ["bodyweight_squat", "goblet_squat"],
    media: ILLU("\u793A\u610F\u56FE\uFF1A\u5750\u59FF\u4F38\u819D\uFF08\u672C\u5730\u7ED8\u5236\uFF0C\u975E\u771F\u4EBA\u6F14\u793A\uFF09"),
    safetyNote: "\u819D\u524D\u4FA7\u4E0D\u9002\u65F6\u505C\u6B62\u3002"
  },
  {
    id: "standing_calf_raise",
    name: "\u7AD9\u59FF\u63D0\u8E35",
    primaryMuscles: ["calves"],
    secondaryMuscles: [],
    // 固定器械版或手持哑铃版均可，二选一。
    equipment: [],
    equipmentAlternatives: ["machine", "dumbbell"],
    movementPattern: "isolation_leg",
    difficulty: 1,
    steps: ["\u524D\u811A\u638C\u8E29\u5728\u53F0\u9636\u6216\u8E0F\u677F\u4E0A\u3002", "\u8E2E\u8D77\u811A\u5C16\u81F3\u6700\u9AD8\u70B9\u505C\u987F\u3002", "\u7F13\u6162\u4E0B\u843D\u81F3\u5C0F\u817F\u62C9\u4F38\u3002"],
    breathing: "\u8E2E\u8D77\u547C\u6C14\uFF0C\u4E0B\u843D\u5438\u6C14\u3002",
    commonMistakes: ["\u9760\u5F39\u9707\u501F\u529B", "\u4E0B\u843D\u4E0D\u8DB3"],
    substitutions: ["seated_calf_raise"],
    media: ILLU("\u793A\u610F\u56FE\uFF1A\u7AD9\u7ACB\u63D0\u8E35\uFF08\u672C\u5730\u7ED8\u5236\uFF0C\u975E\u771F\u4EBA\u6F14\u793A\uFF09")
  },
  {
    id: "seated_calf_raise",
    name: "\u5750\u59FF\u63D0\u8E35",
    primaryMuscles: ["calves"],
    secondaryMuscles: [],
    equipment: ["machine"],
    movementPattern: "isolation_leg",
    difficulty: 1,
    steps: ["\u819D\u90E8\u56FA\u5B9A\u597D\uFF0C\u524D\u811A\u638C\u8E29\u8E0F\u677F\u3002", "\u8E2E\u8D77\u811A\u5C16\u540E\u7F13\u6162\u4E0B\u843D\u3002"],
    breathing: "\u8E2E\u8D77\u547C\u6C14\uFF0C\u4E0B\u843D\u5438\u6C14\u3002",
    commonMistakes: ["\u91CD\u91CF\u8FC7\u5927\u9760\u8EAF\u5E72"],
    substitutions: ["standing_calf_raise"],
    media: ILLU("\u793A\u610F\u56FE\uFF1A\u5750\u59FF\u63D0\u8E35\uFF08\u672C\u5730\u7ED8\u5236\uFF0C\u975E\u771F\u4EBA\u6F14\u793A\uFF09")
  },
  /* --------------------------------- 核心 --------------------------------- */
  {
    id: "plank",
    name: "\u5E73\u677F\u652F\u6491",
    primaryMuscles: ["abs"],
    secondaryMuscles: ["obliques", "glutes"],
    equipment: [],
    movementPattern: "core",
    difficulty: 2,
    steps: ["\u524D\u81C2\u4E0E\u811A\u5C16\u652F\u6491\uFF0C\u8EAB\u4F53\u6210\u4E00\u6761\u76F4\u7EBF\u3002", "\u6536\u7D27\u8179\u90E8\u4E0E\u81C0\u90E8\uFF0C\u4FDD\u6301\u81EA\u7136\u547C\u5438\u3002", "\u5230\u65F6\u95F4\u6216\u65E0\u6CD5\u7EF4\u6301\u59FF\u52BF\u65F6\u7ED3\u675F\u3002"],
    breathing: "\u5168\u7A0B\u4FDD\u6301\u6D45\u800C\u7A33\u5B9A\u7684\u547C\u5438\uFF0C\u4E0D\u8981\u618B\u6C14\u3002",
    commonMistakes: ["\u584C\u8170", "\u6485\u81C0", "\u618B\u6C14"],
    substitutions: ["dead_bug", "side_plank"],
    media: ILLU("\u793A\u610F\u56FE\uFF1A\u4FEF\u6491\u9759\u6B62\uFF08\u672C\u5730\u7ED8\u5236\uFF0C\u975E\u771F\u4EBA\u6F14\u793A\uFF09")
  },
  {
    id: "side_plank",
    name: "\u4FA7\u5E73\u677F\u652F\u6491",
    primaryMuscles: ["obliques"],
    secondaryMuscles: ["abs", "glute_med"],
    equipment: [],
    movementPattern: "core",
    difficulty: 2,
    steps: ["\u5355\u4FA7\u524D\u81C2\u652F\u6491\uFF0C\u8EAB\u4F53\u6210\u76F4\u7EBF\u3002", "\u9ACB\u90E8\u4E0D\u4E0B\u6C89\uFF0C\u4FDD\u6301\u547C\u5438\u3002"],
    breathing: "\u4FDD\u6301\u81EA\u7136\u547C\u5438\u3002",
    commonMistakes: ["\u9ACB\u90E8\u4E0B\u6C89", "\u80A9\u90E8\u584C\u9677"],
    substitutions: ["plank", "dead_bug"],
    media: ILLU("\u793A\u610F\u56FE\uFF1A\u4FA7\u6491\u9759\u6B62\uFF08\u672C\u5730\u7ED8\u5236\uFF0C\u975E\u771F\u4EBA\u6F14\u793A\uFF09")
  },
  {
    id: "dead_bug",
    name: "\u6B7B\u866B\u5F0F",
    primaryMuscles: ["abs"],
    secondaryMuscles: ["obliques"],
    equipment: [],
    movementPattern: "core",
    difficulty: 2,
    steps: ["\u4EF0\u5367\uFF0C\u56DB\u80A2\u62AC\u8D77\u5448\u300C\u684C\u9762\u300D\u59FF\u52BF\u3002", "\u5BF9\u4FA7\u624B\u811A\u7F13\u6162\u4E0B\u653E\u81F3\u63A5\u8FD1\u5730\u9762\u3002", "\u8FD8\u539F\u540E\u6362\u8FB9\u3002"],
    breathing: "\u4E0B\u653E\u547C\u6C14\uFF0C\u8FD8\u539F\u5438\u6C14\u3002",
    commonMistakes: ["\u8170\u90E8\u79BB\u5730", "\u52A8\u4F5C\u8FC7\u5FEB"],
    substitutions: ["plank", "hollow_hold"],
    media: ILLU("\u793A\u610F\u56FE\uFF1A\u4EF0\u5367\u5BF9\u4FA7\u4F38\u5C55\uFF08\u672C\u5730\u7ED8\u5236\uFF0C\u975E\u771F\u4EBA\u6F14\u793A\uFF09")
  },
  {
    id: "hollow_hold",
    name: "\u7A7A\u5FC3\u652F\u6491",
    primaryMuscles: ["abs"],
    secondaryMuscles: ["hip_flexors"],
    equipment: [],
    movementPattern: "core",
    difficulty: 4,
    steps: ["\u4EF0\u5367\uFF0C\u80A9\u4E0E\u817F\u79BB\u5730\uFF0C\u8170\u90E8\u8D34\u7D27\u5730\u9762\u3002", "\u4FDD\u6301\u59FF\u52BF\uFF0C\u624B\u81C2\u8FC7\u5934\u3002"],
    breathing: "\u4FDD\u6301\u6D45\u547C\u5438\u3002",
    commonMistakes: ["\u8170\u90E8\u79BB\u5730", "\u618B\u6C14"],
    substitutions: ["plank", "dead_bug"],
    media: ILLU("\u793A\u610F\u56FE\uFF1A\u4EF0\u5367\u4E24\u5934\u8D77\u9759\u6B62\uFF08\u672C\u5730\u7ED8\u5236\uFF0C\u975E\u771F\u4EBA\u6F14\u793A\uFF09")
  },
  {
    id: "russian_twist",
    name: "\u4FC4\u7F57\u65AF\u8F6C\u4F53",
    primaryMuscles: ["obliques"],
    secondaryMuscles: ["abs"],
    equipment: [],
    movementPattern: "rotation",
    difficulty: 3,
    steps: ["\u5750\u59FF\u5C48\u819D\uFF0C\u8EAF\u5E72\u540E\u503E\u7EA6 45\xB0\u3002", "\u53CC\u624B\u5408\u63E1\u5DE6\u53F3\u8F6C\u4F53\u89E6\u5730\u3002"],
    breathing: "\u8F6C\u52A8\u65F6\u547C\u6C14\u3002",
    commonMistakes: ["\u8170\u90E8\u584C\u9677", "\u4EC5\u9760\u624B\u81C2\u6446\u52A8"],
    substitutions: ["pallof_press", "side_plank"],
    media: ILLU("\u793A\u610F\u56FE\uFF1A\u5750\u59FF\u8F6C\u4F53\uFF08\u672C\u5730\u7ED8\u5236\uFF0C\u975E\u771F\u4EBA\u6F14\u793A\uFF09")
  },
  {
    id: "pallof_press",
    name: "\u5E15\u6D1B\u592B\u63A8\u4E3E\uFF08\u6297\u65CB\u8F6C\uFF09",
    primaryMuscles: ["obliques", "abs"],
    secondaryMuscles: ["glute_med"],
    // 绳索或弹力带固定在侧面均可完成抗旋转推举，二选一。
    equipment: [],
    equipmentAlternatives: ["cable", "band"],
    movementPattern: "rotation",
    difficulty: 2,
    steps: ["\u4FA7\u5BF9\u56FA\u5B9A\u70B9\uFF0C\u53CC\u624B\u6301\u628A\u624B\u4E8E\u80F8\u524D\u3002", "\u5411\u524D\u63A8\u51FA\u5E76\u505C\u987F\uFF0C\u62B5\u6297\u65CB\u8F6C\u3002", "\u7F13\u6162\u6536\u56DE\u3002"],
    breathing: "\u63A8\u51FA\u547C\u6C14\uFF0C\u6536\u56DE\u5438\u6C14\u3002",
    commonMistakes: ["\u8EAF\u5E72\u968F\u62C9\u529B\u65CB\u8F6C", "\u91CD\u91CF\u8FC7\u5927"],
    substitutions: ["russian_twist", "side_plank"],
    media: ILLU("\u793A\u610F\u56FE\uFF1A\u6297\u65CB\u8F6C\u63A8\u4E3E\uFF08\u672C\u5730\u7ED8\u5236\uFF0C\u975E\u771F\u4EBA\u6F14\u793A\uFF09")
  },
  {
    id: "farmer_carry",
    name: "\u519C\u592B\u884C\u8D70",
    primaryMuscles: ["forearms", "traps"],
    secondaryMuscles: ["abs", "glutes", "upper_back"],
    // 哑铃或壶铃都可作为负重，二选一。
    equipment: [],
    equipmentAlternatives: ["dumbbell", "kettlebell"],
    movementPattern: "carry",
    difficulty: 3,
    steps: ["\u53CC\u624B\u6301\u91CD\u7269\u81EA\u7136\u5782\u4E8E\u4F53\u4FA7\u3002", "\u80A9\u80DB\u4E0B\u6C89\uFF0C\u8EAF\u5E72\u76F4\u7ACB\u884C\u8D70\u3002", "\u6B65\u5E45\u6B63\u5E38\uFF0C\u907F\u514D\u8EAB\u4F53\u6447\u6643\u3002"],
    breathing: "\u4FDD\u6301\u81EA\u7136\u547C\u5438\uFF0C\u4E0D\u8981\u618B\u6C14\u3002",
    commonMistakes: ["\u5706\u80A9\u542B\u80F8", "\u8EAF\u5E72\u4FA7\u503E"],
    substitutions: ["suitcase_carry", "plank"],
    media: ILLU("\u793A\u610F\u56FE\uFF1A\u6301\u91CD\u884C\u8D70\uFF08\u672C\u5730\u7ED8\u5236\uFF0C\u975E\u771F\u4EBA\u6F14\u793A\uFF09")
  },
  {
    id: "suitcase_carry",
    name: "\u5355\u4FA7\u624B\u63D0\u884C\u8D70",
    primaryMuscles: ["obliques", "forearms"],
    secondaryMuscles: ["abs", "glute_med"],
    // 哑铃或壶铃均可，二选一。
    equipment: [],
    equipmentAlternatives: ["dumbbell", "kettlebell"],
    movementPattern: "carry",
    difficulty: 3,
    steps: ["\u5355\u624B\u6301\u91CD\uFF0C\u53E6\u4E00\u624B\u81EA\u7136\u5782\u653E\u3002", "\u4FDD\u6301\u8EAF\u5E72\u4E0D\u4FA7\u503E\u5730\u884C\u8D70\u3002", "\u6362\u8FB9\u8FDB\u884C\u3002"],
    breathing: "\u4FDD\u6301\u81EA\u7136\u547C\u5438\u3002",
    commonMistakes: ["\u8EAF\u5E72\u4FA7\u503E", "\u8038\u80A9"],
    substitutions: ["farmer_carry", "pallof_press"],
    media: ILLU("\u793A\u610F\u56FE\uFF1A\u5355\u4FA7\u6301\u91CD\u884C\u8D70\uFF08\u672C\u5730\u7ED8\u5236\uFF0C\u975E\u771F\u4EBA\u6F14\u793A\uFF09")
  },
  /* --------------------------------- 有氧 --------------------------------- */
  {
    id: "treadmill_walk",
    name: "\u8DD1\u6B65\u673A\u5FEB\u8D70/\u6162\u8DD1",
    primaryMuscles: ["cardio_system"],
    secondaryMuscles: ["quads", "calves"],
    equipment: ["cardio"],
    movementPattern: "cardio",
    difficulty: 2,
    steps: ["\u70ED\u8EAB 3 \u5206\u949F\u4F4E\u901F\u3002", "\u7EF4\u6301\u53EF\u5BF9\u8BDD\u7684\u5F3A\u5EA6 20-40 \u5206\u949F\u3002", "\u7ED3\u675F\u524D 3 \u5206\u949F\u9010\u6B65\u964D\u901F\u3002"],
    breathing: "\u9F3B\u5438\u53E3\u547C\uFF0C\u4FDD\u6301\u8282\u594F\u3002",
    commonMistakes: ["\u6276\u7D27\u6276\u624B\u5BFC\u81F4\u59FF\u6001\u53D8\u5F62", "\u5F3A\u5EA6\u8FC7\u9AD8\u65E0\u6CD5\u7EF4\u6301"],
    substitutions: ["jump_rope", "stationary_bike", "burpee"],
    media: ILLU("\u793A\u610F\u56FE\uFF1A\u884C\u8D70/\u6162\u8DD1\uFF08\u672C\u5730\u7ED8\u5236\uFF0C\u975E\u771F\u4EBA\u6F14\u793A\uFF09")
  },
  {
    id: "stationary_bike",
    name: "\u52A8\u611F\u5355\u8F66/\u5065\u8EAB\u8F66",
    primaryMuscles: ["cardio_system"],
    secondaryMuscles: ["quads", "calves"],
    equipment: ["cardio"],
    movementPattern: "cardio",
    difficulty: 1,
    steps: ["\u5EA7\u6905\u9AD8\u5EA6\u8C03\u81F3\u819D\u5FAE\u5C48\u3002", "\u4FDD\u6301 60-90 rpm \u7684\u8E0F\u9891\u3002"],
    breathing: "\u4FDD\u6301\u8282\u594F\u547C\u5438\u3002",
    commonMistakes: ["\u5EA7\u6905\u8FC7\u4F4E\u5BFC\u81F4\u819D\u76D6\u538B\u529B", "\u963B\u529B\u8FC7\u5927\u8E29\u4E0D\u52A8"],
    substitutions: ["treadmill_walk", "jump_rope"],
    media: ILLU("\u793A\u610F\u56FE\uFF1A\u9A91\u884C\uFF08\u672C\u5730\u7ED8\u5236\uFF0C\u975E\u771F\u4EBA\u6F14\u793A\uFF09")
  },
  {
    id: "jump_rope",
    name: "\u8DF3\u7EF3",
    primaryMuscles: ["cardio_system"],
    secondaryMuscles: ["calves"],
    equipment: ["other"],
    movementPattern: "cardio",
    difficulty: 3,
    steps: ["\u7EF3\u5B50\u957F\u5EA6\u8C03\u81F3\u8E29\u4E2D\u70B9\u5230\u814B\u4E0B\u3002", "\u524D\u811A\u638C\u843D\u5730\uFF0C\u5C0F\u5E45\u8DF3\u8DC3\u3002"],
    breathing: "\u4FDD\u6301\u8282\u594F\u547C\u5438\u3002",
    commonMistakes: ["\u8DF3\u5F97\u8FC7\u9AD8", "\u5168\u811A\u638C\u7838\u5730"],
    substitutions: ["treadmill_walk", "stationary_bike"],
    media: ILLU("\u793A\u610F\u56FE\uFF1A\u8DF3\u7EF3\uFF08\u672C\u5730\u7ED8\u5236\uFF0C\u975E\u771F\u4EBA\u6F14\u793A\uFF09"),
    safetyNote: "\u819D\u8E1D\u4E0D\u9002\u8005\u9009\u62E9\u4F4E\u51B2\u51FB\u6709\u6C27\u3002"
  },
  {
    id: "burpee",
    name: "\u6CE2\u6BD4\u8DF3",
    primaryMuscles: ["cardio_system"],
    secondaryMuscles: ["quads", "chest_mid", "abs"],
    equipment: [],
    movementPattern: "cardio",
    difficulty: 4,
    steps: ["\u7AD9\u59FF\u4E0B\u8E72\u53CC\u624B\u6491\u5730\u3002", "\u53CC\u811A\u540E\u64A4\u6210\u5E73\u677F\uFF0C\u53EF\u9009\u4FEF\u5367\u6491\u3002", "\u6536\u817F\u7AD9\u8D77\u3002"],
    breathing: "\u4FDD\u6301\u8282\u594F\u547C\u5438\u3002",
    commonMistakes: ["\u8170\u90E8\u584C\u9677", "\u9891\u7387\u8FC7\u5FEB\u52A8\u4F5C\u53D8\u5F62"],
    substitutions: ["jump_rope", "treadmill_walk"],
    media: ILLU("\u793A\u610F\u56FE\uFF1A\u5168\u8EAB\u8DF3\u8DC3\u52A8\u4F5C\uFF08\u672C\u5730\u7ED8\u5236\uFF0C\u975E\u771F\u4EBA\u6F14\u793A\uFF09")
  }
];
var EXERCISES = RAW.map((e) => __spreadProps(__spreadValues({}, e), {
  createdAt: T0,
  updatedAt: T0
}));
var EXERCISE_MAP = Object.fromEntries(
  EXERCISES.map((e) => [e.id, e])
);

// .mp-build/progression.ts
function historyFor(sessions, exerciseId) {
  return sessions.filter((s) => s.status === "completed").slice().sort((a, b) => a.startedAt < b.startedAt ? -1 : a.startedAt > b.startedAt ? 1 : 0).map((s) => {
    const log = s.logs.find((l) => l.exerciseId === exerciseId);
    if (!log) return null;
    return {
      date: isoDateOf(s.startedAt),
      sets: log.sets.map((x) => ({
        weightKg: x.weightKg,
        reps: x.reps,
        durationSec: x.durationSec,
        rpe: x.rpe,
        status: x.status
      }))
    };
  }).filter((x) => x !== null);
}
function estimate1RM(weightKg, reps) {
  if (!weightKg || !reps) return 0;
  if (reps === 1) return weightKg;
  return Math.round(weightKg * (1 + reps / 30) * 10) / 10;
}
function bestSetVolume(h) {
  return h.sets.filter((s) => s.status === "done").reduce((m, s) => {
    var _a, _b;
    return Math.max(m, ((_a = s.weightKg) != null ? _a : 0) * ((_b = s.reps) != null ? _b : 0));
  }, 0);
}
function best1RM(h) {
  return h.sets.filter((s) => s.status === "done" && s.weightKg && s.reps).reduce((m, s) => Math.max(m, estimate1RM(s.weightKg, s.reps)), 0);
}
function avgRpe(h) {
  const rpes = h.sets.filter((s) => s.status === "done" && typeof s.rpe === "number").map((s) => s.rpe);
  if (!rpes.length) return void 0;
  return Math.round(rpes.reduce((a, b) => a + b, 0) / rpes.length * 10) / 10;
}
var WEIGHT_STEP_PCT = 0.025;
function suggestForExercise(exerciseId, planned, sessions) {
  var _a, _b, _c, _d, _e, _f, _g, _h;
  const ex = EXERCISE_MAP[exerciseId];
  const name = (_a = ex == null ? void 0 : ex.name) != null ? _a : exerciseId;
  const history = historyFor(sessions, exerciseId);
  if (!planned) {
    return {
      exerciseId,
      exerciseName: name,
      kind: "hold",
      from: "\u2014",
      to: "\u2014",
      reason: "\u8BE5\u52A8\u4F5C\u4E0D\u5728\u5F53\u524D\u8BA1\u5212\u4E2D\uFF0C\u65E0\u57FA\u7DDA\u53EF\u6BD4\u5BF9\u3002",
      requiresConfirm: true
    };
  }
  const target = planned.sets[0];
  const fromDesc = (target == null ? void 0 : target.durationSec) ? `${planned.sets.length} \u7EC4 \xD7 ${target.durationSec} \u79D2` : `${planned.sets.length} \u7EC4 \xD7 ${(_b = target == null ? void 0 : target.repsMin) != null ? _b : 0}-${(_c = target == null ? void 0 : target.repsMax) != null ? _c : 0} \u6B21${(target == null ? void 0 : target.weightKg) ? ` @ ${target.weightKg}kg` : ""}`;
  if (history.length < 2) {
    return {
      exerciseId,
      exerciseName: name,
      kind: "hold",
      from: fromDesc,
      to: fromDesc,
      reason: history.length === 0 ? "\u6682\u65E0\u5386\u53F2\u8BB0\u5F55\uFF0C\u5148\u5B8C\u6210 2 \u6B21\u8BAD\u7EC3\u518D\u8C08\u8C03\u6574\u3002" : "\u53EA\u6709 1 \u6B21\u8BB0\u5F55\uFF0C\u6837\u672C\u4E0D\u8DB3\uFF0C\u5148\u7EF4\u6301\u5F53\u524D\u5B89\u6392\u3002",
      requiresConfirm: true
    };
  }
  const last2 = history.slice(-2);
  const allHitTop = last2.every(
    (h) => h.sets.length > 0 && h.sets.every((s) => {
      var _a2, _b2, _c2;
      if (s.status !== "done") return false;
      if (target == null ? void 0 : target.durationSec) {
        return ((_a2 = s.durationSec) != null ? _a2 : target.durationSec) >= target.durationSec;
      }
      return ((_b2 = s.reps) != null ? _b2 : 0) >= ((_c2 = target == null ? void 0 : target.repsMax) != null ? _c2 : 0);
    })
  );
  const rpes = last2.map(avgRpe).filter((r) => typeof r === "number");
  const meanRpe = rpes.length ? rpes.reduce((a, b) => a + b, 0) / rpes.length : void 0;
  const hasIncomplete = last2.some((h) => h.sets.some((s) => s.status !== "done"));
  if (hasIncomplete || meanRpe !== void 0 && meanRpe >= 9.5) {
    const nextSets = Math.max(1, planned.sets.length - 1);
    const toTargets = (target == null ? void 0 : target.durationSec) ? `${nextSets} \u7EC4 \xD7 ${target.durationSec} \u79D2` : `${nextSets} \u7EC4 \xD7 ${(_d = target == null ? void 0 : target.repsMin) != null ? _d : 0}-${(_e = target == null ? void 0 : target.repsMax) != null ? _e : 0} \u6B21`;
    return {
      exerciseId,
      exerciseName: name,
      kind: "reduce_load",
      from: fromDesc,
      to: `${toTargets}\uFF08\u91CD\u91CF\u4E0D\u53D8\u6216\u5C11 5%\uFF09`,
      reason: hasIncomplete ? "\u6700\u8FD1\u8BAD\u7EC3\u6709\u672A\u5B8C\u6210/\u8DF3\u8FC7\u7684\u7EC4\uFF0C\u8BF4\u660E\u5F53\u524D\u8D1F\u8377\u504F\u5927\uFF0C\u5148\u51CF\u91CF\u5E76\u5DE9\u56FA\u52A8\u4F5C\u8D28\u91CF\u3002" : `\u8FD1\u4E24\u6B21\u5E73\u5747 RPE ${meanRpe == null ? void 0 : meanRpe.toFixed(1)}\uFF0C\u63A5\u8FD1\u529B\u7AED\uFF0C\u5EFA\u8BAE\u964D\u4F4E\u4E00\u7EC4\u6216\u51CF\u8F7B 5% \u4EE5\u6062\u590D\u3002`,
      requiresConfirm: true
    };
  }
  if (allHitTop && (meanRpe === void 0 || meanRpe <= 8)) {
    if (target == null ? void 0 : target.durationSec) {
      return {
        exerciseId,
        exerciseName: name,
        kind: "add_rep",
        from: fromDesc,
        to: `${planned.sets.length} \u7EC4 \xD7 ${target.durationSec + 10} \u79D2`,
        reason: "\u8FD1\u4E24\u6B21\u90FD\u80FD\u5B8C\u6210\u76EE\u6807\u65F6\u957F\u4E14\u96BE\u5EA6\u4E0D\u9AD8\uFF0C\u5EFA\u8BAE\u6BCF\u7EC4\u5EF6\u957F 10 \u79D2\u3002",
        requiresConfirm: true
      };
    }
    const lastWeight = (_f = last2[last2.length - 1].sets.find((s) => s.weightKg)) == null ? void 0 : _f.weightKg;
    if (lastWeight && lastWeight > 0) {
      const next = roundToIncrement(lastWeight);
      const pct = Math.round((next - lastWeight) / lastWeight * 1e3) / 10;
      return {
        exerciseId,
        exerciseName: name,
        kind: "add_weight",
        from: fromDesc,
        to: `${planned.sets.length} \u7EC4 \xD7 ${(_g = target == null ? void 0 : target.repsMin) != null ? _g : 0}-${(_h = target == null ? void 0 : target.repsMax) != null ? _h : 0} \u6B21 @ ${next}kg`,
        // 结构化目标值：计划组通常不带 weightKg，UI 必须靠这个字段才能真的把重量写进去。
        targetWeightKg: next,
        reason: `\u8FD1\u4E24\u6B21\u5747\u5B8C\u6210\u76EE\u6807\u6B21\u6570\u4E0A\u9650${meanRpe !== void 0 ? `\uFF0C\u5E73\u5747 RPE ${meanRpe.toFixed(1)}` : ""}\uFF0C\u53EF\u5C1D\u8BD5\u52A0\u91CD ${lastWeight} \u2192 ${next}kg\uFF08\u7EA6 ${pct}%${pct > 5 ? "\uFF0C\u53D7\u6700\u5C0F\u914D\u91CD\u6863\u4F4D\u9650\u5236" : ""}\uFF09\u3002\u82E5\u52A0\u91CD\u540E\u6389\u6B21\u6570\u8F83\u591A\u53EF\u9000\u56DE\u3002`,
        requiresConfirm: true
      };
    }
    if (target == null ? void 0 : target.repsMax) {
      return {
        exerciseId,
        exerciseName: name,
        kind: "add_rep",
        from: fromDesc,
        to: `${planned.sets.length} \u7EC4 \xD7 ${target.repsMin}-${target.repsMax + 1} \u6B21`,
        reason: "\u5F92\u624B/\u65E0\u91CD\u91CF\u52A8\u4F5C\uFF1A\u8FD1\u4E24\u6B21\u5747\u8FBE\u6807\uFF0C\u5EFA\u8BAE\u6BCF\u6B21\u591A 1 \u6B21\u3002",
        requiresConfirm: true
      };
    }
  }
  return {
    exerciseId,
    exerciseName: name,
    kind: "hold",
    from: fromDesc,
    to: fromDesc,
    reason: `\u8FD1\u4E24\u6B21\u8BB0\u5F55\u672A\u6EE1\u8DB3\u52A0\u91CD\u6761\u4EF6\uFF08\u9700\u6BCF\u7EC4\u90FD\u8FBE\u5230\u6B21\u6570\u4E0A\u9650\u4E14\u5E73\u5747 RPE \u2264 8${meanRpe !== void 0 ? `\uFF0C\u5F53\u524D ${meanRpe.toFixed(1)}` : ""}\uFF09\uFF0C\u7EF4\u6301\u5F53\u524D\u5B89\u6392\u3002`,
    requiresConfirm: true
  };
}
function roundToIncrement(kgBase) {
  const step = kgBase < 20 ? 0.5 : 2.5;
  const raw = kgBase * (1 + WEIGHT_STEP_PCT);
  let next = Math.round(raw / step) * step;
  if (next <= kgBase) next = kgBase + step;
  return Math.round(next * 100) / 100;
}
function suggestAll(planItems, sessions) {
  return planItems.map(({ item }) => suggestForExercise(item.exerciseId, item, sessions));
}

// .mp-build/seed/foods.ts
var T02 = "2026-01-01T00:00:00.000Z";
var BUILTIN = (note) => ({ kind: "builtin", note });
var RAW2 = [
  /* --------------------------------- 谷薯 --------------------------------- */
  {
    id: "rice_white_raw",
    name: "\u5927\u7C73\uFF08\u751F\uFF09",
    alias: ["\u767D\u7C73", "\u7C73"],
    category: "grain",
    basis: "raw",
    per100g: { kcal: 346, proteinG: 7.4, carbG: 77.9, fatG: 0.8, fiberG: 0.7 },
    portions: [
      // 注意：不要把「1 碗熟饭」挂到这条「生米」数据上——每 100g 数值是生重基准，
      // 按 150g 熟饭直接乘会高估约 3 倍。熟饭请选 rice_white_cooked。
      { id: "p2", label: "\u751F\u7C73 50g\uFF08\u7EA6 1 \u62F3\uFF09", grams: 50, state: "raw" },
      { id: "p3", label: "100g\uFF08\u751F\uFF09", grams: 100, state: "raw", isDefault: true }
    ],
    cookingHints: ["\u716E\u7C73\u996D\uFF1A\u751F\u7C73\u5438\u6C34\u7EA6 2.2-2.5 \u500D\uFF0C50g \u751F\u7C73 \u2248 130g \u719F\u996D", "\u7092\u996D\u9700\u989D\u5916\u8BA1\u5165\u7528\u6CB9"],
    source: BUILTIN("\u5185\u7F6E\u53C2\u8003\u503C\uFF08\u751F\u91CD\u57FA\u51C6\uFF09\uFF0C\u5B9E\u9645\u56E0\u54C1\u79CD\u4E0E\u52A0\u6C34\u91CF\u6709\u5DEE\u5F02")
  },
  {
    id: "rice_white_cooked",
    name: "\u7C73\u996D\uFF08\u719F\uFF09",
    alias: ["\u767D\u7C73\u996D"],
    category: "grain",
    basis: "cooked",
    per100g: { kcal: 116, proteinG: 2.6, carbG: 25.9, fatG: 0.3 },
    portions: [
      { id: "p1", label: "1 \u7897\uFF08\u7EA6 150g\uFF09", grams: 150, state: "cooked", isDefault: true },
      { id: "p2", label: "100g", grams: 100, state: "cooked" }
    ],
    cookingHints: ["\u82E5\u4F60\u79F0\u91CF\u7684\u662F\u751F\u7C73\uFF0C\u8BF7\u9009\u62E9\u300C\u5927\u7C73\uFF08\u751F\uFF09\u300D\u6761\u76EE"],
    source: BUILTIN("\u5185\u7F6E\u53C2\u8003\u503C\uFF08\u719F\u91CD\u57FA\u51C6\uFF09")
  },
  {
    id: "oats",
    name: "\u71D5\u9EA6\u7247\uFF08\u5E72\uFF09",
    alias: ["\u9EA6\u7247", "\u71D5\u9EA6"],
    category: "grain",
    basis: "raw",
    per100g: { kcal: 377, proteinG: 15, carbG: 61, fatG: 6.7, fiberG: 10.1 },
    portions: [
      { id: "p1", label: "1 \u4EFD 40g\uFF08\u5E38\u89C1\u51B2\u6CE1\u91CF\uFF09", grams: 40, state: "raw", isDefault: true },
      { id: "p2", label: "100g", grams: 100, state: "raw" }
    ],
    cookingHints: ["\u51B2\u6CE1\u540E\u91CD\u91CF\u4F1A\u589E\u52A0\uFF0C\u4F46\u8425\u517B\u6309\u5E72\u91CD\u8BA1\u7B97"],
    source: BUILTIN("\u5185\u7F6E\u53C2\u8003\u503C\uFF08\u5E72\u91CD\u57FA\u51C6\uFF09")
  },
  {
    id: "bread_whole",
    name: "\u5168\u9EA6\u9762\u5305",
    category: "grain",
    basis: "na",
    per100g: { kcal: 247, proteinG: 9, carbG: 41, fatG: 3.4, fiberG: 6 },
    portions: [{ id: "p1", label: "1 \u7247\uFF08\u7EA6 35g\uFF09", grams: 35, state: "na", isDefault: true }],
    source: BUILTIN("\u5185\u7F6E\u53C2\u8003\u503C")
  },
  {
    id: "sweet_potato",
    name: "\u7EA2\u85AF\uFF08\u751F\uFF09",
    alias: ["\u5730\u74DC", "\u756A\u85AF"],
    category: "grain",
    basis: "raw",
    per100g: { kcal: 86, proteinG: 1.6, carbG: 20.1, fatG: 0.2, fiberG: 3 },
    portions: [
      { id: "p1", label: "1 \u4E2A\u4E2D\u7B49\uFF08\u7EA6 150g\uFF0C\u751F\uFF09", grams: 150, state: "raw", isDefault: true },
      { id: "p2", label: "100g", grams: 100, state: "raw" }
    ],
    cookingHints: ["\u84B8\u719F\u540E\u91CD\u91CF\u57FA\u672C\u4E0D\u53D8\uFF0C\u70E4\u5236\u4F1A\u5931\u6C34\u7565\u6D53\u7F29"],
    source: BUILTIN("\u5185\u7F6E\u53C2\u8003\u503C")
  },
  {
    id: "noodles_cooked",
    name: "\u9762\u6761\uFF08\u716E\u719F\uFF09",
    alias: ["\u6302\u9762", "\u62C9\u9762"],
    category: "grain",
    basis: "cooked",
    per100g: { kcal: 138, proteinG: 4.5, carbG: 27, fatG: 0.6 },
    portions: [{ id: "p1", label: "1 \u7897\uFF08\u7EA6 200g \u719F\uFF09", grams: 200, state: "cooked", isDefault: true }],
    source: BUILTIN("\u5185\u7F6E\u53C2\u8003\u503C\uFF08\u719F\u91CD\u57FA\u51C6\uFF0C\u4E0D\u542B\u6C64\u4E0E\u6D47\u5934\u6CB9\u8102\uFF09")
  },
  /* --------------------------------- 蛋白 --------------------------------- */
  {
    id: "chicken_breast_raw",
    name: "\u9E21\u80F8\u8089\uFF08\u751F\uFF09",
    alias: ["\u9E21\u80F8"],
    category: "protein",
    basis: "raw",
    per100g: { kcal: 133, proteinG: 24.6, carbG: 2.5, fatG: 2.6 },
    portions: [
      { id: "p1", label: "1 \u5757\uFF08\u7EA6 150g\uFF0C\u751F\uFF09", grams: 150, state: "raw", isDefault: true },
      { id: "p2", label: "100g\uFF08\u751F\uFF09", grams: 100, state: "raw" }
    ],
    cookingHints: ["\u6C34\u716E/\u714E\u5236\u540E\u5931\u6C34\u7EA6 20-25%\uFF0C\u719F\u91CD 100g \u7EA6\u76F8\u5F53\u4E8E\u751F\u91CD 130g", "\u714E\u5236\u9700\u8BA1\u5165\u7528\u6CB9"],
    source: BUILTIN("\u5185\u7F6E\u53C2\u8003\u503C\uFF08\u751F\u91CD\u57FA\u51C6\uFF09")
  },
  {
    id: "chicken_breast_cooked",
    name: "\u9E21\u80F8\u8089\uFF08\u719F\uFF09",
    category: "protein",
    basis: "cooked",
    per100g: { kcal: 165, proteinG: 31, carbG: 0, fatG: 3.6 },
    portions: [{ id: "p1", label: "100g\uFF08\u719F\uFF09", grams: 100, state: "cooked", isDefault: true }],
    source: BUILTIN("\u5185\u7F6E\u53C2\u8003\u503C\uFF08\u719F\u91CD\u57FA\u51C6\uFF09")
  },
  {
    id: "beef_lean_raw",
    name: "\u725B\u7626\u8089\uFF08\u751F\uFF09",
    alias: ["\u725B\u8089"],
    category: "protein",
    basis: "raw",
    per100g: { kcal: 172, proteinG: 20.2, carbG: 1.2, fatG: 9.5 },
    portions: [{ id: "p1", label: "100g\uFF08\u751F\uFF09", grams: 100, state: "raw", isDefault: true }],
    source: BUILTIN("\u5185\u7F6E\u53C2\u8003\u503C")
  },
  {
    id: "salmon_raw",
    name: "\u4E09\u6587\u9C7C\uFF08\u751F\uFF09",
    category: "protein",
    basis: "raw",
    per100g: { kcal: 208, proteinG: 20.4, carbG: 0, fatG: 13.4 },
    portions: [{ id: "p1", label: "1 \u5757\uFF08\u7EA6 120g\uFF09", grams: 120, state: "raw", isDefault: true }],
    source: BUILTIN("\u5185\u7F6E\u53C2\u8003\u503C")
  },
  {
    id: "shrimp",
    name: "\u867E\u4EC1",
    category: "protein",
    basis: "raw",
    per100g: { kcal: 93, proteinG: 18.6, carbG: 2.8, fatG: 0.8 },
    portions: [{ id: "p1", label: "100g", grams: 100, state: "raw", isDefault: true }],
    source: BUILTIN("\u5185\u7F6E\u53C2\u8003\u503C")
  },
  {
    id: "egg",
    name: "\u9E21\u86CB",
    category: "protein",
    basis: "raw",
    per100g: { kcal: 144, proteinG: 13.3, carbG: 2.8, fatG: 8.8 },
    portions: [
      { id: "p1", label: "1 \u4E2A\uFF08\u7EA6 50g\uFF09", grams: 50, state: "raw", isDefault: true },
      { id: "p2", label: "2 \u4E2A\uFF08\u7EA6 100g\uFF09", grams: 100, state: "raw" }
    ],
    cookingHints: ["\u6C34\u716E\u86CB\u65E0\u9700\u989D\u5916\u7528\u6CB9", "\u714E\u86CB\u4E00\u4EFD\u7EA6\u52A0 5g \u6CB9"],
    source: BUILTIN("\u5185\u7F6E\u53C2\u8003\u503C\uFF08\u5E26\u58F3\u5168\u86CB\u53EF\u98DF\u90E8\u5206\uFF09")
  },
  {
    id: "tofu_firm",
    name: "\u5317\u8C46\u8150",
    alias: ["\u8C46\u8150"],
    category: "protein",
    basis: "raw",
    per100g: { kcal: 98, proteinG: 12.2, carbG: 1.5, fatG: 4.8 },
    portions: [{ id: "p1", label: "1 \u5757\uFF08\u7EA6 200g\uFF09", grams: 200, state: "raw", isDefault: true }],
    source: BUILTIN("\u5185\u7F6E\u53C2\u8003\u503C")
  },
  {
    id: "whey_protein",
    name: "\u4E73\u6E05\u86CB\u767D\u7C89",
    alias: ["\u86CB\u767D\u7C89"],
    category: "protein",
    basis: "raw",
    per100g: { kcal: 390, proteinG: 80, carbG: 6, fatG: 5 },
    portions: [{ id: "p1", label: "1 \u52FA\uFF08\u7EA6 30g\uFF09", grams: 30, state: "raw", isDefault: true }],
    source: BUILTIN("\u5185\u7F6E\u53C2\u8003\u503C\uFF0C\u4E0D\u540C\u54C1\u724C\u5DEE\u5F02\u8F83\u5927\uFF0C\u8BF7\u4EE5\u5305\u88C5\u8425\u517B\u6807\u7B7E\u4E3A\u51C6")
  },
  {
    id: "pork_lean_raw",
    name: "\u732A\u7626\u8089\uFF08\u751F\uFF09",
    category: "protein",
    basis: "raw",
    per100g: { kcal: 143, proteinG: 20.3, carbG: 1, fatG: 6.2 },
    portions: [{ id: "p1", label: "100g", grams: 100, state: "raw", isDefault: true }],
    source: BUILTIN("\u5185\u7F6E\u53C2\u8003\u503C")
  },
  /* -------------------------------- 奶制品 -------------------------------- */
  {
    id: "milk_whole",
    name: "\u5168\u8102\u725B\u5976",
    alias: ["\u725B\u5976"],
    category: "dairy",
    basis: "na",
    per100g: { kcal: 65, proteinG: 3.3, carbG: 4.8, fatG: 3.6 },
    portions: [
      { id: "p1", label: "1 \u676F\uFF08250ml\uFF09", grams: 250, state: "na", isDefault: true },
      { id: "p2", label: "100ml", grams: 100, state: "na" }
    ],
    source: BUILTIN("\u5185\u7F6E\u53C2\u8003\u503C")
  },
  {
    id: "yogurt_plain",
    name: "\u65E0\u7CD6\u9178\u5976",
    alias: ["\u9178\u5976"],
    category: "dairy",
    basis: "na",
    per100g: { kcal: 61, proteinG: 3.5, carbG: 4.9, fatG: 3.2 },
    portions: [{ id: "p1", label: "1 \u676F\uFF08150g\uFF09", grams: 150, state: "na", isDefault: true }],
    source: BUILTIN("\u5185\u7F6E\u53C2\u8003\u503C\uFF08\u65E0\u7CD6\u578B\uFF09")
  },
  {
    id: "greek_yogurt",
    name: "\u5E0C\u814A\u9178\u5976\uFF08\u65E0\u7CD6\uFF09",
    category: "dairy",
    basis: "na",
    per100g: { kcal: 59, proteinG: 10, carbG: 3.6, fatG: 0.4 },
    portions: [{ id: "p1", label: "1 \u676F\uFF08150g\uFF09", grams: 150, state: "na", isDefault: true }],
    source: BUILTIN("\u5185\u7F6E\u53C2\u8003\u503C")
  },
  /* --------------------------------- 蔬菜 --------------------------------- */
  {
    id: "broccoli",
    name: "\u897F\u5170\u82B1",
    category: "vegetable",
    basis: "raw",
    per100g: { kcal: 34, proteinG: 2.8, carbG: 6.6, fatG: 0.4, fiberG: 2.6 },
    portions: [{ id: "p1", label: "100g\uFF08\u751F\uFF09", grams: 100, state: "raw", isDefault: true }],
    cookingHints: ["\u6C34\u716E\u540E\u91CD\u91CF\u53D8\u5316\u4E0D\u5927", "\u6E05\u7092\u9700\u8BA1\u5165\u7528\u6CB9"],
    source: BUILTIN("\u5185\u7F6E\u53C2\u8003\u503C")
  },
  {
    id: "spinach",
    name: "\u83E0\u83DC",
    category: "vegetable",
    basis: "raw",
    per100g: { kcal: 23, proteinG: 2.6, carbG: 2.8, fatG: 0.3, fiberG: 1.7 },
    portions: [{ id: "p1", label: "100g\uFF08\u751F\uFF09", grams: 100, state: "raw", isDefault: true }],
    cookingHints: ["\u712F\u6C34\u540E\u4F53\u79EF\u5927\u5E45\u7F29\u5C0F\uFF0C\u5EFA\u8BAE\u6309\u751F\u91CD\u79F0\u91CF"],
    source: BUILTIN("\u5185\u7F6E\u53C2\u8003\u503C")
  },
  {
    id: "tomato",
    name: "\u756A\u8304",
    alias: ["\u897F\u7EA2\u67FF"],
    category: "vegetable",
    basis: "raw",
    per100g: { kcal: 18, proteinG: 0.9, carbG: 3.9, fatG: 0.2, fiberG: 1 },
    portions: [
      { id: "p1", label: "1 \u4E2A\u4E2D\u7B49\uFF08\u7EA6 150g\uFF09", grams: 150, state: "raw", isDefault: true }
    ],
    source: BUILTIN("\u5185\u7F6E\u53C2\u8003\u503C")
  },
  {
    id: "cucumber",
    name: "\u9EC4\u74DC",
    category: "vegetable",
    basis: "raw",
    per100g: { kcal: 15, proteinG: 0.8, carbG: 2.9, fatG: 0.2 },
    portions: [{ id: "p1", label: "1 \u6839\uFF08\u7EA6 200g\uFF09", grams: 200, state: "raw", isDefault: true }],
    source: BUILTIN("\u5185\u7F6E\u53C2\u8003\u503C")
  },
  {
    id: "carrot",
    name: "\u80E1\u841D\u535C",
    category: "vegetable",
    basis: "raw",
    per100g: { kcal: 41, proteinG: 0.9, carbG: 9.6, fatG: 0.2, fiberG: 2.8 },
    portions: [{ id: "p1", label: "1 \u6839\uFF08\u7EA6 100g\uFF09", grams: 100, state: "raw", isDefault: true }],
    source: BUILTIN("\u5185\u7F6E\u53C2\u8003\u503C")
  },
  /* --------------------------------- 水果 --------------------------------- */
  {
    id: "apple",
    name: "\u82F9\u679C",
    category: "fruit",
    basis: "raw",
    per100g: { kcal: 52, proteinG: 0.3, carbG: 13.8, fatG: 0.2, fiberG: 2.4 },
    portions: [{ id: "p1", label: "1 \u4E2A\u4E2D\u7B49\uFF08\u7EA6 200g\uFF09", grams: 200, state: "raw", isDefault: true }],
    source: BUILTIN("\u5185\u7F6E\u53C2\u8003\u503C")
  },
  {
    id: "banana",
    name: "\u9999\u8549",
    category: "fruit",
    basis: "raw",
    per100g: { kcal: 89, proteinG: 1.1, carbG: 22.8, fatG: 0.3, fiberG: 2.6 },
    portions: [{ id: "p1", label: "1 \u6839\uFF08\u7EA6 120g \u53BB\u76AE\uFF09", grams: 120, state: "raw", isDefault: true }],
    source: BUILTIN("\u5185\u7F6E\u53C2\u8003\u503C\uFF08\u53EF\u98DF\u90E8\u5206\uFF09")
  },
  {
    id: "blueberry",
    name: "\u84DD\u8393",
    category: "fruit",
    basis: "raw",
    per100g: { kcal: 57, proteinG: 0.7, carbG: 14.5, fatG: 0.3, fiberG: 2.4 },
    portions: [{ id: "p1", label: "1 \u76D2\uFF08\u7EA6 125g\uFF09", grams: 125, state: "raw", isDefault: true }],
    source: BUILTIN("\u5185\u7F6E\u53C2\u8003\u503C")
  },
  /* ------------------------------ 油脂坚果 ------------------------------- */
  {
    id: "olive_oil",
    name: "\u6A44\u6984\u6CB9",
    alias: ["\u98DF\u7528\u6CB9"],
    category: "fat",
    basis: "na",
    per100g: { kcal: 884, proteinG: 0, carbG: 0, fatG: 100 },
    portions: [
      { id: "p1", label: "1 \u8336\u5319\uFF08\u7EA6 5g\uFF09", grams: 5, state: "na", isDefault: true },
      { id: "p2", label: "1 \u6C64\u5319\uFF08\u7EA6 15g\uFF09", grams: 15, state: "na" }
    ],
    source: BUILTIN("\u5185\u7F6E\u53C2\u8003\u503C")
  },
  {
    id: "almond",
    name: "\u674F\u4EC1",
    category: "fat",
    basis: "raw",
    per100g: { kcal: 579, proteinG: 21.2, carbG: 21.6, fatG: 49.9, fiberG: 12.5 },
    portions: [{ id: "p1", label: "\u4E00\u5C0F\u628A\uFF08\u7EA6 20g\uFF09", grams: 20, state: "raw", isDefault: true }],
    source: BUILTIN("\u5185\u7F6E\u53C2\u8003\u503C")
  },
  {
    id: "peanut_butter",
    name: "\u82B1\u751F\u9171",
    category: "fat",
    basis: "na",
    per100g: { kcal: 588, proteinG: 25.1, carbG: 20, fatG: 50.4 },
    portions: [{ id: "p1", label: "1 \u52FA\uFF08\u7EA6 15g\uFF09", grams: 15, state: "na", isDefault: true }],
    source: BUILTIN("\u5185\u7F6E\u53C2\u8003\u503C")
  },
  /* --------------------------------- 饮品 --------------------------------- */
  {
    id: "water",
    name: "\u6C34",
    category: "drink",
    basis: "na",
    per100g: { kcal: 0, proteinG: 0, carbG: 0, fatG: 0 },
    portions: [{ id: "p1", label: "1 \u676F\uFF08250ml\uFF09", grams: 250, state: "na", isDefault: true }],
    source: BUILTIN("\u5185\u7F6E\u53C2\u8003\u503C")
  },
  {
    id: "black_coffee",
    name: "\u9ED1\u5496\u5561\uFF08\u4E0D\u52A0\u7CD6\u5976\uFF09",
    alias: ["\u7F8E\u5F0F"],
    category: "drink",
    basis: "na",
    per100g: { kcal: 2, proteinG: 0.1, carbG: 0.3, fatG: 0 },
    portions: [{ id: "p1", label: "1 \u676F\uFF08250ml\uFF09", grams: 250, state: "na", isDefault: true }],
    source: BUILTIN("\u5185\u7F6E\u53C2\u8003\u503C")
  },
  {
    id: "cola",
    name: "\u53EF\u4E50",
    category: "drink",
    basis: "na",
    per100g: { kcal: 42, proteinG: 0, carbG: 10.6, fatG: 0 },
    portions: [{ id: "p1", label: "1 \u7F50\uFF08330ml\uFF09", grams: 330, state: "na", isDefault: true }],
    source: BUILTIN("\u5185\u7F6E\u53C2\u8003\u503C")
  }
];
var FOODS = RAW2.map((f) => __spreadProps(__spreadValues({}, f), { createdAt: T02, updatedAt: T02 }));
var FOOD_MAP = Object.fromEntries(FOODS.map((f) => [f.id, f]));
var FOOD_CATEGORY_LABEL = {
  grain: "\u8C37\u85AF",
  protein: "\u86CB\u767D",
  vegetable: "\u852C\u83DC",
  fruit: "\u6C34\u679C",
  dairy: "\u5976\u5236\u54C1",
  fat: "\u6CB9\u8102\u575A\u679C",
  drink: "\u996E\u54C1",
  other: "\u5176\u4ED6"
};
var FOOD_SUBSTITUTES = {
  chicken_breast_raw: ["chicken_breast_cooked", "tofu_firm", "shrimp", "pork_lean_raw"],
  chicken_breast_cooked: ["chicken_breast_raw", "shrimp", "tofu_firm"],
  beef_lean_raw: ["pork_lean_raw", "chicken_breast_raw", "salmon_raw"],
  pork_lean_raw: ["chicken_breast_raw", "beef_lean_raw", "tofu_firm"],
  salmon_raw: ["shrimp", "beef_lean_raw", "chicken_breast_raw"],
  shrimp: ["salmon_raw", "chicken_breast_raw", "tofu_firm"],
  tofu_firm: ["chicken_breast_raw", "shrimp", "egg"],
  egg: ["tofu_firm", "chicken_breast_raw", "greek_yogurt"],
  rice_white_raw: ["rice_white_cooked", "oats", "sweet_potato", "noodles_cooked"],
  rice_white_cooked: ["rice_white_raw", "sweet_potato", "noodles_cooked"],
  oats: ["bread_whole", "sweet_potato", "rice_white_raw"],
  bread_whole: ["oats", "sweet_potato"],
  sweet_potato: ["rice_white_raw", "oats", "bread_whole"],
  noodles_cooked: ["rice_white_cooked", "sweet_potato"],
  milk_whole: ["yogurt_plain", "greek_yogurt"],
  yogurt_plain: ["greek_yogurt", "milk_whole"],
  greek_yogurt: ["yogurt_plain", "milk_whole", "whey_protein"],
  whey_protein: ["greek_yogurt", "chicken_breast_raw", "egg"],
  broccoli: ["spinach", "cucumber", "carrot"],
  spinach: ["broccoli", "cucumber"],
  tomato: ["cucumber", "carrot"],
  cucumber: ["tomato", "broccoli"],
  carrot: ["broccoli", "tomato"],
  apple: ["banana", "blueberry"],
  banana: ["apple", "blueberry"],
  blueberry: ["apple", "banana"],
  olive_oil: ["peanut_butter", "almond"],
  almond: ["peanut_butter", "olive_oil"],
  peanut_butter: ["almond", "olive_oil"],
  water: ["black_coffee"],
  black_coffee: ["water"],
  cola: ["water", "black_coffee"]
};

// .mp-build/weekly.ts
function buildWeeklyReport(args) {
  var _a, _b, _c, _d, _e, _f;
  const { today, plan, sessions, entries, weights, recovery, targets } = args;
  const weekStart = startOfWeekISO(today);
  const weekEnd = addDays(weekStart, 6);
  const inWeek = (d) => d >= weekStart && d <= weekEnd;
  const plannedDays = plan ? plan.days.filter((d) => !d.restDay).length : 0;
  const sessionDate = (s) => isoDateOf(s.startedAt);
  const completedSessions = sessions.filter(
    (s) => s.status === "completed" && inWeek(sessionDate(s))
  );
  const allSessionsInWeek = sessions.filter((s) => inWeek(sessionDate(s)));
  const completionRate = plannedDays > 0 ? Math.min(1, completedSessions.length / plannedDays) : null;
  const completionNote = plannedDays === 0 ? "\u8FD8\u6CA1\u6709\u8BAD\u7EC3\u8BA1\u5212\uFF0C\u65E0\u6CD5\u8BA1\u7B97\u5B8C\u6210\u7387\u3002" : `\u672C\u5468\u8BA1\u5212 ${plannedDays} \u6B21\uFF0C\u5DF2\u8BB0\u5F55 ${allSessionsInWeek.length} \u6B21\uFF08\u5B8C\u6210 ${completedSessions.length} \u6B21\uFF09\u3002`;
  let totalVolumeKg = 0;
  for (const s of completedSessions) {
    for (const l of s.logs) {
      for (const set of l.sets) {
        if (set.status === "done") totalVolumeKg += ((_a = set.weightKg) != null ? _a : 0) * ((_b = set.reps) != null ? _b : 0);
      }
    }
  }
  const exerciseIds = /* @__PURE__ */ new Set();
  completedSessions.forEach((s) => s.logs.forEach((l) => exerciseIds.add(l.exerciseId)));
  const exercisePerformance = [...exerciseIds].map((id) => {
    var _a2, _b2;
    const h = historyFor(completedSessions.length ? sessions : [], id);
    const last = h[h.length - 1];
    const prev = h[h.length - 2];
    const weighted = last && last.sets.some((s) => s.weightKg);
    const unit = weighted ? "1RM" : "\u5BB9\u91CF";
    const lastBest = last ? weighted ? best1RM(last) : bestSetVolume(last) : 0;
    const prevBest = prev ? weighted ? best1RM(prev) : bestSetVolume(prev) : 0;
    return {
      exerciseId: id,
      exerciseName: (_b2 = (_a2 = EXERCISE_MAP[id]) == null ? void 0 : _a2.name) != null ? _b2 : id,
      lastBest,
      prevBest,
      delta: Math.round((lastBest - prevBest) * 10) / 10,
      unit,
      enough: h.length >= 2
    };
  });
  exercisePerformance.sort((a, b) => b.delta - a.delta);
  const weekEntries = entries.filter((e) => inWeek(e.date));
  const days = new Set(weekEntries.map((e) => e.date));
  const dayTotals = /* @__PURE__ */ new Map();
  for (const e of weekEntries) {
    const food = e.foodId ? (_d = FOOD_MAP[e.foodId]) != null ? _d : (_c = args.foods) == null ? void 0 : _c.find((f) => f.id === e.foodId) : void 0;
    const matched = food != null ? food : FOODS.find(
      (f) => {
        var _a2;
        return f.name === e.foodName || ((_a2 = f.alias) != null ? _a2 : []).includes(e.foodName);
      }
    );
    const per100 = (_e = matched == null ? void 0 : matched.per100g) != null ? _e : { kcal: 0, proteinG: 0, carbG: 0, fatG: 0 };
    const n = nutrientsFor(e, per100);
    const cur = (_f = dayTotals.get(e.date)) != null ? _f : { kcal: 0, protein: 0 };
    dayTotals.set(e.date, { kcal: cur.kcal + n.kcal, protein: cur.protein + n.proteinG });
  }
  const totals = [...dayTotals.values()];
  const avgKcal = totals.length ? Math.round(totals.reduce((a, b) => a + b.kcal, 0) / totals.length) : null;
  const avgProtein = totals.length ? Math.round(totals.reduce((a, b) => a + b.protein, 0) / totals.length) : null;
  const proteinHitDays = totals.filter((t) => t.protein >= targets.proteinG * 0.9).length;
  const nutritionEnough = totals.length >= 3;
  const wpoints = weights.filter((w) => inWeek(w.date)).map((w) => ({ date: w.date, kg: w.weightKg })).sort((a, b) => a.date < b.date ? -1 : 1);
  const recent = weights.slice(-14);
  let changeKg = null;
  let trend = "unknown";
  if (wpoints.length >= 2) {
    changeKg = Math.round((wpoints[wpoints.length - 1].kg - wpoints[0].kg) * 10) / 10;
    trend = changeKg < -0.3 ? "down" : changeKg > 0.3 ? "up" : "flat";
  }
  const weightEnough = recent.length >= 4 && wpoints.length >= 2;
  const weekRecovery = recovery.filter((r) => inWeek(r.date));
  const sleeps = weekRecovery.map((r) => r.sleepHours).filter((x) => typeof x === "number");
  const fatigues = weekRecovery.map((r) => r.fatigue).filter((x) => typeof x === "number");
  const recoveryEnough = weekRecovery.length >= 3;
  const cautions = [];
  if (weekRecovery.some((r) => r.hasPain)) {
    cautions.push(
      "\u672C\u5468\u6709\u8BB0\u5F55\u75BC\u75DB\u53CD\u9988\uFF1A\u5EFA\u8BAE\u6682\u505C\u5F15\u53D1\u4E0D\u9002\u7684\u52A8\u4F5C\uFF0C\u82E5\u6301\u7EED\u8D85\u8FC7 3-5 \u5929\u6216\u52A0\u91CD\uFF0C\u8BF7\u5BFB\u6C42\u533B\u751F/\u7269\u7406\u6CBB\u7597\u5E08\u7684\u9762\u5BF9\u9762\u8BC4\u4F30\u3002\u672C\u5E94\u7528\u4E0D\u505A\u8BCA\u65AD\uFF0C\u4E5F\u4E0D\u63D0\u4F9B\u5EB7\u590D\u5904\u65B9\u3002"
    );
  }
  if (recoveryEnough && sleeps.length && sleeps.reduce((a, b) => a + b, 0) / sleeps.length < 6) {
    cautions.push("\u672C\u5468\u5E73\u5747\u7761\u7720\u4F4E\u4E8E 6 \u5C0F\u65F6\uFF0C\u6062\u590D\u53EF\u80FD\u4E0D\u8DB3\uFF0C\u8BAD\u7EC3\u8868\u73B0\u4E0B\u6ED1\u5C5E\u5E38\u89C1\u73B0\u8C61\u3002");
  }
  if (avgKcal !== null && nutritionEnough && avgKcal < targets.kcal * 0.7) {
    cautions.push("\u5E73\u5747\u6444\u5165\u660E\u663E\u4F4E\u4E8E\u76EE\u6807\uFF08<70%\uFF09\uFF0C\u957F\u671F\u5982\u6B64\u53EF\u80FD\u5F71\u54CD\u8BAD\u7EC3\u6062\u590D\uFF0C\u5EFA\u8BAE\u590D\u67E5\u8BB0\u5F55\u662F\u5426\u5B8C\u6574\u6216\u9002\u5F53\u4E0A\u8C03\u3002");
  }
  if (!weightEnough) {
    cautions.push("\u4F53\u91CD\u6570\u636E\u4E0D\u8DB3\uFF08\u81F3\u5C11\u9700\u8981 4 \u6761\u8BB0\u5F55\uFF09\uFF0C\u672C\u5468\u4E0D\u505A\u4F53\u91CD\u8D8B\u52BF\u7ED3\u8BBA\u3002");
  }
  return {
    weekStart,
    weekEnd,
    plannedDays,
    completedSessions,
    completionRate,
    completionNote,
    totalVolumeKg: Math.round(totalVolumeKg),
    exercisePerformance,
    nutrition: {
      daysLogged: totals.length,
      avgKcal,
      avgProtein,
      proteinHitDays,
      targetProtein: targets.proteinG,
      targetKcal: targets.kcal,
      enough: nutritionEnough,
      note: nutritionEnough ? `\u672C\u5468\u6709 ${totals.length} \u5929\u996E\u98DF\u8BB0\u5F55\uFF0C\u5176\u4E2D ${proteinHitDays} \u5929\u86CB\u767D\u8D28\u8FBE\u5230\u76EE\u6807\u7684 90%\u3002` : "\u996E\u98DF\u8BB0\u5F55\u4E0D\u8DB3 3 \u5929\uFF0C\u6682\u4E0D\u8BC4\u4EF7\u6444\u5165\u662F\u5426\u8FBE\u6807\u3002"
    },
    weight: {
      points: wpoints,
      changeKg,
      trend,
      enough: weightEnough,
      note: weightEnough ? changeKg !== null ? `\u672C\u5468\u4F53\u91CD\u53D8\u5316 ${changeKg > 0 ? "+" : ""}${changeKg} kg\uFF08\u8D8B\u52BF\uFF1A${{ down: "\u4E0B\u964D", up: "\u4E0A\u5347", flat: "\u57FA\u672C\u6301\u5E73", unknown: "\u672A\u77E5" }[trend]}\uFF09\u3002\u5355\u65E5\u6CE2\u52A8\u53D7\u6C34\u5206\u4E0E\u996E\u98DF\u5F71\u54CD\u5F88\u5927\uFF0C\u8BF7\u7ED3\u5408 2-4 \u5468\u8D8B\u52BF\u5224\u65AD\u3002` : "\u4F53\u91CD\u6570\u636E\u4E0D\u8DB3\u4EE5\u5224\u65AD\u8D8B\u52BF\u3002" : "\u4F53\u91CD\u8BB0\u5F55\u4E0D\u8DB3\uFF0C\u9700\u81F3\u5C11 4 \u6761\u8BB0\u5F55\u624D\u4F1A\u7ED9\u51FA\u8D8B\u52BF\u3002"
    },
    recovery: {
      avgSleepHours: sleeps.length ? Math.round(sleeps.reduce((a, b) => a + b, 0) / sleeps.length * 10) / 10 : null,
      avgFatigue: fatigues.length ? Math.round(fatigues.reduce((a, b) => a + b, 0) / fatigues.length * 10) / 10 : null,
      painDays: weekRecovery.filter((r) => r.hasPain).length,
      enough: recoveryEnough,
      note: recoveryEnough ? `\u672C\u5468\u6709 ${weekRecovery.length} \u5929\u6062\u590D\u8BB0\u5F55\u3002` : "\u6062\u590D\u8BB0\u5F55\u4E0D\u8DB3 3 \u5929\uFF0C\u6682\u4E0D\u505A\u7ED3\u8BBA\u3002"
    },
    cautions
  };
}
function dateRangeOfWeek(weekStart) {
  return Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
}
function todayISODate() {
  return toISODate(/* @__PURE__ */ new Date());
}

// .mp-build/db.ts
var ROOT_KEY = "fitloop:db";
var cache = null;
var listeners = /* @__PURE__ */ new Set();
function load() {
  if (cache) return cache;
  try {
    const raw = wx.getStorageSync(ROOT_KEY);
    cache = raw && typeof raw === "object" ? raw : {};
  } catch (e) {
    cache = {};
  }
  return cache;
}
function flush() {
  try {
    wx.setStorageSync(ROOT_KEY, cache != null ? cache : {});
  } catch (e) {
  }
  listeners.forEach((fn) => {
    try {
      fn();
    } catch (e) {
    }
  });
}
function bucket(store) {
  const db = load();
  if (!db[store]) db[store] = {};
  return db[store];
}
var DB_NAME = "fitloop";
var DB_VERSION = 1;
function isPersistenceAvailable() {
  return typeof wx !== "undefined" && typeof wx.setStorageSync === "function";
}
function isUsingFallback() {
  return !isPersistenceAvailable();
}
async function getMeta(key) {
  var _a;
  return (_a = bucket("meta")[key]) != null ? _a : void 0;
}
async function getAll(store) {
  return Object.values(bucket(store));
}
async function getOne(store, key) {
  var _a;
  return (_a = bucket(store)[key]) != null ? _a : void 0;
}
async function put(store, value, key) {
  const b = bucket(store);
  const v = value;
  const k = key != null ? key : typeof (v == null ? void 0 : v.id) === "string" ? v.id : void 0;
  if (!k) throw new Error(`put(${store}) \u9700\u8981 key`);
  b[k] = v;
  flush();
}
async function putMany(store, values) {
  const b = bucket(store);
  for (const value of values) {
    const v = value;
    const k = typeof (v == null ? void 0 : v.id) === "string" ? v.id : void 0;
    if (k) b[k] = v;
  }
  flush();
}
async function remove(store, key) {
  const b = bucket(store);
  delete b[key];
  flush();
}
async function getByIndex(store, index, value) {
  const field = index === "byDate" ? "date" : index === "byName" ? "name" : index;
  return Object.values(bucket(store)).filter((it) => it[field] === value);
}
async function clearStore(store) {
  const db = load();
  db[store] = {};
  flush();
}
async function exportAll() {
  const db = load();
  const out = {};
  for (const name of Object.keys(db)) out[name] = Object.values(db[name]);
  return out;
}
async function wipeAll() {
  cache = {};
  try {
    wx.removeStorageSync(ROOT_KEY);
  } catch (e) {
  }
  listeners.forEach((fn) => {
    try {
      fn();
    } catch (e) {
    }
  });
}
function subscribe(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

// .mp-build/session.ts
var KEY = "sessionUi";
async function loadSessionUi() {
  return getOne("meta", KEY);
}
async function saveSessionUi(s) {
  await put("meta", __spreadProps(__spreadValues({}, s), { updatedAt: Date.now() }), KEY);
}
async function clearSessionUi() {
  await remove("meta", KEY);
}
function buildWarmups(day, generic = false) {
  const list = [
    { id: "w1", label: "5 \u5206\u949F\u4F4E\u5F3A\u5EA6\u6709\u6C27\uFF08\u5FEB\u8D70/\u6162\u9A91/\u5F00\u5408\u8DF3\uFF09", done: false },
    { id: "w2", label: "\u52A8\u6001\u5173\u8282\u6D3B\u52A8\uFF1A\u80A9\u7ED5\u73AF \xD710\u3001\u9ACB\u7ED5\u73AF \xD710\u3001\u8E1D\u8155\u5404 \xD710", done: false },
    { id: "w3", label: "\u7A7A\u6746/\u8F7B\u91CD\u91CF\u70ED\u8EAB 1-2 \u7EC4", done: false }
  ];
  if (!day) return list;
  const patterns = new Set(
    day.items.map((i) => {
      var _a;
      return (_a = EXERCISE_MAP[i.exerciseId]) == null ? void 0 : _a.movementPattern;
    }).filter(Boolean)
  );
  if (patterns.has("squat") || patterns.has("lunge"))
    list.push({ id: "w4", label: "\u9ACB\u819D\u8E1D\u6FC0\u6D3B\uFF1A\u5F92\u624B\u6DF1\u8E72 \xD710\u3001\u5F13\u6B65\u8D70 \xD76/\u4FA7", done: false });
  if (patterns.has("horizontal_push") || patterns.has("vertical_push"))
    list.push({ id: "w5", label: "\u80A9\u80F8\u6FC0\u6D3B\uFF1A\u4FEF\u5367\u6491 \xD78\u3001\u80A9\u80DB\u4FEF\u5367\u6491 \xD710", done: false });
  if (patterns.has("horizontal_pull") || patterns.has("vertical_pull"))
    list.push({ id: "w6", label: "\u80CC\u90E8\u6FC0\u6D3B\uFF1A\u5F39\u529B\u5E26\u62C9\u5F00 \xD715\u3001\u80A9\u80DB\u540E\u7F29 \xD712", done: false });
  if (patterns.has("hinge"))
    list.push({ id: "w7", label: "\u9ACB\u94F0\u94FE\u6FC0\u6D3B\uFF1A\u81C0\u6865 \xD712\u3001\u5F92\u624B\u5C48\u9ACB \xD710", done: false });
  return list;
}
function lastPerformanceOf(sessions, exerciseId) {
  var _a, _b;
  const done = sessions.filter((s) => s.status === "completed").sort((a, b) => a.startedAt < b.startedAt ? 1 : -1);
  for (const s of done) {
    const log = s.logs.find((l) => l.exerciseId === exerciseId);
    if (!log) continue;
    const sets = log.sets.filter((x) => x.status === "done");
    if (!sets.length) continue;
    const w = (_a = sets.find((x) => x.weightKg)) == null ? void 0 : _a.weightKg;
    const reps = sets.map((x) => {
      var _a2;
      return (_a2 = x.reps) != null ? _a2 : 0;
    });
    const dur = (_b = sets.find((x) => x.durationSec)) == null ? void 0 : _b.durationSec;
    return {
      date: isoDateOf(s.startedAt),
      sets: sets.map((x) => ({
        weightKg: x.weightKg,
        reps: x.reps,
        durationSec: x.durationSec,
        rpe: x.rpe
      })),
      summary: dur ? `${sets.length}\xD7${dur}s` : `${sets.length}\xD7${Math.max(...reps)}${w ? ` @${w}kg` : ""}`
    };
  }
  return void 0;
}
function newSession(day, venueId) {
  var _a, _b;
  const now = (/* @__PURE__ */ new Date()).toISOString();
  return {
    id: uid("sess"),
    planDayId: day == null ? void 0 : day.id,
    venueId,
    title: (_a = day == null ? void 0 : day.title) != null ? _a : "\u81EA\u7531\u8BAD\u7EC3",
    startedAt: now,
    status: "in_progress",
    logs: ((_b = day == null ? void 0 : day.items) != null ? _b : []).map((it) => ({
      exerciseId: it.exerciseId,
      planItemId: it.id,
      sets: it.sets.map((_, i) => ({ index: i, status: "planned" }))
    })),
    warmups: buildWarmups(day),
    createdAt: now,
    updatedAt: now
  };
}
function isOnline() {
  return typeof navigator === "undefined" ? true : navigator.onLine !== false;
}

// .mp-build/seed/muscles.ts
var MUSCLES = [
  // 正面
  {
    id: "chest_upper",
    name: "\u4E0A\u80F8",
    latin: "Pectoralis major (clavicular)",
    region: "chest",
    side: "front",
    function: "\u80A9\u5173\u8282\u6C34\u5E73\u5185\u6536\u4E0E\u4E0A\u4E3E\u53D1\u529B\uFF0C\u4E0A\u659C\u63A8\u7C7B\u52A8\u4F5C\u4E3B\u8981\u627F\u62C5\u8005\u3002"
  },
  {
    id: "chest_mid",
    name: "\u80F8\u5927\u808C",
    latin: "Pectoralis major",
    region: "chest",
    side: "front",
    function: "\u80A9\u5173\u8282\u6C34\u5E73\u5185\u6536\uFF08\u63A8\u3001\u5367\u63A8\u3001\u4FEF\u5367\u6491\uFF09\u3002"
  },
  {
    id: "front_delts",
    name: "\u524D\u675F\uFF08\u80A9\uFF09",
    latin: "Deltoid (anterior)",
    region: "shoulders",
    side: "front",
    function: "\u80A9\u5173\u8282\u524D\u5C48\u4E0E\u6C34\u5E73\u5185\u6536\uFF0C\u63A8\u7C7B\u52A8\u4F5C\u534F\u540C\u3002"
  },
  {
    id: "side_delts",
    name: "\u4E2D\u675F\uFF08\u80A9\uFF09",
    latin: "Deltoid (lateral)",
    region: "shoulders",
    side: "both",
    function: "\u80A9\u5173\u8282\u5916\u5C55\uFF0C\u51B3\u5B9A\u80A9\u90E8\u5BBD\u5EA6\u89C6\u89C9\u3002"
  },
  {
    id: "biceps",
    name: "\u80B1\u4E8C\u5934\u808C",
    latin: "Biceps brachii",
    region: "arms",
    side: "front",
    function: "\u8098\u5C48\u4E0E\u65CB\u540E\uFF0C\u62C9\u7C7B\u52A8\u4F5C\u534F\u540C\u3002"
  },
  {
    id: "forearms",
    name: "\u524D\u81C2",
    latin: "Forearm flexors/extensors",
    region: "arms",
    side: "both",
    function: "\u63E1\u529B\u4E0E\u624B\u8155\u7A33\u5B9A\uFF0C\u786C\u62C9\u3001\u5212\u8239\u7684\u9650\u901F\u73AF\u8282\u3002"
  },
  {
    id: "abs",
    name: "\u8179\u76F4\u808C",
    latin: "Rectus abdominis",
    region: "core",
    side: "front",
    function: "\u8EAF\u5E72\u5C48\u66F2\u4E0E\u6297\u4F38\u5C55\u3002"
  },
  {
    id: "obliques",
    name: "\u8179\u659C\u808C",
    latin: "Obliques",
    region: "core",
    side: "both",
    function: "\u8EAF\u5E72\u65CB\u8F6C\u4E0E\u6297\u4FA7\u5C48\u3002"
  },
  {
    id: "quads",
    name: "\u80A1\u56DB\u5934\u808C",
    latin: "Quadriceps",
    region: "legs",
    side: "front",
    function: "\u4F38\u819D\uFF0C\u6DF1\u8E72\u3001\u5F13\u6B65\u3001 leg extension \u4E3B\u52A8\u808C\u3002"
  },
  {
    id: "hip_flexors",
    name: "\u9ACB\u5C48\u808C",
    latin: "Iliopsoas",
    region: "legs",
    side: "front",
    function: "\u5C48\u9ACB\uFF0C\u4E45\u5750\u4EBA\u7FA4\u5E38\u7D27\u5F20\u3002"
  },
  {
    id: "adductors",
    name: "\u5927\u817F\u5185\u4FA7",
    latin: "Adductors",
    region: "legs",
    side: "front",
    function: "\u9ACB\u5173\u8282\u5185\u6536\uFF0C\u5BBD\u7AD9\u8DDD\u6DF1\u8E72\u534F\u540C\u3002"
  },
  {
    id: "tibialis",
    name: "\u80EB\u9AA8\u524D\u808C",
    latin: "Tibialis anterior",
    region: "legs",
    side: "front",
    function: "\u8DB3\u80CC\u5C48\uFF0C\u8D70\u8DEF\u4E0E\u6DF1\u8E72\u7A33\u5B9A\u3002"
  },
  // 背面
  {
    id: "lats",
    name: "\u80CC\u9614\u808C",
    latin: "Latissimus dorsi",
    region: "back",
    side: "back",
    function: "\u80A9\u5173\u8282\u5185\u6536\u4E0E\u4E0B\u62C9\uFF0C\u5F15\u4F53\u3001\u5212\u8239\u4E3B\u52A8\u808C\u3002"
  },
  {
    id: "upper_back",
    name: "\u4E0A\u80CC\uFF08\u659C\u65B9\u4E2D\u4E0B\u675F\uFF09",
    latin: "Trapezius (middle/lower)",
    region: "back",
    side: "back",
    function: "\u80A9\u80DB\u540E\u7F29\u4E0E\u4E0B\u6C89\uFF0C\u4F53\u6001\u4E0E\u80A9\u5065\u5EB7\u5173\u952E\u3002"
  },
  {
    id: "traps",
    name: "\u659C\u65B9\u808C\u4E0A\u675F",
    latin: "Trapezius (upper)",
    region: "back",
    side: "back",
    function: "\u80A9\u80DB\u4E0A\u63D0\uFF0C\u8038\u80A9\u7C7B\u52A8\u4F5C\u3002"
  },
  {
    id: "rear_delts",
    name: "\u540E\u675F\uFF08\u80A9\uFF09",
    latin: "Deltoid (posterior)",
    region: "shoulders",
    side: "back",
    function: "\u80A9\u5173\u8282\u6C34\u5E73\u5916\u5C55\uFF0C\u5E73\u8861\u63A8\u7C7B\u8BAD\u7EC3\u3002"
  },
  {
    id: "triceps",
    name: "\u80B1\u4E09\u5934\u808C",
    latin: "Triceps brachii",
    region: "arms",
    side: "back",
    function: "\u4F38\u8098\uFF0C\u6240\u6709\u63A8\u7C7B\u52A8\u4F5C\u7684\u534F\u540C\u808C\u3002"
  },
  {
    id: "lower_back",
    name: "\u4E0B\u80CC\uFF08\u7AD6\u810A\u808C\uFF09",
    latin: "Erector spinae",
    region: "back",
    side: "back",
    function: "\u810A\u67F1\u6297\u5C48\u66F2\uFF0C\u786C\u62C9\u4E0E\u8D1F\u91CD\u884C\u8D70\u7684\u7A33\u5B9A\u808C\u3002"
  },
  {
    id: "glutes",
    name: "\u81C0\u5927\u808C",
    latin: "Gluteus maximus",
    region: "glutes",
    side: "back",
    function: "\u4F38\u9ACB\u4E3B\u529B\uFF0C\u6DF1\u8E72\u3001\u786C\u62C9\u3001\u81C0\u63A8\u7684\u6838\u5FC3\u3002"
  },
  {
    id: "glute_med",
    name: "\u81C0\u4E2D\u808C",
    latin: "Gluteus medius",
    region: "glutes",
    side: "back",
    function: "\u9ACB\u5916\u5C55\u4E0E\u9AA8\u76C6\u7A33\u5B9A\uFF0C\u5355\u817F\u52A8\u4F5C\u5173\u952E\u3002"
  },
  {
    id: "hamstrings",
    name: "\u8158\u7EF3\u808C",
    latin: "Hamstrings",
    region: "legs",
    side: "back",
    function: "\u5C48\u819D\u4E0E\u4F38\u9ACB\uFF0C\u4E0E\u80A1\u56DB\u5934\u808C\u5E73\u8861\u3002"
  },
  {
    id: "calves",
    name: "\u5C0F\u817F\u4E09\u5934\u808C",
    latin: "Triceps surae",
    region: "legs",
    side: "back",
    function: "\u8E1D\u8DD6\u5C48\uFF0C\u63D0\u8E35\u4E0E\u5F39\u8DF3\u3002"
  },
  // 心肺（非骨骼肌，用于有氧动作归类）
  {
    id: "cardio_system",
    name: "\u5FC3\u80BA\u7CFB\u7EDF",
    latin: "Cardiorespiratory system",
    region: "cardio",
    side: "both",
    function: "\u6709\u6C27\u8010\u529B\u4E0E\u5FC3\u80BA\u9002\u80FD\uFF0C\u5C5E\u4E8E\u80FD\u91CF\u7CFB\u7EDF\u800C\u975E\u5355\u4E00\u808C\u8089\u3002"
  }
];
var MUSCLE_MAP = Object.fromEntries(
  MUSCLES.map((m) => [m.id, m])
);
var REGION_LABEL = {
  chest: "\u80F8\u90E8",
  back: "\u80CC\u90E8",
  shoulders: "\u80A9\u90E8",
  arms: "\u624B\u81C2",
  core: "\u6838\u5FC3",
  glutes: "\u81C0\u90E8",
  legs: "\u817F\u90E8",
  cardio: "\u5FC3\u80BA"
};
function muscleName(id) {
  var _a, _b;
  return (_b = (_a = MUSCLE_MAP[id]) == null ? void 0 : _a.name) != null ? _b : id;
}

// .mp-build/plan/engine.ts
function equipmentAvailable(ex, available, unavailable = []) {
  var _a;
  const availableSet = new Set(available);
  const unavailableSet = new Set(unavailable);
  if (ex.equipment.some((e) => unavailableSet.has(e))) return false;
  if (!ex.equipment.every((e) => availableSet.has(e))) return false;
  if (!((_a = ex.equipmentAlternatives) == null ? void 0 : _a.length)) return true;
  return ex.equipmentAlternatives.some(
    (e) => availableSet.has(e) && !unavailableSet.has(e)
  );
}
function patternAllowed(p, avoid) {
  return !avoid.includes(p);
}
function equipmentOf(ex) {
  var _a;
  return [.../* @__PURE__ */ new Set([...ex.equipment, ...(_a = ex.equipmentAlternatives) != null ? _a : []])];
}
function difficultyFit(d, level) {
  if (level === "beginner") return d <= 2;
  if (level === "intermediate") return d >= 2 && d <= 4;
  return d >= 3;
}
var PATTERN_LABEL = {
  squat: "\u6DF1\u8E72",
  hinge: "\u9ACB\u94F0\u94FE",
  horizontal_push: "\u6C34\u5E73\u63A8",
  horizontal_pull: "\u6C34\u5E73\u62C9",
  vertical_push: "\u5782\u76F4\u63A8",
  vertical_pull: "\u5782\u76F4\u62C9",
  lunge: "\u5F13\u6B65/\u5355\u817F",
  carry: "\u8D1F\u91CD\u884C\u8D70",
  rotation: "\u65CB\u8F6C/\u6297\u65CB\u8F6C",
  isolation_arm: "\u624B\u81C2\u5B64\u7ACB",
  isolation_shoulder: "\u80A9\u90E8\u5B64\u7ACB",
  isolation_leg: "\u817F\u90E8\u5B64\u7ACB",
  core: "\u6838\u5FC3",
  cardio: "\u6709\u6C27"
};
var MOVEMENT_PATTERN_LABEL = PATTERN_LABEL;
function fullBodyA() {
  return {
    title: "\u5168\u8EAB A \xB7 \u4E0B\u80A2\u4E3A\u4E3B",
    patterns: ["squat", "hinge", "horizontal_push", "horizontal_pull", "core"],
    focus: ["quads", "glutes", "chest_mid", "upper_back"],
    supplement: ["lunge", "isolation_leg", "isolation_arm"]
  };
}
function fullBodyB() {
  return {
    title: "\u5168\u8EAB B \xB7 \u4E0A\u80A2\u4E3A\u4E3B",
    patterns: ["vertical_push", "vertical_pull", "lunge", "horizontal_push", "core"],
    focus: ["front_delts", "lats", "quads", "chest_mid"],
    supplement: ["horizontal_push", "isolation_arm", "isolation_shoulder"]
  };
}
function fullBodyC() {
  return {
    title: "\u5168\u8EAB C \xB7 \u9ACB\u4E0E\u80A9",
    patterns: ["hinge", "vertical_pull", "horizontal_push", "isolation_shoulder", "core"],
    focus: ["glutes", "lats", "side_delts", "abs"],
    supplement: ["hinge", "horizontal_pull", "isolation_arm"]
  };
}
function upperDay() {
  return {
    title: "\u4E0A\u80A2\u65E5 \xB7 \u63A8\u62C9\u5E73\u8861",
    patterns: [
      "horizontal_push",
      "horizontal_pull",
      "vertical_push",
      "vertical_pull",
      "isolation_arm",
      "isolation_shoulder"
    ],
    focus: ["chest_mid", "upper_back", "lats", "side_delts"],
    supplement: ["isolation_arm", "isolation_shoulder", "horizontal_push", "horizontal_pull"]
  };
}
function lowerDay() {
  return {
    title: "\u4E0B\u80A2\u65E5 \xB7 \u9ACB\u819D\u5747\u8861",
    patterns: ["squat", "hinge", "lunge", "isolation_leg", "core"],
    focus: ["quads", "glutes", "hamstrings"],
    supplement: ["hinge", "isolation_leg"]
  };
}
function pushDay() {
  return {
    title: "\u63A8\u65E5 \xB7 \u80F8\u80A9\u4E09\u5934",
    patterns: ["horizontal_push", "vertical_push", "isolation_shoulder", "isolation_arm"],
    focus: ["chest_mid", "front_delts", "side_delts", "triceps"],
    supplement: ["isolation_shoulder", "isolation_arm", "horizontal_push"]
  };
}
function pullDay() {
  return {
    title: "\u62C9\u65E5 \xB7 \u80CC\u4E8C\u5934",
    patterns: ["vertical_pull", "horizontal_pull", "horizontal_pull", "isolation_arm", "core"],
    focus: ["lats", "upper_back", "biceps", "rear_delts"],
    supplement: ["isolation_arm", "horizontal_pull", "vertical_pull"]
  };
}
function legDay() {
  return {
    title: "\u817F\u65E5 \xB7 \u5168\u9762\u4E0B\u80A2",
    patterns: ["squat", "hinge", "lunge", "isolation_leg", "isolation_leg", "core"],
    focus: ["quads", "glutes", "hamstrings", "calves"],
    supplement: ["hinge", "isolation_leg"]
  };
}
var WEEKDAY_MAP = {
  1: [0],
  2: [0, 3],
  3: [0, 2, 4],
  4: [0, 1, 3, 4],
  5: [0, 1, 2, 4, 5],
  6: [0, 1, 2, 3, 4, 5],
  7: [0, 1, 2, 3, 4, 5, 6]
};
function splitFor(days) {
  if (days <= 1) return { name: "\u5168\u8EAB 1 \u5206\u5316", days: [fullBodyA()] };
  if (days === 2) return { name: "\u5168\u8EAB 2 \u5206\u5316", days: [fullBodyA(), fullBodyB()] };
  if (days === 3) return { name: "\u5168\u8EAB 3 \u5206\u5316", days: [fullBodyA(), fullBodyB(), fullBodyC()] };
  if (days === 4)
    return { name: "\u4E0A\u4E0B\u80A2 4 \u5206\u5316", days: [upperDay(), lowerDay(), upperDay(), lowerDay()] };
  if (days === 5)
    return {
      name: "\u63A8\u62C9\u817F + \u4E0A\u4E0B\u80A2 5 \u5206\u5316",
      days: [pushDay(), pullDay(), legDay(), upperDay(), lowerDay()]
    };
  return {
    name: "\u63A8\u62C9\u817F 6 \u5206\u5316",
    days: [pushDay(), pullDay(), legDay(), pushDay(), pullDay(), legDay()]
  };
}
function prescribe(goal, level, isCore) {
  if (isCore) return { sets: 3, repsMin: 0, repsMax: 0, restSec: 45 };
  let base;
  switch (goal) {
    case "strength":
      base = { sets: 4, repsMin: 4, repsMax: 6, restSec: 150 };
      break;
    case "muscle_gain":
      base = { sets: 4, repsMin: 8, repsMax: 12, restSec: 90 };
      break;
    case "fat_loss":
      base = { sets: 3, repsMin: 12, repsMax: 15, restSec: 60 };
      break;
    case "recomp":
      base = { sets: 3, repsMin: 8, repsMax: 12, restSec: 90 };
      break;
    default:
      base = { sets: 3, repsMin: 10, repsMax: 12, restSec: 75 };
  }
  if (level === "beginner") base = __spreadProps(__spreadValues({}, base), { sets: Math.max(2, base.sets - 1), restSec: base.restSec });
  if (level === "advanced" && goal !== "fat_loss")
    base = __spreadProps(__spreadValues({}, base), { sets: Math.min(5, base.sets + 1) });
  return base;
}
function coreDurationSec(level) {
  return level === "beginner" ? 20 : level === "intermediate" ? 30 : 40;
}
function estimateExerciseSec(item, avgRest) {
  const sets = item.sets.length || 1;
  return sets * (45 + avgRest) + 45;
}
function estimateDayMinutes(items) {
  const total = items.reduce((s, it) => {
    var _a, _b;
    const rest = (_b = (_a = it.sets[0]) == null ? void 0 : _a.restSec) != null ? _b : 75;
    return s + estimateExerciseSec(it, rest);
  }, 0);
  return Math.round((total + 330) / 60);
}
function candidateScore(ex, pattern, ctx) {
  let score = 0;
  if (ex.movementPattern === pattern) score += 60;
  if (!difficultyFit(ex.difficulty, ctx.level)) score -= 25;
  score -= Math.abs(ex.difficulty - (ctx.level === "beginner" ? 2 : 3)) * 4;
  if (ctx.usedIds.has(ex.id)) score -= 1e3;
  return score;
}
function pickExercise(pattern, ctx) {
  var _a;
  const pool = EXERCISES.filter(
    (ex) => {
      var _a2;
      return ex.movementPattern === pattern && equipmentAvailable(ex, ctx.available, ctx.unavailable) && !((_a2 = ctx.excludeIds) == null ? void 0 : _a2.has(ex.id)) && patternAllowed(pattern, ctx.avoidPatterns);
    }
  );
  if (!pool.length) return null;
  const fitted = pool.filter((ex) => difficultyFit(ex.difficulty, ctx.level));
  const list = fitted.length ? fitted : pool;
  const sorted = [...list].sort((a, b) => candidateScore(b, pattern, ctx) - candidateScore(a, pattern, ctx));
  return (_a = sorted[0]) != null ? _a : null;
}
function findSubstitutes(exerciseId, ctx) {
  var _a, _b;
  const target = EXERCISE_MAP[exerciseId];
  if (!target) return [];
  const exclude = new Set((_a = ctx.exclude) != null ? _a : []);
  const targetMuscles = /* @__PURE__ */ new Set([...target.primaryMuscles, ...target.secondaryMuscles]);
  const options = [];
  for (const ex of EXERCISES) {
    if (ex.id === exerciseId) continue;
    if (exclude.has(ex.id)) continue;
    if (!equipmentAvailable(ex, ctx.available, ctx.unavailable)) continue;
    if (!patternAllowed(ex.movementPattern, ctx.avoidPatterns)) continue;
    const reasons = [];
    let score = 0;
    const manual = (_b = target.substitutions) == null ? void 0 : _b.includes(ex.id);
    if (manual) {
      score += 18;
      reasons.push("\u52A8\u4F5C\u5E93\u6807\u6CE8\u7684\u5E38\u7528\u66FF\u4EE3");
    }
    if (ex.movementPattern === target.movementPattern) {
      score += 45;
      reasons.push(`\u540C\u4E3A${PATTERN_LABEL[ex.movementPattern]}\u52A8\u4F5C\u6A21\u5F0F`);
    }
    const primaryOverlap = ex.primaryMuscles.filter(
      (m) => target.primaryMuscles.includes(m)
    ).length;
    const secondaryOverlap = ex.primaryMuscles.filter(
      (m) => target.secondaryMuscles.includes(m)
    ).length;
    const muscleScore = primaryOverlap * 22 + secondaryOverlap * 8 + (targetMuscles.has(ex.primaryMuscles[0]) ? 4 : 0);
    if (muscleScore > 0) {
      score += muscleScore;
      reasons.push(
        primaryOverlap ? `\u4E3B\u7EC3\u808C\u7FA4\u91CD\u5408\uFF1A${ex.primaryMuscles.filter((m) => target.primaryMuscles.includes(m)).map(muscleName).join("\u3001")}` : `\u8986\u76D6\u8F85\u52A9\u808C\u7FA4\uFF1A${ex.primaryMuscles.map(muscleName).join("\u3001")}`
      );
    }
    if (difficultyFit(ex.difficulty, ctx.level)) {
      score += 10;
      reasons.push("\u96BE\u5EA6\u7B26\u5408\u5F53\u524D\u7ECF\u9A8C");
    } else {
      score -= 10;
    }
    score -= Math.abs(ex.difficulty - target.difficulty) * 5;
    if (ex.unilateral === target.unilateral) score += 5;
    if (score <= 0) continue;
    options.push({ exercise: ex, score, reasons });
  }
  options.sort((a, b) => b.score - a.score || a.exercise.difficulty - b.exercise.difficulty);
  return ctx.limit ? options.slice(0, ctx.limit) : options;
}
function minimumItemCount(minutes) {
  if (minutes >= 50) return 5;
  if (minutes >= 35) return 4;
  return 3;
}
function generatePlan(input, name) {
  const split = splitFor(input.daysPerWeek);
  const used = /* @__PURE__ */ new Set();
  const days = [];
  let supplementUsed = false;
  split.days.forEach((tpl, idx) => {
    var _a, _b, _c;
    const items = [];
    const dayUsed = /* @__PURE__ */ new Set();
    const pickAndAdd = (pattern, supplemental = false) => {
      const ex = pickExercise(pattern, {
        available: input.availableEquipment,
        avoidPatterns: input.avoidPatterns,
        level: input.experience,
        usedIds: /* @__PURE__ */ new Set([...used, ...dayUsed]),
        excludeIds: dayUsed
      });
      if (!ex || dayUsed.has(ex.id)) return false;
      dayUsed.add(ex.id);
      const isCore = ex.movementPattern === "core";
      const p = prescribe(input.goal, input.experience, isCore);
      const sets = Array.from({ length: p.sets }, (_, i) => __spreadValues({
        repsMin: p.repsMin,
        repsMax: p.repsMax,
        durationSec: isCore ? coreDurationSec(input.experience) : void 0,
        restSec: p.restSec
      }, i === 0 ? { rpeTarget: [7, 9] } : {}));
      const item = {
        id: uid("pe"),
        exerciseId: ex.id,
        sets,
        rationale: buildRationale(ex, pattern, input, supplemental)
      };
      const last = items[items.length - 1];
      const lastEx = last ? EXERCISE_MAP[last.exerciseId] : void 0;
      if (supplemental && (lastEx == null ? void 0 : lastEx.movementPattern) === "core") {
        items.splice(items.length - 1, 0, item);
      } else {
        items.push(item);
      }
      return true;
    };
    for (const pattern of tpl.patterns) pickAndAdd(pattern);
    if ((_a = tpl.supplement) == null ? void 0 : _a.length) {
      const targetCount = minimumItemCount(input.sessionMinutes);
      const budget = tpl.supplement.length * 2;
      for (let i = 0; items.length < targetCount && i < budget; i++) {
        if (pickAndAdd(tpl.supplement[i % tpl.supplement.length], true)) supplementUsed = true;
      }
    }
    const trimmed = trimToMinutes(items, input.sessionMinutes);
    days.push({
      id: uid("pd"),
      weekday: (_c = ((_b = WEEKDAY_MAP[input.daysPerWeek]) != null ? _b : WEEKDAY_MAP[3])[idx]) != null ? _c : idx,
      title: tpl.title,
      focusMuscles: tpl.focus,
      items: trimmed,
      estimatedMinutes: trimmed.length ? estimateDayMinutes(trimmed) : 0
    });
    trimmed.forEach((it) => used.add(it.exerciseId));
  });
  const rationaleParts = [
    `\u76EE\u6807\u300C${GOAL_LABEL[input.goal]}\u300D+ \u7ECF\u9A8C\u300C${LEVEL_LABEL[input.experience]}\u300D\uFF0C\u91C7\u7528${split.name}\u3002`,
    `\u6BCF\u6B21\u8BAD\u7EC3\u63A7\u5236\u5728\u7EA6 ${input.sessionMinutes} \u5206\u949F\u5185\uFF1A\u5148\u590D\u5408\u52A8\u4F5C\u3001\u540E\u5B64\u7ACB\u52A8\u4F5C\uFF0C\u6838\u5FC3\u5B89\u6392\u5728\u672B\u5C3E\u3002`,
    `\u53EF\u7528\u5668\u68B0\uFF1A${input.availableEquipment.length ? input.availableEquipment.join("\u3001") : "\u4EC5\u5F92\u624B"}\uFF0C\u6240\u6709\u52A8\u4F5C\u5747\u6309\u53EF\u7528\u5668\u68B0\u7B5B\u9009\u3002`,
    input.limitationAreas.length ? `\u5DF2\u907F\u5F00\u4E0E\u300C${input.limitationAreas.join("\u3001")}\u300D\u76F8\u5173\u7684\u52A8\u4F5C\u6A21\u5F0F\uFF1A${input.avoidPatterns.map((p) => PATTERN_LABEL[p]).join("\u3001")}\u3002` : "\u672A\u63D0\u4F9B\u8EAB\u4F53\u9650\u5236\u4FE1\u606F\uFF0C\u8BA1\u5212\u672A\u505A\u9488\u5BF9\u6027\u89C4\u907F\uFF1B\u5982\u6709\u5173\u8282\u4E0D\u9002\u8BF7\u5728\u6863\u6848\u4E2D\u8865\u5145\u3002"
  ];
  if (supplementUsed) {
    rationaleParts.push(
      "\u90E8\u5206\u8BAD\u7EC3\u65E5\u56E0\u53D7\u9650\u6A21\u5F0F\u6216\u5668\u68B0\u4E0D\u8DB3\uFF0C\u5DF2\u7528\u540C\u4E00\u4E3B\u9898\u5185\u7684\u5B89\u5168\u52A8\u4F5C\u8865\u4F4D\uFF08\u89C1\u5BF9\u5E94\u52A8\u4F5C\u7406\u7531\uFF09\u3002"
    );
  }
  const thinDays = days.filter((d) => d.items.length < 3);
  if (thinDays.length) {
    rationaleParts.push(
      `\u6CE8\u610F\uFF1A${thinDays.map((d) => `\u300C${d.title}\u300D\u53EA\u6709 ${d.items.length} \u4E2A\u53EF\u7528\u52A8\u4F5C`).join("\u3001")}\uFF0C\u8BAD\u7EC3\u91CF\u53EF\u80FD\u4E0D\u8DB3\uFF1B\u53EF\u589E\u52A0\u573A\u9986\u5668\u68B0\u3001\u653E\u5BBD\u8EAB\u4F53\u9650\u5236\u6216\u5EF6\u957F\u5355\u6B21\u65F6\u957F\u540E\u91CD\u65B0\u751F\u6210\u3002`
    );
  }
  if (!days.some((d) => d.items.length > 0)) {
    rationaleParts.push(
      "\u5F53\u524D\u8EAB\u4F53\u9650\u5236\u4E0E\u5668\u68B0\u7EC4\u5408\u4E0B\u6CA1\u6709\u53EF\u7528\u52A8\u4F5C\uFF0C\u8BA1\u5212\u4E3A\u7A7A\uFF1B\u8BF7\u8C03\u6574\u9650\u5236\u6216\u8865\u5145\u5668\u68B0\u540E\u91CD\u65B0\u751F\u6210\u3002"
    );
  }
  return {
    id: uid("plan"),
    name: name != null ? name : `${LEVEL_LABEL[input.experience]} \xB7 ${split.name}`,
    venueId: void 0,
    days,
    generatedFrom: input,
    rationale: rationaleParts.join(" "),
    active: true,
    createdAt: (/* @__PURE__ */ new Date()).toISOString(),
    updatedAt: (/* @__PURE__ */ new Date()).toISOString()
  };
}
function trimToMinutes(items, minutes) {
  const list = items.map((it) => __spreadProps(__spreadValues({}, it), { sets: [...it.sets] }));
  const ISOLATION = [
    "isolation_arm",
    "isolation_shoulder",
    "isolation_leg",
    "core",
    "rotation",
    "carry"
  ];
  let guard = 0;
  while (estimateDayMinutes(list) > minutes && guard++ < 30) {
    if (list.length > 2) {
      let idx = -1;
      for (let i = list.length - 1; i >= 0; i--) {
        const ex = EXERCISE_MAP[list[i].exerciseId];
        if (ex && ISOLATION.includes(ex.movementPattern)) {
          idx = i;
          break;
        }
      }
      if (idx >= 0) {
        list.splice(idx, 1);
        continue;
      }
    }
    let reduced = false;
    for (let i = list.length - 1; i >= 0; i--) {
      if (list[i].sets.length > 2) {
        list[i] = __spreadProps(__spreadValues({}, list[i]), { sets: list[i].sets.slice(0, -1) });
        reduced = true;
        break;
      }
    }
    if (reduced) continue;
    if (list.length > 2) {
      list.splice(list.length - 1, 1);
      continue;
    }
    break;
  }
  return list;
}
function slimForTime(day, minutes) {
  const items = day.items.map((it) => __spreadProps(__spreadValues({}, it), { sets: [...it.sets] }));
  const trimmed = trimToMinutes(items, minutes);
  return __spreadProps(__spreadValues({}, day), {
    items: trimmed,
    estimatedMinutes: trimmed.length ? estimateDayMinutes(trimmed) : 0
  });
}
function buildRationale(ex, pattern, input, supplemental = false) {
  const parts = [];
  parts.push(`${PATTERN_LABEL[pattern]}\u6A21\u5F0F\uFF0C\u4E3B\u7EC3${ex.primaryMuscles.map(muscleName).join("\u3001")}`);
  if (ex.secondaryMuscles.length)
    parts.push(`\u8F85\u52A9${ex.secondaryMuscles.map(muscleName).join("\u3001")}`);
  if (input.goal === "fat_loss") parts.push("\u91C7\u7528\u8F83\u9AD8\u6B21\u6570\u8F83\u77ED\u95F4\u6B47\uFF0C\u517C\u987E\u70ED\u91CF\u6D88\u8017\u4E0E\u52A8\u4F5C\u5B66\u4E60");
  if (input.goal === "muscle_gain") parts.push("8-12 \u6B21\u533A\u95F4\u6709\u5229\u4E8E\u808C\u80A5\u5927");
  if (input.goal === "strength") parts.push("\u4F4E\u6B21\u6570\u957F\u95F4\u6B47\uFF0C\u4F18\u5148\u795E\u7ECF\u9002\u5E94\u4E0E\u529B\u91CF\u589E\u957F");
  if (input.experience === "beginner") parts.push("\u96BE\u5EA6\u8F83\u4F4E\uFF0C\u4FBF\u4E8E\u638C\u63E1\u52A8\u4F5C\u6A21\u5F0F");
  if (supplemental) parts.push("\u7528\u4E8E\u8865\u8DB3\u53D7\u9650/\u5668\u68B0\u4E0D\u8DB3\u5F53\u5929\u7684\u8BAD\u7EC3\u91CF\uFF0C\u4ECD\u5C5E\u4E8E\u540C\u4E00\u52A8\u4F5C\u6A21\u5F0F\u4E3B\u9898");
  if (ex.custom) parts.push("\u81EA\u5B9A\u4E49\u52A8\u4F5C");
  return parts.join("\uFF1B") + "\u3002";
}
var GOAL_LABEL = {
  fat_loss: "\u51CF\u8102",
  muscle_gain: "\u589E\u808C",
  strength: "\u63D0\u5347\u529B\u91CF",
  health: "\u5065\u5EB7\u7EF4\u6301",
  recomp: "\u5851\u5F62"
};
var LEVEL_LABEL = {
  beginner: "\u65B0\u624B",
  intermediate: "\u8FDB\u9636",
  advanced: "\u8D44\u6DF1"
};
var EQUIPMENT_LABEL = {
  barbell: "\u6760\u94C3",
  dumbbell: "\u54D1\u94C3",
  machine: "\u56FA\u5B9A\u5668\u68B0",
  cable: "\u7EF3\u7D22/\u9F99\u95E8\u67B6",
  bodyweight: "\u5F92\u624B",
  band: "\u5F39\u529B\u5E26",
  kettlebell: "\u58F6\u94C3",
  cardio: "\u6709\u6C27\u5668\u68B0",
  bench: "\u8BAD\u7EC3\u51F3",
  other: "\u5176\u4ED6"
};
function muscleIdsOfDay(day) {
  const set = /* @__PURE__ */ new Set();
  day.items.forEach((it) => {
    const ex = EXERCISE_MAP[it.exerciseId];
    if (!ex) return;
    ex.primaryMuscles.forEach((m) => set.add(m));
    ex.secondaryMuscles.forEach((m) => set.add(m));
  });
  return [...set];
}

// .mp-build/demo.ts
var DEMO_PLAN_DAYS = [
  { title: "\u5168\u8EAB A \xB7 \u4E0B\u80A2\u4E3A\u4E3B", exercises: ["goblet_squat", "romanian_deadlift", "dumbbell_bench_press", "dumbbell_row", "plank"] },
  { title: "\u5168\u8EAB B \xB7 \u4E0A\u80A2\u4E3A\u4E3B", exercises: ["dumbbell_shoulder_press", "lat_pulldown", "reverse_lunge", "push_up", "dead_bug"] },
  { title: "\u5168\u8EAB C \xB7 \u9ACB\u4E0E\u80A9", exercises: ["hip_thrust", "seated_cable_row", "incline_dumbbell_press", "lateral_raise", "side_plank"] }
];
function buildDemoPlan() {
  const now = (/* @__PURE__ */ new Date()).toISOString();
  return {
    id: "demo_plan",
    name: "\u6F14\u793A\u8BA1\u5212 \xB7 \u5168\u8EAB 3 \u5206\u5316",
    isDemo: true,
    active: true,
    venueId: "venue_gym",
    createdAt: now,
    updatedAt: now,
    rationale: "\u8FD9\u662F\u4E00\u4EFD\u7528\u4E8E\u6F14\u793A\u7684\u8BA1\u5212\uFF0C\u52A8\u4F5C\u7EC4\u6B21\u4E3A\u793A\u4F8B\u503C\uFF0C\u4E0D\u4EE3\u8868\u4F60\u7684\u771F\u5B9E\u80FD\u529B\u3002",
    generatedFrom: {
      goal: "recomp",
      experience: "beginner",
      daysPerWeek: 3,
      sessionMinutes: 45,
      availableEquipment: ["barbell", "dumbbell", "machine", "cable", "bench", "bodyweight"],
      limitationAreas: [],
      avoidPatterns: []
    },
    days: DEMO_PLAN_DAYS.map((d, i) => ({
      id: `demo_pd_${i}`,
      weekday: i * 2,
      title: d.title,
      focusMuscles: [],
      estimatedMinutes: 45,
      items: d.exercises.map((exId, k) => {
        const ex = EXERCISES.find((e) => e.id === exId);
        const isCore = ex.movementPattern === "core";
        return {
          id: `demo_pe_${i}_${k}`,
          exerciseId: exId,
          rationale: "\u6F14\u793A\u6570\u636E\uFF1A\u793A\u4F8B\u5B89\u6392\u7406\u7531\u3002",
          sets: Array.from({ length: isCore ? 3 : 3 }, () => ({
            repsMin: isCore ? 0 : 8,
            repsMax: isCore ? 0 : 12,
            durationSec: isCore ? 30 : void 0,
            restSec: isCore ? 45 : 90
          }))
        };
      })
    }))
  };
}
var DEMO_WEIGHTS = {
  goblet_squat: 12,
  romanian_deadlift: 20,
  dumbbell_bench_press: 8,
  dumbbell_row: 10,
  plank: 0,
  dumbbell_shoulder_press: 6,
  lat_pulldown: 25,
  reverse_lunge: 0,
  push_up: 0,
  dead_bug: 0,
  hip_thrust: 30,
  seated_cable_row: 25,
  incline_dumbbell_press: 8,
  lateral_raise: 4,
  side_plank: 0
};
function buildDemoSessions(daysBack = 28) {
  const rng = makeRng(20260101);
  const today = todayISO();
  const out = [];
  let n = 0;
  for (let d = daysBack; d >= 1; d--) {
    const date = addDays(today, -d);
    const weekday = (/* @__PURE__ */ new Date(`${date}T00:00:00`)).getDay();
    if (weekday !== 1 && weekday !== 3 && weekday !== 5) continue;
    if (rng() < 0.12) continue;
    const dayIdx = n % 3;
    n++;
    const tpl = DEMO_PLAN_DAYS[dayIdx];
    const progress = 1 + (daysBack - d) * 8e-3;
    const started = /* @__PURE__ */ new Date(`${date}T19:10:00`);
    const ended = new Date(started.getTime() + 42 * 60 * 1e3);
    const startedAt = started.toISOString();
    out.push({
      id: `demo_sess_${d}`,
      planId: "demo_plan",
      title: tpl.title,
      isDemo: true,
      status: "completed",
      startedAt,
      endedAt: ended.toISOString(),
      createdAt: startedAt,
      updatedAt: startedAt,
      warmups: [],
      logs: tpl.exercises.map((exId) => {
        var _a;
        const ex = EXERCISES.find((e) => e.id === exId);
        const base = (_a = DEMO_WEIGHTS[exId]) != null ? _a : 0;
        const isCore = ex.movementPattern === "core";
        return {
          exerciseId: exId,
          sets: Array.from({ length: 3 }, (_, i) => ({
            index: i,
            status: "done",
            weightKg: base ? Math.round(base * progress * 2) / 2 : void 0,
            reps: isCore ? void 0 : 8 + Math.floor(rng() * 3) + (i === 0 ? 2 : 0),
            durationSec: isCore ? 30 : void 0,
            rpe: Math.round((6.5 + rng() * 1.8) * 10) / 10,
            completedAt: startedAt
          }))
        };
      }),
      overallFeel: 3 + Math.floor(rng() * 2)
    });
  }
  return out;
}
function buildDemoWeights(daysBack = 28) {
  const rng = makeRng(777);
  const today = todayISO();
  const out = [];
  let base = 62.4;
  for (let d = daysBack; d >= 0; d -= 2) {
    base -= 0.06 + rng() * 0.08;
    const date = addDays(today, -d);
    out.push({
      id: `demo_bw_${d}`,
      date,
      weightKg: Math.round((base + (rng() - 0.5) * 0.5) * 10) / 10,
      isDemo: true,
      createdAt: `${date}T07:00:00.000Z`,
      updatedAt: `${date}T07:00:00.000Z`
    });
  }
  return out;
}
var DEMO_MEALS = {
  breakfast: [
    { foodId: "oats", grams: 40 },
    { foodId: "milk_whole", grams: 250 },
    { foodId: "egg", grams: 100 },
    { foodId: "banana", grams: 120 }
  ],
  lunch: [
    { foodId: "rice_white_cooked", grams: 150 },
    { foodId: "chicken_breast_cooked", grams: 120 },
    { foodId: "broccoli", grams: 150 },
    { foodId: "olive_oil", grams: 5 }
  ],
  dinner: [
    { foodId: "sweet_potato", grams: 150 },
    { foodId: "salmon_raw", grams: 120 },
    { foodId: "spinach", grams: 100 },
    { foodId: "olive_oil", grams: 5 }
  ],
  snack: [{ foodId: "greek_yogurt", grams: 150 }]
};
function buildDemoEntries(daysBack = 9) {
  const rng = makeRng(4242);
  const today = todayISO();
  const out = [];
  for (let d = daysBack; d >= 0; d--) {
    const date = addDays(today, -d);
    if (rng() < 0.12) continue;
    Object.keys(DEMO_MEALS).forEach((slot) => {
      if (slot === "snack" && rng() < 0.5) return;
      for (const item of DEMO_MEALS[slot]) {
        const food = FOOD_MAP[item.foodId];
        if (!food) continue;
        const grams = Math.round(item.grams * (0.9 + rng() * 0.2));
        out.push({
          id: `demo_fe_${d}_${slot}_${item.foodId}`,
          date,
          slot,
          foodId: food.id,
          foodName: food.name,
          grams,
          basis: food.basis,
          cookingMethod: slot === "breakfast" ? "boiled" : "stir_fried",
          // 午餐/晚餐已经单独记录了 5g 橄榄油条目，这里不能再按烹饪方式
          // 重复加一份用油，否则演示数据每天会凭空多出 40g 油（约 350 kcal）。
          oilG: 0,
          source: food.source,
          isDemo: true,
          createdAt: `${date}T12:00:00.000Z`,
          updatedAt: `${date}T12:00:00.000Z`
        });
      }
    });
  }
  return out;
}
function buildDemoRecovery(daysBack = 9) {
  const rng = makeRng(99);
  const today = todayISO();
  const out = [];
  for (let d = daysBack; d >= 0; d--) {
    if (rng() < 0.2) continue;
    const date = addDays(today, -d);
    out.push({
      id: `demo_rec_${d}`,
      date,
      sleepHours: Math.round((6 + rng() * 2.5) * 10) / 10,
      sleepQuality: 2 + Math.floor(rng() * 4),
      fatigue: 1 + Math.floor(rng() * 4),
      soreness: Math.floor(rng() * 4),
      hasPain: false,
      isDemo: true,
      createdAt: `${date}T08:00:00.000Z`,
      updatedAt: `${date}T08:00:00.000Z`
    });
  }
  return out;
}
function buildDemoMealPlan(date) {
  const items = Object.keys(DEMO_MEALS).flatMap(
    (slot) => DEMO_MEALS[slot].map((i) => {
      var _a, _b;
      return {
        foodId: i.foodId,
        foodName: (_b = (_a = FOOD_MAP[i.foodId]) == null ? void 0 : _a.name) != null ? _b : i.foodId,
        grams: i.grams,
        slot
      };
    })
  );
  return {
    id: `demo_meal_${date}`,
    date,
    items,
    isDemo: true,
    createdAt: `${date}T06:00:00.000Z`,
    updatedAt: `${date}T06:00:00.000Z`
  };
}
function buildDemoShopping() {
  const now = (/* @__PURE__ */ new Date()).toISOString();
  const names = [
    ["\u9E21\u80F8\u8089", "500g"],
    ["\u897F\u5170\u82B1", "2 \u9897"],
    ["\u9E21\u86CB", "1 \u76D2\uFF0810 \u4E2A\uFF09"],
    ["\u65E0\u7CD6\u9178\u5976", "1 \u5927\u6876"],
    ["\u71D5\u9EA6\u7247", "1 \u888B"],
    ["\u6A44\u6984\u6CB9", "1 \u74F6\uFF08\u5DF2\u5728\u7528\uFF09"],
    ["\u7EA2\u85AF", "1 kg"]
  ];
  return names.map(([name, amount], i) => ({
    id: `demo_shop_${i}`,
    name,
    amount,
    checked: i < 2,
    createdAt: now,
    updatedAt: now
  }));
}
function demoFoodCountHint() {
  return FOODS.length;
}
async function demoNewId() {
  return uid("demo");
}

// .mp-build/repo.ts
var DEFAULT_PROFILE = {
  id: "me",
  displayName: "\u6211",
  goal: "recomp",
  experience: "beginner",
  daysPerWeek: 3,
  sessionMinutes: 45,
  heightCm: 168,
  weightKg: 62,
  sex: "unspecified",
  limitations: { areas: [], avoidPatterns: [], skipped: true },
  reminders: {
    waterEnabled: false,
    waterIntervalMin: 60,
    moveEnabled: false,
    moveIntervalMin: 60,
    trainingEnabled: false
  },
  onboarded: false,
  createdAt: "2026-01-01T00:00:00.000Z",
  updatedAt: "2026-01-01T00:00:00.000Z"
};
async function getProfile() {
  const p = await getOne("profile", "me");
  return p != null ? p : DEFAULT_PROFILE;
}
async function saveProfile(p) {
  const next = __spreadProps(__spreadValues({}, p), { id: "me", updatedAt: nowISO() });
  await put("profile", next);
  return next;
}
var SAMPLE_VENUES = [
  {
    id: "venue_home",
    name: "\u5C45\u5BB6 \xB7 \u5BA2\u5385",
    kind: "home",
    location: "\u5BB6\u4E2D",
    isDefault: true,
    isDemo: true,
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z",
    equipment: [
      { id: "eq_home_1", category: "other", name: "\u745C\u4F3D\u57AB", note: "1 \u5F20" },
      { id: "eq_home_2", category: "band", name: "\u5F39\u529B\u5E26", note: "\u8F7B/\u4E2D/\u91CD\u5404 1 \u6761" },
      { id: "eq_home_3", category: "dumbbell", name: "\u53EF\u8C03\u54D1\u94C3", maxWeightKg: 10, incrementsKg: [2, 4, 6, 8, 10], adjustable: true, note: "2 \u53EA" },
      { id: "eq_home_4", category: "bodyweight", name: "\u5F92\u624B/\u81EA\u91CD" }
    ]
  },
  {
    id: "venue_gym",
    name: "\u5065\u8EAB\u623F \xB7 \u5546\u4E1A\u5065\u8EAB\u623F",
    kind: "gym",
    location: "\u5C0F\u533A\u9644\u8FD1",
    isDefault: false,
    isDemo: true,
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z",
    equipment: [
      { id: "eq_gym_1", category: "barbell", name: "\u5965\u6797\u5339\u514B\u6760\u94C3", maxWeightKg: 100, incrementsKg: [2.5, 5, 10, 15, 20], note: "2 \u6839" },
      { id: "eq_gym_2", category: "dumbbell", name: "\u54D1\u94C3", maxWeightKg: 30, incrementsKg: [2.5, 5], note: "2.5-30kg" },
      { id: "eq_gym_3", category: "machine", name: "\u56FA\u5B9A\u5668\u68B0\u533A", note: "\u817F\u4E3E/\u5212\u8239/\u63A8\u80F8\u7B49" },
      { id: "eq_gym_4", category: "cable", name: "\u9F99\u95E8\u67B6/\u7EF3\u7D22", note: "2 \u53F0" },
      { id: "eq_gym_5", category: "bench", name: "\u53EF\u8C03\u8BAD\u7EC3\u51F3", note: "3 \u5F20" },
      { id: "eq_gym_6", category: "kettlebell", name: "\u58F6\u94C3", maxWeightKg: 24, incrementsKg: [4, 8, 12, 16, 20, 24] },
      { id: "eq_gym_7", category: "cardio", name: "\u6709\u6C27\u5668\u68B0", note: "\u8DD1\u6B65\u673A/\u692D\u5706\u673A/\u5355\u8F66" }
    ]
  }
];
async function listVenues() {
  const list = await getAll("venues");
  if (!list.length) {
    await putMany("venues", SAMPLE_VENUES);
    return SAMPLE_VENUES;
  }
  return list.sort((a, b) => Number(b.isDefault) - Number(a.isDefault));
}
async function saveVenue(v) {
  const next = __spreadProps(__spreadValues({}, v), { updatedAt: nowISO() });
  if (next.isDefault) {
    const all = await getAll("venues");
    for (const other of all) {
      if (other.id !== next.id && other.isDefault) {
        await put("venues", __spreadProps(__spreadValues({}, other), { isDefault: false, updatedAt: nowISO() }));
      }
    }
  }
  await put("venues", next);
  return next;
}
async function deleteVenue(id) {
  await remove("venues", id);
}
async function setDefaultVenue(id) {
  const all = await getAll("venues");
  for (const v of all) {
    await put("venues", __spreadProps(__spreadValues({}, v), { isDefault: v.id === id, updatedAt: nowISO() }));
  }
}
async function listCustomExercises() {
  const list = await getOne("meta", "customExercises");
  return list != null ? list : [];
}
async function saveCustomExercise(e) {
  const all = await listCustomExercises();
  const idx = all.findIndex((x) => x.id === e.id);
  if (idx >= 0) all[idx] = __spreadProps(__spreadValues({}, e), { updatedAt: nowISO() });
  else all.push(__spreadProps(__spreadValues({}, e), { updatedAt: nowISO() }));
  await put("meta", [...all], "customExercises");
}
async function deleteCustomExercise(id) {
  const all = await listCustomExercises();
  await put("meta", all.filter((x) => x.id !== id), "customExercises");
}
async function listExercises() {
  const custom = await listCustomExercises();
  return [...EXERCISES, ...custom];
}
async function listPlans() {
  return getAll("plans");
}
async function getActivePlan() {
  var _a;
  const all = await listPlans();
  return (_a = all.find((p) => p.active)) != null ? _a : all[0];
}
async function savePlan(p) {
  const next = __spreadProps(__spreadValues({}, p), { updatedAt: nowISO() });
  if (next.active) {
    const all = await getAll("plans");
    for (const other of all) {
      if (other.id !== next.id && other.active) {
        await put("plans", __spreadProps(__spreadValues({}, other), { active: false, updatedAt: nowISO() }));
      }
    }
  }
  await put("plans", next);
  return next;
}
async function deletePlan(id) {
  await remove("plans", id);
}
async function listSessions() {
  const all = await getAll("sessions");
  return all.sort((a, b) => a.startedAt < b.startedAt ? 1 : -1);
}
async function getSession(id) {
  return getOne("sessions", id);
}
async function getInProgressSession() {
  const all = await listSessions();
  return all.find((s) => s.status === "in_progress");
}
async function saveSession(s) {
  const next = __spreadProps(__spreadValues({}, s), { updatedAt: nowISO() });
  await put("sessions", next);
  return next;
}
async function deleteSession(id) {
  await remove("sessions", id);
}
async function listFoods() {
  const custom = (await getAll("foods")).filter((f) => f.custom);
  return [...FOODS, ...custom];
}
async function saveFood(f) {
  const next = __spreadProps(__spreadValues({}, f), { updatedAt: nowISO(), custom: true });
  await put("foods", next);
  return next;
}
function searchLocalFoods(foods, q) {
  const kw = q.trim().toLowerCase();
  if (!kw) return foods;
  return foods.filter(
    (f) => {
      var _a;
      return f.name.toLowerCase().includes(kw) || ((_a = f.alias) != null ? _a : []).some((a) => a.toLowerCase().includes(kw));
    }
  );
}
async function listEntries() {
  return getAll("foodEntries");
}
async function listEntriesByDate(date) {
  return getByIndex("foodEntries", "byDate", date);
}
async function saveEntry(e) {
  const next = __spreadProps(__spreadValues({}, e), { updatedAt: nowISO() });
  await put("foodEntries", next);
  return next;
}
async function deleteEntry(id) {
  await remove("foodEntries", id);
}
async function listMealPlans() {
  return getAll("mealPlans");
}
async function saveMealPlan(m) {
  const next = __spreadProps(__spreadValues({}, m), { updatedAt: nowISO() });
  await put("mealPlans", next);
  return next;
}
async function listShopping() {
  return getAll("shopping");
}
async function saveShoppingItem(i) {
  const next = __spreadProps(__spreadValues({}, i), { updatedAt: nowISO() });
  await put("shopping", next);
  return next;
}
async function deleteShoppingItem(id) {
  await remove("shopping", id);
}
async function listRecovery() {
  return getAll("recovery");
}
async function getRecovery(date) {
  const all = await getByIndex("recovery", "byDate", date);
  return all[0];
}
async function saveRecovery(r) {
  const next = __spreadProps(__spreadValues({}, r), { updatedAt: nowISO() });
  await put("recovery", next);
  return next;
}
async function listBodyWeights() {
  const all = await getAll("bodyWeights");
  return all.sort((a, b) => a.date < b.date ? -1 : 1);
}
async function saveBodyWeight(w) {
  const next = __spreadProps(__spreadValues({}, w), { updatedAt: nowISO() });
  await put("bodyWeights", next);
  return next;
}
async function listWater() {
  return getAll("water");
}
async function addWater(date, ml) {
  const all = await getByIndex("water", "byDate", date);
  if (all[0]) {
    await put("water", __spreadProps(__spreadValues({}, all[0]), { ml: all[0].ml + ml, updatedAt: nowISO() }));
  } else {
    await put("water", {
      id: uid("water"),
      date,
      ml,
      createdAt: nowISO(),
      updatedAt: nowISO()
    });
  }
}
async function exportUserData() {
  const data = await exportAll();
  return __spreadProps(__spreadValues({}, data), {
    exportedAt: [(/* @__PURE__ */ new Date()).toISOString()],
    note: ["\u672C\u6587\u4EF6\u7531 FitLoop \u5BFC\u51FA\uFF0C\u5305\u542B\u4F60\u7684\u4E2A\u4EBA\u6863\u6848\u3001\u8BAD\u7EC3\u4E0E\u996E\u98DF\u8BB0\u5F55\u3002"]
  });
}
async function wipeUserData() {
  await wipeAll();
}
async function clearDemoData() {
  const [venues, plans, sessions, entries, recovery, weights, meals] = await Promise.all([
    getAll("venues"),
    getAll("plans"),
    getAll("sessions"),
    getAll("foodEntries"),
    getAll("recovery"),
    getAll("bodyWeights"),
    getAll("mealPlans")
  ]);
  for (const v of venues) if (v.isDemo) await remove("venues", v.id);
  for (const p of plans) if (p.isDemo) await remove("plans", p.id);
  for (const s of sessions) if (s.isDemo) await remove("sessions", s.id);
  for (const e of entries) if (e.isDemo) await remove("foodEntries", e.id);
  for (const r of recovery) if (r.isDemo) await remove("recovery", r.id);
  for (const w of weights) if (w.isDemo) await remove("bodyWeights", w.id);
  for (const m of meals) if (m.isDemo) await remove("mealPlans", m.id);
}
function hasAnyDemo(venues, sessions, entries) {
  return venues.some((v) => v.isDemo) || sessions.some((s) => s.isDemo) || entries.some((e) => e.isDemo);
}
