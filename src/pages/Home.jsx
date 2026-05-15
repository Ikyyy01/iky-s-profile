import { Link } from 'react-router-dom'
import { useReveal } from '../hooks/useReveal'

const css = `
.home-hero { min-height:100vh; display:flex; align-items:center; padding-top:80px; position:relative; overflow:hidden; }
.hero-grid { max-width:1200px; margin:0 auto; padding:0 40px; display:grid; grid-template-columns:1fr 1fr; gap:80px; align-items:center; width:100%; }
.hero-bg-num { position:absolute; right:-2%; top:50%; transform:translateY(-50%); font-family:var(--font-display); font-size:min(38vw,480px); color:rgba(240,165,0,.025); line-height:1; user-select:none; pointer-events:none; }
.hero-name { font-family:var(--font-display); font-size:clamp(5rem,11vw,9rem); line-height:.9; letter-spacing:.02em; color:#fff; }
.hero-name .ac { color:var(--accent); }
.status-badge { display:inline-flex; align-items:center; gap:8px; font-size:.7rem; font-weight:600; letter-spacing:.1em; text-transform:uppercase; color:var(--green); background:rgba(126,207,142,.08); border:1px solid rgba(126,207,142,.2); padding:5px 14px; border-radius:999px; }
.status-dot { width:6px; height:6px; border-radius:50%; background:var(--green); flex-shrink:0; animation:pulse-dot 2s ease-in-out infinite; }
.section-label { font-size:.65rem; font-weight:700; letter-spacing:.2em; text-transform:uppercase; color:var(--accent); display:flex; align-items:center; gap:10px; }
.section-label::before { content:''; display:block; width:24px; height:1px; background:var(--accent); }
.btn-primary { display:inline-flex; align-items:center; gap:8px; padding:13px 28px; background:var(--accent); color:#0a0a08; font-size:.78rem; font-weight:700; letter-spacing:.1em; text-transform:uppercase; text-decoration:none; border-radius:var(--radius); transition:background .2s, transform .15s; }
.btn-primary:hover { background:var(--accent2); transform:translateY(-2px); }
.btn-outline { display:inline-flex; align-items:center; gap:8px; padding:12px 26px; border:1px solid var(--border2); color:var(--text2); font-size:.78rem; font-weight:600; letter-spacing:.08em; text-transform:uppercase; text-decoration:none; border-radius:var(--radius); transition:border-color .2s, color .2s, transform .15s; }
.btn-outline:hover { border-color:var(--accent); color:var(--accent); transform:translateY(-2px); }
.hero-stats { display:flex; gap:32px; margin-top:52px; }
.stat-num { font-family:var(--font-display); font-size:2.8rem; color:var(--accent); line-height:1; }
.stat-label { font-size:.68rem; font-weight:600; letter-spacing:.1em; text-transform:uppercase; color:var(--text3); margin-top:4px; }
.stat-div { width:1px; background:var(--border); align-self:stretch; }
.avatar-frame { position:relative; width:340px; height:420px; }
.avatar-bg { position:absolute; top:16px; right:-16px; width:100%; height:100%; border:1px solid var(--border2); border-radius:var(--radius-lg); background:var(--bg3); }
.avatar-main { position:relative; z-index:1; width:100%; height:100%; border-radius:var(--radius-lg); overflow:hidden; border:1px solid var(--border2); }
.avatar-main img { width:100%; height:100%; object-fit:cover; object-position:top center; filter:grayscale(20%); display:block; }
.avatar-overlay { position:absolute; inset:0; background:linear-gradient(to top,rgba(10,10,8,.8) 0%,transparent 50%); border-radius:var(--radius-lg); z-index:2; }
.badge-float { position:absolute; z-index:3; background:var(--surface); border:1px solid var(--border2); border-radius:var(--radius); padding:8px 14px; font-size:.72rem; font-weight:600; letter-spacing:.06em; color:var(--text); white-space:nowrap; }
.badge-tl { top:-14px; left:-24px; animation:float-y 4s ease-in-out infinite; }
.badge-br { bottom:24px; left:-32px; animation:float-y 4.5s ease-in-out infinite reverse; }
.badge-ac { color:var(--accent); }
.services-section { padding:100px 0; }
.services-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:1px; border:1px solid var(--border); border-radius:var(--radius-lg); overflow:hidden; margin-top:60px; }
.svc-card { background:var(--bg2); padding:40px 32px; position:relative; transition:background .25s; }
.svc-card:hover { background:var(--bg3); }
.svc-card+.svc-card { border-left:1px solid var(--border); }
.svc-num { font-family:var(--font-display); font-size:1rem; letter-spacing:.1em; color:var(--text3); margin-bottom:24px; }
.svc-icon { font-size:2rem; margin-bottom:16px; display:block; }
.svc-title { font-family:var(--font-display); font-size:1.6rem; letter-spacing:.03em; color:#fff; margin-bottom:12px; }
.svc-desc { font-size:.875rem; color:var(--text2); line-height:1.7; }
.svc-tags { display:flex; flex-wrap:wrap; gap:6px; margin-top:20px; }
.tag { font-size:.65rem; font-weight:600; letter-spacing:.08em; text-transform:uppercase; padding:4px 10px; border-radius:999px; border:1px solid var(--border2); color:var(--text3); }
.works-section { padding:80px 0 100px; }
.works-header { display:flex; align-items:flex-end; justify-content:space-between; margin-bottom:48px; }
.work-item { display:grid; grid-template-columns:72px 1fr auto; align-items:center; gap:32px; padding:28px 0; border-bottom:1px solid var(--border); text-decoration:none; color:var(--text); position:relative; transition:padding-left .25s; }
.work-item::before { content:''; position:absolute; left:0; top:0; bottom:0; width:0; background:var(--accent-dim); transition:width .3s; }
.work-item:hover::before { width:100%; }
.work-item:hover { padding-left:16px; }
.work-num { font-family:var(--font-mono); font-size:.7rem; color:var(--text3); }
.work-title { font-family:var(--font-display); font-size:1.4rem; letter-spacing:.02em; color:#fff; transition:color .2s; }
.work-item:hover .work-title { color:var(--accent); }
.work-meta { font-size:.72rem; color:var(--text3); margin-top:4px; }
.work-type { font-size:.68rem; font-weight:600; letter-spacing:.1em; text-transform:uppercase; color:var(--text3); white-space:nowrap; }
.work-arrow { font-size:1.2rem; color:var(--text3); transition:transform .2s, color .2s; }
.work-item:hover .work-arrow { transform:translate(4px,-4px); color:var(--accent); }
.cta-banner { padding:0 0 100px; }
.cta-inner { background:var(--bg3); border:1px solid var(--border2); border-radius:var(--radius-lg); padding:64px 56px; display:flex; align-items:center; justify-content:space-between; gap:40px; flex-wrap:wrap; position:relative; overflow:hidden; }
.cta-glow { position:absolute; top:-80px; left:-80px; width:300px; height:300px; border-radius:50%; background:radial-gradient(circle,rgba(240,165,0,.08) 0%,transparent 70%); pointer-events:none; }
@media(max-width:900px){
  .hero-grid{grid-template-columns:1fr;gap:48px}
  .avatar-frame{width:280px;height:340px}
  .hero-bg-num{display:none}
  .services-grid{grid-template-columns:1fr}
  .svc-card+.svc-card{border-left:none;border-top:1px solid var(--border)}
  .works-header{flex-direction:column;align-items:flex-start;gap:24px}
  .cta-inner{padding:40px 32px}
}
@media(max-width:600px){
  .hero-grid{padding:0 24px}
  .work-item{grid-template-columns:48px 1fr}
  .work-type{display:none}
  .hero-stats{gap:20px}
}
`

const works = [
  { num:'001', title:'Catering Family Jakarta', meta:'Laravel · Vue.js · REST API · MySQL', type:'Fullstack Web' },
  { num:'002', title:'Undercover Party Game', meta:'React · TypeScript · JavaScript', type:'Web App' },
]

export default function Home() {
  useReveal()
  return (
    <>
      <style>{css}</style>

      {/* HERO */}
      <section className="home-hero">
        <div className="hero-bg-num">01</div>
        <div className="hero-grid">
          <div>
            <div className="reveal" style={{ marginBottom:24 }}>
              <div className="status-badge"><span className="status-dot" />Available for work</div>
            </div>
            <h1 className="hero-name reveal delay-1">RISKY<br />JANUAR<span className="ac">.</span></h1>
            <p className="reveal delay-2" style={{ fontSize:'clamp(1rem,2vw,1.25rem)', color:'var(--text2)', fontWeight:300, marginTop:20, lineHeight:1.6 }}>
              Fullstack Web Developer
            </p>
            <p className="reveal delay-2" style={{ fontSize:'.95rem', color:'var(--text2)', lineHeight:1.8, marginTop:16, maxWidth:440 }}>
              Information Systems student with a passion for building full-stack web applications — from pixel-perfect frontends to robust backend systems.
            </p>
            <div className="reveal delay-3" style={{ display:'flex', alignItems:'center', gap:16, marginTop:40, flexWrap:'wrap' }}>
              <Link to="/portfolio" className="btn-primary">View Work <span>→</span></Link>
              <Link to="/contact" className="btn-outline">Let's Talk</Link>
            </div>
            <div className="hero-stats reveal delay-4">
              {[['2+','Projects'],['6+','Tech Stack'],['2023','Gunadarma']].map(([n,l], i) => (
                <div key={l} style={{ display:'flex', gap:32, alignItems:'center' }}>
                  {i > 0 && <div className="stat-div" />}
                  <div>
                    <div className="stat-num">{n}</div>
                    <div className="stat-label">{l}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Avatar */}
          <div style={{ display:'flex', flexDirection:'column', alignItems:'flex-end' }}>
            <div className="avatar-frame reveal-right">
              <div className="avatar-bg" />
              <div className="avatar-main">
                <img src="/photo/IMG_5199.jpg" alt="Risky Januar" />
                <div className="avatar-overlay" />
              </div>
              <div className="badge-float badge-tl">⚡ <span className="badge-ac">Laravel</span> Backend</div>
              <div className="badge-float badge-br">🌐 Fullstack <span className="badge-ac">Dev</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="services-section">
        <div style={{ maxWidth:1200, margin:'0 auto', padding:'0 40px' }}>
          <div className="reveal">
            <div className="section-label">What I do</div>
            <h2 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(3rem,6vw,5rem)', lineHeight:.95, color:'#fff', marginTop:16 }}>SERVICES</h2>
          </div>
          <div className="services-grid reveal delay-1">
            {[
              { n:'01', icon:'🖥️', title:'FRONTEND\nDEVELOPMENT', desc:'Responsive, accessible web interfaces using React, Vue.js, Next.js, Nuxt.js, and Tailwind CSS. Clean code, great user experience.', tags:['React','Vue.js','Next.js','Tailwind CSS'] },
              { n:'02', icon:'⚙️', title:'BACKEND\nDEVELOPMENT', desc:'Robust server-side solutions with Laravel and Node.js. REST API development, authentication, CRUD systems, and database design.', tags:['Laravel','Node.js','PHP','Express.js'] },
              { n:'03', icon:'🗄️', title:'DATABASE &\nSYSTEM DESIGN', desc:'Database design, SQL query optimization, and full system analysis. Building scalable and maintainable data architectures.', tags:['MySQL','REST API','System Analysis'] },
            ].map(c => (
              <div key={c.n} className="svc-card">
                <div className="svc-num">{c.n}</div>
                <span className="svc-icon">{c.icon}</span>
                <div className="svc-title">{c.title.split('\n').map((l,i) => <span key={i}>{l}{i===0&&<br/>}</span>)}</div>
                <p className="svc-desc">{c.desc}</p>
                <div className="svc-tags">{c.tags.map(t => <span key={t} className="tag">{t}</span>)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SELECTED WORKS */}
      <section className="works-section">
        <div style={{ maxWidth:1200, margin:'0 auto', padding:'0 40px' }}>
          <div className="works-header reveal">
            <div>
              <div className="section-label">Portfolio</div>
              <h2 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(3rem,6vw,5rem)', lineHeight:.95, color:'#fff', marginTop:16 }}>SELECTED<br/>WORKS</h2>
            </div>
            <Link to="/portfolio" className="btn-outline" style={{ alignSelf:'flex-end' }}>All Projects →</Link>
          </div>
          <div>
            {works.map((w, i) => (
              <Link to="/portfolio" key={w.num} className={`work-item reveal delay-${i}`}>
                <span className="work-num">{w.num}</span>
                <div>
                  <div className="work-title">{w.title}</div>
                  <div className="work-meta">{w.meta}</div>
                </div>
                <span className="work-type">{w.type}</span>
                <span className="work-arrow">↗</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-banner">
        <div style={{ maxWidth:1200, margin:'0 auto', padding:'0 40px' }}>
          <div className="cta-inner reveal">
            <div className="cta-glow" />
            <div>
              <div className="section-label">Let's build something</div>
              <h2 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(2.5rem,5vw,4.5rem)', lineHeight:.95, color:'#fff', marginTop:12 }}>
                GOT A PROJECT<br/>IN MIND<span style={{ color:'var(--accent)' }}>?</span>
              </h2>
            </div>
            <div style={{ display:'flex', flexDirection:'column', gap:16, alignItems:'flex-start' }}>
              <p style={{ color:'var(--text2)', fontSize:'.95rem', maxWidth:300, lineHeight:1.7 }}>
                Let's collaborate and turn your ideas into something remarkable.
              </p>
              <Link to="/contact" className="btn-primary">Start a Conversation →</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
