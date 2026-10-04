// Home listing (search/filter) + event details
let q='',cat='All',df='',dt='';
function renderHome(){
 const cats=['All',...new Set(S.events.map(e=>e.cat))];
 const me=user(),list=S.events.filter(e=>e.date>=today&&(cat=='All'||e.cat==cat)&&!e.cancelled&&(!df||e.date>=df)&&(!dt||e.date<=dt)&&(e.title+e.loc).toLowerCase().includes(q.toLowerCase())&&(ngo(e.ngo).st=='verified'||(me&&me.ngo==e.ngo))).sort((a,b)=>a.date.localeCompare(b.date));
 $('#app').innerHTML=`<section class="hero"><h1>Find a cause near you and show up.</h1><p>Browse verified NGO events, register in one click and collect certificates for your hours.</p>
 <div class="search"><input id="q" value="${esc(q)}" onkeydown="if(event.key=='Enter'){q=this.value;renderHome()}" placeholder="Search by event or location" aria-label="Search events"><button class="btn" style="background:var(--acc);color:#17302b" onclick="q=$('#q').value;renderHome()">Search</button></div></section>
 <div class="chips">${cats.map(c=>`<button class="chip ${c==cat?'on':''}" onclick="cat='${c}';renderHome()">${c}</button>`).join('')}</div>
 <div class="chips" style="align-items:center"><label class="meta" style="margin:0">From <input type="date" value="${df}" style="width:auto" onchange="df=this.value;renderHome()"></label><label class="meta" style="margin:0">To <input type="date" value="${dt}" style="width:auto" onchange="dt=this.value;renderHome()"></label><button class="chip" onclick="q='';cat='All';df='';dt='';renderHome()">Clear filters</button></div>
 <div class="grid">${list.map(e=>`<article class="card ev"><span class="tag">${e.cat}</span>${ngo(e.ngo).st=='verified'?'':'<span class="tag w">Visible only to you until verified</span>'}<h3>${esc(e.title)}</h3>
 <div class="meta">${fmt(e.date)}<br>${esc(e.loc)}<br>By ${esc(ngo(e.ngo).name)}</div><div class="meta"><b>${e.slots-used(e.id)}</b> of ${e.slots} slots left</div>
 <a class="btn" href="event-details.html?id=${e.id}">View details</a></article>`).join('')||'<p class="empty">No events match. Try a different search or category.</p>'}</div>`}
function renderDetail(){
 const e=ev(new URLSearchParams(location.search).get('id'));if(!e){$('#app').innerHTML='<p class="empty">Event not found.</p>';return}
 const u=user(),n=ngo(e.ngo),left=e.slots-used(e.id),r=u&&S.regs.find(r=>r.ev==e.id&&r.vol==u.name);
 const act=e.cancelled?'<span class="tag b">Cancelled by organiser</span>':r?`<span class="tag ${tagc(r.st)}">You are ${r.st}</span>${r.st!='rejected'&&!r.pr?` <button class="btn alt sm" onclick="cancelReg(${r.id})">Cancel registration</button>`:''}`:(u&&u.role=='volunteer')?`<button class="btn" style="width:100%" ${left<1?'disabled':''} onclick="register(${e.id})">${left<1?'Event full':'Register'}</button>`:`<a class="btn" style="width:100%" href="login.html">Log in as volunteer to register</a>`;
 $('#app').innerHTML=`<a class="btn alt sm" href="index.html">Back to events</a><div class="det" style="margin-top:14px"><div class="card"><span class="tag">${e.cat}</span><h2 style="margin-top:10px">${esc(e.title)}</h2>
 <p class="meta">Organised by ${esc(n.name)} <span class="tag">${n.st}</span></p><p>${esc(e.desc)}</p><p class="meta">Check in 30 minutes before start. The organiser records your attendance and hours.</p></div>
 <div class="card"><div class="meta">Date</div><b>${fmt(e.date)}</b><div class="meta" style="margin-top:10px">Location</div><b>${esc(e.loc)}</b><div class="meta" style="margin-top:10px">Slots left</div><b>${left} of ${e.slots}</b><div style="margin-top:18px">${act}</div></div></div>`}
function register(id){S.regs.push({id:Date.now(),ev:id,vol:user().name,st:'pending',pr:null,h:0});save();toast('Registered. Waiting for NGO approval.');renderDetail()}
if(!user())location.href='login.html';
header();const pg=document.body.dataset.page;if(pg=='home')renderHome();if(pg=='detail')renderDetail();
