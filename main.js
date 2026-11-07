(()=>{
const S=window.SITE,$=id=>document.getElementById(id);
const el=(t,c,h)=>{const e=document.createElement(t);if(c)e.className=c;if(h!=null)e.textContent=h;return e};
// Portrait (graceful fallback if cutout not added yet)
[["portrait",".hero-photo"],["portrait2",".about-photo"]].forEach(([id,sel])=>{
  const i=$(id),box=document.querySelector(sel);i.alt=S.portraitAlt;
  i.onerror=()=>{box.classList.add("nophoto");i.removeAttribute("src")};i.src=S.portrait;});
$("loc").textContent=S.location;$("avail").textContent=S.availability;$("yr").textContent=new Date().getFullYear();
// Skills
S.skills.forEach(s=>{const c=el("div","card sk");c.append(el("b","",s.glyph),el("span","",s.name));$("skillGrid").append(c)});
// Projects
S.projects.forEach(p=>{
  const c=el("article","card proj"),shot=el("div","shot");
  if(p.image){const im=el("img");im.src=p.image;im.alt=p.title+" screenshot";im.loading="lazy";shot.textContent="";shot.append(im)}else shot.textContent=p.title;
  const b=el("div","in");b.append(el("h3","",p.title),el("p","type",p.type),el("p","",p.desc));
  if(p.url){const a=el("a","visit","Visit project");a.href=p.url;a.target="_blank";a.rel="noopener noreferrer";b.append(a)}else b.append(el("span","soon","Link coming soon"));
  c.append(shot,b);$("projectGrid").append(c)});
// Contact buttons: only render what is configured
const wa=m=>`https://wa.me/${S.whatsapp}${m?"?text="+encodeURIComponent(m):""}`;
const link=(txt,href,cls)=>{const a=el("a","btn "+cls,txt);a.href=href;if(href.startsWith("http")){a.target="_blank";a.rel="noopener noreferrer"}return a};
if(S.whatsapp)$("contactBtns").append(link("Chat on WhatsApp",wa(),"solid"));
if(S.email)$("contactBtns").append(link("Send Email","mailto:"+S.email,"ghost"));
const f=$("form"),fb=$("formBtns");
const send=(kind)=>{
  const n=f.name.value.trim(),m=f.msg.value.trim();
  if(!n||!m){$("note").textContent="Please fill in your name and project details.";(n?f.msg:f.name).focus();return}
  const text=`Hi Krishan, I'm ${n}.\n${m}`;
  if(kind==="wa")window.open(wa(text),"_blank","noopener");
  else location.href=`mailto:${S.email}?subject=${encodeURIComponent("Project enquiry from "+n)}&body=${encodeURIComponent(text)}`;
  $("note").textContent=kind==="wa"?"Opening WhatsApp with your message.":"Opening your email app.";};
if(S.whatsapp){const b=el("button","btn solid","Send on WhatsApp");b.type="button";b.onclick=()=>send("wa");fb.append(b)}
if(S.email){const b=el("button","btn ghost","Send by email");b.type="button";b.onclick=()=>send("mail");fb.append(b)}
f.addEventListener("submit",e=>e.preventDefault());
if(!S.whatsapp&&!S.email)f.hidden=true;
// Socials (hidden if empty)
Object.entries(S.socials).forEach(([k,u])=>{if(!u)return;const a=el("a","",k[0].toUpperCase()+k.slice(1));a.href=u;a.target="_blank";a.rel="noopener noreferrer";$("soc").append(a)});
if(S.whatsapp){const a=el("a","","WhatsApp");a.href=wa();a.target="_blank";a.rel="noopener noreferrer";$("soc").append(a)}
// Mobile menu
const bg=$("burger"),menu=$("menu");
const close=()=>{menu.classList.remove("open");bg.setAttribute("aria-expanded","false");bg.setAttribute("aria-label","Open menu")};
bg.onclick=()=>{const o=menu.classList.toggle("open");bg.setAttribute("aria-expanded",o);bg.setAttribute("aria-label",o?"Close menu":"Open menu")};
menu.addEventListener("click",e=>{if(e.target.tagName==="A")close()});
document.addEventListener("keydown",e=>{if(e.key==="Escape")close()});
document.addEventListener("click",e=>{if(!e.target.closest(".nav"))close()});
// Reveal + parallax
const calm=matchMedia("(prefers-reduced-motion:reduce)").matches;
const io="IntersectionObserver"in window&&!calm?new IntersectionObserver(es=>es.forEach(x=>{if(x.isIntersecting){x.target.classList.add("in");io.unobserve(x.target)}}),{threshold:.12}):null;
document.querySelectorAll(".reveal").forEach(n=>io?io.observe(n):n.classList.add("in"));
if(!calm&&matchMedia("(hover:hover) and (pointer:fine)").matches){
  const p=$("parallax").querySelector("img");
  addEventListener("pointermove",e=>{p.style.transform=`translate(${(e.clientX/innerWidth-.5)*10}px,${(e.clientY/innerHeight-.5)*6}px)`},{passive:true})}
})();
