import { useEffect, useState } from 'react'

const s = {
  wrap: { position:'fixed', inset:0, zIndex:10000, background:'var(--bg)', display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column', gap:24, transition:'opacity .7s ease, visibility .7s ease' },
  mark: { fontFamily:'var(--font-display)', fontSize:'3.5rem', letterSpacing:'.06em', color:'#fff', lineHeight:1 },
  accent: { color:'var(--accent)' },
  track: { width:120, height:1, background:'var(--border)' },
  fill: { height:'100%', background:'var(--accent)', animation:'loader-fill 1.8s cubic-bezier(.4,0,.2,1) forwards' },
}

export default function Loader() {
  const [hidden, setHidden] = useState(false)
  useEffect(() => { const t = setTimeout(() => setHidden(true), 1900); return () => clearTimeout(t) }, [])

  if (hidden) return null
  return (
    <div style={{ ...s.wrap, opacity: hidden ? 0 : 1, visibility: hidden ? 'hidden' : 'visible' }}>
      <div style={s.mark}>IKY<span style={s.accent}>.</span></div>
      <div style={s.track}><div style={s.fill} /></div>
    </div>
  )
}
