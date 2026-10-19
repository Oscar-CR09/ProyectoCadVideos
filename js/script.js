(() => {
 const root=document.documentElement, theme=document.querySelector('.theme-toggle'), toggle=document.querySelector('.menu-toggle'), menu=document.querySelector('#menu'), system=matchMedia('(prefers-color-scheme: dark)');
 let saved; try { saved=localStorage.getItem('oc-theme'); } catch(e) {}
 function setTheme(value){root.dataset.theme=value;theme.textContent=value==='dark'?'☀ Modo claro':'☾ Modo oscuro';theme.setAttribute('aria-label',`Cambiar a modo ${value==='dark'?'claro':'oscuro'}`);}
 setTheme(['dark','light'].includes(saved)?saved:system.matches?'dark':'light');
 theme.addEventListener('click',()=>{saved=root.dataset.theme==='dark'?'light':'dark';setTheme(saved);try{localStorage.setItem('oc-theme',saved);}catch(e){}});
 system.addEventListener('change',e=>{if(!saved)setTheme(e.matches?'dark':'light');});
 function close(){toggle.setAttribute('aria-expanded','false');menu.classList.remove('is-open');}
 toggle.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')!=='true';toggle.setAttribute('aria-expanded',String(open));menu.classList.toggle('is-open',open);});
 document.addEventListener('keydown',e=>{if(e.key==='Escape'&&toggle.getAttribute('aria-expanded')==='true'){close();toggle.focus();}});
 document.addEventListener('click',e=>{if(!e.target.closest('.site-header'))close();});
 menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',close));
 matchMedia('(min-width:1100px)').addEventListener('change',close);
 document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{
 document.querySelectorAll('[data-filter]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
 let count=0;document.querySelectorAll('[data-category]').forEach(card=>{card.hidden=button.dataset.filter!=='all'&&card.dataset.category!==button.dataset.filter;if(!card.hidden)count++;});
 document.querySelector('.results-count').textContent=`${count} ${count===1?'ruta disponible':'rutas disponibles'}`;
 }));
})();

/* Movimiento compartido y formulario de contacto */
(() => {
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 const elements=document.querySelectorAll('.hero-copy,.video-panel,.page-intro,.profile-banner,.section-heading,.card,.callout');
 if('IntersectionObserver' in window && !reduced.matches){
 const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('is-visible');observer.unobserve(e.target);}}),{threshold:0.08});
 elements.forEach((el,i)=>{el.classList.add('reveal');el.style.setProperty('--reveal-delay',`${i%3*70}ms`);observer.observe(el);});
 reduced.addEventListener('change',()=>{if(reduced.matches){elements.forEach(el=>el.classList.add('is-visible'));observer.disconnect();}});
 }
 const progress=document.createElement('div');progress.className='reading-progress';progress.setAttribute('aria-hidden','true');document.body.append(progress);
 const back=document.createElement('button');back.className='back-top';back.type='button';back.textContent='↑';back.setAttribute('aria-label','Volver al inicio');back.hidden=true;document.body.append(back);
 let scheduled=false;function update(){const h=document.documentElement.scrollHeight-innerHeight;progress.style.transform=`scaleX(${h>0?scrollY/h:0})`;back.hidden=scrollY<500;scheduled=false;}
 addEventListener('scroll',()=>{if(!scheduled){scheduled=true;requestAnimationFrame(update);}},{passive:true});addEventListener('resize',update);update();
 back.addEventListener('click',()=>{scrollTo({top:0,behavior:reduced.matches?'instant':'smooth'});document.querySelector('.skip-link').focus({preventScroll:true});});
 const form=document.querySelector('#contact-form');if(!form)return;
 const status=document.querySelector('#form-status'),submit=form.querySelector('[type="submit"]'),counter=document.querySelector('#message-count');
 form.elements.message.addEventListener('input',()=>counter.textContent=`${form.elements.message.value.length} / 3000 caracteres`);
 form.addEventListener('submit',async event=>{event.preventDefault();if(!form.reportValidity())return;
 if(location.protocol==='file:'){status.textContent='Abre el sitio desde un servidor con PHP para enviar tu consulta.';return;}
 submit.disabled=true;submit.textContent='Enviando…';form.setAttribute('aria-busy','true');status.textContent='Enviando tu consulta…';
 const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),20000);
 try{const response=await fetch(form.action,{method:'POST',body:new FormData(form),headers:{Accept:'application/json'},signal:controller.signal});const data=await response.json();if(!response.ok||!data.ok)throw Error(data.error||'No fue posible enviar. Inténtalo más tarde.');status.textContent='Tu consulta quedó registrada. Gracias por compartir tu proyecto.';status.dataset.state='success';form.reset();counter.textContent='0 / 3000 caracteres';}
 catch(error){status.dataset.state='error';status.textContent=error.name==='AbortError'?'No pudimos confirmar el envío. Inténtalo más tarde.':error instanceof SyntaxError?'El servicio de contacto no está disponible. Inténtalo más tarde.':error.message;}
 finally{clearTimeout(timer);submit.disabled=false;submit.textContent='Enviar consulta ↗';form.removeAttribute('aria-busy');}
 });
})();
