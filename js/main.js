// ── PAGE LOADER ──
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.querySelector('.page-loader');
    if (loader) loader.classList.add('hidden');
  }, 1600);
});

// ── CUSTOM CURSOR ──
const cursor = document.querySelector('.cursor');
const follower = document.querySelector('.cursor-follower');
if (cursor && follower && window.innerWidth > 1024) {
  let mx = 0, my = 0, fx = 0, fy = 0;
  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cursor.style.left = mx + 'px';
    cursor.style.top = my + 'px';
  });
  function animFollower() {
    fx += (mx - fx) * 0.12;
    fy += (my - fy) * 0.12;
    follower.style.left = fx + 'px';
    follower.style.top = fy + 'px';
    requestAnimationFrame(animFollower);
  }
  animFollower();
  document.querySelectorAll('a,button,.card,.img-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.width = '20px'; cursor.style.height = '20px';
      follower.style.width = '50px'; follower.style.height = '50px';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.width = '10px'; cursor.style.height = '10px';
      follower.style.width = '30px'; follower.style.height = '30px';
    });
  });
}

// ── NAVBAR SCROLL ──
const navbar = document.querySelector('.navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  });
  if (window.scrollY > 60) navbar.classList.add('scrolled');
}

// ── HAMBURGER ──
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');
if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('open');
    document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
  });
  mobileMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      hamburger.classList.remove('active');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

// ── ACTIVE LINK HIGHLIGHT ──
const currentPath = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPath) {
    link.classList.add('active');
  }
});

// ── THEME TOGGLE ──
const themeBtn = document.querySelector('.btn-theme');
const themeIcon = document.querySelector('.theme-icon');
const saved = localStorage.getItem('wedinv-theme') || 'light';
document.documentElement.setAttribute('data-theme', saved);
if (themeIcon) themeIcon.textContent = saved === 'dark' ? '☀' : '☾';
if (themeBtn) {
  themeBtn.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('wedinv-theme', next);
    if (themeIcon) themeIcon.textContent = next === 'dark' ? '☀' : '☾';
  });
}

// ── RTL TOGGLE ──
const rtlBtn = document.querySelector('.btn-rtl');
if (rtlBtn) {
  const savedDir = localStorage.getItem('wedinv-dir') || 'ltr';
  document.documentElement.setAttribute('dir', savedDir);
  rtlBtn.textContent = savedDir === 'rtl' ? 'LTR' : 'RTL';
  rtlBtn.addEventListener('click', () => {
    const dir = document.documentElement.getAttribute('dir');
    const newDir = dir === 'rtl' ? 'ltr' : 'rtl';
    document.documentElement.setAttribute('dir', newDir);
    localStorage.setItem('wedinv-dir', newDir);
    rtlBtn.textContent = newDir === 'rtl' ? 'LTR' : 'RTL';
  });
}

// ── SCROLL REVEAL ──
const revealEls = document.querySelectorAll('.reveal,.reveal-left,.reveal-right');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
revealEls.forEach(el => revealObserver.observe(el));

// ── FAQ ACCORDION ──
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    const answer = item.querySelector('.faq-answer');
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => {
      i.classList.remove('open');
      i.querySelector('.faq-answer').style.maxHeight = null;
    });
    if (!isOpen) {
      item.classList.add('open');
      answer.style.maxHeight = answer.scrollHeight + 'px';
    }
  });
});

// ── PETAL RAIN ──
function createPetal() {
  const petal = document.createElement('div');
  petal.className = 'petal';
  petal.style.left = Math.random() * 100 + 'vw';
  petal.style.animationDuration = (4 + Math.random() * 6) + 's';
  petal.style.animationDelay = (Math.random() * 4) + 's';
  petal.style.width = petal.style.height = (8 + Math.random() * 8) + 'px';
  petal.style.opacity = 0.3 + Math.random() * 0.4;
  document.body.appendChild(petal);
  setTimeout(() => petal.remove(), 12000);
}
setInterval(createPetal, 600);

// ── COUNTER ANIMATION ──
function animateCounter(el) {
  const target = parseInt(el.dataset.target || el.textContent);
  const suffix = el.dataset.suffix || '';
  let current = 0;
  const inc = target / 60;
  const timer = setInterval(() => {
    current += inc;
    if (current >= target) { current = target; clearInterval(timer); }
    el.textContent = Math.floor(current) + suffix;
  }, 25);
}
const counterObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      animateCounter(e.target);
      counterObs.unobserve(e.target);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('.stat-num').forEach(el => {
  el.dataset.target = parseInt(el.textContent);
  el.dataset.suffix = el.textContent.replace(/[0-9]/g,'').trim();
  counterObs.observe(el);
});

// ── PARALLAX HERO ──
const heroSections = document.querySelectorAll('.hero, .page-hero, .cta-section');
window.addEventListener('scroll', () => {
  heroSections.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.bottom > 0 && rect.top < window.innerHeight) {
      const speed = 0.3;
      const offset = rect.top * speed;
      el.style.backgroundPositionY = `calc(center + ${offset}px)`;
    }
  });
});

// ── MOVE TO TOP ──
const moveToTopBtn = document.getElementById('moveToTop');
if (moveToTopBtn) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      moveToTopBtn.classList.add('visible');
    } else {
      moveToTopBtn.classList.remove('visible');
    }
  });
  moveToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ── CONTACT FORM ──
const contactForm = document.querySelector('.contact-form-el');
if (contactForm) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    btn.textContent = 'Message Sent ✦';
    btn.style.background = '#b8976a';
    setTimeout(() => {
      btn.textContent = 'Send Message';
      btn.style.background = '';
      contactForm.reset();
    }, 3000);
  });
}
