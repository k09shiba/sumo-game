const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/index-Cj6Noyl4.js","assets/index-CG6UBM0C.css"])))=>i.map(i=>d[i]);
import{h as c,q as r,p as m,_ as o,s as n,l as b,t as u}from"./index-Cj6Noyl4.js";function p(){var s,i;const l=document.getElementById("screen-title"),d=c();l.innerHTML=`
    <div class="title-wrap">
      <div class="title-deco">🏯</div>
      <h1 class="title-main">横綱への道</h1>
      <div class="title-sub">〜相撲部屋育成記〜</div>

      <div class="title-btns">
        <button class="btn btn-red btn-big" id="btn-newgame">新しい部屋を始める</button>
        ${d?'<button class="btn btn-big" id="btn-continue">続きから</button>':""}
      </div>

      <div class="title-desc">
        <p>弟子を育て、横綱の座を目指そう。</p>
        <p>場所ごとに成長し、番付を駆け上がれ！</p>
      </div>

      <div style="font-size:10px;color:#999;margin-top:24px;text-align:center;">
        横綱への道 v3.0　© 2025
      </div>
    </div>`,(s=document.getElementById("btn-newgame"))==null||s.addEventListener("click",async()=>{if(c())r({em:"⚠",title:"セーブデータを削除しますか？",text:`現在のセーブデータはすべて消えます。
本当に新しくはじめますか？`,choices:[{label:"🗑 消してはじめる",cls:"btn-red",fn:async()=>{const{resetGame:t}=await o(async()=>{const{resetGame:e}=await import("./index-Cj6Noyl4.js").then(a=>a.c);return{resetGame:e}},__vite__mapDeps([0,1]));t(),await n("create")}},{label:"キャンセル",fn:()=>{}}]}),m();else{const{resetGame:t}=await o(async()=>{const{resetGame:e}=await import("./index-Cj6Noyl4.js").then(a=>a.c);return{resetGame:e}},__vite__mapDeps([0,1]));t(),await n("create")}}),(i=document.getElementById("btn-continue"))==null||i.addEventListener("click",async()=>{b()===!0?await n("main"):u("セーブデータの読み込みに失敗しました。")})}export{p as renderTitle};
