import { Link } from 'react-router-dom'

const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.137 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
  </svg>
)

const EmailIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="5" width="18" height="14" rx="2"/>
    <path d="M3 7l9 6 9-6"/>
  </svg>
)

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
  [data-theme="dark"] .footer-shell { background: rgba(255,255,255,.05); border-color: rgba(255,255,255,.08); }
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
  [data-theme="dark"] .footer-link { background: rgba(255,255,255,.06); border-color: rgba(255,255,255,.1); }
  .footer-link:hover { border-color: var(--accent); color: var(--accent); transform: translateY(-2px); }
  @media (max-width: 700px) {
    .footer-shell { padding: 24px 20px; }
    .site-footer { padding: 0 16px 24px; }
  }
`

const socials = [
  { label: 'GitHub', href: 'https://github.com/Ikyyy01', icon: <GitHubIcon /> },
  { label: 'Email', href: 'mailto:riskyjanuarlbs01@gmail.com', icon: <EmailIcon /> },
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
                title={sc.label}
              >
                {sc.icon}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </>
  )
}
