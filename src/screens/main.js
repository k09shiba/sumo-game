import { GS, saveGame } from '../game/state.js';
import { DIVISIONS, TRAINING_CMDS, KESHO_MAWASHI, FACILITY_DATA } from '../game/constants.js';
import { applyTraining } from '../game/training.js';
import {
  upgradeFacility, buyItem, buySpecialTraining,
  doPrestigeAction, doScoutAction, retireDisciple, getMaxDisciples,
} from '../game/facility.js';
import { rollRandomEvents } from '../game/events.js';
import { createDisciple } from '../game/disciple.js';
import { getCurrentBashoInfo } from '../game/basho.js';
import { queueModal, processModalQueue, toast } from '../render/modal.js';
import {
  refreshTrainTab, renderDiscipleList, renderFacilityTab,
  renderHistoryTab, addMsg, updateHeader,
} from '../render/ui.js';
import { initCharRenderer } from '../render/charRenderer.js';
import { showScreen } from './index.js';

let currentTab = 'train';

// ─── メイン画面描画 ──────────────────────────────
export function renderMain() {
  const el = document.getElementById('screen-main');
  el.innerHTML = `
    <div class="main-wrap">
      <!-- ヘッダー -->
      <div class="main-header">
        <span id="stable-name">${GS.stableName}</span>
        <span id="hd-info"></span>
        <button class="btn-sm btn-save" onclick="doSave()" title="セーブ">💾</button>
      </div>

      <!-- タブ -->
      <div class="tabs" id="main-tabs">
        <button class="tab active" data-tab="train">育成</button>
        <button class="tab" data-tab="list">弟子一覧</button>
        <button class="tab" data-tab="facility">施設</button>
        <button class="tab" data-tab="history">歴史</button>
      </div>

      <!-- 育成タブ -->
      <div id="tab-train" class="tab-content">
        <div class="train-layout">
          <!-- 左：キャラクター表示 -->
          <div class="char-panel">
            <div id="char-area" style="width:200px;height:300px;"></div>
            <div class="char-info">
              <div id="tr-name" class="char-name">名前</div>
              <div id="tr-rank" class="char-rank">番付</div>
              <div id="tr-cond" class="char-cond">普通</div>
            </div>
          </div>

          <!-- 右：ステータス・コマンド -->
          <div class="stat-panel">
            <div id="stat-bars"></div>
            <div id="cmd-grid" class="cmd-grid"></div>
          </div>
        </div>

        <!-- 弟子選択セレクタ -->
        <div id="disciple-selector" class="disc-selector"></div>

        <!-- 場所へのボタン -->
        <div class="basho-trigger-row">
          <div class="basho-info" id="next-basho-info"></div>
          <button class="btn btn-red btn-big" id="btn-go-basho">🏟 場所へ出場！</button>
          ${getMaxDisciples() > GS.disciples.filter(d=>!d.retired).length ?
            `<button class="btn btn-recruit" id="btn-recruit">+ 弟子を迎える</button>` : ''}
        </div>

        <!-- メッセージログ -->
        <div id="msg-log" class="msg-log"></div>
      </div>

      <!-- 弟子一覧タブ -->
      <div id="tab-list" class="tab-content hidden">
        <div id="disciple-list"></div>
      </div>

      <!-- 施設タブ -->
      <div id="tab-facility" class="tab-content hidden">
        <div id="facility-content"></div>
      </div>

      <!-- 歴史タブ -->
      <div id="tab-history" class="tab-content hidden">
        <div id="history-content"></div>
      </div>
    </div>`;

  // タブ切替
  document.querySelectorAll('.tab').forEach(btn => {
    btn.addEventListener('click', () => switchTab(btn.dataset.tab));
  });

  // 場所へ
  document.getElementById('btn-go-basho')?.addEventListener('click', goToBasho);
  document.getElementById('btn-recruit')?.addEventListener('click', () => showScreen('create'));

  // Pixi.js初期化
  const charArea = document.getElementById('char-area');
  if (charArea) initCharRenderer(charArea);

  // グローバル関数を公開
  exposeGlobals();

  // 初期レンダリング
  updateHeader();
  updateDiscipleSelector();
  refreshTrainTab();
  updateNextBashoInfo();
}

// ─── タブ切替 ────────────────────────────────────
function switchTab(tab) {
  currentTab = tab;
  document.querySelectorAll('.tab').forEach(b => b.classList.toggle('active', b.dataset.tab === tab));
  document.querySelectorAll('.tab-content').forEach(c => c.classList.add('hidden'));
  document.getElementById(`tab-${tab}`)?.classList.remove('hidden');

  switch (tab) {
    case 'train':    refreshTrainTab(); break;
    case 'list':     renderDiscipleList(document.getElementById('disciple-list')); break;
    case 'facility': renderFacilityTab(document.getElementById('facility-content')); break;
    case 'history':  renderHistoryTab(document.getElementById('history-content')); break;
  }
}

// ─── 弟子セレクタ更新 ────────────────────────────
function updateDiscipleSelector() {
  const el = document.getElementById('disciple-selector');
  if (!el) return;
  const active = GS.disciples.filter(d => !d.retired);
  if (active.length <= 1) { el.innerHTML = ''; return; }

  el.innerHTML = active.map((d, i) => {
    const realIdx = GS.disciples.indexOf(d);
    return `<button class="disc-sel-btn ${GS.focusIdx === realIdx ? 'active' : ''}"
              onclick="setFocusDisciple(${realIdx})">${d.name}</button>`;
  }).join('');
}

// ─── 次の場所情報 ────────────────────────────────
function updateNextBashoInfo() {
  const el   = document.getElementById('next-basho-info');
  if (!el) return;
  const info = getCurrentBashoInfo();
  el.textContent = `次の場所：令和${GS.year}年${GS.month}月　${info.name}（${info.place}）`;
}

// ─── 稽古実行 ────────────────────────────────────
window.handleTraining = function(cmdId) {
  const d = GS.disciples[GS.focusIdx];
  if (!d || d.retired) return;

  const result = applyTraining(d, cmdId);
  if (!result.ok) {
    toast(result.msg);
    return;
  }

  result.msgs.forEach(m => addMsg(m));

  // ランダムイベント（低確率）
  if (Math.random() < 0.12) {
    const evs = rollRandomEvents(d);
    evs.forEach(ev => {
      addMsg(`${ev.icon} ${ev.text}`, 'mge');
      queueModal({ em: ev.icon, title: ev.title, text: ev.text });
    });
  }

  saveGame();
  updateHeader();
  refreshTrainTab();
};

// ─── 弟子フォーカス変更 ──────────────────────────
window.setFocusDisciple = function(idx) {
  GS.focusIdx = idx;
  updateDiscipleSelector();
  refreshTrainTab();
};

window.setFocusAndTab = function(idx, tab) {
  GS.focusIdx = idx;
  switchTab(tab);
};

// ─── 弟子引退確認 ────────────────────────────────
window.confirmRetire = function(idx) {
  const d = GS.disciples[idx];
  if (!d || d.retired) return;

  const div = DIVISIONS[d.divIdx];
  queueModal({
    em: '🎋',
    title: `${d.name}を引退させますか？`,
    text: `最高位：${div.name}${d.pos}枚目\n通算：${d.totalWins}勝${d.totalLosses}敗\n\n本当に引退させますか？`,
    choices: [
      {
        label: '引退させる', cls: 'btn-red',
        fn: () => {
          // 引退演出
          showRetireCeremony(d, idx);
        },
      },
      { label: 'まだ現役で', fn: () => {} },
    ],
  });
};

function showRetireCeremony(d, idx) {
  const div = DIVISIONS[d.divIdx];
  let em = '🎋', title = '引退', text = `${d.name}は力士生活を終えた。\n長い間お疲れ様でした。`;

  if (d.divIdx >= 7) { em = '👑'; title = '横綱引退・断髪式'; text = `${d.name}が横綱として引退。断髪式が行われた。\n\n伝説の横綱として永遠に語り継がれるだろう。`; }
  else if (d.divIdx >= 5) { em = '✂'; title = '断髪式'; text = `${d.name}の断髪式が行われた。\n多くのファンに見守られ、現役生活に幕を閉じた。`; }
  else if (d.divIdx >= 4) { em = '✂'; title = '断髪式（関取として）'; text = `関取として活躍した${d.name}が引退。\n${d.yushoRecord?.length > 0 ? `${d.yushoRecord.length}回の優勝を誇る名力士だった。` : '誠実な相撲で多くのファンを魅了した。'}`; }

  queueModal({
    em, title, text,
    onOk: () => {
      retireDisciple(d);
      GS.focusIdx = GS.disciples.findIndex(dd => !dd.retired) || 0;
      renderMain();
    },
  });
}

// ─── 施設アップグレード ───────────────────────────
window.doUpgradeFacility = function(id) {
  const r = upgradeFacility(id);
  if (!r.ok) { toast(r.msg); return; }
  const fac = FACILITY_DATA[id];
  toast(`${fac.name}を強化しました！`);
  updateHeader();
  renderFacilityTab(document.getElementById('facility-content'));
};

window.doBuyItem = function(id) {
  const r = buyItem(id);
  if (!r.ok) { toast(r.msg); return; }
  toast(`アイテムを購入しました！`);
  updateHeader();
  renderFacilityTab(document.getElementById('facility-content'));
};

window.doBuySpecialTraining = function(id) {
  const d = GS.disciples[GS.focusIdx];
  const r = buySpecialTraining(d, id);
  if (!r.ok) { toast(r.msg); return; }
  r.msgs.forEach(m => addMsg(m, 'mge'));
  toast('特別稽古を実施しました！');
  updateHeader();
  refreshTrainTab();
};

window.doPrestigeAction = function(id) {
  const r = doPrestigeAction(id);
  if (!r.ok) { toast(r.msg); return; }
  toast('施策を実施しました！');
  updateHeader();
  renderFacilityTab(document.getElementById('facility-content'));
};

window.doScoutAction = function(id) {
  const r = doScoutAction(id);
  if (!r.ok) { toast(r.msg); return; }
  toast('スカウト施策を実施しました！');
  updateHeader();
};

window.doSave = function() {
  saveGame();
  toast('セーブしました！');
};

// ─── 場所へ ──────────────────────────────────────
function goToBasho() {
  const active = GS.disciples.filter(d => !d.retired);
  if (active.length === 0) { toast('まず弟子を迎えてください！'); return; }
  GS.phase = 'basho';
  showScreen('basho');
}

// ─── グローバル関数の公開 ────────────────────────
function exposeGlobals() {
  window.handleTraining        = window.handleTraining;
  window.setFocusDisciple      = window.setFocusDisciple;
  window.setFocusAndTab        = window.setFocusAndTab;
  window.confirmRetire         = window.confirmRetire;
  window.doUpgradeFacility     = window.doUpgradeFacility;
  window.doBuyItem             = window.doBuyItem;
  window.doBuySpecialTraining  = window.doBuySpecialTraining;
  window.doPrestigeAction      = window.doPrestigeAction;
  window.doScoutAction         = window.doScoutAction;
  window.doSave                = window.doSave;
}
