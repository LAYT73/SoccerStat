import { Avatar, Card, Typography } from 'antd'

import type { Competition } from '../api/competition.schema'

interface CompetitionCardProps {
  competition: Competition
  onClick: (competitionId: number) => void
}

const CompetitionCard = ({ competition, onClick }: CompetitionCardProps) => {
  const emblem = competition.emblem ?? competition.area.flag

  return (
    <Card
      hoverable
      className="h-full"
      onClick={() => onClick(competition.id)}
      styles={{ body: { height: '100%' } }}
    >
      <div className="h-full flex flex-col items-center text-center gap-3 py-0">
        <Avatar
          src={emblem ?? undefined}
          shape="square"
          size={120}
          alt={competition.name}
          className="bg-gray-100"
        >
          {competition.name.slice(0, 1)}
        </Avatar>

        <Typography.Title level={5} className="m-4! line-clamp-2 min-h-12">
          {competition.name}
        </Typography.Title>

        <Typography.Text type="secondary" className="line-clamp-1">
          {competition.area.name}
        </Typography.Text>
      </div>
    </Card>
  )
}

export default CompetitionCard
