/* ============================================================
   Deminio Apps — app.js
   ============================================================ */

/* --- Sticky header shadow --- */
const header = document.querySelector('.header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 10);
}, { passive: true });

/* --- Mobile burger menu --- */
const burger  = document.querySelector('.nav__burger');
const navList = document.querySelector('.nav__list');

burger?.addEventListener('click', () => {
  const open = burger.classList.toggle('open');
  navList.classList.toggle('open', open);
  burger.setAttribute('aria-expanded', String(open));
  burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  document.body.style.overflow = open ? 'hidden' : '';
});

// Закрывать меню при клике на ссылку
navList?.querySelectorAll('.nav__link').forEach(link => {
  link.addEventListener('click', () => {
    burger.classList.remove('open');
    navList.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  });
});

/* --- Smooth scroll for anchor links --- */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = header ? header.offsetHeight : 0;
    const top = target.getBoundingClientRect().top + window.scrollY - offset - 8;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

/* --- Scroll-reveal animation --- */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(
  '.feature-card, .process__step, .about__content, .about__visual, .hero__content, .hero__visual'
).forEach((el, i) => {
  el.style.setProperty('--reveal-delay', `${i * 60}ms`);
  el.classList.add('reveal');
  revealObserver.observe(el);
});

/* --- Privacy & Terms tabs --- */
const privacyTabs = document.querySelectorAll('.privacy-tab');
const privacyContents = document.querySelectorAll('.privacy-content');

privacyTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const target = tab.dataset.tab;

    privacyTabs.forEach(t => {
      t.classList.remove('privacy-tab--active');
      t.setAttribute('aria-selected', 'false');
    });
    privacyContents.forEach(c => c.classList.add('privacy-content--hidden'));

    tab.classList.add('privacy-tab--active');
    tab.setAttribute('aria-selected', 'true');
    document.getElementById(target)?.classList.remove('privacy-content--hidden');
  });
});

/* --- Contact form handling --- */
const form = document.getElementById('contactForm');

form?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const btn = form.querySelector('[type="submit"]');

  // Simple validation
  let valid = true;
  form.querySelectorAll('[required]').forEach(field => {
    if (!field.value.trim()) {
      field.style.borderColor = '#ff6b6b';
      valid = false;
    } else {
      field.style.borderColor = '';
    }
  });
  if (!valid) return;

  btn.textContent = 'Sending…';
  btn.disabled = true;

  // Simulate async submit (replace with real endpoint)
  await new Promise(r => setTimeout(r, 1400));

  btn.textContent = '✓ Request sent!';
  btn.style.background = '#00c9a7';
  form.reset();

  setTimeout(() => {
    btn.textContent = 'Send Request →';
    btn.disabled = false;
    btn.style.background = '';
  }, 4000);
});

