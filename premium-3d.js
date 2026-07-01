/* AMBIVORA V2 — Speed Optimized 3D interactions */
(function(){
  const root = document.documentElement;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const mobile = matchMedia('(max-width: 900px)').matches;

  function initCore(){
    // Add 3D orb only inside hero card; no heavy canvas on page load.
    document.querySelectorAll('.hero-card').forEach(card=>{
      if(!card.querySelector('.v2-ai-stage')){
        const stage=document.createElement('div');
        stage.className='v2-ai-stage';
        stage.innerHTML='<div class="v2-ring r1"></div><div class="v2-ring r2"></div><div class="v2-ai-core"></div>';
        card.prepend(stage);
      }
    });

    // Mouse glow only desktop, throttled, and after page is interactive.
    if(!mobile && !reduce){
      let glow=document.querySelector('.v2-cursor-light');
      if(!glow){ glow=document.createElement('div'); glow.className='v2-cursor-light'; document.body.prepend(glow); }
      root.style.setProperty('--mx', innerWidth/2+'px');
      root.style.setProperty('--my', innerHeight/3+'px');
      let raf=false, x=innerWidth/2, y=innerHeight/3;
      addEventListener('pointermove', e=>{
        x=e.clientX; y=e.clientY;
        if(!raf){
          raf=true;
          requestAnimationFrame(()=>{root.style.setProperty('--mx',x+'px');root.style.setProperty('--my',y+'px');raf=false;});
        }
      }, {passive:true});

      // Hero-only tilt. No tilt on every card to avoid lag.
      document.querySelectorAll('.hero-card').forEach(el=>{
        let raf2=false, rx=0, ry=0;
        el.addEventListener('pointermove', e=>{
          const r=el.getBoundingClientRect();
          ry=((e.clientX-r.left)/r.width-.5)*6;
          rx=((e.clientY-r.top)/r.height-.5)*-6;
          if(!raf2){
            raf2=true;
            requestAnimationFrame(()=>{el.style.transform=`perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-3px)`; raf2=false;});
          }
        }, {passive:true});
        el.addEventListener('pointerleave',()=>{el.style.transform='';});
      });
    }
  }

  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded', initCore, {once:true});
  } else initCore();
})();
