const menu=document.querySelector('.menu');
const links=document.querySelector('.links');
if(menu && links){menu.addEventListener('click',()=>links.classList.toggle('open'))}

const items=document.querySelectorAll('.reveal');
const obs=new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){e.target.classList.add('show');obs.unobserve(e.target)}
  })
},{threshold:.12});
items.forEach(i=>obs.observe(i));
