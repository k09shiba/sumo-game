import{a as k,G as r,b as y,p as g,q as l,s as H,t as w}from"./index-YmVs4F7q.js";import{D as c,p as P,q as b,o as _,g as p,s as E,t as z,h as $,u as S,K as O}from"./disciple-CUbkEey9.js";import{g as Y,c as B,b as C,d as L}from"./basho-BWVitHAs.js";import{c as j,a as A,u as T,r as K,b as V,d as W}from"./events-CYp5Kth3.js";import{r as R}from"./facility-D9nsbDoR.js";function q(o,e){if(c[o.divIdx].matches-e,o.divIdx===P){J(o,e);return}if(o.divIdx===b){U(o,e);return}const s=F(o,e);let t=o.pos+s,a=o.divIdx;for(;t<1&&a<c.length-1;){const d=1-t,u=c[a].maxPos;a++;const i=c[a];if(a>=_){const m=p(d/u,0,1);t=Math.round(i.maxPos*(1-m*.55))}else{const m=p(d/u,0,1);t=Math.round(i.maxPos*(1-m*.65))}t=p(t,1,i.maxPos)}for(;a>0&&t>c[a].maxPos;){const d=t-c[a].maxPos,u=c[a].maxPos;a--;const i=c[a];if(a===E)t=i.maxPos;else{const m=p(d/u,0,1);t=Math.round(i.maxPos*m*.65),t=p(t,1,i.maxPos)}}const h=o.divIdx;o.divIdx=p(a,0,c.length-1),o.pos=p(t,1,c[o.divIdx].maxPos),Q(o,h)}function F(o,e){const n=c[o.divIdx],s=n.matches-e,t=e-s,a=o.divIdx;if(a===E)return t===0?0:-t*7+$(-2,2);if(a===1)return e===7?-(n.maxPos+10):-t*10+$(-3,3);if(a===2)return e===7?-(n.maxPos+10):-t*9+$(-3,3);if(a===S){if(e===7&&o.pos<=5)return-(n.maxPos+15);if(e===7)return-25+$(-5,0);const u=o.pos/n.maxPos>.5?9:4;return-t*u+$(-3,3)}const h=o.pos/n.maxPos;return-Math.round(t*(1.5+h*.8))+$(-1,2)}function U(o,e){if(e>=8){o.ozekiFallback=0;const n=-Math.floor((e-8)*.8);o.pos=p(o.pos+n,1,c[b].maxPos)}else o.ozekiFallback++,o.ozekiFallback>=2?(o.divIdx=z,o.pos=3,o.ozekiFallback=0,f("ozeki_fall",o)):f("ozeki_warning",o);N(o,e)}function J(o,e){e<8?(o.yokozunaWarning++,o.yokozunaWarning>=3?f("yokozuna_retire_forced",o):f("yokozuna_warning",o)):o.yokozunaWarning=0}function N(o,e){var u,i;const n=o.lastTwoBashoWins||[];if(n.push(e),n.length>2&&n.shift(),o.lastTwoBashoWins=n,n.length<2)return;const[s,t]=n,a=o.yushoRecord.length>0&&((u=o.yushoRecord[o.yushoRecord.length-1])==null?void 0:u.bashoIdx)===r.bashoCount-1,h=o.yushoRecord.length>0&&((i=o.yushoRecord[o.yushoRecord.length-1])==null?void 0:i.bashoIdx)===r.bashoCount;(a&&h||h&&t>=13&&s>=12)&&o.divIdx===b&&f("yokozuna_promotion",o)}function Q(o,e,n){e<_&&o.divIdx>=_&&!o.promotedJuryo&&(o.promotedJuryo=!0,o.keshoMawashi="akaishi",f("juryo_promotion",o),k({icon:"🎊",text:`${o.name} 十両昇進！`})),e<z&&o.divIdx>=z&&!o.promotedMakunouchi&&(o.promotedMakunouchi=!0,f("makunouchi_promotion",o),k({icon:"🎊",text:`${o.name} 幕内昇進！`})),e<b&&o.divIdx>=b&&!o.promotedOzeki&&(o.promotedOzeki=!0,f("ozeki_promotion",o),k({icon:"🏅",text:`${o.name} 大関昇進！`})),e<P&&o.divIdx>=P&&!o.promotedYokozuna&&(o.promotedYokozuna=!0,f("yokozuna_promotion_confirmed",o),k({icon:"👑",text:`${o.name} 横綱昇進！`}))}const D=[];function f(o,e){D.push({type:o,data:e})}function G(){return D.splice(0)}function Z(o){return o.age>=40?"forced":o.age>=36?"advisory":null}function lo(){var h,d,u;const o=document.getElementById("screen-results"),e=X(),n=Y().name;o.innerHTML=`
    <div class="results-wrap">
      <div class="results-header">
        <h2>場所結果発表</h2>
        <div>令和${r.year}年　${n}</div>
        <button class="btn-sm btn-save" id="res-save-btn">💾</button>
      </div>

      <div id="results-cards">
        ${e.map(i=>no(i)).join("")}
      </div>

      <div class="income-section" id="income-section"></div>
      <div id="annual-award-section"></div>

      <div style="text-align:center;margin-top:16px;">
        <button class="btn btn-red btn-big" id="btn-back-to-main">育成に戻る →</button>
      </div>
    </div>`;const s=B();r.ryo=(r.ryo||0)+s,document.getElementById("income-section").innerHTML=`
    <div class="income-row">
      <span>場所収入</span>
      <strong>+${s}両</strong>
    </div>
    <div class="income-row">
      <span>所持金</span>
      <strong>${r.ryo}両</strong>
    </div>`,C(),L();const t=j();t&&(r.ryo+=t.bonus,document.getElementById("annual-award-section").innerHTML=`
      <div class="annual-award">
        🏆 年間最多勝：${t.name}（${t.wins}勝）← ボーナス+${t.bonus}両！
      </div>`),y(),g();const a=A();if(a&&setTimeout(()=>{l({em:a.icon,title:`${a.name}からスポンサーオファー！`,text:`${a.desc}
毎場所 +${a.income}両 の後援が受けられます。
契約しますか？`,choices:[{label:"✅ 契約する",fn:()=>{W(a.id),y(),w(`${a.name}と契約しました！毎場所+${a.income}両！`)}},{label:"断る",fn:()=>{}}]}),g()},500),r.sponsors&&r.sponsors.length>0){const i=r.sponsors.reduce((v,M)=>v+M.income,0),m=document.getElementById("income-section");m&&(m.innerHTML+=`
        <div class="income-row">
          <span>スポンサー収入（${r.sponsors.length}社）</span>
          <strong>+${i}両</strong>
        </div>`)}for(const i of r.disciples)if(!i.retired&&i.divIdx>=7){const m=(h=i.yushoRecord)==null?void 0:h.find(v=>v.divName==="横綱");if(m&&m.bashoIdx===r.bashoCount-1&&!i._yokozunaYushoShown){i._yokozunaYushoShown=!0,setTimeout(()=>{l({em:"👑",title:`${i.name} 横綱初優勝！！！`,text:`${i.name}が横綱として初めての優勝を果たした！
土俵の神として、その名は永遠に語り継がれるだろう。

通算成績：${i.totalWins}勝${i.totalLosses}敗
優勝回数：${i.yushoRecord.length}回`}),g()},1e3);break}}(d=document.getElementById("btn-back-to-main"))==null||d.addEventListener("click",()=>{r.phase="main",H("main")}),(u=document.getElementById("res-save-btn"))==null||u.addEventListener("click",()=>{y(),w("セーブしました！")})}function X(){var e,n;const o=[];for(const s of r.disciples){if(s.retired)continue;const t=s.wins||0,a=s.losses||0;c[s.divIdx],s.statHistory=s.statHistory||[],s.statHistory.push({bashoIdx:r.bashoCount,year:r.year,month:r.month,power:s.power,tech:s.tech,spirit:s.spirit,divIdx:s.divIdx,pos:s.pos,wins:t,losses:a}),s.statHistory.length>30&&s.statHistory.shift(),T(s);const h=s.divIdx,d=s.pos;q(s,t);const u=G();oo(u,s);const i=((e=s.yushoRecord)==null?void 0:e.some(x=>x.bashoIdx===r.bashoCount))??!1,m=((n=s.sanshoRecord)==null?void 0:n.slice(-1))||[],v=Z(s);v==="forced"?so(s):v==="advisory"&&!s._advisoryShown&&(s._advisoryShown=!0,l({em:"🎋",title:`${s.name}引退勧告`,text:`${s.name}は${s.age}歳。
引退を考える年齢です。
「続ける」場合、毎場所ステータスが低下します。`,choices:[{label:"まだ続ける",fn:()=>{}},{label:"引退する",fn:()=>R(s)}]})),K(s).forEach(x=>l({em:x.icon,title:x.title,text:x.text})),o.push({disciple:s,wins:t,losses:a,oldDivIdx:h,oldPos:d,newDivIdx:s.divIdx,newPos:s.pos,isYusho:i,sansho:m})}return V(),o}function oo(o,e){for(const n of o)switch(n.type){case"juryo_promotion":l({em:"🎊",title:`${e.name} 十両昇進！`,text:`幕下から関取の仲間入り！
大銀杏が結えるようになりました！
化粧まわしをつけて土俵入りができます！`,choices:[{label:"🎽 化粧まわしを選ぶ",noQueue:!0,fn:()=>eo(e,()=>I(e,"十両"))}]});break;case"makunouchi_promotion":l({em:"🎊",title:`${e.name} 幕内昇進！`,text:`ついに幕内の舞台へ！
全国のファンが注目する番付です！`,choices:[{label:"🎉 祝！",fn:()=>I(e,"幕内")}]});break;case"ozeki_promotion":l({em:"🏅",title:`${e.name} 大関昇進！`,text:`相撲の最高位・大関に昇進！
横綱への道が見えてきた！`,choices:[{label:"🎉 祝！",fn:()=>I(e,"大関")}]});break;case"yokozuna_promotion":l({em:"👑",title:`横綱審議！${e.name}が候補に`,text:`横綱審議委員会が開催されます。
来場所の活躍次第で横綱昇進が決まる！`});break;case"yokozuna_promotion_confirmed":l({em:"👑",title:`${e.name} 横綱昇進！！！`,text:`相撲の最高位・横綱に昇進！
土俵の神として永遠に語り継がれよう！`,choices:[{label:"👑 横綱として立つ！",fn:()=>I(e,"横綱")}]});break;case"ozeki_warning":l({em:"⚠",title:`${e.name}大関取りこぼし`,text:"負け越し。もう1場所負け越すと大関陥落の危機！"});break;case"ozeki_fall":l({em:"😔",title:`${e.name}大関陥落...`,text:"2場所連続負け越しで大関から陥落。三役に落ちてしまった。"});break;case"yokozuna_warning":l({em:"⚠",title:`${e.name}横綱として不甲斐ない`,text:`横綱として負け越し（${e.yokozunaWarning}場所連続）。
3場所連続で引退勧告が出ます。`});break;case"yokozuna_retire_forced":l({em:"🎋",title:`${e.name}横綱引退勧告`,text:"3場所連続負け越しにより引退勧告が出ました。",choices:[{label:"引退する",fn:()=>R(e)}]});break}}function eo(o,e){l({em:"🎽",title:"化粧まわしを選ぼう！",text:`関取の証！晴れ舞台を彩る
化粧まわしを選んでください。
（後から変更できます）`,choices:O.map(n=>({label:`🎽 ${n.name}（${n.desc}）`,fn:()=>{o.keshoMawashi=n.id,y(),e==null||e()}}))})}function I(o,e){l({em:"✏",title:`${o.name}のしこ名変更`,text:`${e}昇進を機に、しこ名を変更しますか？`,type:"input",defaultValue:o.name,okLabel:"改名する",skipLabel:"このままでいい",onOk:n=>{if(n&&n!==o.name){o.nameHistory=o.nameHistory||[],o.nameHistory.push({name:o.name,occasion:e});const s=o.name;o.name=n,k({icon:"✏",text:`${s} → ${o.name}に改名（${e}）`}),y(),w(`${o.name}に改名しました！`)}},onSkip:()=>{}})}function so(o){l({em:"🎋",title:`${o.name} 定年引退`,text:`${o.name}は${o.age}歳。現役を引退しました。
お疲れ様でした！`,onOk:()=>R(o)})}function no(o){var a;const e=o.disciple,n=c[e.divIdx],s=c[o.oldDivIdx];let t;return o.newDivIdx!==o.oldDivIdx?t=`${s.short}${o.oldPos}枚目 → <b>${n.short}${e.pos}枚目</b>`:o.newPos<o.oldPos?t=`${n.short}${o.oldPos}枚目 → <b>${n.short}${e.pos}枚目</b>（↑昇）`:o.newPos>o.oldPos?t=`${n.short}${o.oldPos}枚目 → ${n.short}${e.pos}枚目（↓降）`:t=`${n.short}${e.pos}枚目（変動なし）`,`
    <div class="result-card ${o.isYusho?"yusho-card":""}">
      <div class="rc-name">${o.isYusho?"🏆 ":""}${e.name}</div>
      <div class="rc-record">
        <span class="rc-wins">${o.wins}勝</span>
        <span class="rc-losses">${o.losses}敗</span>
        <span class="rc-judge ${o.wins>o.losses?"kachi":o.wins<o.losses?"make":"gobu"}">
          ${o.wins>o.losses?"勝ち越し":o.wins<o.losses?"負け越し":"五分"}
        </span>
      </div>
      <div class="rc-rank-change">${t}</div>
      ${o.isYusho?`<div class="rc-yusho">🏆 ${c[o.oldDivIdx].name}優勝！</div>`:""}
      ${((a=o.sansho)==null?void 0:a.length)>0?`<div class="rc-sansho">🎖 ${o.sansho.join("・")}</div>`:""}
      ${e.injuryLevel>=1?`<div class="rc-inj">🤕 ${e.injuryPart?e.injuryPart+"の":""}${e.injuryLevel>=2?"重傷":"軽傷"}</div>`:""}
    </div>`}export{lo as renderResults};
