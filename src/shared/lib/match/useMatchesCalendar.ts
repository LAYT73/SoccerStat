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

const getDateRangeValues = (dateRange: MatchesDateRange) => {
  const dateFrom = dateRange?.[0]?.format(API_DATE_FORMAT)
  const dateTo = dateRange?.[1]?.format(API_DATE_FORMAT)

  return {
    apiDateFrom: dateFrom && dateTo ? dateFrom : undefined,
    apiDateTo: dateFrom && dateTo ? dateTo : undefined,
    dateFrom,
    dateTo,
  }
}

interface UseMatchesCalendarControlsParams {
  pageSize: number
}

interface UseMatchesCalendarDataParams extends UseMatchesCalendarParams {
  dateRange: MatchesDateRange
  page: number
}

export const useMatchesCalendarControls = ({
  pageSize,
}: UseMatchesCalendarControlsParams) => {
  const [page, setPage] = useState(1)
  const [dateRange, setDateRange] = useState<MatchesDateRange>(null)

  const { apiDateFrom, apiDateTo } = getDateRangeValues(dateRange)

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
    dateRange,
    handleDateRangeChange,
    handlePageChange,
    page,
    pageSize,
  }
}

export const useMatchesCalendarData = ({
  matches,
  dateRange,
  page,
  pageSize,
}: UseMatchesCalendarDataParams) => {
  const { dateFrom, dateTo } = getDateRangeValues(dateRange)

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

  return {
    currentPage,
    paginatedMatches,
    paginationTotal: filteredMatches.length,
  }
}

export const useMatchesCalendar = ({ matches, pageSize }: UseMatchesCalendarParams) => {
  const controls = useMatchesCalendarControls({ pageSize })
  const data = useMatchesCalendarData({
    matches,
    dateRange: controls.dateRange,
    page: controls.page,
    pageSize,
  })

  return {
    ...controls,
    ...data,
  }
}
