import { useState, useEffect } from 'react'

const styles = `
  .scroll-top-btn {
    position: fixed;
    right: 24px;
    bottom: 24px;
    z-index: 600;
    width: 56px;
    height: 56px;
    border: var(--border-width-lg) solid var(--color-ink);
    border-radius: var(--radius-md);
    background: var(--color-primary);
    box-shadow: var(--shadow-lg);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    font-weight: 800;
    transform: rotate(-3deg);
    transition: transform 100ms ease-out, box-shadow 100ms ease-out, opacity 200ms ease-out;
    opacity: 0;
    pointer-events: none;
  }
  .scroll-top-btn.visible {
    opacity: 1;
    pointer-events: auto;
  }
  .scroll-top-btn:hover {
    transform: translate(-4px, -4px) rotate(-3deg);
    box-shadow: var(--shadow-lg);
  }
  .scroll-top-btn:active {
    transform: translate(4px, 4px) rotate(-3deg);
    box-shadow: none;
  }
  @media (max-width: 768px) {
    .scroll-top-btn {
      right: 16px;
      bottom: 16px;
      width: 48px;
      height: 48px;
    }
  }
`

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 500)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <style>{styles}</style>
      <button 
        className={`scroll-top-btn${visible ? ' visible' : ''}`}
        onClick={scrollToTop}
        aria-label="Scroll to top"
        title="Back to top"
      >
        ↑
      </button>
    </>
  )
}
