import {
  TRAINING_CMDS, CONDITIONS, TRAINING_TURNS_PER_BASHO,
  SPECIAL_MOVE_UNLOCKS,
  rRange, clamp,
} from './constants.js';
import { calcOptimalWeight, weightStatus } from './disciple.js';
import { GS } from './state.js';

// ─── 性格による成長倍率 ──────────────────────────
function personalityGain(d, gainType, baseGain) {
  const p = d.personality;
  if (!p || p === 'earnest') return Math.round(baseGain * (p === 'earnest' ? 1.25 : 1.0));
  if (p === 'genius') {
    const roll = Math.random();
    if (roll < 0.18) return Math.max(1, Math.round(baseGain * 0.3));   // スランプ
    if (roll > 0.82) return Math.round(baseGain * 2.2);                  // 大爆発
    return baseGain;
  }
  if (p === 'spiritual') {
    return gainType === 'spirit' || gainType === 'motivation'
      ? Math.round(baseGain * 1.5) : baseGain;
  }
  if (p === 'technical') {
    return gainType === 'tech' ? Math.round(baseGain * 1.5) : baseGain;
  }
  return baseGain;
}

// ─── 稽古実行 ────────────────────────────────────
export function applyTraining(d, cmdId) {
  const cmd = TRAINING_CMDS.find(c => c.id === cmdId);
  if (!cmd) return { ok: false, msg: '不明なコマンドです' };

  // スタミナチェック
  if (d.stamina < cmd.stamCost) {
    return { ok: false, msg: `スタミナが足りない！（必要:${cmd.stamCost}）` };
  }

  // 行動回数チェック（休息・食事も含む全コマンド）
  if ((GS.trainTurnsLeft ?? TRAINING_TURNS_PER_BASHO) <= 0) {
    return { ok: false, msg: '今月の行動が上限に達しました！場所へ向かいましょう。' };
  }

  d.stamina = clamp(d.stamina - cmd.stamCost, 0, d.maxStamina);

  // 施設ボーナス
  const dojoBonus = 1 + (GS.facilities.dojo * 0.1);
  // アイテムボーナス（chanko_plusは食べるのみ）
  const chankoBonus = GS.activeItems['chanko_plus'] && cmdId === 'eat' ? 1.5 : 1.0;

  // タレント上限（成長上限係数）
  const talentFactor = d.talent / 100;
  const statCap = 200 + (d.talent - 50) * 4; // 最高値

  const msgs = [];

  switch (cmdId) {
    case 'oshi': {
      const gain = personalityGain(d, 'power', Math.round(rRange(4, 10) * dojoBonus * talentFactor));
      d.power = clamp(d.power + gain, 0, statCap);
      d.styleXP.oshi = (d.styleXP.oshi || 0) + 10;
      if (d.styleXP.oshi > 80 && d.sumoStyle !== 'oshi') {
        d.sumoStyle = 'oshi';
        msgs.push('押し相撲が身についた！');
      }
      msgs.push(`筋力 +${gain}`);
      checkSpecialMoveUnlock(d, 'oshi', msgs);
      break;
    }
    case 'yotsu': {
      const gain = personalityGain(d, 'tech', Math.round(rRange(4, 10) * dojoBonus * talentFactor));
      d.tech = clamp(d.tech + gain, 0, statCap);
      d.styleXP.yotsu = (d.styleXP.yotsu || 0) + 10;
      if (d.styleXP.yotsu > 80 && d.sumoStyle !== 'yotsu') {
        d.sumoStyle = 'yotsu';
        msgs.push('四つ相撲が身についた！');
      }
      msgs.push(`技術 +${gain}`);
      checkSpecialMoveUnlock(d, 'yotsu', msgs);
      break;
    }
    case 'nage': {
      const gain = personalityGain(d, 'tech', Math.round(rRange(3, 8) * dojoBonus * talentFactor));
      d.tech = clamp(d.tech + gain, 0, statCap);
      d.styleXP.tech = (d.styleXP.tech || 0) + 8;
      const wLoss = rRange(1, 2);
      d.weight = clamp(d.weight - wLoss, 60, 250);
      msgs.push(`技術 +${gain}、体重 -${wLoss}kg`);
      checkSpecialMoveUnlock(d, 'tech', msgs);
      break;
    }
    case 'run': {
      const gain = Math.round(rRange(4, 10) * dojoBonus);
      d.maxStamina = clamp(d.maxStamina + gain, 0, 200);
      d.weight = clamp(d.weight - 1, 60, 250);
      msgs.push(`体力上限 +${gain}、体重 -1kg`);
      break;
    }
    case 'mental': {
      const sGain = personalityGain(d, 'spirit', Math.round(rRange(4, 10) * dojoBonus * talentFactor));
      const mGain = personalityGain(d, 'motivation', rRange(5, 12));
      d.spirit     = clamp(d.spirit + sGain, 0, statCap);
      d.motivation = clamp(d.motivation + mGain, 0, 100);
      msgs.push(`精神 +${sGain}、やる気 +${mGain}`);
      break;
    }
    case 'diet': {
      const opt = d.optimalWeight;
      const diff = d.weight - opt;
      if (Math.abs(diff) <= 5) {
        msgs.push('すでに適正体重！');
      } else if (diff > 0) {
        const change = Math.min(diff, rRange(3, 6));
        d.weight -= change;
        msgs.push(`体重 -${change}kg（適正体重へ近づいた）`);
      } else {
        const change = Math.min(-diff, rRange(2, 4));
        d.weight += change;
        msgs.push(`体重 +${change}kg（適正体重へ近づいた）`);
      }
      break;
    }
    case 'group': {
      const lv = GS.facilities.dojo + 1;
      const gain = personalityGain(d, 'power', Math.round(rRange(2, 4) * lv * talentFactor));
      d.power  = clamp(d.power  + gain, 0, statCap);
      d.tech   = clamp(d.tech   + gain, 0, statCap);
      d.spirit = clamp(d.spirit + gain, 0, statCap);
      msgs.push(`全ステ +${gain}`);
      break;
    }
    case 'cond': {
      const old = d.conditionIdx;
      d.conditionIdx = clamp(d.conditionIdx + 1, 0, 4);
      if (d.conditionIdx > old) {
        msgs.push(`コンディション：${CONDITIONS[old].label} → ${CONDITIONS[d.conditionIdx].label}`);
      } else {
        msgs.push('コンディションはすでに最高！');
      }
      break;
    }
    case 'sleep': {
      // 休養はスタミナを65%まで回復（全回復ではなくすることで管理に意味を持たせる）
      const restoreTarget = Math.round(d.maxStamina * 0.65);
      const restoreAmt = Math.max(0, restoreTarget - d.stamina);
      d.stamina = clamp(d.stamina + restoreAmt, 0, d.maxStamina);
      const mGain = rRange(10, 18);
      d.motivation = clamp(d.motivation + mGain, 0, 100);
      msgs.push(`スタミナ回復（+${restoreAmt}）、やる気 +${mGain}`);
      break;
    }
    case 'eat': {
      const kitchenBonus = 1 + GS.facilities.kitchen * 0.2;
      const ws = weightStatus(d);

      let wGain, sGain;
      if (ws === 'optimal') {
        wGain = rRange(2, 4);
        sGain = Math.round(rRange(4, 10) * kitchenBonus * chankoBonus);
      } else if (ws === 'overweight') {
        wGain = rRange(1, 2);
        sGain = Math.round(rRange(2, 5) * kitchenBonus * chankoBonus);
      } else {
        wGain = rRange(3, 6);
        sGain = Math.round(rRange(5, 12) * kitchenBonus * chankoBonus);
      }

      d.weight     = clamp(d.weight + wGain, 60, 250);
      d.maxStamina = clamp(d.maxStamina + sGain, 0, 200);
      d.stamina    = clamp(d.stamina + sGain, 0, d.maxStamina);
      msgs.push(`体重 +${wGain}kg、体力 +${sGain}`);
      break;
    }
  }

  // 行動回数を消費（全コマンド）
  GS.trainTurnsLeft = Math.max(0, (GS.trainTurnsLeft ?? TRAINING_TURNS_PER_BASHO) - 1);

  // 天才肌の大爆発メッセージ
  if (d.personality === 'genius' && msgs.length > 0) {
    const lastGain = parseInt(msgs[0].match(/\d+/)?.[0] || '0');
    const baseExpected = 12;
    if (lastGain > baseExpected * 1.8) msgs.unshift('✨ 天才的なひらめき！大爆発！');
    else if (lastGain < baseExpected * 0.5 && lastGain > 0) msgs.unshift('😓 今日はイマイチ…');
  }

  // やる気による稽古後の元気低下
  if (cmd.stamCost > 0 && d.motivation < 30) {
    msgs.push('やる気が低い…稽古の効果が薄い。');
  }

  // 怪我中のペナルティ
  if (d.injuryLevel >= 1 && cmd.stamCost >= 20) {
    msgs.push('怪我が痛む…');
    d.stamina = clamp(d.stamina - 5, 0, d.maxStamina);
  }

  // 怪我の自然回復
  healInjury(d);

  return { ok: true, msgs };
}

// ─── 必殺技の解放チェック ─────────────────────────
function checkSpecialMoveUnlock(d, styleKey, msgs) {
  const unlocks = SPECIAL_MOVE_UNLOCKS[styleKey];
  if (!unlocks) return;
  d.unlockedMoves = d.unlockedMoves || [];
  const xp = d.styleXP[styleKey] || 0;
  for (const move of unlocks) {
    if (xp >= move.xp && !d.unlockedMoves.includes(move.id)) {
      d.unlockedMoves.push(move.id);
      msgs.unshift(`🌟 必殺技「${move.name}」を習得！`);
    }
  }
}

// ─── 怪我の回復 ──────────────────────────────────
export function healInjury(d) {
  if (d.injuryLevel === 0) return;
  const medBonus = GS.facilities.medical;
  const healRate = 0.15 + medBonus * 0.12; // Lv0:15% / Lv1:27% / Lv2:39%

  // アイテム「漢方薬」
  if (GS.activeItems['kampo']) healRate * 1.5;

  if (Math.random() < healRate) {
    d.injuryLevel = Math.max(0, d.injuryLevel - 1);
    return `${d.name}の怪我が回復した！`;
  }
  return null;
}

// ─── 場所後のスタミナ消費回復 ────────────────────
export function postBashoRecovery(d) {
  GS.trainTurnsLeft = TRAINING_TURNS_PER_BASHO;
  const base   = d.divIdx >= 4 ? 40 : 25;  // 関取のほうが体への負担大
  const medAdd = GS.facilities.medical * 8;
  const gain   = base + medAdd;
  d.stamina    = clamp(d.stamina + gain, 0, d.maxStamina);
  d.age++;

  // 年齢による衰え（32歳以上）
  if (d.age >= 32) {
    const decay = Math.floor((d.age - 30) * 1.5);
    d.power      = Math.max(60, d.power  - rRange(0, decay));
    d.tech       = Math.max(60, d.tech   - rRange(0, decay / 2));
    d.maxStamina = Math.max(40, d.maxStamina - rRange(0, decay));
  }

  // モチベーション自然回復
  d.motivation = clamp(d.motivation + rRange(5, 15), 0, 100);

  // アクティブアイテムのターン減少
  for (const key of Object.keys(GS.activeItems)) {
    GS.activeItems[key]--;
    if (GS.activeItems[key] <= 0) delete GS.activeItems[key];
  }
  // ペンディングアイテムを有効化
  for (const id of GS.pendingItems) {
    GS.activeItems[id] = 1;
  }
  GS.pendingItems = [];
}
