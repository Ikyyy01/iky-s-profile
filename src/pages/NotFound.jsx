import { Link } from 'react-router-dom'
import { useReveal } from '../hooks/useReveal'

export default function NotFound() {
  useReveal()

  return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="page-shell" style={{ textAlign: 'center' }}>
        <div className="brutal-card reveal" style={{ padding: '48px 24px', background: 'var(--color-primary)', display: 'inline-block', maxWidth: '500px' }}>
          <div className="eyebrow" style={{ background: 'var(--color-secondary)', transform: 'rotate(-6deg)' }}>Error 404</div>
          <h1 className="display-title" style={{ marginTop: 24, fontSize: '4rem' }}>LOST?</h1>
          <p className="body-text" style={{ marginTop: 16, fontWeight: 700 }}>The page you are looking for doesn&apos;t exist or was moved.</p>
          <div style={{ marginTop: 28 }}>
            <Link to="/" className="brutal-btn-outline" style={{ background: 'var(--color-surface)', transform: 'rotate(2deg)' }}>Back to Home</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
