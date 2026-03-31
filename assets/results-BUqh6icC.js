import{a as x,G as h,b as y,s as D}from"./index-CEYR5qiW.js";import{D as i,i as I,j as $,h as g,b as f,k as z,l as P,d as p,m as E,K as O}from"./disciple-_UHwsf1a.js";import{g as H,c as S,b as Y,d as B}from"./basho-DOAzj99P.js";import{c as j,u as A,r as C,a as L}from"./events-BmjZ38u1.js";import{r as _}from"./facility-omkSIHad.js";import{p as K,t as M,q as c}from"./modal-gNpRr-OF.js";function V(o,e){if(i[o.divIdx].matches-e,o.divIdx===I){T(o,e);return}if(o.divIdx===$){F(o,e);return}const t=W(o,e);let n=o.pos+t,a=o.divIdx;for(;n<1&&a<i.length-1;){const m=1-n,u=i[a].maxPos;a++;const r=i[a];if(a>=g){const v=f(m/u,0,1);n=Math.round(r.maxPos*(1-v*.55))}else{const v=f(m/u,0,1);n=Math.round(r.maxPos*(1-v*.65))}n=f(n,1,r.maxPos)}for(;a>0&&n>i[a].maxPos;){const m=n-i[a].maxPos,u=i[a].maxPos;a--;const r=i[a];if(a===z)n=r.maxPos;else{const v=f(m/u,0,1);n=Math.round(r.maxPos*v*.65),n=f(n,1,r.maxPos)}}const l=o.divIdx;o.divIdx=f(a,0,i.length-1),o.pos=f(n,1,i[o.divIdx].maxPos),q(o,l)}function W(o,e){const s=i[o.divIdx],t=s.matches-e,n=e-t,a=o.divIdx;if(a===z)return n===0?0:-n*10+p(-2,2);if(a===1)return e===7?-(s.maxPos+10):-n*14+p(-4,4);if(a===2)return e===7?-(s.maxPos+10):-n*12+p(-4,4);if(a===E){if(e===7&&o.pos<=5)return-(s.maxPos+15);if(e===7)return-30+p(-5,0);const u=o.pos/s.maxPos>.5?12:5;return-n*u+p(-3,3)}const l=o.pos/s.maxPos;return-Math.round(n*(2+l*1.2))+p(-1,2)}function F(o,e){if(e>=8){o.ozekiFallback=0;const s=-Math.floor((e-8)*.8);o.pos=f(o.pos+s,1,i[$].maxPos)}else o.ozekiFallback++,o.ozekiFallback>=2?(o.divIdx=P,o.pos=3,o.ozekiFallback=0,d("ozeki_fall",o)):d("ozeki_warning",o);U(o,e)}function T(o,e){e<8?(o.yokozunaWarning++,o.yokozunaWarning>=3?d("yokozuna_retire_forced",o):d("yokozuna_warning",o)):o.yokozunaWarning=0}function U(o,e){var u,r;const s=o.lastTwoBashoWins||[];if(s.push(e),s.length>2&&s.shift(),o.lastTwoBashoWins=s,s.length<2)return;const[t,n]=s,a=o.yushoRecord.length>0&&((u=o.yushoRecord[o.yushoRecord.length-1])==null?void 0:u.bashoIdx)===h.bashoCount-1,l=o.yushoRecord.length>0&&((r=o.yushoRecord[o.yushoRecord.length-1])==null?void 0:r.bashoIdx)===h.bashoCount;(a&&l||l&&n>=13&&t>=12)&&o.divIdx===$&&d("yokozuna_promotion",o)}function q(o,e,s){e<g&&o.divIdx>=g&&!o.promotedJuryo&&(o.promotedJuryo=!0,o.keshoMawashi="akaishi",d("juryo_promotion",o),x({icon:"🎊",text:`${o.name} 十両昇進！`})),e<P&&o.divIdx>=P&&!o.promotedMakunouchi&&(o.promotedMakunouchi=!0,d("makunouchi_promotion",o),x({icon:"🎊",text:`${o.name} 幕内昇進！`})),e<$&&o.divIdx>=$&&!o.promotedOzeki&&(o.promotedOzeki=!0,d("ozeki_promotion",o),x({icon:"🏅",text:`${o.name} 大関昇進！`})),e<I&&o.divIdx>=I&&!o.promotedYokozuna&&(o.promotedYokozuna=!0,d("yokozuna_promotion_confirmed",o),x({icon:"👑",text:`${o.name} 横綱昇進！`}))}const R=[];function d(o,e){R.push({type:o,data:e})}function J(){return R.splice(0)}function Q(o){return o.age>=40?"forced":o.age>=36?"advisory":null}function ro(){var a,l;const o=document.getElementById("screen-results"),e=G(),s=H().name;o.innerHTML=`
    <div class="results-wrap">
      <div class="results-header">
        <h2>場所結果発表</h2>
        <div>令和${h.year}年　${s}</div>
        <button class="btn-sm btn-save" id="res-save-btn">💾</button>
      </div>

      <div id="results-cards">
        ${e.map(m=>oo(m)).join("")}
      </div>

      <div class="income-section" id="income-section"></div>
      <div id="annual-award-section"></div>

      <div style="text-align:center;margin-top:16px;">
        <button class="btn btn-red btn-big" id="btn-back-to-main">育成に戻る →</button>
      </div>
    </div>`;const t=S();h.ryo=(h.ryo||0)+t,document.getElementById("income-section").innerHTML=`
    <div class="income-row">
      <span>場所収入</span>
      <strong>+${t}両</strong>
    </div>
    <div class="income-row">
      <span>所持金</span>
      <strong>${h.ryo}両</strong>
    </div>`,Y(),B();const n=j();n&&(h.ryo+=n.bonus,document.getElementById("annual-award-section").innerHTML=`
      <div class="annual-award">
        🏆 年間最多勝：${n.name}（${n.wins}勝）← ボーナス+${n.bonus}両！
      </div>`),y(),K(),(a=document.getElementById("btn-back-to-main"))==null||a.addEventListener("click",()=>{h.phase="main",D("main")}),(l=document.getElementById("res-save-btn"))==null||l.addEventListener("click",()=>{y(),M("セーブしました！")})}function G(){var e,s;const o=[];for(const t of h.disciples){if(t.retired)continue;const n=t.wins||0,a=t.losses||0;i[t.divIdx],A(t);const l=t.divIdx,m=t.pos;V(t,n);const u=J();N(u,t);const r=((e=t.yushoRecord)==null?void 0:e.some(k=>k.bashoIdx===h.bashoCount))??!1,v=((s=t.sanshoRecord)==null?void 0:s.slice(-1))||[],w=Q(t);w==="forced"?X(t):w==="advisory"&&!t._advisoryShown&&(t._advisoryShown=!0,c({em:"🎋",title:`${t.name}引退勧告`,text:`${t.name}は${t.age}歳。
引退を考える年齢です。
「続ける」場合、毎場所ステータスが低下します。`,choices:[{label:"まだ続ける",fn:()=>{}},{label:"引退する",fn:()=>_(t)}]})),C(t).forEach(k=>c({em:k.icon,title:k.title,text:k.text})),o.push({disciple:t,wins:n,losses:a,oldDivIdx:l,oldPos:m,newDivIdx:t.divIdx,newPos:t.pos,isYusho:r,sansho:v})}return L(),o}function N(o,e){for(const s of o)switch(s.type){case"juryo_promotion":c({em:"🎊",title:`${e.name} 十両昇進！`,text:`幕下から関取の仲間入り！
大銀杏が結えるようになりました！
化粧まわしをつけて土俵入りができます！`,choices:[{label:"🎽 化粧まわしを選ぶ",noQueue:!0,fn:()=>Z(e,()=>b(e,"十両"))}]});break;case"makunouchi_promotion":c({em:"🎊",title:`${e.name} 幕内昇進！`,text:`ついに幕内の舞台へ！
全国のファンが注目する番付です！`,choices:[{label:"🎉 祝！",fn:()=>b(e,"幕内")}]});break;case"ozeki_promotion":c({em:"🏅",title:`${e.name} 大関昇進！`,text:`相撲の最高位・大関に昇進！
横綱への道が見えてきた！`,choices:[{label:"🎉 祝！",fn:()=>b(e,"大関")}]});break;case"yokozuna_promotion":c({em:"👑",title:`横綱審議！${e.name}が候補に`,text:`横綱審議委員会が開催されます。
来場所の活躍次第で横綱昇進が決まる！`});break;case"yokozuna_promotion_confirmed":c({em:"👑",title:`${e.name} 横綱昇進！！！`,text:`相撲の最高位・横綱に昇進！
土俵の神として永遠に語り継がれよう！`,choices:[{label:"👑 横綱として立つ！",fn:()=>b(e,"横綱")}]});break;case"ozeki_warning":c({em:"⚠",title:`${e.name}大関取りこぼし`,text:"負け越し。もう1場所負け越すと大関陥落の危機！"});break;case"ozeki_fall":c({em:"😔",title:`${e.name}大関陥落...`,text:"2場所連続負け越しで大関から陥落。三役に落ちてしまった。"});break;case"yokozuna_warning":c({em:"⚠",title:`${e.name}横綱として不甲斐ない`,text:`横綱として負け越し（${e.yokozunaWarning}場所連続）。
3場所連続で引退勧告が出ます。`});break;case"yokozuna_retire_forced":c({em:"🎋",title:`${e.name}横綱引退勧告`,text:"3場所連続負け越しにより引退勧告が出ました。",choices:[{label:"引退する",fn:()=>_(e)}]});break}}function Z(o,e){c({em:"🎽",title:"化粧まわしを選ぼう！",text:`関取の証！晴れ舞台を彩る
化粧まわしを選んでください。
（後から変更できます）`,choices:O.map(s=>({label:`🎽 ${s.name}（${s.desc}）`,fn:()=>{o.keshoMawashi=s.id,y(),e==null||e()}}))})}function b(o,e){c({em:"✏",title:`${o.name}のしこ名変更`,text:`${e}昇進を機に、しこ名を変更しますか？`,type:"input",defaultValue:o.name,okLabel:"改名する",skipLabel:"このままでいい",onOk:s=>{if(s&&s!==o.name){o.nameHistory=o.nameHistory||[],o.nameHistory.push({name:o.name,occasion:e});const t=o.name;o.name=s,x({icon:"✏",text:`${t} → ${o.name}に改名（${e}）`}),y(),M(`${o.name}に改名しました！`)}},onSkip:()=>{}})}function X(o){c({em:"🎋",title:`${o.name} 定年引退`,text:`${o.name}は${o.age}歳。現役を引退しました。
お疲れ様でした！`,onOk:()=>_(o)})}function oo(o){var a;const e=o.disciple,s=i[e.divIdx],t=i[o.oldDivIdx];let n;return o.newDivIdx!==o.oldDivIdx?n=`${t.short}${o.oldPos}枚目 → <b>${s.short}${e.pos}枚目</b>`:o.newPos<o.oldPos?n=`${s.short}${o.oldPos}枚目 → <b>${s.short}${e.pos}枚目</b>（↑昇）`:o.newPos>o.oldPos?n=`${s.short}${o.oldPos}枚目 → ${s.short}${e.pos}枚目（↓降）`:n=`${s.short}${e.pos}枚目（変動なし）`,`
    <div class="result-card ${o.isYusho?"yusho-card":""}">
      <div class="rc-name">${o.isYusho?"🏆 ":""}${e.name}</div>
      <div class="rc-record">
        <span class="rc-wins">${o.wins}勝</span>
        <span class="rc-losses">${o.losses}敗</span>
        <span class="rc-judge ${o.wins>o.losses?"kachi":o.wins<o.losses?"make":"gobu"}">
          ${o.wins>o.losses?"勝ち越し":o.wins<o.losses?"負け越し":"五分"}
        </span>
      </div>
      <div class="rc-rank-change">${n}</div>
      ${o.isYusho?`<div class="rc-yusho">🏆 ${i[o.oldDivIdx].name}優勝！</div>`:""}
      ${((a=o.sansho)==null?void 0:a.length)>0?`<div class="rc-sansho">🎖 ${o.sansho.join("・")}</div>`:""}
      ${e.injuryLevel>=1?`<div class="rc-inj">🤕 怪我：${e.injuryLevel>=2?"重傷":"軽傷"}</div>`:""}
    </div>`}export{ro as renderResults};
