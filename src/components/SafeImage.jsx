import { useState } from 'react'

export default function SafeImage({ src, alt, ...props }) {
  const [loaded, setLoaded] = useState(false)

  return (
    <div className={`skeleton-bg ${!loaded ? 'skeleton-pulse' : ''}`} style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden' }}>
      <img
        src={src}
        alt={alt}
        onLoad={() => setLoaded(true)}
        style={{
          opacity: loaded ? 1 : 0,
          transition: 'opacity 0.15s ease-out',
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block'
        }}
        {...props}
      />
    </div>
  )
}
