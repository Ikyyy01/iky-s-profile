import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useReveal } from '../hooks/useReveal'
import SafeImage from '../components/SafeImage'

const css = `
  .filter-row, .project-tags, .cta-actions { display: flex; flex-wrap: wrap; gap: 12px; }
  .project-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 32px; margin-top: 30px; }
  .project-card { overflow: hidden; transition: transform 120ms ease-out, box-shadow 120ms ease-out; --rotation: -1deg; }
  .project-card:nth-child(2n) { --rotation: 2deg; }
  .project-card:hover { transform: translate(-8px, -8px) rotate(0deg); box-shadow: var(--shadow-lg); }
  .project-thumb { height: 240px; border-bottom: var(--border-width-lg) solid var(--color-ink); display: flex; align-items: center; justify-content: center; font-size: 4rem; position: relative; }
  .project-thumb::after { content: ''; position: absolute; inset: 0; border: var(--border-width-sm) dashed var(--color-ink); opacity: .2; pointer-events: none; }
  .project-thumb img { width: 100%; height: 100%; object-fit: cover; }
  .project-body { padding: 28px; }
  .project-arrow { font-size: 1.8rem; font-weight: 800; }
  @media (max-width: 900px) { .project-grid { grid-template-columns: 1fr; } }
`

const projects = [
  { id: 1, cat: 'web', title: 'Catering Family Jakarta', desc: 'A fullstack catering application for managing menus, orders, customers, and the admin dashboard.', image: '/photo/catering.png', tags: ['Laravel', 'Vue.js', 'MySQL'], github: 'https://github.com/Ikyyy01', live: 'https://cateringfamilyjakarta.store' },
  { id: 2, cat: 'web', title: 'Undercover Party Game', desc: 'A multiplayer browser game built for lightweight, interactive, and playful sessions.', image: '/photo/undercover.png', tags: ['React', 'TypeScript', 'CSS3'], github: 'https://github.com/Ikyyy01', live: 'https://undercoveriky.vercel.app' },
  { id: 3, cat: 'ongoing', title: 'Next Project', desc: 'A new project currently in planning and development.', image: null, tags: ['In Progress'], github: null, live: null },
]

export default function Portfolio() {
  const [active, setActive] = useState('all')
  useReveal()

  const visible = active === 'all' ? projects : projects.filter(project => project.cat === active)

  return (
    <div>
      <style>{css}</style>

      <section className="page-section page-hero">
        <div className="page-shell">
          <div className="eyebrow reveal" style={{ transform: 'rotate(-4deg)' }}>Portfolio</div>
          <h1 className="display-title reveal delay-1" style={{ marginTop: 20 }}>Selected work with real execution.</h1>
          <p className="body-text muted reveal delay-2" style={{ marginTop: 20, fontWeight: 500 }}>Project cards are large, bold, and tactile to match the neubrutalism design direction.</p>
        </div>
      </section>

      <section className="page-section">
        <div className="page-shell">
          <div className="filter-row reveal">
            {['all', 'web', 'ongoing'].map(filter => (
              <button
                key={filter}
                className={active === filter ? 'brutal-btn' : 'brutal-btn-outline'}
                onClick={() => setActive(filter)}
              >
                {filter === 'all' ? 'All' : filter}
              </button>
            ))}
          </div>
          <div className="project-grid">
            {visible.map((project, index) => (
              <div key={project.id} className={`brutal-card project-card reveal delay-${index + 1}`}>
                <div className="project-thumb" style={{ background: project.image ? 'var(--color-muted)' : index % 2 === 0 ? 'var(--color-primary)' : 'var(--color-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {project.image ? <SafeImage src={project.image} alt={project.title} loading="lazy" /> : <span style={{ fontSize: '3rem' }}>🚧</span>}
                </div>

                <div className="project-body">
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, alignItems: 'start' }}>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', textTransform: 'uppercase' }}>{project.title}</h3>
                    <span className="project-arrow">↗</span>
                  </div>
                  <p className="body-text" style={{ marginTop: 12 }}>{project.desc}</p>
                   <div className="project-tags" style={{ marginTop: 16 }}>
                     {project.tags.map((tag, tagIndex) => <span key={tag} className={`tag ${tagIndex % 3 === 0 ? 'yellow' : tagIndex % 3 === 1 ? 'pink' : 'blue'}`}>{tag}</span>)}
                   </div>
                   <div style={{ marginTop: 18, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                     {project.github && <a href={project.github} target="_blank" rel="noopener noreferrer" className="brutal-btn-outline" style={{ fontSize: '.9rem' }}>GitHub</a>}
                     {project.live && <a href={project.live} target="_blank" rel="noopener noreferrer" className="brutal-btn" style={{ fontSize: '.9rem' }}>View Live</a>}
                   </div>

                </div>
              </div>
            ))}
          </div>

          <div className="brutal-card cta-panel reveal" style={{ marginTop: 36, background: 'var(--color-primary)' }}>
            <div className="eyebrow" style={{ background: 'var(--color-tertiary)' }}>Collaboration</div>
            <h2 className="section-title" style={{ marginTop: 20 }}>Need a project built with care and detail?</h2>
            <p className="body-text" style={{ marginTop: 16 }}>I&apos;m available for freelance work and digital product collaborations.</p>
            <div className="cta-actions" style={{ marginTop: 20 }}>
              <Link to="/contact" className="brutal-btn">Get In Touch</Link>
              <Link to="/about" className="brutal-btn-outline">About Me</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
