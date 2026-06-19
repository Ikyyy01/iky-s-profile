import { useState, useEffect } from 'react'
import { NavLink, Link } from 'react-router-dom'

const styles = `
  .navbar { position: fixed; top: 0; left: 0; right: 0; z-index: 500; padding: 20px 24px 0; }
  .nav-shell { max-width: 1200px; margin: 0 auto; border: 1px solid rgba(255,255,255,.45); background: rgba(255,255,255,.72); backdrop-filter: blur(20px); border-radius: 22px; box-shadow: var(--shadow-sm); transition: background .3s, border-color .3s, box-shadow .3s; }
  .navbar.scrolled .nav-shell { background: rgba(255,255,255,.86); border-color: rgba(199,210,224,.9); box-shadow: var(--shadow-md); }
  .nav-inner { padding: 16px 24px; display: flex; align-items: center; justify-content: space-between; gap: 20px; }
  .nav-logo { font-family: var(--font-display); font-size: 1.2rem; font-weight: 800; letter-spacing: -.03em; color: var(--text); text-decoration: none; line-height: 1; }
  .nav-logo span { color: var(--accent); }
  .nav-links { display: flex; align-items: center; gap: 10px; list-style: none; padding: 6px; border: 1px solid var(--border); border-radius: 999px; background: rgba(248,250,252,.92); }
  .nav-links a { font-size: .82rem; font-weight: 600; letter-spacing: -.01em; color: var(--text2); text-decoration: none; padding: 10px 16px; border-radius: 999px; transition: background .2s, color .2s; }
  .nav-links a:hover, .nav-links a.active { color: var(--text); background: #fff; }
  .nav-links a.active { box-shadow: inset 0 0 0 1px rgba(37,99,235,.14); }
  .nav-cta { font-size: .82rem; font-weight: 700; padding: 12px 18px; background: var(--text); color: #fff; text-decoration: none; border-radius: 999px; transition: background .2s, transform .15s; white-space: nowrap; }
  .nav-cta:hover { background: var(--accent); transform: translateY(-1px); }
  .hamburger { display: none; flex-direction: column; gap: 4px; background: none; border: none; padding: 8px; }
  .hamburger span { display: block; width: 22px; height: 2px; background: var(--text); border-radius: 999px; transition: transform .25s, opacity .25s; }
  .hamburger.open span:nth-child(1) { transform: translateY(6px) rotate(45deg); }
  .hamburger.open span:nth-child(2) { opacity: 0; }
  .hamburger.open span:nth-child(3) { transform: translateY(-6px) rotate(-45deg); }
  .mobile-menu { display: none; position: fixed; inset: 0; z-index: 490; background: rgba(245,247,251,.96); backdrop-filter: blur(16px); padding: 120px 24px 40px; flex-direction: column; gap: 10px; }
  .mobile-menu.open { display: flex; }
  .mobile-menu a { font-family: var(--font-display); font-size: 2.2rem; font-weight: 700; letter-spacing: -.04em; color: var(--text); text-decoration: none; background: #fff; border: 1px solid var(--border); border-radius: 18px; padding: 18px 20px; transition: border-color .2s, transform .2s; }
  .mobile-menu a:hover { border-color: var(--accent); transform: translateX(4px); }
  .mobile-menu-cta { font-size: .92rem !important; font-family: var(--font-body) !important; font-weight: 700 !important; color: #fff !important; background: var(--accent) !important; border: none !important; margin-top: 12px; }
  @media (max-width: 860px) {
    .nav-links, .nav-cta { display: none; }
    .hamburger { display: flex; }
    .nav-inner { padding: 14px 18px; }
  }
`

export default function Navbar() {
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
            <Link to="/" className="nav-logo">Risky<span>.</span></Link>
            <ul className="nav-links">
              <li><NavLink to="/" end>Home</NavLink></li>
              <li><NavLink to="/about">About</NavLink></li>
              <li><NavLink to="/portfolio">Portfolio</NavLink></li>
              <li><NavLink to="/contact">Contact</NavLink></li>
            </ul>
            <a href="mailto:riskyjanuarlbs01@gmail.com" className="nav-cta">Let's Talk</a>
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
        <a href="mailto:riskyjanuarlbs01@gmail.com" className="mobile-menu-cta">Let's Talk</a>
      </div>
    </>
  )
}
