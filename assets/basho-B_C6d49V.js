import{G as e,b as r,t as m,s as l}from"./index-DbcorYze.js";import{D as d,C as h}from"./disciple-CUbkEey9.js";import{g as v,s as u,a as b}from"./basho-DhszNWw1.js";import{i as p,r as $}from"./charRenderer-DMJ0wO-r.js";let o=null,c=null;function E(){var a;o=v(),u();const s=document.getElementById("screen-basho");s.innerHTML=`
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
    </div>`,f(),(a=document.getElementById("btn-start-basho"))==null||a.addEventListener("click",y),window.doSave=()=>{r(),m("セーブしました！")},window.cancelBasho=()=>{e.phase="main",l("main")}}function f(){const s=document.getElementById("basho-lineup");if(!s)return;const a=e.disciples.filter(n=>!n.retired);if(s.innerHTML='<h3 class="section-title">出場力士</h3>',s.innerHTML+=a.map(n=>{const i=d[n.divIdx],t=h[n.conditionIdx??2];return`
      <div class="lineup-card">
        <div class="lc-name">${n.name}</div>
        <div class="lc-rank">${i.name}${n.pos}枚目（${i.matches}番）</div>
        <div class="lc-cond" style="color:${t.color}">体調：${t.label}</div>
        ${n.injuryLevel>=1?`<div class="lc-inj">🤕 ${n.injuryPart?n.injuryPart+"の":""}${n.injuryLevel>=2?"重傷":"軽傷"}あり</div>`:""}
      </div>`}).join(""),e.rival){const n=e.rival,i=d[n.divIdx];s.innerHTML+=`
      <div class="rival-info">
        ⚔ ライバル：${n.name}（${i.name}${n.pos}枚目）が同じ場所に出場中
      </div>`}}async function y(){const s=document.getElementById("btn-start-basho");s&&(s.disabled=!0),c={};for(const a of e.disciples)a.retired||(c[a.id]=b(a));e.phase="results",e.currentBashoResults=c,r(),w()}function w(){var i;const s=e.disciples.find(t=>!t.retired);if(!s){l("results");return}const a=c[s.id]||[],n=document.getElementById("screen-basho");n.innerHTML=`
    <div class="basho-wrap">
      <div class="basho-header">
        <h2>${o.name}　${s.name}の取組</h2>
      </div>

      <!-- キャラクター -->
      <div id="basho-char" style="width:200px;height:300px;margin:0 auto 12px;"></div>

      <!-- 取組結果 -->
      <div class="match-list" id="match-list">
        ${a.map(t=>`
          <div class="match-row ${t.won?"win":"loss"}">
            <div class="match-row-top">
              <span class="match-day">${t.day}日目</span>
              <span class="match-result">${t.won?"○勝":"●負"}</span>
              <span class="match-score">${t.cumWins}勝${t.cumLosses}敗</span>
            </div>
            <div class="match-commentary">${t.commentary||t.waza}</div>
          </div>`).join("")}
      </div>

      <div class="basho-final">
        <strong>${s.name}：${s.wins}勝${s.losses}敗</strong>
        ${s.wins>s.losses?"🎉 勝ち越し！":s.wins===s.losses?"五分":"😔 負け越し..."}
      </div>

      <button class="btn btn-red btn-big" id="btn-to-results">結果発表へ →</button>
    </div>`,p(document.getElementById("basho-char")),$(s),(i=document.getElementById("btn-to-results"))==null||i.addEventListener("click",()=>l("results"))}export{E as renderBasho};
