// Mock data (seed). Dates are around Oct 2026.
const SEED={
ngos:[{id:1,name:'Green Krishna Trust',city:'Vijayawada',st:'verified'},{id:2,name:'Asha Deepam Foundation',city:'Guntur',st:'verified'},{id:3,name:'Helping Hands Society',city:'Vijayawada',st:'pending'},{id:4,name:'Quick Relief Club',city:'Tenali',st:'pending'}],
events:[
{id:1,ngo:1,title:'Riverbank Tree Plantation',cat:'Environment',loc:'Prakasam Barrage, Vijayawada',date:'2026-10-18',slots:30,desc:'Plant 500 saplings along the Krishna riverbank. Tools and saplings are provided.'},
{id:2,ngo:2,title:'Weekend Teaching Camp',cat:'Education',loc:'Govt School, Guntur',date:'2026-10-24',slots:12,desc:'Help class 6-8 students with maths and English basics through fun activities.'},
{id:3,ngo:1,title:'Blood Donation Drive',cat:'Health',loc:'Benz Circle, Vijayawada',date:'2026-10-11',slots:40,desc:'Support registration, refreshments and guidance for donors at a city-wide camp.'},
{id:4,ngo:2,title:'Food Packet Distribution',cat:'Relief',loc:'Railway Station, Vijayawada',date:'2026-11-02',slots:20,desc:'Pack and distribute meals to families in need. Training given on site.'},
{id:5,ngo:1,title:'Beach Clean-up Day',cat:'Environment',loc:'Manginapudi Beach',date:'2026-09-20',slots:25,desc:'Completed drive that collected over 300 kg of plastic waste.'},
{id:6,ngo:2,title:'Digital Literacy for Seniors',cat:'Education',loc:'Community Hall, Guntur',date:'2026-09-13',slots:10,desc:'Completed workshop teaching senior citizens to use smartphones safely.'},
{id:7,ngo:2,title:'Village Health Camp',cat:'Health',loc:'Tenali',date:'2026-07-12',slots:15,desc:'Completed free health check-up camp.'},
{id:8,ngo:1,title:'Tree Care Drive',cat:'Environment',loc:'Vijayawada',date:'2026-08-16',slots:20,desc:'Completed watering and protection drive for young saplings.'}],
regs:[ // st: pending|approved|rejected, pr: present, h: hours
{id:1,ev:5,vol:'Asha Reddy',st:'approved',pr:true,h:4},{id:2,ev:6,vol:'Asha Reddy',st:'approved',pr:true,h:3},{id:3,ev:3,vol:'Asha Reddy',st:'approved',pr:null,h:0},{id:4,ev:1,vol:'Asha Reddy',st:'pending',pr:null,h:0},
{id:5,ev:1,vol:'Kiran Kumar',st:'pending',pr:null,h:0},{id:6,ev:1,vol:'Sneha Rao',st:'approved',pr:null,h:0},{id:7,ev:3,vol:'Ravi Teja',st:'approved',pr:null,h:0},{id:8,ev:3,vol:'Meena Devi',st:'pending',pr:null,h:0},{id:9,ev:5,vol:'Ravi Teja',st:'approved',pr:true,h:4},{id:10,ev:2,vol:'Kiran Kumar',st:'approved',pr:null,h:0},
{id:11,ev:7,vol:'Ravi Teja',st:'approved',pr:true,h:3},{id:12,ev:7,vol:'Kiran Kumar',st:'approved',pr:true,h:3},{id:13,ev:8,vol:'Sneha Rao',st:'approved',pr:true,h:5},{id:14,ev:8,vol:'Ravi Teja',st:'approved',pr:true,h:4}],
accounts:[ // demo accounts (password: demo123)
{name:'Asha Reddy',email:'asha@demo.com',pw:'demo123',role:'volunteer',city:'Vijayawada'},
{name:'Green Krishna Trust',email:'ngo@demo.com',pw:'demo123',role:'ngo',ngo:1,city:'Vijayawada'},
{name:'Platform Admin',email:'admin@demo.com',pw:'demo123',role:'admin'}]};
