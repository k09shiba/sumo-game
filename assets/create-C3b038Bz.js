import{G as t,s as g,a as f,b as k}from"./index-DFIJspz_.js";import{r as u,B as E,S,P as x,c as $,a as I}from"./disciple-B56uESAJ.js";import{g as B}from"./facility-BQLvS_Ra.js";import{i as q,r as D}from"./charRenderer-CIeJ27gz.js";import{t as m}from"./modal-gNpRr-OF.js";let n=null;function O(){const s=document.getElementById("screen-create");s.innerHTML=`
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
          <input type="text" id="inp-name" value="${u()}" maxlength="12" placeholder="しこ名">
          <button class="btn-sm" id="btn-reroll">🔀 変更</button>
        </div>
      </div>

      <div class="input-row">
        <label>体型</label>
        <div class="radio-group" id="sel-bodytype">
          ${E.map(e=>`
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
          ${S.map(e=>`
            <label class="radio-card">
              <input type="radio" name="style" value="${e.id}" ${e.id==="oshi"?"checked":""}>
              <span class="rc-name">${e.name}</span>
              <span class="rc-desc">${e.desc}</span>
            </label>`).join("")}
        </div>
      </div>

      <div class="input-row">
        <label>性格</label>
        <div class="radio-group" id="sel-personality">
          ${x.map(e=>`
            <label class="radio-card">
              <input type="radio" name="personality" value="${e.id}" ${e.id==="earnest"?"checked":""}>
              <span class="rc-name">${e.icon} ${e.name}</span>
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
    </div>`,document.getElementById("btn-reroll").onclick=()=>{document.getElementById("inp-name").value=u(),d()},document.getElementById("btn-preview").onclick=d,document.getElementById("btn-create").onclick=T,document.getElementById("btn-back-create").onclick=()=>g("title"),document.querySelectorAll('input[name="bodytype"], input[name="style"], input[name="personality"]').forEach(e=>{e.addEventListener("change",d)}),q(document.getElementById("preview-char")),d()}function d(){var l,p,a,c;const s=((l=document.getElementById("inp-name"))==null?void 0:l.value)||u(),e=((p=document.querySelector('input[name="bodytype"]:checked'))==null?void 0:p.value)||"anko",r=((a=document.querySelector('input[name="style"]:checked'))==null?void 0:a.value)||"oshi",o=((c=document.querySelector('input[name="personality"]:checked'))==null?void 0:c.value)||"earnest";n=$({name:s,bodyType:e,sumoStyle:r,personality:o,quality:2}),D(n);const i=document.getElementById("preview-stats");i&&(i.innerHTML=`
      <div class="pv-row"><span>筋力</span><b>${n.power}</b></div>
      <div class="pv-row"><span>技術</span><b>${n.tech}</b></div>
      <div class="pv-row"><span>精神</span><b>${n.spirit}</b></div>
      <div class="pv-row"><span>体重</span><b>${n.weight}kg</b></div>
      <div class="pv-row"><span>才能</span><b>${n.talent}</b></div>`)}function T(){var c,v,b,y,h;const s=(c=document.getElementById("inp-name"))==null?void 0:c.value.trim(),e=((v=document.querySelector('input[name="bodytype"]:checked'))==null?void 0:v.value)||"anko",r=((b=document.querySelector('input[name="style"]:checked'))==null?void 0:b.value)||"oshi",o=((y=document.querySelector('input[name="personality"]:checked'))==null?void 0:y.value)||"earnest",i=(h=document.getElementById("inp-stable"))==null?void 0:h.value.trim();if(!s){m("しこ名を入力してください！");return}const l=B();if(t.disciples.filter(w=>!w.retired).length>=l){m(`弟子の上限（${l}人）に達しています。`);return}t.disciples.length===0&&i&&(t.stableName=i);const a=$({name:s,bodyType:e,sumoStyle:r,personality:o});t.disciples.push(a),t.rival||(t.rival=I(a)),t.focusIdx=t.disciples.indexOf(a),f({icon:"🌱",text:`${a.name}が入門！`}),k(),m(`${a.name}が入門しました！`),g("main")}export{O as renderCreate};
