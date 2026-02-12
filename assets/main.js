(() => {
  const body = document.body;

  const closeAllLangMenus = () => {
    document.querySelectorAll('.lang-menu.open').forEach((m) => m.classList.remove('open'));
  };

  document.querySelectorAll('[data-lang-toggle]').forEach((toggle) => {
    toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const menu = toggle.parentElement.querySelector('.lang-menu');
      const isOpen = menu.classList.contains('open');
      closeAllLangMenus();
      if (!isOpen) menu.classList.add('open');
    });
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.lang-switch')) closeAllLangMenus();
  });

  const drawer = document.querySelector('.mobile-drawer');
  const backdrop = document.querySelector('.drawer-backdrop');
  const openBtn = document.querySelector('[data-drawer-open]');
  const closeBtn = document.querySelector('[data-drawer-close]');

  const closeDrawer = () => body.classList.remove('drawer-open');
  const openDrawer = () => body.classList.add('drawer-open');

  if (openBtn && drawer) {
    openBtn.addEventListener('click', openDrawer);
    closeBtn?.addEventListener('click', closeDrawer);
    backdrop?.addEventListener('click', closeDrawer);
    drawer.querySelectorAll('a').forEach((a) => a.addEventListener('click', closeDrawer));
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeDrawer();
      closeAllLangMenus();
      closeModal();
    }
  });

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  const metrics = document.querySelectorAll('[data-counter]');
  const animateCounter = (el) => {
    const target = Number(el.dataset.counter);
    const duration = 1200;
    const start = performance.now();
    const suffix = el.dataset.suffix || '';
    const prefix = el.dataset.prefix || '';

    const frame = (time) => {
      const progress = Math.min((time - start) / duration, 1);
      const val = Math.floor(target * (1 - Math.pow(1 - progress, 3)));
      el.textContent = `${prefix}${val}${suffix}`;
      if (progress < 1) requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);
  };

  const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.45 });

  metrics.forEach((metric) => counterObserver.observe(metric));

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

  const modal = document.getElementById('privacy-modal');
  const openModalBtns = document.querySelectorAll('[data-open-privacy]');
  const closeModalBtns = document.querySelectorAll('[data-close-privacy]');

  function openModal() {
    if (!modal) return;
    modal.classList.add('open');
    body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove('open');
    body.style.overflow = '';
  }

  openModalBtns.forEach((btn) => btn.addEventListener('click', (e) => {
    e.preventDefault();
    openModal();
  }));

  closeModalBtns.forEach((btn) => btn.addEventListener('click', closeModal));

  modal?.querySelector('.modal-backdrop')?.addEventListener('click', closeModal);

  document.querySelectorAll('form[data-demo-form]').forEach((form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const status = form.querySelector('.form-status');
      if (status) status.textContent = 'Demo submission — we\'ll contact you shortly.';
      form.reset();
    });
  });
})();
