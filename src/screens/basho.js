import { GS, saveGame } from '../game/state.js';
import {
  DIVISIONS, BASHO_NAMES, CONDITIONS, DRAMA_EVENTS,
  rRange,
} from '../game/constants.js';
import { simulateAllMatches, getCurrentBashoInfo, startBasho } from '../game/basho.js';
import { renderCharacter } from '../render/charRenderer.js';
import { initCharRenderer } from '../render/charRenderer.js';
import { queueModal, toast } from '../render/modal.js';
import { showScreen } from './index.js';

let bashoInfo  = null;
let allResults = null; // 全弟子の取組結果

// ─── 場所画面描画 ────────────────────────────────
export function renderBasho() {
  bashoInfo  = getCurrentBashoInfo();
  startBasho(); // 場所前処理（コンディション確定など）

  const el = document.getElementById('screen-basho');
  el.innerHTML = `
    <div class="basho-wrap">
      <div class="basho-header">
        <h2>令和${GS.year}年${GS.month}月　${bashoInfo.name}</h2>
        <div class="basho-place">${bashoInfo.place}</div>
        <button class="btn-sm btn-save" onclick="doSave()">💾</button>
      </div>

      <!-- 力士の出場確認 -->
      <div class="basho-lineup" id="basho-lineup"></div>

      <!-- 取組開始 -->
      <div class="basho-start-row">
        <button class="btn btn-red btn-big" id="btn-start-basho">🥁 取組開始！</button>
        <button class="btn btn-back" onclick="cancelBasho()">← 戻る</button>
      </div>
    </div>`;

  renderLineup();
  document.getElementById('btn-start-basho')?.addEventListener('click', doBasho);
  window.doSave = () => { saveGame(); toast('セーブしました！'); };
  window.cancelBasho = () => { GS.phase = 'main'; showScreen('main'); };
}

// ─── 出場力士一覧 ────────────────────────────────
function renderLineup() {
  const el = document.getElementById('basho-lineup');
  if (!el) return;

  const active = GS.disciples.filter(d => !d.retired);
  el.innerHTML = `<h3 class="section-title">出場力士</h3>`;
  el.innerHTML += active.map(d => {
    const div  = DIVISIONS[d.divIdx];
    const cond = CONDITIONS[d.conditionIdx ?? 2];
    return `
      <div class="lineup-card">
        <div class="lc-name">${d.name}</div>
        <div class="lc-rank">${div.name}${d.pos}枚目（${div.matches}番）</div>
        <div class="lc-cond" style="color:${cond.color}">体調：${cond.label}</div>
        ${d.injuryLevel >= 1 ? `<div class="lc-inj">🤕 ${d.injuryPart ? d.injuryPart + 'の' : ''}${d.injuryLevel >= 2 ? '重傷' : '軽傷'}あり</div>` : ''}
      </div>`;
  }).join('');

  // ライバル情報
  if (GS.rival) {
    const r   = GS.rival;
    const div = DIVISIONS[r.divIdx];
    el.innerHTML += `
      <div class="rival-info">
        ⚔ ライバル：${r.name}（${div.name}${r.pos}枚目）が同じ場所に出場中
      </div>`;
  }
}

// ─── 場所シミュレーション ─────────────────────────
async function doBasho() {
  const btn = document.getElementById('btn-start-basho');
  if (btn) btn.disabled = true;

  // 全力士の全取組を計算
  allResults = {};
  for (const d of GS.disciples) {
    if (d.retired) continue;
    allResults[d.id] = simulateAllMatches(d);
  }

  // 結果画面へ
  GS.phase = 'results';
  GS.currentBashoResults = allResults;
  saveGame();
  showBashoSummary();
}

// ─── 場所中の取組経過表示 ────────────────────────
function showBashoSummary() {
  // 最初の力士の取組を一覧表示してから結果画面へ
  const d = GS.disciples.find(d => !d.retired);
  if (!d) { showScreen('results'); return; }

  const results = allResults[d.id] || [];
  const el = document.getElementById('screen-basho');

  el.innerHTML = `
    <div class="basho-wrap">
      <div class="basho-header">
        <h2>${bashoInfo.name}　${d.name}の取組</h2>
      </div>

      <!-- キャラクター -->
      <div id="basho-char" style="width:200px;height:300px;margin:0 auto 12px;"></div>

      <!-- 取組結果 -->
      <div class="match-list" id="match-list">
        ${results.map(r => `
          <div class="match-row ${r.won ? 'win' : 'loss'}">
            <div class="match-row-top">
              <span class="match-day">${r.day}日目</span>
              <span class="match-result">${r.won ? '○勝' : '●負'}</span>
              <span class="match-score">${r.cumWins}勝${r.cumLosses}敗</span>
            </div>
            <div class="match-commentary">${r.commentary || r.waza}</div>
          </div>`).join('')}
      </div>

      <div class="basho-final">
        <strong>${d.name}：${d.wins}勝${d.losses}敗</strong>
        ${d.wins > d.losses ? '🎉 勝ち越し！' : d.wins === d.losses ? '五分' : '😔 負け越し...'}
      </div>

      <button class="btn btn-red btn-big" id="btn-to-results">結果発表へ →</button>
    </div>`;

  initCharRenderer(document.getElementById('basho-char'));
  renderCharacter(d);

  document.getElementById('btn-to-results')?.addEventListener('click', () => showScreen('results'));
}
