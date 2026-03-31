import { hasSaveData, loadGame } from '../game/state.js';
import { toast, queueModal, processModalQueue } from '../render/modal.js';
import { showScreen } from './index.js';

// ─── タイトル画面の描画 ───────────────────────────
export function renderTitle() {
  const el = document.getElementById('screen-title');

  const hasSave = hasSaveData();

  el.innerHTML = `
    <div class="title-wrap">
      <div class="title-deco">🏯</div>
      <h1 class="title-main">横綱への道</h1>
      <div class="title-sub">〜相撲部屋育成記〜</div>

      <div class="title-btns">
        <button class="btn btn-red btn-big" id="btn-newgame">新しい部屋を始める</button>
        ${hasSave ? `<button class="btn btn-big" id="btn-continue">続きから</button>` : ''}
      </div>

      <div class="title-desc">
        <p>弟子を育て、横綱の座を目指そう。</p>
        <p>場所ごとに成長し、番付を駆け上がれ！</p>
      </div>

      <div style="font-size:10px;color:#999;margin-top:24px;text-align:center;">
        横綱への道 v3.0　© 2025
      </div>
    </div>`;

  document.getElementById('btn-newgame')?.addEventListener('click', async () => {
    if (hasSaveData()) {
      // セーブデータがある場合は確認ダイアログ
      queueModal({
        em: '⚠',
        title: 'セーブデータを削除しますか？',
        text: '現在のセーブデータはすべて消えます。\n本当に新しくはじめますか？',
        choices: [
          {
            label: '🗑 消してはじめる', cls: 'btn-red',
            fn: async () => {
              const { resetGame } = await import('../game/state.js');
              resetGame();
              await showScreen('create');
            },
          },
          { label: 'キャンセル', fn: () => {} },
        ],
      });
      processModalQueue();
    } else {
      const { resetGame } = await import('../game/state.js');
      resetGame();
      await showScreen('create');
    }
  });

  document.getElementById('btn-continue')?.addEventListener('click', async () => {
    const ok = loadGame();
    if (ok === true) {
      await showScreen('main');
    } else {
      toast('セーブデータの読み込みに失敗しました。');
    }
  });
}
