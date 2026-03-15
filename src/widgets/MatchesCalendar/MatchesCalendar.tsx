import {
  Alert,
  Breadcrumb,
  DatePicker,
  Empty,
  Pagination,
  Spin,
  Table,
  Typography,
} from 'antd'
import { Link } from 'react-router-dom'

import { formatMatchDate } from '@/shared/lib/date/timezone'

import type { MatchView } from '@/entities/match'
import type { MatchesDateRange } from '@/shared/lib/match'
import type { TableProps } from 'antd'

interface MatchesCalendarProps {
  dateRange: MatchesDateRange
  entityName?: string
  entityError?: Error | null
  entityErrorTitle: string
  entityLoading: boolean
  matches: MatchView[]
  matchesError?: Error | null
  matchesErrorTitle: string
  matchesLoading: boolean
  onDateRangeChange: (range: MatchesDateRange) => void
  onPageChange: (page: number) => void
  page: number
  pageSize: number
  paginationTotal: number
  rootLabel: string
  rootPath: string
}

const matchStatusLabels: Record<string, string> = {
  SCHEDULED: 'Запланирован',
  LIVE: 'В прямом эфире',
  IN_PLAY: 'В игре',
  PAUSED: 'Пауза',
  FINISHED: 'Завершен',
  POSTPONED: 'Отложен',
  SUSPENDED: 'Приостановлен',
  CANCELED: 'Отменен',
  TIMED: 'По расписанию',
}

const getMatchStatusLabel = (status: string) => matchStatusLabels[status] ?? status

const formatScorePart = (home: number | null, away: number | null, wrap = false) => {
  if (home === null || away === null) {
    return null
  }

  const value = `${home}:${away}`

  return wrap ? `(${value})` : value
}

const formatMatchScore = (match: MatchView) => {
  const scoreParts = [
    formatScorePart(match.score.fullTime.home, match.score.fullTime.away),
    formatScorePart(match.score.extraTime.home, match.score.extraTime.away, true),
    formatScorePart(match.score.penalties.home, match.score.penalties.away, true),
  ].filter(Boolean)

  return scoreParts.join(' ') || '-'
}

const columns: TableProps<MatchView>['columns'] = [
  {
    dataIndex: 'utcDate',
    key: 'date',
    width: 120,
    render: (_value, match) => (
      <Typography.Text className="whitespace-nowrap">
        {formatMatchDate(match.utcDate, 'DD.MM.YYYY')}
      </Typography.Text>
    ),
  },
  {
    dataIndex: 'time',
    key: 'time',
    width: 90,
    render: (_value, match) => (
      <Typography.Text className="whitespace-nowrap">
        {formatMatchDate(match.utcDate, 'HH:mm')}
      </Typography.Text>
    ),
  },
  {
    dataIndex: 'status',
    key: 'status',
    width: 160,
    render: (status: string) => getMatchStatusLabel(status),
  },
  {
    dataIndex: 'teams',
    key: 'teams',
    render: (_value, match) => (
      <Typography.Text className="block min-w-[220px]">
        {match.homeTeam.name} - {match.awayTeam.name}
      </Typography.Text>
    ),
  },
  {
    dataIndex: 'score',
    key: 'score',
    align: 'right',
    width: 140,
    render: (_value, match) => (
      <Typography.Text className="whitespace-nowrap font-medium">
        {formatMatchScore(match)}
      </Typography.Text>
    ),
  },
]

const MatchesCalendar = ({
  dateRange,
  entityName,
  entityError,
  entityErrorTitle,
  entityLoading,
  matches,
  matchesError,
  matchesErrorTitle,
  matchesLoading,
  onDateRangeChange,
  onPageChange,
  page,
  pageSize,
  paginationTotal,
  rootLabel,
  rootPath,
}: MatchesCalendarProps) => {
  const isLoading = entityLoading || matchesLoading

  return (
    <section className="w-full flex flex-col gap-6">
      <Breadcrumb
        items={[
          {
            title: <Link to={rootPath}>{rootLabel}</Link>,
          },
          {
            title: entityName ?? 'Загрузка...',
          },
        ]}
      />

      <div className="w-full flex flex-col gap-2 sm:max-w-md">
        <Typography.Text strong>Фильтр по дате</Typography.Text>
        <DatePicker.RangePicker
          value={dateRange}
          onChange={(value) => onDateRangeChange(value)}
          format="DD.MM.YYYY"
          className="w-full"
          allowClear
        />
      </div>

      {entityError && (
        <Alert
          type="error"
          showIcon
          message={entityErrorTitle}
          description={entityError.message}
        />
      )}

      {matchesError && (
        <Alert
          type="error"
          showIcon
          message={matchesErrorTitle}
          description={matchesError.message}
        />
      )}

      {isLoading ? (
        <div className="w-full py-20 flex justify-center">
          <Spin size="large" />
        </div>
      ) : (
        <Table
          rowKey="id"
          columns={columns}
          dataSource={matches}
          pagination={false}
          showHeader={false}
          locale={{
            emptyText: <Empty description="Матчи не найдены" />,
          }}
          scroll={{ x: 760 }}
          className="rounded-xl overflow-hidden"
        />
      )}

      <div className="w-full flex justify-center pt-2">
        <Pagination
          current={page}
          total={paginationTotal}
          pageSize={pageSize}
          showSizeChanger={false}
          onChange={onPageChange}
        />
      </div>
    </section>
  )
}

export default MatchesCalendar
