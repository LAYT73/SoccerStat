import { EntityGrid } from '@/shared/ui'

import TeamCard from './TeamCard'

import type { Team } from '../api/team.schema'

interface TeamGridProps {
  teams: Team[]
  onOpenTeam: (teamId: number) => void
}

const TeamGrid = ({ teams, onOpenTeam }: TeamGridProps) => {
  return (
    <EntityGrid
      items={teams}
      emptyDescription="По заданному фильтру команды не найдены"
      renderItem={(team) => <TeamCard team={team} onClick={onOpenTeam} />}
    />
  )
}

export default TeamGrid
