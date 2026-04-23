(function () {

  const style = document.createElement('style');
  style.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');

    :root {
      --cream: #FAF8F4;
      --gold: #C4A96A;
      --gold-light: #D4BC8A;
      --gold-dark: #9A7D42;
      --charcoal: #1C1A17;
      --text-muted: #7A6E5E;
      --text-faint: #B0A898;
      --line: rgba(196,169,106,0.22);
      --card-bg: #FEFCF8;
      --card-border: rgba(196,169,106,0.22);
      --font-serif: 'Cormorant Garamond', Georgia, serif;
      --font-sans: 'DM Sans', sans-serif;
    }

    body { padding-top: 64px !important; }

    /* ---- BARRE DE NAV ---- */
    #aki-nav {
      position: fixed;
      top: 0; left: 0; right: 0;
      z-index: 500;
      background: rgba(250,248,244,0.97);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border-bottom: 1px solid var(--line);
      font-family: var(--font-sans);
    }

    #aki-nav .nav-bar {
      max-width: 1040px;
      margin: 0 auto;
      padding: 0 clamp(1rem, 4vw, 2.5rem);
      height: 64px;
      display: flex;
      align-items: center;
      gap: .75rem;
    }

    /* Logo AKI */
    #aki-nav .nav-logo {
      font-family: var(--font-serif);
      font-size: 1.45rem;
      font-weight: 600;
      letter-spacing: .22em;
      color: var(--charcoal);
      text-decoration: none;
      line-height: 1;
      flex-shrink: 0;
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

    /* Separateur vertical */
    #aki-nav .nav-sep {
      width: 1px;
      height: 24px;
      background: var(--line);
      flex-shrink: 0;
      margin: 0 .25rem;
    }

    /* Bouton Accueil */
    #aki-nav .nav-home {
      display: flex;
      align-items: center;
      gap: .45rem;
      font-size: 11px;
      letter-spacing: .09em;
      text-transform: uppercase;
      font-weight: 500;
      color: var(--charcoal);
      text-decoration: none;
      padding: .4rem .9rem;
      border-radius: 5px;
      border: 1px solid var(--card-border);
      background: var(--card-bg);
      transition: border-color .15s, background .15s, color .15s;
      flex-shrink: 0;
      font-family: var(--font-sans);
    }
    #aki-nav .nav-home:hover {
      border-color: var(--gold);
      background: rgba(196,169,106,0.07);
      color: var(--gold-dark);
    }
    #aki-nav .nav-home svg {
      width: 13px; height: 13px;
      flex-shrink: 0;
      fill: currentColor;
    }
    #aki-nav .nav-home.is-home {
      background: var(--charcoal);
      color: var(--cream);
      border-color: var(--charcoal);
    }

    /* Spacer */
    #aki-nav .nav-spacer { flex: 1; }

    /* Burger button */
    #aki-nav .burger-btn {
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 5.5px;
      width: 40px;
      height: 40px;
      background: none;
      border: 1px solid var(--card-border);
      border-radius: 8px;
      cursor: pointer;
      padding: 0 9px;
      transition: border-color .15s, background .15s;
      flex-shrink: 0;
    }
    #aki-nav .burger-btn:hover {
      border-color: var(--gold);
      background: rgba(196,169,106,0.06);
    }
    #aki-nav .burger-btn span {
      display: block;
      width: 100%;
      height: 1.5px;
      background: var(--charcoal);
      border-radius: 2px;
      transition: transform .28s ease, opacity .2s ease, width .28s ease;
      transform-origin: center;
    }
    #aki-nav .burger-btn.open {
      border-color: var(--gold);
      background: rgba(196,169,106,0.06);
    }
    #aki-nav .burger-btn.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
    #aki-nav .burger-btn.open span:nth-child(2) { opacity: 0; width: 0; }
    #aki-nav .burger-btn.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

    /* ---- DRAWER ---- */
    #aki-drawer {
      position: fixed;
      top: 64px; left: 0; right: 0;
      z-index: 490;
      background: rgba(250,248,244,0.99);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border-bottom: 1px solid var(--line);
      max-height: 0;
      overflow: hidden;
      transition: max-height .38s cubic-bezier(.4,0,.2,1), opacity .25s ease;
      opacity: 0;
      font-family: var(--font-sans);
    }
    #aki-drawer.open {
      max-height: 700px;
      opacity: 1;
    }

    #aki-drawer .drawer-inner {
      max-width: 1040px;
      margin: 0 auto;
      padding: 1.75rem clamp(1rem,4vw,2.5rem) 2rem;
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(210px, 1fr));
      gap: 6px;
    }

    #aki-drawer a {
      display: flex;
      align-items: center;
      gap: .85rem;
      padding: .8rem 1rem;
      border-radius: 10px;
      text-decoration: none;
      border: 1px solid transparent;
      transition: background .15s, border-color .15s;
    }
    #aki-drawer a:hover {
      background: rgba(196,169,106,0.07);
      border-color: var(--card-border);
    }
    #aki-drawer a.current {
      background: rgba(196,169,106,0.06);
      border-color: rgba(196,169,106,0.35);
    }

    #aki-drawer .d-icon {
      width: 38px; height: 38px;
      border-radius: 8px;
      background: rgba(196,169,106,0.1);
      display: flex; align-items: center; justify-content: center;
      font-size: 16px;
      flex-shrink: 0;
      color: var(--gold-dark);
      transition: background .15s, color .15s;
    }
    #aki-drawer a.current .d-icon {
      background: var(--charcoal);
      color: #FAF8F4;
    }
    #aki-drawer a:hover .d-icon {
      background: rgba(196,169,106,0.18);
    }

    #aki-drawer .d-name {
      font-size: 13px;
      font-weight: 500;
      color: var(--charcoal);
      line-height: 1.3;
    }
    #aki-drawer .d-desc {
      font-size: 11px;
      color: var(--text-faint);
      margin-top: 2px;
      line-height: 1.3;
    }
    #aki-drawer a.current .d-name { color: var(--gold-dark); }

    /* Pied du drawer */
    #aki-drawer .drawer-foot {
      max-width: 1040px;
      margin: 0 auto;
      padding: 1rem clamp(1rem,4vw,2.5rem) 1.25rem;
      border-top: 1px solid var(--line);
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: .5rem;
    }
    #aki-drawer .foot-logo {
      font-family: var(--font-serif);
      font-size: 1.1rem;
      font-weight: 600;
      letter-spacing: .2em;
      color: var(--charcoal);
    }
    #aki-drawer .foot-copy {
      font-size: 11px;
      color: var(--text-faint);
    }

    /* Overlay sombre */
    #aki-overlay {
      display: none;
      position: fixed;
      inset: 0;
      z-index: 480;
      background: rgba(28,26,23,0.3);
      backdrop-filter: blur(2px);
      -webkit-backdrop-filter: blur(2px);
    }
    #aki-overlay.open { display: block; }

    @media (max-width: 480px) {
      #aki-drawer .drawer-inner {
        grid-template-columns: 1fr 1fr;
      }
    }
  `;
  document.head.appendChild(style);

  /* ---- Pages ---- */
  const pages = [
    { href: 'index.html',            icon: '⌂', name: 'Accueil',          desc: 'Vision & dossier complet' },
    { href: 'aki-etude-marche.html', icon: '◎', name: 'Étude de marché',  desc: 'Marché, concurrence, personas' },
    { href: 'aki-juridique.html',    icon: '⚖', name: 'Juridique',        desc: 'Démarches & mails' },
    { href: 'aki-budget.html',       icon: '€', name: 'Budget',           desc: 'Investissements & charges' },
    { href: 'aki-fidelisation.html', icon: '♦', name: 'Fidélisation',     desc: 'Abonnements & carte métal' },
    { href: 'aki-yield.html',        icon: '◈', name: 'Yield Management', desc: 'Pricing & packages hôteliers' },
    { href: 'aki-formation.html',    icon: '✦', name: 'Formation',        desc: 'Plateforme e-learning' },
    { href: 'aki-franchise.html',    icon: '❋', name: 'Franchise',        desc: 'Expansion & réseau' },
  ];

  const cur = window.location.pathname.split('/').pop() || 'index.html';
  const isHome = (cur === 'index.html' || cur === '');

  /* ---- NAV BAR ---- */
  const nav = document.createElement('nav');
  nav.id = 'aki-nav';
  nav.innerHTML = `
    <div class="nav-bar">
      <a href="index.html" class="nav-logo">
        AKI
        <small>Hair &amp; Beauty · Maurice</small>
      </a>
      <div class="nav-sep"></div>
      <a href="index.html" class="nav-home ${isHome ? 'is-home' : ''}">
        <svg viewBox="0 0 16 16"><path d="M8 1.5L1 7h2v7h4v-4h2v4h4V7h2L8 1.5z"/></svg>
        Accueil
      </a>
      <div class="nav-spacer"></div>
      <button class="burger-btn" id="aki-burger" aria-label="Ouvrir le menu" aria-expanded="false">
        <span></span><span></span><span></span>
      </button>
    </div>
  `;

  /* ---- DRAWER ---- */
  const drawer = document.createElement('div');
  drawer.id = 'aki-drawer';
  drawer.setAttribute('aria-hidden', 'true');
  drawer.setAttribute('role', 'navigation');
  drawer.setAttribute('aria-label', 'Menu principal');

  const links = pages.map(p => {
    const active = cur === p.href || (isHome && p.href === 'index.html');
    return `
      <a href="${p.href}" class="${active ? 'current' : ''}">
        <div class="d-icon">${p.icon}</div>
        <div>
          <div class="d-name">${p.name}</div>
          <div class="d-desc">${p.desc}</div>
        </div>
      </a>`;
  }).join('');

  drawer.innerHTML = `
    <div class="drawer-inner">${links}</div>
    <div class="drawer-foot">
      <span class="foot-logo">AKI</span>
      <span class="foot-copy">Dossier stratégique · Île Maurice · 2025</span>
    </div>
  `;

  /* ---- OVERLAY ---- */
  const overlay = document.createElement('div');
  overlay.id = 'aki-overlay';

  /* ---- INJECT ---- */
  document.body.insertBefore(overlay, document.body.firstChild);
  document.body.insertBefore(drawer, document.body.firstChild);
  document.body.insertBefore(nav, document.body.firstChild);

  /* ---- TOGGLE ---- */
  let open = false;

  function openMenu() {
    open = true;
    document.getElementById('aki-burger').classList.add('open');
    document.getElementById('aki-burger').setAttribute('aria-expanded', 'true');
    document.getElementById('aki-burger').setAttribute('aria-label', 'Fermer le menu');
    drawer.classList.add('open');
    drawer.setAttribute('aria-hidden', 'false');
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    open = false;
    document.getElementById('aki-burger').classList.remove('open');
    document.getElementById('aki-burger').setAttribute('aria-expanded', 'false');
    document.getElementById('aki-burger').setAttribute('aria-label', 'Ouvrir le menu');
    drawer.classList.remove('open');
    drawer.setAttribute('aria-hidden', 'true');
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  document.getElementById('aki-burger').addEventListener('click', () => open ? closeMenu() : openMenu());
  overlay.addEventListener('click', closeMenu);
  drawer.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && open) closeMenu(); });

})();
