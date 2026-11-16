import assert from "node:assert/strict";
import { test } from "node:test";
import { AppleHealthParser, detectFormat, parseHealthCsv } from "./.build/lib.mjs";

function parseXml(xml) {
  const p = new AppleHealthParser();
  // 故意按小块喂，验证流式切词
  for (let i = 0; i < xml.length; i += 37) p.push(xml.slice(i, i + 37));
  return p.finish();
}

const XML = `<?xml version="1.0" encoding="UTF-8"?>
<HealthData locale="zh_CN">
 <Record type="HKQuantityTypeIdentifierBodyMass" sourceName="Scale" unit="kg" creationDate="2024-01-01 08:00:00 +0800" startDate="2024-01-01 08:00:00 +0800" endDate="2024-01-01 08:00:00 +0800" value="62.44"/>
 <Record type="HKQuantityTypeIdentifierBodyMass" sourceName="Scale" unit="kg" creationDate="2024-01-02 08:00:00 +0800" startDate="2024-01-02 08:00:00 +0800" endDate="2024-01-02 08:00:00 +0800" value="62.1"/>
 <Record type="HKQuantityTypeIdentifierBodyMass" sourceName="Scale" unit="lb" creationDate="2024-01-03 08:00:00 +0800" startDate="2024-01-03 08:00:00 +0800" endDate="2024-01-03 08:00:00 +0800" value="136.7"/>
 <Record type="HKQuantityTypeIdentifierRestingHeartRate" sourceName="Watch" unit="count/min" startDate="2024-01-02 07:00:00 +0800" endDate="2024-01-02 07:00:00 +0800" value="58"/>
 <Record type="HKQuantityTypeIdentifierRestingHeartRate" sourceName="Watch" unit="count/min" startDate="2024-01-02 22:00:00 +0800" endDate="2024-01-02 22:00:00 +0800" value="62"/>
 <Record type="HKCategoryTypeIdentifierSleepAnalysis" sourceName="Watch" startDate="2024-01-01 23:30:00 +0800" endDate="2024-01-02 07:00:00 +0800" value="HKCategoryValueSleepAnalysisAsleepCore"/>
 <Record type="HKCategoryTypeIdentifierSleepAnalysis" sourceName="Watch" startDate="2024-01-01 20:00:00 +0800" endDate="2024-01-02 23:00:00 +0800" value="HKCategoryValueSleepAnalysisInBed"/>
 <Record type="HKQuantityTypeIdentifierBodyMass" sourceName="Scale" unit="kg" startDate="bad-date" endDate="bad-date" value="60"/>
</HealthData>`;

test("Apple 健康：解析体重并换算磅", () => {
  const r = parseXml(XML);
  assert.equal(r.weights.length, 3);
  assert.equal(r.weights[0].date, "2024-01-01");
  assert.equal(r.weights[0].kg, 62.4);
  assert.equal(r.weights[1].kg, 62.1);
  // 136.7 lb ≈ 62.0 kg
  assert.ok(Math.abs(r.weights[2].kg - 62) < 0.2, `磅换算异常：${r.weights[2].kg}`);
});

test("Apple 健康：睡眠只计睡着、归到醒来那天，InBed 不计", () => {
  const r = parseXml(XML);
  assert.equal(r.sleep.length, 1);
  assert.equal(r.sleep[0].date, "2024-01-02");
  assert.equal(r.sleep[0].hours, 7.5);
});

test("Apple 健康：静息心率按天取平均", () => {
  const r = parseXml(XML);
  assert.equal(r.restingHeartRate.length, 1);
  assert.equal(r.restingHeartRate[0].bpm, 60);
});

test("Apple 健康：坏数据计入 skipped，不污染结果", () => {
  const r = parseXml(XML);
  assert.ok(r.skipped >= 1);
  assert.equal(r.scanned, 8);
});

test("CSV：中文表头也能识别", () => {
  const csv = "日期,体重,睡眠\n2024-02-01,64.2,7.1\n2024-02-02,63.9,6.5\n";
  const r = parseHealthCsv(csv);
  assert.equal(r.weights.length, 2);
  assert.equal(r.sleep.length, 2);
  assert.equal(r.weights[1].kg, 63.9);
});

test("CSV：英文表头 + 静息心率", () => {
  const csv = "date,weight,sleep,rhr\n2024-03-01,70,8,55\n";
  const r = parseHealthCsv(csv);
  assert.equal(r.weights[0].kg, 70);
  assert.equal(r.sleep[0].hours, 8);
  assert.equal(r.restingHeartRate[0].bpm, 55);
});

test("CSV：越界数值被跳过", () => {
  const csv = "date,weight,sleep\n2024-03-01,999,30\n";
  const r = parseHealthCsv(csv);
  assert.equal(r.weights.length, 0);
  assert.equal(r.sleep.length, 0);
  assert.equal(r.skipped, 2);
});

test("格式识别：按扩展名与内容", () => {
  assert.equal(detectFormat("export.xml", ""), "apple");
  assert.equal(detectFormat("data.csv", ""), "csv");
  assert.equal(detectFormat("health.txt", "<HealthData locale=\"zh_CN\">"), "apple");
  assert.equal(detectFormat("health.txt", "date,weight"), "csv");
});