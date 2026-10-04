// Fake login (no server) + role-based page access
const DASH={volunteer:'volunteer-dashboard.html',ngo:'ngo-dashboard.html',admin:'admin-dashboard.html'};
function startSession(a){setUser({name:a.name,email:a.email,role:a.role,ngo:a.ngo,city:a.city||''});location.href=a.role=='volunteer'?'index.html':DASH[a.role]}
function doLogin(email,pw){const a=S.accounts.find(x=>x.email==email.trim().toLowerCase()&&x.pw==pw);if(!a)return 'Email or password is incorrect.';startSession(a);return ''}
function doRegister(f){const email=f.email.trim().toLowerCase(),name=f.name.trim();
 if(!name)return 'Enter your name.';
 if(!/^\S+@\S+\.\S+$/.test(email))return 'Enter a valid email address.';
 if(f.pw.length<6)return 'Password must be at least 6 characters.';
 if(S.accounts.some(x=>x.email==email))return 'This email is already registered. Log in instead.';
 if(f.role=='volunteer'&&S.accounts.some(x=>x.role=='volunteer'&&x.name.toLowerCase()==name.toLowerCase()))return 'A volunteer with this name exists. Add your surname or an initial.';
 const a={name,email,pw:f.pw,role:f.role,city:f.city.trim()};
 if(f.role=='ngo'){const id=Date.now();S.ngos.push({id,name,city:a.city||'-',st:'pending'});a.ngo=id}
 S.accounts.push(a);save();startSession(a);return ''}
function resetPassword(email,pw){if(pw.length<6)return 'Password must be at least 6 characters.';const a=S.accounts.find(x=>x.email==email);if(!a)return 'Account not found.';a.pw=pw;save();return ''}
function user(){try{return JSON.parse(localStorage.getItem('sevalink_session'))}catch(e){return null}}
function setUser(u){try{localStorage.setItem('sevalink_session',JSON.stringify(u))}catch(e){}}
function logout(){try{localStorage.removeItem('sevalink_session')}catch(e){}location.href='index.html'}
function guard(role){const u=user();if(!u||u.role!=role){location.href='login.html';return null}return u}
function notes(u){const n=[],d=s=>Math.round((new Date(s+'T00:00')-new Date(today+'T00:00'))/864e5);
 if(u.role=='volunteer')S.regs.filter(r=>r.vol==u.name).forEach(r=>{const e=ev(r.ev);
  if(e.cancelled)n.push(`${e.title} was cancelled by the organiser.`);else if(r.st=='rejected')n.push(`Your request for ${e.title} was not approved.`);
  else if(r.pr)n.push(`Certificate ready for ${e.title}.`);
  else if(e.date>=today&&r.st=='approved')n.push(d(e.date)<=14?`Reminder: ${e.title} is in ${d(e.date)} days.`:`You are approved for ${e.title}.`);
  else if(e.date>=today)n.push(`${e.title} is waiting for NGO approval.`)});
 if(u.role=='ngo'){const c=S.regs.filter(r=>r.st=='pending'&&ev(r.ev).ngo==u.ngo&&!ev(r.ev).cancelled).length;if(c)n.push(`${c} volunteer request${c>1?'s':''} waiting for approval.`)}
 if(u.role=='admin'){const c=S.ngos.filter(x=>x.st=='pending').length;if(c)n.push(`${c} organisation${c>1?'s':''} waiting for verification.`)}
 return n}
function toggleNotes(){const p=$('#nt');p.hidden=!p.hidden}
function header(){const u=user(),p=location.pathname,on=h=>p.endsWith(h)||(h=='index.html'&&p.endsWith('/'))?'on':'';
 $('#hd').innerHTML=`<div class="bar"><a class="logo" href="index.html"><i></i>Sevaa</a><nav><a class="${on('index.html')}" href="index.html">Events</a>
 ${u?`<button class="bell" onclick="toggleNotes()" aria-label="Notifications">🔔<span class="cnt">${notes(u).length}</span></button><a class="${on(DASH[u.role])}" href="${DASH[u.role]}">Dashboard</a><button onclick="logout()">Log out<span class="uname"> (${esc(u.name)})</span></button>`:`<a class="${on('login.html')}" href="login.html">Log in</a>`}
</nav><div id="nt" class="notes" hidden>${u?(notes(u).map(t=>`<p>${esc(t)}</p>`).join('')||'<p>No new notifications.</p>'):''}</div></div>`}
