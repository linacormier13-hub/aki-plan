// AKI — Plan d'action stratégique
// Interactive step toggle + scroll-triggered reveal

document.addEventListener('DOMContentLoaded', () => {

  // --- Scroll-triggered reveal for step cards ---
  const steps = document.querySelectorAll('.step');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const delay = parseInt(el.dataset.index || 0) % 4 * 80;
        setTimeout(() => el.classList.add('visible'), delay);
        observer.unobserve(el);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  steps.forEach(step => observer.observe(step));

  // --- Keyboard navigation for accessibility ---
  document.querySelectorAll('.step-card').forEach(card => {
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');

    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleStep(card);
      }
    });
  });

});

// --- Toggle open/close a step card ---
function toggleStep(card) {
  const isOpen = card.classList.contains('open');

  // Close all others
  document.querySelectorAll('.step-card.open').forEach(c => {
    if (c !== card) {
      c.classList.remove('open');
    }
  });

  // Toggle clicked card
  card.classList.toggle('open', !isOpen);

  // Smooth scroll into view if opening and card is near bottom of viewport
  if (!isOpen) {
    setTimeout(() => {
      const rect = card.getBoundingClientRect();
      if (rect.bottom > window.innerHeight - 60) {
        card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }, 380);
  }
}
