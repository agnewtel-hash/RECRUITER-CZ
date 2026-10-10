const header = document.querySelector('.site-header');
const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');

const setHeader = () => header.classList.toggle('scrolled', window.scrollY > 24);
setHeader();
window.addEventListener('scroll', setHeader, { passive: true });

menuButton.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Закрити меню' : 'Відкрити меню');
  document.body.style.overflow = open ? 'hidden' : '';
});

nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}));

document.getElementById('year').textContent = new Date().getFullYear();

if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: .12 });
  document.querySelectorAll('.section-heading, .about-grid, .job-card, .employers-grid, .contact-grid').forEach(el => {
    el.classList.add('reveal');
    observer.observe(el);
  });
}

const phoneDialog = document.getElementById('phone-choice');
const phoneClose = phoneDialog.querySelector('.phone-dialog-close');
let lastPhoneTrigger = null;
document.querySelectorAll('.phone-choice-trigger').forEach(trigger => {
  trigger.addEventListener('click', event => {
    event.preventDefault();
    lastPhoneTrigger = trigger;
    if (nav.classList.contains('open')) {
      nav.classList.remove('open');
      menuButton.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
    if (!phoneDialog.open) phoneDialog.showModal();
  });
});
phoneClose.addEventListener('click', () => phoneDialog.close());
phoneDialog.addEventListener('click', event => {
  if (event.target === phoneDialog) phoneDialog.close();
});
phoneDialog.addEventListener('close', () => lastPhoneTrigger?.focus());
