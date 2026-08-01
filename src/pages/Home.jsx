import { Link } from 'react-router-dom'
import { useReveal } from '../hooks/useReveal'
import SafeImage from '../components/SafeImage'

const css = `
  .home-grid { display: grid; grid-template-columns: 1.1fr .9fr; gap: 32px; align-items: start; }
  .hero-card { padding: 28px; --rotation: -3deg; }
  .hero-photo { overflow: hidden; border-radius: 12px; border: var(--border-width-lg) solid var(--color-ink); box-shadow: var(--shadow-md); }
  .hero-photo img { width: 100%; aspect-ratio: 4 / 5; object-fit: cover; }
  .sticker { display: inline-block; margin-bottom: 18px; padding: 10px 16px; border: var(--border-width-lg) solid var(--color-ink); border-radius: var(--radius-sm); background: var(--color-secondary); font-family: var(--font-mono); font-weight: 700; transform: rotate(-8deg); box-shadow: var(--shadow-md); }
  .hero-actions, .hero-tags, .services-grid, .works-grid, .stats-grid { display: flex; flex-wrap: wrap; gap: 14px; }
  .hero-actions { margin-top: 28px; }
  .hero-tags { margin-top: 20px; }
  .stats-grid { display: grid; grid-template-columns: repeat(3, 1fr); margin-top: 26px; gap: 18px; }
  .stat-box, .service-card, .work-card, .cta-box { padding: 24px; }
  .stat-box:nth-child(1) { --rotation: 2deg; }
  .stat-box:nth-child(2) { --rotation: -2deg; }
  .stat-box:nth-child(3) { --rotation: 1deg; }
  .services-grid, .works-grid { display: grid; grid-template-columns: repeat(3, 1fr); margin-top: 30px; gap: 20px; }
  .service-card:nth-child(1) { --rotation: -2deg; }
  .service-card:nth-child(2) { --rotation: 1deg; }
  .service-card:nth-child(3) { --rotation: -1deg; }
  .work-card:nth-child(1) { --rotation: 2deg; }
  .work-card:nth-child(2) { --rotation: -3deg; }
  .work-card:nth-child(3) { --rotation: 1deg; }
  .work-thumb { height: 200px; border-bottom: var(--border-width-lg) solid var(--color-ink); display: flex; align-items: center; justify-content: center; font-size: 4rem; position: relative; overflow: hidden; }
  .work-thumb::after { content: ''; position: absolute; inset: 0; border: var(--border-width-sm) dashed var(--color-ink); opacity: .2; pointer-events: none; }
  .work-thumb img { width: 100%; height: 100%; object-fit: cover; display: block; }
  .cta-box { background: var(--color-primary); --rotation: -2deg; }
  @media (max-width: 980px) { .home-grid, .services-grid, .works-grid, .stats-grid { grid-template-columns: 1fr; } }
`

const services = [
  { title: 'Frontend', desc: 'Fast, clear interfaces with a stronger visual identity and polished user experience.', color: 'var(--color-primary)' },
  { title: 'Backend', desc: 'Reliable APIs, business logic, and clean system architecture for real-world products.', color: 'var(--color-secondary)' },
  { title: 'Portfolio Site', desc: 'Bold personal or business websites that feel memorable, expressive, and high-impact.', color: 'var(--color-tertiary)' },
]

const works = [
  { title: 'Catering Family Jakarta', desc: 'A fullstack catering management application for menus, orders, customers, and admin operations.', image: '/photo/catering.png', emoji: '🍽️', tags: ['Laravel', 'Vue', 'MySQL'] },
  { title: 'Undercover Party Game', desc: 'An interactive browser-based multiplayer party game built for lightweight and playful sessions.', image: '/photo/undercover.png', emoji: '🕵️', tags: ['React', 'TypeScript', 'CSS'] },
  { title: 'Next Project', desc: 'A new project currently in planning and development.', image: null, emoji: '🚧', tags: ['In Progress'] },
]

export default function Home() {
  useReveal()

  return (
    <div>
      <style>{css}</style>

      <section className="page-section page-hero">
        <div className="page-shell home-grid">
          <div>
            <div className="eyebrow reveal" style={{ background: 'var(--color-primary)', color: 'var(--color-ink)', transform: 'rotate(-5deg)' }}>Fullstack Web Developer</div>
            <h1 className="display-title reveal delay-1" style={{ marginTop: 20 }}>
              Hi, I&apos;m Risky — a fullstack developer building bold digital products.
            </h1>
            <p className="body-text muted reveal delay-2" style={{ marginTop: 20 }}>
              I focus on websites and web applications that feel clear, functional, and tactile. From frontend to backend, everything is built with structure and purpose.
            </p>
            <div className="hero-actions reveal delay-3">
              <Link to="/portfolio" className="brutal-btn" style={{ transform: 'rotate(-3deg)' }}>View Work →</Link>
              <Link to="/contact" className="brutal-btn-outline" style={{ transform: 'rotate(2deg)' }}>Contact Me</Link>
            </div>
            <div className="hero-tags reveal delay-4">
              <span className="tag yellow" style={{ transform: 'rotate(-4deg)' }}>React</span>
              <span className="tag pink" style={{ transform: 'rotate(3deg)' }}>Laravel</span>
              <span className="tag blue" style={{ transform: 'rotate(-2deg)' }}>Node.js</span>
              <span className="tag yellow" style={{ transform: 'rotate(5deg)' }}>Vue.js</span>
            </div>
            <div className="stats-grid reveal delay-4">
              <div className="brutal-card stat-box"><div className="section-title" style={{ fontSize: '2.5rem' }}>2+</div><p className="muted" style={{ fontFamily: 'var(--font-mono)', textTransform: 'uppercase', fontSize: '.85rem' }}>Selected projects</p></div>
              <div className="brutal-card stat-box"><div className="section-title" style={{ fontSize: '2.5rem' }}>6+</div><p className="muted" style={{ fontFamily: 'var(--font-mono)', textTransform: 'uppercase', fontSize: '.85rem' }}>Core stack</p></div>
              <div className="brutal-card stat-box"><div className="section-title" style={{ fontSize: '2.5rem' }}>24h</div><p className="muted" style={{ fontFamily: 'var(--font-mono)', textTransform: 'uppercase', fontSize: '.85rem' }}>Typical response</p></div>
            </div>
          </div>
          <div className="hero-card brutal-card reveal-right">
            <div className="sticker">Fullstack Builder</div>
            <div className="hero-photo">
              <SafeImage src="/photo/Gemini_Generated_Image_9pq8wq9pq8wq9pq8.png" alt="Risky Januar" loading="lazy" />
            </div>
            <div style={{ marginTop: 18 }}>
              <div className="tag yellow" style={{ transform: 'rotate(-5deg)' }}>Fullstack Developer</div>
              <p className="body-text" style={{ marginTop: 14, fontWeight: 600 }}>Building sharp interfaces, reliable APIs, and systems ready for practical use.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="page-section">
        <div className="page-shell">
          <div className="eyebrow reveal" style={{ background: 'var(--color-secondary)', transform: 'rotate(3deg)' }}>Services</div>
          <h2 className="section-title reveal delay-1" style={{ marginTop: 20 }}>What I can help you build</h2>
          <div className="services-grid">
            {services.map((service, index) => (
              <div key={service.title} className={`brutal-card service-card reveal delay-${index + 1}`} style={{ background: service.color }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', textTransform: 'uppercase' }}>{service.title}</h3>
                <p className="body-text" style={{ marginTop: 14, fontWeight: 600 }}>{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="page-section">
        <div className="page-shell">
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, alignItems: 'end', flexWrap: 'wrap' }}>
            <div>
              <div className="eyebrow reveal" style={{ background: 'var(--color-tertiary)', color: '#fff', transform: 'rotate(-4deg)' }}>Selected Work</div>
              <h2 className="section-title reveal delay-1" style={{ marginTop: 20 }}>Projects I&apos;ve built</h2>
            </div>
            <Link to="/portfolio" className="brutal-btn-outline reveal delay-2" style={{ transform: 'rotate(3deg)' }}>All Projects ↗</Link>
          </div>
          <div className="works-grid">
            {works.map((work, index) => (
              <div key={work.title} className={`brutal-card work-card reveal delay-${index + 1}`}>
                <div className="work-thumb" style={{ background: work.image ? 'var(--color-muted)' : index === 2 ? 'var(--color-tertiary)' : index === 1 ? 'var(--color-secondary)' : 'var(--color-primary)', color: index === 2 ? '#fff' : 'var(--color-ink)' }}>
                  {work.image ? <SafeImage src={work.image} alt={work.title} loading="lazy" /> : work.emoji}
                </div>
                <h3 style={{ marginTop: 18, fontFamily: 'var(--font-display)', fontSize: '1.45rem', textTransform: 'uppercase' }}>{work.title}</h3>
                <p className="body-text" style={{ marginTop: 12, fontWeight: 500 }}>{work.desc}</p>
                <div className="hero-tags" style={{ marginTop: 16 }}>{work.tags.map((tag, tagIndex) => <span key={tag} className={`tag ${tagIndex % 3 === 0 ? 'yellow' : tagIndex % 3 === 1 ? 'pink' : 'blue'}`}>{tag}</span>)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="page-section">
        <div className="page-shell">
          <div className="brutal-card cta-box reveal">
            <div className="eyebrow" style={{ background: 'var(--color-secondary)', transform: 'rotate(-4deg)' }}>Start a Project</div>
            <h2 className="section-title" style={{ marginTop: 20 }}>Need a website that feels bold and still stays solid?</h2>
            <p className="body-text" style={{ marginTop: 16, fontWeight: 600 }}>I can help design and build a web experience that feels sharp, expressive, and still highly usable.</p>
            <div className="hero-actions">
              <Link to="/contact" className="brutal-btn" style={{ background: 'var(--color-surface)', transform: 'rotate(2deg)' }}>Contact Me</Link>
              <Link to="/about" className="brutal-btn-outline" style={{ background: 'var(--color-tertiary)', color: '#fff', transform: 'rotate(-3deg)' }}>About Me</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
