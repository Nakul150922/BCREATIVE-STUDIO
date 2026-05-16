/* ============================================================
   BCREATIVE STUDIO — Animations
   IntersectionObserver-based scroll reveals + counters
   ============================================================ */

(() => {
  'use strict';

  // ---------- Scroll reveal ----------
  const revealEls = document.querySelectorAll('[data-reveal]');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Slight stagger for siblings
          const idx = Array.from(entry.target.parentElement?.children || []).indexOf(entry.target);
          entry.target.style.transitionDelay = `${Math.min(idx * 0.08, 0.4)}s`;
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

    revealEls.forEach(el => observer.observe(el));
  } else {
    // Fallback
    revealEls.forEach(el => el.classList.add('revealed'));
  }

  // ---------- Stat counters ----------
  const statNums = document.querySelectorAll('.stat-num[data-count]');

  if (statNums.length && 'IntersectionObserver' in window) {
    const animateCount = (el) => {
      const target = parseInt(el.dataset.count, 10);
      const duration = 1800;
      const start = performance.now();
      const tick = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        // Eased
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.floor(eased * target);
        if (progress < 1) requestAnimationFrame(tick);
        else el.textContent = target + (target >= 100 ? '+' : '');
      };
      requestAnimationFrame(tick);
    };

    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          animateCount(e.target);
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.5 });

    statNums.forEach(s => obs.observe(s));
  }

  // ---------- Magnetic buttons ----------
  const magneticEls = document.querySelectorAll('.btn-primary, .nav-cta');
  if (window.matchMedia('(pointer: fine)').matches) {
    magneticEls.forEach(el => {
      el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - (rect.left + rect.width / 2);
        const y = e.clientY - (rect.top + rect.height / 2);
        el.style.transform = `translate(${x * 0.15}px, ${y * 0.25}px)`;
      });
      el.addEventListener('mouseleave', () => {
        el.style.transform = '';
      });
    });
  }

  // ---------- 3D tilt on work cards ----------
  const tiltCards = document.querySelectorAll('.phone-item, .value-card, .m-stat, .proj-card');
  if (window.matchMedia('(pointer: fine)').matches) {
    tiltCards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = `translateY(-6px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg)`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }

})();
