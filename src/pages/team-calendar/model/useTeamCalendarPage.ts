import dayjs from 'dayjs'
import { useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'

import { useMatches } from '@/entities/match'
import { useTeam } from '@/entities/team'
import { isDateInRange } from '@/shared/lib/date/timezone'

import type { MatchesDateRange } from '@/shared/lib/match'

const PAGE_SIZE = 10
const API_DATE_FORMAT = 'YYYY-MM-DD'

export const useTeamCalendarPage = () => {
  const { id } = useParams()
  const teamId = id ? Number(id) : undefined
  const normalizedTeamId = Number.isFinite(teamId) ? teamId : undefined

  const [page, setPage] = useState(1)
  const [dateRange, setDateRange] = useState<MatchesDateRange>(null)

  const dateFrom = dateRange?.[0]?.format(API_DATE_FORMAT)
  const dateTo = dateRange?.[1]?.format(API_DATE_FORMAT)
  const apiDateFrom = dateFrom && dateTo ? dateFrom : undefined
  const apiDateTo = dateFrom && dateTo ? dateTo : undefined

  const {
    data: team,
    isLoading: isTeamLoading,
    error: teamError,
  } = useTeam(normalizedTeamId)

  const {
    data: matchesData,
    isLoading: isMatchesLoading,
    error: matchesError,
  } = useMatches({
    teamId: normalizedTeamId,
    dateFrom: apiDateFrom,
    dateTo: apiDateTo,
  })

  const filteredMatches = useMemo(() => {
    const items = matchesData ?? []

    if (!dateFrom && !dateTo) return items

    return items.filter((match) =>
      isDateInRange(match.utcDate, { from: dateFrom, to: dateTo }),
    )
  }, [dateFrom, dateTo, matchesData])

  const maxPage = Math.max(1, Math.ceil(filteredMatches.length / PAGE_SIZE))
  const currentPage = Math.min(page, maxPage)

  const paginatedMatches = useMemo(() => {
    const startIndex = (currentPage - 1) * PAGE_SIZE

    return filteredMatches.slice(startIndex, startIndex + PAGE_SIZE)
  }, [currentPage, filteredMatches])

  const handlePageChange = (nextPage: number) => {
    setPage(nextPage)
  }

  const handleDateRangeChange = (nextRange: MatchesDateRange) => {
    if (
      nextRange?.[0] &&
      nextRange?.[1] &&
      dayjs(nextRange[0]).isAfter(dayjs(nextRange[1]), 'day')
    ) {
      return
    }

    setDateRange(nextRange)
    setPage(1)
  }

  return {
    teamName: team?.name,
    teamError: teamError instanceof Error ? teamError : null,
    dateRange,
    handleDateRangeChange,
    handlePageChange,
    isTeamLoading,
    isMatchesLoading,
    matches: paginatedMatches,
    matchesError: matchesError instanceof Error ? matchesError : null,
    page: currentPage,
    pageSize: PAGE_SIZE,
    paginationTotal: filteredMatches.length,
  }
}
