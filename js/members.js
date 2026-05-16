/* ============================================================
   BCREATIVE STUDIO — Members Dashboard Behaviors
   Populates user data, handles search, etc.
   ============================================================ */

(() => {
  'use strict';

  // ---------- Personalize ----------
  const session = window.BCREATIVE_AUTH?.getSession();
  if (session) {
    const nameEl = document.getElementById('memberName');
    if (nameEl) nameEl.textContent = session.name || 'Member';
  }

  // ---------- Search filter (projects / resources) ----------
  const searchInput = document.querySelector('.search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const term = e.target.value.toLowerCase().trim();

      // Filter project cards
      document.querySelectorAll('.proj-card').forEach(card => {
        const text = card.textContent.toLowerCase();
        card.style.display = !term || text.includes(term) ? '' : 'none';
      });

      // Filter file rows
      document.querySelectorAll('.file-row').forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = !term || text.includes(term) ? '' : 'none';
      });
    });
  }

  // ---------- Animate progress bars on load ----------
  document.querySelectorAll('.bar span').forEach((bar, i) => {
    const target = bar.style.width;
    bar.style.width = '0';
    setTimeout(() => {
      bar.style.transition = 'width 1.2s cubic-bezier(.22,.61,.36,1)';
      bar.style.width = target;
    }, 200 + i * 100);
  });

  // ---------- File download simulation ----------
  document.querySelectorAll('.dl-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const original = btn.textContent;
      btn.textContent = 'Downloading…';
      btn.style.pointerEvents = 'none';
      setTimeout(() => {
        btn.textContent = '✓ Done';
        setTimeout(() => {
          btn.textContent = original;
          btn.style.pointerEvents = '';
        }, 1400);
      }, 900);
    });
  });

  // ---------- Stagger fade-in for cards ----------
  const cardsToAnimate = document.querySelectorAll('.m-stat, .proj-card, .res-cat, .announce');
  cardsToAnimate.forEach((card, i) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    setTimeout(() => {
      card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, 100 + i * 70);
  });

})();
