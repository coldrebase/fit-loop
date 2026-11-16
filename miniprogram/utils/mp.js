const F = require("../lib/fitloop.js");

const SLOTS = [
  { value: "breakfast", label: "早餐" },
  { value: "lunch", label: "午餐" },
  { value: "dinner", label: "晚餐" },
  { value: "snack", label: "加餐" }
];

const GOAL_LABEL = { fat_loss: "减脂", muscle_gain: "增肌", strength: "提升力量", recomp: "塑形", health: "健康维持" };
const LEVEL_LABEL = { beginner: "新手", intermediate: "进阶", advanced: "资深" };
const SEX_LABEL = { female: "女", male: "男", unspecified: "不提供" };

function today() {
  return F.toISODate(new Date());
}

async function boot() {
  const profile = await F.getProfile();
  if (!profile.onboarded) {
    profile.onboarded = true;
    await F.saveProfile(profile);
  }
  const venues = await F.listVenues();
  return { profile, venues };
}

function planInput(profile, venue) {
  const equipment = venue && venue.equipment ? venue.equipment.map((e) => e.category) : ["bodyweight"];
  return {
    goal: profile.goal,
    experience: profile.experience,
    daysPerWeek: profile.daysPerWeek,
    sessionMinutes: profile.sessionMinutes,
    availableEquipment: equipment.length ? Array.from(new Set(equipment.concat(["bodyweight"]))) : ["bodyweight"],
    limitationAreas: (profile.limitations && profile.limitations.areas) || [],
    avoidPatterns: (profile.limitations && profile.limitations.avoidPatterns) || []
  };
}

function foodOf(entry, foods) {
  const builtin = F.FOOD_MAP[entry.foodId];
  if (builtin) return builtin;
  return (foods || []).find((f) => f.id === entry.foodId);
}

/** 当天营养合计 */
function dayTotals(entries, foods) {
  let kcal = 0, protein = 0, carb = 0, fat = 0;
  for (const e of entries) {
    const food = foodOf(e, foods);
    const per100 = (food && food.per100g) || { kcal: 0, proteinG: 0, carbG: 0, fatG: 0 };
    const n = F.nutrientsFor(e, per100);
    kcal += n.kcal; protein += n.proteinG; carb += n.carbG; fat += n.fatG;
  }
  return {
    kcal: Math.round(kcal),
    protein: Math.round(protein * 10) / 10,
    carb: Math.round(carb * 10) / 10,
    fat: Math.round(fat * 10) / 10
  };
}

module.exports = { F, SLOTS, GOAL_LABEL, LEVEL_LABEL, SEX_LABEL, today, boot, planInput, foodOf, dayTotals };
