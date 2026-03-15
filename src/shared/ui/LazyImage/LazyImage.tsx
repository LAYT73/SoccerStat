import { Skeleton } from 'antd'
import { useState } from 'react'

import type { LazyImageProps } from './types'

const LazyImage = ({
  src,
  alt,
  width,
  height,
  fallback,
  className = '',
  containerClassName = '',
  ...imgProps
}: LazyImageProps) => {
  const [loadedSrc, setLoadedSrc] = useState<string | null>(null)
  const [failedSrc, setFailedSrc] = useState<string | null>(null)

  if (!src || failedSrc === src) {
    return <>{fallback}</>
  }

  const isImageLoaded = loadedSrc === src

  return (
    <div
      className={`flex items-center justify-center overflow-hidden ${containerClassName}`}
      style={{ width, height }}
    >
      {!isImageLoaded && <Skeleton.Image active style={{ width, height }} />}
      <img
        {...imgProps}
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={`w-full h-full object-contain ${isImageLoaded ? 'block' : 'hidden'} ${className}`.trim()}
        onLoad={() => setLoadedSrc(src)}
        onError={() => setFailedSrc(src)}
      />
    </div>
  )
}

export default LazyImage
