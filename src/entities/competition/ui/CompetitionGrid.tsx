import { Col, Empty, Row } from 'antd'

import CompetitionCard from './CompetitionCard'

import type { Competition } from '../api/competition.schema'

interface CompetitionGridProps {
  competitions: Competition[]
  onOpenCompetition: (competitionId: number) => void
}

const CompetitionGrid = ({ competitions, onOpenCompetition }: CompetitionGridProps) => {
  if (competitions.length === 0) {
    return <Empty description="По заданному фильтру лиги не найдены" />
  }

  return (
    <Row gutter={[16, 16]}>
      {competitions.map((competition) => (
        <Col key={competition.id} xs={24} sm={12} md={8} lg={6}>
          <CompetitionCard competition={competition} onClick={onOpenCompetition} />
        </Col>
      ))}
    </Row>
  )
}

export default CompetitionGrid
