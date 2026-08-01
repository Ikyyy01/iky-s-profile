import { Link } from 'react-router-dom'
import { useReveal } from '../hooks/useReveal'
import SafeImage from '../components/SafeImage'

const css = `
  .about-grid, .edu-grid, .values-grid { display: grid; gap: 24px; }
  .about-grid { grid-template-columns: 1.1fr .9fr; align-items: start; }
  .edu-grid { grid-template-columns: repeat(2, 1fr); margin-top: 30px; gap: 20px; }
  .values-grid { grid-template-columns: repeat(3, 1fr); margin-top: 30px; gap: 20px; }
  .bio-card, .photo-card, .edu-card, .value-card, .stack-box, .cta-strip { padding: 24px; }
  .photo-card { --rotation: 3deg; }
  .edu-card { --rotation: -2deg; }
  .stack-box { --rotation: 2deg; }
  .value-card:nth-child(1) { --rotation: -3deg; }
  .value-card:nth-child(2) { --rotation: 1deg; }
  .value-card:nth-child(3) { --rotation: -1deg; }
  .stack-list { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 20px; }
  .photo-card img { box-shadow: inset 0 0 0 var(--border-width-sm) rgba(20,20,20,.1); }
  @media (max-width: 980px) { .about-grid, .edu-grid, .values-grid { grid-template-columns: 1fr; } }
`

const stack = ['React', 'Vue', 'Next.js', 'Laravel', 'Node.js', 'MySQL', 'TypeScript', 'Figma', 'GitHub', 'Vercel']
const values = [
  { title: 'Clear', desc: 'I like structure that feels direct, intentional, and easy to understand.' },
  { title: 'Fast', desc: 'I value quick iteration without losing the core quality of the product.' },
  { title: 'Functional', desc: 'Design should feel strong visually, but it still has to solve real problems.' },
]

export default function About() {
  useReveal()

  return (
    <div>
      <style>{css}</style>

      <section className="page-section page-hero">
        <div className="page-shell about-grid">
          <div>
            <div className="eyebrow reveal" style={{ transform: 'rotate(-4deg)' }}>About Me</div>
            <h1 className="display-title reveal delay-1" style={{ marginTop: 20 }}>Adaptable, detail-oriented, and focused on strong execution.</h1>
            <p className="body-text muted reveal delay-2" style={{ marginTop: 20, fontWeight: 500 }}>
              I&apos;m Muhammad Risky Januar Lubis, an Information Systems student at Universitas Gunadarma with a strong focus on fullstack web development, software engineering, and backend systems.
            </p>
            <p className="body-text muted reveal delay-3" style={{ marginTop: 14, fontWeight: 500 }}>
              I enjoy building web products that feel visually strong, easy to use, and maintainable as they grow.
            </p>
            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginTop: 26 }} className="reveal delay-4">
              <Link to="/contact" className="brutal-btn" style={{ transform: 'rotate(-2deg)' }}>Get In Touch →</Link>
              <a href="mailto:riskyjanuarlbs01@gmail.com" className="brutal-btn-outline" style={{ transform: 'rotate(2deg)' }}>Send Email</a>
            </div>
          </div>
          <div className="brutal-card photo-card reveal-right">
            <div style={{ border: 'var(--border-width-lg) solid var(--color-ink)', borderRadius: '12px', aspectRatio: '4 / 5', overflow: 'hidden' }}>
              <SafeImage src="/photo/Gemini_Generated_Image_9pq8wq9pq8wq9pq8.png" alt="Risky Januar" loading="lazy" />
            </div>
            <div style={{ marginTop: 20, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <span className="tag yellow" style={{ transform: 'rotate(-4deg)' }}>Fullstack Developer</span>
            </div>
          </div>
        </div>
      </section>

      <section className="page-section">
        <div className="page-shell">
          <div className="eyebrow reveal" style={{ background: 'var(--color-secondary)', transform: 'rotate(4deg)' }}>Background</div>
          <h2 className="section-title reveal delay-1" style={{ marginTop: 20 }}>Education & focus</h2>
          <div className="edu-grid">
            <div className="brutal-card edu-card reveal delay-2">
              <div className="tag blue" style={{ transform: 'rotate(-4deg)' }}>2023 — Present</div>
              <h3 style={{ marginTop: 18, fontFamily: 'var(--font-display)', textTransform: 'uppercase', fontSize: '1.4rem' }}>Bachelor of Information Systems</h3>
              <p className="body-text" style={{ marginTop: 12, fontWeight: 500 }}>Universitas Gunadarma, with a focus on database systems, programming fundamentals, and software engineering.</p>
            </div>
            <div className="brutal-card stack-box reveal delay-3">
              <div className="tag pink" style={{ transform: 'rotate(3deg)' }}>Stack Toolkit</div>
              <div className="stack-list">
                {stack.map((item, index) => <span key={item} className={`tag ${index % 3 === 0 ? 'yellow' : index % 3 === 1 ? 'pink' : 'blue'}`}>{item}</span>)}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="page-section">
        <div className="page-shell">
          <div className="eyebrow reveal" style={{ background: 'var(--color-tertiary)', color: '#fff', transform: 'rotate(-5deg)' }}>Values</div>
          <h2 className="section-title reveal delay-1" style={{ marginTop: 20 }}>How I work</h2>
          <div className="values-grid">
            {values.map((value, index) => (
              <div key={value.title} className={`brutal-card value-card reveal delay-${index + 1}`} style={{ background: index === 0 ? 'var(--color-primary)' : index === 1 ? 'var(--color-secondary)' : 'var(--color-surface)' }}>
                <h3 style={{ fontFamily: 'var(--font-display)', textTransform: 'uppercase', fontSize: '1.4rem' }}>{value.title}</h3>
                <p className="body-text" style={{ marginTop: 12, fontWeight: 600 }}>{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
