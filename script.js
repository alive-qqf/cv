// script.js — 处理滚动 reveal、导航与进度条
document.addEventListener('DOMContentLoaded', ()=>{
  // Year
  document.getElementById('year').textContent = new Date().getFullYear();

  // Mobile nav toggle
  const navToggle = document.getElementById('nav-toggle');
  const nav = document.getElementById('nav');
  navToggle.addEventListener('click', ()=>{
    nav.classList.toggle('open');
    if(nav.classList.contains('open')){
      nav.style.display = 'flex';
      nav.style.flexDirection = 'column';
      nav.style.gap = '8px';
    } else {
      nav.style.display = '';
      nav.style.flexDirection = '';
      nav.style.gap = '';
    }
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', (e)=>{
      const href = a.getAttribute('href');
      if(href.length>1){
        e.preventDefault();
        const el = document.querySelector(href);
        if(el) el.scrollIntoView({behavior:'smooth',block:'start'});
      }
    });
  });

  // Reveal on scroll
  const observer = new IntersectionObserver((entries)=>{
    for(const entry of entries){
      if(entry.isIntersecting){
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    }
  },{threshold:0.12});

  document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

  // Progress bar
  const progress = document.getElementById('progress');
  const updateProgress = ()=>{
    const h = document.documentElement;
    const st = h.scrollTop || document.body.scrollTop;
    const sh = h.scrollHeight - h.clientHeight;
    const pct = (st/sh)*100 || 0;
    progress.style.width = pct + '%';
  };
  document.addEventListener('scroll', ()=>{requestAnimationFrame(updateProgress)});
  updateProgress();

  // Simple keyboard accessibility: focus outlines
  document.addEventListener('keyup', (e)=>{
    if(e.key === 'Tab') document.body.classList.add('show-focus');
  });

  // Animate skill bars when visible
  const skillObserver = new IntersectionObserver((entries)=>{
    for(const en of entries){
      if(en.isIntersecting){
        en.target.querySelectorAll('.bar span').forEach(s=>{
          const val = s.style.getPropertyValue('--value') || '70%';
          // slight delay for progressive fill
          setTimeout(()=>s.style.width = val, 80);
        });
        skillObserver.unobserve(en.target);
      }
    }
  },{threshold:0.2});
  const skillsSection = document.getElementById('skills');
  if(skillsSection) skillObserver.observe(skillsSection);
});
