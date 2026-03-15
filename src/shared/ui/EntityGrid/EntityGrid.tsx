import { Col, Empty, Row } from 'antd'

import type { ReactNode } from 'react'

interface EntityGridProps<TItem extends { id: number }> {
  items: TItem[]
  emptyDescription: string
  renderItem: (item: TItem) => ReactNode
}

const EntityGrid = <TItem extends { id: number }>({
  items,
  emptyDescription,
  renderItem,
}: EntityGridProps<TItem>) => {
  if (items.length === 0) {
    return <Empty description={emptyDescription} />
  }

  return (
    <Row gutter={[16, 16]}>
      {items.map((item) => (
        <Col key={item.id} xs={24} sm={12} md={8} lg={6}>
          {renderItem(item)}
        </Col>
      ))}
    </Row>
  )
}

export default EntityGrid
