import type { ContainerProps } from './types'
import type { FC } from 'react'

const Container: FC<ContainerProps> = ({ children, className = '' }) => {
  return <div className={`mx-auto w-full px-3 max-w-7xl ${className}`}>{children}</div>
}

export default Container
