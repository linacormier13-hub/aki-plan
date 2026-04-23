/* ==============================
   AKI — Navigation partagée
   Injectée dynamiquement sur toutes les pages
============================== */

(function () {

  /* --- CSS --- */
  const style = document.createElement('style');
  style.textContent = `
    :root {
      --cream: #FAF8F4;
      --gold: #C4A96A;
      --gold-light: #D4BC8A;
      --gold-dark: #9A7D42;
      --charcoal: #1C1A17;
      --text-muted: #7A6E5E;
      --line: rgba(196,169,106,0.22);
      --card-bg: #FEFCF8;
      --card-border: rgba(196,169,106,0.22);
      --font-serif: 'Cormorant Garamond', Georgia, serif;
      --font-sans: 'DM Sans', sans-serif;
    }

    #aki-nav {
      position: fixed;
      top: 0; left: 0; right: 0;
      z-index: 500;
      background: rgba(250,248,244,0.97);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border-bottom: 1px solid var(--line);
    }

    #aki-nav .nav-bar {
      max-width: 1040px;
      margin: 0 auto;
      padding: 0 clamp(1.25rem, 5vw, 3rem);
      height: 62px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    #aki-nav .nav-logo {
      font-family: var(--font-serif);
      font-size: 1.5rem;
      font-weight: 600;
      letter-spacing: .22em;
      color: var(--charcoal);
      text-decoration: none;
      line-height: 1;
    }
    #aki-nav .nav-logo small {
      display: block;
      font-size: 9px;
      letter-spacing: .16em;
      color: var(--gold);
      text-transform: uppercase;
      font-family: var(--font-sans);
      font-weight: 400;
      margin-top: 2px;
    }

    #aki-nav .burger-btn {
      display: flex;
      flex-direction: column;
      gap: 6px;
      background: none;
      border: none;
      cursor: pointer;
      padding: .5rem;
      z-index: 600;
    }
    #aki-nav .burger-btn span {
      display: block;
      width: 24px;
      height: 1.5px;
      background: var(--charcoal);
      border-radius: 2px;
      transition: transform .3s ease, opacity .3s ease;
      transform-origin: center;
    }
    #aki-nav .burger-btn.open span:nth-child(1) { transform: translateY(7.5px) rotate(45deg); }
    #aki-nav .burger-btn.open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
    #aki-nav .burger-btn.open span:nth-child(3) { transform: translateY(-7.5px) rotate(-45deg); }

    /* DRAWER */
    #aki-drawer {
      position: fixed;
      top: 62px; left: 0; right: 0;
      z-index: 490;
      background: rgba(250,248,244,0.99);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border-bottom: 1px solid var(--line);
      max-height: 0;
      overflow: hidden;
      transition: max-height .4s cubic-bezier(.4,0,.2,1), opacity .3s ease;
      opacity: 0;
    }
    #aki-drawer.open {
      max-height: 600px;
      opacity: 1;
    }

    #aki-drawer .drawer-inner {
      max-width: 1040px;
      margin: 0 auto;
      padding: 1.5rem clamp(1.25rem, 5vw, 3rem) 2rem;
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
      gap: .25rem;
    }

    #aki-drawer a {
      display: flex;
      align-items: center;
      gap: .75rem;
      padding: .75rem .9rem;
      border-radius: 8px;
      text-decoration: none;
      transition: background .15s;
      border: 1px solid transparent;
    }
    #aki-drawer a:hover {
      background: rgba(196,169,106,.07);
      border-color: var(--card-border);
    }
    #aki-drawer a.current {
      background: rgba(196,169,106,.06);
      border-color: var(--card-border);
    }

    #aki-drawer .link-icon {
      width: 34px; height: 34px;
      border-radius: 6px;
      background: rgba(196,169,106,.1);
      display: flex; align-items: center; justify-content: center;
      font-size: 14px;
      flex-shrink: 0;
      color: var(--gold-dark);
    }
    #aki-drawer a.current .link-icon {
      background: var(--charcoal);
      color: var(--cream);
    }

    #aki-drawer .link-text {}
    #aki-drawer .link-name {
      font-size: 13px;
      font-weight: 500;
      color: var(--charcoal);
      line-height: 1.2;
    }
    #aki-drawer .link-desc {
      font-size: 11px;
      color: var(--text-muted);
      margin-top: 1px;
      line-height: 1.3;
    }

    #aki-drawer .drawer-footer {
      max-width: 1040px;
      margin: 0 auto;
      padding: 1rem clamp(1.25rem, 5vw, 3rem) 1.25rem;
      border-top: 1px solid var(--line);
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: .75rem;
    }
    #aki-drawer .drawer-footer-logo {
      font-family: var(--font-serif);
      font-size: 1rem;
      font-weight: 600;
      letter-spacing: .18em;
      color: var(--charcoal);
    }
    #aki-drawer .drawer-footer-copy {
      font-size: 11px;
      color: var(--text-muted);
      letter-spacing: .05em;
    }

    /* Overlay */
    #aki-overlay {
      display: none;
      position: fixed;
      inset: 0;
      z-index: 480;
      background: rgba(28,26,23,.25);
    }
    #aki-overlay.open { display: block; }

    /* Push body content below nav */
    body { padding-top: 62px !important; }
  `;
  document.head.appendChild(style);

  /* --- Pages list --- */
  const pages = [
    { href: 'index.html',            icon: '⌂', name: 'Accueil',          desc: 'Vision & dossier complet' },
    { href: 'aki-etude-marche.html', icon: '◎', name: 'Étude de marché',  desc: 'Marché, concurrence, personas' },
    { href: 'aki-juridique.html',    icon: '⚖', name: 'Juridique',        desc: 'Démarches & modèles de mails' },
    { href: 'aki-budget.html',       icon: '€', name: 'Budget',           desc: 'Investissements & charges' },
    { href: 'aki-fidelisation.html', icon: '♦', name: 'Fidélisation',     desc: 'Abonnements & carte métal' },
    { href: 'aki-yield.html',        icon: '◈', name: 'Yield Management', desc: 'Pricing & packages hôteliers' },
    { href: 'aki-formation.html',    icon: '✦', name: 'Formation',        desc: 'Plateforme e-learning' },
    { href: 'aki-franchise.html',    icon: '❋', name: 'Franchise',        desc: 'Expansion & réseau' },
  ];

  /* Detect current page */
  const currentFile = window.location.pathname.split('/').pop() || 'index.html';

  /* --- Build nav HTML --- */
  const nav = document.createElement('nav');
  nav.id = 'aki-nav';
  nav.innerHTML = `
    <div class="nav-bar">
      <a href="index.html" class="nav-logo">
        AKI
        <small>Hair &amp; Beauty · Maurice</small>
      </a>
      <button class="burger-btn" id="aki-burger" aria-label="Menu" aria-expanded="false">
        <span></span><span></span><span></span>
      </button>
    </div>
  `;

  /* --- Build drawer HTML --- */
  const drawer = document.createElement('div');
  drawer.id = 'aki-drawer';
  drawer.setAttribute('aria-hidden', 'true');

  const links = pages.map(p => {
    const isCurrent = currentFile === p.href || (currentFile === '' && p.href === 'index.html');
    return `
      <a href="${p.href}" class="${isCurrent ? 'current' : ''}" ${isCurrent ? 'aria-current="page"' : ''}>
        <div class="link-icon">${p.icon}</div>
        <div class="link-text">
          <div class="link-name">${p.name}</div>
          <div class="link-desc">${p.desc}</div>
        </div>
      </a>
    `;
  }).join('');

  drawer.innerHTML = `
    <div class="drawer-inner">${links}</div>
    <div class="drawer-footer">
      <span class="drawer-footer-logo">AKI</span>
      <span class="drawer-footer-copy">Dossier stratégique · Île Maurice · 2025</span>
    </div>
  `;

  /* --- Overlay --- */
  const overlay = document.createElement('div');
  overlay.id = 'aki-overlay';

  /* --- Inject into DOM --- */
  document.body.insertBefore(overlay, document.body.firstChild);
  document.body.insertBefore(drawer, document.body.firstChild);
  document.body.insertBefore(nav, document.body.firstChild);

  /* --- Toggle logic --- */
  let isOpen = false;

  function openMenu() {
    isOpen = true;
    document.getElementById('aki-burger').classList.add('open');
    document.getElementById('aki-burger').setAttribute('aria-expanded', 'true');
    drawer.classList.add('open');
    drawer.setAttribute('aria-hidden', 'false');
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    isOpen = false;
    document.getElementById('aki-burger').classList.remove('open');
    document.getElementById('aki-burger').setAttribute('aria-expanded', 'false');
    drawer.classList.remove('open');
    drawer.setAttribute('aria-hidden', 'true');
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  document.getElementById('aki-burger').addEventListener('click', () => {
    isOpen ? closeMenu() : openMenu();
  });

  overlay.addEventListener('click', closeMenu);

  /* Close on link click */
  drawer.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', closeMenu);
  });

  /* Close on Escape */
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && isOpen) closeMenu();
  });

})();
