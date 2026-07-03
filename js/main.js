// FAQ toggle
function toggleFaq(btn){
  const item = btn.closest('.faq-item');
  const wasOpen = item.classList.contains('open');
  document.querySelectorAll('.faq-item.open').forEach(el=>el.classList.remove('open'));
  if(!wasOpen) item.classList.add('open');
}

// Scroll reveal
const observer = new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting) e.target.classList.add('vis')});
},{threshold:0.05});

document.addEventListener('DOMContentLoaded', () => {
  const revealTargets = document.querySelectorAll('main h1, main h2, main h3, main p, main li, .work-card, .solution-card, .problem-item, .stat-item, .cta-block');
  revealTargets.forEach(el => {
    if (!el.classList.contains('srv') && !el.classList.contains('fade-up')) {
      el.classList.add('srv');
    }
  });
  document.querySelectorAll('.srv').forEach(el=>observer.observe(el));
});

// ── LUFFY LOGIC ──
const luffy = document.getElementById('luffy');
const heroName = document.getElementById('hero-name');
let hideTimer = null;

function showLuffy(){
  clearTimeout(hideTimer);
  luffy.classList.remove('luffy-out');
  luffy.classList.add('luffy-in');
  hideTimer = setTimeout(()=>{
    luffy.classList.remove('luffy-in');
    luffy.classList.add('luffy-out');
  }, 3500);
}

// On page load — show after short delay
window.addEventListener('load', ()=>{
  setTimeout(showLuffy, 600);
});

// On hover over h1
heroName.addEventListener('mouseenter', showLuffy);

// ── THEME TOGGLE ──
function applyTheme(theme){
  document.documentElement.setAttribute('data-theme', theme);
  const moon = document.getElementById('icon-moon');
  const sun  = document.getElementById('icon-sun');
  if(theme === 'light'){
    if(moon) moon.style.display = 'none';
    if(sun)  sun.style.display  = 'block';
  } else {
    if(moon) moon.style.display = 'block';
    if(sun)  sun.style.display  = 'none';
  }
}
function toggleTheme(){
  const current = document.documentElement.getAttribute('data-theme') || 'dark';
  const next = current === 'dark' ? 'light' : 'dark';
  applyTheme(next);
  localStorage.setItem('pawan-theme', next);
}
// Init on load — default dark
(function(){
  const saved = localStorage.getItem('pawan-theme') || 'dark';
  applyTheme(saved);
})();

// ── HAMBURGER MENU ──
(function(){
  var btn=document.getElementById('navHamburger'),ov=document.getElementById('navOverlay');
  if(!btn||!ov)return;
  btn.addEventListener('click',function(){
    var open=btn.classList.toggle('open');
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    ov.classList.toggle('open',open);
    document.body.style.overflow=open?'hidden':'';
  });
  ov.querySelectorAll('a').forEach(function(a){
    a.addEventListener('click',function(){
      btn.classList.remove('open');
      btn.setAttribute('aria-expanded','false');
      ov.classList.remove('open');
      document.body.style.overflow='';
    });
  });
  // Close on Escape key
  document.addEventListener('keydown',function(e){
    if(e.key==='Escape'&&ov.classList.contains('open')){
      btn.classList.remove('open');
      btn.setAttribute('aria-expanded','false');
      ov.classList.remove('open');
      document.body.style.overflow='';
    }
  });
})();

// ── CURSOR-TRACKING TEXT HOVER SPOTLIGHT ──
document.addEventListener('DOMContentLoaded', () => {
  const elements = document.querySelectorAll('p, li, .hero-desc, .about-desc, .sec-h1, .sec-h2, .cs-h1');
  elements.forEach(el => {
    el.addEventListener('mousemove', e => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      el.style.setProperty('--mouse-x', `${x}px`);
      el.style.setProperty('--mouse-y', `${y}px`);
    });
  });
});