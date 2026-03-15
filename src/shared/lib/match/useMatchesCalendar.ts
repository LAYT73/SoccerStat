import dayjs from 'dayjs'
import { useMemo, useState } from 'react'

import { isDateInRange } from '@/shared/lib/date/timezone'

import type { MatchView } from '@/entities/match'
import type { Dayjs } from 'dayjs'

export type MatchesDateRange = [Dayjs | null, Dayjs | null] | null

interface UseMatchesCalendarParams {
  matches: MatchView[] | undefined
  pageSize: number
}

const API_DATE_FORMAT = 'YYYY-MM-DD'

export const useMatchesCalendar = ({ matches, pageSize }: UseMatchesCalendarParams) => {
  const [page, setPage] = useState(1)
  const [dateRange, setDateRange] = useState<MatchesDateRange>(null)

  const dateFrom = dateRange?.[0]?.format(API_DATE_FORMAT)
  const dateTo = dateRange?.[1]?.format(API_DATE_FORMAT)
  const apiDateFrom = dateFrom && dateTo ? dateFrom : undefined
  const apiDateTo = dateFrom && dateTo ? dateTo : undefined

  const filteredMatches = useMemo(() => {
    const items = matches ?? []

    if (!dateFrom && !dateTo) {
      return items
    }

    return items.filter((match) =>
      isDateInRange(match.utcDate, {
        from: dateFrom,
        to: dateTo,
      }),
    )
  }, [dateFrom, dateTo, matches])

  const maxPage = Math.max(1, Math.ceil(filteredMatches.length / pageSize))
  const currentPage = Math.min(page, maxPage)

  const paginatedMatches = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize

    return filteredMatches.slice(startIndex, startIndex + pageSize)
  }, [currentPage, filteredMatches, pageSize])

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
    apiDateFrom,
    apiDateTo,
    currentPage,
    dateRange,
    handleDateRangeChange,
    handlePageChange,
    pageSize,
    paginatedMatches,
    paginationTotal: filteredMatches.length,
  }
}
