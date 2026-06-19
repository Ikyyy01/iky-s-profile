import { useState } from 'react'
import { useReveal } from '../hooks/useReveal'

const css = `
  .contact-page { color: var(--text); }
  .contact-container { max-width: 1200px; margin: 0 auto; padding: 0 24px; }
  .contact-section { padding: 110px 0; }
  .contact-hero { padding-top: 160px; }
  .section-label { display: inline-flex; align-items: center; gap: 10px; font-size: .78rem; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; color: var(--accent); }
  .section-label::before { content: ''; width: 28px; height: 1px; background: currentColor; }
  .display-h { font-family: var(--font-display); font-weight: 800; line-height: .98; letter-spacing: -.05em; color: var(--text); }
  .body-copy { font-size: 1rem; line-height: 1.85; color: var(--text2); }
  .contact-grid { display: grid; grid-template-columns: .92fr 1.08fr; gap: 28px; }
  .panel { background: rgba(255,255,255,.82); border: 1px solid rgba(199,210,224,.9); border-radius: 30px; box-shadow: var(--shadow-sm); padding: 30px; }
  .contact-list { display: grid; gap: 14px; margin-top: 30px; }
  .contact-item { display: flex; gap: 16px; align-items: flex-start; padding: 18px 0; border-bottom: 1px solid var(--border); }
  .contact-item:last-child { border-bottom: none; padding-bottom: 0; }
  .contact-icon { width: 48px; height: 48px; border-radius: 16px; display: flex; align-items: center; justify-content: center; background: var(--bg3); color: var(--accent); font-size: 1.1rem; flex-shrink: 0; }
  .contact-label { font-size: .78rem; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; color: var(--text3); }
  .contact-value { margin-top: 8px; font-size: .98rem; color: var(--text); text-decoration: none; line-height: 1.7; }
  .contact-value:hover { color: var(--accent); }
  .status-box { margin-top: 24px; padding: 22px; border-radius: 22px; background: var(--bg3); }
  .status-badge { display: inline-flex; align-items: center; gap: 8px; padding: 8px 14px; border-radius: 999px; background: rgba(22,163,74,.1); color: var(--green); font-size: .8rem; font-weight: 700; }
  .status-dot { width: 8px; height: 8px; border-radius: 999px; background: var(--green); animation: pulse-dot 2s ease-in-out infinite; }
  .social-row { display: flex; gap: 12px; flex-wrap: wrap; margin-top: 24px; }
  .social-link { display: inline-flex; align-items: center; justify-content: center; min-height: 46px; padding: 0 18px; border-radius: 999px; background: #fff; border: 1px solid var(--border2); color: var(--text); text-decoration: none; font-size: .9rem; font-weight: 700; transition: border-color .2s, color .2s, transform .2s; }
  .social-link:hover { border-color: var(--accent); color: var(--accent); transform: translateY(-2px); }

  .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
  .form-label { display: block; margin-bottom: 8px; font-size: .78rem; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; color: var(--text3); }
  .form-input, .form-textarea, .form-select {
    width: 100%;
    border: 1px solid var(--border2);
    border-radius: 16px;
    background: #fff;
    padding: 15px 16px;
    color: var(--text);
    font-size: .95rem;
    outline: none;
    transition: border-color .2s, box-shadow .2s;
  }
  .form-input:focus, .form-textarea:focus, .form-select:focus { border-color: var(--accent); box-shadow: 0 0 0 4px rgba(37,99,235,.08); }
  .form-input::placeholder, .form-textarea::placeholder { color: var(--text3); }
  .form-textarea { resize: vertical; min-height: 160px; }
  .submit-btn { width: 100%; min-height: 52px; border: none; border-radius: 999px; background: var(--text); color: #fff; font-size: .95rem; font-weight: 700; transition: transform .2s, background .2s; }
  .submit-btn:hover:not(:disabled) { background: var(--accent); transform: translateY(-2px); }
  .submit-btn:disabled { opacity: .75; }
  .fine-print { margin-top: 16px; font-size: .86rem; color: var(--text3); line-height: 1.7; }
  .toast { position: fixed; right: 24px; bottom: 24px; z-index: 9000; padding: 14px 18px; border-radius: 16px; background: #0f172a; color: #fff; box-shadow: var(--shadow-md); transform: translateY(16px); opacity: 0; transition: transform .3s, opacity .3s; pointer-events: none; }
  .toast.show { transform: translateY(0); opacity: 1; }
  .meta-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; margin-top: 28px; }
  .meta-card { padding: 20px; border-radius: 20px; background: rgba(255,255,255,.82); border: 1px solid rgba(199,210,224,.9); box-shadow: var(--shadow-sm); text-align: center; }
  .meta-label { font-size: .78rem; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; color: var(--text3); }
  .meta-value { margin-top: 10px; font-family: var(--font-display); font-size: 1.4rem; font-weight: 800; letter-spacing: -.04em; color: var(--text); }

  @media (max-width: 980px) {
    .contact-grid, .form-grid, .meta-row { grid-template-columns: 1fr; }
  }
  @media (max-width: 640px) {
    .contact-container { padding: 0 16px; }
    .contact-section { padding: 80px 0; }
    .contact-hero { padding-top: 128px; }
    .panel { padding: 22px; }
  }
`

const contacts = [
  { icon: '✉', label: 'Email', value: 'riskyjanuarlbs01@gmail.com', href: 'mailto:riskyjanuarlbs01@gmail.com' },
  { icon: '💻', label: 'GitHub', value: 'github.com/Ikyyy01', href: 'https://github.com/Ikyyy01' },
  { icon: '📍', label: 'Location', value: 'Indonesia · Remote Available', href: null },
  { icon: '⏱', label: 'Response Time', value: 'Usually within 24 hours', href: null },
]

const socials = [
  { label: 'GitHub', href: 'https://github.com/Ikyyy01' },
  { label: 'Email', href: 'mailto:riskyjanuarlbs01@gmail.com' },
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', budget: '', message: '' })
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [toast, setToast] = useState(false)
  useReveal()

  const onChange = event => setForm(current => ({ ...current, [event.target.name]: event.target.value }))

  const onSubmit = event => {
    event.preventDefault()
    setSending(true)
    setTimeout(() => {
      setSending(false)
      setSent(true)
      setToast(true)
      setTimeout(() => {
        setToast(false)
        setSent(false)
        setForm({ name: '', email: '', subject: '', budget: '', message: '' })
      }, 4000)
    }, 1600)
  }

  return (
    <div className="contact-page">
      <style>{css}</style>

      <section className="contact-section contact-hero">
        <div className="contact-container">
          <div className="section-label reveal">Contact</div>
          <h1 className="display-h reveal delay-1" style={{ fontSize: 'clamp(3rem, 7vw, 5.6rem)', marginTop: 18 }}>
            Let's talk about
            <br />
            your next project.
          </h1>
          <p className="body-copy reveal delay-2" style={{ marginTop: 22, maxWidth: 700 }}>
            Whether you have a product idea, a collaboration opportunity, or a role to discuss, I'm open to meaningful conversations.
          </p>
        </div>
      </section>

      <section className="contact-section" style={{ paddingTop: 0 }}>
        <div className="contact-container contact-grid">
          <div className="panel reveal">
            <div className="section-label">Reach out</div>
            <div className="contact-list">
              {contacts.map(contact => (
                <div key={contact.label} className="contact-item">
                  <div className="contact-icon">{contact.icon}</div>
                  <div>
                    <div className="contact-label">{contact.label}</div>
                    {contact.href ? (
                      <a
                        href={contact.href}
                        className="contact-value"
                        target={contact.href.startsWith('http') ? '_blank' : undefined}
                        rel={contact.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      >
                        {contact.value}
                      </a>
                    ) : (
                      <span className="contact-value">{contact.value}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="status-box reveal delay-2">
              <div className="status-badge"><span className="status-dot" />Open to work</div>
              <p className="body-copy" style={{ marginTop: 14 }}>
                Currently available for freelance collaborations and full-time opportunities.
              </p>
            </div>

            <div className="social-row reveal delay-3">
              {socials.map(social => (
                <a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith('http') ? '_blank' : undefined}
                  rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="social-link"
                >
                  {social.label}
                </a>
              ))}
            </div>
          </div>

          <div className="panel reveal delay-1">
            <div className="section-label">Send a message</div>
            <form style={{ display: 'flex', flexDirection: 'column', gap: 18, marginTop: 26 }} onSubmit={onSubmit}>
              <div className="form-grid">
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
                <input className="form-input" type="text" id="subject" name="subject" value={form.subject} onChange={onChange} placeholder="Project inquiry / collaboration" />
              </div>
              <div>
                <label className="form-label" htmlFor="budget">Budget Range</label>
                <select className="form-select" id="budget" name="budget" value={form.budget} onChange={onChange} style={{ color: form.budget ? 'var(--text)' : 'var(--text3)' }}>
                  <option value="" disabled>Select budget range</option>
                  {["< $500", "$500 – $1,000", "$1,000 – $3,000", "$3,000+", "Let's discuss"].map(value => (
                    <option key={value} value={value}>{value}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="form-label" htmlFor="message">Message</label>
                <textarea className="form-textarea" id="message" name="message" value={form.message} onChange={onChange} placeholder="Tell me about your project, goals, and timeline..." required />
              </div>
              <button type="submit" className="submit-btn" disabled={sending}>
                {sending ? 'Sending...' : sent ? 'Message Sent' : 'Send Message'}
              </button>
            </form>
            <p className="fine-print">Your message stays private and is intended only for direct communication.</p>
          </div>
        </div>
      </section>

      <section className="contact-section" style={{ paddingTop: 0 }}>
        <div className="contact-container">
          <div className="section-label reveal">Availability</div>
          <div className="meta-row reveal delay-1">
            {[['Timezone', 'WIB (UTC+7)'], ['Languages', 'ID · EN'], ['Status', 'Available']].map(([label, value]) => (
              <div key={label} className="meta-card">
                <div className="meta-label">{label}</div>
                <div className="meta-value" style={label === 'Status' ? { color: 'var(--green)' } : {}}>{value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className={`toast${toast ? ' show' : ''}`}>Message sent. I'll get back to you soon.</div>
    </div>
  )
}
