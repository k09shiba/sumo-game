import{G as o,q as x,b as S,s as B,t as v,o as D}from"./index-YmVs4F7q.js";import{T as H,f as C,g as p,w as j,C as I,h,i as A,j as z,P as F,D as b,k as P,K as w,l as O,I as _,m as X,n as q}from"./disciple-CUbkEey9.js";import{g as U,r as G,u as W,b as K,a as V,d as Y,c as J}from"./facility-D9nsbDoR.js";import{r as Q}from"./events-CYp5Kth3.js";import{g as Z}from"./basho-BWVitHAs.js";import{r as tt,i as nt}from"./charRenderer-DwkIIPH2.js";function $(t,n,e){const s=t.personality;if(!s||s==="earnest")return Math.round(e*(s==="earnest"?1.25:1));if(s==="genius"){const i=Math.random();return i<.18?Math.max(1,Math.round(e*.3)):i>.82?Math.round(e*2.2):e}return s==="spiritual"?n==="spirit"||n==="motivation"?Math.round(e*1.5):e:s==="technical"&&n==="tech"?Math.round(e*1.5):e}function st(t,n){var m;const e=H.find(r=>r.id===n);if(!e)return{ok:!1,msg:"不明なコマンドです"};if(t.stamina<e.stamCost)return{ok:!1,msg:`スタミナが足りない！（必要:${e.stamCost}）`};if(e.stamCost>0&&(o.trainTurnsLeft??C)<=0)return{ok:!1,msg:"今月の稽古は十分です！休養してください。"};t.stamina=p(t.stamina-e.stamCost,0,t.maxStamina);const s=1+o.facilities.dojo*.1,i=o.activeItems.chanko_plus&&n==="eat"?1.5:1,a=t.talent/100,d=200+(t.talent-50)*4,c=[];switch(n){case"oshi":{const r=$(t,"power",Math.round(h(4,10)*s*a));t.power=p(t.power+r,0,d),t.styleXP.oshi=(t.styleXP.oshi||0)+10,t.styleXP.oshi>80&&t.sumoStyle!=="oshi"&&(t.sumoStyle="oshi",c.push("押し相撲が身についた！")),c.push(`筋力 +${r}`),T(t,"oshi",c);break}case"yotsu":{const r=$(t,"tech",Math.round(h(4,10)*s*a));t.tech=p(t.tech+r,0,d),t.styleXP.yotsu=(t.styleXP.yotsu||0)+10,t.styleXP.yotsu>80&&t.sumoStyle!=="yotsu"&&(t.sumoStyle="yotsu",c.push("四つ相撲が身についた！")),c.push(`技術 +${r}`),T(t,"yotsu",c);break}case"nage":{const r=$(t,"tech",Math.round(h(3,8)*s*a));t.tech=p(t.tech+r,0,d),t.styleXP.tech=(t.styleXP.tech||0)+8;const l=h(1,2);t.weight=p(t.weight-l,60,250),c.push(`技術 +${r}、体重 -${l}kg`),T(t,"tech",c);break}case"run":{const r=Math.round(h(4,10)*s);t.maxStamina=p(t.maxStamina+r,0,200),t.weight=p(t.weight-1,60,250),c.push(`体力上限 +${r}、体重 -1kg`);break}case"mental":{const r=$(t,"spirit",Math.round(h(4,10)*s*a)),l=$(t,"motivation",h(5,12));t.spirit=p(t.spirit+r,0,d),t.motivation=p(t.motivation+l,0,100),c.push(`精神 +${r}、やる気 +${l}`);break}case"diet":{const r=t.optimalWeight,l=t.weight-r;if(Math.abs(l)<=5)c.push("すでに適正体重！");else if(l>0){const u=Math.min(l,h(3,6));t.weight-=u,c.push(`体重 -${u}kg（適正体重へ近づいた）`)}else{const u=Math.min(-l,h(2,4));t.weight+=u,c.push(`体重 +${u}kg（適正体重へ近づいた）`)}break}case"group":{const r=o.facilities.dojo+1,l=$(t,"power",Math.round(h(2,4)*r*a));t.power=p(t.power+l,0,d),t.tech=p(t.tech+l,0,d),t.spirit=p(t.spirit+l,0,d),c.push(`全ステ +${l}`);break}case"cond":{const r=t.conditionIdx;t.conditionIdx=p(t.conditionIdx+1,0,4),t.conditionIdx>r?c.push(`コンディション：${I[r].label} → ${I[t.conditionIdx].label}`):c.push("コンディションはすでに最高！");break}case"sleep":{const r=Math.round(t.maxStamina*.65),l=Math.max(0,r-t.stamina);t.stamina=p(t.stamina+l,0,t.maxStamina);const u=h(10,18);t.motivation=p(t.motivation+u,0,100),c.push(`スタミナ回復（+${l}）、やる気 +${u}`);break}case"eat":{const r=1+o.facilities.kitchen*.2,l=j(t);let u,f;l==="optimal"?(u=h(2,4),f=Math.round(h(4,10)*r*i)):l==="overweight"?(u=h(1,2),f=Math.round(h(2,5)*r*i)):(u=h(3,6),f=Math.round(h(5,12)*r*i)),t.weight=p(t.weight+u,60,250),t.maxStamina=p(t.maxStamina+f,0,200),t.stamina=p(t.stamina+f,0,t.maxStamina),c.push(`体重 +${u}kg、体力 +${f}`);break}}if(e.stamCost>0&&(o.trainTurnsLeft=Math.max(0,(o.trainTurnsLeft??C)-1)),t.personality==="genius"&&c.length>0){const r=parseInt(((m=c[0].match(/\d+/))==null?void 0:m[0])||"0"),l=12;r>l*1.8?c.unshift("✨ 天才的なひらめき！大爆発！"):r<l*.5&&r>0&&c.unshift("😓 今日はイマイチ…")}return e.stamCost>0&&t.motivation<30&&c.push("やる気が低い…稽古の効果が薄い。"),t.injuryLevel>=1&&e.stamCost>=20&&(c.push("怪我が痛む…"),t.stamina=p(t.stamina-5,0,t.maxStamina)),et(t),{ok:!0,msgs:c}}function T(t,n,e){const s=A[n];if(!s)return;t.unlockedMoves=t.unlockedMoves||[];const i=t.styleXP[n]||0;for(const a of s)i>=a.xp&&!t.unlockedMoves.includes(a.id)&&(t.unlockedMoves.push(a.id),e.unshift(`🌟 必殺技「${a.name}」を習得！`))}function et(t){if(t.injuryLevel===0)return;const e=.15+o.facilities.medical*.12;return o.activeItems.kampo,Math.random()<e?(t.injuryLevel=Math.max(0,t.injuryLevel-1),`${t.name}の怪我が回復した！`):null}function g(){const t=document.getElementById("hd-info");if(!t)return;const n=o.month,e=o.year;t.textContent=`令和${e}年${n}月  💰${o.ryo}両`}function y(){var d;const t=o.disciples[o.focusIdx];if(!t)return;tt(t);const n=document.getElementById("tr-name");n&&(n.textContent=t.name);const e=document.getElementById("tr-rank");e&&(e.textContent=z(t));const s=document.getElementById("tr-cond");if(s){const c=I[t.conditionIdx??2];let m=c.label;if(t.injuryLevel>=1){const r=`${t.injuryPart?t.injuryPart+"の":""}${t.injuryLevel>=2?"重傷":"軽傷"}`;m+=` 🤕${r}`}s.textContent=m,s.style.color=t.injuryLevel>=1?"#e74c3c":c.color}const i=document.getElementById("tr-personality");if(i){const c=F.find(r=>r.id===t.personality);let m=c?`${c.icon} ${c.name}`:"";if(((d=t.unlockedMoves)==null?void 0:d.length)>0){const r=t.unlockedMoves[t.unlockedMoves.length-1];for(const l of Object.values(A)){const u=l.find(f=>f.id===r);if(u){m+=`　🌟${u.name}`;break}}}i.textContent=m}const a=document.getElementById("train-turns-info");if(a){const c=o.trainTurnsLeft??10,m=c<=2?"#e74c3c":c<=4?"#e67e22":"#27ae60";a.innerHTML=`<span class="turns-label">稽古残り</span> <span class="turns-count" style="color:${m}">${c}</span><span class="turns-label"> / 10回</span>`}it(t),at(t)}function it(t){const n=document.getElementById("stat-bars");if(!n)return;const e=999,s=[{label:"筋力",val:t.power,max:e,col:"#c0392b"},{label:"技術",val:t.tech,max:e,col:"#2980b9"},{label:"精神",val:t.spirit,max:e,col:"#8e44ad"},{label:"体力",val:t.stamina,max:t.maxStamina,col:"#27ae60"},{label:"やる気",val:t.motivation,max:100,col:"#f39c12"},{label:"体重",val:`${t.weight}kg`,raw:!0}];if(n.innerHTML=s.map(a=>{if(a.raw){const c=j(t),m=c==="optimal"?"#27ae60":c==="overweight"?"#e74c3c":"#999";return`
        <div class="stat-row">
          <span class="stat-label">${a.label}</span>
          <span class="stat-raw" style="color:${m}">
            ${a.val}
            <small style="color:#aaa">（適正:${Math.round(t.optimalWeight)}kg）</small>
          </span>
        </div>`}const d=Math.min(100,Math.round(a.val/a.max*100));return`
      <div class="stat-row">
        <span class="stat-label">${a.label}</span>
        <div class="stat-bar-wrap">
          <div class="stat-bar-fill" style="width:${d}%;background:${a.col}"></div>
        </div>
        <span class="stat-val">${a.val}</span>
      </div>`}).join(""),t.divIdx>=4){const a=w.find(c=>c.id===t.keshoMawashi)||w[0],d=document.createElement("button");d.className="btn-sm kesho-btn",d.style.background=`#${a.col.toString(16).padStart(6,"0")}`,d.textContent=`🎽 ${a.name}`,d.onclick=()=>rt(o.focusIdx),n.appendChild(d)}const i=t.yushoRecord||[];if(i.length>0){const a={};i.forEach(c=>{a[c.divName]=(a[c.divName]||0)+1});const d=document.createElement("div");d.className="yusho-row",d.innerHTML=Object.entries(a).map(([c,m])=>`<span class="yusho-badge">🏆${c}×${m}</span>`).join(""),n.appendChild(d)}}function at(t){const n=document.getElementById("cmd-grid");if(!n)return;if(o.phase!=="main"){n.innerHTML="";return}n.innerHTML=H.map(s=>{const a=t.stamina>=s.stamCost?"":"disabled";return`
      <button class="cmd-btn ${a?"cmd-disabled":""}"
              onclick="handleTraining('${s.id}')"
              title="${s.desc}"
              ${a}>
        <span class="cmd-icon">${s.icon}</span>
        <span class="cmd-label">${s.label}</span>
        <span class="cmd-cost">${s.stamCost>0?`${s.stamCost}体`:"−"}</span>
      </button>`}).join("")}function ot(t){if(t){if(o.disciples.length===0){t.innerHTML='<div class="empty-msg">弟子がいません。まず弟子を迎えましょう！</div>';return}t.innerHTML=o.disciples.map((n,e)=>{var a;if(n.retired)return`
      <div class="disciple-card retired">
        <span>${n.name}（引退）</span>
        <small>最高位:${b[n.divIdx].short}　${n.totalWins}勝${n.totalLosses}敗</small>
      </div>`;const s=b[n.divIdx],i=I[n.conditionIdx??2];return`
      <div class="disciple-card ${o.focusIdx===e?"focused":""}"
           onclick="setFocusDisciple(${e})">
        <div class="dc-header">
          <strong>${n.name}</strong>
          <span class="dc-rank">${s.short}${n.pos}枚目</span>
          <span class="dc-cond" style="color:${i.color}">${i.label}</span>
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
          ${n.birthplace?`<span class="birthplace-badge">${n.birthplace}</span>`:""}
          ${((a=n.unlockedMoves)==null?void 0:a.length)>0?`<span class="move-badge">🌟必殺技×${n.unlockedMoves.length}</span>`:""}
        </div>
        <div class="dc-actions">
          <button class="btn-sm" onclick="event.stopPropagation(); setFocusAndTab(${e}, 'train')">育成</button>
          <button class="btn-sm btn-retire" onclick="event.stopPropagation(); confirmRetire(${e})">引退</button>
        </div>
      </div>`}).join("")}}function M(t){if(!t)return;t.innerHTML="";const n=document.createElement("div");n.className="fac-section",n.innerHTML='<h3 class="section-title">施設強化</h3>';for(const[e,s]of Object.entries(P)){const i=o.facilities[e]??0,a=s.levels.length-1,d=i>=a,c=d?null:s.levels[i+1];n.innerHTML+=`
      <div class="fac-card">
        <div class="fac-top">
          <span>${s.icon} ${s.name}</span>
          <span class="fac-level">Lv${i+1} / ${a+1}</span>
        </div>
        <div class="fac-cur">${s.levels[i].label}：${s.levels[i].effect}</div>
        ${d?'<div class="fac-max">最大レベル達成！</div>':`<button class="btn btn-upgrade" onclick="doUpgradeFacility('${e}')">
            強化→${c.label}（${c.cost}両）
          </button>`}
      </div>`}t.appendChild(n),ct(t)}function ct(t){var e;const n=document.createElement("div");n.className="invest-section",n.innerHTML=`
    <h3 class="section-title">投資・強化メニュー</h3>
    <p class="section-note">選択中の弟子（${((e=o.disciples[o.focusIdx])==null?void 0:e.name)||"−"}）に適用</p>`,n.innerHTML+='<h4 class="sub-title">特別稽古（1場所限定）</h4>',n.innerHTML+=O.map(s=>{var c;const i=o.disciples[o.focusIdx],a=o.ryo>=s.cost,d=!((c=s.req)!=null&&c.minDiv)||i&&i.divIdx>=s.req.minDiv;return`
      <div class="invest-card ${!a||!d?"disabled":""}">
        <span>${s.icon} ${s.name}</span>
        <span class="invest-desc">${s.desc}</span>
        <button class="btn-sm" onclick="doBuySpecialTraining('${s.id}')"
          ${!a||!d?"disabled":""}>
          ${s.cost}両
        </button>
      </div>`}).join(""),n.innerHTML+='<h4 class="sub-title">道具・アイテム（次場所まで持続）</h4>',n.innerHTML+=_.map(s=>{const i=o.ryo>=s.cost,a=!!o.activeItems[s.id]||o.pendingItems.includes(s.id);return`
      <div class="invest-card ${a?"active-item":""} ${i?"":"disabled"}">
        <span>${s.icon} ${s.name}</span>
        <span class="invest-desc">${s.desc}</span>
        ${a?'<span class="active-badge">使用中</span>':`<button class="btn-sm" onclick="doBuyItem('${s.id}')" ${i?"":"disabled"}>${s.cost}両</button>`}
      </div>`}).join(""),n.innerHTML+='<h4 class="sub-title">部屋の名声施策</h4>',n.innerHTML+=X.map(s=>`
    <div class="invest-card ${o.ryo<s.cost?"disabled":""}">
      <span>${s.icon} ${s.name}</span>
      <span class="invest-desc">${s.desc}</span>
      <button class="btn-sm" onclick="doPrestigeAction('${s.id}')" ${o.ryo<s.cost?"disabled":""}>
        ${s.cost}両
      </button>
    </div>`).join(""),n.innerHTML+='<h4 class="sub-title">スカウト強化</h4>',n.innerHTML+=q.map(s=>`
    <div class="invest-card ${o.ryo<s.cost?"disabled":""}">
      <span>${s.icon} ${s.name}</span>
      <span class="invest-desc">${s.desc}</span>
      <button class="btn-sm" onclick="doScoutAction('${s.id}')" ${o.ryo<s.cost?"disabled":""}>
        ${s.cost}両
      </button>
    </div>`).join(""),t.appendChild(n)}function lt(t){if(!t)return;t.innerHTML="";const n=o.disciples.filter(s=>{var i;return!s.retired&&((i=s.statHistory)==null?void 0:i.length)>1});if(n.length>0){const s=document.createElement("div");s.className="growth-graph-section",s.innerHTML='<h3 class="section-title">📈 成長記録</h3>';for(const i of n){const a=i.statHistory.slice(-10),d=Math.max(...a.map(u=>Math.max(u.power,u.tech,u.spirit)),10),m=[{key:"power",label:"筋",col:"#c0392b"},{key:"tech",label:"技",col:"#2980b9"},{key:"spirit",label:"精",col:"#8e44ad"}].map(u=>{const f=a.map(k=>`<div class="grow-bar" style="height:${Math.round(k[u.key]/d*100)}%;background:${u.col}" title="${k[u.key]}"></div>`).join("");return`<div class="grow-row"><span class="grow-label" style="color:${u.col}">${u.label}</span><div class="grow-bars">${f}</div><span class="grow-val">${a[a.length-1][u.key]}</span></div>`}).join(""),r=a.map(u=>`${b[u.divIdx].short}`).join("→"),l=`
        <div class="grow-disciple">
          <div class="grow-disc-name">${i.name}（${r}）</div>
          <div class="grow-chart">${m}</div>
          <div class="grow-legend">直近${a.length}場所の推移（最大値:${d}）</div>
        </div>`;s.innerHTML+=l}t.appendChild(s)}const e=document.createElement("div");if(e.innerHTML='<h3 class="section-title">部屋の歴史</h3>',!o.history||o.history.length===0)e.innerHTML+='<div class="empty-msg">まだ記録がありません。</div>';else{const s=[...o.history].reverse();e.innerHTML+=s.map(i=>`
      <div class="history-entry">
        <span class="h-icon">${i.icon||"📌"}</span>
        <span class="h-date">${i.date}</span>
        <span class="h-text">${i.text}</span>
      </div>`).join("")}t.appendChild(e)}function L(t,n=""){const e=document.getElementById("msg-log");if(!e)return;const s=document.createElement("div");for(s.className=`msg ${n}`,s.textContent=t,e.prepend(s);e.children.length>30;)e.removeChild(e.lastChild)}function rt(t){var i;const n=o.disciples[t];if(!n||n.divIdx<4)return;const e=n.keshoMawashi||w[0].id,s=((i=w.find(a=>a.id===e))==null?void 0:i.name)||"赤獅子";x({em:"🎽",title:"化粧まわし変更",text:`現在：${s}
化粧まわしを選んでください。`,choices:w.map(a=>({label:`🎽 ${a.name}（${a.desc}）${a.id===e?" ◀現在":""}`,fn:()=>{n.keshoMawashi=a.id,S(),y()}}))})}function dt(t){if(!t)return;const n=t;n.innerHTML=`<h3 class="section-title">番付表 ─ 令和${o.year}年${o.month}月</h3>`;const e=o.disciples.filter(i=>!i.retired),s=o.rival;if(o.sponsors&&o.sponsors.length>0){const i=document.createElement("div");i.className="sponsor-list",i.innerHTML=`<h4 class="sub-title">現スポンサー（${o.sponsors.length}社）</h4>`,i.innerHTML+=o.sponsors.map(a=>`<div class="sponsor-row"><span>${a.icon} ${a.name}</span><span class="sponsor-income">+${a.income}両/場所</span></div>`).join(""),n.appendChild(i)}for(let i=b.length-1;i>=0;i--){const a=b[i],d=e.filter(l=>l.divIdx===i),c=s&&s.divIdx===i;if(d.length===0&&!c){const l=document.createElement("div");l.className="banzuke-section banzuke-empty-section",l.innerHTML=`<div class="banzuke-div-name">${a.name}</div><div class="banzuke-no-member">（所属力士なし）</div>`,n.appendChild(l);continue}const m=document.createElement("div");m.className="banzuke-section",m.innerHTML=`<div class="banzuke-div-name">${a.name}</div>`,[...d.map(l=>({name:l.name,pos:l.pos,isPlayer:!0,d:l})),...c?[{name:s.name,pos:s.pos,isRival:!0}]:[]].sort((l,u)=>l.pos-u.pos).forEach(l=>{const u=l.isPlayer&&o.focusIdx===o.disciples.indexOf(l.d),f=l.isPlayer?u?"⭐":"★":"⚔",k=l.isPlayer?"banzuke-player"+(u?" banzuke-focus":""):"banzuke-rival",E=l.isPlayer?`${l.d.wins}勝${l.d.losses}敗`:"";m.innerHTML+=`
        <div class="banzuke-row ${k}">
          <span class="banzuke-pos">${a.name}${l.pos}枚目</span>
          <span class="banzuke-name">${f} ${l.name}</span>
          ${l.isPlayer?`<span class="banzuke-record">${E}</span>`:'<span class="banzuke-rival-badge">ライバル</span>'}
        </div>`}),n.appendChild(m)}}function ut(){var e,s;const t=document.getElementById("screen-main");t.innerHTML=`
    <div class="main-wrap">
      <!-- ヘッダー -->
      <div class="main-header">
        <span id="stable-name">${o.stableName}</span>
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
          ${U()>o.disciples.filter(i=>!i.retired).length?'<button class="btn btn-recruit" id="btn-recruit">+ 弟子を迎える</button>':""}
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
    </div>`,document.querySelectorAll(".tab").forEach(i=>{i.addEventListener("click",()=>N(i.dataset.tab))}),(e=document.getElementById("btn-go-basho"))==null||e.addEventListener("click",ht),(s=document.getElementById("btn-recruit"))==null||s.addEventListener("click",()=>B("create"));const n=document.getElementById("char-area");n&&nt(n),vt(),g(),R(),y(),mt()}function N(t){var n;switch(document.querySelectorAll(".tab").forEach(e=>e.classList.toggle("active",e.dataset.tab===t)),document.querySelectorAll(".tab-content").forEach(e=>e.classList.add("hidden")),(n=document.getElementById(`tab-${t}`))==null||n.classList.remove("hidden"),t){case"train":y();break;case"list":ot(document.getElementById("disciple-list"));break;case"facility":M(document.getElementById("facility-content"));break;case"history":lt(document.getElementById("history-content"));break;case"banzuke":dt(document.getElementById("banzuke-content"));break}}function R(){const t=document.getElementById("disciple-selector");if(!t)return;const n=o.disciples.filter(e=>!e.retired);if(n.length<=1){t.innerHTML="";return}t.innerHTML=n.map((e,s)=>{const i=o.disciples.indexOf(e);return`<button class="disc-sel-btn ${o.focusIdx===i?"active":""}"
              onclick="setFocusDisciple(${i})">${e.name}</button>`}).join("")}function mt(){const t=document.getElementById("next-basho-info");if(!t)return;const n=Z();t.textContent=`次の場所：令和${o.year}年${o.month}月　${n.name}（${n.place}）`}window.handleTraining=function(t){const n=o.disciples[o.focusIdx];if(!n||n.retired)return;const e=st(n,t);if(!e.ok){v(e.msg);return}e.msgs.forEach(s=>L(s)),Math.random()<.12&&Q(n).forEach(i=>{L(`${i.icon} ${i.text}`,"mge"),x({em:i.icon,title:i.title,text:i.text})}),S(),g(),y()};window.setFocusDisciple=function(t){o.focusIdx=t,R(),y()};window.setFocusAndTab=function(t,n){o.focusIdx=t,N(n)};window.confirmRetire=function(t){const n=o.disciples[t];if(!n||n.retired)return;const e=b[n.divIdx];x({em:"🎋",title:`${n.name}を引退させますか？`,text:`最高位：${e.name}${n.pos}枚目
通算：${n.totalWins}勝${n.totalLosses}敗

本当に引退させますか？`,choices:[{label:"引退させる",cls:"btn-red",fn:()=>{pt(n)}},{label:"まだ現役で",fn:()=>{}}]})};function pt(t,n){var a;b[t.divIdx];let e="🎋",s="引退",i=`${t.name}は力士生活を終えた。
長い間お疲れ様でした。`;t.divIdx>=7?(e="👑",s="横綱引退・断髪式",i=`${t.name}が横綱として引退。断髪式が行われた。

伝説の横綱として永遠に語り継がれるだろう。`):t.divIdx>=5?(e="✂",s="断髪式",i=`${t.name}の断髪式が行われた。
多くのファンに見守られ、現役生活に幕を閉じた。`):t.divIdx>=4&&(e="✂",s="断髪式（関取として）",i=`関取として活躍した${t.name}が引退。
${((a=t.yushoRecord)==null?void 0:a.length)>0?`${t.yushoRecord.length}回の優勝を誇る名力士だった。`:"誠実な相撲で多くのファンを魅了した。"}`),x({em:e,title:s,text:i,onOk:()=>{G(t),o.focusIdx=o.disciples.findIndex(d=>!d.retired)||0,ut()}})}window.doUpgradeFacility=function(t){const n=W(t);if(!n.ok){v(n.msg);return}const e=P[t];v(`${e.name}を強化しました！`),g(),M(document.getElementById("facility-content"))};window.doBuyItem=function(t){const n=K(t);if(!n.ok){v(n.msg);return}v("アイテムを購入しました！"),g(),M(document.getElementById("facility-content"))};window.doBuySpecialTraining=function(t){const n=o.disciples[o.focusIdx],e=V(n,t);if(!e.ok){v(e.msg);return}e.msgs.forEach(s=>L(s,"mge")),v("特別稽古を実施しました！"),g(),y()};window.doPrestigeAction=function(t){const n=Y(t);if(!n.ok){v(n.msg);return}v("施策を実施しました！"),g(),M(document.getElementById("facility-content"))};window.doScoutAction=function(t){const n=J(t);if(!n.ok){v(n.msg);return}v("スカウト施策を実施しました！"),g()};window.doSave=function(){S(),v("セーブしました！")};function ht(){if(o.disciples.filter(n=>!n.retired).length===0){v("まず弟子を迎えてください！");return}o.phase="basho",B("basho")}function vt(){window.openSettings=D,window.handleTraining=window.handleTraining,window.setFocusDisciple=window.setFocusDisciple,window.setFocusAndTab=window.setFocusAndTab,window.confirmRetire=window.confirmRetire,window.doUpgradeFacility=window.doUpgradeFacility,window.doBuyItem=window.doBuyItem,window.doBuySpecialTraining=window.doBuySpecialTraining,window.doPrestigeAction=window.doPrestigeAction,window.doScoutAction=window.doScoutAction,window.doSave=window.doSave}export{ut as renderMain};
