const U=guard('ngo');header();let editId=null;
const CATS=['Environment','Education','Health','Relief'];
function render(){
 const me=ngo(U.ngo),evs=S.events.filter(e=>e.ngo==U.ngo),rs=S.regs.filter(r=>{const e=ev(r.ev);return e.ngo==U.ngo&&!e.cancelled}),ed=editId?ev(editId):null,v=k=>ed?esc(ed[k]):'';
 $('#app').innerHTML=`<h2>${esc(me.name)}</h2><p class="meta">Manage your events and volunteers.</p>
 ${me.st=='verified'?'':`<div class="card" style="background:#fbe9c3;color:#7a5200;margin:12px 0"><b>${me.st=='pending'?'Awaiting admin verification.':'Verification was rejected.'}</b> Events you publish stay hidden from volunteers until the admin verifies your organisation.</div>`}
 <div class="stats"><div class="card stat"><b>${evs.filter(e=>!e.cancelled).length}</b><span>Events</span></div><div class="card stat"><b>${rs.filter(r=>r.st=='pending').length}</b><span>Pending requests</span></div><div class="card stat"><b>${rs.filter(r=>r.st=='approved').length}</b><span>Approved volunteers</span></div><div class="card stat"><b>${rs.filter(r=>r.pr).reduce((a,r)=>a+r.h,0)}</b><span>Volunteer hours</span></div></div>
 <div class="two"><div class="card"><h3>${ed?'Edit event':'Create an event'}</h3><label for="t">Title</label><input id="t" value="${v('title')}">
 <label for="c">Category</label><select id="c">${CATS.map(c=>`<option${ed&&ed.cat==c?' selected':''}>${c}</option>`).join('')}</select>
 <label for="l">Location</label><input id="l" value="${v('loc')}"><label for="d">Date</label><input id="d" type="date" min="${today}" value="${v('date')}">
 <label for="s">Volunteer slots</label><input id="s" type="number" min="1" value="${ed?ed.slots:20}"><label for="x">Description</label><textarea id="x" rows="3">${v('desc')}</textarea>
 <p><button class="btn" onclick="saveEvent()">${ed?'Save changes':'Publish event'}</button>${ed?' <button class="btn alt" onclick="editId=null;render()">Discard</button>':''}</p></div>
 <div class="card"><h3>Your events</h3>${evs.map(e=>{const ok=!e.cancelled&&e.date>=today,st=e.cancelled?'Cancelled':e.date<today?'Completed':me.st=='verified'?'Live':'Pending verification';
  return `<p style="margin:10px 0"><b>${esc(e.title)}</b> <span class="tag ${e.cancelled?'b':st=='Pending verification'?'w':''}">${st}</span><br><span class="meta">${fmt(e.date)} · ${used(e.id)}/${e.slots} slots filled</span>${ok?`<br><button class="btn sm alt" onclick="editEv(${e.id})">Edit</button> <button class="btn sm bad" onclick="cancelEv(${e.id})">Cancel event</button>`:''}</p>`}).join('')||'<p class="empty">No events yet. Publish your first event using the form.</p>'}</div></div>
 <h3 class="sec">Volunteer requests and attendance</h3><div class="card tw"><table><tr><th>Volunteer</th><th>Event</th><th>Status</th><th>Attended</th><th>Hours</th><th></th></tr>
 ${rs.map(r=>{const a=r.st=='approved';return `<tr><td>${esc(r.vol)}</td><td>${esc(ev(r.ev).title)}</td><td><span class="tag ${tagc(r.st)}">${r.st}</span></td>
 <td>${a?`<input type="checkbox" style="width:auto" id="p${r.id}" aria-label="Attended" ${r.pr?'checked':''}>`:'-'}</td><td>${a?`<input type="number" min="0" max="12" id="h${r.id}" aria-label="Hours" value="${r.h}">`:'-'}</td>
 <td>${r.st=='pending'?`<button class="btn sm" onclick="setSt(${r.id},'approved')">Approve</button> <button class="btn sm bad" onclick="setSt(${r.id},'rejected')">Reject</button>`:a?`<button class="btn sm alt" onclick="att(${r.id})">Save</button>`:''}</td></tr>`}).join('')}</table></div>`}
function editEv(id){editId=id;render();const t=$('#t');if(t&&t.scrollIntoView)t.scrollIntoView({behavior:'smooth',block:'center'})}
function cancelEv(id){if(!confirm('Cancel this event? Registered volunteers will see it as cancelled.'))return;ev(id).cancelled=true;if(editId==id)editId=null;save();toast('Event cancelled.');render()}
function saveEvent(){const g=i=>$('#'+i).value.trim();
 if(!g('t')||!g('l')||!g('d'))return toast('Add a title, location and date.');
 if(g('d')<today)return toast('Pick a date from today onwards.');
 const slots=+g('s')||10,d={title:g('t'),cat:g('c'),loc:g('l'),date:g('d'),slots,desc:g('x')||'Details coming soon.'};
 if(editId){const used0=used(editId);if(slots<used0)return toast(used0+' volunteers are already registered, so slots cannot go lower.');Object.assign(ev(editId),d);editId=null;toast('Changes saved.')}
 else{S.events.push({id:Date.now(),ngo:U.ngo,...d});toast(ngo(U.ngo).st=='verified'?'Event published.':'Event saved. Volunteers see it after admin verification.')}
 save();render()}
function setSt(id,st){S.regs.find(r=>r.id==id).st=st;save();toast('Request '+st+'.');render()}
function att(id){const r=S.regs.find(r=>r.id==id);r.pr=$('#p'+id).checked;r.h=r.pr?+$('#h'+id).value||0:0;save();toast('Attendance saved.');render()}
if(U)render();
