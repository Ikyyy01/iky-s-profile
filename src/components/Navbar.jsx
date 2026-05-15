import { useState, useEffect } from 'react'
import { NavLink, Link } from 'react-router-dom'

const styles = `
  .navbar { position:fixed; top:0; left:0; right:0; z-index:500; transition:background .3s, border-color .3s; }
  .navbar.scrolled { background:rgba(10,10,8,.92); backdrop-filter:blur(16px); border-bottom:1px solid var(--border); }
  .nav-inner { max-width:1200px; margin:0 auto; padding:20px 40px; display:flex; align-items:center; justify-content:space-between; }
  .nav-logo { font-family:var(--font-display); font-size:1.7rem; letter-spacing:.06em; color:#fff; text-decoration:none; line-height:1; }
  .nav-logo span { color:var(--accent); }
  .nav-links { display:flex; align-items:center; gap:36px; list-style:none; }
  .nav-links a { font-size:.78rem; font-weight:500; letter-spacing:.12em; text-transform:uppercase; color:var(--text2); text-decoration:none; position:relative; transition:color .2s; }
  .nav-links a::after { content:''; position:absolute; bottom:-3px; left:0; width:0; height:1px; background:var(--accent); transition:width .25s; }
  .nav-links a:hover, .nav-links a.active { color:var(--text); }
  .nav-links a:hover::after { width:100%; }
  .nav-links a.active { color:var(--accent); }
  .nav-links a.active::after { width:100%; }
  .nav-cta { font-size:.72rem; font-weight:700; letter-spacing:.12em; text-transform:uppercase; padding:9px 22px; background:var(--accent); color:#0a0a08; text-decoration:none; border-radius:var(--radius); transition:background .2s, transform .15s; }
  .nav-cta:hover { background:var(--accent2); transform:translateY(-1px); }
  .hamburger { display:none; flex-direction:column; gap:5px; cursor:none; background:none; border:none; padding:4px; }
  .hamburger span { display:block; width:22px; height:1.5px; background:var(--text); transition:transform .25s, opacity .25s; }
  .hamburger.open span:nth-child(1) { transform:translateY(6.5px) rotate(45deg); }
  .hamburger.open span:nth-child(2) { opacity:0; }
  .hamburger.open span:nth-child(3) { transform:translateY(-6.5px) rotate(-45deg); }
  .mobile-menu { display:none; position:fixed; inset:0; z-index:490; background:var(--bg); padding:100px 40px 60px; flex-direction:column; gap:8px; }
  .mobile-menu.open { display:flex; }
  .mobile-menu a { font-family:var(--font-display); font-size:3.5rem; letter-spacing:.04em; color:var(--text); text-decoration:none; border-bottom:1px solid var(--border); padding:12px 0; transition:color .2s, padding-left .2s; }
  .mobile-menu a:hover { color:var(--accent); padding-left:8px; }
  .mobile-menu-cta { font-size:.78rem !important; font-family:var(--font-body) !important; letter-spacing:.1em; text-transform:uppercase; font-weight:700 !important; color:var(--accent) !important; border:none !important; padding:0 !important; margin-top:24px; }
  @media (max-width:768px) { .nav-links,.nav-cta{display:none} .hamburger{display:flex} .nav-inner{padding:18px 24px} }
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
        <div className="nav-inner">
          <Link to="/" className="nav-logo">IKY<span>.</span></Link>
          <ul className="nav-links">
            <li><NavLink to="/" end>Home</NavLink></li>
            <li><NavLink to="/about">About</NavLink></li>
            <li><NavLink to="/portfolio">Portfolio</NavLink></li>
            <li><NavLink to="/contact">Contact</NavLink></li>
          </ul>
          <a href="mailto:riskyjanuarlbs01@gmail.com" className="nav-cta">Hire Me</a>
          <button className={`hamburger${menuOpen ? ' open' : ''}`} onClick={() => setMenuOpen(o => !o)}>
            <span /><span /><span />
          </button>
        </div>
      </nav>
      <div className={`mobile-menu${menuOpen ? ' open' : ''}`}>
        <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
        <Link to="/about" onClick={() => setMenuOpen(false)}>About</Link>
        <Link to="/portfolio" onClick={() => setMenuOpen(false)}>Portfolio</Link>
        <Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
        <a href="mailto:riskyjanuarlbs01@gmail.com" className="mobile-menu-cta">✉ Hire Me</a>
      </div>
    </>
  )
}
