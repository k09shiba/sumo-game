import { GS, saveGame, addHistory } from '../game/state.js';
import { BODY_TYPES, SUMO_STYLES, PERSONALITIES, SKIN_TONES, FACE_TYPES } from '../game/constants.js';
import { createDisciple, createRival, randomName } from '../game/disciple.js';
import { getMaxDisciples } from '../game/facility.js';
import { renderCharacter, initCharRenderer } from '../render/charRenderer.js';
import { toast } from '../render/modal.js';
import { showScreen } from './index.js';

let previewD = null;

// ─── 作成画面の描画 ──────────────────────────────
export function renderCreate() {
  const el = document.getElementById('screen-create');
  el.innerHTML = `
    <div class="create-wrap">
      <h2 class="screen-title">弟子を迎える</h2>

      ${GS.disciples.length === 0 ? `
        <div class="input-row">
          <label>部屋名</label>
          <input type="text" id="inp-stable" value="${GS.stableName}" maxlength="12" placeholder="部屋名を入力">
        </div>` : ''}

      <div class="input-row">
        <label>しこ名</label>
        <div style="display:flex;gap:6px;align-items:center;">
          <input type="text" id="inp-name" value="${randomName()}" maxlength="12" placeholder="しこ名">
          <button class="btn-sm" id="btn-reroll">🔀 変更</button>
        </div>
      </div>

      <div class="input-row">
        <label>体型</label>
        <div class="radio-group" id="sel-bodytype">
          ${BODY_TYPES.map(bt => `
            <label class="radio-card">
              <input type="radio" name="bodytype" value="${bt.id}" ${bt.id === 'anko' ? 'checked' : ''}>
              <span class="rc-name">${bt.name}</span>
              <span class="rc-desc">${bt.desc}</span>
            </label>`).join('')}
        </div>
      </div>

      <div class="input-row">
        <label>得意スタイル</label>
        <div class="radio-group" id="sel-style">
          ${SUMO_STYLES.map(ss => `
            <label class="radio-card">
              <input type="radio" name="style" value="${ss.id}" ${ss.id === 'oshi' ? 'checked' : ''}>
              <span class="rc-name">${ss.name}</span>
              <span class="rc-desc">${ss.desc}</span>
            </label>`).join('')}
        </div>
      </div>

      <div class="input-row">
        <label>性格</label>
        <div class="radio-group" id="sel-personality">
          ${PERSONALITIES.map(p => `
            <label class="radio-card">
              <input type="radio" name="personality" value="${p.id}" ${p.id === 'earnest' ? 'checked' : ''}>
              <span class="rc-name">${p.icon} ${p.name}</span>
              <span class="rc-desc">${p.desc}</span>
            </label>`).join('')}
        </div>
      </div>

      <div class="input-row">
        <label>肌の色</label>
        <div class="skin-tone-group" id="sel-skintone">
          ${SKIN_TONES.map(st => `
            <label class="skin-radio">
              <input type="radio" name="skintone" value="${st.id}" ${st.id === 'fair' ? 'checked' : ''}>
              <span class="skin-swatch" style="background:${st.css}"></span>
              <span class="skin-name">${st.name}</span>
            </label>`).join('')}
        </div>
      </div>

      <div class="input-row">
        <label>顔の形</label>
        <div class="radio-group" id="sel-facetype">
          ${FACE_TYPES.map(ft => `
            <label class="radio-card">
              <input type="radio" name="facetype" value="${ft.id}" ${ft.id === 'round' ? 'checked' : ''}>
              <span class="rc-name">${ft.name}</span>
              <span class="rc-desc">${ft.desc}</span>
            </label>`).join('')}
        </div>
      </div>

      <!-- プレビュー -->
      <div class="preview-section">
        <div id="preview-char" style="width:200px;height:300px;margin:0 auto;"></div>
        <div id="preview-stats" class="preview-stats"></div>
      </div>

      <div style="display:flex;gap:8px;justify-content:center;margin-top:12px;">
        <button class="btn" id="btn-preview">プレビュー更新</button>
        <button class="btn btn-red" id="btn-create">この力士を迎える！</button>
      </div>
      <button class="btn btn-back" id="btn-back-create">← 戻る</button>
    </div>`;

  // イベント
  document.getElementById('btn-reroll').onclick = () => {
    document.getElementById('inp-name').value = randomName();
    updatePreview();
  };
  document.getElementById('btn-preview').onclick = updatePreview;
  document.getElementById('btn-create').onclick  = doCreate;
  document.getElementById('btn-back-create').onclick = () => showScreen('title');

  // ラジオ変更時にプレビュー更新
  document.querySelectorAll('input[name="bodytype"], input[name="style"], input[name="personality"], input[name="skintone"], input[name="facetype"]').forEach(el => {
    el.addEventListener('change', updatePreview);
  });

  // 初回プレビュー
  initCharRenderer(document.getElementById('preview-char'));
  updatePreview();
}

// ─── プレビュー更新 ──────────────────────────────
function updatePreview() {
  const name        = document.getElementById('inp-name')?.value || randomName();
  const bodyType    = document.querySelector('input[name="bodytype"]:checked')?.value || 'anko';
  const style       = document.querySelector('input[name="style"]:checked')?.value    || 'oshi';
  const personality = document.querySelector('input[name="personality"]:checked')?.value || 'earnest';
  const skinTone    = document.querySelector('input[name="skintone"]:checked')?.value  || 'fair';
  const faceType    = document.querySelector('input[name="facetype"]:checked')?.value  || 'round';

  previewD = createDisciple({ name, bodyType, sumoStyle: style, personality, skinTone, faceType, quality: 2 });
  renderCharacter(previewD);

  const statsEl = document.getElementById('preview-stats');
  if (statsEl) {
    statsEl.innerHTML = `
      <div class="pv-row"><span>筋力</span><b>${previewD.power}</b></div>
      <div class="pv-row"><span>技術</span><b>${previewD.tech}</b></div>
      <div class="pv-row"><span>精神</span><b>${previewD.spirit}</b></div>
      <div class="pv-row"><span>体重</span><b>${previewD.weight}kg</b></div>
      <div class="pv-row"><span>才能</span><b>${previewD.talent}</b></div>`;
  }
}

// ─── 弟子を作成する ──────────────────────────────
function doCreate() {
  const name        = document.getElementById('inp-name')?.value.trim();
  const bodyType    = document.querySelector('input[name="bodytype"]:checked')?.value || 'anko';
  const style       = document.querySelector('input[name="style"]:checked')?.value    || 'oshi';
  const personality = document.querySelector('input[name="personality"]:checked')?.value || 'earnest';
  const skinTone    = document.querySelector('input[name="skintone"]:checked')?.value  || 'fair';
  const faceType    = document.querySelector('input[name="facetype"]:checked')?.value  || 'round';
  const stable      = document.getElementById('inp-stable')?.value.trim();

  if (!name) { toast('しこ名を入力してください！'); return; }

  const maxD = getMaxDisciples();
  const actD = GS.disciples.filter(d => !d.retired).length;
  if (actD >= maxD) { toast(`弟子の上限（${maxD}人）に達しています。`); return; }

  // 部屋名（初回のみ）
  if (GS.disciples.length === 0 && stable) {
    GS.stableName = stable;
  }

  const d = createDisciple({ name, bodyType, sumoStyle: style, personality, skinTone, faceType });
  GS.disciples.push(d);

  // ライバル生成（初回のみ）
  if (!GS.rival) {
    GS.rival = createRival(d);
  }

  GS.focusIdx = GS.disciples.indexOf(d);
  addHistory({ icon: '🌱', text: `${d.name}が入門！` });
  saveGame();

  toast(`${d.name}が入門しました！`);
  showScreen('main');
}
