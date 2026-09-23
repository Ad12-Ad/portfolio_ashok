// ---------- Theme toggle (defaults to system preference, then remembers choice) ----------
const body = document.body;
const themeBtn = document.getElementById('theme-toggle');
const themeIcon = themeBtn.querySelector('i');
const systemPrefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
const savedTheme = localStorage.getItem('portfolio-theme');
const startLight = savedTheme ? savedTheme === 'light' : systemPrefersLight;

function applyTheme(isLight){
  body.classList.toggle('light', isLight);
  themeIcon.classList.toggle('fa-moon', !isLight);
  themeIcon.classList.toggle('fa-sun', isLight);
  themeBtn.setAttribute('aria-label', isLight ? 'Switch to dark theme' : 'Switch to light theme');
}
applyTheme(startLight);

themeBtn.addEventListener('click', () => {
  const nowLight = !body.classList.contains('light');
  applyTheme(nowLight);
  localStorage.setItem('portfolio-theme', nowLight ? 'light' : 'dark');
});

// ---------- Sticky nav border on scroll ----------
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 12);
}, { passive: true });

// ---------- Mobile menu ----------
const burger = document.getElementById('nav-burger');
const mobileMenu = document.getElementById('mobile-menu');
burger.addEventListener('click', () => {
  const open = mobileMenu.classList.toggle('open');
  burger.setAttribute('aria-expanded', open);
  burger.querySelector('i').className = open ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
});
mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  mobileMenu.classList.remove('open');
  burger.setAttribute('aria-expanded', false);
  burger.querySelector('i').className = 'fa-solid fa-bars';
}));

// ---------- Rotating role line ----------
const roles = ['Android Developer', 'Jetpack Compose Specialist', 'Clean-Architecture Advocate'];
const rotatorEl = document.getElementById('role-rotator');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!reduceMotion) {
  let i = 0;
  setInterval(() => {
    rotatorEl.classList.add('swap');
    setTimeout(() => {
      i = (i + 1) % roles.length;
      rotatorEl.textContent = roles[i];
      rotatorEl.classList.remove('swap');
    }, 350);
  }, 2600);
}

// ---------- Scroll reveal for sections (falls back to instantly visible) ----------
const revealSections = document.querySelectorAll('.reveal-section');
if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealSections.forEach(el => revealObserver.observe(el));
} else {
  revealSections.forEach(el => el.classList.add('visible'));
}

// ---------- Footer year ----------
document.getElementById('year').textContent = new Date().getFullYear();
