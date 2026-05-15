import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useReveal } from '../hooks/useReveal'

const css = `
.port-hero{padding:160px 0 80px;border-bottom:1px solid var(--border)}
.section-label{font-size:.65rem;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:var(--accent);display:flex;align-items:center;gap:10px}
.section-label::before{content:'';display:block;width:24px;height:1px;background:var(--accent)}
.display-h{font-family:var(--font-display);line-height:.9;letter-spacing:.02em;color:#fff}
.filter-chip{font-size:.68rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;padding:8px 18px;border:1px solid var(--border2);border-radius:var(--radius);color:var(--text3);background:transparent;cursor:none;transition:all .2s}
.filter-chip:hover{border-color:var(--accent);color:var(--accent)}
.filter-chip.active{background:var(--accent);border-color:var(--accent);color:#0a0a08}
.proj-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:24px}
.proj-card{background:var(--bg2);border:1px solid var(--border);border-radius:var(--radius-lg);overflow:hidden;display:block;text-decoration:none;color:var(--text);transition:border-color .25s,transform .3s cubic-bezier(.34,1.2,.64,1)}
.proj-card:hover{border-color:var(--border2);transform:translateY(-6px)}
.proj-card.featured{grid-column:span 2;display:grid;grid-template-columns:1fr 1fr}
.card-thumb{height:220px;position:relative;overflow:hidden;display:flex;align-items:center;justify-content:center}
.card-thumb-emoji{font-size:4rem;z-index:1;position:relative;transition:transform .4s cubic-bezier(.34,1.56,.64,1)}
.proj-card:hover .card-thumb-emoji{transform:scale(1.2) rotate(-6deg)}
.card-overlay{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;gap:10px;background:rgba(10,10,8,.7);backdrop-filter:blur(6px);opacity:0;z-index:2;transition:opacity .25s}
.proj-card:hover .card-overlay{opacity:1}
.ol-btn{font-size:.68rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;padding:8px 16px;border-radius:var(--radius);text-decoration:none;transition:background .2s;cursor:none}
.ol-primary{background:var(--accent);color:#0a0a08}
.ol-ghost{border:1px solid rgba(255,255,255,.2);color:rgba(255,255,255,.8)}
.card-body{padding:24px 28px 28px}
.card-type{font-size:.62rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--accent);margin-bottom:8px}
.card-title{font-family:var(--font-display);font-size:1.4rem;letter-spacing:.02em;color:#fff;line-height:1.1;margin-bottom:10px}
.card-desc{font-size:.82rem;color:var(--text2);line-height:1.7;margin-bottom:16px}
.card-tags{display:flex;flex-wrap:wrap;gap:6px}
.card-tag{font-family:var(--font-mono);font-size:.65rem;color:var(--text3);padding:3px 9px;background:var(--surface);border:1px solid var(--border2);border-radius:3px}
.btn-outline{display:inline-flex;align-items:center;gap:8px;padding:12px 26px;border:1px solid var(--border2);color:var(--text2);font-size:.78rem;font-weight:600;letter-spacing:.08em;text-transform:uppercase;text-decoration:none;border-radius:var(--radius);transition:border-color .2s,color .2s}
.btn-outline:hover{border-color:var(--accent);color:var(--accent)}
.btn-primary{display:inline-flex;align-items:center;gap:8px;padding:13px 28px;background:var(--accent);color:#0a0a08;font-size:.78rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;text-decoration:none;border-radius:var(--radius);transition:background .2s}
.btn-primary:hover{background:var(--accent2)}
@media(max-width:768px){.proj-grid{grid-template-columns:1fr}.proj-card.featured{grid-column:span 1;display:block}.proj-card.featured .card-thumb{height:200px}}
@media(max-width:600px){.port-hero{padding-left:24px;padding-right:24px}}
`

const projects = [
  { id:1, featured:true, cat:'mobile', type:'Featured · Mobile App', emoji:'🛍️', bg:'linear-gradient(135deg,#1a1a17,#0f1a12)', glow:'rgba(126,207,142,.06)', title:'SHOPEASE\nE-COMMERCE', desc:'A full-featured e-commerce mobile app built with Flutter. Clean navigation, smooth animations, and a checkout experience users actually enjoy.', tags:['Flutter','Firebase','Figma','GetX'] },
  { id:2, cat:'web', type:'Web App', emoji:'📊', bg:'linear-gradient(135deg,#0d1520,#0a0a08)', glow:'rgba(59,130,246,.06)', title:'ANALYTICS\nDASHBOARD', desc:'Real-time analytics dashboard with interactive charts and a clean dark UI.', tags:['React','Next.js','Chart.js'] },
  { id:3, cat:'mobile', type:'Mobile App', emoji:'💪', bg:'linear-gradient(135deg,#130d1a,#0a0a08)', glow:'rgba(168,85,247,.06)', title:'FITNESS\nTRACKER', desc:'Health & workout tracking app with beautiful progress visualization and habit streaks.', tags:['Flutter','SQLite','FL Chart'] },
  { id:4, cat:'design', type:'UI/UX Design', emoji:'🎨', bg:'linear-gradient(135deg,#1a1208,#0a0a08)', glow:'rgba(240,165,0,.06)', title:'BRAND &\nDESIGN SYSTEM', desc:'Comprehensive design system with components, tokens, and usage documentation.', tags:['Figma','Design Tokens','Components'] },
  { id:5, cat:'web', type:'Web · UI/UX', emoji:'🏡', bg:'linear-gradient(135deg,#0d1a18,#0a0a08)', glow:'rgba(6,182,212,.06)', title:'PROPERTY\nLISTING APP', desc:'Modern real estate listing with map integration and advanced filter search.', tags:['Next.js','Mapbox','Figma'] },
  { id:6, cat:'mobile', type:'Mobile App', emoji:'🍔', bg:'linear-gradient(135deg,#1a0d0d,#0a0a08)', glow:'rgba(239,68,68,.05)', title:'FOOD\nDELIVERY UI', desc:'Food ordering app UI with smooth micro-animations and a seamless ordering flow.', tags:['Flutter','Lottie','BLoC'] },
]

const filters = ['all','mobile','web','design']

export default function Portfolio() {
  const [active, setActive] = useState('all')
  useReveal()

  const visible = active === 'all' ? projects : projects.filter(p => p.cat === active)

  return (
    <>
      <style>{css}</style>
      <section className="port-hero">
        <div style={{ maxWidth:1200, margin:'0 auto', padding:'0 40px' }}>
          <div className="section-label reveal">Selected work</div>
          <h1 className="display-h reveal delay-1" style={{ fontSize:'clamp(4rem,9vw,7.5rem)', marginTop:16 }}>
            PORTFOLIO<span style={{ color:'var(--accent)' }}>.</span>
          </h1>
          <p className="reveal delay-2" style={{ color:'var(--text2)', fontSize:'1rem', maxWidth:520, lineHeight:1.8, marginTop:20 }}>
            A collection of projects spanning mobile apps, web interfaces, and UX design — built with care and attention to detail.
          </p>
        </div>
      </section>

      <section style={{ padding:'60px 0 100px' }}>
        <div style={{ maxWidth:1200, margin:'0 auto', padding:'0 40px' }}>
          <div style={{ display:'flex', alignItems:'center', gap:8, flexWrap:'wrap', marginBottom:16 }} className="reveal">
            {filters.map(f => (
              <button key={f} className={`filter-chip${active===f?' active':''}`} onClick={() => setActive(f)}>
                {f === 'all' ? 'All' : f === 'design' ? 'UI/UX Design' : f.charAt(0).toUpperCase()+f.slice(1)}
              </button>
            ))}
          </div>
          <div style={{ fontFamily:'var(--font-mono)', fontSize:'.72rem', color:'var(--text3)', marginBottom:24 }} className="reveal">
            Showing {visible.length} project{visible.length!==1?'s':''}
          </div>
          <div className="proj-grid">
            {visible.map((p, i) => (
              <a key={p.id} href="#" className={`proj-card reveal delay-${i%3}${p.featured && active==='all'?' featured':''}`}>
                <div className="card-thumb" style={{ background:p.bg, ...(p.featured && active==='all' ? { height:'100%', minHeight:280 } : {}) }}>
                  <div style={{ position:'absolute', inset:0, background:`radial-gradient(ellipse at 40% 50%, ${p.glow} 0%, transparent 70%)` }} />
                  <span className="card-thumb-emoji">{p.emoji}</span>
                  <div className="card-overlay">
                    <a href="#" className="ol-btn ol-primary">View Project</a>
                    <a href="#" className="ol-btn ol-ghost">Details</a>
                  </div>
                </div>
                <div className="card-body" style={p.featured && active==='all' ? { display:'flex', flexDirection:'column', justifyContent:'center', padding:'40px 40px' } : {}}>
                  <div className="card-type">{p.type}</div>
                  <div className="card-title" style={p.featured && active==='all' ? { fontSize:'2rem' } : {}}>
                    {p.title.split('\n').map((l,j) => <span key={j}>{l}{j===0&&<br/>}</span>)}
                  </div>
                  <p className="card-desc" style={p.featured && active==='all' ? { maxWidth:400 } : {}}>{p.desc}</p>
                  <div className="card-tags">{p.tags.map(t => <span key={t} className="card-tag">{t}</span>)}</div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding:'0 0 100px' }}>
        <div style={{ maxWidth:1200, margin:'0 auto', padding:'0 40px' }}>
          <div className="reveal" style={{ textAlign:'center', padding:'80px 40px', border:'1px solid var(--border2)', borderRadius:'var(--radius-lg)', background:'var(--bg2)' }}>
            <div className="section-label" style={{ justifyContent:'center', marginBottom:16 }}>Ready to build?</div>
            <h2 className="display-h" style={{ fontSize:'clamp(2.5rem,5vw,4rem)' }}>
              HAVE A PROJECT<span style={{ color:'var(--accent)' }}>?</span>
            </h2>
            <p style={{ color:'var(--text2)', marginTop:16, fontSize:'.95rem', maxWidth:400, margin:'16px auto 0', lineHeight:1.7 }}>
              I'm available for freelance work and full-time opportunities.
            </p>
            <div style={{ marginTop:32, display:'flex', justifyContent:'center', gap:12, flexWrap:'wrap' }}>
              <Link to="/contact" className="btn-primary">Get In Touch →</Link>
              <Link to="/about" className="btn-outline">About Me</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
