import { RANDOM_EVENTS, SPONSORS, rRange, clamp } from './constants.js';
import { GS } from './state.js';

// ─── 場所間ランダムイベント（弟子ごと） ──────────
export function rollRandomEvents(d) {
  const triggered = [];

  for (const ev of RANDOM_EVENTS) {
    if (Math.random() < ev.prob) {
      ev.apply(d);
      triggered.push({
        icon:  ev.icon,
        title: ev.title,
        text:  ev.text(d),
      });
    }
  }

  return triggered;
}

// ─── やる気の自然変動 ────────────────────────────
export function updateMotivation(d) {
  // 勝ち越し：UP
  if (d.wins > d.losses) {
    d.motivation = clamp(d.motivation + rRange(5, 15), 0, 100);
  } else if (d.wins < d.losses) {
    d.motivation = clamp(d.motivation - rRange(5, 12), 0, 100);
  }
  // 高い番付にいると誇りで維持
  if (d.divIdx >= 4) {
    d.motivation = clamp(d.motivation + 3, 0, 100);
  }
}

// ─── 施設からの毎場所効果 ────────────────────────
export function applyFacilityEffects() {
  for (const d of GS.disciples) {
    if (d.retired) continue;

    // 厨房Lv3：毎場所体力+5
    if (GS.facilities.kitchen >= 2) {
      d.maxStamina = clamp(d.maxStamina + 5, 0, 200);
    }
    // 医務室Lv3：怪我ゼロ時体力+3
    if (GS.facilities.medical >= 2 && d.injuryLevel === 0) {
      d.maxStamina = clamp(d.maxStamina + 3, 0, 200);
    }
  }
}

// ─── 年間表彰（6場所ごと） ───────────────────────
export function checkAnnualAwards() {
  if (GS.bashoCount % 6 !== 0 || GS.bashoCount === 0) return null;

  let bestDisciple = null;
  let bestWins     = 0;

  for (const d of GS.disciples) {
    if (d.retired) continue;
    // 直近6場所の勝ち星を概算
    const wins = d.bashoResults?.slice(-6).reduce((s, r) => s + (r?.wins || 0), 0) || 0;
    if (wins > bestWins) {
      bestWins     = wins;
      bestDisciple = d;
    }
  }

  if (!bestDisciple) return null;

  // 年間最多勝ボーナス
  bestDisciple.spirit     = clamp(bestDisciple.spirit     + 20, 0, 999);
  bestDisciple.motivation = clamp(bestDisciple.motivation + 20, 0, 100);
  GS.ryo += 50;

  return {
    name:  bestDisciple.name,
    wins:  bestWins,
    bonus: 50,
  };
}

// ─── スポンサーイベント ───────────────────────────
export function rollSponsorEvent() {
  if (!GS.sponsors) GS.sponsors = [];
  if (GS.sponsors.length >= 3) return null; // 最大3社まで

  // 最高ランクの弟子を取得
  const topDisciple = GS.disciples
    .filter(d => !d.retired)
    .sort((a, b) => b.divIdx - a.divIdx)[0];
  if (!topDisciple) return null;

  // 低確率でスポンサーオファー
  if (Math.random() > 0.22) return null;

  // 現在のスポンサーIDセット
  const currentIds = new Set(GS.sponsors.map(s => s.id));

  // 資格あるスポンサーを絞り込み
  const eligible = SPONSORS.filter(s =>
    !currentIds.has(s.id) &&
    topDisciple.divIdx >= s.minDiv
  );
  if (eligible.length === 0) return null;

  return eligible[rRange(0, eligible.length - 1)];
}

// スポンサー契約を結ぶ
export function acceptSponsor(sponsorId) {
  const sponsor = SPONSORS.find(s => s.id === sponsorId);
  if (!sponsor) return;
  if (!GS.sponsors) GS.sponsors = [];
  if (!GS.sponsors.find(s => s.id === sponsorId)) {
    GS.sponsors.push({ ...sponsor });
  }
}
