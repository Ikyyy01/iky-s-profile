import { Link } from 'react-router-dom'
import { useReveal } from '../hooks/useReveal'
import { useState, useRef } from 'react'
import MagneticButton from '../components/MagneticButton'

const css = `
  .home-page { color: var(--text); position: relative; overflow: hidden; --mx: 0px; --my: 0px; }
  .home-page::before,
  .home-page::after {
    content: '';
    position: fixed;
    inset: auto;
    pointer-events: none;
    z-index: 0;
    filter: blur(80px);
    opacity: .6;
    transition: opacity .4s ease;
  }
  .home-page::before { width: 28rem; height: 28rem; top: 7rem; left: -8rem; background: rgba(96,165,250,.18); }
  .home-page::after { width: 24rem; height: 24rem; top: 22rem; right: -6rem; background: rgba(168,85,247,.14); }
  
  [data-theme="dark"] .home-page::before { background: rgba(96,165,250,.08); opacity: .4; }
  [data-theme="dark"] .home-page::after { background: rgba(168,85,247,.06); opacity: .3; }
  .home-container { max-width: 1240px; margin: 0 auto; padding: 0 24px; position: relative; z-index: 1; }
  .home-section { padding: 110px 0; }
  .home-label { display: inline-flex; align-items: center; gap: 10px; font-size: .78rem; font-weight: 700; letter-spacing: .16em; text-transform: uppercase; color: var(--accent); }
  .home-label::before { content: ''; width: 32px; height: 1px; background: currentColor; }
  .home-title { font-family: var(--font-display); font-size: clamp(2.8rem, 7vw, 6.2rem); line-height: .95; letter-spacing: -.06em; color: var(--text); }
  .home-copy { font-size: 1rem; line-height: 1.85; color: var(--text2); }
  .home-copy-lg { font-size: 1.08rem; line-height: 1.9; color: var(--text2); }
  .home-actions { display: flex; flex-wrap: wrap; gap: 14px; margin-top: 34px; }
  .home-btn-primary, .home-btn-secondary {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    min-height: 52px;
    padding: 0 22px;
    border-radius: 999px;
    text-decoration: none;
    font-size: .95rem;
    font-weight: 700;
    transition: transform .25s, background .25s, border-color .25s, color .25s, box-shadow .25s;
  }
  .home-btn-primary { background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%); color: #fff; box-shadow: 0 16px 40px rgba(37,99,235,.28); }
  .home-btn-primary:hover { transform: translateY(-2px) scale(1.01); box-shadow: 0 20px 44px rgba(37,99,235,.34); }
  [data-theme="dark"] .home-btn-primary { box-shadow: 0 16px 40px rgba(96,165,250,.18); }
  [data-theme="dark"] .home-btn-primary:hover { box-shadow: 0 20px 44px rgba(96,165,250,.24); }
  .home-btn-secondary { background: rgba(255,255,255,.58); color: var(--text); border: 1px solid rgba(148,163,184,.22); backdrop-filter: blur(12px); }
  .home-btn-secondary:hover { border-color: rgba(37,99,235,.28); color: var(--accent); transform: translateY(-2px); }
  
  [data-theme="dark"] .home-btn-secondary {
    background: rgba(255,255,255,.06);
    border-color: rgba(255,255,255,.12);
    color: var(--text);
  }
  [data-theme="dark"] .home-btn-secondary:hover {
    border-color: rgba(96,165,250,.4);
    color: var(--accent);
  }

  .hero { min-height: auto; display: flex; align-items: center; padding: 140px 0 120px; }
  .hero-grid { display: grid; grid-template-columns: minmax(0, 1.1fr) minmax(360px, .9fr); gap: 64px; align-items: flex-start; }
  .hero-badge {
    display: inline-flex;
    align-items: center;
    gap: 12px;
    padding: 12px 18px;
    border-radius: 999px;
    background: rgba(255,255,255,.6);
    border: 1px solid rgba(255,255,255,.7);
    box-shadow: 0 12px 32px rgba(15,23,42,.08);
    color: var(--text2);
    font-size: .88rem;
    backdrop-filter: blur(14px);
    transition: all .3s;
  }
  
  [data-theme="dark"] .hero-badge {
    background: rgba(255,255,255,.06);
    border-color: rgba(255,255,255,.1);
    color: var(--text2);
    box-shadow: 0 12px 32px rgba(0,0,0,.2);
  }
  .hero-badge-dot { width: 8px; height: 8px; border-radius: 999px; background: var(--green); animation: pulse-dot 2s ease-in-out infinite; }
  .hero-heading { margin-top: 24px; max-width: 760px; }
  .hero-title-line { display: block; overflow: hidden; }
  .hero-word {
    display: inline-block;
    opacity: 0;
    transform: translateY(1.2em) scale(.96);
    animation: hero-word-in .7s cubic-bezier(.22,1,.36,1) forwards;
    will-change: transform, opacity;
  }
  .hero-word + .hero-word { margin-left: .24em; }
  .hero-heading .accent { background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%); -webkit-background-clip: text; background-clip: text; color: transparent; }
  .hero-heading.reveal.visible .hero-word { opacity: 1; }
  .hero-subtitle { margin-top: 24px; max-width: 640px; }
  .hero-strip {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 14px;
    margin-top: 34px;
    max-width: 760px;
  }
  .hero-chip {
    padding: 16px 18px;
    border-radius: 18px;
    background: rgba(255,255,255,.56);
    border: 1px solid rgba(255,255,255,.7);
    backdrop-filter: blur(14px);
    box-shadow: 0 12px 36px rgba(15,23,42,.06);
    transition: all .3s;
  }
  
  [data-theme="dark"] .hero-chip {
    background: rgba(255,255,255,.04);
    border-color: rgba(255,255,255,.08);
    box-shadow: 0 12px 36px rgba(0,0,0,.2);
  }
  
  .hero-chip-title { font-size: .78rem; letter-spacing: .08em; text-transform: uppercase; color: var(--text3); }
  .hero-chip-value { margin-top: 8px; font-size: 1rem; font-weight: 700; color: var(--text); }
  
  .hero-meta { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-top: 40px; }
  .hero-stat {
    position: relative;
    overflow: hidden;
    padding: 24px;
    background: linear-gradient(180deg, rgba(255,255,255,.78), rgba(255,255,255,.58));
    border: 1px solid rgba(255,255,255,.7);
    border-radius: 24px;
    box-shadow: 0 18px 44px rgba(15,23,42,.08);
    backdrop-filter: blur(14px);
    transition: all .3s;
  }
  
  [data-theme="dark"] .hero-stat {
    background: linear-gradient(180deg, rgba(255,255,255,.08), rgba(255,255,255,.04));
    border-color: rgba(255,255,255,.08);
    box-shadow: 0 18px 44px rgba(0,0,0,.24);
  }
  .hero-stat::before {
    content: '';
    position: absolute;
    inset: 0 auto auto 0;
    width: 100%;
    height: 1px;
    background: linear-gradient(90deg, rgba(37,99,235,.5), rgba(124,58,237,.18), transparent);
  }
  .hero-stat-value { font-family: var(--font-display); font-size: 2rem; font-weight: 800; letter-spacing: -.04em; color: var(--text); }
  .hero-stat-label { margin-top: 6px; font-size: .85rem; line-height: 1.65; color: var(--text3); }

   .visual-stage { position: relative; display: flex; justify-content: center; align-items: flex-start; padding-top: 40px; }
  .floating-blob {
    position: absolute;
    border-radius: 50%;
    pointer-events: none;
    z-index: 0;
    opacity: 0.6;
    filter: blur(60px);
    animation: blob-move 12s ease-in-out infinite;
    will-change: transform;
  }
  .floating-blob.blob-1 {
    width: 280px;
    height: 280px;
    background: rgba(96, 165, 250, 0.15);
    top: -100px;
    left: -80px;
    transform: translate(calc(var(--mx) * 0.08), calc(var(--my) * 0.08));
    animation-delay: 0s;
  }
  .floating-blob.blob-2 {
    width: 320px;
    height: 320px;
    background: rgba(168, 85, 247, 0.12);
    bottom: -120px;
    right: -60px;
    transform: translate(calc(var(--mx) * -0.06), calc(var(--my) * -0.06));
    animation-delay: -4s;
  }
  [data-theme="dark"] .floating-blob.blob-1 { background: rgba(96, 165, 250, 0.08); }
  [data-theme="dark"] .floating-blob.blob-2 { background: rgba(168, 85, 247, 0.06); }
  .lanyard-wrap { position: relative; width: min(420px, 100%); padding-top: 44px; z-index: 2; }
  .lanyard-rope {
    position: absolute;
    top: 0;
    left: 50%;
    width: 190px;
    height: 120px;
    transform: translateX(-50%);
    border: 2px solid rgba(148,163,184,.5);
    border-bottom: none;
    border-radius: 999px 999px 0 0;
    opacity: .9;
  }
  [data-theme="dark"] .lanyard-rope { border-color: rgba(255,255,255,.16); }
  .lanyard-rope::before,
  .lanyard-rope::after {
    content: '';
    position: absolute;
    bottom: -16px;
    width: 2px;
    height: 66px;
    background: linear-gradient(180deg, rgba(148,163,184,.8), rgba(148,163,184,.2));
  }
  [data-theme="dark"] .lanyard-rope::before,
  [data-theme="dark"] .lanyard-rope::after {
    background: linear-gradient(180deg, rgba(255,255,255,.24), rgba(255,255,255,.06));
  }
  .lanyard-rope::before { left: 16px; }
  .lanyard-rope::after { right: 16px; }
  .lanyard-clip {
    position: absolute;
    left: 50%;
    top: 106px;
    width: 72px;
    height: 18px;
    border-radius: 999px;
    background: linear-gradient(180deg, #e2e8f0, #94a3b8);
    transform: translateX(-50%);
    box-shadow: 0 8px 18px rgba(15,23,42,.18);
    z-index: 3;
  }
  [data-theme="dark"] .lanyard-clip { background: linear-gradient(180deg, #1e293b, #0f172a); }
  .lanyard-card {
    position: relative;
    padding: 18px;
    border-radius: 34px;
    background: linear-gradient(180deg, rgba(255,255,255,.82), rgba(255,255,255,.54));
    border: 1px solid rgba(255,255,255,.8);
    box-shadow: 0 30px 90px rgba(15,23,42,.18);
    backdrop-filter: blur(16px);
    transform-origin: top center;
    user-select: none;
  }
  .lanyard-card:not(.dragging) {
    animation: swing-card 7s ease-in-out infinite;
  }
  
  [data-theme="dark"] .lanyard-card {
    background: linear-gradient(180deg, rgba(20,24,82,.82), rgba(20,24,82,.64));
    border-color: rgba(255,255,255,.12);
    box-shadow: 0 30px 90px rgba(0,0,0,.36);
  }
  .lanyard-card::before {
    content: '';
    position: absolute;
    inset: 10px;
    border-radius: 26px;
    border: 1px solid rgba(255,255,255,.55);
    pointer-events: none;
  }
  [data-theme="dark"] .lanyard-card::before { border-color: rgba(255,255,255,.08); }
  .lanyard-topbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    margin-bottom: 16px;
    padding: 6px 6px 0;
  }
  .lanyard-brand { font-size: .78rem; letter-spacing: .18em; text-transform: uppercase; color: var(--text3); }
  .lanyard-status { display: inline-flex; align-items: center; gap: 8px; padding: 8px 12px; border-radius: 999px; background: rgba(15,23,42,.06); color: var(--text2); font-size: .78rem; font-weight: 700; }
  [data-theme="dark"] .lanyard-status { background: rgba(255,255,255,.08); color: var(--text2); }
  .lanyard-image-wrap {
    position: relative;
    border-radius: 26px;
    overflow: hidden;
    background: radial-gradient(circle at top, rgba(191,219,254,.9), rgba(224,231,255,.45) 52%, rgba(255,255,255,.16));
    min-height: 540px;
  }
  [data-theme="dark"] .lanyard-image-wrap { background: radial-gradient(circle at top, rgba(96,165,250,.24), rgba(20,24,82,.45) 52%, rgba(20,24,82,.12)); }
  .lanyard-image-wrap::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, rgba(255,255,255,.2), transparent 20%, transparent 70%, rgba(15,23,42,.12));
    pointer-events: none;
  }
  .lanyard-image-wrap img { width: 100%; height: 100%; aspect-ratio: 4 / 5; object-fit: cover; object-position: top center; }
  .lanyard-id {
    position: absolute;
    left: 18px;
    right: 18px;
    bottom: 18px;
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 14px;
    align-items: end;
    padding: 18px;
    border-radius: 22px;
    background: rgba(7,10,20,.66);
    border: 1px solid rgba(255,255,255,.08);
    backdrop-filter: blur(16px);
    color: #fff;
  }
  .lanyard-role { font-size: .78rem; letter-spacing: .1em; text-transform: uppercase; color: rgba(255,255,255,.58); }
  .lanyard-name { margin-top: 8px; font-family: var(--font-display); font-size: 1.5rem; font-weight: 800; letter-spacing: -.04em; }
  .lanyard-focus { margin-top: 6px; font-size: .92rem; color: rgba(255,255,255,.78); }
  .lanyard-scan { width: 66px; height: 66px; border-radius: 18px; background: linear-gradient(135deg, rgba(37,99,235,.34), rgba(124,58,237,.26)); border: 1px solid rgba(255,255,255,.12); position: relative; overflow: hidden; }
  .lanyard-scan::before { content: ''; position: absolute; inset: 8px; border: 1px solid rgba(255,255,255,.55); border-radius: 12px; }
  .lanyard-scan::after { content: ''; position: absolute; inset: 10px 24px; background: linear-gradient(180deg, transparent, rgba(255,255,255,.88), transparent); animation: scan-sweep-y 2.6s linear infinite; }

  .service-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 22px; margin-top: 42px; }
  .service-card {
    padding: 30px;
    border-radius: 28px;
    background: linear-gradient(180deg, rgba(255,255,255,.8), rgba(255,255,255,.56));
    border: 1px solid rgba(255,255,255,.72);
    box-shadow: 0 18px 48px rgba(15,23,42,.08);
    transition: transform .25s, box-shadow .25s, border-color .25s;
    backdrop-filter: blur(14px);
  }
  .service-card:hover { transform: translateY(-6px); box-shadow: 0 26px 64px rgba(15,23,42,.12); border-color: rgba(37,99,235,.24); }
  
  [data-theme="dark"] .service-card {
    background: linear-gradient(180deg, rgba(255,255,255,.06), rgba(255,255,255,.03));
    border-color: rgba(255,255,255,.08);
    box-shadow: 0 18px 48px rgba(0,0,0,.24);
  }
  [data-theme="dark"] .service-card:hover {
    box-shadow: 0 26px 64px rgba(0,0,0,.32);
    border-color: rgba(96,165,250,.24);
  }
  .service-eyebrow { font-size: .78rem; font-weight: 700; color: var(--accent); letter-spacing: .08em; text-transform: uppercase; }
  .service-title { margin-top: 14px; font-family: var(--font-display); font-size: 1.45rem; font-weight: 800; letter-spacing: -.03em; }
  .service-desc { margin-top: 12px; font-size: .96rem; line-height: 1.8; color: var(--text2); }
  .tag-row { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 22px; }
  .tag { padding: 8px 12px; border-radius: 999px; background: rgba(37,99,235,.08); color: var(--text2); font-size: .82rem; font-weight: 600; }
  
  [data-theme="dark"] .tag { background: rgba(96,165,250,.1); }

  .works-panel {
    padding: 34px;
    background: linear-gradient(180deg, rgba(255,255,255,.8), rgba(255,255,255,.56));
    border: 1px solid rgba(255,255,255,.72);
    border-radius: 32px;
    box-shadow: 0 18px 48px rgba(15,23,42,.08);
    margin-top: 42px;
    backdrop-filter: blur(16px);
    transition: all .3s;
  }
  
  [data-theme="dark"] .works-panel {
    background: linear-gradient(180deg, rgba(255,255,255,.06), rgba(255,255,255,.03));
    border-color: rgba(255,255,255,.08);
    box-shadow: 0 18px 48px rgba(0,0,0,.24);
  }
  [data-theme="dark"] .work-item:hover { color: #fff; }
  .work-item {
    display: grid;
    grid-template-columns: 72px minmax(0, 1fr) auto;
    gap: 18px;
    align-items: center;
    padding: 22px 0;
    border-top: 1px solid rgba(148,163,184,.18);
    text-decoration: none;
    color: inherit;
    transition: transform .22s;
  }
  
  [data-theme="dark"] .work-item {
    border-top-color: rgba(255,255,255,.08);
  }
  .work-item:first-child { border-top: none; padding-top: 0; }
  .work-item:hover { transform: translateX(6px); }
  .work-index { font-size: .84rem; font-weight: 700; color: var(--text3); }
  .work-title { font-family: var(--font-display); font-size: 1.4rem; font-weight: 800; letter-spacing: -.03em; }
  .work-meta { margin-top: 6px; font-size: .92rem; color: var(--text2); }
  .work-type { padding: 10px 14px; background: rgba(37,99,235,.08); border-radius: 999px; font-size: .8rem; font-weight: 700; color: var(--text2); }
  
  [data-theme="dark"] .work-type { background: rgba(96,165,250,.1); }

  .cta-card {
    position: relative;
    overflow: hidden;
    padding: 56px;
    border-radius: 36px;
    background: linear-gradient(135deg, #020617 0%, #172554 50%, #4c1d95 100%);
    color: #fff;
    box-shadow: 0 26px 70px rgba(15,23,42,.24);
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 28px;
    flex-wrap: wrap;
  }
  .cta-card::before { content: ''; position: absolute; inset: -20% auto auto -10%; width: 300px; height: 300px; border-radius: 999px; background: rgba(96,165,250,.22); filter: blur(40px); }
  .cta-card::after { content: ''; position: absolute; right: -40px; bottom: -60px; width: 240px; height: 240px; border-radius: 999px; background: rgba(168,85,247,.22); filter: blur(44px); }
  .cta-card > * { position: relative; z-index: 1; }
  .cta-card .home-title { color: #fff; font-size: clamp(2.2rem, 4vw, 3.8rem); }
  .cta-card .home-copy { color: rgba(255,255,255,.76); max-width: 520px; }
  .cta-card .home-btn-primary { background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%); color: #fff; box-shadow: 0 16px 40px rgba(37,99,235,.28); }
  .cta-card .home-btn-primary:hover { color: #fff; transform: translateY(-2px) scale(1.01); box-shadow: 0 20px 44px rgba(37,99,235,.34); }
  [data-theme="dark"] .cta-card .home-btn-primary { box-shadow: 0 16px 40px rgba(96,165,250,.2); }
  [data-theme="dark"] .cta-card .home-btn-primary:hover { box-shadow: 0 20px 44px rgba(96,165,250,.28); }
  .cta-card .home-btn-secondary { background: rgba(255,255,255,.08); border-color: rgba(255,255,255,.18); color: #fff; }
  .cta-card .home-btn-secondary:hover { border-color: rgba(255,255,255,.4); color: #fff; background: rgba(255,255,255,.12); }

  @keyframes swing-card {
    0%, 100% { transform: rotate(-2deg) translateY(0); }
    50% { transform: rotate(2deg) translateY(10px); }
  }
  @keyframes hero-word-in {
    from { opacity: 0; transform: translateY(1.2em) scale(.96); filter: blur(8px); }
    to { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
  }
  @keyframes scan-sweep-y {
    0% { transform: translateY(-140%); }
    100% { transform: translateY(220%); }
  }

  @media (max-width: 1080px) {
    .hero-grid, .service-grid { grid-template-columns: 1fr; }
    .visual-stage { min-height: auto; padding-top: 24px; }
    .floating-card.top { right: 0; }
    .floating-card.left { left: 0; bottom: 14%; }
  }
  @media (max-width: 980px) {
    .hero-meta, .hero-strip { grid-template-columns: 1fr; }
    .work-item { grid-template-columns: 1fr; }
    .work-type { width: fit-content; }
  }
  @media (max-width: 640px) {
    .home-container { padding: 0 16px; }
    .home-section { padding: 80px 0; }
    .hero { min-height: auto; padding: 120px 0 48px; }
    .service-card, .works-panel, .cta-card, .hero-stat { padding: 22px; }
    .floating-card { position: static; margin-top: 14px; }
    .visual-stage { display: block; }
    .ambient-grid, .ambient-orb { display: none; }
    .lanyard-image-wrap { min-height: 420px; }
    .lanyard-id { grid-template-columns: 1fr; }
  }
`

const works = [
  { num: '01', title: 'Catering Family Jakarta', meta: 'Laravel · Vue.js · REST API · MySQL', type: 'Fullstack Web' },
  { num: '02', title: 'Undercover Party Game', meta: 'React · TypeScript · JavaScript', type: 'Web App' },
]

const services = [
  {
    n: '01',
    title: 'Frontend Development',
    desc: 'Responsive interfaces with stronger motion, cleaner hierarchy, and premium visual polish for modern products.',
    tags: ['React', 'Vue.js', 'Next.js', 'Interactive UI'],
  },
  {
    n: '02',
    title: 'Backend Development',
    desc: 'Reliable APIs, authentication, and maintainable server architecture built for business flows that need to scale.',
    tags: ['Laravel', 'Node.js', 'PHP', 'Express.js'],
  },
  {
    n: '03',
    title: 'Brand-like Portfolio Sites',
    desc: 'High-end landing pages and personal or company websites inspired by the feel of premium design-driven web experiences.',
    tags: ['Motion', 'Glass UI', 'Performance'],
  },
]

const heroLines = [
  ['Fullstack', 'web', 'developer'],
  ['building', { text: 'modern digital products', accent: true }],
  ['from', 'frontend', 'to', 'backend.'],
]

export default function Home() {
  useReveal()

  const [pullY, setPullY] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const startY = useRef(0)
  const cardRef = useRef(null)

  const handleMouseDown = (e) => {
    setIsDragging(true)
    startY.current = e.clientY - pullY
  }

  const handleMouseMove = (e) => {
    const newY = Math.max(0, Math.min(e.clientY - startY.current, 250))
    setPullY(newY)
    
    document.documentElement.style.setProperty('--mx', `${e.clientX}px`)
    document.documentElement.style.setProperty('--my', `${e.clientY}px`)
  }

  const handleTouchStart = (e) => {
    setIsDragging(true)
    startY.current = e.touches[0].clientY - pullY
  }

  const handleTouchMove = (e) => {
    if (!isDragging) return
    const newY = Math.max(0, Math.min(e.touches[0].clientY - startY.current, 250))
    setPullY(newY)
  }

  const handleDragEnd = () => {
    setIsDragging(false)
    setPullY(0)
  }

  return (
    <div 
      className="home-page" 
      onMouseMove={handleMouseMove} 
      onMouseUp={handleDragEnd} 
      onMouseLeave={handleDragEnd}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleDragEnd}
    >
      <style>{css}</style>

      <section className="hero home-container">
        <div className="hero-grid">
          <div>
            <div className="hero-badge reveal">
              <span className="hero-badge-dot" />
              Available for collab
            </div>
            <div className="hero-heading reveal delay-1">
              <h1 className="home-title">
                {heroLines.map((line, lineIndex) => (
                  <span key={lineIndex} className="hero-title-line">
                    {line.map((part, wordIndex) => {
                      const item = typeof part === 'string' ? { text: part } : part
                      return (
                        <span
                          key={`${lineIndex}-${wordIndex}`}
                          className={`hero-word${item.accent ? ' accent' : ''}`}
                          style={{ animationDelay: `${0.08 + ((lineIndex * 4 + wordIndex) * 0.08)}s` }}
                        >
                          {item.text}
                        </span>
                      )
                    })}
                  </span>
                ))}
              </h1>
            </div>
            <p className="home-copy-lg hero-subtitle reveal delay-2">
              I&apos;m Risky Januar, a fullstack developer focused on building scalable web applications. I work across the entire stack — designing clean user interfaces, building reliable APIs, and architecting database systems that power real products.
            </p>
            <div className="home-actions reveal delay-3">
              <MagneticButton><Link to="/portfolio" className="home-btn-primary">View Portfolio</Link></MagneticButton>
              <MagneticButton><Link to="/contact" className="home-btn-secondary">Let&apos;s Build Something</Link></MagneticButton>
            </div>
            <div className="hero-strip reveal delay-3">
              <div className="hero-chip">
                <div className="hero-chip-title">Frontend</div>
                <div className="hero-chip-value">React · Vue · Next.js</div>
              </div>
              <div className="hero-chip">
                <div className="hero-chip-title">Backend</div>
                <div className="hero-chip-value">Laravel · Node.js · APIs</div>
              </div>
              <div className="hero-chip">
                <div className="hero-chip-title">Database</div>
                <div className="hero-chip-value">MySQL · Data modeling</div>
              </div>
            </div>
            <div className="hero-meta reveal delay-4">
              <div className="hero-stat">
                <div className="hero-stat-value">2+</div>
                <div className="hero-stat-label">Selected projects with real implementation</div>
              </div>
              <div className="hero-stat">
                <div className="hero-stat-value">6+</div>
                <div className="hero-stat-label">Core technologies across frontend and backend</div>
              </div>
              <div className="hero-stat">
                <div className="hero-stat-value">24h</div>
                <div className="hero-stat-label">Typical response time for serious inquiries</div>
              </div>
            </div>
          </div>

          <div className="reveal-right">
            <div className="visual-stage">
              <div className="floating-blob blob-1" />
              <div className="floating-blob blob-2" />
              <div className="ambient-grid" />
              <div className="ambient-orb one" />
              <div className="ambient-orb two" />

              <div className="lanyard-wrap" style={{ cursor: isDragging ? 'grabbing' : 'grab' }}>
                <div className="lanyard-rope" style={{ height: 120 + pullY, transition: isDragging ? 'none' : 'height 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)' }} />
                <div className="lanyard-clip" style={{ transform: `translateX(-50%) translateY(${pullY}px)`, transition: isDragging ? 'none' : 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)' }} />
                <div className={`lanyard-card${isDragging || pullY > 0 ? ' dragging' : ''}`} 
                  ref={cardRef} 
                  onMouseDown={handleMouseDown} 
                  onTouchStart={handleTouchStart}
                  style={{ 
                    transform: `translateY(${pullY}px) rotate(${isDragging ? pullY / 20 : 0}deg)`, 
                    transition: isDragging ? 'none' : 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)' 
                  }}
                >
                  <div className="lanyard-topbar">
                    <div className="lanyard-brand">Fullstack ID</div>
                    <div className="lanyard-status"><span className="hero-badge-dot" /> Available</div>
                  </div>
                  <div className="lanyard-image-wrap">
                    <img src="/photo/Gemini_Generated_Image_9pq8wq9pq8wq9pq8.png" alt="Risky Januar" />
                    <div className="lanyard-id">
                      <div>
                        <div className="lanyard-role">Fullstack Developer</div>
                        <div className="lanyard-name">Risky Januar</div>
                        <div className="lanyard-focus">Developing scalable web apps from frontend to backend.</div>
                      </div>
                      <div className="lanyard-scan" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="home-section">
        <div className="home-container">
          <div className="reveal">
            <div className="home-label">Services</div>
            <h2 className="home-title" style={{ marginTop: 16, maxWidth: 760 }}>What I can help you build</h2>
            <p className="home-copy" style={{ marginTop: 20, maxWidth: 680 }}>
              From polished portfolio sites to fullstack products, I create interfaces and systems with stronger visual impact and practical structure.
            </p>
          </div>
          <div className="service-grid">
            {services.map((s, i) => (
              <div key={s.n} className={`service-card reveal delay-${i}`}>
                <div className="service-eyebrow">Service {s.n}</div>
                <h3 className="service-title">{s.title}</h3>
                <p className="service-desc">{s.desc}</p>
                <div className="tag-row">
                  {s.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="home-section" style={{ paddingTop: 0 }}>
        <div className="home-container">
          <div className="reveal" style={{ display: 'flex', justifyContent: 'space-between', gap: 20, alignItems: 'end', flexWrap: 'wrap' }}>
            <div>
              <div className="home-label">Portfolio</div>
              <h2 className="home-title" style={{ marginTop: 16 }}>Selected work</h2>
            </div>
            <Link to="/portfolio" className="home-btn-secondary">See all projects</Link>
          </div>
          <div className="works-panel">
            {works.map((w, i) => (
              <Link to="/portfolio" key={w.num} className={`work-item reveal delay-${i}`}>
                <span className="work-index">{w.num}</span>
                <div>
                  <div className="work-title">{w.title}</div>
                  <div className="work-meta">{w.meta}</div>
                </div>
                <span className="work-type">{w.type}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="home-section" style={{ paddingTop: 0 }}>
        <div className="home-container">
          <div className="cta-card reveal">
            <div>
              <div className="home-label" style={{ color: 'rgba(255,255,255,.72)' }}>Start a conversation</div>
              <h2 className="home-title" style={{ marginTop: 16 }}>Want your website to feel more high-end and alive?</h2>
              <p className="home-copy" style={{ marginTop: 18 }}>
                Let&apos;s make it look sharper, move smoother, and leave a stronger impression from the first scroll.
              </p>
            </div>
            <div className="home-actions" style={{ marginTop: 0 }}>
              <Link to="/contact" className="home-btn-primary">Contact Me</Link>
              <Link to="/about" className="home-btn-secondary">About Me</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
