import {
  TRAINING_CMDS, CONDITIONS,
  rRange, clamp,
} from './constants.js';
import { calcOptimalWeight, weightStatus } from './disciple.js';
import { GS } from './state.js';

// ─── 稽古実行 ────────────────────────────────────
export function applyTraining(d, cmdId) {
  const cmd = TRAINING_CMDS.find(c => c.id === cmdId);
  if (!cmd) return { ok: false, msg: '不明なコマンドです' };

  // スタミナチェック
  if (d.stamina < cmd.stamCost) {
    return { ok: false, msg: `スタミナが足りない！（必要:${cmd.stamCost}）` };
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
      const gain = Math.round(rRange(8, 16) * dojoBonus * talentFactor);
      d.power = clamp(d.power + gain, 0, statCap);
      d.styleXP.oshi = (d.styleXP.oshi || 0) + 10;
      if (d.styleXP.oshi > 80 && d.sumoStyle !== 'oshi') {
        d.sumoStyle = 'oshi';
        msgs.push('押し相撲が身についた！');
      }
      msgs.push(`筋力 +${gain}`);
      break;
    }
    case 'yotsu': {
      const gain = Math.round(rRange(8, 16) * dojoBonus * talentFactor);
      d.tech = clamp(d.tech + gain, 0, statCap);
      d.styleXP.yotsu = (d.styleXP.yotsu || 0) + 10;
      if (d.styleXP.yotsu > 80 && d.sumoStyle !== 'yotsu') {
        d.sumoStyle = 'yotsu';
        msgs.push('四つ相撲が身についた！');
      }
      msgs.push(`技術 +${gain}`);
      break;
    }
    case 'nage': {
      const gain = Math.round(rRange(5, 11) * dojoBonus * talentFactor);
      d.tech = clamp(d.tech + gain, 0, statCap);
      d.styleXP.tech = (d.styleXP.tech || 0) + 8;
      const wLoss = rRange(1, 2);
      d.weight = clamp(d.weight - wLoss, 60, 250);
      msgs.push(`技術 +${gain}、体重 -${wLoss}kg`);
      break;
    }
    case 'run': {
      const gain = Math.round(rRange(5, 14) * dojoBonus);
      d.maxStamina = clamp(d.maxStamina + gain, 0, 200);
      d.weight = clamp(d.weight - 1, 60, 250);
      msgs.push(`体力上限 +${gain}、体重 -1kg`);
      break;
    }
    case 'mental': {
      const sGain = Math.round(rRange(8, 16) * dojoBonus * talentFactor);
      const mGain = rRange(5, 12);
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
      const gain = Math.round(rRange(3, 6) * lv * talentFactor);
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
      d.stamina = d.maxStamina;
      const mGain = rRange(10, 18);
      d.motivation = clamp(d.motivation + mGain, 0, 100);
      msgs.push(`スタミナ全回復！やる気 +${mGain}`);
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
