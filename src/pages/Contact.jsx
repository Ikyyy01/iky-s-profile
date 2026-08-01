import { useState } from 'react'
import { useReveal } from '../hooks/useReveal'

const css = `
  .contact-grid, .meta-grid { display: grid; gap: 32px; }
  .contact-grid { grid-template-columns: .9fr 1.1fr; }
  .meta-grid { grid-template-columns: repeat(3, 1fr); margin-top: 30px; gap: 20px; }
  .info-card, .form-card, .meta-card { padding: 28px; }
  .info-card { --rotation: -2deg; }
  .form-card { --rotation: 2deg; }
  .meta-card:nth-child(1) { --rotation: 3deg; }
  .meta-card:nth-child(2) { --rotation: -1deg; }
  .meta-card:nth-child(3) { --rotation: 2deg; }
  .contact-list, .social-row { display: grid; gap: 14px; margin-top: 20px; }
  .social-row { display: flex; flex-wrap: wrap; }
  .contact-item { padding: 18px; border: var(--border-width-lg) solid var(--color-ink); border-radius: var(--radius-md); background: var(--color-muted); box-shadow: var(--shadow-sm); }
  .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
  .form-label { display: block; margin-bottom: 10px; font-family: var(--font-mono); font-size: .85rem; font-weight: 800; text-transform: uppercase; }
  .submit-btn { width: 100%; border: none; font-size: 1.1rem; text-transform: uppercase; }
  .field-error { margin-top: 8px; font-size: .85rem; font-weight: 700; color: var(--color-danger); }
  .input-error { border-color: var(--color-danger); box-shadow: 6px 6px 0 var(--color-danger); }
  .form-error, .toast { margin-top: 12px; padding: 16px 20px; border: var(--border-width-lg) solid var(--color-ink); border-radius: var(--radius-md); box-shadow: var(--shadow-md); font-weight: 700; }
  .form-error { background: var(--color-danger); color: #fff; }
  .toast { position: fixed; right: 24px; bottom: 24px; background: var(--color-success); transform: rotate(-2deg); }
  @media (max-width: 980px) { .contact-grid, .form-grid, .meta-grid { grid-template-columns: 1fr; } }
`

const contacts = [
  { label: 'Email', value: 'riskyjanuarlbs01@gmail.com', href: 'mailto:riskyjanuarlbs01@gmail.com' },
  { label: 'GitHub', value: 'github.com/Ikyyy01', href: 'https://github.com/Ikyyy01' },
  { label: 'LinkedIn', value: 'linkedin.com/in/muhammad-risky-januar-lubis-a3b554350', href: 'https://www.linkedin.com/in/muhammad-risky-januar-lubis-a3b554350/' },
  { label: 'Location', value: 'Indonesia', href: null },
  { label: 'Response', value: 'Usually within 24 hours', href: null },
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [sending, setSending] = useState(false)
  const [toast, setToast] = useState(false)
  const [error, setError] = useState('')
  const [touched, setTouched] = useState({ name: false, email: false, subject: false, message: false })
  useReveal()

  const onChange = event => {
    if (error) setError('')
    setForm(current => ({ ...current, [event.target.name]: event.target.value }))
  }

  const onBlur = event => {
    setTouched(current => ({ ...current, [event.target.name]: true }))
  }

  const fieldErrors = {
    name: !form.name.trim() ? 'Name is required.' : '',
    email: !form.email.trim() ? 'Email is required.' : !/^\S+@\S+\.\S+$/.test(form.email) ? 'Enter a valid email address.' : '',
    message: !form.message.trim() ? 'Message is required.' : form.message.trim().length < 10 ? 'Message must be at least 10 characters.' : '',
  }

  const onSubmit = async event => {
    event.preventDefault()
    setTouched({ name: true, email: true, subject: true, message: true })
    if (fieldErrors.name || fieldErrors.email || fieldErrors.message) return
    setSending(true)
    setError('')

    try {
      const response = await fetch('https://formspree.io/f/xdavqpaw', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(form),
      })

      if (!response.ok) throw new Error('Failed to send message')

      setToast(true)
      setForm({ name: '', email: '', subject: '', message: '' })
      setTimeout(() => setToast(false), 4000)
    } catch {
      setError('Failed to send message. Please try again or contact me by email.')
    } finally {
      setSending(false)
    }
  }

  return (
    <div>
      <style>{css}</style>

      <section className="page-section page-hero">
        <div className="page-shell">
          <div className="eyebrow reveal">Contact</div>
          <h1 className="display-title reveal delay-1" style={{ marginTop: 20 }}>Let&apos;s talk about your next project.</h1>
          <p className="body-text muted reveal delay-2" style={{ marginTop: 20 }}>The form and contact blocks are chunky, bordered, and clear to match the visual system.</p>
        </div>
      </section>

      <section className="page-section">
        <div className="page-shell contact-grid">
          <div className="brutal-card info-card reveal">
            <div className="eyebrow" style={{ background: 'var(--color-secondary)' }}>Reach Out</div>
            <div className="contact-list">
              {contacts.map(item => (
                <div key={item.label} className="contact-item">
                  <div className="tag blue">{item.label}</div>
                  <div style={{ marginTop: 10 }}>
                    {item.href ? <a href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined} rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}>{item.value}</a> : <span>{item.value}</span>}
                  </div>
                </div>
              ))}
            </div>
            <div className="social-row">
              <a href="https://github.com/Ikyyy01" target="_blank" rel="noopener noreferrer" className="brutal-btn-outline">GitHub</a>
              <a href="https://www.linkedin.com/in/muhammad-risky-januar-lubis-a3b554350/" target="_blank" rel="noopener noreferrer" className="brutal-btn-outline">LinkedIn</a>
              <a href="mailto:riskyjanuarlbs01@gmail.com" className="brutal-btn">Email</a>
            </div>
          </div>

          <div className="brutal-card form-card reveal delay-1">
            <div className="eyebrow">Send a Message</div>
            <form onSubmit={onSubmit} style={{ display: 'grid', gap: 18, marginTop: 24 }}>
              <div className="form-grid">
                <div>
                  <label className="form-label" htmlFor="name">Name</label>
                  <input className={`brutal-input${touched.name && fieldErrors.name ? ' input-error' : ''}`} type="text" id="name" name="name" value={form.name} onChange={onChange} onBlur={onBlur} required />
                  {touched.name && fieldErrors.name ? <div className="field-error">{fieldErrors.name}</div> : null}
                </div>
                <div>
                  <label className="form-label" htmlFor="email">Email</label>
                  <input className={`brutal-input${touched.email && fieldErrors.email ? ' input-error' : ''}`} type="email" id="email" name="email" value={form.email} onChange={onChange} onBlur={onBlur} required />
                  {touched.email && fieldErrors.email ? <div className="field-error">{fieldErrors.email}</div> : null}
                </div>
              </div>
              <div>
                <label className="form-label" htmlFor="subject">Subject</label>
                <input className="brutal-input" type="text" id="subject" name="subject" value={form.subject} onChange={onChange} />
              </div>
              <div>
                <label className="form-label" htmlFor="message">Message</label>
                <textarea className={`brutal-textarea${touched.message && fieldErrors.message ? ' input-error' : ''}`} id="message" name="message" value={form.message} onChange={onChange} onBlur={onBlur} required />
                {touched.message && fieldErrors.message ? <div className="field-error">{fieldErrors.message}</div> : null}
              </div>
              <button type="submit" className="brutal-btn submit-btn" disabled={sending}>{sending ? 'Sending...' : 'Send Message'}</button>
              {error ? <div className="form-error">{error}</div> : null}
            </form>
          </div>
        </div>
      </section>

      <section className="page-section">
        <div className="page-shell meta-grid reveal">
          {['WIB (UTC+7)', 'ID · EN', 'Open for Projects'].map((value, index) => (
            <div key={value} className="brutal-card meta-card" style={{ background: index === 0 ? 'var(--color-primary)' : index === 1 ? 'var(--color-secondary)' : 'var(--color-surface)' }}>
              <div className="tag blue">{index === 0 ? 'Timezone' : index === 1 ? 'Languages' : 'Status'}</div>
              <div className="section-title" style={{ marginTop: 16, fontSize: '1.5rem' }}>{value}</div>
            </div>
          ))}
        </div>
      </section>

      {toast ? <div className="toast">Message sent. I'll get back to you soon.</div> : null}
    </div>
  )
}
