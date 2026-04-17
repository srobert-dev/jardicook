const e={model:"mini",modelLabel:"POD Mini",finish:"blanc",finishLabel:"Blanc Sable",door:"fleur",doorLabel:"Fleur de Cerisier",motif:"uni",motifLabel:"Uni",counter:"granit",counterLabel:"Granit Noir",options:[],step:1},r={mini:{blanc:"/images/Mini pod-blanc.png",noir:"/images/Mini pod -noir.png"},mid:{blanc:"/images/mid pod blanc.png",noir:"/images/mid pod noir.png"},big:{blanc:"/images/big pod config 1 .png",noir:"/images/big pod config 1 .png"}},E={mini:["plancha","eau","lumiere","hotte"],mid:["plancha","gaz6","eau","frigo","cave","hotte","lumiere","tv"],big:["plancha","gaz6","kamado","pizza","fumoir","eau","frigo","cave","hotte","lumiere","tv","son","chauffage"]},c=document.getElementById("preview-img"),_=document.getElementById("preview-badge"),$=document.getElementById("steps-fill"),C=document.getElementById("s-model"),I=document.getElementById("s-finish"),S=document.getElementById("s-door"),B=document.getElementById("s-motif"),x=document.getElementById("s-counter"),A=document.getElementById("s-options"),g=document.querySelectorAll(".step-dot");function f(t,o){const a=r[t]?.[o]??r[t]?.blanc;a&&!c.src.endsWith(encodeURI(a))&&(c.style.opacity="0",setTimeout(()=>{c.src=a,c.style.opacity="1"},180))}function d(){_.textContent=e.modelLabel,C.textContent=e.modelLabel,I.textContent=e.finishLabel||"—",S.textContent=e.doorLabel||"—",B.textContent=e.motifLabel||"—",x.textContent=e.counterLabel||"—",A.textContent=e.options.length?e.options.join(", "):"—"}function p(t){document.querySelectorAll(".step-panel").forEach(o=>o.classList.remove("step-panel--active")),document.getElementById(`step-${t}`)?.classList.add("step-panel--active"),e.step=t,$.style.width=`${(t-1)/3*100}%`,g.forEach((o,a)=>o.classList.toggle("step-dot--active",a<t)),t===4&&q(),window.scrollTo({top:0,behavior:"smooth"})}document.querySelectorAll(".btn-next").forEach(t=>t.addEventListener("click",()=>p(+t.dataset.next)));document.querySelectorAll(".btn-prev").forEach(t=>t.addEventListener("click",()=>p(+t.dataset.prev)));g.forEach(t=>t.addEventListener("click",()=>p(+t.dataset.step)));document.querySelectorAll(".model-card").forEach(t=>{t.addEventListener("click",()=>{document.querySelectorAll(".model-card").forEach(o=>o.classList.remove("model-card--active")),t.classList.add("model-card--active"),e.model=t.dataset.model,e.modelLabel=t.dataset.label,f(e.model,e.finish),b(),d()})});function m(t,o,a){document.querySelectorAll(`[data-type="${t}"]`).forEach(s=>{s.addEventListener("click",()=>{s.disabled||(document.querySelectorAll(`[data-type="${t}"]`).forEach(n=>n.classList.remove("option-card--active")),s.classList.add("option-card--active"),e[o]=s.dataset.value,e[a]=s.dataset.label,t==="finish"&&f(e.model,e.finish),d())})})}m("finish","finish","finishLabel");m("door","door","doorLabel");m("motif","motif","motifLabel");m("counter","counter","counterLabel");document.querySelectorAll(".option-card--toggle").forEach(t=>{t.addEventListener("click",()=>{if(t.disabled||t.dataset.included==="true")return;const o=t.dataset.label;t.classList.toggle("option-card--selected"),e.options=t.classList.contains("option-card--selected")?[...e.options,o]:e.options.filter(a=>a!==o),d()})});function b(){const t=E[e.model]??[];e.options=[],document.querySelectorAll(".option-card--toggle").forEach(o=>{const a=o.dataset.option,n=(o.dataset.models??"").split(",").includes(e.model),l=t.includes(a);o.disabled=!n,o.classList.toggle("option-card--disabled",!n),o.dataset.included=String(l&&n),n&&l?(o.classList.add("option-card--selected","option-card--included"),e.options.push(o.dataset.label)):o.classList.remove("option-card--selected","option-card--included")})}function q(){const t=document.getElementById("recap-content"),o=["Plancha Pro","Grill gaz 6 feux","Plaque induction","Four à pizza","Kamado céramique","Fumoir intégré"],a=["Eau courante + évier","Réfrigérateur encastré","Cave réfrigérée","Hotte aspirante","Éclairage architectural","Chauffage infrarouge","TV extérieure","Système audio"],s=e.options.filter(i=>o.includes(i)),n=e.options.filter(i=>a.includes(i)),l=(i,L="Aucune option")=>i.length?i.map(y=>`<span class="recap-chip">${y}</span>`).join(""):`<span class="recap-empty">${L}</span>`,v=r[e.model]?.[e.finish]??r[e.model]?.blanc,h={mini:"Compact",mid:"Polyvalent",big:"Premium"};t.innerHTML=`
      <!-- Hero sombre -->
      <div class="recap-hero">
        <div class="recap-hero__text">
          <span class="recap-hero__eyebrow">Jardicook · Configuration sur-mesure</span>
          <h3 class="recap-hero__model">${e.modelLabel}</h3>
          <span class="recap-hero__badge">${h[e.model]??""}</span>
        </div>
        <div class="recap-hero__img">
          <img src="${v}" alt="${e.modelLabel}" />
        </div>
      </div>

      <!-- Attributs finition -->
      <div class="recap-body">
        <p class="recap-section__title">Finition &amp; matériaux</p>
        <div class="recap-attrs">
          <div class="recap-attr">
            <span class="recap-attr__label">Structure</span>
            <strong class="recap-attr__val">${e.finishLabel}</strong>
          </div>
          <div class="recap-attr">
            <span class="recap-attr__label">Panneaux de porte</span>
            <strong class="recap-attr__val">${e.doorLabel}</strong>
          </div>
          <div class="recap-attr">
            <span class="recap-attr__label">Motif de façade</span>
            <strong class="recap-attr__val">${e.motifLabel}</strong>
          </div>
          <div class="recap-attr">
            <span class="recap-attr__label">Plan de travail</span>
            <strong class="recap-attr__val">${e.counterLabel}</strong>
          </div>
        </div>

        <!-- Options cuisson -->
        <p class="recap-section__title" style="margin-top:1.25rem;">Cuisson</p>
        <div class="recap-chips">${l(s)}</div>

        <!-- Options confort -->
        <p class="recap-section__title" style="margin-top:1rem;">Confort &amp; ambiance</p>
        <div class="recap-chips">${l(n)}</div>
      </div>
    `;const u=document.getElementById("f-message");u&&!u.value&&(u.value=`Modèle : ${e.modelLabel}
Structure : ${e.finishLabel}
Panneaux : ${e.doorLabel}
Motif : ${e.motifLabel}
Plan de travail : ${e.counterLabel}
Options : ${e.options.join(", ")||"aucune"}`)}document.getElementById("devis-form")?.addEventListener("submit",t=>{t.preventDefault(),document.getElementById("devis-form").hidden=!0,document.getElementById("form-confirm").hidden=!1});b();d();p(1);
