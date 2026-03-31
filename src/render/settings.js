import { GS, saveGame, resetGame } from '../game/state.js';
import { queueModal, processModalQueue, toast } from './modal.js';
import { showScreen } from '../screens/index.js';

// ─── 設定パネルを開く ────────────────────────────
export function openSettings() {
  const overlay = document.getElementById('settings-overlay');
  const content = document.getElementById('settings-content');
  if (!overlay || !content) return;

  const fontSize = localStorage.getItem('sumo_fontsize') || 'medium';
  const sponsors = GS.sponsors || [];

  content.innerHTML = `
    <div class="settings-header">
      <span class="settings-title">⚙ 設定・メニュー</span>
      <button class="settings-close" id="btn-settings-close">✕</button>
    </div>

    <div class="settings-section">
      <div class="settings-label">ゲーム管理</div>
      <button class="settings-btn btn-warn" id="btn-to-title">🏯 タイトルへ戻る</button>
      <button class="settings-btn btn-danger" id="btn-reset-data">🗑 セーブデータを削除</button>
    </div>

    <div class="settings-section">
      <div class="settings-label">表示設定</div>
      <div class="settings-row">
        <span>文字サイズ</span>
        <div class="font-size-btns">
          <button class="fs-btn ${fontSize==='small'?'active':''}" data-size="small">小</button>
          <button class="fs-btn ${fontSize==='medium'?'active':''}" data-size="medium">中</button>
          <button class="fs-btn ${fontSize==='large'?'active':''}" data-size="large">大</button>
        </div>
      </div>
    </div>

    <div class="settings-section">
      <div class="settings-label">セーブ情報</div>
      <div class="settings-info">
        <div>部屋名：${GS.stableName || '未設定'}</div>
        <div>所持金：${GS.ryo || 0}両</div>
        <div>場所数：${GS.bashoCount || 0}場所</div>
        <div>弟子数：${(GS.disciples||[]).filter(d=>!d.retired).length}人（引退：${(GS.disciples||[]).filter(d=>d.retired).length}人）</div>
        ${sponsors.length>0 ? `<div>スポンサー：${sponsors.map(s=>s.name).join('・')}</div>` : ''}
      </div>
    </div>

    <div class="settings-section">
      <div class="settings-label">ゲームについて</div>
      <div class="settings-info rules-text">
        <b>横綱への道 v3.0</b><br>
        弟子を育て、序ノ口から横綱を目指す相撲部屋育成ゲーム。<br><br>
        <b>稽古フェーズ</b>：1場所あたり10回の稽古コマンドを使える。スタミナを消費する稽古で能力を上げ、場所に備えよう。<br><br>
        <b>場所</b>：幕下以下は7番制（4勝3敗で勝ち越し）、十両以上は15番制（8勝7敗で勝ち越し）。勝ち越しで番付が上がる。<br><br>
        <b>大関</b>：2場所連続負け越しで陥落。<b>横綱</b>：3場所連続負け越しで引退勧告。<br><br>
        <b>両（資金）</b>：場所収入でスポンサーを獲得し、施設を強化しよう。
      </div>
    </div>
  `;

  overlay.classList.remove('hidden');

  // イベント
  document.getElementById('btn-settings-close').onclick = closeSettings;
  overlay.onclick = (e) => { if (e.target === overlay) closeSettings(); };

  document.getElementById('btn-to-title').onclick = () => {
    closeSettings();
    queueModal({
      em: '🏯',
      title: 'タイトルへ戻りますか？',
      text: '現在の進行状況はセーブされます。\nタイトル画面へ戻りますか？',
      choices: [
        {
          label: 'タイトルへ',
          fn: () => {
            saveGame();
            GS.phase = 'title';
            showScreen('title');
          },
        },
        { label: 'キャンセル', fn: () => {} },
      ],
    });
    processModalQueue();
  };

  document.getElementById('btn-reset-data').onclick = () => {
    closeSettings();
    queueModal({
      em: '⚠',
      title: 'セーブデータを削除しますか？',
      text: 'すべてのデータが消えます。\n本当に削除しますか？',
      choices: [
        {
          label: '🗑 本当に削除する', cls: 'btn-red',
          fn: () => {
            queueModal({
              em: '⚠',
              title: '最終確認',
              text: 'この操作は取り消せません。\n本当に削除しますか？',
              choices: [
                {
                  label: '削除する', cls: 'btn-red',
                  fn: () => {
                    resetGame();
                    showScreen('title');
                    toast('セーブデータを削除しました。');
                  },
                },
                { label: 'キャンセル', fn: () => {} },
              ],
            });
            processModalQueue();
          },
        },
        { label: 'キャンセル', fn: () => {} },
      ],
    });
    processModalQueue();
  };

  // 文字サイズ
  document.querySelectorAll('.fs-btn').forEach(btn => {
    btn.onclick = () => {
      const size = btn.dataset.size;
      localStorage.setItem('sumo_fontsize', size);
      applyFontSize(size);
      document.querySelectorAll('.fs-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      toast(`文字サイズを「${{'small':'小','medium':'中','large':'大'}[size]}」に変更しました`);
    };
  });
}

// ─── 設定パネルを閉じる ──────────────────────────
export function closeSettings() {
  document.getElementById('settings-overlay')?.classList.add('hidden');
}

// ─── 文字サイズ適用 ──────────────────────────────
export function applyFontSize(size) {
  const root = document.documentElement;
  const map = { small: '13px', medium: '15px', large: '17px' };
  root.style.setProperty('--base-font-size', map[size] || '15px');
}

// ─── 起動時に文字サイズ適用 ──────────────────────
export function initSettings() {
  const saved = localStorage.getItem('sumo_fontsize') || 'medium';
  applyFontSize(saved);
}
