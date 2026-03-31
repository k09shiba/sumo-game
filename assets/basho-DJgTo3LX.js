import{G as e,b as r,s as l}from"./index-dno3a5Ew.js";import{D as d,C as h}from"./disciple-B56uESAJ.js";import{g as m,s as v,a as u}from"./basho-BDhVYfye.js";import{i as b,r as p}from"./charRenderer-CIeJ27gz.js";import{t as $}from"./modal-gNpRr-OF.js";let o=null,c=null;function S(){var t;o=m(),v();const s=document.getElementById("screen-basho");s.innerHTML=`
    <div class="basho-wrap">
      <div class="basho-header">
        <h2>令和${e.year}年${e.month}月　${o.name}</h2>
        <div class="basho-place">${o.place}</div>
        <button class="btn-sm btn-save" onclick="doSave()">💾</button>
      </div>

      <!-- 力士の出場確認 -->
      <div class="basho-lineup" id="basho-lineup"></div>

      <!-- 取組開始 -->
      <div class="basho-start-row">
        <button class="btn btn-red btn-big" id="btn-start-basho">🥁 取組開始！</button>
        <button class="btn btn-back" onclick="cancelBasho()">← 戻る</button>
      </div>
    </div>`,f(),(t=document.getElementById("btn-start-basho"))==null||t.addEventListener("click",w),window.doSave=()=>{r(),$("セーブしました！")},window.cancelBasho=()=>{e.phase="main",l("main")}}function f(){const s=document.getElementById("basho-lineup");if(!s)return;const t=e.disciples.filter(n=>!n.retired);if(s.innerHTML='<h3 class="section-title">出場力士</h3>',s.innerHTML+=t.map(n=>{const i=d[n.divIdx],a=h[n.conditionIdx??2];return`
      <div class="lineup-card">
        <div class="lc-name">${n.name}</div>
        <div class="lc-rank">${i.name}${n.pos}枚目（${i.matches}番）</div>
        <div class="lc-cond" style="color:${a.color}">体調：${a.label}</div>
        ${n.injuryLevel>=1?`<div class="lc-inj">🤕 ${n.injuryLevel>=2?"重傷":"軽傷"}あり</div>`:""}
      </div>`}).join(""),e.rival){const n=e.rival,i=d[n.divIdx];s.innerHTML+=`
      <div class="rival-info">
        ⚔ ライバル：${n.name}（${i.name}${n.pos}枚目）が同じ場所に出場中
      </div>`}}async function w(){const s=document.getElementById("btn-start-basho");s&&(s.disabled=!0),c={};for(const t of e.disciples)t.retired||(c[t.id]=u(t));e.phase="results",e.currentBashoResults=c,r(),I()}function I(){var i;const s=e.disciples.find(a=>!a.retired);if(!s){l("results");return}const t=c[s.id]||[],n=document.getElementById("screen-basho");n.innerHTML=`
    <div class="basho-wrap">
      <div class="basho-header">
        <h2>${o.name}　${s.name}の取組</h2>
      </div>

      <!-- キャラクター -->
      <div id="basho-char" style="width:200px;height:300px;margin:0 auto 12px;"></div>

      <!-- 取組結果 -->
      <div class="match-list" id="match-list">
        ${t.map(a=>`
          <div class="match-row ${a.won?"win":"loss"}">
            <span class="match-day">${a.day}日目</span>
            <span class="match-result">${a.won?"○勝":"●負"}</span>
            <span class="match-waza">${a.waza}</span>
            <span class="match-score">${a.cumWins}勝${a.cumLosses}敗</span>
          </div>`).join("")}
      </div>

      <div class="basho-final">
        <strong>${s.name}：${s.wins}勝${s.losses}敗</strong>
        ${s.wins>s.losses?"🎉 勝ち越し！":s.wins===s.losses?"五分":"😔 負け越し..."}
      </div>

      <button class="btn btn-red btn-big" id="btn-to-results">結果発表へ →</button>
    </div>`,b(document.getElementById("basho-char")),p(s),(i=document.getElementById("btn-to-results"))==null||i.addEventListener("click",()=>l("results"))}export{S as renderBasho};
