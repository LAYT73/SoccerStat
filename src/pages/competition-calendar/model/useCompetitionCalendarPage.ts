import dayjs from 'dayjs'
import { useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'

import { useCompetition } from '@/entities/competition'
import { useMatches } from '@/entities/match'
import { isDateInRange } from '@/shared/lib/date/timezone'

import type { MatchesDateRange } from '@/shared/lib/match'

const PAGE_SIZE = 10
const API_DATE_FORMAT = 'YYYY-MM-DD'

export const useCompetitionCalendarPage = () => {
  const { id } = useParams()
  const competitionId = id ? Number(id) : undefined
  const normalizedCompetitionId = Number.isFinite(competitionId)
    ? competitionId
    : undefined

  const [page, setPage] = useState(1)
  const [dateRange, setDateRange] = useState<MatchesDateRange>(null)

  const dateFrom = dateRange?.[0]?.format(API_DATE_FORMAT)
  const dateTo = dateRange?.[1]?.format(API_DATE_FORMAT)
  const apiDateFrom = dateFrom && dateTo ? dateFrom : undefined
  const apiDateTo = dateFrom && dateTo ? dateTo : undefined

  const {
    data: competition,
    isLoading: isCompetitionLoading,
    error: competitionError,
  } = useCompetition(normalizedCompetitionId)

  const {
    data: matchesData,
    isLoading: isMatchesLoading,
    error: matchesError,
  } = useMatches({
    competitionId: normalizedCompetitionId,
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
    competitionName: competition?.name,
    competitionError: competitionError instanceof Error ? competitionError : null,
    dateRange,
    handleDateRangeChange,
    handlePageChange,
    isCompetitionLoading,
    isMatchesLoading,
    matches: paginatedMatches,
    matchesError: matchesError instanceof Error ? matchesError : null,
    page: currentPage,
    pageSize: PAGE_SIZE,
    paginationTotal: filteredMatches.length,
  }
}
