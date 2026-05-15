import { Link } from 'react-router-dom'
import { useReveal } from '../hooks/useReveal'
import { useEffect, useRef } from 'react'

const css = `
.about-hero{padding:160px 0 80px;border-bottom:1px solid var(--border)}
.about-hero-grid{max-width:1200px;margin:0 auto;padding:0 40px;display:grid;grid-template-columns:1fr 1fr;gap:80px;align-items:end}
.section-label{font-size:.65rem;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:var(--accent);display:flex;align-items:center;gap:10px}
.section-label::before{content:'';display:block;width:24px;height:1px;background:var(--accent)}
.display-h{font-family:var(--font-display);line-height:.9;letter-spacing:.02em;color:#fff}
.btn-primary{display:inline-flex;align-items:center;gap:8px;padding:13px 28px;background:var(--accent);color:#0a0a08;font-size:.78rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;text-decoration:none;border-radius:var(--radius);transition:background .2s,transform .15s}
.btn-primary:hover{background:var(--accent2);transform:translateY(-2px)}
.btn-outline{display:inline-flex;align-items:center;gap:8px;padding:12px 26px;border:1px solid var(--border2);color:var(--text2);font-size:.78rem;font-weight:600;letter-spacing:.08em;text-transform:uppercase;text-decoration:none;border-radius:var(--radius);transition:border-color .2s,color .2s,transform .15s}
.btn-outline:hover{border-color:var(--accent);color:var(--accent);transform:translateY(-2px)}
.timeline-item{display:grid;grid-template-columns:96px 1fr;gap:24px;padding:28px 0;border-bottom:1px solid var(--border)}
.tl-year{font-family:var(--font-mono);font-size:.72rem;color:var(--accent);padding-top:3px}
.tl-title{font-weight:600;font-size:1rem;color:#fff;margin-bottom:4px}
.tl-sub{font-size:.82rem;color:var(--text2)}
.skill-bar-track{height:2px;background:var(--border);border-radius:2px;overflow:hidden;margin-top:6px}
.skill-bar-fill{height:100%;background:var(--accent);border-radius:2px;transform:scaleX(0);transform-origin:left;transition:transform 1.2s cubic-bezier(.4,0,.2,1)}
.stack-pill{font-family:var(--font-mono);font-size:.72rem;color:var(--text2);padding:6px 14px;background:var(--surface);border:1px solid var(--border2);border-radius:var(--radius);transition:border-color .2s,color .2s;cursor:default}
.stack-pill:hover{border-color:var(--accent);color:var(--accent)}
.value-card{background:var(--bg2);border:1px solid var(--border);border-radius:var(--radius-lg);padding:32px 24px;transition:border-color .25s}
.value-card:hover{border-color:var(--border2)}
.stat-mini{flex:1;background:var(--bg3);border:1px solid var(--border2);border-radius:var(--radius);padding:20px 24px}
.stat-mini-num{font-family:var(--font-display);font-size:2.2rem;color:var(--accent)}
.stat-mini-label{font-size:.68rem;color:var(--text3);letter-spacing:.1em;text-transform:uppercase;margin-top:2px}
.org-item{padding:20px 0;border-bottom:1px solid var(--border);display:grid;grid-template-columns:1fr auto;gap:16px;align-items:start}
.org-role{font-weight:600;font-size:.9rem;color:#fff;margin-bottom:4px}
.org-event{font-size:.82rem;color:var(--text2)}
.org-year{font-family:var(--font-mono);font-size:.68rem;color:var(--accent);padding-top:3px;white-space:nowrap}
@media(max-width:900px){
  .about-hero-grid{grid-template-columns:1fr;gap:40px}
  .exp-edu-grid{grid-template-columns:1fr!important}
  .values-grid{grid-template-columns:1fr 1fr!important}
  .skills-grid-2{grid-template-columns:1fr!important}
}
@media(max-width:600px){
  .about-hero-grid{padding:0 24px}
  .values-grid{grid-template-columns:1fr!important}
}
`

const skills = [
  { group:'Frontend', items:[['React / Vue.js / Next.js','.88'],['HTML5 · CSS3 · Tailwind','.92'],['TypeScript / JavaScript','.85']] },
  { group:'Backend', items:[['Laravel / PHP','.87'],['Node.js / Express.js','.78'],['REST API Development','.85']] },
]

const stack = [
  'HTML5','CSS3','JavaScript','TypeScript','React.js','Vue.js','Next.js','Nuxt.js',
  'Tailwind CSS','Bootstrap','PHP (OOP)','Laravel','Node.js','Express.js',
  'MySQL','Git','GitHub','Figma','Postman','Vercel'
]

const orgExperience = [
  { role:'Head of Event Division', event:'SCAM 2025 — BEM FIKTI', year:'2025' },
  { role:'Head of Equipment Division', event:'SOBER 2025 — BEM FIKTI', year:'2025' },
  { role:'Person in Charge (PIC)', event:'SEHATI 2025 — BEM FIKTI', year:'2025' },
  { role:'Head of Public Relations Division', event:'HEROES XI 2025 — BEM FIKTI', year:'2025' },
  { role:'Public Relations Staff', event:'FIKTI Learning 2025 — BEM FIKTI', year:'2025' },
  { role:'Event Staff', event:'Study Corporation 2025 — BEM FIKTI', year:'2025' },
  { role:'Security Staff', event:'PKKMB BEM FIKTI 2024', year:'2024' },
  { role:'Event Staff', event:'HEROES X 2024 — BEM FIKTI', year:'2024' },
]

function SkillSection() {
  const ref = useRef(null)
  useEffect(() => {
    const bars = ref.current?.querySelectorAll('.skill-bar-fill')
    if (!bars) return
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { const w = e.target.dataset.w; e.target.style.transform = `scaleX(${w})`; obs.unobserve(e.target) } })
    }, { threshold: 0.3 })
    bars.forEach(b => obs.observe(b))
    return () => obs.disconnect()
  }, [])

  return (
    <div ref={ref} style={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:32 }} className="skills-grid-2">
      {skills.map(sg => (
        <div key={sg.group} className="reveal">
          <div style={{ fontSize:'.65rem', fontWeight:700, letterSpacing:'.15em', textTransform:'uppercase', color:'var(--text3)', marginBottom:16 }}>{sg.group}</div>
          {sg.items.map(([name, w]) => (
            <div key={name} style={{ marginBottom:14 }}>
              <div style={{ display:'flex', justifyContent:'space-between', marginBottom:6 }}>
                <span style={{ fontSize:'.82rem', color:'var(--text)' }}>{name}</span>
                <span style={{ fontFamily:'var(--font-mono)', fontSize:'.68rem', color:'var(--text3)' }}>{Math.round(parseFloat(w)*100)}%</span>
              </div>
              <div className="skill-bar-track"><div className="skill-bar-fill" data-w={w} /></div>
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
    <>
      <style>{css}</style>
      <section className="about-hero">
        <div className="about-hero-grid">
          <div>
            <div className="section-label reveal">The person behind the code</div>
            <h1 className="display-h reveal delay-1" style={{ fontSize:'clamp(4rem,9vw,7.5rem)', marginTop:16 }}>
              ABOUT<br/>ME<span style={{ color:'var(--accent)' }}>.</span>
            </h1>
            <p className="reveal delay-2" style={{ color:'var(--text2)', fontSize:'1rem', lineHeight:1.8, maxWidth:480, marginTop:24 }}>
              Hey — I'm <strong style={{ color:'#fff' }}>Muhammad Risky Januar Lubis</strong>, an Information Systems student at Universitas Gunadarma with a strong interest in full-stack web development, software engineering, and backend systems.
            </p>
            <p className="reveal delay-2" style={{ color:'var(--text2)', fontSize:'1rem', lineHeight:1.8, maxWidth:480, marginTop:16 }}>
              Experienced in building web applications using modern technologies including Laravel, Vue.js, React, PHP, JavaScript, and MySQL. Passionate about learning new technologies and contributing to real-world digital solutions.
            </p>
            <div className="reveal delay-3" style={{ marginTop:32, display:'flex', gap:12, flexWrap:'wrap' }}>
              <Link to="/contact" className="btn-primary">Get In Touch →</Link>
              <a href="mailto:riskyjanuarlbs01@gmail.com" className="btn-outline">Email Me</a>
            </div>
          </div>
          <div className="reveal-right">
            <div style={{ display:'grid', gridTemplateColumns:'2fr 1fr', gap:16 }}>
              {['IMG_5199.jpg','Screenshot_20260323_191003_WhatsApp.jpg'].map((img, i) => (
                <div key={i} style={{ height:360, borderRadius:'var(--radius-lg)', overflow:'hidden', border:'1px solid var(--border2)' }}>
                  <img src={`/photo/${img}`} alt="Risky Januar" style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'top', filter:'grayscale(15%)', display:'block' }} />
                </div>
              ))}
            </div>
            <div style={{ marginTop:16, display:'flex', gap:12 }}>
              {[['2+','Projects'],['6+','Tech Stack'],['2023','Started']].map(([n,l]) => (
                <div key={l} className="stat-mini">
                  <div className="stat-mini-num">{n}</div>
                  <div className="stat-mini-label">{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* EDUCATION */}
      <section style={{ padding:'100px 0' }}>
        <div style={{ maxWidth:1200, margin:'0 auto', padding:'0 40px' }}>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:80 }} className="exp-edu-grid">
            <div>
              <div className="section-label reveal">Background</div>
              <h2 className="display-h reveal delay-1" style={{ fontSize:'clamp(2rem,4vw,3.5rem)', marginTop:12, marginBottom:8 }}>EDUCATION</h2>
              <div className="timeline-item reveal delay-1">
                <div className="tl-year">2023 —</div>
                <div>
                  <div className="tl-title">Bachelor of Information Systems</div>
                  <div className="tl-sub">Universitas Gunadarma</div>
                  <div className="tl-sub" style={{ marginTop:8, fontSize:'.78rem', color:'var(--text3)' }}>
                    Relevant: Database Systems · Programming Fundamentals · Information Systems Development · Data Processing · Software Engineering
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="section-label reveal">Languages</div>
              <h2 className="display-h reveal delay-1" style={{ fontSize:'clamp(2rem,4vw,3.5rem)', marginTop:12, marginBottom:8 }}>LANGUAGE</h2>
              {[
                { year:'Native', title:'Indonesian', sub:'Bahasa Indonesia — Mother tongue' },
                { year:'Intermediate', title:'English', sub:'Reading, writing, and communication' },
              ].map((item, i) => (
                <div key={item.title} className={`timeline-item reveal delay-${i+1}`}>
                  <div className="tl-year">{item.year}</div>
                  <div><div className="tl-title">{item.title}</div><div className="tl-sub">{item.sub}</div></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section style={{ padding:'0 0 100px', borderTop:'1px solid var(--border)' }}>
        <div style={{ maxWidth:1200, margin:'0 auto', padding:'100px 40px 0' }}>
          <div className="reveal">
            <div className="section-label">Capabilities</div>
            <h2 className="display-h" style={{ fontSize:'clamp(2.5rem,5vw,4.5rem)', marginTop:12 }}>SKILLS &amp; STACK</h2>
          </div>
          <div style={{ marginTop:48 }}>
            <SkillSection />
          </div>
          <div style={{ display:'flex', flexWrap:'wrap', gap:8, marginTop:32 }} className="reveal delay-2">
            {stack.map(s => <span key={s} className="stack-pill">{s}</span>)}
          </div>
        </div>
      </section>

      {/* ORGANIZATIONAL EXPERIENCE */}
      <section style={{ padding:'0 0 100px' }}>
        <div style={{ maxWidth:1200, margin:'0 auto', padding:'0 40px' }}>
          <div className="reveal">
            <div className="section-label">Student Executive Board</div>
            <h2 className="display-h" style={{ fontSize:'clamp(2.5rem,5vw,4.5rem)', marginTop:12 }}>ORGANIZATIONAL<br/>EXPERIENCE</h2>
            <p style={{ color:'var(--text2)', fontSize:'.9rem', marginTop:12 }}>BEM FIKTI — Universitas Gunadarma</p>
          </div>
          <div style={{ marginTop:40 }}>
            {orgExperience.map((o, i) => (
              <div key={i} className={`org-item reveal delay-${i % 3}`}>
                <div>
                  <div className="org-role">{o.role}</div>
                  <div className="org-event">{o.event}</div>
                </div>
                <div className="org-year">{o.year}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section style={{ padding:'0 0 100px' }}>
        <div style={{ maxWidth:1200, margin:'0 auto', padding:'0 40px' }}>
          <div className="reveal">
            <div className="section-label">What drives me</div>
            <h2 className="display-h" style={{ fontSize:'clamp(2.5rem,5vw,4.5rem)', marginTop:12 }}>MY VALUES</h2>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:24, marginTop:48 }} className="values-grid">
            {[
              { icon:'◈', title:'CRAFT', desc:'Every line of code matters. I build clean, maintainable applications with attention to structure and scalability.' },
              { icon:'✦', title:'LEARNING', desc:'Technology evolves fast. I stay curious, continuously expanding my knowledge of modern web technologies.' },
              { icon:'◎', title:'IMPACT', desc:'I care about building real digital solutions that solve actual problems and create value for users.' },
            ].map((v, i) => (
              <div key={v.title} className={`value-card reveal delay-${i}`}>
                <div style={{ fontSize:'1.5rem', marginBottom:12 }}>{v.icon}</div>
                <div style={{ fontFamily:'var(--font-display)', fontSize:'1.25rem', letterSpacing:'.03em', color:'#fff', marginBottom:8 }}>{v.title}</div>
                <p style={{ fontSize:'.82rem', color:'var(--text2)', lineHeight:1.7 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding:'0 0 100px' }}>
        <div style={{ maxWidth:1200, margin:'0 auto', padding:'0 40px' }}>
          <div className="reveal" style={{ background:'var(--bg3)', border:'1px solid var(--border2)', borderRadius:'var(--radius-lg)', padding:'64px 56px', display:'flex', alignItems:'center', justifyContent:'space-between', gap:32, flexWrap:'wrap' }}>
            <h2 className="display-h" style={{ fontSize:'clamp(2rem,4vw,3.5rem)' }}>
              LET'S WORK<br/>TOGETHER<span style={{ color:'var(--accent)' }}>.</span>
            </h2>
            <Link to="/contact" className="btn-primary">Start a Project →</Link>
          </div>
        </div>
      </section>
    </>
  )
}
