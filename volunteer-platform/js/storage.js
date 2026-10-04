// localStorage helpers + shared utilities
const KEY='sevalink_multi_v3',today='2026-10-04';
let S;try{S=JSON.parse(localStorage.getItem(KEY))}catch(e){}
if(!S||!S.regs)S=JSON.parse(JSON.stringify(SEED));
const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){}};
const $=s=>document.querySelector(s);
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const ev=id=>S.events.find(e=>e.id==id),ngo=id=>S.ngos.find(n=>n.id==id);
const used=id=>S.regs.filter(r=>r.ev==id&&r.st!='rejected').length;
const hours=v=>S.regs.filter(r=>r.vol==v&&r.pr).reduce((a,r)=>a+r.h,0);
const fmt=d=>new Date(d+'T00:00').toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'});
const tagc=s=>s=='approved'||s=='verified'?'':s=='pending'?'w':'b';
function labelTables(){document.querySelectorAll('table').forEach(t=>{const h=[...t.querySelectorAll('th')].map(x=>x.textContent);t.querySelectorAll('tr').forEach(r=>[...r.children].forEach((c,i)=>{if(c.tagName=='TD'&&h[i])c.setAttribute('data-label',h[i])}))})}
(function(){const a=document.querySelector('#app');if(a&&typeof MutationObserver!='undefined')new MutationObserver(labelTables).observe(a,{childList:true,subtree:true})})();
function toast(m){const t=document.createElement('div');t.className='toast';t.textContent=m;document.body.appendChild(t);setTimeout(()=>t.remove(),2200)}
const badge=h=>h>=10?'Gold':h>=5?'Silver':h>0?'Bronze':'Newcomer';
function cancelReg(id){if(!confirm('Cancel this registration?'))return;S.regs=S.regs.filter(r=>r.id!=id);save();location.reload()}

