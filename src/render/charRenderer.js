import * as PIXI from 'pixi.js';
import { KESHO_MAWASHI, CONDITIONS, DIV_JURYO, DIV_YOKOZUNA, clamp } from '../game/constants.js';

// ─── Pixi.js アプリケーション ──────────────────
let app = null;
let charStage = null;

const CW = 200;
const CH = 300;

// ─── 初期化 ──────────────────────────────────────
export function initCharRenderer(containerEl) {
  if (app) { app.destroy(true); }

  app = new PIXI.Application({
    width:           CW,
    height:          CH,
    backgroundColor: 0xE8D4A0,
    antialias:       true,
    resolution:      Math.min(window.devicePixelRatio || 1, 2),
    autoDensity:     true,
  });

  containerEl.innerHTML = '';
  containerEl.appendChild(app.view);
  app.view.style.width  = '100%';
  app.view.style.height = '100%';

  charStage = new PIXI.Container();
  app.stage.addChild(charStage);
}

// ─── 力士を描画 ──────────────────────────────────
export function renderCharacter(d) {
  if (!charStage) return;
  charStage.removeChildren();

  const dims = getBodyDims(d);
  const CX   = CW / 2;

  // Y座標系
  const shadowY  = 272;
  const feetY    = 255;
  const shinY    = 220;
  const thighY   = 185;
  const mawashiY = 168;
  const torsoY   = 105;
  const neckY    = 96;
  const headTopY = 38;
  const headH    = 58 + Math.floor(d.weight / 30);

  // ── 1. 影 ──
  drawShadow(CX, shadowY, dims);

  // ── 2. 足・すね・太もも ──
  drawLegs(CX, feetY, shinY, thighY, mawashiY, dims, d);

  // ── 3. 胴体 ──
  drawTorso(CX, torsoY, mawashiY, dims, d);

  // ── 4. 腕 ──
  drawArms(CX, torsoY, dims, d);

  // ── 5. まわし・化粧まわし ──
  drawMawashi(CX, mawashiY, dims, d);

  // ── 6. 首 ──
  drawNeck(CX, neckY, dims, d);

  // ── 7. 頭・髷・顔 ──
  drawHead(CX, headTopY, headH, dims, d);

  // ── 8. 状態表示アイコン ──
  drawStatusIcons(CX, d);
}

// ─── 体型パラメータ計算 ──────────────────────────
function getBodyDims(d) {
  const w  = d.weight || 100;
  const mu = d.power  || 100;

  let bodyW  = 55, belly = 0, legW = 18;
  if      (w >= 200) { bodyW = 120; belly = 36; legW = 38; }
  else if (w >= 170) { bodyW = 108; belly = 28; legW = 34; }
  else if (w >= 130) { bodyW = 90;  belly = 18; legW = 28; }
  else if (w >= 90)  { bodyW = 72;  belly = 8;  legW = 22; }

  let shoulderAdd = 0, armW = 10;
  if      (mu >= 700) { shoulderAdd = 26; armW = 22; }
  else if (mu >= 400) { shoulderAdd = 18; armW = 17; }
  else if (mu >= 150) { shoulderAdd = 8;  armW = 13; }

  // 体型補正
  if (d.bodyType === 'anko')   { belly *= 1.4; bodyW = Math.round(bodyW * 1.15); }
  if (d.bodyType === 'shohei') { bodyW = Math.round(bodyW * 0.85); legW = Math.round(legW * 1.1); }
  if (d.bodyType === 'muscle') { shoulderAdd = Math.round(shoulderAdd * 1.2); belly = 0; armW = Math.round(armW * 1.3); }

  return {
    bodyW, belly, legW, shoulderAdd, armW,
    totalW: bodyW + shoulderAdd * 2,
    skin: skinColor(d),
  };
}

function skinColor(d) {
  // 体重・年齢による微妙な肌色の違い
  const base = d.weight > 150 ? 0xF0C090 : 0xF5CA9A;
  return base;
}

// ─── 影 ──────────────────────────────────────────
function drawShadow(cx, y, dims) {
  const g = new PIXI.Graphics();
  g.beginFill(0x000000, 0.18);
  g.drawEllipse(cx, y, dims.bodyW * 0.6, 8);
  g.endFill();
  charStage.addChild(g);
}

// ─── 脚 ──────────────────────────────────────────
function drawLegs(cx, feetY, shinY, thighY, mawashiY, dims, d) {
  const lw   = dims.legW;
  const gap  = dims.bodyW * 0.22;
  const skin = dims.skin;

  const g = new PIXI.Graphics();

  // 左太もも（台形：上が太く下が細い）
  g.beginFill(skin);
  g.drawPolygon([
    cx - gap - lw,   thighY,
    cx - gap,        thighY,
    cx - gap - 2,    shinY,
    cx - gap - lw - 4, shinY,
  ]);
  g.endFill();

  // 右太もも
  g.beginFill(skin);
  g.drawPolygon([
    cx + gap,        thighY,
    cx + gap + lw,   thighY,
    cx + gap + lw + 4, shinY,
    cx + gap + 2,    shinY,
  ]);
  g.endFill();

  // 左すね（少し細い）
  g.beginFill(darken(skin, 0.08));
  g.drawPolygon([
    cx - gap - 2,      shinY,
    cx - gap - lw - 4, shinY,
    cx - gap - lw - 2, feetY,
    cx - gap,          feetY,
  ]);
  g.endFill();

  // 右すね
  g.beginFill(darken(skin, 0.08));
  g.drawPolygon([
    cx + gap + lw + 4, shinY,
    cx + gap + 2,      shinY,
    cx + gap,          feetY,
    cx + gap + lw + 2, feetY,
  ]);
  g.endFill();

  // 足（小さい丸み）
  g.beginFill(darken(skin, 0.12));
  g.drawRoundedRect(cx - gap - lw - 3, feetY, lw + 6, 10, 4);
  g.endFill();
  g.beginFill(darken(skin, 0.12));
  g.drawRoundedRect(cx + gap - 3, feetY, lw + 6, 10, 4);
  g.endFill();

  // 怪我中：白いテーピング
  if (d.injuryLevel >= 1) {
    g.beginFill(0xFFFFFF, 0.6);
    g.drawRect(cx - gap - lw - 6, shinY + 10, lw + 14, 8);
    g.endFill();
  }

  charStage.addChild(g);
}

// ─── 胴体 ────────────────────────────────────────
function drawTorso(cx, torsoY, mawashiY, dims, d) {
  const bw   = dims.bodyW;
  const sw   = dims.shoulderAdd;
  const skin = dims.skin;
  const torsoH = mawashiY - torsoY;

  const g = new PIXI.Graphics();

  // 胴体（台形：肩広・腰細）
  g.beginFill(skin);
  g.drawPolygon([
    cx - bw/2 - sw, torsoY,
    cx + bw/2 + sw, torsoY,
    cx + bw/2,      mawashiY,
    cx - bw/2,      mawashiY,
  ]);
  g.endFill();

  // お腹の丸み（あんこ型・重量型）
  if (dims.belly > 0) {
    g.beginFill(skin, 0.9);
    g.drawEllipse(cx, torsoY + torsoH * 0.55, bw * 0.42, dims.belly);
    g.endFill();
  }

  // 胸筋の線（筋肉型）
  if (d.bodyType === 'muscle') {
    g.lineStyle(1.5, darken(skin, 0.18), 0.5);
    g.moveTo(cx, torsoY + 8);
    g.lineTo(cx, torsoY + torsoH * 0.45);
    g.moveTo(cx - bw * 0.28, torsoY + 14);
    g.bezierCurveTo(cx - bw * 0.2, torsoY + 30, cx - bw * 0.1, torsoY + 35, cx, torsoY + 42);
    g.moveTo(cx + bw * 0.28, torsoY + 14);
    g.bezierCurveTo(cx + bw * 0.2, torsoY + 30, cx + bw * 0.1, torsoY + 35, cx, torsoY + 42);
    g.lineStyle(0);
  }

  // 胴体の輪郭線（薄め）
  g.lineStyle(1, darken(skin, 0.2), 0.3);
  g.drawPolygon([
    cx - bw/2 - sw, torsoY,
    cx + bw/2 + sw, torsoY,
    cx + bw/2,      mawashiY,
    cx - bw/2,      mawashiY,
  ]);
  g.lineStyle(0);

  charStage.addChild(g);
}

// ─── 腕 ──────────────────────────────────────────
function drawArms(cx, torsoY, dims, d) {
  const bw   = dims.bodyW;
  const sw   = dims.shoulderAdd;
  const aw   = dims.armW;
  const skin = dims.skin;

  const g = new PIXI.Graphics();

  // 肩の位置
  const shoulderX_L = cx - bw/2 - sw;
  const shoulderX_R = cx + bw/2 + sw;
  const shoulderY   = torsoY + 10;

  // 肘の位置（少し下で外側）
  const elbowX_L = shoulderX_L - 8;
  const elbowX_R = shoulderX_R + 8;
  const elbowY   = shoulderY + 38;

  // 手首の位置
  const wristX_L = shoulderX_L - 4;
  const wristX_R = shoulderX_R + 4;
  const wristY   = elbowY + 32;

  // 左上腕
  g.beginFill(skin);
  g.drawPolygon([
    shoulderX_L,       shoulderY,
    shoulderX_L - aw,  shoulderY,
    elbowX_L - aw/2,   elbowY,
    elbowX_L + aw/2,   elbowY,
  ]);
  g.endFill();

  // 右上腕
  g.beginFill(skin);
  g.drawPolygon([
    shoulderX_R + aw,  shoulderY,
    shoulderX_R,       shoulderY,
    elbowX_R - aw/2,   elbowY,
    elbowX_R + aw/2,   elbowY,
  ]);
  g.endFill();

  // 左前腕
  g.beginFill(darken(skin, 0.05));
  g.drawPolygon([
    elbowX_L - aw/2,   elbowY,
    elbowX_L + aw/2,   elbowY,
    wristX_L + aw*0.4, wristY,
    wristX_L - aw*0.4, wristY,
  ]);
  g.endFill();

  // 右前腕
  g.beginFill(darken(skin, 0.05));
  g.drawPolygon([
    elbowX_R - aw/2,   elbowY,
    elbowX_R + aw/2,   elbowY,
    wristX_R + aw*0.4, wristY,
    wristX_R - aw*0.4, wristY,
  ]);
  g.endFill();

  // 手（小さい円）
  g.beginFill(darken(skin, 0.08));
  g.drawCircle(wristX_L, wristY + 5, aw * 0.6);
  g.drawCircle(wristX_R, wristY + 5, aw * 0.6);
  g.endFill();

  // 怪我テーピング（上腕）
  if (d.injuryLevel >= 2) {
    g.beginFill(0xFFFFFF, 0.7);
    g.drawRect(shoulderX_L - aw - 2, shoulderY + 16, aw + 10, 7);
    g.drawRect(shoulderX_R - 4,      shoulderY + 16, aw + 10, 7);
    g.endFill();
  }

  charStage.addChild(g);
}

// ─── まわし・化粧まわし ───────────────────────────
function drawMawashi(cx, mawashiY, dims, d) {
  const bw = dims.bodyW;
  const mw = bw + 14;
  const mh = 20;
  const isKanto = d.divIdx >= DIV_JURYO;
  const isYoko  = d.divIdx >= DIV_YOKOZUNA;

  const mawCol = isYoko ? 0xD4A800 : isKanto ? 0x9B1B30 : 0x2A3A5C;

  const g = new PIXI.Graphics();

  // まわし本体
  g.beginFill(mawCol);
  g.drawRoundedRect(cx - mw/2, mawashiY, mw, mh, 4);
  g.endFill();

  // ハイライト
  g.beginFill(isYoko ? 0xFFE88A : 0xFFFFFF, 0.18);
  g.drawRoundedRect(cx - mw/2 + 4, mawashiY + 3, mw - 8, 4, 2);
  g.endFill();

  charStage.addChild(g);

  // 化粧まわし（関取以上）
  if (isKanto) {
    drawKeshoMawashi(cx, mawashiY + mh, dims, d, isYoko);
  } else {
    // 幕下以下：前垂れ（細い垂れ）
    const fg = new PIXI.Graphics();
    const fw = 30;
    const fh = 35;
    fg.beginFill(mawCol, 0.85);
    fg.drawPolygon([
      cx - fw/2, mawashiY + mh,
      cx + fw/2, mawashiY + mh,
      cx + fw/2 - 3, mawashiY + mh + fh,
      cx - fw/2 + 3, mawashiY + mh + fh,
    ]);
    fg.endFill();
    charStage.addChild(fg);
  }

  // 横綱の綱
  if (isYoko) {
    drawYokozunaTsuna(cx, mawashiY, mw);
  }
}

function drawKeshoMawashi(cx, startY, dims, d, isYoko) {
  const km  = KESHO_MAWASHI.find(k => k.id === d.keshoMawashi) || KESHO_MAWASHI[0];
  const col = isYoko ? 0xF0EED0 : km.col;
  const bdr = isYoko ? 0xD4A800 : km.bdr;
  const acc = isYoko ? 0xFFD700 : km.acc;

  const pw = 72, ph = 60;
  const px = cx - pw/2;
  const py = startY;

  const g = new PIXI.Graphics();

  // 本体パネル（台形）
  g.beginFill(col);
  g.drawPolygon([px - 3, py, px + pw + 3, py, px + pw, py + ph, px, py + ph]);
  g.endFill();

  // 外枠
  g.lineStyle(3, bdr, 1);
  g.drawPolygon([px - 3, py, px + pw + 3, py, px + pw, py + ph, px, py + ph]);
  g.lineStyle(0);

  // 内枠
  const ip = 7;
  g.lineStyle(1, bdr, 0.55);
  g.drawRect(px + ip, py + ip, pw - ip*2, ph - ip*2);
  g.lineStyle(0);

  // 横ライン装飾
  g.lineStyle(1, bdr, 0.35);
  g.moveTo(px + ip, py + 22);
  g.lineTo(px + pw - ip, py + 22);
  g.lineStyle(0);

  // 中央紋様（菱形）
  const kx = cx, ky = py + 36, kr = 13;
  g.beginFill(acc, 0.9);
  g.drawPolygon([kx, ky - kr, kx + kr, ky, kx, ky + kr, kx - kr, ky]);
  g.endFill();
  g.beginFill(col);
  g.drawPolygon([kx, ky - 7, kx + 7, ky, kx, ky + 7, kx - 7, ky]);
  g.endFill();
  g.beginFill(acc);
  g.drawCircle(kx, ky, 3);
  g.endFill();

  // 左右アクセント紋
  g.beginFill(acc, 0.5);
  g.drawPolygon([kx-24, ky, kx-17, ky-6, kx-10, ky, kx-17, ky+6]);
  g.drawPolygon([kx+24, ky, kx+17, ky-6, kx+10, ky, kx+17, ky+6]);
  g.endFill();

  // 大関・横綱：縦ゴールドライン
  if (d.divIdx >= 6) {
    g.lineStyle(1.5, acc, 0.6);
    g.moveTo(px + 9,      py + ip);
    g.lineTo(px + 9,      py + ph - ip);
    g.moveTo(px + pw - 9, py + ip);
    g.lineTo(px + pw - 9, py + ph - ip);
    g.lineStyle(0);
  }

  // 房（fringe）
  const frY = py + ph;
  const frN = 10;
  for (let i = 0; i < frN; i++) {
    const fx = px + 4 + i * ((pw - 8) / (frN - 1));
    const fh = i % 2 === 0 ? 14 : 10;
    g.lineStyle(2, bdr, 1);
    g.moveTo(fx, frY);
    g.lineTo(fx, frY + fh);
    g.lineStyle(0);
  }

  charStage.addChild(g);
}

function drawYokozunaTsuna(cx, mawashiY, mw) {
  const g = new PIXI.Graphics();
  // 綱のウェーブライン
  g.lineStyle(4, 0xF5E5A0, 1);
  const wy = mawashiY - 2;
  g.moveTo(cx - mw/2 + 4, wy);
  for (let x = cx - mw/2 + 4; x < cx + mw/2 - 4; x += 8) {
    const phase = (x - cx) / 8;
    g.lineTo(x + 4, wy + (Math.sin(phase) * 3));
  }
  g.lineTo(cx + mw/2 - 4, wy);
  g.lineStyle(0);

  // 五幣（白い垂れ飾り）
  g.beginFill(0xFFFFF0);
  for (let i = -2; i <= 2; i++) {
    const fx = cx + i * 14;
    g.drawPolygon([fx - 4, wy, fx + 4, wy, fx + 3, wy + 14, fx - 3, wy + 14]);
  }
  g.endFill();

  charStage.addChild(g);
}

// ─── 首 ──────────────────────────────────────────
function drawNeck(cx, neckY, dims, d) {
  const nw = Math.round(16 + d.weight / 20);
  const nh = 14;
  const g  = new PIXI.Graphics();
  g.beginFill(dims.skin);
  g.drawRoundedRect(cx - nw/2, neckY, nw, nh, 3);
  g.endFill();
  charStage.addChild(g);
}

// ─── 頭・顔・髷 ──────────────────────────────────
function drawHead(cx, headTopY, headH, dims, d) {
  const headW    = Math.round(50 + d.weight / 20);
  const headMidY = headTopY + headH / 2;
  const skin     = dims.skin;
  const cond     = CONDITIONS[d.conditionIdx ?? 2];
  const isKanto  = d.divIdx >= DIV_JURYO;
  const isYoko   = d.divIdx >= DIV_YOKOZUNA;

  const g = new PIXI.Graphics();

  // ── 顔の輪郭 ──
  g.beginFill(skin);
  g.drawEllipse(cx, headMidY, headW/2, headH/2);
  g.endFill();

  // 顎の補強（下部に小楕円）
  g.beginFill(darken(skin, 0.04));
  g.drawEllipse(cx, headTopY + headH * 0.78, headW * 0.32, headH * 0.18);
  g.endFill();

  // 耳
  g.beginFill(darken(skin, 0.1));
  g.drawEllipse(cx - headW/2 + 2, headMidY + 2, 6, 9);
  g.drawEllipse(cx + headW/2 - 2, headMidY + 2, 6, 9);
  g.endFill();

  // ── 眉 ──
  const eyeY   = headTopY + headH * 0.45;
  const eyeLX  = cx - headW * 0.22;
  const eyeRX  = cx + headW * 0.22;
  const eyeW   = headW * 0.15;
  const browH  = d.conditionIdx <= 1 ? 2 : 0; // 不調時は眉が下がる

  g.lineStyle(2.5, 0x2a1a0a, 0.9);
  // 左眉
  g.moveTo(eyeLX - eyeW, eyeY - 12 + browH);
  g.bezierCurveTo(eyeLX - eyeW/2, eyeY - 16 + browH, eyeLX + eyeW/2, eyeY - 16 + browH, eyeLX + eyeW, eyeY - 12 + browH);
  // 右眉
  g.moveTo(eyeRX - eyeW, eyeY - 12 + browH);
  g.bezierCurveTo(eyeRX - eyeW/2, eyeY - 16 + browH, eyeRX + eyeW/2, eyeY - 16 + browH, eyeRX + eyeW, eyeY - 12 + browH);
  g.lineStyle(0);

  // ── 目 ──
  const lidH  = d.conditionIdx <= 1 ? 6 : 4; // 不調時まぶたが重い
  const eyeHH = d.conditionIdx >= 3 ? 6 : 5; // 好調時は目が大きい

  // 白目
  g.beginFill(0xFFFFF8);
  g.drawEllipse(eyeLX, eyeY, eyeW, eyeHH);
  g.drawEllipse(eyeRX, eyeY, eyeW, eyeHH);
  g.endFill();

  // 黒目・瞳
  g.beginFill(0x1a0a00);
  g.drawCircle(eyeLX + 1, eyeY + 1, eyeHH * 0.7);
  g.drawCircle(eyeRX - 1, eyeY + 1, eyeHH * 0.7);
  g.endFill();

  // 瞳の光
  g.beginFill(0xFFFFFF, 0.7);
  g.drawCircle(eyeLX + 2, eyeY, 1.5);
  g.drawCircle(eyeRX - 2, eyeY, 1.5);
  g.endFill();

  // まぶた（上）
  g.beginFill(darken(skin, 0.06), 0.6);
  g.drawEllipse(eyeLX, eyeY - eyeHH * 0.2, eyeW, lidH);
  g.drawEllipse(eyeRX, eyeY - eyeHH * 0.2, eyeW, lidH);
  g.endFill();

  // ── 鼻 ──
  const noseY = eyeY + headH * 0.14;
  g.beginFill(darken(skin, 0.18), 0.5);
  g.drawCircle(cx - 5, noseY, 3);
  g.drawCircle(cx + 5, noseY, 3);
  g.endFill();

  // ── 口 ──
  const mouthY = headTopY + headH * 0.72;
  const mw2    = headW * 0.25;
  g.lineStyle(2, 0x5a2a0a, 0.8);
  if (d.conditionIdx >= 3) {
    // 好調：微笑み
    g.moveTo(cx - mw2, mouthY);
    g.bezierCurveTo(cx - mw2/2, mouthY + 5, cx + mw2/2, mouthY + 5, cx + mw2, mouthY);
  } else if (d.conditionIdx <= 1) {
    // 不調：への字口
    g.moveTo(cx - mw2, mouthY + 3);
    g.bezierCurveTo(cx - mw2/2, mouthY - 2, cx + mw2/2, mouthY - 2, cx + mw2, mouthY + 3);
  } else {
    // 普通：真一文字
    g.moveTo(cx - mw2, mouthY);
    g.lineTo(cx + mw2, mouthY);
  }
  g.lineStyle(0);

  // ── 頬の赤み ──
  const blushAlpha = (d.conditionIdx >= 3) ? 0.35 : (d.conditionIdx <= 1) ? 0 : 0.20;
  if (blushAlpha > 0) {
    g.beginFill(0xFF9999, blushAlpha);
    g.drawEllipse(cx - headW * 0.3, eyeY + 6, 9, 6);
    g.drawEllipse(cx + headW * 0.3, eyeY + 6, 9, 6);
    g.endFill();
  }

  charStage.addChild(g);

  // ── 汗（スタミナ低下時） ──
  const stamRatio = d.stamina / (d.maxStamina || 100);
  if (stamRatio < 0.25) {
    const sg = new PIXI.Graphics();
    sg.beginFill(0x88CCFF, 0.7);
    sg.drawPolygon([cx + headW/2 - 4, eyeY - 5, cx + headW/2 + 2, eyeY - 5, cx + headW/2, eyeY + 2]);
    sg.drawPolygon([cx - headW/2 + 4, eyeY + 5, cx - headW/2 - 2, eyeY + 5, cx - headW/2, eyeY + 12]);
    sg.endFill();
    charStage.addChild(sg);
  }

  // ── 髷 ──
  drawMage(cx, headTopY, headH, headW, d, isKanto, isYoko);
}

function drawMage(cx, headTopY, headH, headW, d, isKanto, isYoko) {
  const g = new PIXI.Graphics();
  const stalkX = cx + headW * 0.05;
  const stalkTopY = headTopY - (isKanto ? 28 : 18);

  if (isYoko) {
    // 横綱：大銀杏＋白い飾り紐
    g.beginFill(0x1a1008);
    // 扇型（大銀杏）
    g.drawPolygon([
      cx - 18, headTopY - 2,
      cx - 6,  stalkTopY + 8,
      cx,      stalkTopY,
      cx + 6,  stalkTopY + 8,
      cx + 18, headTopY - 2,
      cx + 10, headTopY + 4,
      cx - 10, headTopY + 4,
    ]);
    g.endFill();
    // 飾り紐
    g.lineStyle(2, 0xFFFFF0, 0.9);
    g.drawCircle(cx, stalkTopY + 4, 5);
    g.lineStyle(0);
  } else if (isKanto) {
    // 大銀杏
    g.beginFill(0x1a1008);
    g.drawPolygon([
      cx - 14, headTopY - 2,
      cx - 5,  stalkTopY + 10,
      cx,      stalkTopY,
      cx + 5,  stalkTopY + 10,
      cx + 14, headTopY - 2,
      cx + 8,  headTopY + 4,
      cx - 8,  headTopY + 4,
    ]);
    g.endFill();
  } else {
    // ちょんまげ（幕下以下）
    g.beginFill(0x1a1008);
    g.drawRect(cx - 3, stalkTopY + 6, 6, headTopY - stalkTopY - 2);
    g.endFill();
    // 先端の束
    g.beginFill(0x1a1008);
    g.drawEllipse(cx, stalkTopY + 6, 8, 5);
    g.endFill();
  }

  charStage.addChild(g);
}

// ─── 状態アイコン ────────────────────────────────
function drawStatusIcons(cx, d) {
  const style = new PIXI.TextStyle({
    fontFamily: 'DotGothic16, sans-serif',
    fontSize:   11,
    fill:       CONDITIONS[d.conditionIdx ?? 2].color,
  });
  const cond = CONDITIONS[d.conditionIdx ?? 2];
  const condText = new PIXI.Text(cond.label, style);
  condText.anchor.set(0.5, 0);
  condText.x = cx;
  condText.y = 4;
  charStage.addChild(condText);

  // 怪我アイコン
  if (d.injuryLevel >= 1) {
    const injStyle = new PIXI.TextStyle({ fontFamily: 'sans-serif', fontSize: 14 });
    const injText  = new PIXI.Text(d.injuryLevel >= 2 ? '🤕' : '💢', injStyle);
    injText.x = CW - 28;
    injText.y = 4;
    charStage.addChild(injText);
  }
}

// ─── ユーティリティ ──────────────────────────────
function darken(hex, amount) {
  const r = (hex >> 16) & 0xFF;
  const g = (hex >> 8)  & 0xFF;
  const b =  hex        & 0xFF;
  const f = 1 - amount;
  return (Math.floor(r * f) << 16) | (Math.floor(g * f) << 8) | Math.floor(b * f);
}

// ─── アニメーション：ステータスUP弾み ────────────
export function animateBounce() {
  if (!charStage) return;
  let t = 0;
  const ticker = app.ticker.add(() => {
    t += 0.15;
    charStage.scale.set(1 + Math.sin(t) * 0.08 * Math.max(0, 1 - t / Math.PI));
    charStage.pivot.set(CW / 2, CH / 2);
    charStage.position.set(CW / 2, CH / 2);
    if (t >= Math.PI * 2) {
      charStage.scale.set(1);
      charStage.position.set(0, 0);
      charStage.pivot.set(0, 0);
      app.ticker.remove(ticker);
    }
  });
}

// ─── アニメーション：待機（左右に揺れる） ─────────
export function animateIdle() {
  if (!charStage) return;
  let t = 0;
  const ticker = app.ticker.add(() => {
    t += 0.03;
    charStage.position.x = Math.sin(t) * 2;
  });
  return () => app.ticker.remove(ticker);
}
