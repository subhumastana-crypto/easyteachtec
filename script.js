/* =============================================
   EasyTeachTec – JavaScript
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  // ============ NAVBAR SCROLL ============
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 30);
  }, { passive: true });

  // ============ ACTIVE NAV LINK ============
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const observerNav = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.toggle(
            'active',
            link.getAttribute('href') === `#${entry.target.id}`
          );
        });
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  sections.forEach(s => observerNav.observe(s));

  // ============ HAMBURGER / MOBILE MENU ============
  const hamburger = document.getElementById('hamburger');
  const navLinksEl = document.getElementById('nav-links');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinksEl.classList.toggle('mobile-open');
    document.body.style.overflow = navLinksEl.classList.contains('mobile-open') ? 'hidden' : '';
  });

  // Close mobile menu on link click
  navLinksEl.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinksEl.classList.remove('mobile-open');
      document.body.style.overflow = '';
    });
  });

  // ============ SCROLL ANIMATIONS (IntersectionObserver) ============
  const animEls = document.querySelectorAll('[data-aos]');

  const animObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const delay = parseInt(el.getAttribute('data-aos-delay') || '0', 10);
        setTimeout(() => el.classList.add('aos-animate'), delay);
        animObserver.unobserve(el);
      }
    });
  }, { threshold: 0.12 });

  animEls.forEach(el => animObserver.observe(el));

  // ============ SMOOTH SCROLL FOR ANCHOR LINKS ============
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ============ CONTACT FORM (simulate submission) ============
  const form = document.getElementById('contact-form');
  const successEl = document.getElementById('form-success');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('contact-name').value.trim();
      const school = document.getElementById('contact-school').value.trim();
      const phone = document.getElementById('contact-phone-input').value.trim();
      const message = document.getElementById('contact-message').value.trim();

      if (!name || !school || !phone || !message) {
        // Shake invalid inputs
        form.querySelectorAll('input, textarea').forEach(inp => {
          if (!inp.value.trim()) {
            inp.style.borderColor = '#EF4444';
            inp.addEventListener('focus', () => {
              inp.style.borderColor = '';
            }, { once: true });
          }
        });
        return;
      }

      const submitBtn = document.getElementById('form-submit-btn');
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="spin"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg> Sending...`;

      setTimeout(() => {
        form.reset();
        form.style.display = 'none';
        successEl.style.display = 'flex';
        successEl.style.alignItems = 'center';
        successEl.style.gap = '10px';

        // WhatsApp redirect hint
        setTimeout(() => {
          const waMsg = encodeURIComponent(`Hi EasyTeachTec! My name is ${name} from ${school}. ${message}`);
          window.open(`https://wa.me/919457286456?text=${waMsg}`, '_blank');
        }, 1200);
      }, 1600);
    });
  }

  // ============ COUNTER ANIMATION ============
  const statNumbers = document.querySelectorAll('.stat-number');

  const countUp = (el, target, suffix) => {
    let start = 0;
    const duration = 1800;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        el.textContent = target + suffix;
        clearInterval(timer);
      } else {
        el.textContent = Math.floor(start) + suffix;
      }
    }, 16);
  };

  const statsData = [
    { el: statNumbers[0], target: 500, suffix: '+' },
    { el: statNumbers[1], target: 50, suffix: '+' },
    { el: statNumbers[2], target: 5, suffix: 'hrs+' }
  ];

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        statsData.forEach(({ el, target, suffix }) => {
          if (el) countUp(el, target, suffix);
        });
        statsObserver.disconnect();
      }
    });
  }, { threshold: 0.5 });

  const heroStats = document.querySelector('.hero-stats');
  if (heroStats) statsObserver.observe(heroStats);

  // ============ FLOATING WA BUTTON SCROLL SHOW ============
  const floatingWa = document.getElementById('floating-whatsapp-btn');
  window.addEventListener('scroll', () => {
    floatingWa.style.opacity = window.scrollY > 200 ? '1' : '0';
    floatingWa.style.pointerEvents = window.scrollY > 200 ? 'all' : 'none';
  }, { passive: true });
  floatingWa.style.opacity = '0';
  floatingWa.style.transition = 'opacity 0.4s ease, transform 0.3s cubic-bezier(0.4,0,0.2,1), box-shadow 0.3s ease';

});

// Add spin style
const style = document.createElement('style');
style.textContent = `.spin { animation: spin 1s linear infinite; } @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`;
document.head.appendChild(style);
