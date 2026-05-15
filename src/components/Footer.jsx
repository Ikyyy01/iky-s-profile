import { Link } from 'react-router-dom'

const s = {
  footer: { borderTop:'1px solid var(--border)', padding:'40px 0' },
  inner: { maxWidth:1200, margin:'0 auto', padding:'0 40px', display:'flex', alignItems:'center', justifyContent:'space-between', gap:24, flexWrap:'wrap' },
  logo: { fontFamily:'var(--font-display)', fontSize:'1.4rem', letterSpacing:'.06em', color:'var(--text2)', textDecoration:'none' },
  accent: { color:'var(--accent)' },
  copy: { fontSize:'.72rem', color:'var(--text3)', letterSpacing:'.05em' },
  socials: { display:'flex', gap:12 },
  link: { width:36, height:36, borderRadius:'50%', border:'1px solid var(--border2)', display:'flex', alignItems:'center', justifyContent:'center', color:'var(--text3)', textDecoration:'none', fontSize:'.78rem', transition:'border-color .2s, color .2s, transform .2s' },
}

const socials = [
  { label:'GH', href:'#' },
  { label:'IN', href:'#' },
  { label:'DR', href:'#' },
  { label:'✉', href:'mailto:riskyjanuarlbs01@gmail.com' },
]

export default function Footer() {
  return (
    <footer style={s.footer}>
      <div style={s.inner}>
        <Link to="/" style={s.logo}>IKY<span style={s.accent}>.</span></Link>
        <p style={s.copy}>© 2025 Risky Januar · UI/UX &amp; Mobile Developer</p>
        <div style={s.socials}>
          {socials.map(sc => (
            <a key={sc.label} href={sc.href} style={s.link}
              onMouseEnter={e => { e.currentTarget.style.borderColor='var(--accent)'; e.currentTarget.style.color='var(--accent)'; e.currentTarget.style.transform='translateY(-2px)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor='var(--border2)'; e.currentTarget.style.color='var(--text3)'; e.currentTarget.style.transform='' }}
            >{sc.label}</a>
          ))}
        </div>
      </div>
    </footer>
  )
}
