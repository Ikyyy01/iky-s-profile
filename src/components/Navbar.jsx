import { useState, useEffect } from 'react'
import { NavLink, Link } from 'react-router-dom'

const SunIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2.5M12 19.5V22M4.93 4.93l1.77 1.77M17.3 17.3l1.77 1.77M2 12h2.5M19.5 12H22M4.93 19.07l1.77-1.77M17.3 6.7l1.77-1.77" />
  </svg>
)

const MoonIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3c-.02.27-.03.54-.03.81A9 9 0 0 0 20.19 12c.27 0 .54-.01.81-.03Z" />
  </svg>
)

const styles = `
  .navbar { position: fixed; top: 0; left: 0; right: 0; z-index: 500; padding: 20px 24px 0; }
  .nav-shell { max-width: 1200px; margin: 0 auto; border: 1px solid rgba(255,255,255,.72); background: rgba(255,255,255,.48); backdrop-filter: blur(20px); border-radius: 24px; box-shadow: 0 18px 44px rgba(15,23,42,.08); transition: all .3s; }
  
  [data-theme="dark"] .nav-shell { 
    background: rgba(20,24,82,.56);
    border-color: rgba(255,255,255,.08);
    box-shadow: 0 18px 44px rgba(15,23,42,.24);
  }
  
  .navbar.scrolled .nav-shell { 
    background: rgba(255,255,255,.72); 
    border-color: rgba(255,255,255,.9); 
    box-shadow: 0 22px 54px rgba(15,23,42,.12); 
  }
  
  [data-theme="dark"] .navbar.scrolled .nav-shell {
    background: rgba(20,24,82,.72);
    border-color: rgba(255,255,255,.12);
    box-shadow: 0 22px 54px rgba(15,23,42,.32);
  }
  
  .nav-inner { padding: 16px 24px; display: flex; align-items: center; justify-content: space-between; gap: 20px; }
  .nav-logo { font-family: var(--font-display); font-size: 1.2rem; font-weight: 800; letter-spacing: -.03em; color: var(--text); text-decoration: none; line-height: 1; }
  .nav-logo span { background: linear-gradient(135deg, var(--accent) 0%, var(--accent2) 100%); -webkit-background-clip: text; background-clip: text; color: transparent; }
  
  .nav-links { display: flex; align-items: center; gap: 10px; list-style: none; padding: 6px; border: 1px solid rgba(255,255,255,.75); border-radius: 999px; background: rgba(248,250,252,.7); backdrop-filter: blur(14px); }
  
  [data-theme="dark"] .nav-links {
    background: rgba(255,255,255,.06);
    border-color: rgba(255,255,255,.1);
  }
  
  .nav-links a { font-size: .82rem; font-weight: 600; letter-spacing: -.01em; color: var(--text2); text-decoration: none; padding: 10px 16px; border-radius: 999px; transition: all .2s; }
  .nav-links a:hover, .nav-links a.active { color: var(--text); background: rgba(255,255,255,.92); }
  
  [data-theme="dark"] .nav-links a:hover,
  [data-theme="dark"] .nav-links a.active {
    background: rgba(255,255,255,.1);
    color: #fff;
  }
  
  .nav-links a.active { box-shadow: inset 0 0 0 1px rgba(37,99,235,.12), 0 8px 18px rgba(37,99,235,.1); }
  
  [data-theme="dark"] .nav-links a.active {
    box-shadow: inset 0 0 0 1px rgba(100,200,255,.24), 0 8px 18px rgba(100,200,255,.12);
  }
  
  .nav-actions { display: flex; align-items: center; gap: 10px; }
  .theme-toggle { 
    display: inline-flex; align-items: center; justify-content: center; gap: 8px; width: 40px; height: 40px; 
    border-radius: 999px; background: rgba(255,255,255,.45); border: 1px solid rgba(255,255,255,.3); 
    color: var(--text); cursor: pointer; transition: all .2s; font-size: 1.1rem;
  }
  .theme-toggle svg { flex: 0 0 auto; }
  .theme-toggle:hover { background: rgba(255,255,255,.72); border-color: rgba(255,255,255,.5); transform: translateY(-1px); }
  
  [data-theme="dark"] .theme-toggle {
    background: rgba(255,255,255,.06);
    border-color: rgba(255,255,255,.12);
    color: #fff;
  }
  [data-theme="dark"] .theme-toggle:hover {
    background: rgba(255,255,255,.12);
    border-color: rgba(255,255,255,.24);
  }
  
  .nav-cta { font-size: .82rem; font-weight: 700; padding: 12px 18px; background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%); color: #fff; text-decoration: none; border-radius: 999px; transition: transform .2s, box-shadow .2s; white-space: nowrap; box-shadow: 0 14px 32px rgba(37,99,235,.24); }
  .nav-cta:hover { transform: translateY(-1px); box-shadow: 0 18px 36px rgba(37,99,235,.28); }
  
  .hamburger { display: none; flex-direction: column; gap: 4px; background: none; border: none; padding: 8px; cursor: pointer; }
  .hamburger span { display: block; width: 22px; height: 2px; background: var(--text); border-radius: 999px; transition: transform .25s, opacity .25s; }
  .hamburger.open span:nth-child(1) { transform: translateY(6px) rotate(45deg); }
  .hamburger.open span:nth-child(2) { opacity: 0; }
  .hamburger.open span:nth-child(3) { transform: translateY(-6px) rotate(-45deg); }
  
  .mobile-menu { display: none; position: fixed; inset: 0; z-index: 490; background: rgba(239,244,255,.72); backdrop-filter: blur(20px); padding: 120px 24px 40px; flex-direction: column; gap: 10px; }
  
  [data-theme="dark"] .mobile-menu {
    background: rgba(20,24,82,.72);
  }
  
  .mobile-menu.open { display: flex; }
  .mobile-menu a { font-family: var(--font-display); font-size: 2.2rem; font-weight: 700; letter-spacing: -.04em; color: var(--text); text-decoration: none; background: rgba(255,255,255,.72); border: 1px solid rgba(255,255,255,.82); border-radius: 20px; padding: 18px 20px; transition: all .2s; box-shadow: 0 16px 34px rgba(15,23,42,.08); }
  .mobile-menu a:hover { border-color: rgba(37,99,235,.26); transform: translateX(4px); box-shadow: 0 20px 40px rgba(15,23,42,.12); }
  
  [data-theme="dark"] .mobile-menu a {
    background: rgba(255,255,255,.08);
    border-color: rgba(255,255,255,.12);
    color: #fff;
    box-shadow: 0 16px 34px rgba(15,23,42,.24);
  }
  [data-theme="dark"] .mobile-menu a:hover {
    background: rgba(255,255,255,.12);
    border-color: rgba(100,200,255,.24);
  }
  
  .mobile-menu-cta { font-size: .92rem !important; font-family: var(--font-body) !important; font-weight: 700 !important; color: #fff !important; background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%) !important; border: none !important; margin-top: 12px; }
  
  @media (max-width: 860px) {
    .nav-links, .nav-cta { display: none; }
    .hamburger { display: flex; }
    .nav-inner { padding: 14px 18px; }
  }
`

export default function Navbar({ theme, onToggleTheme }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
  }, [menuOpen])

  return (
    <>
      <style>{styles}</style>
      <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
        <div className="nav-shell">
          <div className="nav-inner">
            <Link to="/" className="nav-logo">Risky Januar<span>.</span></Link>
            <ul className="nav-links">
              <li><NavLink to="/" end>Home</NavLink></li>
              <li><NavLink to="/about">About</NavLink></li>
              <li><NavLink to="/portfolio">Portfolio</NavLink></li>
              <li><NavLink to="/contact">Contact</NavLink></li>
            </ul>
            <div className="nav-actions">
              <button className="theme-toggle" onClick={onToggleTheme} title="Toggle theme" aria-label="Toggle theme">
                {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
              </button>
              <a href="mailto:riskyjanuarlbs01@gmail.com" className="nav-cta">Let's Talk</a>
            </div>
            <button className={`hamburger${menuOpen ? ' open' : ''}`} onClick={() => setMenuOpen(o => !o)}>
              <span /><span /><span />
            </button>
          </div>
        </div>
      </nav>
      <div className={`mobile-menu${menuOpen ? ' open' : ''}`}>
        <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
        <Link to="/about" onClick={() => setMenuOpen(false)}>About</Link>
        <Link to="/portfolio" onClick={() => setMenuOpen(false)}>Portfolio</Link>
        <Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
        <button className="theme-toggle" onClick={onToggleTheme} style={{ width: '100%', justifyContent: 'center' }}>
          {theme === 'dark' ? <><SunIcon /> Light Mode</> : <><MoonIcon /> Dark Mode</>}
        </button>
        <a href="mailto:riskyjanuarlbs01@gmail.com" className="mobile-menu-cta">Let's Talk</a>
      </div>
    </>
  )
}
