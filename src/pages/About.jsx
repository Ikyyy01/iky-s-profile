import { Link } from 'react-router-dom'
import { useReveal } from '../hooks/useReveal'
import { useEffect, useRef } from 'react'

const css = `
  .about-page { color: var(--text); }
  .about-container { max-width: 1200px; margin: 0 auto; padding: 0 24px; }
  .about-section { padding: 110px 0; }
  .about-hero { padding-top: 160px; }
  .about-grid { display: grid; grid-template-columns: 1.05fr .95fr; gap: 34px; align-items: start; }
  .section-label { display: inline-flex; align-items: center; gap: 10px; font-size: .78rem; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; color: var(--accent); }
  .section-label::before { content: ''; width: 28px; height: 1px; background: currentColor; }
  .display-h { font-family: var(--font-display); font-weight: 800; line-height: .98; letter-spacing: -.05em; color: var(--text); }
  .body-copy { font-size: 1rem; line-height: 1.85; color: var(--text2); }
  .btn-row { display: flex; flex-wrap: wrap; gap: 14px; margin-top: 32px; }
  .btn-primary, .btn-outline { display: inline-flex; align-items: center; justify-content: center; min-height: 50px; padding: 0 22px; border-radius: 999px; text-decoration: none; font-size: .95rem; font-weight: 700; transition: transform .2s, background .2s, border-color .2s, color .2s; }
  .btn-primary { background: var(--text); color: #fff; }
  .btn-primary:hover { background: var(--accent); transform: translateY(-2px); }
  .btn-outline { background: rgba(255,255,255,.7); border: 1px solid var(--border2); color: var(--text); }
  .btn-outline:hover { border-color: var(--accent); color: var(--accent); transform: translateY(-2px); }

  .panel, .value-card, .org-item, .timeline-item, .stat-mini { background: rgba(255,255,255,.8); border: 1px solid rgba(199,210,224,.9); box-shadow: var(--shadow-sm); }
  .panel { border-radius: 30px; padding: 28px; }
  .photo-grid { display: grid; grid-template-columns: 1.3fr .7fr; gap: 16px; }
  .photo-card { height: 360px; border-radius: 22px; overflow: hidden; background: var(--bg3); }
  .photo-card img { width: 100%; height: 100%; object-fit: cover; object-position: top; }
  .stats-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; margin-top: 16px; }
  .stat-mini { border-radius: 18px; padding: 20px; }
  .stat-mini-num { font-family: var(--font-display); font-size: 1.8rem; font-weight: 800; letter-spacing: -.04em; color: var(--text); }
  .stat-mini-label { margin-top: 6px; font-size: .82rem; color: var(--text3); }

  .two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
  .timeline-item { border-radius: 22px; padding: 24px; display: grid; grid-template-columns: 110px 1fr; gap: 18px; margin-top: 18px; }
  .tl-year { font-size: .78rem; font-weight: 700; color: var(--accent); letter-spacing: .04em; }
  .tl-title { font-size: 1.06rem; font-weight: 700; color: var(--text); }
  .tl-sub { margin-top: 6px; font-size: .92rem; color: var(--text2); line-height: 1.75; }

  .skills-grid-2 { display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px; margin-top: 40px; }
  .skill-box { padding: 24px; border-radius: 24px; background: rgba(255,255,255,.8); border: 1px solid rgba(199,210,224,.9); box-shadow: var(--shadow-sm); }
  .skill-group { font-size: .78rem; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; color: var(--accent); margin-bottom: 20px; }
  .skill-bar-track { height: 8px; background: #e2e8f0; border-radius: 999px; overflow: hidden; margin-top: 8px; }
  .skill-bar-fill { height: 100%; background: linear-gradient(90deg, var(--accent) 0%, var(--accent2) 100%); border-radius: 999px; transform: scaleX(0); transform-origin: left; transition: transform 1.2s cubic-bezier(.4,0,.2,1); }
  .stack-list { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 26px; }
  .stack-pill { font-size: .85rem; font-weight: 600; color: var(--text2); padding: 10px 14px; background: rgba(255,255,255,.75); border: 1px solid rgba(199,210,224,.9); border-radius: 999px; }

  .org-list { margin-top: 36px; display: grid; gap: 16px; }
  .org-item { border-radius: 22px; padding: 22px 24px; display: grid; grid-template-columns: 1fr auto; gap: 16px; align-items: center; }
  .org-role { font-size: 1rem; font-weight: 700; color: var(--text); }
  .org-event { margin-top: 6px; font-size: .92rem; color: var(--text2); }
  .org-year { font-size: .82rem; font-weight: 700; color: var(--accent); }

  .values-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 22px; margin-top: 40px; }
  .value-card { border-radius: 26px; padding: 28px; }
  .value-icon { font-size: 1.4rem; color: var(--accent); }
  .value-title { margin-top: 14px; font-family: var(--font-display); font-size: 1.25rem; font-weight: 800; letter-spacing: -.03em; }
  .value-desc { margin-top: 12px; font-size: .95rem; line-height: 1.8; color: var(--text2); }

  .cta-panel { border-radius: 32px; padding: 48px; background: linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%); color: #fff; display: flex; align-items: center; justify-content: space-between; gap: 24px; flex-wrap: wrap; box-shadow: var(--shadow-md); }
  .cta-panel .display-h { color: #fff; }

  @media (max-width: 980px) {
    .about-grid, .two-col, .skills-grid-2, .values-grid, .stats-row, .photo-grid { grid-template-columns: 1fr; }
    .timeline-item, .org-item { grid-template-columns: 1fr; }
  }
  @media (max-width: 640px) {
    .about-container { padding: 0 16px; }
    .about-section { padding: 80px 0; }
    .about-hero { padding-top: 128px; }
    .panel, .value-card, .cta-panel { padding: 22px; }
  }
`

const skills = [
  { group: 'Frontend', items: [['React / Vue.js / Next.js', '.88'], ['HTML5 · CSS3 · Tailwind', '.92'], ['TypeScript / JavaScript', '.85']] },
  { group: 'Backend', items: [['Laravel / PHP', '.87'], ['Node.js / Express.js', '.78'], ['REST API Development', '.85']] },
]

const stack = [
  'HTML5', 'CSS3', 'JavaScript', 'TypeScript', 'React.js', 'Vue.js', 'Next.js', 'Nuxt.js',
  'Tailwind CSS', 'Bootstrap', 'PHP (OOP)', 'Laravel', 'Node.js', 'Express.js',
  'MySQL', 'Git', 'GitHub', 'Figma', 'Postman', 'Vercel',
]

const orgExperience = [
  { role: 'Head of Event Division', event: 'SCAM 2025 — BEM FIKTI', year: '2025' },
  { role: 'Head of Equipment Division', event: 'SOBER 2025 — BEM FIKTI', year: '2025' },
  { role: 'Person in Charge (PIC)', event: 'SEHATI 2025 — BEM FIKTI', year: '2025' },
  { role: 'Head of Public Relations Division', event: 'HEROES XI 2025 — BEM FIKTI', year: '2025' },
  { role: 'Public Relations Staff', event: 'FIKTI Learning 2025 — BEM FIKTI', year: '2025' },
  { role: 'Event Staff', event: 'Study Corporation 2025 — BEM FIKTI', year: '2025' },
  { role: 'Security Staff', event: 'PKKMB BEM FIKTI 2024', year: '2024' },
  { role: 'Event Staff', event: 'HEROES X 2024 — BEM FIKTI', year: '2024' },
]

function SkillSection() {
  const ref = useRef(null)

  useEffect(() => {
    const bars = ref.current?.querySelectorAll('.skill-bar-fill')
    if (!bars) return
    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const width = entry.target.dataset.w
          entry.target.style.transform = `scaleX(${width})`
          obs.unobserve(entry.target)
        }
      })
    }, { threshold: 0.3 })
    bars.forEach(bar => obs.observe(bar))
    return () => obs.disconnect()
  }, [])

  return (
    <div ref={ref} className="skills-grid-2">
      {skills.map(group => (
        <div key={group.group} className="skill-box reveal">
          <div className="skill-group">{group.group}</div>
          {group.items.map(([name, width]) => (
            <div key={name} style={{ marginBottom: 18 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, marginBottom: 6 }}>
                <span style={{ fontSize: '.92rem', color: 'var(--text)' }}>{name}</span>
                <span style={{ fontSize: '.82rem', color: 'var(--text3)' }}>{Math.round(parseFloat(width) * 100)}%</span>
              </div>
              <div className="skill-bar-track"><div className="skill-bar-fill" data-w={width} /></div>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

export default function About() {
  useReveal()

  return (
    <div className="about-page">
      <style>{css}</style>

      <section className="about-section about-hero">
        <div className="about-container about-grid">
          <div>
            <div className="section-label reveal">About</div>
            <h1 className="display-h reveal delay-1" style={{ fontSize: 'clamp(3rem, 7vw, 5.6rem)', marginTop: 18 }}>
              Professional, adaptable,
              <br />
              and focused on quality.
            </h1>
            <p className="body-copy reveal delay-2" style={{ marginTop: 24, maxWidth: 620 }}>
              I'm Muhammad Risky Januar Lubis, an Information Systems student at Universitas Gunadarma with a strong focus on fullstack web development, software engineering, and backend systems.
            </p>
            <p className="body-copy reveal delay-2" style={{ marginTop: 16, maxWidth: 620 }}>
              I enjoy building web products that look refined, feel intuitive, and remain maintainable as they grow. My toolkit includes Laravel, React, Vue.js, JavaScript, PHP, and MySQL.
            </p>
            <div className="btn-row reveal delay-3">
              <Link to="/contact" className="btn-primary">Get In Touch</Link>
              <a href="mailto:riskyjanuarlbs01@gmail.com" className="btn-outline">Send Email</a>
            </div>
          </div>

          <div className="panel reveal-right">
            <div className="photo-grid">
              {['Gemini_Generated_Image_9pq8wq9pq8wq9pq8.png'].map(img => (
                <div key={img} className="photo-card">
                  <img src={`/photo/${img}`} alt="Risky Januar" />
                </div>
              ))}
            </div>
            <div className="stats-row">
              {[['2+', 'Projects'], ['6+', 'Core Stack'], ['2023', 'Started']].map(([value, label]) => (
                <div key={label} className="stat-mini">
                  <div className="stat-mini-num">{value}</div>
                  <div className="stat-mini-label">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="about-section" style={{ paddingTop: 0 }}>
        <div className="about-container two-col">
          <div className="reveal">
            <div className="section-label">Education</div>
            <h2 className="display-h" style={{ fontSize: 'clamp(2.2rem, 5vw, 4rem)', marginTop: 16 }}>Academic background</h2>
            <div className="timeline-item">
              <div className="tl-year">2023 — Present</div>
              <div>
                <div className="tl-title">Bachelor of Information Systems</div>
                <div className="tl-sub">Universitas Gunadarma</div>
                <div className="tl-sub">Relevant focus: Database Systems, Programming Fundamentals, Information Systems Development, Data Processing, and Software Engineering.</div>
              </div>
            </div>
          </div>

          <div className="reveal delay-1">
            <div className="section-label">Languages</div>
            <h2 className="display-h" style={{ fontSize: 'clamp(2.2rem, 5vw, 4rem)', marginTop: 16 }}>Communication</h2>
            {[
              { year: 'Native', title: 'Indonesian', sub: 'Bahasa Indonesia — Mother tongue' },
              { year: 'Intermediate', title: 'English', sub: 'Reading, writing, and communication' },
            ].map(item => (
              <div key={item.title} className="timeline-item">
                <div className="tl-year">{item.year}</div>
                <div>
                  <div className="tl-title">{item.title}</div>
                  <div className="tl-sub">{item.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="about-section" style={{ paddingTop: 0 }}>
        <div className="about-container">
          <div className="reveal">
            <div className="section-label">Skills</div>
            <h2 className="display-h" style={{ fontSize: 'clamp(2.2rem, 5vw, 4rem)', marginTop: 16 }}>Capabilities & stack</h2>
          </div>
          <SkillSection />
          <div className="stack-list reveal delay-2">
            {stack.map(item => <span key={item} className="stack-pill">{item}</span>)}
          </div>
        </div>
      </section>

      <section className="about-section" style={{ paddingTop: 0 }}>
        <div className="about-container">
          <div className="reveal">
            <div className="section-label">Experience</div>
            <h2 className="display-h" style={{ fontSize: 'clamp(2.2rem, 5vw, 4rem)', marginTop: 16 }}>Organizational roles</h2>
            <p className="body-copy" style={{ marginTop: 18, maxWidth: 620 }}>Student Executive Board experience at BEM FIKTI, Universitas Gunadarma.</p>
          </div>
          <div className="org-list">
            {orgExperience.map((item, index) => (
              <div key={`${item.role}-${index}`} className={`org-item reveal delay-${index % 3}`}>
                <div>
                  <div className="org-role">{item.role}</div>
                  <div className="org-event">{item.event}</div>
                </div>
                <div className="org-year">{item.year}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="about-section" style={{ paddingTop: 0 }}>
        <div className="about-container">
          <div className="reveal">
            <div className="section-label">Values</div>
            <h2 className="display-h" style={{ fontSize: 'clamp(2.2rem, 5vw, 4rem)', marginTop: 16 }}>How I approach my work</h2>
          </div>
          <div className="values-grid">
            {[
              { icon: '01', title: 'Craft', desc: 'I value clear structure, thoughtful details, and maintainable code that supports product growth.' },
              { icon: '02', title: 'Learning', desc: 'I stay adaptable, continuously improving my technical understanding and design sensitivity.' },
              { icon: '03', title: 'Impact', desc: 'I aim to create practical digital solutions that solve real needs and elevate the user experience.' },
            ].map((value, index) => (
              <div key={value.title} className={`value-card reveal delay-${index}`}>
                <div className="value-icon">{value.icon}</div>
                <div className="value-title">{value.title}</div>
                <p className="value-desc">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="about-section" style={{ paddingTop: 0 }}>
        <div className="about-container">
          <div className="cta-panel reveal">
            <div>
              <div className="section-label" style={{ color: 'rgba(255,255,255,.72)' }}>Collaboration</div>
              <h2 className="display-h" style={{ fontSize: 'clamp(2rem, 4vw, 3.4rem)', marginTop: 16 }}>Let's build something strong together.</h2>
            </div>
            <Link to="/contact" className="btn-primary">Start a Project</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
