const U=guard('admin');header();
function render(){
 const vs=[...new Set(S.regs.map(r=>r.vol))],cats=[...new Set(S.events.map(e=>e.cat))],cnt=c=>S.events.filter(e=>e.cat==c).length;
 $('#app').innerHTML=`<h2>Admin dashboard</h2><p class="meta">Verify organisations and monitor activity.</p>
 <div class="stats"><div class="card stat"><b>${S.events.length}</b><span>Total events</span></div><div class="card stat"><b>${vs.length}</b><span>Volunteers</span></div><div class="card stat"><b>${S.regs.filter(r=>r.pr).reduce((a,r)=>a+r.h,0)}</b><span>Hours logged</span></div><div class="card stat"><b>${S.ngos.filter(n=>n.st=='pending').length}</b><span>NGOs awaiting review</span></div></div>
 <div class="two"><div class="card tw"><h3>NGO verification</h3><table><tr><th>Organisation</th><th>City</th><th>Status</th><th></th></tr>
 ${S.ngos.map(n=>`<tr><td>${esc(n.name)}</td><td>${esc(n.city)}</td><td><span class="tag ${tagc(n.st)}">${n.st}</span></td><td>${n.st=='pending'?`<button class="btn sm" onclick="ver(${n.id},'verified')">Verify</button> <button class="btn sm bad" onclick="ver(${n.id},'rejected')">Reject</button>`:''}</td></tr>`).join('')}</table></div>
 <div class="card"><h3>Events by category</h3><div class="bars">${cats.map(c=>`<div><span style="width:90px">${c}</span><i style="width:${cnt(c)*50}px"></i>${cnt(c)}</div>`).join('')}</div>
 <h3 style="margin-top:18px">Top volunteers by hours</h3>${vs.map(v=>[v,hours(v)]).sort((a,b)=>b[1]-a[1]).slice(0,3).map(([v,h])=>`<p style="margin:6px 0">${esc(v)} <span class="meta">· ${h} hrs</span></p>`).join('')}</div></div>
 <h3 class="sec">Reports</h3><div class="two"><div class="card"><h3>Volunteer hours per month</h3><div class="bars">${monthBars('h')}</div></div><div class="card"><h3>Events per month</h3><div class="bars">${monthBars('e')}</div></div></div>`}
function monthBars(k){const m={};S.events.forEach(e=>{const x=e.date.slice(0,7);m[x]=m[x]||{h:0,e:0};m[x].e++});
 S.regs.filter(r=>r.pr).forEach(r=>{m[ev(r.ev).date.slice(0,7)].h+=r.h});
 const keys=Object.keys(m).sort(),mx=Math.max(1,...keys.map(x=>m[x][k]));
 return keys.map(x=>`<div><span style="width:80px">${new Date(x+'-01T00:00').toLocaleDateString('en-IN',{month:'short',year:'numeric'})}</span><i style="width:${m[x][k]/mx*160}px"></i>${m[x][k]}</div>`).join('')}
function ver(id,st){ngo(id).st=st;save();toast('Organisation '+st+'.');render()}
if(U)render();
