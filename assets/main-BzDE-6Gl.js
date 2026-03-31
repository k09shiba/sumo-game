import{G as i,q as x,b as M,s as S,t as v,o as N}from"./index-CosIwvJz.js";import{T as E,d as L,e as m,w as B,C as I,f as p,g as R,P as z,D as g,h as C,K as w,i as D,I as F,j as O,k as _}from"./disciple-ItPjZfCN.js";import{g as q,r as X,u as G,b as U,a as W,d as K,c as V}from"./facility-B5FiZDS6.js";import{r as Y}from"./events-BemR4t1c.js";import{g as J}from"./basho-xtMNCeOa.js";import{r as Q,i as Z}from"./charRenderer-CfSmtn2f.js";function $(t,n,e){const s=t.personality;if(!s||s==="earnest")return Math.round(e*(s==="earnest"?1.25:1));if(s==="genius"){const a=Math.random();return a<.18?Math.max(1,Math.round(e*.3)):a>.82?Math.round(e*2.2):e}return s==="spiritual"?n==="spirit"||n==="motivation"?Math.round(e*1.5):e:s==="technical"&&n==="tech"?Math.round(e*1.5):e}function tt(t,n){var h;const e=E.find(d=>d.id===n);if(!e)return{ok:!1,msg:"不明なコマンドです"};if(t.stamina<e.stamCost)return{ok:!1,msg:`スタミナが足りない！（必要:${e.stamCost}）`};if(e.stamCost>0&&(i.trainTurnsLeft??L)<=0)return{ok:!1,msg:"今月の稽古は十分です！休養してください。"};t.stamina=m(t.stamina-e.stamCost,0,t.maxStamina);const s=1+i.facilities.dojo*.1,a=i.activeItems.chanko_plus&&n==="eat"?1.5:1,o=t.talent/100,l=200+(t.talent-50)*4,c=[];switch(n){case"oshi":{const d=$(t,"power",Math.round(p(8,16)*s*o));t.power=m(t.power+d,0,l),t.styleXP.oshi=(t.styleXP.oshi||0)+10,t.styleXP.oshi>80&&t.sumoStyle!=="oshi"&&(t.sumoStyle="oshi",c.push("押し相撲が身についた！")),c.push(`筋力 +${d}`);break}case"yotsu":{const d=$(t,"tech",Math.round(p(8,16)*s*o));t.tech=m(t.tech+d,0,l),t.styleXP.yotsu=(t.styleXP.yotsu||0)+10,t.styleXP.yotsu>80&&t.sumoStyle!=="yotsu"&&(t.sumoStyle="yotsu",c.push("四つ相撲が身についた！")),c.push(`技術 +${d}`);break}case"nage":{const d=$(t,"tech",Math.round(p(5,11)*s*o));t.tech=m(t.tech+d,0,l),t.styleXP.tech=(t.styleXP.tech||0)+8;const r=p(1,2);t.weight=m(t.weight-r,60,250),c.push(`技術 +${d}、体重 -${r}kg`);break}case"run":{const d=Math.round(p(5,14)*s);t.maxStamina=m(t.maxStamina+d,0,200),t.weight=m(t.weight-1,60,250),c.push(`体力上限 +${d}、体重 -1kg`);break}case"mental":{const d=$(t,"spirit",Math.round(p(8,16)*s*o)),r=$(t,"motivation",p(5,12));t.spirit=m(t.spirit+d,0,l),t.motivation=m(t.motivation+r,0,100),c.push(`精神 +${d}、やる気 +${r}`);break}case"diet":{const d=t.optimalWeight,r=t.weight-d;if(Math.abs(r)<=5)c.push("すでに適正体重！");else if(r>0){const u=Math.min(r,p(3,6));t.weight-=u,c.push(`体重 -${u}kg（適正体重へ近づいた）`)}else{const u=Math.min(-r,p(2,4));t.weight+=u,c.push(`体重 +${u}kg（適正体重へ近づいた）`)}break}case"group":{const d=i.facilities.dojo+1,r=$(t,"power",Math.round(p(3,6)*d*o));t.power=m(t.power+r,0,l),t.tech=m(t.tech+r,0,l),t.spirit=m(t.spirit+r,0,l),c.push(`全ステ +${r}`);break}case"cond":{const d=t.conditionIdx;t.conditionIdx=m(t.conditionIdx+1,0,4),t.conditionIdx>d?c.push(`コンディション：${I[d].label} → ${I[t.conditionIdx].label}`):c.push("コンディションはすでに最高！");break}case"sleep":{const d=Math.round(t.maxStamina*.65),r=Math.max(0,d-t.stamina);t.stamina=m(t.stamina+r,0,t.maxStamina);const u=p(10,18);t.motivation=m(t.motivation+u,0,100),c.push(`スタミナ回復（+${r}）、やる気 +${u}`);break}case"eat":{const d=1+i.facilities.kitchen*.2,r=B(t);let u,f;r==="optimal"?(u=p(2,4),f=Math.round(p(4,10)*d*a)):r==="overweight"?(u=p(1,2),f=Math.round(p(2,5)*d*a)):(u=p(3,6),f=Math.round(p(5,12)*d*a)),t.weight=m(t.weight+u,60,250),t.maxStamina=m(t.maxStamina+f,0,200),t.stamina=m(t.stamina+f,0,t.maxStamina),c.push(`体重 +${u}kg、体力 +${f}`);break}}if(e.stamCost>0&&(i.trainTurnsLeft=Math.max(0,(i.trainTurnsLeft??L)-1)),t.personality==="genius"&&c.length>0){const d=parseInt(((h=c[0].match(/\d+/))==null?void 0:h[0])||"0"),r=12;d>r*1.8?c.unshift("✨ 天才的なひらめき！大爆発！"):d<r*.5&&d>0&&c.unshift("😓 今日はイマイチ…")}return e.stamCost>0&&t.motivation<30&&c.push("やる気が低い…稽古の効果が薄い。"),t.injuryLevel>=1&&e.stamCost>=20&&(c.push("怪我が痛む…"),t.stamina=m(t.stamina-5,0,t.maxStamina)),nt(t),{ok:!0,msgs:c}}function nt(t){if(t.injuryLevel===0)return;const e=.15+i.facilities.medical*.12;return i.activeItems.kampo,Math.random()<e?(t.injuryLevel=Math.max(0,t.injuryLevel-1),`${t.name}の怪我が回復した！`):null}function b(){const t=document.getElementById("hd-info");if(!t)return;const n=i.month,e=i.year;t.textContent=`令和${e}年${n}月  💰${i.ryo}両`}function y(){const t=i.disciples[i.focusIdx];if(!t)return;Q(t);const n=document.getElementById("tr-name");n&&(n.textContent=t.name);const e=document.getElementById("tr-rank");e&&(e.textContent=R(t));const s=document.getElementById("tr-cond");if(s){const l=I[t.conditionIdx??2];let c=l.label;if(t.injuryLevel>=1){const h=`${t.injuryPart?t.injuryPart+"の":""}${t.injuryLevel>=2?"重傷":"軽傷"}`;c+=` 🤕${h}`}s.textContent=c,s.style.color=t.injuryLevel>=1?"#e74c3c":l.color}const a=document.getElementById("tr-personality");if(a){const l=z.find(c=>c.id===t.personality);l&&(a.textContent=`${l.icon} ${l.name}`)}const o=document.getElementById("train-turns-info");if(o){const l=i.trainTurnsLeft??10,c=l<=2?"#e74c3c":l<=4?"#e67e22":"#27ae60";o.innerHTML=`<span class="turns-label">稽古残り</span> <span class="turns-count" style="color:${c}">${l}</span><span class="turns-label"> / 10回</span>`}st(t),et(t)}function st(t){const n=document.getElementById("stat-bars");if(!n)return;const e=999,s=[{label:"筋力",val:t.power,max:e,col:"#c0392b"},{label:"技術",val:t.tech,max:e,col:"#2980b9"},{label:"精神",val:t.spirit,max:e,col:"#8e44ad"},{label:"体力",val:t.stamina,max:t.maxStamina,col:"#27ae60"},{label:"やる気",val:t.motivation,max:100,col:"#f39c12"},{label:"体重",val:`${t.weight}kg`,raw:!0}];if(n.innerHTML=s.map(o=>{if(o.raw){const c=B(t),h=c==="optimal"?"#27ae60":c==="overweight"?"#e74c3c":"#999";return`
        <div class="stat-row">
          <span class="stat-label">${o.label}</span>
          <span class="stat-raw" style="color:${h}">
            ${o.val}
            <small style="color:#aaa">（適正:${Math.round(t.optimalWeight)}kg）</small>
          </span>
        </div>`}const l=Math.min(100,Math.round(o.val/o.max*100));return`
      <div class="stat-row">
        <span class="stat-label">${o.label}</span>
        <div class="stat-bar-wrap">
          <div class="stat-bar-fill" style="width:${l}%;background:${o.col}"></div>
        </div>
        <span class="stat-val">${o.val}</span>
      </div>`}).join(""),t.divIdx>=4){const o=w.find(c=>c.id===t.keshoMawashi)||w[0],l=document.createElement("button");l.className="btn-sm kesho-btn",l.style.background=`#${o.col.toString(16).padStart(6,"0")}`,l.textContent=`🎽 ${o.name}`,l.onclick=()=>ct(i.focusIdx),n.appendChild(l)}const a=t.yushoRecord||[];if(a.length>0){const o={};a.forEach(c=>{o[c.divName]=(o[c.divName]||0)+1});const l=document.createElement("div");l.className="yusho-row",l.innerHTML=Object.entries(o).map(([c,h])=>`<span class="yusho-badge">🏆${c}×${h}</span>`).join(""),n.appendChild(l)}}function et(t){const n=document.getElementById("cmd-grid");if(!n)return;if(i.phase!=="main"){n.innerHTML="";return}n.innerHTML=E.map(s=>{const o=t.stamina>=s.stamCost?"":"disabled";return`
      <button class="cmd-btn ${o?"cmd-disabled":""}"
              onclick="handleTraining('${s.id}')"
              title="${s.desc}"
              ${o}>
        <span class="cmd-icon">${s.icon}</span>
        <span class="cmd-label">${s.label}</span>
        <span class="cmd-cost">${s.stamCost>0?`${s.stamCost}体`:"−"}</span>
      </button>`}).join("")}function it(t){if(t){if(i.disciples.length===0){t.innerHTML='<div class="empty-msg">弟子がいません。まず弟子を迎えましょう！</div>';return}t.innerHTML=i.disciples.map((n,e)=>{if(n.retired)return`
      <div class="disciple-card retired">
        <span>${n.name}（引退）</span>
        <small>最高位:${g[n.divIdx].short}　${n.totalWins}勝${n.totalLosses}敗</small>
      </div>`;const s=g[n.divIdx],a=I[n.conditionIdx??2];return`
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
          ${n.injuryLevel>=1?`<span class="inj-badge">🤕${n.injuryPart?n.injuryPart+"の":""}${n.injuryLevel>=2?"重傷":"軽傷"}</span>`:""}
          ${n.divIdx>=4?'<span class="kanto-badge">関取</span>':""}
        </div>
        <div class="dc-actions">
          <button class="btn-sm" onclick="event.stopPropagation(); setFocusAndTab(${e}, 'train')">育成</button>
          <button class="btn-sm btn-retire" onclick="event.stopPropagation(); confirmRetire(${e})">引退</button>
        </div>
      </div>`}).join("")}}function k(t){if(!t)return;t.innerHTML="";const n=document.createElement("div");n.className="fac-section",n.innerHTML='<h3 class="section-title">施設強化</h3>';for(const[e,s]of Object.entries(C)){const a=i.facilities[e]??0,o=s.levels.length-1,l=a>=o,c=l?null:s.levels[a+1];n.innerHTML+=`
      <div class="fac-card">
        <div class="fac-top">
          <span>${s.icon} ${s.name}</span>
          <span class="fac-level">Lv${a+1} / ${o+1}</span>
        </div>
        <div class="fac-cur">${s.levels[a].label}：${s.levels[a].effect}</div>
        ${l?'<div class="fac-max">最大レベル達成！</div>':`<button class="btn btn-upgrade" onclick="doUpgradeFacility('${e}')">
            強化→${c.label}（${c.cost}両）
          </button>`}
      </div>`}t.appendChild(n),at(t)}function at(t){var e;const n=document.createElement("div");n.className="invest-section",n.innerHTML=`
    <h3 class="section-title">投資・強化メニュー</h3>
    <p class="section-note">選択中の弟子（${((e=i.disciples[i.focusIdx])==null?void 0:e.name)||"−"}）に適用</p>`,n.innerHTML+='<h4 class="sub-title">特別稽古（1場所限定）</h4>',n.innerHTML+=D.map(s=>{var c;const a=i.disciples[i.focusIdx],o=i.ryo>=s.cost,l=!((c=s.req)!=null&&c.minDiv)||a&&a.divIdx>=s.req.minDiv;return`
      <div class="invest-card ${!o||!l?"disabled":""}">
        <span>${s.icon} ${s.name}</span>
        <span class="invest-desc">${s.desc}</span>
        <button class="btn-sm" onclick="doBuySpecialTraining('${s.id}')"
          ${!o||!l?"disabled":""}>
          ${s.cost}両
        </button>
      </div>`}).join(""),n.innerHTML+='<h4 class="sub-title">道具・アイテム（次場所まで持続）</h4>',n.innerHTML+=F.map(s=>{const a=i.ryo>=s.cost,o=!!i.activeItems[s.id]||i.pendingItems.includes(s.id);return`
      <div class="invest-card ${o?"active-item":""} ${a?"":"disabled"}">
        <span>${s.icon} ${s.name}</span>
        <span class="invest-desc">${s.desc}</span>
        ${o?'<span class="active-badge">使用中</span>':`<button class="btn-sm" onclick="doBuyItem('${s.id}')" ${a?"":"disabled"}>${s.cost}両</button>`}
      </div>`}).join(""),n.innerHTML+='<h4 class="sub-title">部屋の名声施策</h4>',n.innerHTML+=O.map(s=>`
    <div class="invest-card ${i.ryo<s.cost?"disabled":""}">
      <span>${s.icon} ${s.name}</span>
      <span class="invest-desc">${s.desc}</span>
      <button class="btn-sm" onclick="doPrestigeAction('${s.id}')" ${i.ryo<s.cost?"disabled":""}>
        ${s.cost}両
      </button>
    </div>`).join(""),n.innerHTML+='<h4 class="sub-title">スカウト強化</h4>',n.innerHTML+=_.map(s=>`
    <div class="invest-card ${i.ryo<s.cost?"disabled":""}">
      <span>${s.icon} ${s.name}</span>
      <span class="invest-desc">${s.desc}</span>
      <button class="btn-sm" onclick="doScoutAction('${s.id}')" ${i.ryo<s.cost?"disabled":""}>
        ${s.cost}両
      </button>
    </div>`).join(""),t.appendChild(n)}function ot(t){if(!t)return;if(t.innerHTML='<h3 class="section-title">部屋の歴史</h3>',!i.history||i.history.length===0){t.innerHTML+='<div class="empty-msg">まだ記録がありません。</div>';return}const n=[...i.history].reverse();t.innerHTML+=n.map(e=>`
    <div class="history-entry">
      <span class="h-icon">${e.icon||"📌"}</span>
      <span class="h-date">${e.date}</span>
      <span class="h-text">${e.text}</span>
    </div>`).join("")}function T(t,n=""){const e=document.getElementById("msg-log");if(!e)return;const s=document.createElement("div");for(s.className=`msg ${n}`,s.textContent=t,e.prepend(s);e.children.length>30;)e.removeChild(e.lastChild)}function ct(t){var a;const n=i.disciples[t];if(!n||n.divIdx<4)return;const e=n.keshoMawashi||w[0].id,s=((a=w.find(o=>o.id===e))==null?void 0:a.name)||"赤獅子";x({em:"🎽",title:"化粧まわし変更",text:`現在：${s}
化粧まわしを選んでください。`,choices:w.map(o=>({label:`🎽 ${o.name}（${o.desc}）${o.id===e?" ◀現在":""}`,fn:()=>{n.keshoMawashi=o.id,M(),y()}}))})}function rt(t){if(!t)return;const n=t;n.innerHTML=`<h3 class="section-title">番付表 ─ 令和${i.year}年${i.month}月</h3>`;const e=i.disciples.filter(a=>!a.retired),s=i.rival;if(i.sponsors&&i.sponsors.length>0){const a=document.createElement("div");a.className="sponsor-list",a.innerHTML=`<h4 class="sub-title">現スポンサー（${i.sponsors.length}社）</h4>`,a.innerHTML+=i.sponsors.map(o=>`<div class="sponsor-row"><span>${o.icon} ${o.name}</span><span class="sponsor-income">+${o.income}両/場所</span></div>`).join(""),n.appendChild(a)}for(let a=g.length-1;a>=0;a--){const o=g[a],l=e.filter(r=>r.divIdx===a),c=s&&s.divIdx===a;if(l.length===0&&!c){const r=document.createElement("div");r.className="banzuke-section banzuke-empty-section",r.innerHTML=`<div class="banzuke-div-name">${o.name}</div><div class="banzuke-no-member">（所属力士なし）</div>`,n.appendChild(r);continue}const h=document.createElement("div");h.className="banzuke-section",h.innerHTML=`<div class="banzuke-div-name">${o.name}</div>`,[...l.map(r=>({name:r.name,pos:r.pos,isPlayer:!0,d:r})),...c?[{name:s.name,pos:s.pos,isRival:!0}]:[]].sort((r,u)=>r.pos-u.pos).forEach(r=>{const u=r.isPlayer&&i.focusIdx===i.disciples.indexOf(r.d),f=r.isPlayer?u?"⭐":"★":"⚔",j=r.isPlayer?"banzuke-player"+(u?" banzuke-focus":""):"banzuke-rival",P=r.isPlayer?`${r.d.wins}勝${r.d.losses}敗`:"";h.innerHTML+=`
        <div class="banzuke-row ${j}">
          <span class="banzuke-pos">${o.name}${r.pos}枚目</span>
          <span class="banzuke-name">${f} ${r.name}</span>
          ${r.isPlayer?`<span class="banzuke-record">${P}</span>`:'<span class="banzuke-rival-badge">ライバル</span>'}
        </div>`}),n.appendChild(h)}}function lt(){var e,s;const t=document.getElementById("screen-main");t.innerHTML=`
    <div class="main-wrap">
      <!-- ヘッダー -->
      <div class="main-header">
        <span id="stable-name">${i.stableName}</span>
        <span id="hd-info"></span>
        <button class="btn-sm btn-save" onclick="doSave()" title="セーブ">💾</button>
        <button class="btn-sm btn-settings" onclick="openSettings()" title="設定">⚙</button>
      </div>

      <!-- タブ -->
      <div class="tabs" id="main-tabs">
        <button class="tab active" data-tab="train">育成</button>
        <button class="tab" data-tab="list">弟子一覧</button>
        <button class="tab" data-tab="facility">施設</button>
        <button class="tab" data-tab="history">歴史</button>
        <button class="tab" data-tab="banzuke">番付表</button>
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
              <div id="tr-personality" class="char-pers"></div>
            </div>
          </div>

          <!-- 右：ステータス・コマンド -->
          <div class="stat-panel">
            <div id="stat-bars"></div>
            <div id="cmd-grid" class="cmd-grid"></div>
            <div id="train-turns-info" class="train-turns-info"></div>
          </div>
        </div>

        <!-- 弟子選択セレクタ -->
        <div id="disciple-selector" class="disc-selector"></div>

        <!-- 場所へのボタン -->
        <div class="basho-trigger-row">
          <div class="basho-info" id="next-basho-info"></div>
          <button class="btn btn-red btn-big" id="btn-go-basho">🏟 場所へ出場！</button>
          ${q()>i.disciples.filter(a=>!a.retired).length?'<button class="btn btn-recruit" id="btn-recruit">+ 弟子を迎える</button>':""}
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

      <!-- 番付表タブ -->
      <div id="tab-banzuke" class="tab-content hidden">
        <div id="banzuke-content"></div>
      </div>
    </div>`,document.querySelectorAll(".tab").forEach(a=>{a.addEventListener("click",()=>H(a.dataset.tab))}),(e=document.getElementById("btn-go-basho"))==null||e.addEventListener("click",mt),(s=document.getElementById("btn-recruit"))==null||s.addEventListener("click",()=>S("create"));const n=document.getElementById("char-area");n&&Z(n),pt(),b(),A(),y(),dt()}function H(t){var n;switch(document.querySelectorAll(".tab").forEach(e=>e.classList.toggle("active",e.dataset.tab===t)),document.querySelectorAll(".tab-content").forEach(e=>e.classList.add("hidden")),(n=document.getElementById(`tab-${t}`))==null||n.classList.remove("hidden"),t){case"train":y();break;case"list":it(document.getElementById("disciple-list"));break;case"facility":k(document.getElementById("facility-content"));break;case"history":ot(document.getElementById("history-content"));break;case"banzuke":rt(document.getElementById("banzuke-content"));break}}function A(){const t=document.getElementById("disciple-selector");if(!t)return;const n=i.disciples.filter(e=>!e.retired);if(n.length<=1){t.innerHTML="";return}t.innerHTML=n.map((e,s)=>{const a=i.disciples.indexOf(e);return`<button class="disc-sel-btn ${i.focusIdx===a?"active":""}"
              onclick="setFocusDisciple(${a})">${e.name}</button>`}).join("")}function dt(){const t=document.getElementById("next-basho-info");if(!t)return;const n=J();t.textContent=`次の場所：令和${i.year}年${i.month}月　${n.name}（${n.place}）`}window.handleTraining=function(t){const n=i.disciples[i.focusIdx];if(!n||n.retired)return;const e=tt(n,t);if(!e.ok){v(e.msg);return}e.msgs.forEach(s=>T(s)),Math.random()<.12&&Y(n).forEach(a=>{T(`${a.icon} ${a.text}`,"mge"),x({em:a.icon,title:a.title,text:a.text})}),M(),b(),y()};window.setFocusDisciple=function(t){i.focusIdx=t,A(),y()};window.setFocusAndTab=function(t,n){i.focusIdx=t,H(n)};window.confirmRetire=function(t){const n=i.disciples[t];if(!n||n.retired)return;const e=g[n.divIdx];x({em:"🎋",title:`${n.name}を引退させますか？`,text:`最高位：${e.name}${n.pos}枚目
通算：${n.totalWins}勝${n.totalLosses}敗

本当に引退させますか？`,choices:[{label:"引退させる",cls:"btn-red",fn:()=>{ut(n)}},{label:"まだ現役で",fn:()=>{}}]})};function ut(t,n){var o;g[t.divIdx];let e="🎋",s="引退",a=`${t.name}は力士生活を終えた。
長い間お疲れ様でした。`;t.divIdx>=7?(e="👑",s="横綱引退・断髪式",a=`${t.name}が横綱として引退。断髪式が行われた。

伝説の横綱として永遠に語り継がれるだろう。`):t.divIdx>=5?(e="✂",s="断髪式",a=`${t.name}の断髪式が行われた。
多くのファンに見守られ、現役生活に幕を閉じた。`):t.divIdx>=4&&(e="✂",s="断髪式（関取として）",a=`関取として活躍した${t.name}が引退。
${((o=t.yushoRecord)==null?void 0:o.length)>0?`${t.yushoRecord.length}回の優勝を誇る名力士だった。`:"誠実な相撲で多くのファンを魅了した。"}`),x({em:e,title:s,text:a,onOk:()=>{X(t),i.focusIdx=i.disciples.findIndex(l=>!l.retired)||0,lt()}})}window.doUpgradeFacility=function(t){const n=G(t);if(!n.ok){v(n.msg);return}const e=C[t];v(`${e.name}を強化しました！`),b(),k(document.getElementById("facility-content"))};window.doBuyItem=function(t){const n=U(t);if(!n.ok){v(n.msg);return}v("アイテムを購入しました！"),b(),k(document.getElementById("facility-content"))};window.doBuySpecialTraining=function(t){const n=i.disciples[i.focusIdx],e=W(n,t);if(!e.ok){v(e.msg);return}e.msgs.forEach(s=>T(s,"mge")),v("特別稽古を実施しました！"),b(),y()};window.doPrestigeAction=function(t){const n=K(t);if(!n.ok){v(n.msg);return}v("施策を実施しました！"),b(),k(document.getElementById("facility-content"))};window.doScoutAction=function(t){const n=V(t);if(!n.ok){v(n.msg);return}v("スカウト施策を実施しました！"),b()};window.doSave=function(){M(),v("セーブしました！")};function mt(){if(i.disciples.filter(n=>!n.retired).length===0){v("まず弟子を迎えてください！");return}i.phase="basho",S("basho")}function pt(){window.openSettings=N,window.handleTraining=window.handleTraining,window.setFocusDisciple=window.setFocusDisciple,window.setFocusAndTab=window.setFocusAndTab,window.confirmRetire=window.confirmRetire,window.doUpgradeFacility=window.doUpgradeFacility,window.doBuyItem=window.doBuyItem,window.doBuySpecialTraining=window.doBuySpecialTraining,window.doPrestigeAction=window.doPrestigeAction,window.doScoutAction=window.doScoutAction,window.doSave=window.doSave}export{lt as renderMain};
