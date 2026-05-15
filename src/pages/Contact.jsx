import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useReveal } from '../hooks/useReveal'

const css = `
.contact-hero{padding:160px 0 80px;border-bottom:1px solid var(--border)}
.section-label{font-size:.65rem;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:var(--accent);display:flex;align-items:center;gap:10px}
.section-label::before{content:'';display:block;width:24px;height:1px;background:var(--accent)}
.display-h{font-family:var(--font-display);line-height:.9;letter-spacing:.02em;color:#fff}
.contact-grid{max-width:1200px;margin:0 auto;padding:80px 40px 0;display:grid;grid-template-columns:1fr 1fr;gap:80px}
.ci-wrap{padding:28px 0;border-bottom:1px solid var(--border);display:flex;align-items:center;gap:20px}
.ci-icon{width:44px;height:44px;border-radius:var(--radius);background:var(--surface);border:1px solid var(--border2);display:flex;align-items:center;justify-content:center;font-size:1.1rem;flex-shrink:0;transition:border-color .2s,background .2s}
.ci-wrap:hover .ci-icon{border-color:var(--accent);background:var(--accent-dim)}
.ci-label{font-size:.62rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--text3);margin-bottom:4px}
.ci-val{font-size:.95rem;color:var(--text);text-decoration:none;transition:color .2s}
.ci-val:hover{color:var(--accent)}
.avail-card{background:var(--bg2);border:1px solid var(--border2);border-radius:var(--radius-lg);padding:28px 24px;margin-top:40px}
.status-badge{display:inline-flex;align-items:center;gap:8px;font-size:.7rem;font-weight:600;letter-spacing:.1em;text-transform:uppercase;color:var(--green);background:rgba(126,207,142,.08);border:1px solid rgba(126,207,142,.2);padding:5px 14px;border-radius:999px}
.status-dot{width:6px;height:6px;border-radius:50%;background:var(--green);flex-shrink:0;animation:pulse-dot 2s ease-in-out infinite}
.social-card{flex:1;min-width:120px;display:flex;align-items:center;gap:12px;background:var(--bg2);border:1px solid var(--border2);border-radius:var(--radius);padding:14px 16px;text-decoration:none;color:var(--text2);font-size:.82rem;transition:border-color .2s,color .2s,transform .2s}
.social-card:hover{border-color:var(--accent);color:var(--accent);transform:translateY(-2px)}
.form-label{font-size:.65rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--text3);display:block;margin-bottom:8px}
.form-input,.form-textarea,.form-select{background:var(--bg2);border:1px solid var(--border2);border-radius:var(--radius);padding:14px 18px;color:var(--text);font-family:var(--font-body);font-size:.9rem;outline:none;transition:border-color .2s,background .2s;width:100%}
.form-input:focus,.form-textarea:focus,.form-select:focus{border-color:var(--accent);background:var(--bg3)}
.form-input::placeholder,.form-textarea::placeholder{color:var(--text3)}
.form-textarea{resize:vertical;min-height:140px}
.form-select{cursor:none}
.submit-btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;padding:14px 32px;background:var(--accent);color:#0a0a08;font-size:.78rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;border:none;border-radius:var(--radius);cursor:none;transition:background .2s,transform .15s;width:100%}
.submit-btn:hover:not(:disabled){background:var(--accent2);transform:translateY(-1px)}
.submit-btn:disabled{opacity:.7}
.toast{position:fixed;bottom:32px;right:32px;z-index:9000;background:var(--bg3);border:1px solid var(--accent);border-radius:var(--radius);padding:14px 24px;font-size:.82rem;color:var(--text);transform:translateY(16px);opacity:0;transition:transform .3s,opacity .3s;pointer-events:none}
.toast.show{transform:translateY(0);opacity:1}
@media(max-width:900px){.contact-grid{grid-template-columns:1fr;gap:48px}}
@media(max-width:600px){.contact-grid{padding:60px 24px 0}.contact-hero{padding-left:24px;padding-right:24px}}
`

const contacts = [
  { icon:'✉', label:'Email', value:'riskyjanuarlbs01@gmail.com', href:'mailto:riskyjanuarlbs01@gmail.com' },
  { icon:'📱', label:'WhatsApp', value:'+62 812 XXXX XXXX', href:'https://wa.me/6281234567890' },
  { icon:'📍', label:'Location', value:'Indonesia · Remote Available', href:null },
  { icon:'⏱', label:'Response Time', value:'Usually within 24 hours', href:null },
]

const socials = [
  { icon:'💻', label:'GitHub' }, { icon:'🔗', label:'LinkedIn' },
  { icon:'🏀', label:'Dribbble' }, { icon:'🐦', label:'Twitter/X' },
]

export default function Contact() {
  const [form, setForm] = useState({ name:'', email:'', subject:'', budget:'', message:'' })
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [toast, setToast] = useState(false)
  useReveal()

  const onChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const onSubmit = e => {
    e.preventDefault()
    setSending(true)
    setTimeout(() => {
      setSending(false); setSent(true); setToast(true)
      setTimeout(() => { setToast(false); setSent(false); setForm({ name:'', email:'', subject:'', budget:'', message:'' }) }, 4000)
    }, 1600)
  }

  return (
    <>
      <style>{css}</style>
      <section className="contact-hero">
        <div style={{ maxWidth:1200, margin:'0 auto', padding:'0 40px' }}>
          <div className="section-label reveal">Don't be a stranger</div>
          <h1 className="display-h reveal delay-1" style={{ fontSize:'clamp(4rem,9vw,7.5rem)', marginTop:16 }}>
            GET IN<br/>TOUCH<span style={{ color:'var(--accent)' }}>.</span>
          </h1>
          <p className="reveal delay-2" style={{ color:'var(--text2)', fontSize:'1rem', maxWidth:520, lineHeight:1.8, marginTop:20 }}>
            Whether you have a project idea, a job offer, or just want to say hi — my inbox is always open.
          </p>
        </div>
      </section>

      <div className="contact-grid">
        {/* LEFT */}
        <div>
          <div className="section-label reveal" style={{ marginBottom:32 }}>Reach out directly</div>
          {contacts.map((c, i) => (
            <div key={c.label} className={`ci-wrap reveal delay-${i}`}>
              <div className="ci-icon">{c.icon}</div>
              <div>
                <div className="ci-label">{c.label}</div>
                {c.href
                  ? <a href={c.href} className="ci-val">{c.value}</a>
                  : <span className="ci-val">{c.value}</span>
                }
              </div>
            </div>
          ))}
          <div className="avail-card reveal delay-4">
            <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:12 }}>
              <div className="status-badge"><span className="status-dot" />Open to work</div>
            </div>
            <p style={{ fontSize:'.85rem', color:'var(--text2)', lineHeight:1.7 }}>
              Currently available for <strong style={{ color:'#fff' }}>freelance projects</strong> and{' '}
              <strong style={{ color:'#fff' }}>full-time positions</strong>. Let's build something great together.
            </p>
          </div>
          <div style={{ display:'flex', flexWrap:'wrap', gap:12, marginTop:32 }} className="reveal">
            {socials.map(s => (
              <a key={s.label} href="#" className="social-card">
                <span>{s.icon}</span>{s.label}
              </a>
            ))}
          </div>
        </div>

        {/* RIGHT — Form */}
        <div className="reveal delay-1">
          <div className="section-label" style={{ marginBottom:32 }}>Send a message</div>
          <form style={{ display:'flex', flexDirection:'column', gap:20 }} onSubmit={onSubmit}>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>
              <div>
                <label className="form-label" htmlFor="name">Name</label>
                <input className="form-input" type="text" id="name" name="name" value={form.name} onChange={onChange} placeholder="Your name" required />
              </div>
              <div>
                <label className="form-label" htmlFor="email">Email</label>
                <input className="form-input" type="email" id="email" name="email" value={form.email} onChange={onChange} placeholder="your@email.com" required />
              </div>
            </div>
            <div>
              <label className="form-label" htmlFor="subject">Subject</label>
              <input className="form-input" type="text" id="subject" name="subject" value={form.subject} onChange={onChange} placeholder="Project Inquiry / Collaboration" />
            </div>
            <div>
              <label className="form-label" htmlFor="budget">Budget Range</label>
              <select className="form-select" id="budget" name="budget" value={form.budget} onChange={onChange} style={{ background:'var(--bg2)', color: form.budget ? 'var(--text)' : 'var(--text3)' }}>
                <option value="" disabled>Select budget range</option>
                {['< $500','$500 – $1,000','$1,000 – $3,000','$3,000+','Let\'s discuss'].map(v => (
                  <option key={v} value={v} style={{ background:'var(--bg2)' }}>{v}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="form-label" htmlFor="message">Message</label>
              <textarea className="form-textarea" id="message" name="message" value={form.message} onChange={onChange} placeholder="Tell me about your project, timeline, and goals..." required />
            </div>
            <button type="submit" className="submit-btn" disabled={sending}>
              {sending ? '⏳ Sending...' : sent ? '✓ Sent!' : 'Send Message →'}
            </button>
          </form>
          <p style={{ fontSize:'.72rem', color:'var(--text3)', marginTop:16, lineHeight:1.6 }}>
            Your message will be sent directly to my email. No spam, no third parties.
          </p>
        </div>
      </div>

      {/* Location section */}
      <section style={{ padding:'80px 0', borderTop:'1px solid var(--border)', marginTop:80 }}>
        <div style={{ maxWidth:1200, margin:'0 auto', padding:'0 40px' }}>
          <div className="reveal" style={{ display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:32 }}>
            <div>
              <div className="section-label" style={{ marginBottom:12 }}>Based in</div>
              <h2 className="display-h" style={{ fontSize:'clamp(2.5rem,5vw,4.5rem)' }}>
                INDONESIA<span style={{ color:'var(--accent)' }}>.</span>
              </h2>
              <p style={{ color:'var(--text2)', fontSize:'.9rem', marginTop:8 }}>Working globally, remotely</p>
            </div>
            <div style={{ display:'flex', gap:16, flexWrap:'wrap' }}>
              {[['TIMEZONE','WIB (UTC+7)','var(--text)'],['LANGUAGES','ID · EN','var(--text)'],['AVAILABLE','NOW','var(--green)']].map(([label, val, color]) => (
                <div key={label} style={{ background:'var(--bg2)', border:'1px solid var(--border2)', borderRadius:'var(--radius)', padding:'20px 28px', textAlign:'center' }}>
                  <div style={{ fontFamily:'var(--font-mono)', fontSize:'.7rem', color:'var(--text3)', marginBottom:4 }}>{label}</div>
                  <div style={{ fontFamily:'var(--font-display)', fontSize:'1.5rem', color }}>{val}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className={`toast${toast?' show':''}`}>✓ Message sent! I'll get back to you soon.</div>
    </>
  )
}
