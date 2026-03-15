import type { ReactNode } from 'react'

export interface EntityGridProps<TItem extends { id: number }> {
  items: TItem[]
  emptyDescription: string
  renderItem: (item: TItem) => ReactNode
}
