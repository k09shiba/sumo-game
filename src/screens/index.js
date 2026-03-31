// ─── スクリーン切替の共通処理 ───────────────────
const SCREENS = ['title', 'create', 'main', 'basho', 'results'];

// 循環参照を避けるため遅延インポートを使用
export async function showScreen(name) {
  SCREENS.forEach(s => {
    const el = document.getElementById(`screen-${s}`);
    if (el) el.classList.toggle('hidden', s !== name);
  });

  switch (name) {
    case 'title': {
      const { renderTitle } = await import('./title.js');
      renderTitle();
      break;
    }
    case 'create': {
      const { renderCreate } = await import('./create.js');
      renderCreate();
      break;
    }
    case 'main': {
      const { renderMain } = await import('./main.js');
      renderMain();
      break;
    }
    case 'basho': {
      const { renderBasho } = await import('./basho.js');
      renderBasho();
      break;
    }
    case 'results': {
      const { renderResults } = await import('./results.js');
      renderResults();
      break;
    }
  }
}
