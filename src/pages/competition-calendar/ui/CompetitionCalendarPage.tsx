import { Container } from '@/shared/ui'
import { MatchesCalendar } from '@/widgets'

import { useCompetitionCalendarPage } from '../model/useCompetitionCalendarPage'

const CompetitionCalendarPage = () => {
  const {
    competitionName,
    competitionError,
    dateRange,
    handleDateRangeChange,
    handlePageChange,
    isCompetitionLoading,
    isMatchesLoading,
    matches,
    matchesError,
    page,
    pageSize,
    paginationTotal,
  } = useCompetitionCalendarPage()

  return (
    <Container>
      <MatchesCalendar
        dateRange={dateRange}
        entityName={competitionName}
        entityError={competitionError}
        entityErrorTitle="Не удалось загрузить лигу"
        entityLoading={isCompetitionLoading}
        matches={matches ?? []}
        matchesError={matchesError}
        matchesErrorTitle="Не удалось загрузить матчи"
        matchesLoading={isMatchesLoading}
        onDateRangeChange={handleDateRangeChange}
        onPageChange={handlePageChange}
        page={page}
        pageSize={pageSize}
        paginationTotal={paginationTotal}
        rootLabel="Лиги"
        rootPath="/"
      />
    </Container>
  )
}

export default CompetitionCalendarPage
