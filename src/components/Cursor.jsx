import { useState, useEffect } from 'react'

const css = `
  .custom-cursor {
    position: fixed;
    top: 0;
    left: 0;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: rgba(37, 99, 235, 0.4);
    pointer-events: none;
    z-index: 9999;
    mix-blend-mode: difference;
    transition: transform 0.15s ease-out, opacity 0.3s ease;
    transform: translate(-50%, -50%);
  }

  .custom-cursor-dot {
    position: fixed;
    top: 0;
    left: 0;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.9);
    pointer-events: none;
    z-index: 10000;
    transition: transform 0.1s ease-out;
    transform: translate(-50%, -50%);
  }

  .custom-cursor.hover {
    transform: translate(-50%, -50%) scale(2);
    background: rgba(124, 58, 237, 0.3);
  }

  .custom-cursor.hidden {
    opacity: 0;
  }

  @media (max-width: 1024px) {
    .custom-cursor,
    .custom-cursor-dot {
      display: none;
    }
  }
`

export default function Cursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [dotPosition, setDotPosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [isHidden, setIsHidden] = useState(true)

  useEffect(() => {
    let rafId = null
    let targetX = 0
    let targetY = 0
    let currentX = 0
    let currentY = 0
    let dotX = 0
    let dotY = 0

    const handleMouseMove = (e) => {
      targetX = e.clientX
      targetY = e.clientY
      dotX = e.clientX
      dotY = e.clientY
      setIsHidden(false)
    }

    const handleMouseEnter = (e) => {
      if (
        e.target.tagName === 'A' ||
        e.target.tagName === 'BUTTON' ||
        e.target.closest('a') ||
        e.target.closest('button')
      ) {
        setIsHovering(true)
      }
    }

    const handleMouseLeave = (e) => {
      if (
        e.target.tagName === 'A' ||
        e.target.tagName === 'BUTTON' ||
        e.target.closest('a') ||
        e.target.closest('button')
      ) {
        setIsHovering(false)
      }
    }

    const handleMouseOut = () => {
      setIsHidden(true)
    }

    const animate = () => {
      currentX += (targetX - currentX) * 0.15
      currentY += (targetY - currentY) * 0.15

      setPosition({ x: currentX, y: currentY })
      setDotPosition({ x: dotX, y: dotY })

      rafId = requestAnimationFrame(animate)
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseover', handleMouseEnter)
    document.addEventListener('mouseout', handleMouseLeave)
    document.addEventListener('mouseleave', handleMouseOut)

    rafId = requestAnimationFrame(animate)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseover', handleMouseEnter)
      document.removeEventListener('mouseout', handleMouseLeave)
      document.removeEventListener('mouseleave', handleMouseOut)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <>
      <style>{css}</style>
      <div
        className={`custom-cursor${isHovering ? ' hover' : ''}${isHidden ? ' hidden' : ''}`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      />
      <div
        className="custom-cursor-dot"
        style={{
          left: `${dotPosition.x}px`,
          top: `${dotPosition.y}px`,
        }}
      />
    </>
  )
}
