import { FACILITY_DATA } from './constants.js';

const SAVE_KEY_V3 = 'sumo_beya_v3';
const SAVE_KEY_V2 = 'sumo_beya_v2';

// ─── デフォルト状態 ───────────────────────────────
function defaultState() {
  return {
    version:      3,
    ryo:          300,        // 所持金（両）
    month:        1,          // 現在の月（1,3,5,7,9,11）
    year:         7,          // 令和年
    bashoCount:   0,          // 累計場所数
    disciples:    [],         // Disciple[]
    focusIdx:     0,          // 育成タブのフォーカス弟子
    stableName:   '新部屋',   // 部屋名
    facilities: {
      dojo:    0,
      kitchen: 0,
      medical: 0,
      scout:   0,
    },
    incomeBonus:  0,          // 永続収入ボーナス（両/場所）
    scoutBonus:   0,          // スカウト素質ボーナス
    rival:        null,       // ライバル力士オブジェクト
    history:      [],         // HistoryEntry[]
    activeItems:  {},         // {itemId: remainingBasho}
    pendingItems: [],         // 次場所から有効なアイテム
    sponsors:       [],        // スポンサー一覧
    trainTurnsLeft: 10,        // 稽古残り回数
    tutorialDone: false,
    phase:        'title',    // 'title'|'create'|'main'|'basho'|'results'
    currentBashoResults: null,// 直近場所の結果
    bashoPhase:   null,       // 場所中の進行状態
  };
}

// ─── グローバル状態 ───────────────────────────────
export let GS = defaultState();

// ─── セーブ ───────────────────────────────────────
export function saveGame() {
  try {
    localStorage.setItem(SAVE_KEY_V3, JSON.stringify(GS));
  } catch(e) {
    console.error('Save failed:', e);
  }
}

// ─── ロード ───────────────────────────────────────
export function loadGame() {
  // v3 データチェック
  const raw3 = localStorage.getItem(SAVE_KEY_V3);
  if (raw3) {
    try {
      const data = JSON.parse(raw3);
      GS = migrateV3(data);
      return true;
    } catch(e) {
      console.error('Load v3 failed:', e);
    }
  }

  // v2 データチェック
  const raw2 = localStorage.getItem(SAVE_KEY_V2);
  if (raw2) {
    return 'v2_found'; // 呼び出し元で移行案内
  }

  return false;
}

// ─── v3 マイグレーション（フィールド追加補完） ────
function migrateV3(data) {
  const def = defaultState();
  const gs = { ...def, ...data };

  // disciples の各フィールド補完
  if (gs.disciples) {
    gs.disciples = gs.disciples.map(d => ({
      ...newDiscipleDefaults(),
      ...d,
    }));
  }

  // facilities のキー補完
  gs.facilities = { ...def.facilities, ...gs.facilities };

  return gs;
}

function newDiscipleDefaults() {
  return {
    id:              '',
    name:            '新弟子',
    nameHistory:     [],
    age:             18,
    weight:          100,
    bodyType:        'anko',
    sumoStyle:       'oshi',
    power:           100,
    tech:            100,
    spirit:          100,
    maxStamina:      100,
    stamina:         100,
    motivation:      80,
    conditionIdx:    2, // 0=絶不調〜4=絶好調
    divIdx:          0,
    pos:             30,
    wins:            0,
    losses:          0,
    totalWins:       0,
    totalLosses:     0,
    injuryLevel:     0,  // 0=なし 1=軽傷 2=重傷
    retired:         false,
    promotedJuryo:   false,
    promotedMakunouchi: false,
    promotedOzeki:   false,
    promotedYokozuna: false,
    bashoResults:    [],
    lastTwoBashoWins: [],
    yushoRecord:     [],
    sanshoRecord:    [],
    keshoMawashi:    null,
    ozekiFallback:   0,
    yokozunaWarning: 0,
    talent:          80,
    optimalWeight:   120,
    styleXP:         { oshi: 0, yotsu: 0, tech: 0, heavy: 0 },
    personality:     'earnest', // 性格特性
  };
}

// ─── リセット ─────────────────────────────────────
export function resetGame() {
  GS = defaultState();
  localStorage.removeItem(SAVE_KEY_V3);
}

// ─── セーブデータ存在チェック ─────────────────────
export function hasSaveData() {
  return !!localStorage.getItem(SAVE_KEY_V3);
}

export function hasV2Data() {
  return !!localStorage.getItem(SAVE_KEY_V2);
}

// ─── 歴史ログ追加 ────────────────────────────────
export function addHistory(entry) {
  GS.history.push({
    ...entry,
    date: `令和${GS.year}年${GS.month}月`,
  });
}
