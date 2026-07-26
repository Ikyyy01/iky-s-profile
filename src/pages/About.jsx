import { Link } from 'react-router-dom'
import { useReveal } from '../hooks/useReveal'
import { useEffect, useRef } from 'react'

const TechLogos = {
  HTML5: () => <svg viewBox="0 0 24 24" fill="#E34C26" xmlns="http://www.w3.org/2000/svg"><path d="M3 2h18l-2.7 15.3L12 22l-8.3-4.7L3 2z"/><path fill="#fff" d="M12 19.9v-3.8h5.9l-.4 2.3-5.5 1.5z"/><path fill="#f0db4f" d="M12 12.4h3.3l.3-1.8H12V8.8h6.1l-.1.6-.9 5.1h-5.1v-1.8z"/></svg>,
  CSS3: () => <svg viewBox="0 0 24 24" fill="#264BDD" xmlns="http://www.w3.org/2000/svg"><path d="M3 2h18l-2.7 15.3L12 22l-8.3-4.7L3 2z"/><path fill="#fff" d="M12 19.9v-3.8h5.9l-.4 2.3-5.5 1.5z"/></svg>,
  JavaScript: () => <svg viewBox="0 0 24 24" fill="#F7DF1E" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" rx="2" fill="#F7DF1E"/><path d="M6 6h4v12H6V6zm8 0h4v12h-4V6z" fill="#000"/></svg>,
  TypeScript: () => <svg viewBox="0 0 24 24" fill="#3178C6" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" rx="2" fill="#3178C6"/><path d="M4 4h16v16H4V4z" fill="#3178C6"/><text x="12" y="18" fill="white" fontSize="14" fontWeight="bold" textAnchor="middle">TS</text></svg>,
  React: () => <svg viewBox="0 0 24 24" fill="#61DAFB" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="2" fill="#61DAFB"/><ellipse cx="12" cy="12" rx="8" ry="3" fill="none" stroke="#61DAFB" strokeWidth="1.5" transform="rotate(0)"/><ellipse cx="12" cy="12" rx="8" ry="3" fill="none" stroke="#61DAFB" strokeWidth="1.5" transform="rotate(60)"/><ellipse cx="12" cy="12" rx="8" ry="3" fill="none" stroke="#61DAFB" strokeWidth="1.5" transform="rotate(120)"/></svg>,
  Vue: () => <svg viewBox="0 0 24 24" fill="#4FC08D" xmlns="http://www.w3.org/2000/svg"><polygon points="12,2 2,7 2,17 12,22 22,17 22,7" fill="#4FC08D"/><polygon points="12,9 7,14 9,17 12,15 15,17 17,14" fill="#fff"/></svg>,
  Next: () => <svg viewBox="0 0 24 24" fill="#000" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10" fill="#000"/><text x="12" y="15" fill="white" fontSize="12" fontWeight="bold" textAnchor="middle">N</text></svg>,
  Nuxt: () => <svg viewBox="0 0 24 24" fill="#00C58E" xmlns="http://www.w3.org/2000/svg"><polygon points="12,2 4,20 20,20" fill="#00C58E"/></svg>,
  Tailwind: () => <svg viewBox="0 0 24 24" fill="#06B6D4" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10" fill="#06B6D4"/><circle cx="8" cy="8" r="3" fill="#fff"/><circle cx="16" cy="16" r="3" fill="#fff" opacity="0.5"/></svg>,
  Bootstrap: () => <svg viewBox="0 0 24 24" fill="#7952B3" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" rx="2" fill="#7952B3"/><text x="12" y="16" fill="white" fontSize="12" fontWeight="bold" textAnchor="middle">B</text></svg>,
  PHP: () => <svg viewBox="0 0 24 24" fill="#777BB4" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10" fill="#777BB4"/><text x="12" y="15" fill="white" fontSize="12" fontWeight="bold" textAnchor="middle">P</text></svg>,
  Laravel: () => <svg viewBox="0 0 24 24" fill="#FF2D20" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L2 8v8l10 6 10-6V8L12 2z" fill="#FF2D20"/><path d="M12 10L6 13v4l6 3 6-3v-4l-6-3z" fill="#fff"/></svg>,
  Node: () => <svg viewBox="0 0 24 24" fill="#68A063" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L2 7v10l10 5 10-5V7L12 2z" fill="#68A063"/><text x="12" y="15" fill="white" fontSize="11" fontWeight="bold" textAnchor="middle">N</text></svg>,
  Express: () => <svg viewBox="0 0 24 24" fill="#000" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10" fill="#000"/><text x="12" y="15" fill="white" fontSize="12" fontWeight="bold" textAnchor="middle">E</text></svg>,
  MySQL: () => <svg viewBox="0 0 24 24" fill="#00758F" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10-4.5-10-10-10z" fill="#00758F"/><text x="12" y="15" fill="white" fontSize="11" fontWeight="bold" textAnchor="middle">SQL</text></svg>,
  Git: () => <svg viewBox="0 0 24 24" fill="#F1502F" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10-4.5-10-10-10z" fill="#F1502F"/></svg>,
  GitHub: () => <svg viewBox="0 0 24 24" fill="#181717" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.5 2 2 6.5 2 12c0 4.4 2.9 8.2 6.8 9.5.5.1.7-.2.7-.5v-1.7c-2.7.6-3.3-1.3-3.3-1.3-.4-1.1-1.1-1.4-1.1-1.4-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.3 1.1 2.9.8 0-.6.3-1.1.7-1.4-2.4-.3-4.9-1.2-4.9-5.3 0-1.2.4-2.1 1-2.9-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.7 1 .8-.2 1.6-.3 2.4-.3s1.6.1 2.4.3c1.9-1.3 2.7-1 2.7-1 .5 1.4.2 2.4.1 2.7.6.8 1 1.7 1 2.9 0 4.1-2.5 5-4.9 5.3.4.3.7 1 .7 2v2.8c0 .3.2.6.7.5 3.9-1.3 6.8-5.1 6.8-9.5 0-5.5-4.5-10-10-10z" fill="#181717"/></svg>,
  Figma: () => <svg viewBox="0 0 24 24" fill="#F24E1E" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10" fill="#F24E1E"/><text x="12" y="15" fill="white" fontSize="12" fontWeight="bold" textAnchor="middle">F</text></svg>,
  Postman: () => <svg viewBox="0 0 24 24" fill="#FF6C37" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" rx="4" fill="#FF6C37"/><text x="12" y="16" fill="white" fontSize="11" fontWeight="bold" textAnchor="middle">PM</text></svg>,
  Vercel: () => <svg viewBox="0 0 24 24" fill="#000" xmlns="http://www.w3.org/2000/svg"><polygon points="12,2 2,22 22,22" fill="#000"/><polygon points="12,8 7,18 17,18" fill="white" opacity="0.8"/></svg>,
}

const stackWithIcons = [
  { name: 'HTML5', icon: 'HTML5' },
  { name: 'CSS3', icon: 'CSS3' },
  { name: 'JavaScript', icon: 'JavaScript' },
  { name: 'TypeScript', icon: 'TypeScript' },
  { name: 'React.js', icon: 'React' },
  { name: 'Vue.js', icon: 'Vue' },
  { name: 'Next.js', icon: 'Next' },
  { name: 'Nuxt.js', icon: 'Nuxt' },
  { name: 'Tailwind CSS', icon: 'Tailwind' },
  { name: 'Bootstrap', icon: 'Bootstrap' },
  { name: 'PHP (OOP)', icon: 'PHP' },
  { name: 'Laravel', icon: 'Laravel' },
  { name: 'Node.js', icon: 'Node' },
  { name: 'Express.js', icon: 'Express' },
  { name: 'MySQL', icon: 'MySQL' },
  { name: 'Git', icon: 'Git' },
  { name: 'GitHub', icon: 'GitHub' },
  { name: 'Figma', icon: 'Figma' },
  { name: 'Postman', icon: 'Postman' },
  { name: 'Vercel', icon: 'Vercel' },
]

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
  [data-theme="dark"] .btn-primary { background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%); }
  .btn-outline { background: rgba(255,255,255,.7); border: 1px solid var(--border2); color: var(--text); }
  .btn-outline:hover { border-color: var(--accent); color: var(--accent); transform: translateY(-2px); }
  [data-theme="dark"] .btn-outline { background: rgba(255,255,255,.06); border-color: rgba(255,255,255,.1); }

  .panel, .value-card, .org-item, .timeline-item, .stat-mini { background: rgba(255,255,255,.8); border: 1px solid rgba(199,210,224,.9); box-shadow: var(--shadow-sm); }
  [data-theme="dark"] .panel, [data-theme="dark"] .value-card, [data-theme="dark"] .org-item, [data-theme="dark"] .timeline-item, [data-theme="dark"] .stat-mini { background: rgba(255,255,255,.05); border-color: rgba(255,255,255,.08); }
  .panel { border-radius: 30px; padding: 28px; }
  .photo-wrap { position: relative; border-radius: 22px; overflow: hidden; }
  .photo-main { width: 100%; height: 420px; object-fit: cover; object-position: top; display: block; }
  .photo-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, transparent 40%, rgba(7,10,20,.78) 100%);
  }
  .photo-badge {
    position: absolute;
    bottom: 18px;
    left: 18px;
    right: 18px;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 12px;
  }
  .photo-badge-info { color: #fff; }
  .photo-badge-role { font-size: .72rem; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; opacity: .7; }
  .photo-badge-name { margin-top: 4px; font-family: var(--font-display); font-size: 1.3rem; font-weight: 800; letter-spacing: -.03em; }
  .photo-badge-status {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    padding: 8px 14px;
    border-radius: 999px;
    background: rgba(255,255,255,.14);
    border: 1px solid rgba(255,255,255,.2);
    backdrop-filter: blur(12px);
    color: #fff;
    font-size: .78rem;
    font-weight: 700;
    white-space: nowrap;
  }
  .stats-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; margin-top: 16px; }
  .stat-mini { border-radius: 18px; padding: 20px; transition: transform .2s; }
  .stat-mini:hover { transform: translateY(-2px); }
  .stat-mini-num { font-family: var(--font-display); font-size: 1.8rem; font-weight: 800; letter-spacing: -.04em; color: var(--text); }
  .stat-mini-label { margin-top: 6px; font-size: .82rem; color: var(--text3); line-height: 1.4; }

  .two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
  .timeline-item { border-radius: 22px; padding: 24px; display: grid; grid-template-columns: 110px 1fr; gap: 18px; margin-top: 18px; }
  .tl-year { font-size: .78rem; font-weight: 700; color: var(--accent); letter-spacing: .04em; }
  .tl-title { font-size: 1.06rem; font-weight: 700; color: var(--text); }
  .tl-sub { margin-top: 6px; font-size: .92rem; color: var(--text2); line-height: 1.75; }

  .skills-grid-2 { display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px; margin-top: 40px; }
  .skill-box { padding: 24px; border-radius: 24px; background: rgba(255,255,255,.8); border: 1px solid rgba(199,210,224,.9); box-shadow: var(--shadow-sm); }
  [data-theme="dark"] .skill-box { background: rgba(255,255,255,.05); border-color: rgba(255,255,255,.08); }
  .skill-group { font-size: .78rem; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; color: var(--accent); margin-bottom: 20px; }
  .skill-bar-track { height: 8px; background: #e2e8f0; border-radius: 999px; overflow: hidden; margin-top: 8px; }
  [data-theme="dark"] .skill-bar-track { background: rgba(255,255,255,.1); }
  .skill-bar-fill { height: 100%; background: linear-gradient(90deg, var(--accent) 0%, var(--accent2) 100%); border-radius: 999px; transform: scaleX(0); transform-origin: left; transition: transform 1.2s cubic-bezier(.4,0,.2,1); }
  .stack-list { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 26px; }
  .stack-pill { display: inline-flex; align-items: center; gap: 8px; font-size: .85rem; font-weight: 600; color: var(--text2); padding: 10px 14px; background: rgba(255,255,255,.75); border: 1px solid rgba(199,210,224,.9); border-radius: 999px; transition: all .2s; }
  .stack-pill:hover { transform: translateY(-2px); background: rgba(255,255,255,.9); }
  .stack-icon { width: 18px; height: 18px; display: inline-flex; align-items: center; justify-content: center; flex-shrink: 0; }
  .stack-icon svg { width: 100%; height: 100%; }
  [data-theme="dark"] .stack-pill { background: rgba(255,255,255,.06); border-color: rgba(255,255,255,.1); }
  [data-theme="dark"] .stack-pill:hover { background: rgba(255,255,255,.1); }

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
  [data-theme="dark"] .cta-panel { background: linear-gradient(135deg, #0b1120 0%, #172554 60%, #312e81 100%); }
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
            {stackWithIcons.map(item => {
              const IconComponent = TechLogos[item.icon]
              return (
                <span key={item.name} className="stack-pill">
                  {IconComponent && <div className="stack-icon"><IconComponent /></div>}
                  {item.name}
                </span>
              )
            })}
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
