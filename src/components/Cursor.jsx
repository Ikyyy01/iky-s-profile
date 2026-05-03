import { useEffect, useRef } from 'react'

export default function Cursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const pos = useRef({ mx: -100, my: -100, rx: -100, ry: -100 })
  const rafRef = useRef(null)

  useEffect(() => {
    if (!window.matchMedia('(hover: hover)').matches) return
    const dot = dotRef.current
    const ring = ringRef.current

    const onMove = e => {
      pos.current.mx = e.clientX
      pos.current.my = e.clientY
      dot.style.left = e.clientX + 'px'
      dot.style.top = e.clientY + 'px'
    }

    const animate = () => {
      const { mx, my } = pos.current
      pos.current.rx += (mx - pos.current.rx) * 0.12
      pos.current.ry += (my - pos.current.ry) * 0.12
      ring.style.left = pos.current.rx + 'px'
      ring.style.top = pos.current.ry + 'px'
      rafRef.current = requestAnimationFrame(animate)
    }
    animate()

    const addHover = () => document.body.classList.add('cursor-hover')
    const rmHover = () => document.body.classList.remove('cursor-hover')
    const addClick = () => document.body.classList.add('cursor-clicking')
    const rmClick = () => document.body.classList.remove('cursor-clicking')

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mousedown', addClick)
    document.addEventListener('mouseup', rmClick)

    const attachHover = () => {
      document.querySelectorAll('a, button, [data-hover]').forEach(el => {
        el.addEventListener('mouseenter', addHover)
        el.addEventListener('mouseleave', rmHover)
      })
    }
    attachHover()
    const mo = new MutationObserver(attachHover)
    mo.observe(document.body, { childList: true, subtree: true })

    return () => {
      cancelAnimationFrame(rafRef.current)
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mousedown', addClick)
      document.removeEventListener('mouseup', rmClick)
      mo.disconnect()
    }
  }, [])

  return (
    <>
      <div className="cursor-dot" ref={dotRef} />
      <div className="cursor-ring" ref={ringRef} />
    </>
  )
}
