import{G as a,s as I,t as w,a as D,b as C}from"./index-DbcorYze.js";import{r as S,B as N,S as L,P as O,a as f,b as B,c as P,F as A,d as T,e as R}from"./disciple-CUbkEey9.js";import{g as G}from"./facility-Dm3WNKlI.js";import{i as H,r as M}from"./charRenderer-DMJ0wO-r.js";let t=null;function z(){const s=document.getElementById("screen-create");s.innerHTML=`
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
          <input type="text" id="inp-name" value="${S()}" maxlength="12" placeholder="しこ名">
          <button class="btn-sm" id="btn-reroll">🔀 変更</button>
        </div>
      </div>

      <div class="input-row">
        <label>体型</label>
        <div class="radio-group" id="sel-bodytype">
          ${N.map(e=>`
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
          ${L.map(e=>`
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
          ${O.map(e=>`
            <label class="radio-card">
              <input type="radio" name="personality" value="${e.id}" ${e.id==="earnest"?"checked":""}>
              <span class="rc-name">${e.icon} ${e.name}</span>
              <span class="rc-desc">${e.desc}</span>
            </label>`).join("")}
        </div>
      </div>

      <div class="input-row">
        <label>出身地</label>
        <div class="birthplace-group" id="sel-birthplace">
          ${f.map((e,i)=>`
            <label class="bp-radio">
              <input type="radio" name="birthplace" value="${e}" ${i===0?"checked":""}>
              <span>${e}</span>
            </label>`).join("")}
        </div>
      </div>

      <div class="input-row">
        <label>相撲経験</label>
        <div class="radio-group" id="sel-background">
          ${B.map(e=>`
            <label class="radio-card">
              <input type="radio" name="background" value="${e.id}" ${e.id==="fresh"?"checked":""}>
              <span class="rc-name">${e.icon} ${e.name}</span>
              <span class="rc-desc">${e.desc}</span>
            </label>`).join("")}
        </div>
      </div>

      <div class="input-row">
        <label>肌の色</label>
        <div class="skin-tone-group" id="sel-skintone">
          ${P.map(e=>`
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
          ${A.map(e=>`
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
    </div>`,document.getElementById("btn-reroll").onclick=()=>{document.getElementById("inp-name").value=S(),y()},document.getElementById("btn-preview").onclick=y,document.getElementById("btn-create").onclick=Y,document.getElementById("btn-back-create").onclick=()=>I("title"),document.querySelectorAll('input[name="bodytype"], input[name="style"], input[name="personality"], input[name="skintone"], input[name="facetype"], input[name="background"], input[name="birthplace"]').forEach(e=>{e.addEventListener("change",y)}),H(document.getElementById("preview-char")),y()}function y(){var l,g,n,d,r,o,p,u;const s=((l=document.getElementById("inp-name"))==null?void 0:l.value)||S(),e=((g=document.querySelector('input[name="bodytype"]:checked'))==null?void 0:g.value)||"anko",i=((n=document.querySelector('input[name="style"]:checked'))==null?void 0:n.value)||"oshi",h=((d=document.querySelector('input[name="personality"]:checked'))==null?void 0:d.value)||"earnest",k=((r=document.querySelector('input[name="skintone"]:checked'))==null?void 0:r.value)||"fair",$=((o=document.querySelector('input[name="facetype"]:checked'))==null?void 0:o.value)||"round",m=((p=document.querySelector('input[name="background"]:checked'))==null?void 0:p.value)||"fresh",v=((u=document.querySelector('input[name="birthplace"]:checked'))==null?void 0:u.value)||f[0];t=T({name:s,bodyType:e,sumoStyle:i,personality:h,skinTone:k,faceType:$,background:m,birthplace:v,quality:2}),M(t),B.find(b=>b.id===m);const c=document.getElementById("preview-stats");c&&(c.innerHTML=`
      <div class="pv-row"><span>筋力</span><b>${t.power}</b></div>
      <div class="pv-row"><span>技術</span><b>${t.tech}</b></div>
      <div class="pv-row"><span>精神</span><b>${t.spirit}</b></div>
      <div class="pv-row"><span>体重</span><b>${t.weight}kg</b></div>
      <div class="pv-row"><span>才能</span><b>${t.talent}</b></div>
      <div class="pv-row"><span>出身</span><b>${v}</b></div>`)}function Y(){var d,r,o,p,u,b,E,x,q;const s=(d=document.getElementById("inp-name"))==null?void 0:d.value.trim(),e=((r=document.querySelector('input[name="bodytype"]:checked'))==null?void 0:r.value)||"anko",i=((o=document.querySelector('input[name="style"]:checked'))==null?void 0:o.value)||"oshi",h=((p=document.querySelector('input[name="personality"]:checked'))==null?void 0:p.value)||"earnest",k=((u=document.querySelector('input[name="skintone"]:checked'))==null?void 0:u.value)||"fair",$=((b=document.querySelector('input[name="facetype"]:checked'))==null?void 0:b.value)||"round",m=((E=document.querySelector('input[name="background"]:checked'))==null?void 0:E.value)||"fresh",v=((x=document.querySelector('input[name="birthplace"]:checked'))==null?void 0:x.value)||f[0],c=(q=document.getElementById("inp-stable"))==null?void 0:q.value.trim();if(!s){w("しこ名を入力してください！");return}const l=G();if(a.disciples.filter(j=>!j.retired).length>=l){w(`弟子の上限（${l}人）に達しています。`);return}a.disciples.length===0&&c&&(a.stableName=c);const n=T({name:s,bodyType:e,sumoStyle:i,personality:h,skinTone:k,faceType:$,background:m,birthplace:v});a.disciples.push(n),a.rival||(a.rival=R(n)),a.focusIdx=a.disciples.indexOf(n),D({icon:"🌱",text:`${n.name}が入門！`}),C(),w(`${n.name}が入門しました！`),I("main")}export{z as renderCreate};
