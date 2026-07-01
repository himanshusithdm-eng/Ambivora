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
