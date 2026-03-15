import { useParams } from 'react-router-dom'

import { useTeam } from '@/entities/team'
import { useEntityMatchesCalendarPage } from '@/shared/lib/match'

const PAGE_SIZE = 10

export const useTeamCalendarPage = () => {
  const { id } = useParams()
  const teamId = id ? Number(id) : undefined
  const normalizedTeamId = Number.isFinite(teamId) ? teamId : undefined

  const calendarPage = useEntityMatchesCalendarPage({
    entityId: normalizedTeamId,
    getEntityName: (team) => team?.name,
    getMatchesParams: ({ dateFrom, dateTo, entityId }) => ({
      teamId: entityId,
      dateFrom,
      dateTo,
    }),
    pageSize: PAGE_SIZE,
    useEntityQuery: useTeam,
  })

  return {
    teamName: calendarPage.entityName,
    teamError: calendarPage.entityError,
    dateRange: calendarPage.dateRange,
    handleDateRangeChange: calendarPage.handleDateRangeChange,
    handlePageChange: calendarPage.handlePageChange,
    isTeamLoading: calendarPage.isEntityLoading,
    isMatchesLoading: calendarPage.isMatchesLoading,
    matches: calendarPage.matches,
    matchesError: calendarPage.matchesError,
    page: calendarPage.page,
    pageSize: calendarPage.pageSize,
    paginationTotal: calendarPage.paginationTotal,
  }
}
