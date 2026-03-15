import { Avatar, Card, Typography } from 'antd'

import type { Team } from '../api/team.schema'

interface TeamCardProps {
  team: Team
  onClick: (teamId: number) => void
}

const TeamCard = ({ team, onClick }: TeamCardProps) => {
  return (
    <Card
      hoverable
      className="h-full"
      onClick={() => onClick(team.id)}
      styles={{ body: { height: '100%' } }}
    >
      <div className="h-full flex flex-col items-center text-center gap-4 py-1">
        <Avatar
          src={team.crest ?? undefined}
          shape="square"
          size={120}
          alt={team.name}
          className="bg-gray-100"
        >
          {team.name.slice(0, 1)}
        </Avatar>

        <Typography.Title level={5} className="m-0! line-clamp-2 min-h-12">
          {team.name}
        </Typography.Title>
      </div>
    </Card>
  )
}

export default TeamCard
