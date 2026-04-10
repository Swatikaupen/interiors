(() => {
  const nav = document.getElementById('mainNav');
  const cursor = document.getElementById('cursor');
  const ring = document.getElementById('cursorRing');
  const finePointer = window.matchMedia('(pointer: fine)').matches;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const CONF_PW = 'openstorey2025';
  const STORAGE_KEY = 'openStoreyConfidentialAccess';

  function updateNavState() {
    if (!nav) {
      return;
    }

    nav.classList.toggle('scrolled', window.scrollY > 80);
  }

  function initCustomCursor() {
    if (!finePointer || !cursor || !ring) {
      return;
    }

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;

    document.addEventListener('mousemove', (event) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
      cursor.style.left = `${mouseX}px`;
      cursor.style.top = `${mouseY}px`;
    });

    const loop = () => {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      ring.style.left = `${ringX}px`;
      ring.style.top = `${ringY}px`;
      window.requestAnimationFrame(loop);
    };

    window.requestAnimationFrame(loop);

    document.querySelectorAll('a,button,.project-card,.product-card,.conf-card,.phil-card').forEach((element) => {
      element.addEventListener('mouseenter', () => cursor.classList.add('expanded'));
      element.addEventListener('mouseleave', () => cursor.classList.remove('expanded'));
    });
  }

  function initReveal() {
    const reveals = Array.from(document.querySelectorAll('.reveal'));
    if (!reveals.length) {
      return;
    }

    if (reduceMotion || !('IntersectionObserver' in window)) {
      reveals.forEach((element) => element.classList.add('visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    reveals.forEach((element) => observer.observe(element));
  }

  function initFindsFilter() {
    const tabs = Array.from(document.querySelectorAll('.finds-tab[data-filter]'));
    const cards = Array.from(document.querySelectorAll('.product-card[data-cat]'));
    const emptyState = document.getElementById('findsEmpty');

    if (!tabs.length || !cards.length) {
      return;
    }

    const applyFilter = (category) => {
      let visibleCount = 0;

      cards.forEach((card) => {
        const show = category === 'all' || card.dataset.cat === category;
        card.style.display = show ? 'block' : 'none';
        if (show) {
          visibleCount += 1;
        }
      });

      if (emptyState) {
        emptyState.style.display = visibleCount === 0 ? 'block' : 'none';
      }
    };

    tabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        tabs.forEach((item) => item.classList.remove('active'));
        tab.classList.add('active');
        applyFilter(tab.dataset.filter || 'all');
      });
    });

    const activeTab = tabs.find((tab) => tab.classList.contains('active')) || tabs[0];
    applyFilter(activeTab.dataset.filter || 'all');
  }

  function initWishlist() {
    document.querySelectorAll('.product-wishlist').forEach((button) => {
      button.addEventListener('click', () => {
        const isActive = button.classList.toggle('is-active');
        button.textContent = isActive ? '♥' : '♡';
        button.setAttribute('aria-pressed', String(isActive));
      });
    });
  }

  function initContactForms() {
    const forms = Array.from(document.querySelectorAll('[data-contact-form]'));
    if (!forms.length) {
      return;
    }

    forms.forEach((form) => {
      form.addEventListener('submit', (event) => {
        event.preventDefault();

        const data = new FormData(form);
        const name = String(data.get('name') || '').trim();
        const email = String(data.get('email') || '').trim();
        const projectType = String(data.get('projectType') || '').trim();
        const details = String(data.get('details') || '').trim();
        const subject = ['Open Storey Enquiry', projectType].filter(Boolean).join(' — ');
        const body = [
          'Hello Swatika,',
          '',
          'I would like to enquire about a project.',
          '',
          `Name: ${name || 'Not provided'}`,
          `Email: ${email || 'Not provided'}`,
          `Project Type: ${projectType || 'Not specified'}`,
          '',
          'Project Details:',
          details || 'Not provided'
        ].join('\n');

        window.location.href = `mailto:swatika0905@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      });
    });
  }

  function initConfidential() {
    const form = document.querySelector('[data-confidential-form]');
    const lockScreen = document.getElementById('confLock');
    const content = document.getElementById('confContent');
    const footer = document.getElementById('confFooter');
    const input = document.getElementById('pwInput');
    const error = document.getElementById('pwErr');
    const lockLinks = document.querySelectorAll('[data-conf-lock]');
    const homeHref = document.body.dataset.homeHref || '../index.html';

    if (!form || !lockScreen || !content || !footer || !input || !error) {
      return;
    }

    const showLocked = () => {
      lockScreen.style.display = 'flex';
      content.style.display = 'none';
      footer.style.display = 'none';
    };

    const showUnlocked = (persist) => {
      lockScreen.style.display = 'none';
      content.style.display = 'block';
      footer.style.display = 'flex';
      if (persist) {
        window.sessionStorage.setItem(STORAGE_KEY, 'granted');
      }
    };

    if (window.sessionStorage.getItem(STORAGE_KEY) === 'granted') {
      showUnlocked(false);
    } else {
      showLocked();
    }

    form.addEventListener('submit', (event) => {
      event.preventDefault();

      if (input.value.trim() === CONF_PW) {
        error.innerHTML = '&nbsp;';
        showUnlocked(true);
        return;
      }

      error.textContent = 'Incorrect password. Please try again.';
      input.value = '';
      input.focus();
      window.setTimeout(() => {
        error.innerHTML = '&nbsp;';
      }, 3000);
    });

    lockLinks.forEach((link) => {
      link.addEventListener('click', (event) => {
        event.preventDefault();
        window.sessionStorage.removeItem(STORAGE_KEY);
        showLocked();
        window.location.href = homeHref;
      });
    });
  }

  updateNavState();
  window.addEventListener('scroll', updateNavState, { passive: true });
  initCustomCursor();
  initReveal();
  initFindsFilter();
  initWishlist();
  initContactForms();
  initConfidential();
})();
