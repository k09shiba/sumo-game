import {
  DIVISIONS, DIV_JONOKUCHI, DIV_MAKUSHITA, DIV_JURYO,
  DIV_MAKUNOUCHI, DIV_OZEKI, DIV_YOKOZUNA,
  rRange, clamp,
} from './constants.js';
import { GS, addHistory } from './state.js';

// ─── メイン：番付変動計算 ────────────────────────
// 修正済み：次段の最下位に固定するバグを除去
export function applyRankChange(d, wins) {
  const div   = DIVISIONS[d.divIdx];
  const losses = div.matches - wins;

  // 横綱：変動なし（別処理）
  if (d.divIdx === DIV_YOKOZUNA) {
    handleYokozuna(d, wins);
    return;
  }
  // 大関：特殊ルール
  if (d.divIdx === DIV_OZEKI) {
    handleOzeki(d, wins);
    return;
  }

  const delta    = calcDelta(d, wins);
  let newPos     = d.pos + delta;
  let newDivIdx  = d.divIdx;

  // ── 上の段へ移動（newPos < 1 に溢れた場合） ──
  while (newPos < 1 && newDivIdx < DIVISIONS.length - 1) {
    const overflow   = 1 - newPos;
    const fromMax    = DIVISIONS[newDivIdx].maxPos;
    newDivIdx++;
    const toDiv      = DIVISIONS[newDivIdx];

    if (newDivIdx >= DIV_JURYO) {
      // 幕下→十両以上：下位から入る（比率変換）
      const ratio = clamp(overflow / fromMax, 0, 1);
      newPos = Math.round(toDiv.maxPos * (1 - ratio * 0.55));
    } else {
      // 下位番付間：溢れ量の比率で決定
      const ratio = clamp(overflow / fromMax, 0, 1);
      newPos = Math.round(toDiv.maxPos * (1 - ratio * 0.65));
    }
    newPos = clamp(newPos, 1, toDiv.maxPos);
  }

  // ── 下の段へ移動（maxPos を超えた場合） ──
  while (newDivIdx > 0 && newPos > DIVISIONS[newDivIdx].maxPos) {
    const overflow = newPos - DIVISIONS[newDivIdx].maxPos;
    const fromMax  = DIVISIONS[newDivIdx].maxPos;
    newDivIdx--;
    const toDiv    = DIVISIONS[newDivIdx];

    if (newDivIdx === DIV_JONOKUCHI) {
      newPos = toDiv.maxPos; // 序ノ口の最下位
    } else {
      const ratio = clamp(overflow / fromMax, 0, 1);
      newPos = Math.round(toDiv.maxPos * ratio * 0.65);
      newPos = clamp(newPos, 1, toDiv.maxPos);
    }
  }

  const oldDivIdx = d.divIdx;
  d.divIdx = clamp(newDivIdx, 0, DIVISIONS.length - 1);
  d.pos    = clamp(newPos, 1, DIVISIONS[d.divIdx].maxPos);

  // 昇進イベント判定
  checkPromotionEvents(d, oldDivIdx, wins);
}

// ─── 段ごとの変動量計算 ──────────────────────────
function calcDelta(d, wins) {
  const div    = DIVISIONS[d.divIdx];
  const losses = div.matches - wins;
  const diff   = wins - losses; // 正=勝ち越し、負=負け越し
  const idx    = d.divIdx;

  if (idx === DIV_JONOKUCHI) {
    // 序ノ口：動きを抑えめに
    return diff === 0 ? 0 : -diff * 7 + rRange(-2, 2);
  }
  if (idx === 1) { // 序二段
    if (wins === 7) return -(div.maxPos + 10); // 全勝→一発昇進
    return -diff * 10 + rRange(-3, 3);
  }
  if (idx === 2) { // 三段目
    if (wins === 7) return -(div.maxPos + 10);
    return -diff * 9 + rRange(-3, 3);
  }
  if (idx === DIV_MAKUSHITA) { // 幕下
    if (wins === 7 && d.pos <= 5) return -(div.maxPos + 15); // 幕下上位全勝→特例十両
    if (wins === 7) return -25 + rRange(-5, 0);
    const posRatio = d.pos / div.maxPos;
    const base = posRatio > 0.5 ? 9 : 4;
    return -diff * base + rRange(-3, 3);
  }
  // 十両・幕内：昇降をやや緩やかに
  const posRatio = d.pos / div.maxPos;
  return -Math.round(diff * (1.5 + posRatio * 0.8)) + rRange(-1, 2);
}

// ─── 大関の特殊処理 ──────────────────────────────
function handleOzeki(d, wins) {
  if (wins >= 8) {
    d.ozekiFallback = 0; // 勝ち越しでカウンターリセット
    const delta = -Math.floor((wins - 8) * 0.8);
    d.pos = clamp(d.pos + delta, 1, DIVISIONS[DIV_OZEKI].maxPos);
  } else {
    d.ozekiFallback++;
    if (d.ozekiFallback >= 2) {
      // 2場所連続負け越し → 大関陥落（関脇に）
      d.divIdx     = DIV_MAKUNOUCHI;
      d.pos        = 3; // 関脇相当
      d.ozekiFallback = 0;
      queueEvent('ozeki_fall', d);
    } else {
      queueEvent('ozeki_warning', d);
    }
  }

  // 横綱昇進審議（2場所連続優勝 or 準優勝+13勝以上）
  checkYokozunaPromotion(d, wins);
}

// ─── 横綱の特殊処理 ──────────────────────────────
function handleYokozuna(d, wins) {
  if (wins < 8) {
    d.yokozunaWarning++;
    if (d.yokozunaWarning >= 3) {
      queueEvent('yokozuna_retire_forced', d);
    } else {
      queueEvent('yokozuna_warning', d);
    }
  } else {
    d.yokozunaWarning = 0;
  }
}

// ─── 横綱昇進審議 ────────────────────────────────
function checkYokozunaPromotion(d, currentWins) {
  const last = d.lastTwoBashoWins || [];
  last.push(currentWins);
  if (last.length > 2) last.shift();
  d.lastTwoBashoWins = last;

  if (last.length < 2) return;
  const [prev, curr] = last;
  const prevYusho = d.yushoRecord.length > 0 &&
    d.yushoRecord[d.yushoRecord.length - 1]?.bashoIdx === (GS.bashoCount - 1);
  const currYusho = d.yushoRecord.length > 0 &&
    d.yushoRecord[d.yushoRecord.length - 1]?.bashoIdx === GS.bashoCount;

  const qualifies = (prevYusho && currYusho) ||
    (currYusho && curr >= 13 && prev >= 12);

  if (qualifies && d.divIdx === DIV_OZEKI) {
    queueEvent('yokozuna_promotion', d);
  }
}

// ─── 昇進イベント判定 ────────────────────────────
function checkPromotionEvents(d, oldDivIdx, wins) {
  // 十両昇進
  if (oldDivIdx < DIV_JURYO && d.divIdx >= DIV_JURYO && !d.promotedJuryo) {
    d.promotedJuryo = true;
    d.keshoMawashi  = 'akaishi'; // デフォルト化粧まわし
    queueEvent('juryo_promotion', d);
    addHistory({ icon: '🎊', text: `${d.name} 十両昇進！` });
  }
  // 幕内昇進
  if (oldDivIdx < DIV_MAKUNOUCHI && d.divIdx >= DIV_MAKUNOUCHI && !d.promotedMakunouchi) {
    d.promotedMakunouchi = true;
    queueEvent('makunouchi_promotion', d);
    addHistory({ icon: '🎊', text: `${d.name} 幕内昇進！` });
  }
  // 大関昇進
  if (oldDivIdx < DIV_OZEKI && d.divIdx >= DIV_OZEKI && !d.promotedOzeki) {
    d.promotedOzeki = true;
    queueEvent('ozeki_promotion', d);
    addHistory({ icon: '🏅', text: `${d.name} 大関昇進！` });
  }
  // 横綱昇進
  if (oldDivIdx < DIV_YOKOZUNA && d.divIdx >= DIV_YOKOZUNA && !d.promotedYokozuna) {
    d.promotedYokozuna = true;
    queueEvent('yokozuna_promotion_confirmed', d);
    addHistory({ icon: '👑', text: `${d.name} 横綱昇進！` });
  }
}

// ─── イベントキューへ追加 ────────────────────────
// （modal.js の queueModal と連携するためのイベントバスもどき）
const _eventQueue = [];
export function queueEvent(type, data) {
  _eventQueue.push({ type, data });
}
export function drainEventQueue() {
  return _eventQueue.splice(0);
}

// ─── 優勝判定 ────────────────────────────────────
export function checkYusho(d, wins) {
  const div = DIVISIONS[d.divIdx];
  // 最多勝ち星（簡易：一定勝数以上を優勝扱い）
  const yushoThreshold = {
    0: 7, 1: 7, 2: 7, 3: 7,   // 幕下以下：全勝
    4: 13, 5: 13, 6: 14, 7: 13, // 関取：高勝数
  }[d.divIdx] ?? 7;

  if (wins >= yushoThreshold) {
    const entry = {
      bashoIdx:  GS.bashoCount,
      divName:   div.name,
      wins,
      losses:    div.matches - wins,
      year:      GS.year,
      month:     GS.month,
    };
    d.yushoRecord.push(entry);
    addHistory({ icon: '🏆', text: `${d.name} ${div.name}優勝（${wins}勝）！` });
    return true;
  }
  return false;
}

// ─── 三賞判定 ────────────────────────────────────
export function checkSansho(d, wins) {
  if (d.divIdx < DIV_MAKUNOUCHI) return null;
  const awards = [];
  if (wins >= 12)                         awards.push('敢闘賞');
  if (wins >= 10 && d.pos <= 20)          awards.push('殊勲賞');
  if (wins >= 10 && wins <= 12 && d.pos >= 20) awards.push('技能賞');
  return awards.length > 0 ? awards : null;
}

// ─── 引退判定（年齢） ────────────────────────────
export function checkRetirementAge(d) {
  if (d.age >= 40) return 'forced';
  if (d.age >= 36) return 'advisory';
  return null;
}
