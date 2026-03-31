import{a as k,G as c,b,s as S}from"./index-DFIJspz_.js";import{D as r,k as _,l as y,j as w,d as p,m as E,n as P,e as $,o as O,K as Y}from"./disciple-B56uESAJ.js";import{g as H,c as B,b as L,d as C}from"./basho-NXXEXppF.js";import{c as j,a as A,u as T,r as K,b as V,d as W}from"./events-Bk6HwXd5.js";import{r as R}from"./facility-BQLvS_Ra.js";import{p as g,q as l,t as z}from"./modal-gNpRr-OF.js";function F(o,e){if(r[o.divIdx].matches-e,o.divIdx===_){J(o,e);return}if(o.divIdx===y){q(o,e);return}const t=U(o,e);let n=o.pos+t,a=o.divIdx;for(;n<1&&a<r.length-1;){const h=1-n,u=r[a].maxPos;a++;const i=r[a];if(a>=w){const m=p(h/u,0,1);n=Math.round(i.maxPos*(1-m*.55))}else{const m=p(h/u,0,1);n=Math.round(i.maxPos*(1-m*.65))}n=p(n,1,i.maxPos)}for(;a>0&&n>r[a].maxPos;){const h=n-r[a].maxPos,u=r[a].maxPos;a--;const i=r[a];if(a===E)n=i.maxPos;else{const m=p(h/u,0,1);n=Math.round(i.maxPos*m*.65),n=p(n,1,i.maxPos)}}const d=o.divIdx;o.divIdx=p(a,0,r.length-1),o.pos=p(n,1,r[o.divIdx].maxPos),Q(o,d)}function U(o,e){const s=r[o.divIdx],t=s.matches-e,n=e-t,a=o.divIdx;if(a===E)return n===0?0:-n*10+$(-2,2);if(a===1)return e===7?-(s.maxPos+10):-n*14+$(-4,4);if(a===2)return e===7?-(s.maxPos+10):-n*12+$(-4,4);if(a===O){if(e===7&&o.pos<=5)return-(s.maxPos+15);if(e===7)return-30+$(-5,0);const u=o.pos/s.maxPos>.5?12:5;return-n*u+$(-3,3)}const d=o.pos/s.maxPos;return-Math.round(n*(2+d*1.2))+$(-1,2)}function q(o,e){if(e>=8){o.ozekiFallback=0;const s=-Math.floor((e-8)*.8);o.pos=p(o.pos+s,1,r[y].maxPos)}else o.ozekiFallback++,o.ozekiFallback>=2?(o.divIdx=P,o.pos=3,o.ozekiFallback=0,f("ozeki_fall",o)):f("ozeki_warning",o);N(o,e)}function J(o,e){e<8?(o.yokozunaWarning++,o.yokozunaWarning>=3?f("yokozuna_retire_forced",o):f("yokozuna_warning",o)):o.yokozunaWarning=0}function N(o,e){var u,i;const s=o.lastTwoBashoWins||[];if(s.push(e),s.length>2&&s.shift(),o.lastTwoBashoWins=s,s.length<2)return;const[t,n]=s,a=o.yushoRecord.length>0&&((u=o.yushoRecord[o.yushoRecord.length-1])==null?void 0:u.bashoIdx)===c.bashoCount-1,d=o.yushoRecord.length>0&&((i=o.yushoRecord[o.yushoRecord.length-1])==null?void 0:i.bashoIdx)===c.bashoCount;(a&&d||d&&n>=13&&t>=12)&&o.divIdx===y&&f("yokozuna_promotion",o)}function Q(o,e,s){e<w&&o.divIdx>=w&&!o.promotedJuryo&&(o.promotedJuryo=!0,o.keshoMawashi="akaishi",f("juryo_promotion",o),k({icon:"🎊",text:`${o.name} 十両昇進！`})),e<P&&o.divIdx>=P&&!o.promotedMakunouchi&&(o.promotedMakunouchi=!0,f("makunouchi_promotion",o),k({icon:"🎊",text:`${o.name} 幕内昇進！`})),e<y&&o.divIdx>=y&&!o.promotedOzeki&&(o.promotedOzeki=!0,f("ozeki_promotion",o),k({icon:"🏅",text:`${o.name} 大関昇進！`})),e<_&&o.divIdx>=_&&!o.promotedYokozuna&&(o.promotedYokozuna=!0,f("yokozuna_promotion_confirmed",o),k({icon:"👑",text:`${o.name} 横綱昇進！`}))}const D=[];function f(o,e){D.push({type:o,data:e})}function G(){return D.splice(0)}function Z(o){return o.age>=40?"forced":o.age>=36?"advisory":null}function uo(){var d,h,u;const o=document.getElementById("screen-results"),e=X(),s=H().name;o.innerHTML=`
    <div class="results-wrap">
      <div class="results-header">
        <h2>場所結果発表</h2>
        <div>令和${c.year}年　${s}</div>
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
    </div>`;const t=B();c.ryo=(c.ryo||0)+t,document.getElementById("income-section").innerHTML=`
    <div class="income-row">
      <span>場所収入</span>
      <strong>+${t}両</strong>
    </div>
    <div class="income-row">
      <span>所持金</span>
      <strong>${c.ryo}両</strong>
    </div>`,L(),C();const n=j();n&&(c.ryo+=n.bonus,document.getElementById("annual-award-section").innerHTML=`
      <div class="annual-award">
        🏆 年間最多勝：${n.name}（${n.wins}勝）← ボーナス+${n.bonus}両！
      </div>`),b(),g();const a=A();if(a&&setTimeout(()=>{l({em:a.icon,title:`${a.name}からスポンサーオファー！`,text:`${a.desc}
毎場所 +${a.income}両 の後援が受けられます。
契約しますか？`,choices:[{label:"✅ 契約する",fn:()=>{W(a.id),b(),z(`${a.name}と契約しました！毎場所+${a.income}両！`)}},{label:"断る",fn:()=>{}}]}),g()},500),c.sponsors&&c.sponsors.length>0){const i=c.sponsors.reduce((v,M)=>v+M.income,0),m=document.getElementById("income-section");m&&(m.innerHTML+=`
        <div class="income-row">
          <span>スポンサー収入（${c.sponsors.length}社）</span>
          <strong>+${i}両</strong>
        </div>`)}for(const i of c.disciples)if(!i.retired&&i.divIdx>=7){const m=(d=i.yushoRecord)==null?void 0:d.find(v=>v.divName==="横綱");if(m&&m.bashoIdx===c.bashoCount-1&&!i._yokozunaYushoShown){i._yokozunaYushoShown=!0,setTimeout(()=>{l({em:"👑",title:`${i.name} 横綱初優勝！！！`,text:`${i.name}が横綱として初めての優勝を果たした！
土俵の神として、その名は永遠に語り継がれるだろう。

通算成績：${i.totalWins}勝${i.totalLosses}敗
優勝回数：${i.yushoRecord.length}回`}),g()},1e3);break}}(h=document.getElementById("btn-back-to-main"))==null||h.addEventListener("click",()=>{c.phase="main",S("main")}),(u=document.getElementById("res-save-btn"))==null||u.addEventListener("click",()=>{b(),z("セーブしました！")})}function X(){var e,s;const o=[];for(const t of c.disciples){if(t.retired)continue;const n=t.wins||0,a=t.losses||0;r[t.divIdx],T(t);const d=t.divIdx,h=t.pos;F(t,n);const u=G();oo(u,t);const i=((e=t.yushoRecord)==null?void 0:e.some(x=>x.bashoIdx===c.bashoCount))??!1,m=((s=t.sanshoRecord)==null?void 0:s.slice(-1))||[],v=Z(t);v==="forced"?so(t):v==="advisory"&&!t._advisoryShown&&(t._advisoryShown=!0,l({em:"🎋",title:`${t.name}引退勧告`,text:`${t.name}は${t.age}歳。
引退を考える年齢です。
「続ける」場合、毎場所ステータスが低下します。`,choices:[{label:"まだ続ける",fn:()=>{}},{label:"引退する",fn:()=>R(t)}]})),K(t).forEach(x=>l({em:x.icon,title:x.title,text:x.text})),o.push({disciple:t,wins:n,losses:a,oldDivIdx:d,oldPos:h,newDivIdx:t.divIdx,newPos:t.pos,isYusho:i,sansho:m})}return V(),o}function oo(o,e){for(const s of o)switch(s.type){case"juryo_promotion":l({em:"🎊",title:`${e.name} 十両昇進！`,text:`幕下から関取の仲間入り！
大銀杏が結えるようになりました！
化粧まわしをつけて土俵入りができます！`,choices:[{label:"🎽 化粧まわしを選ぶ",noQueue:!0,fn:()=>eo(e,()=>I(e,"十両"))}]});break;case"makunouchi_promotion":l({em:"🎊",title:`${e.name} 幕内昇進！`,text:`ついに幕内の舞台へ！
全国のファンが注目する番付です！`,choices:[{label:"🎉 祝！",fn:()=>I(e,"幕内")}]});break;case"ozeki_promotion":l({em:"🏅",title:`${e.name} 大関昇進！`,text:`相撲の最高位・大関に昇進！
横綱への道が見えてきた！`,choices:[{label:"🎉 祝！",fn:()=>I(e,"大関")}]});break;case"yokozuna_promotion":l({em:"👑",title:`横綱審議！${e.name}が候補に`,text:`横綱審議委員会が開催されます。
来場所の活躍次第で横綱昇進が決まる！`});break;case"yokozuna_promotion_confirmed":l({em:"👑",title:`${e.name} 横綱昇進！！！`,text:`相撲の最高位・横綱に昇進！
土俵の神として永遠に語り継がれよう！`,choices:[{label:"👑 横綱として立つ！",fn:()=>I(e,"横綱")}]});break;case"ozeki_warning":l({em:"⚠",title:`${e.name}大関取りこぼし`,text:"負け越し。もう1場所負け越すと大関陥落の危機！"});break;case"ozeki_fall":l({em:"😔",title:`${e.name}大関陥落...`,text:"2場所連続負け越しで大関から陥落。三役に落ちてしまった。"});break;case"yokozuna_warning":l({em:"⚠",title:`${e.name}横綱として不甲斐ない`,text:`横綱として負け越し（${e.yokozunaWarning}場所連続）。
3場所連続で引退勧告が出ます。`});break;case"yokozuna_retire_forced":l({em:"🎋",title:`${e.name}横綱引退勧告`,text:"3場所連続負け越しにより引退勧告が出ました。",choices:[{label:"引退する",fn:()=>R(e)}]});break}}function eo(o,e){l({em:"🎽",title:"化粧まわしを選ぼう！",text:`関取の証！晴れ舞台を彩る
化粧まわしを選んでください。
（後から変更できます）`,choices:Y.map(s=>({label:`🎽 ${s.name}（${s.desc}）`,fn:()=>{o.keshoMawashi=s.id,b(),e==null||e()}}))})}function I(o,e){l({em:"✏",title:`${o.name}のしこ名変更`,text:`${e}昇進を機に、しこ名を変更しますか？`,type:"input",defaultValue:o.name,okLabel:"改名する",skipLabel:"このままでいい",onOk:s=>{if(s&&s!==o.name){o.nameHistory=o.nameHistory||[],o.nameHistory.push({name:o.name,occasion:e});const t=o.name;o.name=s,k({icon:"✏",text:`${t} → ${o.name}に改名（${e}）`}),b(),z(`${o.name}に改名しました！`)}},onSkip:()=>{}})}function so(o){l({em:"🎋",title:`${o.name} 定年引退`,text:`${o.name}は${o.age}歳。現役を引退しました。
お疲れ様でした！`,onOk:()=>R(o)})}function no(o){var a;const e=o.disciple,s=r[e.divIdx],t=r[o.oldDivIdx];let n;return o.newDivIdx!==o.oldDivIdx?n=`${t.short}${o.oldPos}枚目 → <b>${s.short}${e.pos}枚目</b>`:o.newPos<o.oldPos?n=`${s.short}${o.oldPos}枚目 → <b>${s.short}${e.pos}枚目</b>（↑昇）`:o.newPos>o.oldPos?n=`${s.short}${o.oldPos}枚目 → ${s.short}${e.pos}枚目（↓降）`:n=`${s.short}${e.pos}枚目（変動なし）`,`
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
      ${o.isYusho?`<div class="rc-yusho">🏆 ${r[o.oldDivIdx].name}優勝！</div>`:""}
      ${((a=o.sansho)==null?void 0:a.length)>0?`<div class="rc-sansho">🎖 ${o.sansho.join("・")}</div>`:""}
      ${e.injuryLevel>=1?`<div class="rc-inj">🤕 怪我：${e.injuryLevel>=2?"重傷":"軽傷"}</div>`:""}
    </div>`}export{uo as renderResults};
