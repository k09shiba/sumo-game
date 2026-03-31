// ─── エントリーポイント ──────────────────────────
import './style.css';
import { GS, loadGame, hasSaveData } from './game/state.js';
import { showScreen } from './screens/index.js';
import { initSettings } from './render/settings.js';

// ─── アプリ起動 ───────────────────────────────────
async function init() {
  initSettings();

  // セーブデータのチェック
  const hasSave = hasSaveData();

  if (hasSave) {
    const ok = loadGame();
    if (ok === true && GS.phase && GS.phase !== 'title') {
      // 中断された画面から再開
      showScreen(GS.phase === 'basho' ? 'main' : GS.phase);
      return;
    }
  }

  // タイトル画面から開始
  showScreen('title');
}

// DOM読み込み後に起動
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
