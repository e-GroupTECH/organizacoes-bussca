document.getElementById('year').textContent = new Date().getFullYear();

// Sticky header shadow on scroll
const header = document.getElementById('siteHeader');
window.addEventListener('scroll', () => {
  header.classList.toggle('is-scrolled', window.scrollY > 10);
});

// Mobile nav
const navToggle = document.getElementById('navToggle');
const mobileNav = document.getElementById('mobileNav');
const mobileNavClose = document.getElementById('mobileNavClose');

function openMobileNav() { mobileNav.classList.add('is-open'); document.body.style.overflow = 'hidden'; }
function closeMobileNav() { mobileNav.classList.remove('is-open'); document.body.style.overflow = ''; }

navToggle && navToggle.addEventListener('click', openMobileNav);
mobileNavClose && mobileNavClose.addEventListener('click', closeMobileNav);
mobileNav && mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMobileNav));

// Scroll reveal (with safety net so content never stays hidden for
// tools/users that don't trigger a normal scroll, e.g. full-page capture)
const revealEls = document.querySelectorAll('[data-reveal]');
if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -5% 0px' });
  revealEls.forEach(el => revealObserver.observe(el));
} else {
  revealEls.forEach(el => el.classList.add('is-visible'));
}
window.setTimeout(() => {
  revealEls.forEach(el => el.classList.add('is-visible'));
}, 2500);

// Per-card vehicle image carousels (also powers the single large gallery on vehicle detail pages)
document.querySelectorAll('.inventory-card, .vehicle-gallery').forEach((card) => {
  const track = card.querySelector('.card-slider-track');
  if (!track) return;
  const slides = Array.from(track.children);
  if (slides.length < 2) {
    card.querySelectorAll('.card-arrow, .card-dots').forEach(el => el.style.display = 'none');
    return;
  }
  const prevBtn = card.querySelector('.card-arrow.prev');
  const nextBtn = card.querySelector('.card-arrow.next');
  const dotsWrap = card.querySelector('.card-dots');
  let index = 0;

  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.setAttribute('aria-label', 'Imagem ' + (i + 1));
    dot.addEventListener('click', (e) => { e.preventDefault(); goTo(i); });
    dotsWrap.appendChild(dot);
  });
  const dots = Array.from(dotsWrap.children);

  function render() {
    track.style.transform = 'translateX(-' + (index * 100) + '%)';
    dots.forEach((d, i) => d.classList.toggle('is-active', i === index));
  }
  function goTo(i) { index = (i + slides.length) % slides.length; render(); }

  prevBtn.addEventListener('click', (e) => { e.preventDefault(); goTo(index - 1); });
  nextBtn.addEventListener('click', (e) => { e.preventDefault(); goTo(index + 1); });
  render();
});
