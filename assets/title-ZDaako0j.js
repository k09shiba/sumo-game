const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/index-DFIJspz_.js","assets/index-B11wM8f0.css"])))=>i.map(i=>d[i]);
import{h as d,_ as l,s as i,l as r}from"./index-DFIJspz_.js";import{t as m}from"./modal-gNpRr-OF.js";function u(){var t,e;const a=document.getElementById("screen-title"),s=d();a.innerHTML=`
    <div class="title-wrap">
      <div class="title-deco">🏯</div>
      <h1 class="title-main">横綱への道</h1>
      <div class="title-sub">〜相撲部屋育成記〜</div>

      <div class="title-btns">
        <button class="btn btn-red btn-big" id="btn-newgame">新しい部屋を始める</button>
        ${s?'<button class="btn btn-big" id="btn-continue">続きから</button>':""}
      </div>

      <div class="title-desc">
        <p>弟子を育て、横綱の座を目指そう。</p>
        <p>場所ごとに成長し、番付を駆け上がれ！</p>
      </div>

      <div style="font-size:10px;color:#999;margin-top:24px;text-align:center;">
        横綱への道 v3.0　© 2025
      </div>
    </div>`,(t=document.getElementById("btn-newgame"))==null||t.addEventListener("click",async()=>{const{resetGame:n}=await l(async()=>{const{resetGame:c}=await import("./index-DFIJspz_.js").then(o=>o.c);return{resetGame:c}},__vite__mapDeps([0,1]));n(),await i("create")}),(e=document.getElementById("btn-continue"))==null||e.addEventListener("click",async()=>{r()===!0?await i("main"):m("セーブデータの読み込みに失敗しました。")})}export{u as renderTitle};
