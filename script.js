const menu=document.querySelector('.menu');const links=document.querySelector('.links');if(menu){menu.addEventListener('click',()=>links.classList.toggle('open'))}
const items=document.querySelectorAll('.reveal');const obs=new IntersectionObserver((entries)=>{entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('show');obs.unobserve(e.target)}})},{threshold:.12});items.forEach(i=>obs.observe(i));
document.querySelectorAll('.hero-card, .card, .faq-box, .about-card, .metric').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateY = ((x / rect.width) - 0.5) * 12;
    const rotateX = ((y / rect.height) - 0.5) * -12;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

/* =====================================================
   AMBIVORA ULTRA 3D INTERACTION - Added by ChatGPT
===================================================== */
(function(){
  const canvas = document.getElementById('ambivora-particles');
  if(canvas){
    const ctx = canvas.getContext('2d');
    let w,h,dpr,particles=[];
    function resize(){
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.width = Math.floor(innerWidth*dpr);
      h = canvas.height = Math.floor(innerHeight*dpr);
      canvas.style.width = innerWidth+'px'; canvas.style.height = innerHeight+'px';
      particles = Array.from({length: Math.min(95, Math.floor(innerWidth/14))}, () => ({
        x: Math.random()*w, y: Math.random()*h, z: Math.random()*1+.2,
        vx:(Math.random()-.5)*.18*dpr, vy:(Math.random()-.5)*.18*dpr,
        r:(Math.random()*1.8+0.6)*dpr
      }));
    }
    function draw(){
      ctx.clearRect(0,0,w,h);
      for(const p of particles){
        p.x+=p.vx*p.z; p.y+=p.vy*p.z;
        if(p.x<0)p.x=w;if(p.x>w)p.x=0;if(p.y<0)p.y=h;if(p.y>h)p.y=0;
        ctx.beginPath();
        ctx.fillStyle='rgba(120,215,255,'+(0.22*p.z)+')';
        ctx.arc(p.x,p.y,p.r*p.z,0,Math.PI*2);ctx.fill();
      }
      for(let i=0;i<particles.length;i++){
        for(let j=i+1;j<particles.length;j++){
          const a=particles[i],b=particles[j],dx=a.x-b.x,dy=a.y-b.y,dist=Math.hypot(dx,dy);
          if(dist<120*dpr){ctx.beginPath();ctx.strokeStyle='rgba(0,163,255,'+(1-dist/(120*dpr))*0.09+')';ctx.lineWidth=1*dpr;ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke();}
        }
      }
      requestAnimationFrame(draw);
    }
    addEventListener('resize',resize,{passive:true}); resize(); draw();
  }

  const glow = document.querySelector('.cursor-glow');
  const stage = document.querySelector('.ambivora-3d-stage');
  document.addEventListener('mousemove', function(e){
    if(glow){ glow.style.left=e.clientX+'px'; glow.style.top=e.clientY+'px'; }
    if(stage){
      const x = (e.clientX / innerWidth - .5) * 18;
      const y = (e.clientY / innerHeight - .5) * -14;
      stage.style.transform = `rotateX(${58+y}deg) rotateZ(${-18+x}deg)`;
    }
  }, {passive:true});

  const tiltItems = document.querySelectorAll('.hero-card, .card, .faq-box, .about-card, .metric, .blog, .form');
  tiltItems.forEach(function(card){
    card.addEventListener('mousemove', function(e){
      const rect = card.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      const rx = (py - .5) * -14;
      const ry = (px - .5) * 14;
      card.style.transform = `perspective(1100px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-10px) translateZ(20px)`;
    });
    card.addEventListener('mouseleave', function(){ card.style.transform=''; });
  });
})();
