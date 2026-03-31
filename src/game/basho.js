import {
  DIVISIONS, DIV_JURYO, DIV_MAKUNOUCHI, DIV_YOKOZUNA,
  STYLE_MATCHUP, CONDITIONS, WAZA, DRAMA_EVENTS, BASHO_NAMES,
  rRange, clamp,
} from './constants.js';
import { GS } from './state.js';
import { baseStrength, weightStatus } from './disciple.js';
import { checkYusho, checkSansho, applyRankChange, drainEventQueue } from './rankSystem.js';
import { postBashoRecovery } from './training.js';

// ─── 現在の場所名情報 ────────────────────────────
export function getCurrentBashoInfo() {
  const idx = GS.bashoCount % 6;
  return BASHO_NAMES[idx];
}

// ─── 場所開始処理 ────────────────────────────────
export function startBasho() {
  for (const d of GS.disciples) {
    if (d.retired) continue;
    d.wins   = 0;
    d.losses = 0;
    d.bashoMatchResults = [];
    updateConditionPreBasho(d);
  }
  return getCurrentBashoInfo();
}

// ─── 場所前コンディション調整 ────────────────────
function updateConditionPreBasho(d) {
  const stamRatio = d.stamina / (d.maxStamina || 100);
  let shift = 0;
  if (stamRatio > 0.8) shift += 1;
  if (stamRatio < 0.3) shift -= 2;
  if (d.injuryLevel >= 1) shift -= 1;
  if (d.motivation >= 80) shift += 1;
  if (d.motivation < 30)  shift -= 1;
  shift += rRange(-1, 1);
  d.conditionIdx = clamp((d.conditionIdx ?? 2) + shift, 0, 4);
}

// ─── 1力士の全取組をシミュレート ─────────────────
export function simulateAllMatches(d) {
  const div    = DIVISIONS[d.divIdx];
  const numDays = div.matches;
  const results = [];
  let wins = 0, losses = 0;

  for (let day = 1; day <= numDays; day++) {
    const opponent = generateOpponent(d, day);
    const winProb  = calcWinProb(d, opponent);
    const won      = Math.random() < winProb;
    const waza     = WAZA[rRange(0, WAZA.length - 1)];

    if (won) wins++; else losses++;

    const drama = checkDramaEvent(d, opponent, day, wins, losses, numDays);

    // 場中怪我判定
    if (!won && d.injuryLevel < 2 && Math.random() < 0.04 + d.injuryLevel * 0.02) {
      d.injuryLevel++;
      drama.push({ type: DRAMA_EVENTS.INJURY, msg: '軽傷を負った！' });
    }

    results.push({ day, opponent: { ...opponent }, won, waza, drama, cumWins: wins, cumLosses: losses });

    // スタミナ消耗
    const drain = div.matches === 15 ? 4 : 6;
    d.stamina = clamp(d.stamina - drain, 0, d.maxStamina);
  }

  d.wins         = wins;
  d.losses       = losses;
  d.totalWins    = (d.totalWins  || 0) + wins;
  d.totalLosses  = (d.totalLosses || 0) + losses;
  d.bashoMatchResults = results;
  return results;
}

// ─── 対戦相手を生成 ──────────────────────────────
function generateOpponent(d, day) {
  const div       = DIVISIONS[d.divIdx];
  const posOffset = rRange(-6, 6);
  const oppPos    = clamp(d.pos + posOffset, 1, div.maxPos);
  const rankFactor = 1 - (oppPos / div.maxPos) * 0.5;
  const divBase   = 100 + d.divIdx * 60;
  const oppStr    = divBase * rankFactor * (0.85 + Math.random() * 0.3);
  const styles    = ['oshi', 'yotsu', 'tech', 'heavy'];
  return {
    name:       `対戦相手${day}`,
    pos:        oppPos,
    power:      Math.round(oppStr * (0.9 + Math.random() * 0.2)),
    tech:       Math.round(oppStr * (0.9 + Math.random() * 0.2)),
    spirit:     Math.round(oppStr * (0.8 + Math.random() * 0.2)),
    sumoStyle:  styles[rRange(0, styles.length - 1)],
    weight:     rRange(90, 180),
    isYokozuna: d.divIdx === DIV_MAKUNOUCHI && oppPos === 1 && Math.random() < 0.4,
  };
}

// ─── 勝率計算 ────────────────────────────────────
function calcWinProb(d, opponent) {
  const myStr = baseStrength(d);
  const opStr = opponent.power * 0.40 + opponent.tech * 0.35 + opponent.spirit * 0.25;
  let prob    = myStr / (myStr + opStr);

  const div     = DIVISIONS[d.divIdx];
  const posDiff = (d.pos - opponent.pos) / div.maxPos;
  prob += posDiff * 0.06;

  const cond = CONDITIONS[d.conditionIdx ?? 2];
  prob += cond.bonus;

  const myStyle = d.sumoStyle || 'oshi';
  const opStyle = opponent.sumoStyle || 'oshi';
  prob += STYLE_MATCHUP[myStyle]?.[opStyle] ?? 0;

  const wDiff = d.weight - opponent.weight;
  prob += Math.tanh(wDiff / 40) * 0.06;

  const ws = weightStatus(d);
  if (ws === 'optimal')    prob += 0.03;
  if (ws === 'overweight') prob -= 0.10;
  if (ws === 'thin')       prob -= 0.05;

  if (d.injuryLevel >= 1)       prob -= 0.05 * d.injuryLevel;
  if (GS.activeItems?.['mawashi_sp']) prob += 0.03;
  if (GS.activeItems?.['goma'] && prob < 0.4) prob += 0.05;
  prob += (d.motivation - 60) * 0.001;

  return clamp(prob, 0.04, 0.96);
}

// ─── ドラマイベント判定 ──────────────────────────
function checkDramaEvent(d, opponent, day, wins, losses, numDays) {
  const events = [];

  if (d.divIdx === DIV_MAKUNOUCHI && d.pos >= 25 && opponent.isYokozuna) {
    events.push({ type: DRAMA_EVENTS.KINBOSHI, msg: '横綱との対戦！金星のチャンス！' });
  }
  if (wins >= 8 && losses <= 3 && day === Math.floor(numDays * 0.7)) {
    events.push({ type: DRAMA_EVENTS.INTERVIEW, msg: '記者からインタビューを受けた！' });
    d.motivation = clamp(d.motivation + 10, 0, 100);
  }
  if (day === numDays && wins >= (numDays === 15 ? 12 : 6)) {
    events.push({ type: DRAMA_EVENTS.DECISIVE, msg: '千秋楽大一番！' });
  }
  const rival = GS.rival;
  if (rival && rival.divIdx === d.divIdx && Math.abs(rival.pos - d.pos) <= 8 && day === 7) {
    events.push({ type: DRAMA_EVENTS.RIVAL, msg: `${rival.name}との直接対決！` });
    rival.streak = (rival.streak || 0) + (Math.random() < 0.5 ? 1 : -1);
  }

  return events;
}

// ─── 場所収入計算 ────────────────────────────────
export function calcBashoIncome() {
  let income = 0;
  for (const d of GS.disciples) {
    if (d.retired) continue;
    const div = DIVISIONS[d.divIdx];
    income += div.salaryBase;
    if (d.wins > d.losses) income += (d.wins - d.losses) * 5;
    const lastYusho = d.yushoRecord?.[d.yushoRecord.length - 1];
    if (lastYusho?.bashoIdx === GS.bashoCount - 1) income += 50;
  }
  income += (GS.incomeBonus || 0);
  return income;
}

// ─── ライバルシミュレーション ─────────────────────
export function simulateRivalBasho() {
  const rival = GS.rival;
  if (!rival) return;

  const div     = DIVISIONS[rival.divIdx];
  const str     = rival.power * 0.4 + rival.tech * 0.35 + rival.spirit * 0.25;
  const winRate = clamp(0.3 + str / 2000, 0.3, 0.75);
  let wins = 0;
  for (let i = 0; i < div.matches; i++) if (Math.random() < winRate) wins++;

  rival.wins   = wins;
  rival.losses = div.matches - wins;
  rival.age    = (rival.age || 18) + 1;

  // ライバル番付変動（簡易）
  const diff  = wins - rival.losses;
  const delta = -diff * (rival.divIdx >= DIV_JURYO ? 2 : 10);
  rival.pos   = clamp(rival.pos + delta, 1, div.maxPos);

  // 段跨ぎチェック（簡易）
  if (rival.pos < 1 && rival.divIdx < DIVISIONS.length - 1) {
    rival.divIdx++;
    rival.pos = DIVISIONS[rival.divIdx].maxPos;
  } else if (rival.pos > div.maxPos && rival.divIdx > 0) {
    rival.divIdx--;
    rival.pos = 1;
  }

  rival.power  = clamp(rival.power  + rRange(0, 6), 60, 900);
  rival.tech   = clamp(rival.tech   + rRange(0, 6), 60, 900);
  rival.spirit = clamp(rival.spirit + rRange(0, 4), 60, 600);
}

// ─── 月の進行 ────────────────────────────────────
export function advanceMonth() {
  const months = [1, 3, 5, 7, 9, 11];
  const curIdx = months.indexOf(GS.month);
  if (curIdx === months.length - 1) {
    GS.month = months[0];
    GS.year++;
  } else {
    GS.month = months[curIdx + 1];
  }
  GS.bashoCount++;
}
