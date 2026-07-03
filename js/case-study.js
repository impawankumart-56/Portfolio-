const observer = new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting) e.target.classList.add('vis')});
},{threshold:0.05});

document.addEventListener('DOMContentLoaded', () => {
  const revealTargets = document.querySelectorAll('main h1, main h2, main h3, main p, main li, .work-card, .solution-card, .problem-item, .stat-item, .cta-block, .page-nav-card, .page-nav-item');
  revealTargets.forEach(el => {
    if (!el.classList.contains('srv') && !el.classList.contains('fade-up')) {
      el.classList.add('srv');
    }
  });
  document.querySelectorAll('.srv').forEach(el=>observer.observe(el));
});

// ── TOC LINK SCROLL AND HIGHLIGHT ──
document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll(".cs-section");
  const tocLinks = document.querySelectorAll(".cs-toc-link-horizontal");

  if (tocLinks.length > 0) {
    // Toggle TOC visibility based on header scroll position
    const header = document.querySelector(".cs-header");
    const tocBar = document.querySelector(".cs-toc-horizontal");
    if (header && tocBar) {
      const visibilityObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) {
            tocBar.classList.add("visible");
          } else {
            tocBar.classList.remove("visible");
          }
        });
      }, {
        root: null,
        rootMargin: "0px",
        threshold: 0
      });
      visibilityObserver.observe(header);
    }

    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -50% 0px",
      threshold: 0
    };

    const activeObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          tocLinks.forEach(link => {
            if (link.getAttribute("data-section") === id) {
              link.classList.add("active");
              
              // Smoothly scroll the active link into view in the horizontal container
              link.scrollIntoView({
                behavior: "smooth",
                inline: "nearest",
                block: "nearest"
              });
            } else {
              link.classList.remove("active");
            }
          });
        }
      });
    }, observerOptions);

    sections.forEach(section => activeObserver.observe(section));

    tocLinks.forEach(link => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const targetId = link.getAttribute("data-section");
        const targetSec = document.getElementById(targetId);
        if (targetSec) {
          window.scrollTo({
            top: targetSec.offsetTop - 130,
            behavior: "smooth"
          });
        }
      });
    });
  }
});


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