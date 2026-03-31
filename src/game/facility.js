import {
  FACILITY_DATA, MAX_DISCIPLES_BY_SCOUT,
  SPECIAL_TRAINING, ITEMS, PRESTIGE_ACTIONS, SCOUT_ACTIONS,
  DIV_MAKUNOUCHI,
} from './constants.js';
import { GS, saveGame, addHistory } from './state.js';

// ─── 施設アップグレード ───────────────────────────
export function upgradeFacility(id) {
  const fac  = FACILITY_DATA[id];
  if (!fac) return { ok: false, msg: '不明な施設' };

  const curLv = GS.facilities[id] ?? 0;
  if (curLv >= fac.levels.length - 1) return { ok: false, msg: 'すでに最大レベル' };

  const nextLv  = curLv + 1;
  const cost    = fac.levels[nextLv].cost;

  if (GS.ryo < cost) return { ok: false, msg: `両が足りない（必要：${cost}両）` };

  GS.ryo -= cost;
  GS.facilities[id] = nextLv;
  addHistory({ icon: fac.icon, text: `${fac.name}を「${fac.levels[nextLv].label}」に強化！` });
  saveGame();
  return { ok: true, newLevel: nextLv };
}

// ─── 弟子の最大人数 ──────────────────────────────
export function getMaxDisciples() {
  return MAX_DISCIPLES_BY_SCOUT[GS.facilities.scout ?? 0] ?? 3;
}

// ─── 特別稽古の実行 ──────────────────────────────
export function buySpecialTraining(d, trainingId) {
  const tr = SPECIAL_TRAINING.find(t => t.id === trainingId);
  if (!tr) return { ok: false, msg: '不明な稽古' };
  if (GS.ryo < tr.cost) return { ok: false, msg: `両が足りない（必要：${tr.cost}両）` };

  // 条件チェック
  if (tr.req?.minDiv !== undefined && d.divIdx < tr.req.minDiv) {
    return { ok: false, msg: `この稽古は幕内以上が対象です` };
  }

  GS.ryo -= tr.cost;
  const effects = tr.apply(d);
  const msgs = [];

  for (const [key, val] of Object.entries(effects)) {
    switch(key) {
      case 'power':       d.power       = Math.min(999, d.power       + val); msgs.push(`筋力+${val}`); break;
      case 'tech':        d.tech        = Math.min(999, d.tech        + val); msgs.push(`技術+${val}`); break;
      case 'spirit':      d.spirit      = Math.min(999, d.spirit      + val); msgs.push(`精神+${val}`); break;
      case 'motivation':  d.motivation  = Math.min(100, d.motivation  + val); msgs.push(`やる気+${val}`); break;
      case 'stamRestore': d.stamina     = d.maxStamina;                        msgs.push(`スタミナ全回復`); break;
    }
  }

  saveGame();
  return { ok: true, msgs };
}

// ─── アイテム購入 ────────────────────────────────
export function buyItem(itemId) {
  const item = ITEMS.find(i => i.id === itemId);
  if (!item) return { ok: false, msg: '不明なアイテム' };
  if (GS.ryo < item.cost) return { ok: false, msg: `両が足りない（必要：${item.cost}両）` };

  GS.ryo -= item.cost;
  GS.pendingItems.push(item.id);
  saveGame();
  return { ok: true };
}

// ─── 名声施策 ────────────────────────────────────
export function doPrestigeAction(actionId) {
  const action = PRESTIGE_ACTIONS.find(a => a.id === actionId);
  if (!action) return { ok: false, msg: '不明な施策' };
  if (GS.ryo < action.cost) return { ok: false, msg: `両が足りない（必要：${action.cost}両）` };

  GS.ryo -= action.cost;
  if (action.incomeBonus) GS.incomeBonus += action.incomeBonus;
  if (action.scoutBonus)  GS.scoutBonus  += action.scoutBonus;

  addHistory({ icon: action.icon, text: `${action.name}を実施！` });
  saveGame();
  return { ok: true };
}

// ─── スカウト施策 ────────────────────────────────
export function doScoutAction(actionId) {
  const action = SCOUT_ACTIONS.find(a => a.id === actionId);
  if (!action) return { ok: false, msg: '不明な施策' };
  if (GS.ryo < action.cost) return { ok: false, msg: `両が足りない（必要：${action.cost}両）` };

  GS.ryo -= action.cost;
  if (actionId === 'haken') {
    GS.scoutBonus = (GS.scoutBonus || 0) + 1;
  } else if (actionId === 'sainou') {
    // 弟子の才能上限を少し引き上げ
    for (const d of GS.disciples) {
      if (!d.retired) d.talent = Math.min(100, d.talent + 5);
    }
  }
  saveGame();
  return { ok: true };
}

// ─── 毎場所収入 ──────────────────────────────────
export function collectBashoIncome(income) {
  GS.ryo += income;
  saveGame();
}

// ─── 弟子引退処理 ────────────────────────────────
export function retireDisciple(d) {
  d.retired   = true;
  const maxDiv = ['序ノ口','序二段','三段目','幕下','十両','幕内','大関','横綱'];
  const maxRank = maxDiv[d.divIdx] || '序ノ口';
  addHistory({
    icon: '🎋',
    text: `${d.name} 引退（最高位：${maxRank}、通算：${d.totalWins}勝${d.totalLosses}敗）`,
  });
  saveGame();
}
