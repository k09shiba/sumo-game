// ─── エントリーポイント ──────────────────────────
import './style.css';
import { GS, loadGame, hasSaveData } from './game/state.js';
import { showScreen } from './screens/index.js';

// ─── アプリ起動 ───────────────────────────────────
async function init() {
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
