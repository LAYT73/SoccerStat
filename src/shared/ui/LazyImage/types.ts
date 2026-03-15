import type { ImgHTMLAttributes, ReactNode } from 'react'

export interface LazyImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  src?: string | null
  width: number
  height: number
  fallback: ReactNode
  containerClassName?: string
}
