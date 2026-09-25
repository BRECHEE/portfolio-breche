(function () {
  const revealItems = document.querySelectorAll('.reveal, .reveal-stagger');

  function revealOnScroll() {
    if (!('IntersectionObserver' in window)) {
      revealItems.forEach((item) => item.classList.add('in'));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealItems.forEach((item) => observer.observe(item));
  }

  function updateScrollProgress() {
    const bar = document.getElementById('progress');
    if (!bar) return;

    const doc = document.documentElement;
    const scrollTop = doc.scrollTop;
    const maxScroll = doc.scrollHeight - doc.clientHeight;
    const progress = maxScroll > 0 ? (scrollTop / maxScroll) * 100 : 0;

    bar.style.width = progress + '%';
  }

  function updateActiveNavLink() {
    const navLinks = document.querySelectorAll('.navlinks a');
    const targets = Array.from(navLinks).map((link) => {
      const selector = link.getAttribute('href');
      return selector ? document.querySelector(selector) : null;
    });

    const currentScroll = window.scrollY + 120;
    let activeLink = null;

    targets.forEach((target, index) => {
      if (target && target.offsetTop <= currentScroll) {
        activeLink = navLinks[index];
      }
    });

    navLinks.forEach((link) => link.classList.remove('active'));
    if (activeLink) activeLink.classList.add('active');
  }

  revealOnScroll();
  document.addEventListener('scroll', () => {
    updateScrollProgress();
    updateActiveNavLink();
  }, { passive: true });

  updateScrollProgress();
  updateActiveNavLink();
})();


document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('theme-toggle');
  const iconSpan = toggleBtn ? toggleBtn.querySelector('.theme-icon') : null;
  const root = document.documentElement;

  // Déterminer le thème actuel
  function getTheme() {
    return root.getAttribute('data-theme') || 'dark';
  }

  // Mettre à jour l'icône selon le thème
  function updateIcon(theme) {
    if (iconSpan) {
      iconSpan.textContent = theme === 'light' ? '☀️' : '🌙';
    }
  }

  // Initialisation au chargement
  updateIcon(getTheme());

  // Action au clic sur le bouton
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const currentTheme = getTheme();
      const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';

      root.setAttribute('data-theme', nextTheme);
      localStorage.setItem('theme', nextTheme);
      updateIcon(nextTheme);
    });
  }

  // Bar de progression de scroll
  window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    const progressBar = document.getElementById('progress');
    if (progressBar) {
      progressBar.style.width = scrolled + '%';
    }
  });

  // Animation au scroll (Intersection Observer)
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal, .reveal-stagger').forEach(el => observer.observe(el));
});