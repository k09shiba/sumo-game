import{G as t,s as y,a as w,b as $}from"./index-CEYR5qiW.js";import{r as p,B as f,S as k,c as h,a as x}from"./disciple-_UHwsf1a.js";import{g as E}from"./facility-omkSIHad.js";import{i as S,r as B}from"./charRenderer-BrDw1Ccq.js";import{t as o}from"./modal-gNpRr-OF.js";let n=null;function M(){const i=document.getElementById("screen-create");i.innerHTML=`
    <div class="create-wrap">
      <h2 class="screen-title">弟子を迎える</h2>

      ${t.disciples.length===0?`
        <div class="input-row">
          <label>部屋名</label>
          <input type="text" id="inp-stable" value="${t.stableName}" maxlength="12" placeholder="部屋名を入力">
        </div>`:""}

      <div class="input-row">
        <label>しこ名</label>
        <div style="display:flex;gap:6px;align-items:center;">
          <input type="text" id="inp-name" value="${p()}" maxlength="12" placeholder="しこ名">
          <button class="btn-sm" id="btn-reroll">🔀 変更</button>
        </div>
      </div>

      <div class="input-row">
        <label>体型</label>
        <div class="radio-group" id="sel-bodytype">
          ${f.map(e=>`
            <label class="radio-card">
              <input type="radio" name="bodytype" value="${e.id}" ${e.id==="anko"?"checked":""}>
              <span class="rc-name">${e.name}</span>
              <span class="rc-desc">${e.desc}</span>
            </label>`).join("")}
        </div>
      </div>

      <div class="input-row">
        <label>得意スタイル</label>
        <div class="radio-group" id="sel-style">
          ${k.map(e=>`
            <label class="radio-card">
              <input type="radio" name="style" value="${e.id}" ${e.id==="oshi"?"checked":""}>
              <span class="rc-name">${e.name}</span>
              <span class="rc-desc">${e.desc}</span>
            </label>`).join("")}
        </div>
      </div>

      <!-- プレビュー -->
      <div class="preview-section">
        <div id="preview-char" style="width:200px;height:300px;margin:0 auto;"></div>
        <div id="preview-stats" class="preview-stats"></div>
      </div>

      <div style="display:flex;gap:8px;justify-content:center;margin-top:12px;">
        <button class="btn" id="btn-preview">プレビュー更新</button>
        <button class="btn btn-red" id="btn-create">この力士を迎える！</button>
      </div>
      <button class="btn btn-back" id="btn-back-create">← 戻る</button>
    </div>`,document.getElementById("btn-reroll").onclick=()=>{document.getElementById("inp-name").value=p(),c()},document.getElementById("btn-preview").onclick=c,document.getElementById("btn-create").onclick=I,document.getElementById("btn-back-create").onclick=()=>y("title"),document.querySelectorAll('input[name="bodytype"], input[name="style"]').forEach(e=>{e.addEventListener("change",c)}),S(document.getElementById("preview-char")),c()}function c(){var l,r,a;const i=((l=document.getElementById("inp-name"))==null?void 0:l.value)||p(),e=((r=document.querySelector('input[name="bodytype"]:checked'))==null?void 0:r.value)||"anko",d=((a=document.querySelector('input[name="style"]:checked'))==null?void 0:a.value)||"oshi";n=h({name:i,bodyType:e,sumoStyle:d,quality:2}),B(n);const s=document.getElementById("preview-stats");s&&(s.innerHTML=`
      <div class="pv-row"><span>筋力</span><b>${n.power}</b></div>
      <div class="pv-row"><span>技術</span><b>${n.tech}</b></div>
      <div class="pv-row"><span>精神</span><b>${n.spirit}</b></div>
      <div class="pv-row"><span>体重</span><b>${n.weight}kg</b></div>
      <div class="pv-row"><span>才能</span><b>${n.talent}</b></div>`)}function I(){var m,u,v,b;const i=(m=document.getElementById("inp-name"))==null?void 0:m.value.trim(),e=((u=document.querySelector('input[name="bodytype"]:checked'))==null?void 0:u.value)||"anko",d=((v=document.querySelector('input[name="style"]:checked'))==null?void 0:v.value)||"oshi",s=(b=document.getElementById("inp-stable"))==null?void 0:b.value.trim();if(!i){o("しこ名を入力してください！");return}const l=E();if(t.disciples.filter(g=>!g.retired).length>=l){o(`弟子の上限（${l}人）に達しています。`);return}t.disciples.length===0&&s&&(t.stableName=s);const a=h({name:i,bodyType:e,sumoStyle:d});t.disciples.push(a),t.rival||(t.rival=x(a)),t.focusIdx=t.disciples.indexOf(a),w({icon:"🌱",text:`${a.name}が入門！`}),$(),o(`${a.name}が入門しました！`),y("main")}export{M as renderCreate};
