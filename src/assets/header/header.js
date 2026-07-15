// M   M  AAAAA  X   X  L      W   W  AAAAA  RRRR   EEEEE
// MM MM  A   A   X X   L      W   W  A   A  R   R  E
// M M M  AAAAA    X    L      W W W  AAAAA  RRRR   EEE
// M   M  A   A   X X   L      WW WW  A   A  R  R   E
// M   M  A   A  X   X  LLLLL  W   W  A   A  R   R  EEEEE

(function () {

  const lang = (document.documentElement.lang || 'fr').toLowerCase().startsWith('fr') ? 'fr' : 'en';
  const HOME_PATH = lang === 'fr' ? '/fr_fr.html' : '/en_en.html';

  const PORTFOLIO_LINKS = [
    { id: 'apropos', label: lang === 'fr' ? 'À propos' : 'About' },
    { id: 'projets', label: lang === 'fr' ? 'Projets' : 'Projects' },
    { id: 'stack', label: 'Stack' },
    { id: 'activite', label: lang === 'fr' ? 'Activité' : 'Activity' },
  ];

  const NET_ICON = (label) => `<span class="site-header-net-icon" aria-hidden="true">
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.6">
      <circle cx="12" cy="12" r="9.2"></circle>
    </svg>
  </span>`;

  function portfolioLinksHTML() {
    return PORTFOLIO_LINKS.map(l =>
      `<a href="#${l.id}" data-onpage-id="${l.id}">${l.label}</a>`
    ).join('');
  }

  const HEADER_HTML = `
    <div class="site-header-inner">
      <a href="${HOME_PATH}" class="site-header-brand">
        <img src="https://maxlware.com/assets/logo.png" alt="Maxlware" class="site-header-logo">
        <span class="site-header-name">Maxlware<span class="blink">_</span></span>
      </a>

      <nav class="site-header-nav">

        <div class="site-header-item" data-item="portfolio">
          <button class="site-header-link" aria-expanded="false" type="button">
            Portfolio <span class="site-header-caret">▾</span>
          </button>
          <div class="site-header-dropdown site-header-dropdown-full">
            <div class="site-header-dropdown-full-inner">
              ${portfolioLinksHTML()}
            </div>
          </div>
        </div>

        <a class="site-header-link" href="https://statuts.maxlware.com" target="_blank" rel="noopener">Statuts</a>

        <div class="site-header-item" data-item="reseau">
          <button class="site-header-link" aria-expanded="false" type="button">
            ${lang === 'fr' ? 'Réseau' : 'Network'} <span class="site-header-caret">▾</span>
          </button>
          <div class="site-header-dropdown">
            <a href="https://github.com/maxlware-fr" target="_blank" rel="noopener">${NET_ICON('GH')}GitHub</a>
            <a href="https://soundcloud.com/maxlware" target="_blank" rel="noopener">${NET_ICON('SC')}Soundcloud</a>
            <a href="https://discord.gg/5rUDZ4kXdS" target="_blank" rel="noopener">${NET_ICON('DC')}Discord</a>
          </div>
        </div>

        <div class="site-header-item" data-item="support">
          <button class="site-header-link" aria-expanded="false" type="button">
            Support <span class="site-header-caret">▾</span>
          </button>
          <div class="site-header-dropdown">
            <a href="/fr-fr/contact.html">${lang === 'fr' ? 'Contacter Maxlware' : 'Contact Maxlware'}</a>
            <div class="site-header-subgroup">
              <button class="site-header-sublink" type="button" aria-expanded="false" data-subtoggle="support-tech">
                ${lang === 'fr' ? 'Contacter le support Technique' : 'Contact Technical support'}
                <span class="site-header-caret-sm">▾</span>
              </button>
              <div class="site-header-subpanel" data-subpanel="support-tech">
                <a href="mailto:support@moeworth.studios">Moeworth Studios</a>
                <a href="/fr-fr/contact.html">Maxlware</a>
              </div>
            </div>
          </div>
        </div>

      </nav>
    </div>
  `;

  function init() {
    let header = document.getElementById('site-header');
    if (!header) {
      header = document.createElement('div');
      document.body.insertBefore(header, document.body.firstChild);
    }
    header.id = 'site-header';
    header.classList.add('site-header');
    header.innerHTML = HEADER_HTML;

    function updateHeaderHeightVar() {
      document.documentElement.style.setProperty('--site-header-h', header.offsetHeight + 'px');
    }
    updateHeaderHeightVar();
    window.addEventListener('resize', updateHeaderHeightVar);

    header.querySelectorAll('[data-onpage-id]').forEach((a) => {
      const id = a.getAttribute('data-onpage-id');
      if (!document.getElementById(id)) {
        a.setAttribute('href', HOME_PATH + '#' + id);
      }
    });

    const hero = document.querySelector('.hero');
    let threshold = hero ? hero.offsetHeight * 0.9 : window.innerHeight * 0.9;

    function onScroll() {
      const scrolled = window.scrollY > threshold;
      header.classList.toggle('visible', scrolled);
      document.body.classList.toggle('scrolled-past-hero', scrolled);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', () => {
      threshold = hero ? hero.offsetHeight * 0.9 : window.innerHeight * 0.9;
      onScroll();
    });
    onScroll();

    const items = Array.from(header.querySelectorAll('.site-header-item'));

    function closeAll(except) {
      items.forEach((it) => {
        if (it !== except) {
          it.classList.remove('open');
          const btn = it.querySelector(':scope > .site-header-link');
          if (btn) btn.setAttribute('aria-expanded', 'false');
        }
      });
    }

    items.forEach((item) => {
      const btn = item.querySelector(':scope > .site-header-link');
      if (!btn) return;
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = item.classList.contains('open');
        closeAll(item);
        item.classList.toggle('open', !isOpen);
        btn.setAttribute('aria-expanded', String(!isOpen));
      });
    });

    header.querySelectorAll('[data-subtoggle]').forEach((sub) => {
      sub.addEventListener('click', (e) => {
        e.stopPropagation();
        const key = sub.getAttribute('data-subtoggle');
        const panel = header.querySelector(`[data-subpanel="${key}"]`);
        const isOpen = panel.classList.contains('open');
        panel.classList.toggle('open', !isOpen);
        sub.setAttribute('aria-expanded', String(!isOpen));
      });
    });

    document.addEventListener('click', () => closeAll(null));
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeAll(null);
    });

    header.querySelectorAll('.site-header-dropdown a').forEach((a) => {
      a.addEventListener('click', () => closeAll(null));
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
