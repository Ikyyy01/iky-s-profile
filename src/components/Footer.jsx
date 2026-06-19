import { Link } from 'react-router-dom'

const styles = `
  .site-footer { padding: 0 24px 32px; }
  .footer-shell {
    max-width: 1200px;
    margin: 0 auto;
    background: rgba(255,255,255,.78);
    border: 1px solid rgba(199,210,224,.9);
    border-radius: 28px;
    box-shadow: var(--shadow-sm);
    padding: 28px 32px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 24px;
    flex-wrap: wrap;
  }
  .footer-brand { display: flex; flex-direction: column; gap: 8px; }
  .footer-logo { font-family: var(--font-display); font-size: 1.15rem; font-weight: 800; letter-spacing: -.03em; color: var(--text); text-decoration: none; }
  .footer-logo span { color: var(--accent); }
  .footer-copy { font-size: .88rem; color: var(--text3); }
  .footer-links { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; }
  .footer-link {
    min-width: 44px;
    height: 44px;
    padding: 0 16px;
    border-radius: 999px;
    border: 1px solid var(--border);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: #fff;
    color: var(--text2);
    text-decoration: none;
    font-size: .84rem;
    font-weight: 600;
    transition: border-color .2s, color .2s, transform .2s;
  }
  .footer-link:hover { border-color: var(--accent); color: var(--accent); transform: translateY(-2px); }
  @media (max-width: 700px) {
    .footer-shell { padding: 24px 20px; }
    .site-footer { padding: 0 16px 24px; }
  }
`

const socials = [
  { label: 'GitHub', href: 'https://github.com/Ikyyy01' },
  { label: 'Email', href: 'mailto:riskyjanuarlbs01@gmail.com' },
]

export default function Footer() {
  return (
    <>
      <style>{styles}</style>
      <footer className="site-footer">
        <div className="footer-shell">
          <div className="footer-brand">
            <Link to="/" className="footer-logo">Risky<span>.</span></Link>
            <p className="footer-copy">© 2026 Risky Januar · Fullstack Web Developer</p>
          </div>
          <div className="footer-links">
            {socials.map(sc => (
              <a
                key={sc.label}
                href={sc.href}
                target={sc.href.startsWith('http') ? '_blank' : undefined}
                rel={sc.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="footer-link"
              >
                {sc.label}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </>
  )
}
