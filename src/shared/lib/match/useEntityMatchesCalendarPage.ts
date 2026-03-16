import { useMatches, type GetMatchesParams, type MatchView } from '@/entities/match'

import { useMatchesCalendarControls, useMatchesCalendarData } from './useMatchesCalendar'

interface EntityQueryResult<TEntity> {
  data: TEntity | undefined
  error: unknown
  isLoading: boolean
}

interface UseEntityMatchesCalendarPageParams<TEntity> {
  entityId: number | undefined
  getEntityName: (entity: TEntity | undefined) => string | undefined
  getMatchesParams: (params: {
    dateFrom: string | undefined
    dateTo: string | undefined
    entityId: number | undefined
  }) => GetMatchesParams
  pageSize: number
  useEntityQuery: (entityId: number | undefined) => EntityQueryResult<TEntity>
}

interface UseEntityMatchesCalendarPageResult {
  dateRange: ReturnType<typeof useMatchesCalendarControls>['dateRange']
  entityError: Error | null
  entityName: string | undefined
  handleDateRangeChange: ReturnType<
    typeof useMatchesCalendarControls
  >['handleDateRangeChange']
  handlePageChange: ReturnType<typeof useMatchesCalendarControls>['handlePageChange']
  isEntityLoading: boolean
  isMatchesLoading: boolean
  matches: MatchView[]
  matchesError: Error | null
  page: number
  pageSize: number
  paginationTotal: number
}

export const useEntityMatchesCalendarPage = <TEntity>({
  entityId,
  getEntityName,
  getMatchesParams,
  pageSize,
  useEntityQuery,
}: UseEntityMatchesCalendarPageParams<TEntity>): UseEntityMatchesCalendarPageResult => {
  const controls = useMatchesCalendarControls({ pageSize })

  const {
    data: entity,
    error: entityError,
    isLoading: isEntityLoading,
  } = useEntityQuery(entityId)

  const {
    data: matchesData,
    error: matchesError,
    isLoading: isMatchesLoading,
  } = useMatches(
    getMatchesParams({
      dateFrom: controls.apiDateFrom,
      dateTo: controls.apiDateTo,
      entityId,
    }),
  )

  const calendarData = useMatchesCalendarData({
    matches: matchesData?.matches,
    dateRange: controls.dateRange,
    page: controls.page,
    pageSize,
  })

  return {
    dateRange: controls.dateRange,
    entityError: entityError instanceof Error ? entityError : null,
    entityName: getEntityName(entity),
    handleDateRangeChange: controls.handleDateRangeChange,
    handlePageChange: controls.handlePageChange,
    isEntityLoading,
    isMatchesLoading,
    matches: calendarData.paginatedMatches,
    matchesError: matchesError instanceof Error ? matchesError : null,
    page: calendarData.currentPage,
    pageSize,
    paginationTotal: calendarData.paginationTotal,
  }
}
