/* ============================================================
   BCREATIVE STUDIO — Frontend Authentication (Demo)
   localStorage-based session simulation
   ⚠️ Not secure — for UI demo only. Replace with real backend.
   ============================================================ */

(() => {
  'use strict';

  const STORAGE_KEY = 'bcreative_member';

  // Demo credentials (in production, never expose these)
  const DEMO_USER = {
    email: 'bharat@bcreative.studio',
    password: 'bharat2024',
    name: 'Bharat',
    role: 'Founder & Creative Director'
  };

  // ---------- Helpers ----------
  const setSession = (user, remember) => {
    const session = {
      email: user.email,
      name: user.name,
      role: user.role,
      loggedAt: Date.now()
    };
    const storage = remember ? localStorage : sessionStorage;
    storage.setItem(STORAGE_KEY, JSON.stringify(session));
  };

  const getSession = () => {
    const raw = localStorage.getItem(STORAGE_KEY) || sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    try { return JSON.parse(raw); } catch { return null; }
  };

  const clearSession = () => {
    localStorage.removeItem(STORAGE_KEY);
    sessionStorage.removeItem(STORAGE_KEY);
  };

  // Expose helpers globally so members.js can use them
  window.BCREATIVE_AUTH = { getSession, clearSession, setSession };

  // ---------- Login form ----------
  const loginForm = document.getElementById('loginForm');
  const loginError = document.getElementById('loginError');

  if (loginForm) {
    // If already logged in, redirect
    if (getSession()) {
      window.location.href = 'dashboard.html';
      return;
    }

    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      loginError.textContent = '';

      const email = document.getElementById('email').value.trim().toLowerCase();
      const password = document.getElementById('password').value;
      const remember = document.getElementById('remember').checked;

      // Add small simulated delay for realism
      const btn = loginForm.querySelector('button[type="submit"]');
      const original = btn.innerHTML;
      btn.innerHTML = '<span>Authenticating…</span>';
      btn.disabled = true;

      setTimeout(() => {
        if (email === DEMO_USER.email.toLowerCase() && password === DEMO_USER.password) {
          setSession(DEMO_USER, remember);
          // Smooth transition
          document.body.style.transition = 'opacity 0.4s ease';
          document.body.style.opacity = '0';
          setTimeout(() => window.location.href = 'dashboard.html', 350);
        } else {
          loginError.textContent = 'Invalid credentials. Try the demo login below.';
          btn.innerHTML = original;
          btn.disabled = false;
          // Shake card
          const card = document.querySelector('.login-card');
          card.style.animation = 'none';
          requestAnimationFrame(() => {
            card.style.animation = 'shake 0.4s ease';
          });
        }
      }, 600);
    });
  }

  // ---------- Member page protection ----------
  const isMemberPage =
    window.location.pathname.includes('/members/') &&
    !window.location.pathname.endsWith('login.html');

  if (isMemberPage) {
    const session = getSession();
    if (!session) {
      window.location.href = 'login.html';
      return;
    }
  }

  // ---------- Logout ----------
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      clearSession();
      document.body.style.transition = 'opacity 0.4s ease';
      document.body.style.opacity = '0';
      setTimeout(() => window.location.href = 'login.html', 350);
    });
  }

  // Inject shake keyframes (used on failed login)
  const style = document.createElement('style');
  style.textContent = `
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      25% { transform: translateX(-8px); }
      75% { transform: translateX(8px); }
    }
  `;
  document.head.appendChild(style);

})();
