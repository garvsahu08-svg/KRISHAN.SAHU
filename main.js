(()=>{
const S=window.SITE,$=id=>document.getElementById(id);
const el=(t,c,h)=>{const e=document.createElement(t);if(c)e.className=c;if(h!=null)e.textContent=h;return e};
const ico=n=>{const s=document.createElementNS("http://www.w3.org/2000/svg","svg");s.setAttribute("class","ic");s.innerHTML=`<use href="#i-${n}"/>`;return s};
const ext=(a,u)=>{a.href=u;a.target="_blank";a.rel="noopener noreferrer";return a};
// Photos
[["portrait",S.portrait],["portrait2",S.portraitAbout]].forEach(([id,src])=>{const i=$(id);i.alt=S.portraitAlt;i.src=src;i.onerror=()=>i.closest(".hero-photo,.about-photo").hidden=true});
// Stats
if(S.stats&&S.stats.length){S.stats.forEach(s=>{const li=el("li"),b=el("span","ibox");b.append(ico(s.icon));const t=el("span");t.append(el("b","",s.value),el("small","",s.label));li.append(b,t);$("stats").append(li)})}else $("stats").hidden=true;
// Chips
const chip=(i,t)=>{const li=el("li");li.append(i,document.createTextNode(t));$("chips").append(li)};
if(S.age)chip(ico("cal"),S.age);if(S.location)chip(ico("pin"),S.location);if(S.availability)chip(el("span","dot"),S.availability);
// Skills (inline brand-style icons)
const SK=[["HTML",'<path fill="#E34F26" d="M6 4h36l-3.3 36L24 44 9.3 40z"/><path fill="#fff" d="M16 13h17l-.4 5H21l.3 5h10.700l-1 11-7 2-7-2-.4-6h5l.2 3 3 .8 3-.8.4-4H16z"/>'],
["CSS",'<path fill="#1572B6" d="M6 4h36l-3.3 36L24 44 9.3 40z"/><path fill="#fff" d="M16 13h17l-.4 5H21.500l.3 4.500h10.200l-1 12-7 2-7-2-.4-5.500h5l.2 2.5 3 .8 3-.8.4-4.500H16.500z"/>'],
["JavaScript",'<rect x="5" y="5" width="38" height="38" rx="3" fill="#F7DF1E"/><path fill="#1A120E" d="M21 33c.7 1.2 1.6 2 3.2 2 1.3 0 2.2-.7 2.2-1.6 0-1.1-.9-1.5-2.4-2.100l-.8-.4c-2.4-1-4-2.3-4-5 0-2.5 1.9-4.4 4.8-4.4 2.1 0 3.6.7 4.7 2.600l-2.6 1.700c-.6-1-1.2-1.4-2.1-1.4-1 0-1.6.6-1.6 1.4 0 1 .6 1.4 2 2l.8.400c2.8 1.2 4.5 2.4 4.5 5.1 0 2.9-2.3 4.5-5.4 4.5-3 0-5-1.4-5.9-3.300zM11 33.500c.5.9 1 1.6 2.1 1.6 1 0 1.7-.4 1.7-2V21h3.300v11.100c0 3.4-2 4.9-4.8 4.9-2.6 0-4-1.3-4.8-2.900z"/>'],
["Node.js",'<path fill="none" stroke="#7BA05B" stroke-width="3" stroke-linejoin="round" d="M24 4 41 14v20L24 44 7 34V14z"/><path fill="#7BA05B" d="M22 18v12.500c0 1.5-1 2-2.5 1.400L17 30.500M30 20c-.5-1.2-1.8-2-3.5-2-2.2 0-3.5 1-3.5 2.6 0 4 7 2.2 7 6.2 0 1.8-1.8 2.7-3.6 2.7-1.8 0-3.1-.8-3.6-2.2"/>'],
["PostgreSQL",'<path fill="#6F8FB5" d="M14 12c0-4 4-7 10-7s10 3 10 8c3-1 6 0 6 3 0 4-3 8-7 9-1 3-3 4-5 4l-1 6c-2 1-4-1-4-4l-1-5c-3 0-6-2-6-6-3 0-5-2-5-5 0-2 1-3 3-3z"/><circle cx="29" cy="14" r="1.6" fill="#1A120E"/>'],
["Figma",'<rect x="14" y="4" width="10" height="10" rx="5" fill="#F24E1E"/><path fill="#FF7262" d="M24 4h5a5 5 0 0 1 0 10h-5z"/><path fill="#A259FF" d="M14 14h10v10H19a5 5 0 0 1-5-5z"/><circle cx="29" cy="19" r="5" fill="#1ABCFE"/><path fill="#0ACF83" d="M14 29a5 5 0 0 1 5-5h5v5a5 5 0 0 1-10 0z"/>']];
SK.forEach(([n,p])=>{const c=el("div","sk");c.innerHTML=`<svg viewBox="0 0 48 48" aria-hidden="true">${p}</svg><span>${n}</span>`;$("skillGrid").append(c)});
// Projects
S.projects.forEach(p=>{
  const c=el("article","card proj"),sh=el("div","shot");
  if(p.image){const i=el("img");i.src=p.image;i.alt=p.title+" preview";i.loading="lazy";sh.append(i)}
  const bar=el("div","pbar"),t=el("div");t.append(el("h3","",p.title),el("p","",p.type));bar.append(t);
  if(p.url){const a=ext(el("a"),p.url);a.setAttribute("aria-label","Open "+p.title);a.append(ico("ext"));bar.append(a)}
  c.append(sh,bar);$("projectGrid").append(c)});
// Contact (only what is configured)
const wa=m=>`https://wa.me/${S.whatsapp}${m?"?text="+encodeURIComponent(m):""}`;
const f=$("form"),fb=$("formBtns"),cb=$("contactBtns");
if(S.whatsapp){const a=ext(el("a","btn solid"),wa());a.append(ico("wa"),document.createTextNode("Chat on WhatsApp"));cb.append(a)}
if(S.email){const a=el("a","btn ghost");a.href="mailto:"+S.email;a.append(ico("mail"),document.createTextNode("Send Email"));cb.append(a)}
const send=k=>{const n=f.name.value.trim(),m=f.msg.value.trim();
  if(!n||!m){$("note").textContent="Please fill in your name and project details.";(n?f.msg:f.name).focus();return}
  const t=`Hi Krishan, I'm ${n}.\n${m}`;
  if(k==="wa")window.open(wa(t),"_blank","noopener");else location.href=`mailto:${S.email}?subject=${encodeURIComponent("Project enquiry from "+n)}&body=${encodeURIComponent(t)}`;
  $("note").textContent=k==="wa"?"Opening WhatsApp with your message.":"Opening your email app."};
if(S.whatsapp){const b=el("button","btn solid","Send on WhatsApp");b.type="button";b.onclick=()=>send("wa");fb.append(b)}
if(S.email){const b=el("button","btn ghost","Send by email");b.type="button";b.onclick=()=>send("mail");fb.append(b)}
f.addEventListener("submit",e=>e.preventDefault());if(!S.whatsapp&&!S.email){f.hidden=true}
// Footer socials
[["instagram","ig"],["youtube","yt"]].forEach(([k,i])=>{const u=S.socials[k];if(!u)return;const a=ext(el("a"),u);a.setAttribute("aria-label",k);a.append(ico(i));$("soc").append(a)});
if(S.whatsapp){const a=ext(el("a"),wa());a.setAttribute("aria-label","WhatsApp");a.append(ico("wa"));$("soc").append(a)}
// Menu
const bg=$("burger"),menu=$("menu");
const close=()=>{menu.classList.remove("open");bg.setAttribute("aria-expanded","false");bg.setAttribute("aria-label","Open menu")};
bg.onclick=()=>{const o=menu.classList.toggle("open");bg.setAttribute("aria-expanded",o);bg.setAttribute("aria-label",o?"Close menu":"Open menu")};
menu.addEventListener("click",e=>{if(e.target.tagName==="A")close()});
document.addEventListener("keydown",e=>{if(e.key==="Escape")close()});
document.addEventListener("click",e=>{if(!e.target.closest(".nav"))close()});
// Reveal + active link
const calm=matchMedia("(prefers-reduced-motion:reduce)").matches;
const io="IntersectionObserver"in window&&!calm?new IntersectionObserver(es=>es.forEach(x=>{if(x.isIntersecting){x.target.classList.add("in");io.unobserve(x.target)}}),{threshold:.1}):null;
document.querySelectorAll(".reveal").forEach(n=>io?io.observe(n):n.classList.add("in"));
if("IntersectionObserver"in window){const links=[...menu.querySelectorAll("a")];
 const so=new IntersectionObserver(es=>es.forEach(x=>{if(x.isIntersecting){links.forEach(a=>a.classList.toggle("on",a.getAttribute("href")==="#"+x.target.id))}}),{rootMargin:"-45% 0px -50% 0px"});
 ["about","services","projects","contact"].forEach(i=>so.observe($(i)));
 new IntersectionObserver(es=>es.forEach(x=>{if(x.isIntersecting)links.forEach(a=>a.classList.toggle("on",a.getAttribute("href")==="#top"))}),{threshold:.4}).observe(document.querySelector(".hero"))}
})();
