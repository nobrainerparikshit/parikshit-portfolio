(() => {
  'use strict';
  const items=(window.PORTFOLIO_GALLERY||[]).filter(item=>item&&typeof item.file==='string'&&!/[\\/]/.test(item.file)&&/\.(jpe?g|png|webp|gif|avif)$/i.test(item.file));
  const hosts=[...document.querySelectorAll('[data-gallery]')];
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  let active=0,opener=null;
  const dialog=document.createElement('dialog');
  dialog.className='gallery-dialog';
  dialog.setAttribute('aria-labelledby','gallery-dialog-title');
  dialog.innerHTML='<div class="gallery-dialog-bar"><h2 id="gallery-dialog-title">Photo gallery</h2><button type="button" data-close aria-label="Close full-size image">Close ×</button></div><figure><img alt=""><figcaption></figcaption></figure><div class="gallery-dialog-controls"><button type="button" data-prev aria-label="Previous image">← Previous</button><button type="button" data-next aria-label="Next image">Next →</button></div>';
  document.body.append(dialog);
  const source=item=>'assets/gallery/'+encodeURIComponent(item.file);
  function show(index) {
    active=(index+items.length)%items.length;
    const item=items[active], image=dialog.querySelector('img');
    image.src=source(item);image.alt=item.alt||item.caption||item.file;
    dialog.querySelector('figcaption').textContent=item.caption||item.file;
    dialog.querySelector('h2').textContent=`Photo ${active+1} of ${items.length}`;
    dialog.querySelector('[data-prev]').hidden=items.length<2;
    dialog.querySelector('[data-next]').hidden=items.length<2;
  }
  dialog.querySelector('[data-close]').addEventListener('click',()=>dialog.close());
  dialog.querySelector('[data-prev]').addEventListener('click',()=>show(active-1));
  dialog.querySelector('[data-next]').addEventListener('click',()=>show(active+1));
  dialog.addEventListener('keydown',e=>{
    if(e.key==='ArrowLeft'){e.preventDefault();show(active-1);}
    if(e.key==='ArrowRight'){e.preventDefault();show(active+1);}
  });
  dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close();});
  dialog.addEventListener('close',()=>{if(opener?.isConnected)opener.focus();});
  function tile(item,index,duplicate=false) {
    const button=document.createElement('button');
    button.type='button';button.className='certificate-tile';button.dataset.image=String(index);
    button.setAttribute('aria-label','View full-size: '+(item.caption||item.file));
    if(duplicate){button.tabIndex=-1;button.setAttribute('aria-hidden','true');}
    const image=document.createElement('img');
    image.src=source(item);image.alt=item.alt||item.caption||item.file;image.decoding='async';
    button.append(image);return button;
  }
  function render(host) {
    if(!items.length) {
      host.replaceChildren(Object.assign(document.createElement('p'),{className:'gallery-empty',textContent:'Photographs will appear here soon.'}));return;
    }
    if(host.dataset.gallery==='grid') {
      host.replaceChildren();
      items.forEach((item,i)=>{
        const figure=document.createElement('figure'),caption=document.createElement('figcaption');
        caption.textContent=item.caption||item.file;figure.append(tile(item,i),caption);host.append(figure);
      });return;
    }
    const track=host.querySelector('.certificate-track');track.replaceChildren();
    const group=document.createElement('div');group.className='certificate-group';
    const repeats=reduced.matches?1:Math.max(1,Math.ceil((host.clientWidth+200)/(items.length*172)));
    for(let r=0;r<repeats;r++)items.forEach((item,i)=>group.append(tile(item,i,r>0)));
    track.append(group);
    if(!reduced.matches) {
      const clone=group.cloneNode(true);clone.setAttribute('aria-hidden','true');
      clone.querySelectorAll('button').forEach(b=>{b.tabIndex=-1;b.setAttribute('aria-hidden','true');});track.append(clone);
    }
    track.style.setProperty('--gallery-duration',Math.max(18,group.getBoundingClientRect().width/28)+'s');
    const region=host.querySelector('.certificate-window');
    region.setAttribute('aria-label',reduced.matches?'Photo gallery. Scroll horizontally to view images.':'Photo gallery; scrolls right to left. Hover or focus to pause.');
  }
  hosts.forEach(host=>{
    render(host);
    host.addEventListener('click',e=>{
      const button=e.target.closest('[data-image]');if(!button)return;
      opener=button;show(Number(button.dataset.image));dialog.showModal();
    });
    const toggle=host.querySelector('.gallery-toggle');
    toggle?.addEventListener('click',()=>{
      const paused=host.classList.toggle('is-paused');toggle.setAttribute('aria-pressed',String(paused));toggle.textContent=paused?'Resume scrolling':'Pause scrolling';
    });
  });
  let resizeTimer;
  addEventListener('resize',()=>{clearTimeout(resizeTimer);resizeTimer=setTimeout(()=>hosts.filter(h=>h.dataset.gallery==='marquee').forEach(render),150);});
  reduced.addEventListener('change',()=>hosts.forEach(render));
})();
