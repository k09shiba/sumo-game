// ─── モーダルシステム ────────────────────────────
let modalQ   = [];
let modalActive = false;

// ─── モーダルをキューに積む ───────────────────────
export function queueModal(cfg) {
  modalQ.push(cfg);
  if (!modalActive) processModalQueue();
}

// ─── キューを処理する ────────────────────────────
export function processModalQueue() {
  if (modalQ.length === 0) {
    modalActive = false;
    return;
  }
  modalActive = true;
  const cfg = modalQ.shift();
  _showModal(cfg);
}

// ─── 直接モーダルを開く（キューを経由しない） ────
export function showModal(cfg) {
  _showModal(cfg);
}

// ─── モーダルを閉じる ────────────────────────────
export function closeModal() {
  document.getElementById('modal-overlay').classList.add('hidden');
  modalActive = false;
}

// ─── 内部：モーダル表示 ──────────────────────────
function _showModal(cfg) {
  const overlay = document.getElementById('modal-overlay');
  const em      = document.getElementById('modal-em');
  const title   = document.getElementById('modal-title');
  const text    = document.getElementById('modal-text');
  const input   = document.getElementById('modal-input-area');
  const choices = document.getElementById('modal-choices');

  em.textContent    = cfg.em    || '';
  title.textContent = cfg.title || '';
  text.textContent  = cfg.text  || '';
  input.innerHTML   = '';
  choices.innerHTML = '';

  // インプット型
  if (cfg.type === 'input') {
    const inp = document.createElement('input');
    inp.type        = 'text';
    inp.className   = 'modal-input';
    inp.value       = cfg.defaultValue || '';
    inp.maxLength   = cfg.maxLength || 12;
    input.appendChild(inp);

    const btn = document.createElement('button');
    btn.className   = 'btn btn-red';
    btn.textContent = cfg.okLabel || '決定';
    btn.onclick = () => {
      const val = inp.value.trim();
      if (!val) { inp.focus(); return; }
      closeModal();
      cfg.onOk?.(val);
      processModalQueue();
    };
    choices.appendChild(btn);

    if (cfg.skipLabel) {
      const skip = document.createElement('button');
      skip.className   = 'btn';
      skip.textContent = cfg.skipLabel;
      skip.onclick = () => {
        closeModal();
        cfg.onSkip?.();
        processModalQueue();
      };
      choices.appendChild(skip);
    }
  }
  // 選択肢型（choicesに配列）
  else if (cfg.choices && cfg.choices.length > 0) {
    for (const c of cfg.choices) {
      const btn = document.createElement('button');
      btn.className   = `btn ${c.cls || ''}`;
      btn.textContent = c.label;
      btn.onclick = () => {
        closeModal();
        (c.fn || c.cb)?.();
        if (c.noQueue !== true) processModalQueue();
      };
      choices.appendChild(btn);
    }
  }
  // 確認型（OK のみ）
  else {
    const btn = document.createElement('button');
    btn.className   = 'btn btn-red';
    btn.textContent = cfg.okLabel || 'OK';
    btn.onclick = () => {
      closeModal();
      cfg.onOk?.();
      processModalQueue();
    };
    choices.appendChild(btn);
  }

  overlay.classList.remove('hidden');

  // フォーカス
  const firstInput = input.querySelector('input');
  if (firstInput) setTimeout(() => firstInput.focus(), 50);
}

// ─── 確認ダイアログ（Promise版） ─────────────────
export function confirm(title, text) {
  return new Promise(resolve => {
    queueModal({
      em: '❓', title, text,
      choices: [
        { label: 'はい',    fn: () => resolve(true)  },
        { label: 'いいえ',  fn: () => resolve(false) },
      ],
    });
  });
}

// ─── トースト通知 ─────────────────────────────────
export function toast(msg, duration = 1800) {
  const el = document.getElementById('toast');
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(el._t);
  el._t = setTimeout(() => el.classList.remove('show'), duration);
}
