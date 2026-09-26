(() => {
  'use strict';
  const root=document.documentElement;
  const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const button=document.getElementById('hamburger');
  const overlay=document.getElementById('nav-overlay');
  let open=false;
  function setMenu(value) {
    open=value;
    button.classList.toggle('open',open);
    overlay.classList.toggle('open',open);
    document.body.classList.toggle('nav-open',open);
    button.setAttribute('aria-expanded',String(open));
    overlay.setAttribute('aria-hidden',String(!open));
    overlay.inert=!open;
    document.body.style.overflow=open?'hidden':'';
    if(open) overlay.querySelector('a').focus(); else button.focus();
  }
  button.addEventListener('click',()=>setMenu(!open));
  overlay.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>setMenu(false)));
  document.addEventListener('keydown',e=>{
    if(!open) return;
    if(e.key==='Escape') { setMenu(false); return; }
    if(e.key==='Tab') {
      const nodes=[button,...overlay.querySelectorAll('a[href]')];
      let i=nodes.indexOf(document.activeElement);
      e.preventDefault();
      nodes[(i+(e.shiftKey?-1:1)+nodes.length)%nodes.length].focus();
    }
  });
  const theme=document.querySelector('.theme-toggle');
  function paintTheme() {
    const dark=root.classList.contains('dark');
    theme.textContent=dark?'☀︎':'☾';
    theme.setAttribute('aria-pressed',String(dark));
    document.querySelector('meta[name="theme-color"]').content=dark?'#16150f':'#fffff8';
  }
  theme.addEventListener('click',()=>{
    root.classList.toggle('dark');
    try {localStorage.setItem('theme',root.classList.contains('dark')?'dark':'light');} catch(e) {}
    paintTheme();
  });
  paintTheme();
  const progress=document.getElementById('prog');
  function updateProgress() {
    const range=root.scrollHeight-innerHeight;
    progress.style.width=(range>0?Math.min(100,scrollY/range*100):0)+'%';
  }
  addEventListener('scroll',updateProgress,{passive:true});
  addEventListener('resize',updateProgress); updateProgress();
  const now=document.getElementById('now-what');
  if(now&&!reduced) {
    const phrases=['building EutroBot','exploring voice biomarkers','learning across disciplines','mentoring student builders'];
    let i=0;
    setInterval(()=>{now.textContent=phrases[++i%phrases.length];},3800);
  }
  const form=document.getElementById('contact-form');
  if(form) form.addEventListener('submit',async event=>{
    event.preventDefault();
    const submit=form.querySelector('button[type="submit"]');
    const status=document.getElementById('form-status');
    if(submit.disabled) return;
    if(!form.reportValidity()) return;
    const data=new FormData(form);
    submit.disabled=true;
    submit.textContent='Sending…';
    form.setAttribute('aria-busy','true');
    status.textContent='Sending your message…';
    try {
      const response=await fetch(form.action,{
        method:'POST',
        body:data,
        headers:{Accept:'application/json'}
      });
      if(!response.ok) {
        const result=await response.json().catch(()=>null);
        const details=result&&Array.isArray(result.errors)
          ? result.errors.map(error=>error.message).filter(Boolean).join(' ')
          : '';
        throw new Error(details||'Your message could not be sent. Please try again or use the email link below.');
      }
      status.textContent='Thank you! Your message was submitted successfully.';
      form.reset();
    } catch(error) {
      status.textContent=error instanceof TypeError
        ? 'Could not connect. Please check your internet connection and try again, or use the email link below.'
        : error.message;
    } finally {
      submit.disabled=false;
      submit.textContent='Send Message →';
      form.removeAttribute('aria-busy');
    }
  });
  // Use the reference's letter-by-letter entrance on the home page only.
  if(now&&!reduced) {
    let seen=false; try {seen=sessionStorage.getItem('parikshit-splash')==='1';sessionStorage.setItem('parikshit-splash','1');} catch(e) {}
    if(!seen) {
      const splash=document.createElement('div');
      splash.id='splash'; splash.setAttribute('aria-hidden','true');
      const letters=[...'Parikshitsinh Jadeja'].map((c,i)=>c===' '?'<span class="sp"></span>':`<span class="l" style="--i:${i}">${c}</span>`).join('');
      splash.innerHTML=`<div class="sp-inner"><p class="sp-eyebrow">Vadodara · India</p><div class="sp-name">${letters}</div><div class="sp-rule"><span></span></div><p class="sp-quip">good to see you :)</p></div>`;
      document.body.append(splash);
      const done=()=>{splash.classList.add('sp-done');setTimeout(()=>splash.remove(),900);};
      setTimeout(done,1200);
      splash.addEventListener('click',done,{once:true});
      addEventListener('keydown',done,{once:true});
    }
  }
})();
