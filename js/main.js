/* ============================================================
   BCREATIVE STUDIO — Main JavaScript
   Handles navigation, cursor, scroll behaviors
   ============================================================ */

(() => {
  'use strict';

  // ---------- Navbar scroll state ----------
  const navbar = document.getElementById('navbar');
  if (navbar) {
    const onScroll = () => {
      if (window.scrollY > 60) navbar.classList.add('scrolled');
      else navbar.classList.remove('scrolled');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ---------- Mobile menu toggle ----------
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.querySelector('.nav-links');
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('open');
      navLinks.classList.toggle('open');
    });
    // Close on link click
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        menuToggle.classList.remove('open');
        navLinks.classList.remove('open');
      });
    });
  }

  // ---------- Custom cursor ----------
  const cursor = document.getElementById('cursor');
  const follower = document.getElementById('cursorFollower');

  if (cursor && follower && window.matchMedia('(pointer: fine)').matches) {
    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.left = mouseX + 'px';
      cursor.style.top = mouseY + 'px';
    });

    // Smooth follower
    const animateFollower = () => {
      followerX += (mouseX - followerX) * 0.15;
      followerY += (mouseY - followerY) * 0.15;
      follower.style.left = followerX + 'px';
      follower.style.top = followerY + 'px';
      requestAnimationFrame(animateFollower);
    };
    animateFollower();

    // Hover states
    const hoverables = document.querySelectorAll('a, button, .work-card, .phone-item, .value-card, input, textarea, select');
    hoverables.forEach(el => {
      el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });
  }

  // ---------- Parallax phone scene (hero) ----------
  const phoneScene = document.getElementById('phoneScene');
  if (phoneScene && window.matchMedia('(pointer: fine)').matches) {
    document.addEventListener('mousemove', (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 30;
      const y = (e.clientY / window.innerHeight - 0.5) * 30;
      phoneScene.style.transform = `translate(${x}px, ${y}px)`;
    });
  }

  // ---------- Work page filter ----------
  const filterBtns = document.querySelectorAll('.filter');
  const phoneItems = document.querySelectorAll('.phone-item');
  if (filterBtns.length && phoneItems.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.dataset.filter;
        phoneItems.forEach(item => {
          const show = filter === 'all' || item.dataset.category === filter;
          item.style.display = show ? '' : 'none';
          if (show) {
            item.style.animation = 'fadeUp 0.5s ease forwards';
          }
        });
      });
    });
  }

})();
