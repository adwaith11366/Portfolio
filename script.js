const c1=document.getElementById('cur'),c2=document.getElementById('cur2');
let cx=0,cy=0,ox=0,oy=0;
document.addEventListener('mousemove',e=>{cx=e.clientX;cy=e.clientY;c1.style.left=cx+'px';c1.style.top=cy+'px';});
(function ac(){ox+=(cx-ox)*.1;oy+=(cy-oy)*.1;c2.style.left=ox+'px';c2.style.top=oy+'px';requestAnimationFrame(ac);})();
document.querySelectorAll('a,button,.ec,.tc,.pc,.gi,.li,.it,.sfc span').forEach(el=>{
  el.addEventListener('mouseenter',()=>document.body.classList.add('hov'));
  el.addEventListener('mouseleave',()=>document.body.classList.remove('hov'));
});

const ldr=document.getElementById('ldr');
setTimeout(()=>{ldr.classList.add('out');document.body.classList.remove('ld');setTimeout(initGSAP,400);startTyping();initCanvas();},1900);

const nav=document.getElementById('nav');
const secs=document.querySelectorAll('section[id]');
const nls=document.querySelectorAll('.nme a');
window.addEventListener('scroll',()=>{
  nav.classList.toggle('stk',scrollY>20);
  let cur='';secs.forEach(s=>{if(scrollY>=s.offsetTop-120)cur=s.id;});
  nls.forEach(a=>a.classList.toggle('act',a.dataset.s===cur));
},{passive:true});

const bur=document.getElementById('bur'),mob=document.getElementById('mob');
bur.addEventListener('click',()=>{bur.classList.toggle('on');mob.classList.toggle('on');});
document.querySelectorAll('.ml').forEach(a=>a.addEventListener('click',()=>{bur.classList.remove('on');mob.classList.remove('on');}));

document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{
  const t=document.querySelector(a.getAttribute('href'));
  if(t){e.preventDefault();t.scrollIntoView({behavior:'smooth'});}
}));

const roles=['IT Student & Developer','BSc Information Systems — RNU','HR Manager · ESN Riga','Project Manager · 40+ Events','Python & Web Developer','AI Enthusiast','Multilingual · 5 Languages','Kerala → Latvia','Open to Internships'];
let ri=0,ci=0,del=false;
const tel=document.getElementById('twt');
function startTyping(){
  function t(){
    const cur=roles[ri];
    tel.textContent=del?cur.slice(0,ci--):cur.slice(0,ci++);
    if(!del&&ci>cur.length){del=true;setTimeout(t,1500);return;}
    if(del&&ci<0){del=false;ri=(ri+1)%roles.length;}
    setTimeout(t,del?32:68);
  }t();
}

function initCanvas(){
  const cv=document.getElementById('hcv'),ctx=cv.getContext('2d');
  let W,H;
  function rs(){W=cv.width=cv.offsetWidth||innerWidth;H=cv.height=cv.offsetHeight||innerHeight;}
  rs();window.addEventListener('resize',rs);
  const pts=Array.from({length:55},()=>({x:Math.random()*(W||1200),y:Math.random()*(H||800),vx:(Math.random()-.5)*.35,vy:(Math.random()-.5)*.35,r:Math.random()*1.3+.4,a:Math.random()*.45+.15,p:Math.random()*Math.PI*2}));
  let mx=-1,my=-1;
  cv.addEventListener('mousemove',e=>{const r=cv.getBoundingClientRect();mx=e.clientX-r.left;my=e.clientY-r.top;});
  (function draw(){
    ctx.clearRect(0,0,W,H);
    pts.forEach(p=>{
      p.x+=p.vx;p.y+=p.vy;p.p+=.022;
      if(p.x<0||p.x>W)p.vx*=-1;if(p.y<0||p.y>H)p.vy*=-1;
      const dx=p.x-mx,dy=p.y-my,d=Math.sqrt(dx*dx+dy*dy);
      if(d<90){p.x+=dx/d*1.2;p.y+=dy/d*1.2;}
      const al=p.a*(Math.sin(p.p)*.3+.7);
      ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fillStyle=`rgba(201,169,110,${al})`;ctx.fill();
    });
    for(let i=0;i<pts.length;i++)for(let j=i+1;j<pts.length;j++){
      const a=pts[i],b=pts[j],d=Math.hypot(a.x-b.x,a.y-b.y);
      if(d<115){ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.strokeStyle=`rgba(201,169,110,${.07*(1-d/115)})`;ctx.lineWidth=.7;ctx.stroke();}
    }
    requestAnimationFrame(draw);
  })();
}

const ro=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('vis');}),{threshold:.1});
document.querySelectorAll('[data-r]').forEach(el=>ro.observe(el));

const bo=new IntersectionObserver(es=>es.forEach(e=>{
  if(e.isIntersecting){const f=e.target.querySelector('.bfi');if(f)setTimeout(()=>f.style.width=e.target.dataset.p+'%',150);}
}),{threshold:.3});
document.querySelectorAll('.bar').forEach(b=>bo.observe(b));

const co=new IntersectionObserver(es=>es.forEach(e=>{
  if(!e.isIntersecting||e.target._done)return;
  e.target._done=true;
  const el=e.target.querySelector('.an'),target=parseInt(e.target.dataset.c,10);
  if(!el||isNaN(target))return;
  const dur=1800,start=performance.now();
  (function tick(now){const p=Math.min((now-start)/dur,1);el.textContent=Math.round((1-Math.pow(1-p,3))*target);if(p<1)requestAnimationFrame(tick);})(start);
}),{threshold:.5});
document.querySelectorAll('.ai[data-c]').forEach(el=>co.observe(el));

function initGSAP(){
  if(typeof gsap==='undefined')return;
  gsap.registerPlugin(ScrollTrigger);
  gsap.to('.hwm',{y:80,ease:'none',scrollTrigger:{trigger:'#home',start:'top top',end:'bottom top',scrub:1}});
  gsap.to('.pf img',{y:-28,ease:'none',scrollTrigger:{trigger:'#home',start:'top top',end:'bottom top',scrub:1.5}});
  gsap.fromTo('.gi',{y:30,opacity:0},{y:0,opacity:1,duration:.6,stagger:.08,ease:'power2.out',scrollTrigger:{trigger:'.gg',start:'top 80%'}});
  gsap.fromTo('.ec',{y:44,opacity:0},{y:0,opacity:1,duration:.75,stagger:.12,ease:'power3.out',scrollTrigger:{trigger:'.eg',start:'top 80%'}});
  gsap.fromTo('.sfc span',{scale:.85,opacity:0},{scale:1,opacity:1,duration:.3,stagger:.035,ease:'back.out(1.4)',scrollTrigger:{trigger:'.sfc',start:'top 85%'}});
  gsap.fromTo('.clr',{x:-22,opacity:0},{x:0,opacity:1,duration:.5,stagger:.09,ease:'power2.out',scrollTrigger:{trigger:'.cls',start:'top 80%'}});
}

document.querySelectorAll('.tc,.ec,.pc').forEach(c=>{
  c.addEventListener('mousemove',function(e){const r=this.getBoundingClientRect(),xr=(e.clientX-r.left)/r.width-.5,yr=(e.clientY-r.top)/r.height-.5;this.style.transform=`perspective(700px) rotateX(${-yr*5}deg) rotateY(${xr*5}deg) translateY(-4px)`;});
  c.addEventListener('mouseleave',function(){this.style.transform='';});
});

if(!document.getElementById('rps')){const s=document.createElement('style');s.id='rps';s.textContent='@keyframes rp{to{transform:translate(-50%,-50%) scale(3.5);opacity:0;}}';document.head.appendChild(s);}
document.querySelectorAll('.btn,.nhi').forEach(b=>{
  b.style.position='relative';b.style.overflow='hidden';
  b.addEventListener('click',function(e){const r=this.getBoundingClientRect(),rp=document.createElement('span');Object.assign(rp.style,{position:'absolute',borderRadius:'50%',width:'120px',height:'120px',left:(e.clientX-r.left)+'px',top:(e.clientY-r.top)+'px',transform:'translate(-50%,-50%) scale(0)',background:'rgba(255,255,255,.14)',animation:'rp .5s linear',pointerEvents:'none'});this.appendChild(rp);setTimeout(()=>rp.remove(),520);});
});