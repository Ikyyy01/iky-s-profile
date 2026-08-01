import { useState, useEffect } from 'react'
import { NavLink, Link } from 'react-router-dom'

const styles = `
  .navbar { position: fixed; top: 0; left: 0; right: 0; z-index: 500; background: var(--color-bg); border-bottom: var(--border-width-lg) solid var(--color-ink); box-shadow: var(--shadow-sm); }
  .navbar.scrolled { background: var(--color-primary); }
  .nav-inner { max-width: 1200px; margin: 0 auto; padding: 18px 24px; display: flex; align-items: center; justify-content: space-between; gap: 16px; }
  .nav-logo { font-family: var(--font-display); font-size: 1.4rem; text-decoration: none; text-transform: uppercase; letter-spacing: -.02em; }
  .nav-links { display: flex; gap: 12px; list-style: none; }
  .nav-links a, .hamburger {
    padding: 10px 16px;
    border: var(--border-width-lg) solid var(--color-ink);
    border-radius: var(--radius-md);
    background: var(--color-surface);
    box-shadow: var(--shadow-sm);
    text-decoration: none;
    font-weight: 800;
    text-transform: uppercase;
    font-family: var(--font-mono);
    font-size: .85rem;
  }
  .nav-links a.active, .nav-links a:hover { background: var(--color-secondary); transform: translate(-2px, -2px); box-shadow: var(--shadow-md); }
  .nav-actions { display: flex; align-items: center; gap: 12px; }
  .nav-cta { white-space: nowrap; transform: rotate(-2deg); }
  .hamburger { display: none; flex-direction: column; gap: 5px; width: 44px; height: 44px; }
  .hamburger span { width: 22px; height: 4px; background: var(--color-ink); border-radius: 2px; }
  .mobile-menu { display: none; padding: 0 16px 24px; background: var(--color-bg); border-bottom: var(--border-width-lg) solid var(--color-ink); gap: 12px; }
  .mobile-menu.open { display: grid; }
  .mobile-menu a, .mobile-menu button { text-align: center; font-size: 1rem; }
  @media (max-width: 860px) {
    .nav-links, .nav-cta { display: none; }
    .hamburger { display: inline-flex; }
    .nav-inner { padding: 16px; }
  }
`

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <>
      <style>{styles}</style>
      <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
        <div className="nav-inner">
          <Link to="/" className="nav-logo">Risky Januar</Link>
          <ul className="nav-links">
            <li><NavLink to="/" end>Home</NavLink></li>
            <li><NavLink to="/about">About</NavLink></li>
            <li><NavLink to="/portfolio">Portfolio</NavLink></li>
            <li><NavLink to="/contact">Contact</NavLink></li>
          </ul>
          <div className="nav-actions">
            <a href="mailto:riskyjanuarlbs01@gmail.com" className="brutal-btn nav-cta">Let's Talk</a>
            <button className="hamburger" onClick={() => setMenuOpen(current => !current)} aria-label="Toggle menu">
              <span /><span /><span />
            </button>
          </div>
        </div>
        <div className={`mobile-menu${menuOpen ? ' open' : ''}`}>
          <Link className="brutal-btn-outline" to="/" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link className="brutal-btn-outline" to="/about" onClick={() => setMenuOpen(false)}>About</Link>
          <Link className="brutal-btn-outline" to="/portfolio" onClick={() => setMenuOpen(false)}>Portfolio</Link>
          <Link className="brutal-btn-outline" to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
          <a href="mailto:riskyjanuarlbs01@gmail.com" className="brutal-btn">Let's Talk</a>
        </div>
      </nav>
    </>
  )
}
