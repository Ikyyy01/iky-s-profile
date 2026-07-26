import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useReveal } from '../hooks/useReveal'

const css = `
  .portfolio-page { color: var(--text); }
  .portfolio-container { max-width: 1200px; margin: 0 auto; padding: 0 24px; }
  .portfolio-section { padding: 110px 0; }
  .portfolio-hero { padding-top: 160px; }
  .section-label { display: inline-flex; align-items: center; gap: 10px; font-size: .78rem; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; color: var(--accent); }
  .section-label::before { content: ''; width: 28px; height: 1px; background: currentColor; }
  .display-h { font-family: var(--font-display); font-weight: 800; line-height: .98; letter-spacing: -.05em; color: var(--text); }
  .body-copy { font-size: 1rem; line-height: 1.85; color: var(--text2); }
  .filter-row { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 32px; }
  .filter-chip { padding: 11px 16px; border: 1px solid var(--border2); border-radius: 999px; background: rgba(255,255,255,.72); color: var(--text2); font-size: .84rem; font-weight: 700; transition: border-color .2s, background .2s, color .2s; }
  [data-theme="dark"] .filter-chip { background: rgba(255,255,255,.06); border-color: rgba(255,255,255,.1); }
  .filter-chip:hover, .filter-chip.active { border-color: var(--accent); background: var(--accent-dim); color: var(--accent); }

  .proj-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; margin-top: 28px; }
  .proj-card { 
    background: rgba(255,255,255,.82); 
    border: 1px solid rgba(199,210,224,.9); 
    border-radius: 28px; 
    overflow: hidden; 
    box-shadow: var(--shadow-sm); 
    transition: transform .2s, box-shadow .2s, border-color .2s; 
    position: relative;
  }
  .proj-card::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 28px;
    padding: 1.5px;
    background: linear-gradient(to bottom, rgba(255, 255, 255, 0.4), transparent);
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
  }
  [data-theme="dark"] .proj-card { background: rgba(20,24,82,.4); border-color: rgba(255,255,255,.05); }
  .proj-card:hover { transform: translateY(-6px); box-shadow: var(--shadow-md); border-color: rgba(37,99,235,.2); }
  
  .proj-card.featured { grid-column: span 2; grid-row: span 2; display: grid; grid-template-columns: 1fr 1fr; }
  .proj-card.featured .card-thumb { height: 100%; min-height: 380px; }
  .proj-card.wide { grid-column: span 2; }
  .proj-card.tall { grid-row: span 2; }
  
  .card-thumb { min-height: 240px; position: relative; display: flex; align-items: center; justify-content: center; overflow: hidden; background: linear-gradient(135deg, #070a14 0%, #1e2d5f 100%); }
  .card-thumb img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
  .card-thumb-emoji { font-size: 4rem; position: relative; z-index: 1; filter: drop-shadow(0 12px 24px rgba(0,0,0,.4)); }
  .card-overlay { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; gap: 12px; background: rgba(15,23,42,.6); opacity: 0; transition: opacity .25s; backdrop-filter: blur(4px); z-index: 2; }
  .proj-card:hover .card-overlay { opacity: 1; }
  
  .spotlight-glow {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 0;
    background: radial-gradient(400px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(96, 165, 250, 0.08), transparent 80%);
    opacity: 0;
    transition: opacity 0.3s;
  }
  .proj-card:hover .spotlight-glow { opacity: 1; }
  [data-theme="dark"] .spotlight-glow {
    background: radial-gradient(350px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(96, 165, 250, 0.12), transparent 80%);
  }

  .ol-btn { display: inline-flex; align-items: center; justify-content: center; min-height: 44px; padding: 0 18px; border-radius: 999px; text-decoration: none; font-size: .84rem; font-weight: 700; transition: transform .2s, background .2s, border-color .2s; }
  .ol-primary { background: #fff; color: var(--text); }
  [data-theme="dark"] .ol-primary { background: rgba(255,255,255,.1); color: #fff; }
  .ol-ghost { border: 1px solid rgba(255,255,255,.45); color: #fff; }
  .ol-btn:hover { transform: translateY(-2px); }
  .card-body { padding: 30px; position: relative; z-index: 1; }
  .card-type { font-size: .78rem; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; color: var(--accent); }
  .card-title { margin-top: 14px; font-family: var(--font-display); font-size: 1.7rem; font-weight: 800; letter-spacing: -.04em; line-height: 1.05; color: var(--text); }
  .card-desc { margin-top: 14px; font-size: .96rem; line-height: 1.8; color: var(--text2); }
  .card-tags { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 20px; }
  .card-tag { padding: 8px 12px; border-radius: 999px; background: var(--bg3); color: var(--text2); font-size: .82rem; font-weight: 600; border: 1px solid var(--border); }
  [data-theme="dark"] .card-tag { background: rgba(255,255,255,.05); border-color: rgba(255,255,255,.08); }
  .card-link { display: inline-flex; margin-top: 18px; color: var(--accent); font-size: .9rem; font-weight: 700; text-decoration: none; }
  .wip-badge { display: inline-flex; align-items: center; gap: 6px; margin-left: 10px; padding: 6px 10px; border-radius: 999px; background: rgba(22,163,74,.1); color: var(--green); font-size: .72rem; font-weight: 700; }

  .cta-box { margin-top: 56px; padding: 52px; text-align: center; border-radius: 32px; background: rgba(255,255,255,.82); border: 1px solid rgba(199,210,224,.9); box-shadow: var(--shadow-sm); }
  [data-theme="dark"] .cta-box { background: rgba(255,255,255,.05); border-color: rgba(255,255,255,.08); }
  .btn-row { display: flex; justify-content: center; gap: 14px; flex-wrap: wrap; margin-top: 28px; }
  .btn-primary, .btn-outline { display: inline-flex; align-items: center; justify-content: center; min-height: 50px; padding: 0 22px; border-radius: 999px; text-decoration: none; font-size: .95rem; font-weight: 700; transition: transform .2s, background .2s, border-color .2s, color .2s; }
  .btn-primary { background: var(--text); color: #fff; }
  .btn-primary:hover { background: var(--accent); transform: translateY(-2px); }
  [data-theme="dark"] .btn-primary { background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%); }
  .btn-outline { background: rgba(255,255,255,.7); border: 1px solid var(--border2); color: var(--text); }
  [data-theme="dark"] .btn-outline { background: rgba(255,255,255,.06); border-color: rgba(255,255,255,.1); }
  .btn-outline:hover { border-color: var(--accent); color: var(--accent); transform: translateY(-2px); }

  .preview-backdrop {
    position: fixed;
    inset: 0;
    z-index: 900;
    background: rgba(2, 6, 23, .72);
    backdrop-filter: blur(10px);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
    animation: slide-in-bottom .25s ease;
  }
  .preview-modal {
    width: min(960px, 100%);
    max-height: 90vh;
    overflow: auto;
    border-radius: 30px;
    background: rgba(255,255,255,.92);
    border: 1px solid rgba(199,210,224,.9);
    box-shadow: var(--shadow-md);
  }
  [data-theme="dark"] .preview-modal {
    background: rgba(15, 23, 42, .92);
    border-color: rgba(255,255,255,.08);
  }
  .preview-media {
    position: relative;
    min-height: 360px;
    background: #070a14;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .preview-media img {
    width: 100%;
    height: 100%;
    min-height: 360px;
    object-fit: cover;
    position: absolute;
    inset: 0;
    z-index: 1;
  }
  .preview-media .card-thumb-emoji {
    position: relative;
    z-index: 0;
  }
  .preview-body { padding: 28px; }
  .preview-top {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 16px;
  }
  .preview-close {
    width: 42px;
    height: 42px;
    border-radius: 999px;
    border: 1px solid var(--border2);
    background: rgba(255,255,255,.72);
    color: var(--text);
  }
  [data-theme="dark"] .preview-close {
    background: rgba(255,255,255,.06);
    border-color: rgba(255,255,255,.1);
    color: #fff;
  }
  .preview-actions { display: flex; gap: 12px; flex-wrap: wrap; margin-top: 24px; }

  @media (max-width: 900px) {
    .proj-grid { grid-template-columns: 1fr; }
    .proj-card.featured, .proj-card.wide, .proj-card.tall { grid-column: span 1; grid-row: span 1; }
  }
  @media (max-width: 640px) {
    .portfolio-container { padding: 0 16px; }
    .portfolio-section { padding: 80px 0; }
    .portfolio-hero { padding-top: 128px; }
    .card-body, .cta-box { padding: 22px; }
  }
`

const projects = [
  {
    id: 1,
    featured: true,
    cat: 'web',
    type: 'Featured · Fullstack Web',
    emoji: '🍽️',
    image: '/photo/catering.png',
    bg: 'linear-gradient(135deg,#dbeafe,#eff6ff)',
    glow: 'rgba(37,99,235,.18)',
    title: 'Catering Family Jakarta',
    desc: 'A complete catering management web application for a Jakarta-based business with menu management, order tracking, customer management, and an admin dashboard.',
    tags: ['Laravel', 'Vue.js', 'REST API', 'MySQL', 'PHP', 'Tailwind CSS'],
    github: 'https://github.com/Ikyyy01',
    live: null,
    status: null,
  },
  {
    id: 2,
    featured: false,
    cat: 'web',
    type: 'Web App · Game',
    emoji: '🕵️',
    image: '/photo/undercover.png',
    bg: 'linear-gradient(135deg,#e2e8f0,#f8fafc)',
    glow: 'rgba(15,23,42,.12)',
    title: 'Undercover Party Game',
    desc: 'A multiplayer party game web app inspired by the Undercover card game, built for playful interaction and smooth browser-based gameplay.',
    tags: ['React', 'TypeScript', 'JavaScript', 'CSS3'],
    github: 'https://github.com/Ikyyy01',
    live: null,
    status: null,
  },
  {
    id: 3,
    featured: false,
    cat: 'web',
    type: 'Web · Coming Soon',
    emoji: '🚧',
    bg: 'linear-gradient(135deg,#f8fafc,#eef2f7)',
    glow: 'rgba(22,163,74,.12)',
    title: 'Next Project',
    desc: 'A new project is currently in planning and development, with a focus on another practical digital experience.',
    tags: ['In Planning'],
    github: null,
    live: null,
    status: 'wip',
  },
]

const filters = ['all', 'web']

export default function Portfolio() {
  const [active, setActive] = useState('all')
  const [preview, setPreview] = useState(null)
  useReveal()

  const visible = active === 'all' ? projects : projects.filter(project => project.cat === active)

  const handleMouseMove = (e) => {
    const cards = document.querySelectorAll('.proj-card');
    for (const card of cards) {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    }
  }

  return (
    <div className="portfolio-page" onMouseMove={handleMouseMove}>
      <style>{css}</style>

      <section className="portfolio-section portfolio-hero">
        <div className="portfolio-container">
          <div className="section-label reveal">Portfolio</div>
          <h1 className="display-h reveal delay-1" style={{ fontSize: 'clamp(3rem, 7vw, 5.6rem)', marginTop: 18 }}>
            Selected projects
            <br />
            with real execution.
          </h1>
          <p className="body-copy reveal delay-2" style={{ marginTop: 22, maxWidth: 700 }}>
            A curated selection of work spanning fullstack web applications and interactive browser experiences, built with clarity and maintainability in mind.
          </p>
        </div>
      </section>

      <section className="portfolio-section" style={{ paddingTop: 0 }}>
        <div className="portfolio-container">
          <div className="filter-row reveal">
            {filters.map(filter => (
              <button
                key={filter}
                className={`filter-chip${active === filter ? ' active' : ''}`}
                onClick={() => setActive(filter)}
              >
                {filter === 'all' ? 'All Projects' : 'Web'}
              </button>
            ))}
          </div>
          <div className="body-copy reveal" style={{ marginTop: 18 }}>Showing {visible.length} project{visible.length !== 1 ? 's' : ''}</div>

          <div className="proj-grid">
            {visible.map((project, index) => (
              <div
                key={project.id}
                className={`proj-card reveal delay-${index % 3}${project.featured && active === 'all' ? ' featured' : ''}${!project.featured && index === 1 ? ' tall' : ''}${!project.featured && index === 2 ? ' wide' : ''}`}
                onClick={() => setPreview(project)}
                style={{ cursor: 'none' }}
              >
                <div className="spotlight-glow" />
                <div className="card-thumb" style={{ background: project.bg }}>
                  {project.image && (
                    <img
                      src={project.image}
                      alt={project.title}
                      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 2 }}
                    />
                  )}
                  {!project.image && (
                    <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at 40% 50%, ${project.glow} 0%, transparent 70%)`, zIndex: 0 }} />
                  )}
                  {!project.image && <span className="card-thumb-emoji">{project.emoji}</span>}
                  {(project.github || project.live) && (
                    <div className="card-overlay">
                      {project.github && <a href={project.github} target="_blank" rel="noopener noreferrer" className="ol-btn ol-primary">GitHub</a>}
                      {project.live && <a href={project.live} target="_blank" rel="noopener noreferrer" className="ol-btn ol-ghost">Live Demo</a>}
                    </div>
                  )}
                </div>
                <div className="card-body" style={project.featured && active === 'all' ? { display: 'flex', flexDirection: 'column', justifyContent: 'center' } : {}}>
                  <div className="card-type">
                    {project.type}
                    {project.status === 'wip' && <span className="wip-badge">In Progress</span>}
                  </div>
                  <div className="card-title">{project.title}</div>
                  <p className="card-desc">{project.desc}</p>
                  <div className="card-tags">{project.tags.map(tag => <span key={tag} className="card-tag">{tag}</span>)}</div>
                  {project.github && <a href={project.github} target="_blank" rel="noopener noreferrer" className="card-link">View repository</a>}
                </div>
              </div>
            ))}
          </div>

          <div className="cta-box reveal">
            <div className="section-label" style={{ justifyContent: 'center' }}>Collaboration</div>
            <h2 className="display-h" style={{ fontSize: 'clamp(2rem, 4vw, 3.4rem)', marginTop: 18 }}>Need a project built with care?</h2>
            <p className="body-copy" style={{ maxWidth: 560, margin: '18px auto 0' }}>
              I'm open for freelance work and opportunities to build polished web experiences.
            </p>
            <div className="btn-row">
              <Link to="/contact" className="btn-primary">Get In Touch</Link>
              <Link to="/about" className="btn-outline">About Me</Link>
            </div>
          </div>

          {preview && (
            <div className="preview-backdrop" onClick={() => setPreview(null)}>
              <div className="preview-modal" onClick={e => e.stopPropagation()}>
                <div className="preview-media" style={{ background: preview.bg }}>
                  {preview.image ? (
                    <img 
                      src={preview.image} 
                      alt={preview.title} 
                      onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block' }}
                    />
                  ) : null}
                  <div style={{ display: preview.image ? 'none' : 'block', position: 'absolute', inset: 0, background: `radial-gradient(ellipse at 40% 50%, ${preview.glow} 0%, transparent 70%)` }} />
                  <span className="card-thumb-emoji" style={{ display: preview.image ? 'none' : 'block' }}>{preview.emoji}</span>
                </div>
                <div className="preview-body">
                  <div className="preview-top">
                    <div>
                      <div className="card-type">
                        {preview.type}
                        {preview.status === 'wip' && <span className="wip-badge">In Progress</span>}
                      </div>
                      <div className="card-title" style={{ marginTop: 10 }}>{preview.title}</div>
                    </div>
                    <button className="preview-close" onClick={() => setPreview(null)} aria-label="Close preview">✕</button>
                  </div>
                  <p className="card-desc">{preview.desc}</p>
                  <div className="card-tags">{preview.tags.map(tag => <span key={tag} className="card-tag">{tag}</span>)}</div>
                  <div className="preview-actions">
                    {preview.github && <a href={preview.github} target="_blank" rel="noopener noreferrer" className="ol-btn ol-primary">GitHub</a>}
                    {preview.live && <a href={preview.live} target="_blank" rel="noopener noreferrer" className="ol-btn ol-ghost" style={{ color: 'var(--text)', borderColor: 'var(--border2)' }}>Live Demo</a>}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
