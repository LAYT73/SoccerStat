import { EntityGrid } from '@/shared/ui'

import CompetitionCard from './CompetitionCard'

import type { Competition } from '../api/competition.schema'

interface CompetitionGridProps {
  competitions: Competition[]
  onOpenCompetition: (competitionId: number) => void
}

const CompetitionGrid = ({ competitions, onOpenCompetition }: CompetitionGridProps) => {
  return (
    <EntityGrid
      items={competitions}
      emptyDescription="По заданному фильтру лиги не найдены"
      renderItem={(competition) => (
        <CompetitionCard competition={competition} onClick={onOpenCompetition} />
      )}
    />
  )
}

export default CompetitionGrid
