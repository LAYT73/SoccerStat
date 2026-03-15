import { useParams } from 'react-router-dom'

import { useCompetition } from '@/entities/competition'
import { useEntityMatchesCalendarPage } from '@/shared/lib/match'

const PAGE_SIZE = 10

export const useCompetitionCalendarPage = () => {
  const { id } = useParams()
  const competitionId = id ? Number(id) : undefined
  const normalizedCompetitionId = Number.isFinite(competitionId)
    ? competitionId
    : undefined

  const calendarPage = useEntityMatchesCalendarPage({
    entityId: normalizedCompetitionId,
    getEntityName: (competition) => competition?.name,
    getMatchesParams: ({ dateFrom, dateTo, entityId }) => ({
      competitionId: entityId,
      dateFrom,
      dateTo,
    }),
    pageSize: PAGE_SIZE,
    useEntityQuery: useCompetition,
  })

  return {
    competitionName: calendarPage.entityName,
    competitionError: calendarPage.entityError,
    dateRange: calendarPage.dateRange,
    handleDateRangeChange: calendarPage.handleDateRangeChange,
    handlePageChange: calendarPage.handlePageChange,
    isCompetitionLoading: calendarPage.isEntityLoading,
    isMatchesLoading: calendarPage.isMatchesLoading,
    matches: calendarPage.matches,
    matchesError: calendarPage.matchesError,
    page: calendarPage.page,
    pageSize: calendarPage.pageSize,
    paginationTotal: calendarPage.paginationTotal,
  }
}
