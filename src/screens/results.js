import { GS, saveGame, addHistory } from '../game/state.js';
import {
  DIVISIONS, DIV_JURYO, DIV_MAKUNOUCHI, DIV_YOKOZUNA, KESHO_MAWASHI,
  DIV_JONOKUCHI,
} from '../game/constants.js';
import { calcBashoIncome, getCurrentBashoInfo, simulateRivalBasho, advanceMonth } from '../game/basho.js';
import { applyRankChange, drainEventQueue, checkRetirementAge, checkYusho, checkSansho } from '../game/rankSystem.js';
import { rollRandomEvents, checkAnnualAwards, applyFacilityEffects, updateMotivation, rollSponsorEvent, acceptSponsor } from '../game/events.js';
import { retireDisciple } from '../game/facility.js';
import { queueModal, processModalQueue, toast } from '../render/modal.js';
import { showScreen } from './index.js';

// ─── 結果画面描画 ────────────────────────────────
export function renderResults() {
  const el = document.getElementById('screen-results');

  // 場所後の全処理を実行
  const resultsData = runPostBashoProcessing();

  const bashoName = getCurrentBashoInfo().name;
  const yushoWinners = resultsData.filter(r => r.isYusho);

  el.innerHTML = `
    ${yushoWinners.length > 0 ? '<div class="yusho-celebration" id="yusho-celebration"></div>' : ''}
    <div class="results-wrap">
      <div class="results-header">
        <h2>場所結果発表</h2>
        <div>令和${GS.year}年　${bashoName}</div>
        <button class="btn-sm btn-save" id="res-save-btn">💾</button>
      </div>

      ${yushoWinners.length > 0 ? `
        <div class="yusho-banner">
          🏆 ${yushoWinners.map(r => {
            const divName = DIVISIONS[r.oldDivIdx].name;
            const totalYusho = r.disciple.yushoRecord?.length || 0;
            return `${r.disciple.name}　${divName}優勝！（通算${totalYusho}回目）`;
          }).join('　')} 🏆
        </div>` : ''}

      <div id="results-cards">
        ${resultsData.map(r => renderResultCard(r)).join('')}
      </div>

      <div class="income-section" id="income-section"></div>
      <div id="annual-award-section"></div>

      <div style="text-align:center;margin-top:16px;">
        <button class="btn btn-red btn-big" id="btn-back-to-main">育成に戻る →</button>
      </div>
    </div>`;

  // 収入計算・表示
  const income = calcBashoIncome();
  GS.ryo = (GS.ryo || 0) + income;
  document.getElementById('income-section').innerHTML = `
    <div class="income-row">
      <span>場所収入</span>
      <strong>+${income}両</strong>
    </div>
    <div class="income-row">
      <span>所持金</span>
      <strong>${GS.ryo}両</strong>
    </div>`;

  // ライバルシミュレーション
  simulateRivalBasho();

  // 月進行
  advanceMonth();

  // 年間表彰（6場所ごと）
  const annual = checkAnnualAwards();
  if (annual) {
    GS.ryo += annual.bonus;
    document.getElementById('annual-award-section').innerHTML = `
      <div class="annual-award">
        🏆 年間最多勝：${annual.name}（${annual.wins}勝）← ボーナス+${annual.bonus}両！
      </div>`;
  }

  saveGame();

  // 優勝セレブレーションアニメーション
  if (yushoWinners.length > 0) {
    triggerYushoCelebration();
  }

  // イベントキューを処理（昇進モーダルなど）
  processModalQueue();

  // スポンサーイベント
  const sponsorOffer = rollSponsorEvent();
  if (sponsorOffer) {
    setTimeout(() => {
      queueModal({
        em: sponsorOffer.icon,
        title: `${sponsorOffer.name}からスポンサーオファー！`,
        text: `${sponsorOffer.desc}\n毎場所 +${sponsorOffer.income}両 の後援が受けられます。\n契約しますか？`,
        choices: [
          {
            label: '✅ 契約する',
            fn: () => {
              acceptSponsor(sponsorOffer.id);
              saveGame();
              toast(`${sponsorOffer.name}と契約しました！毎場所+${sponsorOffer.income}両！`);
            },
          },
          { label: '断る', fn: () => {} },
        ],
      });
      processModalQueue();
    }, 500);
  }

  // スポンサー収入表示
  if (GS.sponsors && GS.sponsors.length > 0) {
    const sponsorIncome = GS.sponsors.reduce((sum, s) => sum + s.income, 0);
    const sponsorEl = document.getElementById('income-section');
    if (sponsorEl) {
      sponsorEl.innerHTML += `
        <div class="income-row">
          <span>スポンサー収入（${GS.sponsors.length}社）</span>
          <strong>+${sponsorIncome}両</strong>
        </div>`;
    }
  }

  // 横綱初優勝チェック
  for (const d of GS.disciples) {
    if (!d.retired && d.divIdx >= 7) { // yokozuna
      const firstYusho = d.yushoRecord?.find(y => y.divName === '横綱');
      if (firstYusho && firstYusho.bashoIdx === GS.bashoCount - 1 && !d._yokozunaYushoShown) {
        d._yokozunaYushoShown = true;
        setTimeout(() => {
          queueModal({
            em: '👑',
            title: `${d.name} 横綱初優勝！！！`,
            text: `${d.name}が横綱として初めての優勝を果たした！\n土俵の神として、その名は永遠に語り継がれるだろう。\n\n通算成績：${d.totalWins}勝${d.totalLosses}敗\n優勝回数：${d.yushoRecord.length}回`,
          });
          processModalQueue();
        }, 1000);
        break;
      }
    }
  }

  document.getElementById('btn-back-to-main')?.addEventListener('click', () => {
    GS.phase = 'main';
    showScreen('main');
  });
  document.getElementById('res-save-btn')?.addEventListener('click', () => {
    saveGame(); toast('セーブしました！');
  });
}

// ─── 場所後処理のメイン ──────────────────────────
function runPostBashoProcessing() {
  const resultsData = [];

  for (const d of GS.disciples) {
    if (d.retired) continue;

    const wins   = d.wins   || 0;
    const losses = d.losses || 0;
    const div    = DIVISIONS[d.divIdx];

    // 成長履歴を記録（場所後のステータスを保存）
    d.statHistory = d.statHistory || [];
    d.statHistory.push({
      bashoIdx: GS.bashoCount,
      year: GS.year,
      month: GS.month,
      power: d.power,
      tech: d.tech,
      spirit: d.spirit,
      divIdx: d.divIdx,
      pos: d.pos,
      wins,
      losses,
    });
    // 履歴は最大30場所分保持
    if (d.statHistory.length > 30) d.statHistory.shift();

    // やる気更新
    updateMotivation(d);

    // 番付変動
    const oldDivIdx = d.divIdx;
    const oldPos    = d.pos;
    applyRankChange(d, wins);

    // 昇進・警告イベントを処理
    const events = drainEventQueue();
    processPromotionEvents(events, d);

    // ── 優勝判定（ここで初めて checkYusho を呼ぶ） ──
    const isYusho = checkYusho(d, wins);

    // 連勝記録更新
    if (wins > losses) {
      d.winStreak = (d.winStreak || 0) + 1;
      d.bestWinStreak = Math.max(d.bestWinStreak || 0, d.winStreak);
    } else {
      d.winStreak = 0;
    }

    // 金星チェック（幕内平幕が横綱に勝った記録）
    const kinboshiCount = (d.bashoMatchResults || [])
      .filter(r => r.won && r.opponent?.isYokozuna).length;
    if (kinboshiCount > 0 && d.divIdx === DIV_MAKUNOUCHI) {
      d.kinboshi = (d.kinboshi || 0) + kinboshiCount;
      queueModal({
        em: '⭐', title: `金星！${d.name}が横綱を倒した！`,
        text: `金星${kinboshiCount}個獲得！\n通算金星：${d.kinboshi}個\nやる気が大きく上昇！`,
      });
      d.motivation = Math.min(100, d.motivation + 20 * kinboshiCount);
      addHistory({ icon: '⭐', text: `${d.name} 金星！（通算${d.kinboshi}個）` });
    }

    // 三賞判定（ここで初めて checkSansho を呼ぶ）
    const sanshoResult = checkSansho(d, wins);
    if (sanshoResult) {
      d.sanshoRecord = d.sanshoRecord || [];
      d.sanshoRecord.push(...sanshoResult);
      addHistory({ icon: '🎖', text: `${d.name} ${sanshoResult.join('・')}受賞！` });
    }
    const sansho = sanshoResult || [];

    // 引退年齢チェック
    const retireStatus = checkRetirementAge(d);
    if (retireStatus === 'forced') {
      handleForcedRetire(d);
    } else if (retireStatus === 'advisory' && !d._advisoryShown) {
      d._advisoryShown = true;
      queueModal({
        em: '🎋', title: `${d.name}引退勧告`,
        text: `${d.name}は${d.age}歳。\n引退を考える年齢です。\n「続ける」場合、毎場所ステータスが低下します。`,
        choices: [
          { label: 'まだ続ける', fn: () => {} },
          { label: '引退する',  fn: () => retireDisciple(d) },
        ],
      });
    }

    // ランダムイベント（場所後）
    const randEvs = rollRandomEvents(d);
    randEvs.forEach(ev => queueModal({ em: ev.icon, title: ev.title, text: ev.text }));

    resultsData.push({
      disciple: d, wins, losses, oldDivIdx, oldPos,
      newDivIdx: d.divIdx, newPos: d.pos, isYusho, sansho,
    });
  }

  applyFacilityEffects();
  return resultsData;
}

// ─── 昇進イベントのモーダル表示 ─────────────────
function processPromotionEvents(events, d) {
  for (const ev of events) {
    switch (ev.type) {
      case 'juryo_promotion':
        queueModal({
          em: '🎊', title: `${d.name} 十両昇進！`,
          text: `幕下から関取の仲間入り！\n大銀杏が結えるようになりました！\n化粧まわしをつけて土俵入りができます！`,
          choices: [{
            label: '🎽 化粧まわしを選ぶ',
            noQueue: true,
            fn: () => showKeshoSelect(d, () => showRename(d, '十両')),
          }],
        });
        break;

      case 'makunouchi_promotion':
        queueModal({
          em: '🎊', title: `${d.name} 幕内昇進！`,
          text: `ついに幕内の舞台へ！\n全国のファンが注目する番付です！`,
          choices: [{ label: '🎉 祝！', fn: () => showRename(d, '幕内') }],
        });
        break;

      case 'ozeki_promotion':
        queueModal({
          em: '🏅', title: `${d.name} 大関昇進！`,
          text: `相撲の最高位・大関に昇進！\n横綱への道が見えてきた！`,
          choices: [{ label: '🎉 祝！', fn: () => showRename(d, '大関') }],
        });
        break;

      case 'yokozuna_promotion':
        queueModal({
          em: '👑', title: `横綱審議！${d.name}が候補に`,
          text: `横綱審議委員会が開催されます。\n来場所の活躍次第で横綱昇進が決まる！`,
        });
        break;

      case 'yokozuna_promotion_confirmed':
        queueModal({
          em: '👑', title: `${d.name} 横綱昇進！！！`,
          text: `相撲の最高位・横綱に昇進！\n土俵の神として永遠に語り継がれよう！`,
          choices: [{ label: '👑 横綱として立つ！', fn: () => showRename(d, '横綱') }],
        });
        break;

      case 'ozeki_warning':
        queueModal({ em: '⚠', title: `${d.name}大関取りこぼし`,
          text: `負け越し。もう1場所負け越すと大関陥落の危機！` });
        break;

      case 'ozeki_fall':
        queueModal({ em: '😔', title: `${d.name}大関陥落...`,
          text: `2場所連続負け越しで大関から陥落。三役に落ちてしまった。` });
        break;

      case 'yokozuna_warning':
        queueModal({ em: '⚠', title: `${d.name}横綱として不甲斐ない`,
          text: `横綱として負け越し（${d.yokozunaWarning}場所連続）。\n3場所連続で引退勧告が出ます。` });
        break;

      case 'yokozuna_retire_forced':
        queueModal({
          em: '🎋', title: `${d.name}横綱引退勧告`,
          text: `3場所連続負け越しにより引退勧告が出ました。`,
          choices: [{ label: '引退する', fn: () => retireDisciple(d) }],
        });
        break;
    }
  }
}

// ─── 化粧まわし選択 ──────────────────────────────
function showKeshoSelect(d, next) {
  queueModal({
    em: '🎽', title: '化粧まわしを選ぼう！',
    text: '関取の証！晴れ舞台を彩る\n化粧まわしを選んでください。\n（後から変更できます）',
    choices: KESHO_MAWASHI.map(km => ({
      label: `🎽 ${km.name}（${km.desc}）`,
      fn: () => { d.keshoMawashi = km.id; saveGame(); next?.(); },
    })),
  });
}

// ─── しこ名変更 ──────────────────────────────────
function showRename(d, occasion) {
  queueModal({
    em: '✏', title: `${d.name}のしこ名変更`,
    text: `${occasion}昇進を機に、しこ名を変更しますか？`,
    type: 'input',
    defaultValue: d.name,
    okLabel: '改名する',
    skipLabel: 'このままでいい',
    onOk: (newName) => {
      if (newName && newName !== d.name) {
        d.nameHistory = d.nameHistory || [];
        d.nameHistory.push({ name: d.name, occasion });
        const old = d.name;
        d.name = newName;
        addHistory({ icon: '✏', text: `${old} → ${d.name}に改名（${occasion}）` });
        saveGame();
        toast(`${d.name}に改名しました！`);
      }
    },
    onSkip: () => {},
  });
}

// ─── 強制引退処理 ────────────────────────────────
function handleForcedRetire(d) {
  queueModal({
    em: '🎋', title: `${d.name} 定年引退`,
    text: `${d.name}は${d.age}歳。現役を引退しました。\nお疲れ様でした！`,
    onOk: () => retireDisciple(d),
  });
}

// ─── 優勝セレブレーションアニメーション ─────────
function triggerYushoCelebration() {
  const container = document.getElementById('yusho-celebration');
  if (!container) return;
  const colors = ['#FFD700','#FF4500','#FF69B4','#00CED1','#7FFF00','#FF6347','#9370DB'];
  const symbols = ['🏆','⭐','✨','🎉','🎊','🌟'];
  for (let i = 0; i < 60; i++) {
    const piece = document.createElement('div');
    piece.className = 'confetti-piece';
    const isSymbol = Math.random() < 0.3;
    if (isSymbol) {
      piece.textContent = symbols[Math.floor(Math.random() * symbols.length)];
      piece.style.fontSize = `${12 + Math.random() * 16}px`;
    } else {
      piece.style.width = `${6 + Math.random() * 8}px`;
      piece.style.height = `${6 + Math.random() * 8}px`;
      piece.style.background = colors[Math.floor(Math.random() * colors.length)];
      piece.style.borderRadius = Math.random() < 0.5 ? '50%' : '0';
    }
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.animationDelay = `${Math.random() * 2}s`;
    piece.style.animationDuration = `${2.5 + Math.random() * 2}s`;
    container.appendChild(piece);
  }
  // 4秒後に自動除去
  setTimeout(() => container.remove(), 5000);
}

// ─── 結果カードHTML ──────────────────────────────
function renderResultCard(r) {
  const d    = r.disciple;
  const div  = DIVISIONS[d.divIdx];
  const oldD = DIVISIONS[r.oldDivIdx];

  let rankChange;
  if (r.newDivIdx !== r.oldDivIdx) {
    rankChange = `${oldD.short}${r.oldPos}枚目 → <b>${div.short}${d.pos}枚目</b>`;
  } else if (r.newPos < r.oldPos) {
    rankChange = `${div.short}${r.oldPos}枚目 → <b>${div.short}${d.pos}枚目</b>（↑昇）`;
  } else if (r.newPos > r.oldPos) {
    rankChange = `${div.short}${r.oldPos}枚目 → ${div.short}${d.pos}枚目（↓降）`;
  } else {
    rankChange = `${div.short}${d.pos}枚目（変動なし）`;
  }

  // 星取表（○●表示）
  const hoshitori = (d.bashoMatchResults || []).map(m => m.won
    ? '<span class="hoshi-win">○</span>'
    : '<span class="hoshi-loss">●</span>'
  ).join('');

  // 幕内×N スタイルの通算優勝表示
  const yushoByDiv = {};
  (d.yushoRecord || []).forEach(y => {
    yushoByDiv[y.divName] = (yushoByDiv[y.divName] || 0) + 1;
  });
  const yushoSummary = Object.entries(yushoByDiv)
    .map(([dn, n]) => `${dn}×${n}`).join(' ');

  return `
    <div class="result-card ${r.isYusho ? 'yusho-card' : ''}">
      <div class="rc-name">${r.isYusho ? '🏆 ' : ''}${d.name}</div>
      <div class="rc-record">
        <span class="rc-wins">${r.wins}勝</span>
        <span class="rc-losses">${r.losses}敗</span>
        <span class="rc-judge ${r.wins > r.losses ? 'kachi' : r.wins < r.losses ? 'make' : 'gobu'}">
          ${r.wins > r.losses ? '勝ち越し' : r.wins < r.losses ? '負け越し' : '五分'}
        </span>
        ${d.winStreak >= 2 ? `<span class="streak-badge">${d.winStreak}場所連続勝ち越し🔥</span>` : ''}
      </div>
      <div class="rc-hoshitori">${hoshitori}</div>
      <div class="rc-rank-change">${rankChange}</div>
      ${r.isYusho ? `<div class="rc-yusho">🏆 ${oldD.name}優勝！（通算：${yushoSummary || '初優勝！'}）</div>` : ''}
      ${r.sansho?.length > 0 ? `<div class="rc-sansho">🎖 ${r.sansho.join('・')}</div>` : ''}
      ${d.kinboshi > 0 ? `<div class="rc-kinboshi">⭐ 金星${d.kinboshi}個</div>` : ''}
      ${d.injuryLevel >= 1 ? `<div class="rc-inj">🤕 ${d.injuryPart ? d.injuryPart + 'の' : ''}${d.injuryLevel >= 2 ? '重傷' : '軽傷'}</div>` : ''}
    </div>`;
}
