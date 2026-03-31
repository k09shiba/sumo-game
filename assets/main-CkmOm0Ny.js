import{G as i,b as k,s as T}from"./index-CEYR5qiW.js";import{T as M,b as u,w as S,C as $,d as m,e as E,F as L,D as y,K as g,f as A,I as H,P as j,g as N}from"./disciple-_UHwsf1a.js";import{g as F,r as P,u as D,b as R,a as G,d as O,c as q}from"./facility-omkSIHad.js";import{r as X}from"./events-BmjZ38u1.js";import{g as _}from"./basho-DOAzj99P.js";import{q as w,t as p}from"./modal-gNpRr-OF.js";import{r as U,i as W}from"./charRenderer-BrDw1Ccq.js";function K(t,n){const e=M.find(l=>l.id===n);if(!e)return{ok:!1,msg:"不明なコマンドです"};if(t.stamina<e.stamCost)return{ok:!1,msg:`スタミナが足りない！（必要:${e.stamCost}）`};t.stamina=u(t.stamina-e.stamCost,0,t.maxStamina);const s=1+i.facilities.dojo*.1,a=i.activeItems.chanko_plus&&n==="eat"?1.5:1,o=t.talent/100,r=200+(t.talent-50)*4,c=[];switch(n){case"oshi":{const l=Math.round(m(8,16)*s*o);t.power=u(t.power+l,0,r),t.styleXP.oshi=(t.styleXP.oshi||0)+10,t.styleXP.oshi>80&&t.sumoStyle!=="oshi"&&(t.sumoStyle="oshi",c.push("押し相撲が身についた！")),c.push(`筋力 +${l}`);break}case"yotsu":{const l=Math.round(m(8,16)*s*o);t.tech=u(t.tech+l,0,r),t.styleXP.yotsu=(t.styleXP.yotsu||0)+10,t.styleXP.yotsu>80&&t.sumoStyle!=="yotsu"&&(t.sumoStyle="yotsu",c.push("四つ相撲が身についた！")),c.push(`技術 +${l}`);break}case"nage":{const l=Math.round(m(5,11)*s*o);t.tech=u(t.tech+l,0,r),t.styleXP.tech=(t.styleXP.tech||0)+8;const d=m(1,2);t.weight=u(t.weight-d,60,250),c.push(`技術 +${l}、体重 -${d}kg`);break}case"run":{const l=Math.round(m(5,14)*s);t.maxStamina=u(t.maxStamina+l,0,200),t.weight=u(t.weight-1,60,250),c.push(`体力上限 +${l}、体重 -1kg`);break}case"mental":{const l=Math.round(m(8,16)*s*o),d=m(5,12);t.spirit=u(t.spirit+l,0,r),t.motivation=u(t.motivation+d,0,100),c.push(`精神 +${l}、やる気 +${d}`);break}case"diet":{const l=t.optimalWeight,d=t.weight-l;if(Math.abs(d)<=5)c.push("すでに適正体重！");else if(d>0){const h=Math.min(d,m(3,6));t.weight-=h,c.push(`体重 -${h}kg（適正体重へ近づいた）`)}else{const h=Math.min(-d,m(2,4));t.weight+=h,c.push(`体重 +${h}kg（適正体重へ近づいた）`)}break}case"group":{const l=i.facilities.dojo+1,d=Math.round(m(3,6)*l*o);t.power=u(t.power+d,0,r),t.tech=u(t.tech+d,0,r),t.spirit=u(t.spirit+d,0,r),c.push(`全ステ +${d}`);break}case"cond":{const l=t.conditionIdx;t.conditionIdx=u(t.conditionIdx+1,0,4),t.conditionIdx>l?c.push(`コンディション：${$[l].label} → ${$[t.conditionIdx].label}`):c.push("コンディションはすでに最高！");break}case"sleep":{t.stamina=t.maxStamina;const l=m(10,18);t.motivation=u(t.motivation+l,0,100),c.push(`スタミナ全回復！やる気 +${l}`);break}case"eat":{const l=1+i.facilities.kitchen*.2,d=S(t);let h,f;d==="optimal"?(h=m(2,4),f=Math.round(m(4,10)*l*a)):d==="overweight"?(h=m(1,2),f=Math.round(m(2,5)*l*a)):(h=m(3,6),f=Math.round(m(5,12)*l*a)),t.weight=u(t.weight+h,60,250),t.maxStamina=u(t.maxStamina+f,0,200),t.stamina=u(t.stamina+f,0,t.maxStamina),c.push(`体重 +${h}kg、体力 +${f}`);break}}return e.stamCost>0&&t.motivation<30&&c.push("やる気が低い…稽古の効果が薄い。"),t.injuryLevel>=1&&e.stamCost>=20&&(c.push("怪我が痛む…"),t.stamina=u(t.stamina-5,0,t.maxStamina)),V(t),{ok:!0,msgs:c}}function V(t){if(t.injuryLevel===0)return;const e=.15+i.facilities.medical*.12;return i.activeItems.kampo,Math.random()<e?(t.injuryLevel=Math.max(0,t.injuryLevel-1),`${t.name}の怪我が回復した！`):null}function v(){const t=document.getElementById("hd-info");if(!t)return;const n=i.month,e=i.year;t.textContent=`令和${e}年${n}月  💰${i.ryo}両`}function b(){const t=i.disciples[i.focusIdx];if(!t)return;U(t);const n=document.getElementById("tr-name");n&&(n.textContent=t.name);const e=document.getElementById("tr-rank");e&&(e.textContent=E(t));const s=document.getElementById("tr-cond");if(s){const a=$[t.conditionIdx??2];s.textContent=a.label,s.style.color=a.color}Y(t),z(t)}function Y(t){const n=document.getElementById("stat-bars");if(!n)return;const e=999,s=[{label:"筋力",val:t.power,max:e,col:"#c0392b"},{label:"技術",val:t.tech,max:e,col:"#2980b9"},{label:"精神",val:t.spirit,max:e,col:"#8e44ad"},{label:"体力",val:t.stamina,max:t.maxStamina,col:"#27ae60"},{label:"やる気",val:t.motivation,max:100,col:"#f39c12"},{label:"体重",val:`${t.weight}kg`,raw:!0}];if(n.innerHTML=s.map(o=>{if(o.raw){const c=S(t),l=c==="optimal"?"#27ae60":c==="overweight"?"#e74c3c":"#999";return`
        <div class="stat-row">
          <span class="stat-label">${o.label}</span>
          <span class="stat-raw" style="color:${l}">
            ${o.val}
            <small style="color:#aaa">（適正:${Math.round(t.optimalWeight)}kg）</small>
          </span>
        </div>`}const r=Math.min(100,Math.round(o.val/o.max*100));return`
      <div class="stat-row">
        <span class="stat-label">${o.label}</span>
        <div class="stat-bar-wrap">
          <div class="stat-bar-fill" style="width:${r}%;background:${o.col}"></div>
        </div>
        <span class="stat-val">${o.val}</span>
      </div>`}).join(""),t.divIdx>=4){const o=g.find(c=>c.id===t.keshoMawashi)||g[0],r=document.createElement("button");r.className="btn-sm kesho-btn",r.style.background=`#${o.col.toString(16).padStart(6,"0")}`,r.textContent=`🎽 ${o.name}`,r.onclick=()=>tt(i.focusIdx),n.appendChild(r)}const a=t.yushoRecord||[];if(a.length>0){const o={};a.forEach(c=>{o[c.divName]=(o[c.divName]||0)+1});const r=document.createElement("div");r.className="yusho-row",r.innerHTML=Object.entries(o).map(([c,l])=>`<span class="yusho-badge">🏆${c}×${l}</span>`).join(""),n.appendChild(r)}}function z(t){const n=document.getElementById("cmd-grid");if(!n)return;if(i.phase!=="main"){n.innerHTML="";return}n.innerHTML=M.map(s=>{const o=t.stamina>=s.stamCost?"":"disabled";return`
      <button class="cmd-btn ${o?"cmd-disabled":""}"
              onclick="handleTraining('${s.id}')"
              title="${s.desc}"
              ${o}>
        <span class="cmd-icon">${s.icon}</span>
        <span class="cmd-label">${s.label}</span>
        <span class="cmd-cost">${s.stamCost>0?`${s.stamCost}体`:"−"}</span>
      </button>`}).join("")}function J(t){if(t){if(i.disciples.length===0){t.innerHTML='<div class="empty-msg">弟子がいません。まず弟子を迎えましょう！</div>';return}t.innerHTML=i.disciples.map((n,e)=>{if(n.retired)return`
      <div class="disciple-card retired">
        <span>${n.name}（引退）</span>
        <small>最高位:${y[n.divIdx].short}　${n.totalWins}勝${n.totalLosses}敗</small>
      </div>`;const s=y[n.divIdx],a=$[n.conditionIdx??2];return`
      <div class="disciple-card ${i.focusIdx===e?"focused":""}"
           onclick="setFocusDisciple(${e})">
        <div class="dc-header">
          <strong>${n.name}</strong>
          <span class="dc-rank">${s.short}${n.pos}枚目</span>
          <span class="dc-cond" style="color:${a.color}">${a.label}</span>
        </div>
        <div class="dc-stats">
          <span>筋${n.power}</span>
          <span>技${n.tech}</span>
          <span>精${n.spirit}</span>
          <span>体${Math.round(n.stamina)}/${n.maxStamina}</span>
          <span>${n.weight}kg</span>
        </div>
        <div class="dc-info">
          ${n.injuryLevel>=1?`<span class="inj-badge">🤕${n.injuryLevel>=2?"重傷":"軽傷"}</span>`:""}
          ${n.divIdx>=4?'<span class="kanto-badge">関取</span>':""}
        </div>
        <div class="dc-actions">
          <button class="btn-sm" onclick="event.stopPropagation(); setFocusAndTab(${e}, 'train')">育成</button>
          <button class="btn-sm btn-retire" onclick="event.stopPropagation(); confirmRetire(${e})">引退</button>
        </div>
      </div>`}).join("")}}function I(t){if(!t)return;t.innerHTML="";const n=document.createElement("div");n.className="fac-section",n.innerHTML='<h3 class="section-title">施設強化</h3>';for(const[e,s]of Object.entries(L)){const a=i.facilities[e]??0,o=s.levels.length-1,r=a>=o,c=r?null:s.levels[a+1];n.innerHTML+=`
      <div class="fac-card">
        <div class="fac-top">
          <span>${s.icon} ${s.name}</span>
          <span class="fac-level">Lv${a+1} / ${o+1}</span>
        </div>
        <div class="fac-cur">${s.levels[a].label}：${s.levels[a].effect}</div>
        ${r?'<div class="fac-max">最大レベル達成！</div>':`<button class="btn btn-upgrade" onclick="doUpgradeFacility('${e}')">
            強化→${c.label}（${c.cost}両）
          </button>`}
      </div>`}t.appendChild(n),Q(t)}function Q(t){var e;const n=document.createElement("div");n.className="invest-section",n.innerHTML=`
    <h3 class="section-title">投資・強化メニュー</h3>
    <p class="section-note">選択中の弟子（${((e=i.disciples[i.focusIdx])==null?void 0:e.name)||"−"}）に適用</p>`,n.innerHTML+='<h4 class="sub-title">特別稽古（1場所限定）</h4>',n.innerHTML+=A.map(s=>{var c;const a=i.disciples[i.focusIdx],o=i.ryo>=s.cost,r=!((c=s.req)!=null&&c.minDiv)||a&&a.divIdx>=s.req.minDiv;return`
      <div class="invest-card ${!o||!r?"disabled":""}">
        <span>${s.icon} ${s.name}</span>
        <span class="invest-desc">${s.desc}</span>
        <button class="btn-sm" onclick="doBuySpecialTraining('${s.id}')"
          ${!o||!r?"disabled":""}>
          ${s.cost}両
        </button>
      </div>`}).join(""),n.innerHTML+='<h4 class="sub-title">道具・アイテム（次場所まで持続）</h4>',n.innerHTML+=H.map(s=>{const a=i.ryo>=s.cost,o=!!i.activeItems[s.id]||i.pendingItems.includes(s.id);return`
      <div class="invest-card ${o?"active-item":""} ${a?"":"disabled"}">
        <span>${s.icon} ${s.name}</span>
        <span class="invest-desc">${s.desc}</span>
        ${o?'<span class="active-badge">使用中</span>':`<button class="btn-sm" onclick="doBuyItem('${s.id}')" ${a?"":"disabled"}>${s.cost}両</button>`}
      </div>`}).join(""),n.innerHTML+='<h4 class="sub-title">部屋の名声施策</h4>',n.innerHTML+=j.map(s=>`
    <div class="invest-card ${i.ryo<s.cost?"disabled":""}">
      <span>${s.icon} ${s.name}</span>
      <span class="invest-desc">${s.desc}</span>
      <button class="btn-sm" onclick="doPrestigeAction('${s.id}')" ${i.ryo<s.cost?"disabled":""}>
        ${s.cost}両
      </button>
    </div>`).join(""),n.innerHTML+='<h4 class="sub-title">スカウト強化</h4>',n.innerHTML+=N.map(s=>`
    <div class="invest-card ${i.ryo<s.cost?"disabled":""}">
      <span>${s.icon} ${s.name}</span>
      <span class="invest-desc">${s.desc}</span>
      <button class="btn-sm" onclick="doScoutAction('${s.id}')" ${i.ryo<s.cost?"disabled":""}>
        ${s.cost}両
      </button>
    </div>`).join(""),t.appendChild(n)}function Z(t){if(!t)return;if(t.innerHTML='<h3 class="section-title">部屋の歴史</h3>',!i.history||i.history.length===0){t.innerHTML+='<div class="empty-msg">まだ記録がありません。</div>';return}const n=[...i.history].reverse();t.innerHTML+=n.map(e=>`
    <div class="history-entry">
      <span class="h-icon">${e.icon||"📌"}</span>
      <span class="h-date">${e.date}</span>
      <span class="h-text">${e.text}</span>
    </div>`).join("")}function x(t,n=""){const e=document.getElementById("msg-log");if(!e)return;const s=document.createElement("div");for(s.className=`msg ${n}`,s.textContent=t,e.prepend(s);e.children.length>30;)e.removeChild(e.lastChild)}function tt(t){var a;const n=i.disciples[t];if(!n||n.divIdx<4)return;const e=n.keshoMawashi||g[0].id,s=((a=g.find(o=>o.id===e))==null?void 0:a.name)||"赤獅子";w({em:"🎽",title:"化粧まわし変更",text:`現在：${s}
化粧まわしを選んでください。`,choices:g.map(o=>({label:`🎽 ${o.name}（${o.desc}）${o.id===e?" ◀現在":""}`,fn:()=>{n.keshoMawashi=o.id,k(),b()}}))})}function nt(){var e,s;const t=document.getElementById("screen-main");t.innerHTML=`
    <div class="main-wrap">
      <!-- ヘッダー -->
      <div class="main-header">
        <span id="stable-name">${i.stableName}</span>
        <span id="hd-info"></span>
        <button class="btn-sm btn-save" onclick="doSave()" title="セーブ">💾</button>
      </div>

      <!-- タブ -->
      <div class="tabs" id="main-tabs">
        <button class="tab active" data-tab="train">育成</button>
        <button class="tab" data-tab="list">弟子一覧</button>
        <button class="tab" data-tab="facility">施設</button>
        <button class="tab" data-tab="history">歴史</button>
      </div>

      <!-- 育成タブ -->
      <div id="tab-train" class="tab-content">
        <div class="train-layout">
          <!-- 左：キャラクター表示 -->
          <div class="char-panel">
            <div id="char-area" style="width:200px;height:300px;"></div>
            <div class="char-info">
              <div id="tr-name" class="char-name">名前</div>
              <div id="tr-rank" class="char-rank">番付</div>
              <div id="tr-cond" class="char-cond">普通</div>
            </div>
          </div>

          <!-- 右：ステータス・コマンド -->
          <div class="stat-panel">
            <div id="stat-bars"></div>
            <div id="cmd-grid" class="cmd-grid"></div>
          </div>
        </div>

        <!-- 弟子選択セレクタ -->
        <div id="disciple-selector" class="disc-selector"></div>

        <!-- 場所へのボタン -->
        <div class="basho-trigger-row">
          <div class="basho-info" id="next-basho-info"></div>
          <button class="btn btn-red btn-big" id="btn-go-basho">🏟 場所へ出場！</button>
          ${F()>i.disciples.filter(a=>!a.retired).length?'<button class="btn btn-recruit" id="btn-recruit">+ 弟子を迎える</button>':""}
        </div>

        <!-- メッセージログ -->
        <div id="msg-log" class="msg-log"></div>
      </div>

      <!-- 弟子一覧タブ -->
      <div id="tab-list" class="tab-content hidden">
        <div id="disciple-list"></div>
      </div>

      <!-- 施設タブ -->
      <div id="tab-facility" class="tab-content hidden">
        <div id="facility-content"></div>
      </div>

      <!-- 歴史タブ -->
      <div id="tab-history" class="tab-content hidden">
        <div id="history-content"></div>
      </div>
    </div>`,document.querySelectorAll(".tab").forEach(a=>{a.addEventListener("click",()=>B(a.dataset.tab))}),(e=document.getElementById("btn-go-basho"))==null||e.addEventListener("click",it),(s=document.getElementById("btn-recruit"))==null||s.addEventListener("click",()=>T("create"));const n=document.getElementById("char-area");n&&W(n),at(),v(),C(),b(),st()}function B(t){var n;switch(document.querySelectorAll(".tab").forEach(e=>e.classList.toggle("active",e.dataset.tab===t)),document.querySelectorAll(".tab-content").forEach(e=>e.classList.add("hidden")),(n=document.getElementById(`tab-${t}`))==null||n.classList.remove("hidden"),t){case"train":b();break;case"list":J(document.getElementById("disciple-list"));break;case"facility":I(document.getElementById("facility-content"));break;case"history":Z(document.getElementById("history-content"));break}}function C(){const t=document.getElementById("disciple-selector");if(!t)return;const n=i.disciples.filter(e=>!e.retired);if(n.length<=1){t.innerHTML="";return}t.innerHTML=n.map((e,s)=>{const a=i.disciples.indexOf(e);return`<button class="disc-sel-btn ${i.focusIdx===a?"active":""}"
              onclick="setFocusDisciple(${a})">${e.name}</button>`}).join("")}function st(){const t=document.getElementById("next-basho-info");if(!t)return;const n=_();t.textContent=`次の場所：令和${i.year}年${i.month}月　${n.name}（${n.place}）`}window.handleTraining=function(t){const n=i.disciples[i.focusIdx];if(!n||n.retired)return;const e=K(n,t);if(!e.ok){p(e.msg);return}e.msgs.forEach(s=>x(s)),Math.random()<.12&&X(n).forEach(a=>{x(`${a.icon} ${a.text}`,"mge"),w({em:a.icon,title:a.title,text:a.text})}),k(),v(),b()};window.setFocusDisciple=function(t){i.focusIdx=t,C(),b()};window.setFocusAndTab=function(t,n){i.focusIdx=t,B(n)};window.confirmRetire=function(t){const n=i.disciples[t];if(!n||n.retired)return;const e=y[n.divIdx];w({em:"🎋",title:`${n.name}を引退させますか？`,text:`最高位：${e.name}${n.pos}枚目
通算：${n.totalWins}勝${n.totalLosses}敗

本当に引退させますか？`,choices:[{label:"引退させる",cls:"btn-red",fn:()=>{et(n)}},{label:"まだ現役で",fn:()=>{}}]})};function et(t,n){var o;y[t.divIdx];let e="🎋",s="引退",a=`${t.name}は力士生活を終えた。
長い間お疲れ様でした。`;t.divIdx>=7?(e="👑",s="横綱引退・断髪式",a=`${t.name}が横綱として引退。断髪式が行われた。

伝説の横綱として永遠に語り継がれるだろう。`):t.divIdx>=5?(e="✂",s="断髪式",a=`${t.name}の断髪式が行われた。
多くのファンに見守られ、現役生活に幕を閉じた。`):t.divIdx>=4&&(e="✂",s="断髪式（関取として）",a=`関取として活躍した${t.name}が引退。
${((o=t.yushoRecord)==null?void 0:o.length)>0?`${t.yushoRecord.length}回の優勝を誇る名力士だった。`:"誠実な相撲で多くのファンを魅了した。"}`),w({em:e,title:s,text:a,onOk:()=>{P(t),i.focusIdx=i.disciples.findIndex(r=>!r.retired)||0,nt()}})}window.doUpgradeFacility=function(t){const n=D(t);if(!n.ok){p(n.msg);return}const e=L[t];p(`${e.name}を強化しました！`),v(),I(document.getElementById("facility-content"))};window.doBuyItem=function(t){const n=R(t);if(!n.ok){p(n.msg);return}p("アイテムを購入しました！"),v(),I(document.getElementById("facility-content"))};window.doBuySpecialTraining=function(t){const n=i.disciples[i.focusIdx],e=G(n,t);if(!e.ok){p(e.msg);return}e.msgs.forEach(s=>x(s,"mge")),p("特別稽古を実施しました！"),v(),b()};window.doPrestigeAction=function(t){const n=O(t);if(!n.ok){p(n.msg);return}p("施策を実施しました！"),v(),I(document.getElementById("facility-content"))};window.doScoutAction=function(t){const n=q(t);if(!n.ok){p(n.msg);return}p("スカウト施策を実施しました！"),v()};window.doSave=function(){k(),p("セーブしました！")};function it(){if(i.disciples.filter(n=>!n.retired).length===0){p("まず弟子を迎えてください！");return}i.phase="basho",T("basho")}function at(){window.handleTraining=window.handleTraining,window.setFocusDisciple=window.setFocusDisciple,window.setFocusAndTab=window.setFocusAndTab,window.confirmRetire=window.confirmRetire,window.doUpgradeFacility=window.doUpgradeFacility,window.doBuyItem=window.doBuyItem,window.doBuySpecialTraining=window.doBuySpecialTraining,window.doPrestigeAction=window.doPrestigeAction,window.doScoutAction=window.doScoutAction,window.doSave=window.doSave}export{nt as renderMain};
