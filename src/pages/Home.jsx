import { Link } from 'react-router-dom'
import { useReveal } from '../hooks/useReveal'

const css = `
  .home-page { color: var(--text); }
  .home-container { max-width: 1200px; margin: 0 auto; padding: 0 24px; }
  .home-section { padding: 110px 0; }
  .home-label { display: inline-flex; align-items: center; gap: 10px; font-size: .78rem; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; color: var(--accent); }
  .home-label::before { content: ''; width: 28px; height: 1px; background: currentColor; }
  .home-title { font-family: var(--font-display); font-size: clamp(2.6rem, 6vw, 5.4rem); line-height: .98; letter-spacing: -.05em; color: var(--text); }
  .home-copy { font-size: 1rem; line-height: 1.8; color: var(--text2); }
  .home-copy-lg { font-size: 1.08rem; line-height: 1.85; color: var(--text2); }
  .home-actions { display: flex; flex-wrap: wrap; gap: 14px; margin-top: 32px; }
  .home-btn-primary, .home-btn-secondary {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    min-height: 50px;
    padding: 0 22px;
    border-radius: 999px;
    text-decoration: none;
    font-size: .95rem;
    font-weight: 700;
    transition: transform .2s, background .2s, border-color .2s, color .2s;
  }
  .home-btn-primary { background: var(--text); color: #fff; }
  .home-btn-primary:hover { background: var(--accent); transform: translateY(-2px); }
  .home-btn-secondary { background: rgba(255,255,255,.7); color: var(--text); border: 1px solid var(--border2); }
  .home-btn-secondary:hover { border-color: var(--accent); color: var(--accent); transform: translateY(-2px); }

  .hero { min-height: 100vh; display: flex; align-items: center; padding-top: 120px; }
  .hero-grid { display: grid; grid-template-columns: minmax(0, 1.15fr) minmax(320px, .85fr); gap: 48px; align-items: center; }
  .hero-badge { display: inline-flex; align-items: center; gap: 10px; padding: 10px 16px; background: rgba(255,255,255,.72); border: 1px solid rgba(199,210,224,.9); border-radius: 999px; box-shadow: var(--shadow-sm); color: var(--text2); font-size: .9rem; }
  .hero-badge-dot { width: 8px; height: 8px; border-radius: 999px; background: var(--green); animation: pulse-dot 2s ease-in-out infinite; }
  .hero-heading { margin-top: 20px; }
  .hero-heading .accent { color: var(--accent); }
  .hero-subtitle { margin-top: 22px; max-width: 620px; }
  .hero-meta { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-top: 42px; }
  .hero-stat { padding: 24px; background: rgba(255,255,255,.75); border: 1px solid rgba(199,210,224,.9); border-radius: 22px; box-shadow: var(--shadow-sm); }
  .hero-stat-value { font-family: var(--font-display); font-size: 2rem; font-weight: 800; letter-spacing: -.04em; color: var(--text); }
  .hero-stat-label { margin-top: 6px; font-size: .85rem; color: var(--text3); }

  .hero-card {
    position: relative;
    padding: 18px;
    background: rgba(255,255,255,.78);
    border: 1px solid rgba(199,210,224,.9);
    border-radius: 32px;
    box-shadow: var(--shadow-md);
  }
  .hero-image-wrap { border-radius: 24px; overflow: hidden; background: linear-gradient(180deg, #dbeafe 0%, #eff6ff 100%); }
  .hero-image-wrap img { width: 100%; aspect-ratio: 4 / 5; object-fit: cover; object-position: top center; }
  .hero-note {
    position: absolute;
    left: -18px;
    right: auto;
    bottom: 28px;
    background: #fff;
    border: 1px solid var(--border);
    border-radius: 18px;
    padding: 16px 18px;
    box-shadow: var(--shadow-sm);
    max-width: 240px;
  }
  .hero-note-title { font-size: .78rem; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; color: var(--accent); }
  .hero-note-copy { margin-top: 8px; font-size: .9rem; line-height: 1.7; color: var(--text2); }

  .service-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 22px; margin-top: 42px; }
  .service-card {
    padding: 30px;
    border-radius: 24px;
    background: rgba(255,255,255,.8);
    border: 1px solid rgba(199,210,224,.9);
    box-shadow: var(--shadow-sm);
    transition: transform .2s, box-shadow .2s, border-color .2s;
  }
  .service-card:hover { transform: translateY(-6px); box-shadow: var(--shadow-md); border-color: rgba(37,99,235,.2); }
  .service-eyebrow { font-size: .78rem; font-weight: 700; color: var(--accent); letter-spacing: .08em; text-transform: uppercase; }
  .service-title { margin-top: 14px; font-family: var(--font-display); font-size: 1.45rem; font-weight: 800; letter-spacing: -.03em; }
  .service-desc { margin-top: 12px; font-size: .96rem; line-height: 1.8; color: var(--text2); }
  .tag-row { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 22px; }
  .tag { padding: 8px 12px; border-radius: 999px; background: var(--bg3); color: var(--text2); font-size: .82rem; font-weight: 600; }

  .works-panel {
    padding: 34px;
    background: rgba(255,255,255,.8);
    border: 1px solid rgba(199,210,224,.9);
    border-radius: 28px;
    box-shadow: var(--shadow-sm);
    margin-top: 42px;
  }
  .work-item {
    display: grid;
    grid-template-columns: 72px minmax(0, 1fr) auto;
    gap: 18px;
    align-items: center;
    padding: 22px 0;
    border-top: 1px solid var(--border);
    text-decoration: none;
    color: inherit;
    transition: transform .2s;
  }
  .work-item:first-child { border-top: none; padding-top: 0; }
  .work-item:hover { transform: translateX(4px); }
  .work-index { font-size: .84rem; font-weight: 700; color: var(--text3); }
  .work-title { font-family: var(--font-display); font-size: 1.4rem; font-weight: 800; letter-spacing: -.03em; }
  .work-meta { margin-top: 6px; font-size: .92rem; color: var(--text2); }
  .work-type { padding: 10px 14px; background: var(--bg3); border-radius: 999px; font-size: .8rem; font-weight: 700; color: var(--text2); }

  .cta-card {
    padding: 52px;
    border-radius: 32px;
    background: linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%);
    color: #fff;
    box-shadow: var(--shadow-md);
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 28px;
    flex-wrap: wrap;
  }
  .cta-card .home-title { color: #fff; font-size: clamp(2.2rem, 4vw, 3.8rem); }
  .cta-card .home-copy { color: rgba(255,255,255,.75); max-width: 520px; }
  .cta-card .home-btn-primary { background: #fff; color: var(--text); }
  .cta-card .home-btn-primary:hover { background: #dbeafe; color: var(--accent); }
  .cta-card .home-btn-secondary { background: transparent; border-color: rgba(255,255,255,.25); color: #fff; }

  @media (max-width: 980px) {
    .hero-grid, .service-grid { grid-template-columns: 1fr; }
    .hero-meta { grid-template-columns: 1fr; }
    .hero-note { position: static; margin-top: 16px; max-width: 100%; }
    .work-item { grid-template-columns: 1fr; }
    .work-type { width: fit-content; }
  }
  @media (max-width: 640px) {
    .home-container { padding: 0 16px; }
    .home-section { padding: 80px 0; }
    .hero { padding-top: 108px; }
    .service-card, .works-panel, .cta-card, .hero-card, .hero-stat { padding: 22px; }
  }
`

const works = [
  { num: '01', title: 'Catering Family Jakarta', meta: 'Laravel · Vue.js · REST API · MySQL', type: 'Fullstack Web' },
  { num: '02', title: 'Undercover Party Game', meta: 'React · TypeScript · JavaScript', type: 'Web App' },
]

const services = [
  {
    n: '01',
    title: 'Frontend Development',
    desc: 'Responsive interfaces with strong visual hierarchy, accessibility, and polished interactions for modern web products.',
    tags: ['React', 'Vue.js', 'Next.js', 'Tailwind CSS'],
  },
  {
    n: '02',
    title: 'Backend Development',
    desc: 'Reliable server-side systems, REST APIs, authentication flows, and maintainable architecture for scalable applications.',
    tags: ['Laravel', 'Node.js', 'PHP', 'Express.js'],
  },
  {
    n: '03',
    title: 'System & Database Design',
    desc: 'Structured data models, efficient queries, and practical system planning to support long-term product growth.',
    tags: ['MySQL', 'REST API', 'System Analysis'],
  },
]

export default function Home() {
  useReveal()

  return (
    <div className="home-page">
      <style>{css}</style>

      <section className="hero home-container">
        <div className="hero-grid">
          <div>
            <div className="hero-badge reveal">
              <span className="hero-badge-dot" />
              Available for work
            </div>
            <div className="hero-heading reveal delay-1">
              <h1 className="home-title">
                Clean digital products,
                <br />
                built with precision<span className="accent">.</span>
              </h1>
            </div>
            <p className="home-copy-lg hero-subtitle reveal delay-2">
              I'm Risky Januar, a fullstack web developer focused on building professional,
              modern, and reliable web experiences from interface to backend architecture.
            </p>
            <div className="home-actions reveal delay-3">
              <Link to="/portfolio" className="home-btn-primary">View Portfolio</Link>
              <Link to="/contact" className="home-btn-secondary">Discuss a Project</Link>
            </div>
            <div className="hero-meta reveal delay-4">
              <div className="hero-stat">
                <div className="hero-stat-value">2+</div>
                <div className="hero-stat-label">Selected projects launched</div>
              </div>
              <div className="hero-stat">
                <div className="hero-stat-value">6+</div>
                <div className="hero-stat-label">Core technologies mastered</div>
              </div>
              <div className="hero-stat">
                <div className="hero-stat-value">2023</div>
                <div className="hero-stat-label">Started journey in Information Systems</div>
              </div>
            </div>
          </div>

          <div className="reveal-right">
            <div className="hero-card">
              <div className="hero-image-wrap">
                <img src="/photo/Gemini_Generated_Image_9pq8wq9pq8wq9pq8.png" alt="Risky Januar" />
              </div>
              <div className="hero-note">
                <div className="hero-note-title">Focus</div>
                <p className="hero-note-copy">Building clean, professional, and effective websites for businesses and products.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="home-section">
        <div className="home-container">
          <div className="reveal">
            <div className="home-label">Services</div>
            <h2 className="home-title" style={{ marginTop: 16, maxWidth: 760 }}>What I can help you build</h2>
            <p className="home-copy" style={{ marginTop: 20, maxWidth: 680 }}>
              I design and develop web solutions with an emphasis on clarity, performance, and maintainability.
            </p>
          </div>
          <div className="service-grid">
            {services.map((s, i) => (
              <div key={s.n} className={`service-card reveal delay-${i}`}>
                <div className="service-eyebrow">Service {s.n}</div>
                <h3 className="service-title">{s.title}</h3>
                <p className="service-desc">{s.desc}</p>
                <div className="tag-row">
                  {s.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="home-section" style={{ paddingTop: 0 }}>
        <div className="home-container">
          <div className="reveal" style={{ display: 'flex', justifyContent: 'space-between', gap: 20, alignItems: 'end', flexWrap: 'wrap' }}>
            <div>
              <div className="home-label">Portfolio</div>
              <h2 className="home-title" style={{ marginTop: 16 }}>Selected work</h2>
            </div>
            <Link to="/portfolio" className="home-btn-secondary">See all projects</Link>
          </div>
          <div className="works-panel">
            {works.map((w, i) => (
              <Link to="/portfolio" key={w.num} className={`work-item reveal delay-${i}`}>
                <span className="work-index">{w.num}</span>
                <div>
                  <div className="work-title">{w.title}</div>
                  <div className="work-meta">{w.meta}</div>
                </div>
                <span className="work-type">{w.type}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="home-section" style={{ paddingTop: 0 }}>
        <div className="home-container">
          <div className="cta-card reveal">
            <div>
              <div className="home-label" style={{ color: 'rgba(255,255,255,.72)' }}>Start a conversation</div>
              <h2 className="home-title" style={{ marginTop: 16 }}>Need a website that feels polished and professional?</h2>
              <p className="home-copy" style={{ marginTop: 18 }}>
                Let's turn your ideas into a clean digital presence that looks credible and works smoothly.
              </p>
            </div>
            <div className="home-actions" style={{ marginTop: 0 }}>
              <Link to="/contact" className="home-btn-primary">Contact Me</Link>
              <Link to="/about" className="home-btn-secondary">About Me</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
