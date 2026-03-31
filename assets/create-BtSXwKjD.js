import{G as a,s as f,t as b,a as x,b as I}from"./index-CosIwvJz.js";import{r as h,B,S as T,P as q,a as D,F as j,c as S,b as N}from"./disciple-ItPjZfCN.js";import{g as C}from"./facility-B5FiZDS6.js";import{i as L,r as O}from"./charRenderer-CfSmtn2f.js";let t=null;function G(){const s=document.getElementById("screen-create");s.innerHTML=`
    <div class="create-wrap">
      <h2 class="screen-title">弟子を迎える</h2>

      ${a.disciples.length===0?`
        <div class="input-row">
          <label>部屋名</label>
          <input type="text" id="inp-stable" value="${a.stableName}" maxlength="12" placeholder="部屋名を入力">
        </div>`:""}

      <div class="input-row">
        <label>しこ名</label>
        <div style="display:flex;gap:6px;align-items:center;">
          <input type="text" id="inp-name" value="${h()}" maxlength="12" placeholder="しこ名">
          <button class="btn-sm" id="btn-reroll">🔀 変更</button>
        </div>
      </div>

      <div class="input-row">
        <label>体型</label>
        <div class="radio-group" id="sel-bodytype">
          ${B.map(e=>`
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
          ${T.map(e=>`
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
          ${q.map(e=>`
            <label class="radio-card">
              <input type="radio" name="personality" value="${e.id}" ${e.id==="earnest"?"checked":""}>
              <span class="rc-name">${e.icon} ${e.name}</span>
              <span class="rc-desc">${e.desc}</span>
            </label>`).join("")}
        </div>
      </div>

      <div class="input-row">
        <label>肌の色</label>
        <div class="skin-tone-group" id="sel-skintone">
          ${D.map(e=>`
            <label class="skin-radio">
              <input type="radio" name="skintone" value="${e.id}" ${e.id==="fair"?"checked":""}>
              <span class="skin-swatch" style="background:${e.css}"></span>
              <span class="skin-name">${e.name}</span>
            </label>`).join("")}
        </div>
      </div>

      <div class="input-row">
        <label>顔の形</label>
        <div class="radio-group" id="sel-facetype">
          ${j.map(e=>`
            <label class="radio-card">
              <input type="radio" name="facetype" value="${e.id}" ${e.id==="round"?"checked":""}>
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
    </div>`,document.getElementById("btn-reroll").onclick=()=>{document.getElementById("inp-name").value=h(),r()},document.getElementById("btn-preview").onclick=r,document.getElementById("btn-create").onclick=P,document.getElementById("btn-back-create").onclick=()=>f("title"),document.querySelectorAll('input[name="bodytype"], input[name="style"], input[name="personality"], input[name="skintone"], input[name="facetype"]').forEach(e=>{e.addEventListener("change",r)}),L(document.getElementById("preview-char")),r()}function r(){var l,y,n,c,d,o;const s=((l=document.getElementById("inp-name"))==null?void 0:l.value)||h(),e=((y=document.querySelector('input[name="bodytype"]:checked'))==null?void 0:y.value)||"anko",p=((n=document.querySelector('input[name="style"]:checked'))==null?void 0:n.value)||"oshi",u=((c=document.querySelector('input[name="personality"]:checked'))==null?void 0:c.value)||"earnest",m=((d=document.querySelector('input[name="skintone"]:checked'))==null?void 0:d.value)||"fair",v=((o=document.querySelector('input[name="facetype"]:checked'))==null?void 0:o.value)||"round";t=S({name:s,bodyType:e,sumoStyle:p,personality:u,skinTone:m,faceType:v,quality:2}),O(t);const i=document.getElementById("preview-stats");i&&(i.innerHTML=`
      <div class="pv-row"><span>筋力</span><b>${t.power}</b></div>
      <div class="pv-row"><span>技術</span><b>${t.tech}</b></div>
      <div class="pv-row"><span>精神</span><b>${t.spirit}</b></div>
      <div class="pv-row"><span>体重</span><b>${t.weight}kg</b></div>
      <div class="pv-row"><span>才能</span><b>${t.talent}</b></div>`)}function P(){var c,d,o,k,$,g,w;const s=(c=document.getElementById("inp-name"))==null?void 0:c.value.trim(),e=((d=document.querySelector('input[name="bodytype"]:checked'))==null?void 0:d.value)||"anko",p=((o=document.querySelector('input[name="style"]:checked'))==null?void 0:o.value)||"oshi",u=((k=document.querySelector('input[name="personality"]:checked'))==null?void 0:k.value)||"earnest",m=(($=document.querySelector('input[name="skintone"]:checked'))==null?void 0:$.value)||"fair",v=((g=document.querySelector('input[name="facetype"]:checked'))==null?void 0:g.value)||"round",i=(w=document.getElementById("inp-stable"))==null?void 0:w.value.trim();if(!s){b("しこ名を入力してください！");return}const l=C();if(a.disciples.filter(E=>!E.retired).length>=l){b(`弟子の上限（${l}人）に達しています。`);return}a.disciples.length===0&&i&&(a.stableName=i);const n=S({name:s,bodyType:e,sumoStyle:p,personality:u,skinTone:m,faceType:v});a.disciples.push(n),a.rival||(a.rival=N(n)),a.focusIdx=a.disciples.indexOf(n),x({icon:"🌱",text:`${n.name}が入門！`}),I(),b(`${n.name}が入門しました！`),f("main")}export{G as renderCreate};
