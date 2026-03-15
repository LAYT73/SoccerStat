import { Container } from '@/shared/ui'
import { MatchesCalendar } from '@/widgets'

import { useTeamCalendarPage } from '../model/useTeamCalendarPage'

const TeamCalendarPage = () => {
  const {
    teamName,
    teamError,
    dateRange,
    handleDateRangeChange,
    handlePageChange,
    isTeamLoading,
    isMatchesLoading,
    matches,
    matchesError,
    page,
    pageSize,
    paginationTotal,
  } = useTeamCalendarPage()

  return (
    <Container>
      <MatchesCalendar
        dateRange={dateRange}
        entityName={teamName}
        entityError={teamError}
        entityErrorTitle="Не удалось загрузить команду"
        entityLoading={isTeamLoading}
        matches={matches ?? []}
        matchesError={matchesError}
        matchesErrorTitle="Не удалось загрузить матчи"
        matchesLoading={isMatchesLoading}
        onDateRangeChange={handleDateRangeChange}
        onPageChange={handlePageChange}
        page={page}
        pageSize={pageSize}
        paginationTotal={paginationTotal}
        rootLabel="Команды"
        rootPath="/teams"
      />
    </Container>
  )
}

export default TeamCalendarPage
