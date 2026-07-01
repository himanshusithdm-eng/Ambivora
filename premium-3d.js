/* AMBIVORA V2 — Global 3D interactions */
(function(){
  const root=document.documentElement;
  function setPointer(x,y){root.style.setProperty('--mx',x+'px');root.style.setProperty('--my',y+'px')}
  setPointer(innerWidth/2,innerHeight/3);
  addEventListener('pointermove',e=>setPointer(e.clientX,e.clientY),{passive:true});

  if(!document.querySelector('.v2-cursor-light')){
    const glow=document.createElement('div');glow.className='v2-cursor-light';document.body.prepend(glow);
    const noise=document.createElement('div');noise.className='v2-noise';document.body.appendChild(noise);
  }

  document.querySelectorAll('.hero-card').forEach(card=>{
    if(!card.querySelector('.v2-ai-stage')){
      const stage=document.createElement('div');
      stage.className='v2-ai-stage';
      stage.innerHTML='<div class="v2-ring r1"></div><div class="v2-ring r2"></div><div class="v2-ring r3"></div><div class="v2-ai-core"></div>';
      card.prepend(stage);
    }
  });

  const tiltTargets=document.querySelectorAll('.hero-card,.card,.faq-box,.metric,.blog,.form,.step');
  tiltTargets.forEach(el=>{
    el.addEventListener('pointermove',e=>{
      const r=el.getBoundingClientRect();
      const x=e.clientX-r.left,y=e.clientY-r.top;
      const ry=((x/r.width)-.5)*14;
      const rx=((y/r.height)-.5)*-14;
      el.style.setProperty('--rx',(x/r.width*100)+'%');
      el.style.setProperty('--ry',(y/r.height*100)+'%');
      el.style.transform=`perspective(1100px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-8px) scale(1.015)`;
    });
    el.addEventListener('pointerleave',()=>{el.style.transform='';el.style.removeProperty('--rx');el.style.removeProperty('--ry')});
  });

  // 3D particle canvas background: lightweight, no external library
  const canvas=document.createElement('canvas');
  canvas.id='ambivora-v2-canvas';
  document.body.prepend(canvas);
  const ctx=canvas.getContext('2d');
  let w,h,dpr,particles=[];
  function resize(){
    dpr=Math.min(devicePixelRatio||1,2);w=innerWidth;h=innerHeight;
    canvas.width=w*dpr;canvas.height=h*dpr;canvas.style.width=w+'px';canvas.style.height=h+'px';ctx.setTransform(dpr,0,0,dpr,0,0);
    const count=Math.min(120,Math.max(55,Math.floor(w*h/17000)));
    particles=Array.from({length:count},(_,i)=>({
      x:Math.random()*w,y:Math.random()*h,z:Math.random()*1+.25,
      vx:(Math.random()-.5)*.22,vy:(Math.random()-.5)*.22,
      r:Math.random()*1.8+.55,phase:Math.random()*Math.PI*2
    }));
  }
  resize();addEventListener('resize',resize);
  let mx=w/2,my=h/2;addEventListener('pointermove',e=>{mx=e.clientX;my=e.clientY},{passive:true});
  function tick(t){
    ctx.clearRect(0,0,w,h);
    for(const p of particles){
      const par=(p.z-.25)*18;
      p.x+=p.vx+p.z*.03;p.y+=p.vy+Math.sin(t/900+p.phase)*.12;
      if(p.x<-20)p.x=w+20;if(p.x>w+20)p.x=-20;if(p.y<-20)p.y=h+20;if(p.y>h+20)p.y=-20;
      const dx=(mx-w/2)*.018*p.z,dy=(my-h/2)*.018*p.z;
      const x=p.x+dx+par,y=p.y+dy;
      const alpha=.18+.38*p.z;
      ctx.beginPath();ctx.arc(x,y,p.r*p.z,0,Math.PI*2);ctx.fillStyle=`rgba(118,215,255,${alpha})`;ctx.fill();
    }
    for(let i=0;i<particles.length;i++)for(let j=i+1;j<particles.length;j++){
      const a=particles[i],b=particles[j];const ax=a.x+(mx-w/2)*.018*a.z,ay=a.y+(my-h/2)*.018*a.z,bx=b.x+(mx-w/2)*.018*b.z,by=b.y+(my-h/2)*.018*b.z;
      const dist=Math.hypot(ax-bx,ay-by);if(dist<118){ctx.beginPath();ctx.moveTo(ax,ay);ctx.lineTo(bx,by);ctx.strokeStyle=`rgba(0,163,255,${(1-dist/118)*.16})`;ctx.stroke();}
    }
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
})();
