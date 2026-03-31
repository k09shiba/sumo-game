import { GS } from '../game/state.js';
import {
  DIVISIONS, CONDITIONS, BODY_TYPES, SUMO_STYLES, PERSONALITIES, KESHO_MAWASHI,
  TRAINING_CMDS, FACILITY_DATA,
  SPECIAL_TRAINING, ITEMS, PRESTIGE_ACTIONS, SCOUT_ACTIONS, SPONSORS,
} from '../game/constants.js';
import { rankLabel, weightStatus } from '../game/disciple.js';
import { renderCharacter, animateBounce } from './charRenderer.js';
import { queueModal as _queueModal } from './modal.js';
import { saveGame as _saveGame } from '../game/state.js';

// ─── ヘッダー更新 ─────────────────────────────────
export function updateHeader() {
  const info = document.getElementById('hd-info');
  if (!info) return;
  const mo   = GS.month;
  const yr   = GS.year;
  info.textContent = `令和${yr}年${mo}月  💰${GS.ryo}両`;
}

// ─── 育成タブ全体更新 ────────────────────────────
export function refreshTrainTab() {
  const d = GS.disciples[GS.focusIdx];
  if (!d) return;

  // キャラクター描画
  renderCharacter(d);

  // 名前・番付
  const nameEl = document.getElementById('tr-name');
  if (nameEl) {
    nameEl.textContent = d.name;
  }
  const rankEl = document.getElementById('tr-rank');
  if (rankEl) {
    rankEl.textContent = rankLabel(d);
  }

  // コンディション
  const condEl = document.getElementById('tr-cond');
  if (condEl) {
    const cond = CONDITIONS[d.conditionIdx ?? 2];
    let condText = cond.label;
    if (d.injuryLevel >= 1) {
      const injText = `${d.injuryPart ? d.injuryPart + 'の' : ''}${d.injuryLevel >= 2 ? '重傷' : '軽傷'}`;
      condText += ` 🤕${injText}`;
    }
    condEl.textContent  = condText;
    condEl.style.color  = d.injuryLevel >= 1 ? '#e74c3c' : cond.color;
  }

  // 性格特性
  const persEl = document.getElementById('tr-personality');
  if (persEl) {
    const pers = PERSONALITIES.find(p => p.id === d.personality);
    if (pers) {
      persEl.textContent = `${pers.icon} ${pers.name}`;
    }
  }

  // 稽古残り回数
  const turnsEl = document.getElementById('train-turns-info');
  if (turnsEl) {
    const turns = GS.trainTurnsLeft ?? 10;
    const color = turns <= 2 ? '#e74c3c' : turns <= 4 ? '#e67e22' : '#27ae60';
    turnsEl.innerHTML = `<span class="turns-label">稽古残り</span> <span class="turns-count" style="color:${color}">${turns}</span><span class="turns-label"> / 10回</span>`;
  }

  // ステータスバー
  renderStatBars(d);

  // 稽古コマンドボタン
  renderTrainingButtons(d);
}

// ─── ステータスバー ──────────────────────────────
export function renderStatBars(d) {
  const container = document.getElementById('stat-bars');
  if (!container) return;

  const max = 999;
  const bars = [
    { label: '筋力',     val: d.power,       max,  col: '#c0392b' },
    { label: '技術',     val: d.tech,        max,  col: '#2980b9' },
    { label: '精神',     val: d.spirit,      max,  col: '#8e44ad' },
    { label: '体力',     val: d.stamina,     max: d.maxStamina, col: '#27ae60' },
    { label: 'やる気',   val: d.motivation,  max: 100, col: '#f39c12' },
    { label: '体重',     val: `${d.weight}kg`, raw: true },
  ];

  container.innerHTML = bars.map(b => {
    if (b.raw) {
      const ws   = weightStatus(d);
      const wCol = ws === 'optimal' ? '#27ae60' : ws === 'overweight' ? '#e74c3c' : '#999';
      return `
        <div class="stat-row">
          <span class="stat-label">${b.label}</span>
          <span class="stat-raw" style="color:${wCol}">
            ${b.val}
            <small style="color:#aaa">（適正:${Math.round(d.optimalWeight)}kg）</small>
          </span>
        </div>`;
    }
    const pct = Math.min(100, Math.round((b.val / b.max) * 100));
    return `
      <div class="stat-row">
        <span class="stat-label">${b.label}</span>
        <div class="stat-bar-wrap">
          <div class="stat-bar-fill" style="width:${pct}%;background:${b.col}"></div>
        </div>
        <span class="stat-val">${b.val}</span>
      </div>`;
  }).join('');

  // 化粧まわし変更ボタン（関取以上）
  if (d.divIdx >= 4) {
    const km  = KESHO_MAWASHI.find(k => k.id === d.keshoMawashi) || KESHO_MAWASHI[0];
    const btn = document.createElement('button');
    btn.className   = 'btn-sm kesho-btn';
    btn.style.background = `#${km.col.toString(16).padStart(6,'0')}`;
    btn.textContent = `🎽 ${km.name}`;
    btn.onclick = () => showKeshoChangeModal(GS.focusIdx);
    container.appendChild(btn);
  }

  // 三賞・優勝記録
  const yr = d.yushoRecord || [];
  if (yr.length > 0) {
    const counts = {};
    yr.forEach(y => { counts[y.divName] = (counts[y.divName] || 0) + 1; });
    const el = document.createElement('div');
    el.className = 'yusho-row';
    el.innerHTML = Object.entries(counts).map(([div, n]) =>
      `<span class="yusho-badge">🏆${div}×${n}</span>`
    ).join('');
    container.appendChild(el);
  }
}

// ─── 稽古コマンドボタン群 ───────────────────────
export function renderTrainingButtons(d) {
  const grid = document.getElementById('cmd-grid');
  if (!grid) return;

  const phase = GS.phase;
  if (phase !== 'main') { grid.innerHTML = ''; return; }

  grid.innerHTML = TRAINING_CMDS.map(cmd => {
    const canAfford = d.stamina >= cmd.stamCost;
    const disabled  = !canAfford ? 'disabled' : '';
    return `
      <button class="cmd-btn ${disabled ? 'cmd-disabled' : ''}"
              onclick="handleTraining('${cmd.id}')"
              title="${cmd.desc}"
              ${disabled}>
        <span class="cmd-icon">${cmd.icon}</span>
        <span class="cmd-label">${cmd.label}</span>
        <span class="cmd-cost">${cmd.stamCost > 0 ? `${cmd.stamCost}体` : '−'}</span>
      </button>`;
  }).join('');
}

// ─── 弟子一覧タブ ────────────────────────────────
export function renderDiscipleList(containerEl) {
  if (!containerEl) return;
  if (GS.disciples.length === 0) {
    containerEl.innerHTML = `<div class="empty-msg">弟子がいません。まず弟子を迎えましょう！</div>`;
    return;
  }

  containerEl.innerHTML = GS.disciples.map((d, i) => {
    if (d.retired) return `
      <div class="disciple-card retired">
        <span>${d.name}（引退）</span>
        <small>最高位:${DIVISIONS[d.divIdx].short}　${d.totalWins}勝${d.totalLosses}敗</small>
      </div>`;

    const div  = DIVISIONS[d.divIdx];
    const cond = CONDITIONS[d.conditionIdx ?? 2];
    return `
      <div class="disciple-card ${GS.focusIdx === i ? 'focused' : ''}"
           onclick="setFocusDisciple(${i})">
        <div class="dc-header">
          <strong>${d.name}</strong>
          <span class="dc-rank">${div.short}${d.pos}枚目</span>
          <span class="dc-cond" style="color:${cond.color}">${cond.label}</span>
        </div>
        <div class="dc-stats">
          <span>筋${d.power}</span>
          <span>技${d.tech}</span>
          <span>精${d.spirit}</span>
          <span>体${Math.round(d.stamina)}/${d.maxStamina}</span>
          <span>${d.weight}kg</span>
        </div>
        <div class="dc-info">
          ${d.injuryLevel >= 1 ? `<span class="inj-badge">🤕${d.injuryPart ? d.injuryPart + 'の' : ''}${d.injuryLevel >= 2 ? '重傷' : '軽傷'}</span>` : ''}
          ${d.divIdx >= 4 ? `<span class="kanto-badge">関取</span>` : ''}
        </div>
        <div class="dc-actions">
          <button class="btn-sm" onclick="event.stopPropagation(); setFocusAndTab(${i}, 'train')">育成</button>
          <button class="btn-sm btn-retire" onclick="event.stopPropagation(); confirmRetire(${i})">引退</button>
        </div>
      </div>`;
  }).join('');
}

// ─── 施設タブ ────────────────────────────────────
export function renderFacilityTab(containerEl) {
  if (!containerEl) return;
  containerEl.innerHTML = '';

  // ── 施設アップグレード ──
  const facSection = document.createElement('div');
  facSection.className = 'fac-section';
  facSection.innerHTML = '<h3 class="section-title">施設強化</h3>';

  for (const [id, fac] of Object.entries(FACILITY_DATA)) {
    const curLv  = GS.facilities[id] ?? 0;
    const maxLv  = fac.levels.length - 1;
    const isMax  = curLv >= maxLv;
    const nextLv = isMax ? null : fac.levels[curLv + 1];

    facSection.innerHTML += `
      <div class="fac-card">
        <div class="fac-top">
          <span>${fac.icon} ${fac.name}</span>
          <span class="fac-level">Lv${curLv + 1} / ${maxLv + 1}</span>
        </div>
        <div class="fac-cur">${fac.levels[curLv].label}：${fac.levels[curLv].effect}</div>
        ${isMax ? '<div class="fac-max">最大レベル達成！</div>' :
          `<button class="btn btn-upgrade" onclick="doUpgradeFacility('${id}')">
            強化→${nextLv.label}（${nextLv.cost}両）
          </button>`}
      </div>`;
  }
  containerEl.appendChild(facSection);

  // ── 特別稽古 ──
  renderSpecialTraining(containerEl);
}

function renderSpecialTraining(containerEl) {
  // SPECIAL_TRAINING, ITEMS 等はファイル先頭でstatic import済み

  const sec = document.createElement('div');
  sec.className = 'invest-section';
  sec.innerHTML = `
    <h3 class="section-title">投資・強化メニュー</h3>
    <p class="section-note">選択中の弟子（${GS.disciples[GS.focusIdx]?.name || '−'}）に適用</p>`;

  // 特別稽古
  sec.innerHTML += `<h4 class="sub-title">特別稽古（1場所限定）</h4>`;
  sec.innerHTML += SPECIAL_TRAINING.map(tr => {
    const d       = GS.disciples[GS.focusIdx];
    const canBuy  = GS.ryo >= tr.cost;
    const meetsReq = !tr.req?.minDiv || (d && d.divIdx >= tr.req.minDiv);
    return `
      <div class="invest-card ${!canBuy || !meetsReq ? 'disabled' : ''}">
        <span>${tr.icon} ${tr.name}</span>
        <span class="invest-desc">${tr.desc}</span>
        <button class="btn-sm" onclick="doBuySpecialTraining('${tr.id}')"
          ${!canBuy || !meetsReq ? 'disabled' : ''}>
          ${tr.cost}両
        </button>
      </div>`;
  }).join('');

  // アイテム
  sec.innerHTML += `<h4 class="sub-title">道具・アイテム（次場所まで持続）</h4>`;
  sec.innerHTML += ITEMS.map(item => {
    const canBuy = GS.ryo >= item.cost;
    const active = !!GS.activeItems[item.id] || GS.pendingItems.includes(item.id);
    return `
      <div class="invest-card ${active ? 'active-item' : ''} ${!canBuy ? 'disabled' : ''}">
        <span>${item.icon} ${item.name}</span>
        <span class="invest-desc">${item.desc}</span>
        ${active ? '<span class="active-badge">使用中</span>' :
          `<button class="btn-sm" onclick="doBuyItem('${item.id}')" ${!canBuy ? 'disabled' : ''}>${item.cost}両</button>`}
      </div>`;
  }).join('');

  // 名声施策
  sec.innerHTML += `<h4 class="sub-title">部屋の名声施策</h4>`;
  sec.innerHTML += PRESTIGE_ACTIONS.map(act => `
    <div class="invest-card ${GS.ryo < act.cost ? 'disabled' : ''}">
      <span>${act.icon} ${act.name}</span>
      <span class="invest-desc">${act.desc}</span>
      <button class="btn-sm" onclick="doPrestigeAction('${act.id}')" ${GS.ryo < act.cost ? 'disabled' : ''}>
        ${act.cost}両
      </button>
    </div>`).join('');

  // スカウト施策
  sec.innerHTML += `<h4 class="sub-title">スカウト強化</h4>`;
  sec.innerHTML += SCOUT_ACTIONS.map(act => `
    <div class="invest-card ${GS.ryo < act.cost ? 'disabled' : ''}">
      <span>${act.icon} ${act.name}</span>
      <span class="invest-desc">${act.desc}</span>
      <button class="btn-sm" onclick="doScoutAction('${act.id}')" ${GS.ryo < act.cost ? 'disabled' : ''}>
        ${act.cost}両
      </button>
    </div>`).join('');

  containerEl.appendChild(sec);
}

// ─── 歴史タブ ────────────────────────────────────
export function renderHistoryTab(containerEl) {
  if (!containerEl) return;
  containerEl.innerHTML = '<h3 class="section-title">部屋の歴史</h3>';
  if (!GS.history || GS.history.length === 0) {
    containerEl.innerHTML += '<div class="empty-msg">まだ記録がありません。</div>';
    return;
  }
  const list = [...GS.history].reverse();
  containerEl.innerHTML += list.map(h => `
    <div class="history-entry">
      <span class="h-icon">${h.icon || '📌'}</span>
      <span class="h-date">${h.date}</span>
      <span class="h-text">${h.text}</span>
    </div>`).join('');
}

// ─── メッセージログ ──────────────────────────────
export function addMsg(text, type = '') {
  const log = document.getElementById('msg-log');
  if (!log) return;
  const el = document.createElement('div');
  el.className = `msg ${type}`;
  el.textContent = text;
  log.prepend(el);
  while (log.children.length > 30) log.removeChild(log.lastChild);
}

// ─── 化粧まわし変更モーダル ───────────────────────
function showKeshoChangeModal(idx) {
  const d = GS.disciples[idx];
  if (!d || d.divIdx < 4) return;
  const curId   = d.keshoMawashi || KESHO_MAWASHI[0].id;
  const curName = KESHO_MAWASHI.find(k => k.id === curId)?.name || '赤獅子';
  _queueModal({
    em: '🎽', title: '化粧まわし変更',
    text: `現在：${curName}\n化粧まわしを選んでください。`,
    choices: KESHO_MAWASHI.map(km => ({
      label: `🎽 ${km.name}（${km.desc}）${km.id === curId ? ' ◀現在' : ''}`,
      fn: () => {
        d.keshoMawashi = km.id;
        _saveGame();
        refreshTrainTab();
      },
    })),
  });
}

// ─── 番付ラベル（helper） ──────────────────────────
export function divLabel(d) {
  return rankLabel(d);
}

// ─── 番付表タブ ──────────────────────────────────
export function renderBanzukeTab(containerEl) {
  if (!containerEl) return;
  const el = containerEl;
  el.innerHTML = `<h3 class="section-title">番付表 ─ 令和${GS.year}年${GS.month}月</h3>`;

  const myDisciples = GS.disciples.filter(d => !d.retired);
  const rival = GS.rival;

  // スポンサー表示
  if (GS.sponsors && GS.sponsors.length > 0) {
    const sDiv = document.createElement('div');
    sDiv.className = 'sponsor-list';
    sDiv.innerHTML = `<h4 class="sub-title">現スポンサー（${GS.sponsors.length}社）</h4>`;
    sDiv.innerHTML += GS.sponsors.map(s =>
      `<div class="sponsor-row"><span>${s.icon} ${s.name}</span><span class="sponsor-income">+${s.income}両/場所</span></div>`
    ).join('');
    el.appendChild(sDiv);
  }

  // 番付を上位から表示
  for (let divIdx = DIVISIONS.length - 1; divIdx >= 0; divIdx--) {
    const div = DIVISIONS[divIdx];
    const discInDiv = myDisciples.filter(d => d.divIdx === divIdx);
    const rivalInDiv = rival && rival.divIdx === divIdx;

    if (discInDiv.length === 0 && !rivalInDiv) {
      // 所属なし：簡易表示
      const sec = document.createElement('div');
      sec.className = 'banzuke-section banzuke-empty-section';
      sec.innerHTML = `<div class="banzuke-div-name">${div.name}</div><div class="banzuke-no-member">（所属力士なし）</div>`;
      el.appendChild(sec);
      continue;
    }

    const sec = document.createElement('div');
    sec.className = 'banzuke-section';
    sec.innerHTML = `<div class="banzuke-div-name">${div.name}</div>`;

    // プレイヤーの弟子 + ライバルをposition順にソート
    const wrestlers = [
      ...discInDiv.map(d => ({ name: d.name, pos: d.pos, isPlayer: true, d })),
      ...(rivalInDiv ? [{ name: rival.name, pos: rival.pos, isRival: true }] : []),
    ].sort((a, b) => a.pos - b.pos);

    wrestlers.forEach(w => {
      const isActive = w.isPlayer && GS.focusIdx === GS.disciples.indexOf(w.d);
      const badge = w.isPlayer ? (isActive ? '⭐' : '★') : '⚔';
      const cls = w.isPlayer ? 'banzuke-player' + (isActive ? ' banzuke-focus' : '') : 'banzuke-rival';
      const wins = w.isPlayer ? `${w.d.wins}勝${w.d.losses}敗` : '';
      sec.innerHTML += `
        <div class="banzuke-row ${cls}">
          <span class="banzuke-pos">${div.name}${w.pos}枚目</span>
          <span class="banzuke-name">${badge} ${w.name}</span>
          ${w.isPlayer ? `<span class="banzuke-record">${wins}</span>` : '<span class="banzuke-rival-badge">ライバル</span>'}
        </div>`;
    });

    el.appendChild(sec);
  }
}
