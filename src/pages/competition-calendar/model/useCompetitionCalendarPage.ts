import { useParams } from 'react-router-dom'

import { useMatches } from '@/entities/match'
import { useMatchesCalendarControls, useMatchesCalendarData } from '@/shared/lib/match'

const PAGE_SIZE = 10

export const useCompetitionCalendarPage = () => {
  const { id } = useParams()
  const competitionId = id ? Number(id) : undefined
  const normalizedCompetitionId = Number.isFinite(competitionId)
    ? competitionId
    : undefined

  const controls = useMatchesCalendarControls({ pageSize: PAGE_SIZE })

  const {
    data: matchesData,
    error: matchesError,
    isLoading: isMatchesLoading,
  } = useMatches({
    competitionId: normalizedCompetitionId,
    dateFrom: controls.apiDateFrom,
    dateTo: controls.apiDateTo,
  })

  const calendarData = useMatchesCalendarData({
    matches: matchesData?.matches,
    dateRange: controls.dateRange,
    page: controls.page,
    pageSize: PAGE_SIZE,
  })

  return {
    competitionName: matchesData?.competition?.name,
    dateRange: controls.dateRange,
    handleDateRangeChange: controls.handleDateRangeChange,
    handlePageChange: controls.handlePageChange,
    isMatchesLoading,
    matches: calendarData.paginatedMatches,
    matchesError: matchesError instanceof Error ? matchesError : null,
    page: calendarData.currentPage,
    pageSize: PAGE_SIZE,
    paginationTotal: calendarData.paginationTotal,
  }
}
