import { Link } from 'react-router-dom'

const styles = `
  .site-footer { padding: 0 24px 32px; }
  .footer-shell { max-width: 1200px; margin: 0 auto; padding: 28px 24px; border-top: var(--border-width-lg) solid var(--color-ink); display: flex; justify-content: space-between; gap: 16px; flex-wrap: wrap; }
  .footer-logo { font-family: var(--font-display); text-transform: uppercase; text-decoration: none; font-size: 1.3rem; letter-spacing: -.02em; }
  .footer-copy { margin-top: 8px; font-size: .95rem; font-family: var(--font-mono); }
  .footer-links { display: flex; gap: 14px; flex-wrap: wrap; }
  @media (max-width: 700px) { .site-footer { padding: 0 16px 24px; } }
`

const socials = [
  { label: 'GitHub', href: 'https://github.com/Ikyyy01', className: 'yellow' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/muhammad-risky-januar-lubis-a3b554350/', className: 'blue' },
  { label: 'Email', href: 'mailto:riskyjanuarlbs01@gmail.com', className: 'pink' },
]

export default function Footer() {
  return (
    <>
      <style>{styles}</style>
      <footer className="site-footer">
        <div className="footer-shell">
          <div>
            <Link to="/" className="footer-logo">Risky Januar</Link>
            <p className="footer-copy">© 2026 Fullstack Web Developer</p>
          </div>
          <div className="footer-links">
            {socials.map(item => (
              <a
                key={item.label}
                href={item.href}
                target={item.href.startsWith('http') ? '_blank' : undefined}
                rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className={`tag ${item.className}`}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </>
  )
}
