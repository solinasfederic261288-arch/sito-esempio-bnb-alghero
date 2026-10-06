(function(){
  // Menu mobile
  var btn=document.querySelector('.menu-btn'), nav=document.getElementById('nav');
  btn.addEventListener('click',function(){var o=nav.classList.toggle('open');btn.setAttribute('aria-expanded',o)});
  nav.addEventListener('click',function(e){if(e.target.tagName==='A'){nav.classList.remove('open');btn.setAttribute('aria-expanded',false)}});

  // Animazioni all'ingresso
  var els=document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(en){en.forEach(function(x){if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target)}})},{threshold:.12});
    els.forEach(function(el){io.observe(el)});
  } else els.forEach(function(el){el.classList.add('in')});

  // Modale demo
  var modal=document.getElementById('modal'), mt=document.getElementById('modal-text'),
      wp=document.getElementById('wa-preview'), wb=document.getElementById('wa-bubble');
  function openModal(text,waMsg){
    mt.textContent=text;
    if(waMsg){wb.textContent=waMsg;wp.hidden=false}else wp.hidden=true;
    modal.hidden=false; modal.querySelector('.modal-ok').focus();
  }
  function closeModal(){modal.hidden=true}
  modal.addEventListener('click',function(e){if(e.target===modal||e.target.closest('.modal-x')||e.target.closest('.modal-ok'))closeModal()});
  document.addEventListener('keydown',function(e){if(e.key==='Escape'){closeModal();closeLb()}});

  var WA_TXT='Nel sito vero questo pulsante apre subito WhatsApp con il numero della struttura e un messaggio già pronto, così il cliente prenota in un tocco:';
  document.querySelectorAll('.js-wa').forEach(function(a){
    a.addEventListener('click',function(e){e.preventDefault();openModal(WA_TXT,a.dataset.msg)});
  });
  document.querySelectorAll('.js-demo').forEach(function(a){
    a.addEventListener('click',function(e){
      e.preventDefault();
      openModal(a.dataset.what==='email'
        ? 'Nel sito vero, toccando qui si apre l\'app email con l\'indirizzo della struttura già inserito.'
        : 'Nel sito vero, toccando qui il telefono chiama subito la struttura. Questo numero è solo un segnaposto.');
    });
  });

  // Pulsanti "Richiedi" delle camere preselezionano la camera
  var sel=document.querySelector('select[name="camera"]');
  document.querySelectorAll('[data-room]').forEach(function(a){
    a.addEventListener('click',function(){sel.value=a.dataset.room});
  });

  // Date minime
  var today=new Date().toISOString().slice(0,10);
  var ar=document.querySelector('input[name="arrivo"]'), pa=document.querySelector('input[name="partenza"]');
  ar.min=today; pa.min=today;
  ar.addEventListener('change',function(){pa.min=ar.value||today; if(pa.value&&pa.value<=ar.value)pa.value=''});

  // Form -> anteprima messaggio WhatsApp
  function fmt(d){if(!d)return '—';var p=d.split('-');return p[2]+'/'+p[1]+'/'+p[0]}
  document.getElementById('booking').addEventListener('submit',function(e){
    e.preventDefault(); var f=e.target;
    var msg='Ciao! Sono '+(f.nome.value.trim()||'…')+'.\nVorrei sapere se avete disponibilità:\n• Arrivo: '+fmt(f.arrivo.value)+'\n• Partenza: '+fmt(f.partenza.value)+'\n• Ospiti: '+f.ospiti.value+'\n• Camera: '+f.camera.value+'\nGrazie!';
    openModal(WA_TXT,msg);
  });

  // Lightbox galleria
  var lb=document.getElementById('lightbox'), lbi=lb.querySelector('img');
  function closeLb(){lb.hidden=true;lbi.src=''}
  document.querySelectorAll('.g-item').forEach(function(a){
    a.addEventListener('click',function(e){e.preventDefault();lbi.src=a.getAttribute('href');lbi.alt=a.querySelector('img').alt;lb.hidden=false});
  });
  lb.addEventListener('click',closeLb);
})();
