(function(){
var hdr=document.getElementById('hdr');
var burger=document.getElementById('burger');
var menu=document.getElementById('mmenu');
var ov=document.getElementById('ov');

function toggle(open){
burger.classList.toggle('open',open);
menu.classList.toggle('open',open);
ov.classList.toggle('show',open);
burger.setAttribute('aria-expanded',String(open));
burger.setAttribute('aria-label',open?'إغلاق القائمة':'فتح القائمة');
document.body.style.overflow=open?'hidden':'';
}
burger.addEventListener('click',function(){toggle(!menu.classList.contains('open'))});
ov.addEventListener('click',function(){toggle(false)});
menu.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){toggle(false)})});
document.addEventListener('keydown',function(e){if(e.key==='Escape')toggle(false)});
window.addEventListener('resize',function(){if(window.innerWidth>1080)toggle(false)});

var links=document.querySelectorAll('[data-s]');
function spy(){
var secs=document.querySelectorAll('main section[id]');
var y=window.scrollY+130,cur='home';
secs.forEach(function(s){if(s.offsetTop<=y)cur=s.id});
links.forEach(function(a){a.classList.toggle('active',a.getAttribute('data-s')===cur)});
hdr.classList.toggle('sc',window.scrollY>30);
}
window.addEventListener('scroll',spy,{passive:true});
spy();

var words=['تفصيل المطابخ','الأبواب بأنواعها','الدرايش والحماية','الليكسان والمظلات','الزجاج والمرايا','الصيانة الشاملة'];
var i=0,el=document.getElementById('rot');
setInterval(function(){
el.classList.add('out');
setTimeout(function(){
i=(i+1)%words.length;
el.textContent=words[i];
el.classList.remove('out');
},350);
},2600);
var rv=document.querySelectorAll('.rv,.rvl,.rvr');
if('IntersectionObserver' in window){
var io=new IntersectionObserver(function(en){
en.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}});
},{threshold:.15});
rv.forEach(function(n){io.observe(n)});
}else{rv.forEach(function(n){n.classList.add('in')})}

function count(el){
var to=+el.getAttribute('data-n'),p=el.getAttribute('data-p')||'',t0=null;
function step(t){
if(!t0)t0=t;
var k=Math.min((t-t0)/1600,1);
el.textContent=Math.floor(to*(1-Math.pow(1-k,3)))+p;
if(k<1)requestAnimationFrame(step);
}
requestAnimationFrame(step);
}
var nums=document.querySelectorAll('[data-n]');
if('IntersectionObserver' in window){
var io2=new IntersectionObserver(function(en){
en.forEach(function(e){if(e.isIntersecting){count(e.target);io2.unobserve(e.target)}});
},{threshold:.6});
nums.forEach(function(n){io2.observe(n)});
}else{nums.forEach(function(n){n.textContent=n.getAttribute('data-n')+(n.getAttribute('data-p')||'')})}
(function(){
var items=[].slice.call(document.querySelectorAll('.gitem'));
var tabs=document.querySelectorAll('.gtab');
tabs.forEach(function(t){
t.addEventListener('click',function(){
var f=t.getAttribute('data-f');
tabs.forEach(function(x){x.classList.toggle('on',x===t)});
items.forEach(function(it){
var ok=f==='all'||it.getAttribute('data-c')===f;
it.classList.toggle('hide',!ok);
if(ok)it.classList.add('in');
else{var v=it.querySelector('video');if(v&&!v.paused)v.pause()}
});
});
});

var vids=document.querySelectorAll('.gvid');
function fmtSync(box,v){box.classList.toggle('playing',!v.paused);box.classList.toggle('muted',v.muted)}
vids.forEach(function(box){
var v=box.querySelector('video'),bar=box.querySelector('.gbar'),fill=bar.querySelector('i'),media=box.querySelector('.gmedia');
function toggle(){
if(v.paused){
vids.forEach(function(o){var ov=o.querySelector('video');if(ov!==v&&!ov.paused)ov.pause()});
v.play();
}else v.pause();
}
box.querySelector('.gbig').addEventListener('click',toggle);
box.querySelector('.gp').addEventListener('click',toggle);
v.addEventListener('click',toggle);
v.addEventListener('play',function(){fmtSync(box,v)});
v.addEventListener('pause',function(){fmtSync(box,v)});
v.addEventListener('volumechange',function(){fmtSync(box,v)});
v.addEventListener('timeupdate',function(){if(v.duration)fill.style.width=(v.currentTime/v.duration*100)+'%'});
box.querySelector('.gm').addEventListener('click',function(){v.muted=!v.muted});
bar.addEventListener('click',function(e){
var r=bar.getBoundingClientRect();
if(v.duration)v.currentTime=Math.min(Math.max((r.right-e.clientX)/r.width,0),1)*v.duration;
});
box.querySelector('.gf').addEventListener('click',function(){
var fs=document.fullscreenElement||document.webkitFullscreenElement;
if(fs){(document.exitFullscreen||document.webkitExitFullscreen).call(document);return}
if(media.requestFullscreen)media.requestFullscreen();
else if(media.webkitRequestFullscreen)media.webkitRequestFullscreen();
else if(v.webkitEnterFullscreen)v.webkitEnterFullscreen();
});
fmtSync(box,v);
});

var lb=document.getElementById('glb'),lbi=document.getElementById('glbimg'),cur=0,list=[];
function visible(){return items.filter(function(it){return it.classList.contains('gimg')&&!it.classList.contains('hide')})}
function show(n){
cur=(n+list.length)%list.length;
var im=list[cur].querySelector('img');
lbi.src=im.getAttribute('src');lbi.alt=im.alt;
}
function openLb(it){
list=visible();
show(list.indexOf(it));
lb.classList.add('show');lb.setAttribute('aria-hidden','false');
document.body.style.overflow='hidden';
}
function closeLb(){
lb.classList.remove('show');lb.setAttribute('aria-hidden','true');
document.body.style.overflow='';
}
items.forEach(function(it){if(it.classList.contains('gimg'))it.addEventListener('click',function(){openLb(it)})});
lb.querySelector('.glbx').addEventListener('click',closeLb);
lb.querySelector('.glbnx').addEventListener('click',function(){show(cur+1)});
lb.querySelector('.glbp').addEventListener('click',function(){show(cur-1)});
lb.addEventListener('click',function(e){if(e.target===lb)closeLb()});
document.addEventListener('keydown',function(e){
if(!lb.classList.contains('show'))return;
if(e.key==='Escape')closeLb();
if(e.key==='ArrowLeft')show(cur+1);
if(e.key==='ArrowRight')show(cur-1);
});
})();
})();