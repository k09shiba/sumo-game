import {
  BODY_TYPES, SUMO_STYLES, PERSONALITIES, NAME_PREFIX, NAME_SUFFIX,
  DIVISIONS, DIV_JONOKUCHI,
  rRange, clamp,
} from './constants.js';
import { GS } from './state.js';

let _idCounter = 0;
function newId() { return `d_${Date.now()}_${++_idCounter}`; }

// ─── 新弟子を生成する ────────────────────────────
export function createDisciple(options = {}) {
  const bodyType  = options.bodyType  || BODY_TYPES[rRange(0, BODY_TYPES.length - 1)].id;
  const sumoStyle = options.sumoStyle || SUMO_STYLES[rRange(0, SUMO_STYLES.length - 1)].id;
  const personality = options.personality || PERSONALITIES[rRange(0, PERSONALITIES.length - 1)].id;

  const talent  = options.talent  ?? rRange(50, 100);  // 秘めた才能（成長上限に影響）
  const baseAge = options.age     ?? rRange(15, 22);
  const weight  = options.weight  ?? calcInitWeight(bodyType);

  // 初期ステータス（素質に応じてバラつき）
  const quality = options.quality ?? rRange(1, 3); // 1=普通 2=良 3=優
  const statBase = 60 + quality * 20 + rRange(-15, 15);
  const power  = clamp(statBase + rRange(-20, 20), 40, 200);
  const tech   = clamp(statBase + rRange(-20, 20), 40, 200);
  const spirit = clamp(statBase + rRange(-15, 15), 40, 200);

  // 性格による初期補正
  let initPower = power, initTech = tech, initSpirit = spirit;
  if (personality === 'technical') initTech = clamp(tech + rRange(10, 20), 40, 200);
  if (personality === 'spiritual') initSpirit = clamp(spirit + rRange(10, 20), 40, 200);

  const optimalWeight = calcOptimalWeight(bodyType, power);
  const maxStamina = 80 + quality * 10 + rRange(0, 10);

  const d = {
    id:           options.id || newId(),
    name:         options.name || randomName(),
    nameHistory:  [],
    age:          baseAge,
    weight,
    bodyType,
    sumoStyle,
    personality,
    power: initPower,
    tech: initTech,
    spirit: initSpirit,
    maxStamina,
    stamina:      maxStamina,
    motivation:   rRange(65, 90),
    conditionIdx: 2, // 普通からスタート
    divIdx:       DIV_JONOKUCHI,
    pos:          DIVISIONS[DIV_JONOKUCHI].maxPos,
    wins:         0,
    losses:       0,
    totalWins:    0,
    totalLosses:  0,
    injuryLevel:  0,
    retired:      false,
    promotedJuryo:      false,
    promotedMakunouchi: false,
    promotedOzeki:      false,
    promotedYokozuna:   false,
    bashoResults:       [],
    lastTwoBashoWins:   [],
    yushoRecord:        [],
    sanshoRecord:       [],
    keshoMawashi:       null,
    ozekiFallback:      0,
    yokozunaWarning:    0,
    talent,
    optimalWeight,
    styleXP: { oshi: 0, yotsu: 0, tech: 0, heavy: 0 },
  };

  return d;
}

// ─── 適正体重の計算 ──────────────────────────────
export function calcOptimalWeight(bodyType, power) {
  const base = {
    anko:    130 + power * 0.25,
    shohei:  80  + power * 0.18,
    muscle:  110 + power * 0.35,
    kicchin: 70  + power * 0.12,
  }[bodyType] ?? 120;
  const limits = { anko: 220, shohei: 150, muscle: 200, kicchin: 120 };
  return Math.min(base, limits[bodyType] ?? 200);
}

// ─── 初期体重 ────────────────────────────────────
function calcInitWeight(bodyType) {
  return {
    anko:    rRange(110, 150),
    shohei:  rRange(75,  100),
    muscle:  rRange(100, 130),
    kicchin: rRange(65,  90),
  }[bodyType] ?? rRange(90, 120);
}

// ─── ランダムなしこ名 ────────────────────────────
export function randomName() {
  const p = NAME_PREFIX[rRange(0, NAME_PREFIX.length - 1)];
  const s = NAME_SUFFIX[rRange(0, NAME_SUFFIX.length - 1)];
  return p + s;
}

// ─── 番付ラベル取得 ──────────────────────────────
export function rankLabel(d) {
  const div = DIVISIONS[d.divIdx];
  return `${div.short}${d.pos}枚目`;
}

// ─── 勝率の基礎値（ステータスから） ──────────────
export function baseStrength(d) {
  return d.power * 0.40 + d.tech * 0.35 + d.spirit * 0.25;
}

// ─── 適正体重判定 ────────────────────────────────
export function weightStatus(d) {
  const diff = d.weight - d.optimalWeight;
  if (Math.abs(diff) <= 10) return 'optimal';   // ベストコンディション +3%
  if (diff > 30)             return 'overweight'; // 過体重 -10%
  if (diff < -15)            return 'thin';       // やせすぎ -5%
  return 'normal';
}

// ─── ライバル生成 ────────────────────────────────
export function createRival(stableDisciple) {
  const r = {
    id:          'rival',
    name:        randomName(),
    age:         stableDisciple.age + rRange(-2, 2),
    weight:      stableDisciple.weight + rRange(-15, 15),
    bodyType:    BODY_TYPES[rRange(0, BODY_TYPES.length - 1)].id,
    sumoStyle:   SUMO_STYLES[rRange(0, SUMO_STYLES.length - 1)].id,
    power:       stableDisciple.power  + rRange(-20, 20),
    tech:        stableDisciple.tech   + rRange(-20, 20),
    spirit:      stableDisciple.spirit + rRange(-10, 10),
    divIdx:      DIV_JONOKUCHI,
    pos:         DIVISIONS[DIV_JONOKUCHI].maxPos,
    talent:      rRange(60, 100),
    winsAgainst:  0,
    lossesAgainst: 0,
    streak:      0, // +我が有利、-向こうが有利
  };
  return r;
}

// ─── ライバルの場所シミュレーション ──────────────
export function simulateRivalBasho(rival) {
  const div = DIVISIONS[rival.divIdx];
  const strength = rival.power * 0.4 + rival.tech * 0.35 + rival.spirit * 0.25;
  // 力士のレベルに応じた期待勝ち星
  const expectedWinRate = 0.45 + Math.min(strength / 2000, 0.35);
  let wins = 0;
  for (let i = 0; i < div.matches; i++) {
    if (Math.random() < expectedWinRate) wins++;
  }
  rival.wins  = wins;
  rival.losses = div.matches - wins;

  // ステータス成長
  rival.power  += rRange(-2, 8);
  rival.tech   += rRange(-2, 8);
  rival.spirit += rRange(-1, 5);
  rival.age++;

  return wins;
}
