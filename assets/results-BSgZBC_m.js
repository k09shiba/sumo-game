import{G as l,a as y,b as x,p as M,q as m,s as Y,t as P}from"./index-DbcorYze.js";import{D as h,p as _,q as g,o as z,g as $,s as D,t as I,h as b,u as H,K as F}from"./disciple-CUbkEey9.js";import{g as B,c as C,b as O,d as j}from"./basho-DhszNWw1.js";import{c as L,a as T,u as W,r as A,b as N,d as K}from"./events-CCZQY9rx.js";import{r as R}from"./facility-Dm3WNKlI.js";function V(o,e){if(h[o.divIdx].matches-e,o.divIdx===_){J(o,e);return}if(o.divIdx===g){U(o,e);return}const r=q(o,e);let n=o.pos+r,t=o.divIdx;for(;n<1&&t<h.length-1;){const d=1-n,u=h[t].maxPos;t++;const i=h[t];if(t>=z){const a=$(d/u,0,1);n=Math.round(i.maxPos*(1-a*.55))}else{const a=$(d/u,0,1);n=Math.round(i.maxPos*(1-a*.65))}n=$(n,1,i.maxPos)}for(;t>0&&n>h[t].maxPos;){const d=n-h[t].maxPos,u=h[t].maxPos;t--;const i=h[t];if(t===D)n=i.maxPos;else{const a=$(d/u,0,1);n=Math.round(i.maxPos*a*.65),n=$(n,1,i.maxPos)}}const c=o.divIdx;o.divIdx=$(t,0,h.length-1),o.pos=$(n,1,h[o.divIdx].maxPos),G(o,c)}function q(o,e){const s=h[o.divIdx],r=s.matches-e,n=e-r,t=o.divIdx;if(t===D)return n===0?0:-n*7+b(-2,2);if(t===1)return e===7?-(s.maxPos+10):-n*10+b(-3,3);if(t===2)return e===7?-(s.maxPos+10):-n*9+b(-3,3);if(t===H){if(e===7&&o.pos<=5)return-(s.maxPos+15);if(e===7)return-25+b(-5,0);const u=o.pos/s.maxPos>.5?9:4;return-n*u+b(-3,3)}const c=o.pos/s.maxPos;return-Math.round(n*(1.5+c*.8))+b(-1,2)}function U(o,e){if(e>=8){o.ozekiFallback=0;const s=-Math.floor((e-8)*.8);o.pos=$(o.pos+s,1,h[g].maxPos)}else o.ozekiFallback++,o.ozekiFallback>=2?(o.divIdx=I,o.pos=3,o.ozekiFallback=0,v("ozeki_fall",o)):v("ozeki_warning",o);Q(o,e)}function J(o,e){e<8?(o.yokozunaWarning++,o.yokozunaWarning>=3?v("yokozuna_retire_forced",o):v("yokozuna_warning",o)):o.yokozunaWarning=0}function Q(o,e){var u,i;const s=o.lastTwoBashoWins||[];if(s.push(e),s.length>2&&s.shift(),o.lastTwoBashoWins=s,s.length<2)return;const[r,n]=s,t=o.yushoRecord.length>0&&((u=o.yushoRecord[o.yushoRecord.length-1])==null?void 0:u.bashoIdx)===l.bashoCount-1,c=o.yushoRecord.length>0&&((i=o.yushoRecord[o.yushoRecord.length-1])==null?void 0:i.bashoIdx)===l.bashoCount;(t&&c||c&&n>=13&&r>=12)&&o.divIdx===g&&v("yokozuna_promotion",o)}function G(o,e,s){e<z&&o.divIdx>=z&&!o.promotedJuryo&&(o.promotedJuryo=!0,o.keshoMawashi="akaishi",v("juryo_promotion",o),y({icon:"🎊",text:`${o.name} 十両昇進！`})),e<I&&o.divIdx>=I&&!o.promotedMakunouchi&&(o.promotedMakunouchi=!0,v("makunouchi_promotion",o),y({icon:"🎊",text:`${o.name} 幕内昇進！`})),e<g&&o.divIdx>=g&&!o.promotedOzeki&&(o.promotedOzeki=!0,v("ozeki_promotion",o),y({icon:"🏅",text:`${o.name} 大関昇進！`})),e<_&&o.divIdx>=_&&!o.promotedYokozuna&&(o.promotedYokozuna=!0,v("yokozuna_promotion_confirmed",o),y({icon:"👑",text:`${o.name} 横綱昇進！`}))}const E=[];function v(o,e){E.push({type:o,data:e})}function Z(){return E.splice(0)}function X(o,e){const s=h[o.divIdx],r={0:7,1:7,2:7,3:7,4:13,5:13,6:14,7:13}[o.divIdx]??7;if(e>=r){const n={bashoIdx:l.bashoCount,divName:s.name,wins:e,losses:s.matches-e,year:l.year,month:l.month};return o.yushoRecord.push(n),y({icon:"🏆",text:`${o.name} ${s.name}優勝（${e}勝）！`}),!0}return!1}function oo(o,e){if(o.divIdx<I)return null;const s=[];return e>=12&&s.push("敢闘賞"),e>=10&&o.pos<=20&&s.push("殊勲賞"),e>=10&&e<=12&&o.pos>=20&&s.push("技能賞"),s.length>0?s:null}function eo(o){return o.age>=40?"forced":o.age>=36?"advisory":null}function po(){var d,u,i;const o=document.getElementById("screen-results"),e=so(),s=B().name,r=e.filter(a=>a.isYusho);o.innerHTML=`
    ${r.length>0?'<div class="yusho-celebration" id="yusho-celebration"></div>':""}
    <div class="results-wrap">
      <div class="results-header">
        <h2>場所結果発表</h2>
        <div>令和${l.year}年　${s}</div>
        <button class="btn-sm btn-save" id="res-save-btn">💾</button>
      </div>

      ${r.length>0?`
        <div class="yusho-banner">
          🏆 ${r.map(a=>{var p;const f=h[a.oldDivIdx].name,k=((p=a.disciple.yushoRecord)==null?void 0:p.length)||0;return`${a.disciple.name}　${f}優勝！（通算${k}回目）`}).join("　")} 🏆
        </div>`:""}

      <div id="results-cards">
        ${e.map(a=>ro(a)).join("")}
      </div>

      <div class="income-section" id="income-section"></div>
      <div id="annual-award-section"></div>

      <div style="text-align:center;margin-top:16px;">
        <button class="btn btn-red btn-big" id="btn-back-to-main">育成に戻る →</button>
      </div>
    </div>`;const n=C();l.ryo=(l.ryo||0)+n,document.getElementById("income-section").innerHTML=`
    <div class="income-row">
      <span>場所収入</span>
      <strong>+${n}両</strong>
    </div>
    <div class="income-row">
      <span>所持金</span>
      <strong>${l.ryo}両</strong>
    </div>`,O(),j();const t=L();t&&(l.ryo+=t.bonus,document.getElementById("annual-award-section").innerHTML=`
      <div class="annual-award">
        🏆 年間最多勝：${t.name}（${t.wins}勝）← ボーナス+${t.bonus}両！
      </div>`),x(),r.length>0&&io(),M();const c=T();if(c&&setTimeout(()=>{m({em:c.icon,title:`${c.name}からスポンサーオファー！`,text:`${c.desc}
毎場所 +${c.income}両 の後援が受けられます。
契約しますか？`,choices:[{label:"✅ 契約する",fn:()=>{K(c.id),x(),P(`${c.name}と契約しました！毎場所+${c.income}両！`)}},{label:"断る",fn:()=>{}}]}),M()},500),l.sponsors&&l.sponsors.length>0){const a=l.sponsors.reduce((k,p)=>k+p.income,0),f=document.getElementById("income-section");f&&(f.innerHTML+=`
        <div class="income-row">
          <span>スポンサー収入（${l.sponsors.length}社）</span>
          <strong>+${a}両</strong>
        </div>`)}for(const a of l.disciples)if(!a.retired&&a.divIdx>=7){const f=(d=a.yushoRecord)==null?void 0:d.find(k=>k.divName==="横綱");if(f&&f.bashoIdx===l.bashoCount-1&&!a._yokozunaYushoShown){a._yokozunaYushoShown=!0,setTimeout(()=>{m({em:"👑",title:`${a.name} 横綱初優勝！！！`,text:`${a.name}が横綱として初めての優勝を果たした！
土俵の神として、その名は永遠に語り継がれるだろう。

通算成績：${a.totalWins}勝${a.totalLosses}敗
優勝回数：${a.yushoRecord.length}回`}),M()},1e3);break}}(u=document.getElementById("btn-back-to-main"))==null||u.addEventListener("click",()=>{l.phase="main",Y("main")}),(i=document.getElementById("res-save-btn"))==null||i.addEventListener("click",()=>{x(),P("セーブしました！")})}function so(){const o=[];for(const e of l.disciples){if(e.retired)continue;const s=e.wins||0,r=e.losses||0;h[e.divIdx],e.statHistory=e.statHistory||[],e.statHistory.push({bashoIdx:l.bashoCount,year:l.year,month:l.month,power:e.power,tech:e.tech,spirit:e.spirit,divIdx:e.divIdx,pos:e.pos,wins:s,losses:r}),e.statHistory.length>30&&e.statHistory.shift(),W(e);const n=e.divIdx,t=e.pos;V(e,s);const c=Z();no(c,e);const d=X(e,s);s>r?(e.winStreak=(e.winStreak||0)+1,e.bestWinStreak=Math.max(e.bestWinStreak||0,e.winStreak)):e.winStreak=0;const u=(e.bashoMatchResults||[]).filter(p=>{var S;return p.won&&((S=p.opponent)==null?void 0:S.isYokozuna)}).length;u>0&&e.divIdx===I&&(e.kinboshi=(e.kinboshi||0)+u,m({em:"⭐",title:`金星！${e.name}が横綱を倒した！`,text:`金星${u}個獲得！
通算金星：${e.kinboshi}個
やる気が大きく上昇！`}),e.motivation=Math.min(100,e.motivation+20*u),y({icon:"⭐",text:`${e.name} 金星！（通算${e.kinboshi}個）`}));const i=oo(e,s);i&&(e.sanshoRecord=e.sanshoRecord||[],e.sanshoRecord.push(...i),y({icon:"🎖",text:`${e.name} ${i.join("・")}受賞！`}));const a=i||[],f=eo(e);f==="forced"?ao(e):f==="advisory"&&!e._advisoryShown&&(e._advisoryShown=!0,m({em:"🎋",title:`${e.name}引退勧告`,text:`${e.name}は${e.age}歳。
引退を考える年齢です。
「続ける」場合、毎場所ステータスが低下します。`,choices:[{label:"まだ続ける",fn:()=>{}},{label:"引退する",fn:()=>R(e)}]})),A(e).forEach(p=>m({em:p.icon,title:p.title,text:p.text})),o.push({disciple:e,wins:s,losses:r,oldDivIdx:n,oldPos:t,newDivIdx:e.divIdx,newPos:e.pos,isYusho:d,sansho:a})}return N(),o}function no(o,e){for(const s of o)switch(s.type){case"juryo_promotion":m({em:"🎊",title:`${e.name} 十両昇進！`,text:`幕下から関取の仲間入り！
大銀杏が結えるようになりました！
化粧まわしをつけて土俵入りができます！`,choices:[{label:"🎽 化粧まわしを選ぶ",noQueue:!0,fn:()=>to(e,()=>w(e,"十両"))}]});break;case"makunouchi_promotion":m({em:"🎊",title:`${e.name} 幕内昇進！`,text:`ついに幕内の舞台へ！
全国のファンが注目する番付です！`,choices:[{label:"🎉 祝！",fn:()=>w(e,"幕内")}]});break;case"ozeki_promotion":m({em:"🏅",title:`${e.name} 大関昇進！`,text:`相撲の最高位・大関に昇進！
横綱への道が見えてきた！`,choices:[{label:"🎉 祝！",fn:()=>w(e,"大関")}]});break;case"yokozuna_promotion":m({em:"👑",title:`横綱審議！${e.name}が候補に`,text:`横綱審議委員会が開催されます。
来場所の活躍次第で横綱昇進が決まる！`});break;case"yokozuna_promotion_confirmed":m({em:"👑",title:`${e.name} 横綱昇進！！！`,text:`相撲の最高位・横綱に昇進！
土俵の神として永遠に語り継がれよう！`,choices:[{label:"👑 横綱として立つ！",fn:()=>w(e,"横綱")}]});break;case"ozeki_warning":m({em:"⚠",title:`${e.name}大関取りこぼし`,text:"負け越し。もう1場所負け越すと大関陥落の危機！"});break;case"ozeki_fall":m({em:"😔",title:`${e.name}大関陥落...`,text:"2場所連続負け越しで大関から陥落。三役に落ちてしまった。"});break;case"yokozuna_warning":m({em:"⚠",title:`${e.name}横綱として不甲斐ない`,text:`横綱として負け越し（${e.yokozunaWarning}場所連続）。
3場所連続で引退勧告が出ます。`});break;case"yokozuna_retire_forced":m({em:"🎋",title:`${e.name}横綱引退勧告`,text:"3場所連続負け越しにより引退勧告が出ました。",choices:[{label:"引退する",fn:()=>R(e)}]});break}}function to(o,e){m({em:"🎽",title:"化粧まわしを選ぼう！",text:`関取の証！晴れ舞台を彩る
化粧まわしを選んでください。
（後から変更できます）`,choices:F.map(s=>({label:`🎽 ${s.name}（${s.desc}）`,fn:()=>{o.keshoMawashi=s.id,x(),e==null||e()}}))})}function w(o,e){m({em:"✏",title:`${o.name}のしこ名変更`,text:`${e}昇進を機に、しこ名を変更しますか？`,type:"input",defaultValue:o.name,okLabel:"改名する",skipLabel:"このままでいい",onOk:s=>{if(s&&s!==o.name){o.nameHistory=o.nameHistory||[],o.nameHistory.push({name:o.name,occasion:e});const r=o.name;o.name=s,y({icon:"✏",text:`${r} → ${o.name}に改名（${e}）`}),x(),P(`${o.name}に改名しました！`)}},onSkip:()=>{}})}function ao(o){m({em:"🎋",title:`${o.name} 定年引退`,text:`${o.name}は${o.age}歳。現役を引退しました。
お疲れ様でした！`,onOk:()=>R(o)})}function io(){const o=document.getElementById("yusho-celebration");if(!o)return;const e=["#FFD700","#FF4500","#FF69B4","#00CED1","#7FFF00","#FF6347","#9370DB"],s=["🏆","⭐","✨","🎉","🎊","🌟"];for(let r=0;r<60;r++){const n=document.createElement("div");n.className="confetti-piece",Math.random()<.3?(n.textContent=s[Math.floor(Math.random()*s.length)],n.style.fontSize=`${12+Math.random()*16}px`):(n.style.width=`${6+Math.random()*8}px`,n.style.height=`${6+Math.random()*8}px`,n.style.background=e[Math.floor(Math.random()*e.length)],n.style.borderRadius=Math.random()<.5?"50%":"0"),n.style.left=`${Math.random()*100}%`,n.style.animationDelay=`${Math.random()*2}s`,n.style.animationDuration=`${2.5+Math.random()*2}s`,o.appendChild(n)}setTimeout(()=>o.remove(),5e3)}function ro(o){var u;const e=o.disciple,s=h[e.divIdx],r=h[o.oldDivIdx];let n;o.newDivIdx!==o.oldDivIdx?n=`${r.short}${o.oldPos}枚目 → <b>${s.short}${e.pos}枚目</b>`:o.newPos<o.oldPos?n=`${s.short}${o.oldPos}枚目 → <b>${s.short}${e.pos}枚目</b>（↑昇）`:o.newPos>o.oldPos?n=`${s.short}${o.oldPos}枚目 → ${s.short}${e.pos}枚目（↓降）`:n=`${s.short}${e.pos}枚目（変動なし）`;const t=(e.bashoMatchResults||[]).map(i=>i.won?'<span class="hoshi-win">○</span>':'<span class="hoshi-loss">●</span>').join(""),c={};(e.yushoRecord||[]).forEach(i=>{c[i.divName]=(c[i.divName]||0)+1});const d=Object.entries(c).map(([i,a])=>`${i}×${a}`).join(" ");return`
    <div class="result-card ${o.isYusho?"yusho-card":""}">
      <div class="rc-name">${o.isYusho?"🏆 ":""}${e.name}</div>
      <div class="rc-record">
        <span class="rc-wins">${o.wins}勝</span>
        <span class="rc-losses">${o.losses}敗</span>
        <span class="rc-judge ${o.wins>o.losses?"kachi":o.wins<o.losses?"make":"gobu"}">
          ${o.wins>o.losses?"勝ち越し":o.wins<o.losses?"負け越し":"五分"}
        </span>
        ${e.winStreak>=2?`<span class="streak-badge">${e.winStreak}場所連続勝ち越し🔥</span>`:""}
      </div>
      <div class="rc-hoshitori">${t}</div>
      <div class="rc-rank-change">${n}</div>
      ${o.isYusho?`<div class="rc-yusho">🏆 ${r.name}優勝！（通算：${d||"初優勝！"}）</div>`:""}
      ${((u=o.sansho)==null?void 0:u.length)>0?`<div class="rc-sansho">🎖 ${o.sansho.join("・")}</div>`:""}
      ${e.kinboshi>0?`<div class="rc-kinboshi">⭐ 金星${e.kinboshi}個</div>`:""}
      ${e.injuryLevel>=1?`<div class="rc-inj">🤕 ${e.injuryPart?e.injuryPart+"の":""}${e.injuryLevel>=2?"重傷":"軽傷"}</div>`:""}
    </div>`}export{po as renderResults};
