import { useCompetitions } from '@/entities/competition'
import { useClientSearchPagination } from '@/shared/lib/list/useClientSearchPagination'

const COMPETITIONS_PAGE_SIZE = 16

export const useCompetitionsPage = () => {
  const { data, isLoading, isError, error } = useCompetitions()
  const {
    searchValue,
    page,
    paginationTotal,
    paginatedItems,
    handleSearchChange,
    handlePageChange,
  } = useClientSearchPagination({
    items: data?.competitions,
    pageSize: COMPETITIONS_PAGE_SIZE,
    totalFromResponse: data?.count,
    filterFn: (competition, normalizedSearch) => {
      const leagueName = competition.name.trim().toLowerCase()
      const countryName = competition.area.name.trim().toLowerCase()

      return (
        leagueName.includes(normalizedSearch) || countryName.includes(normalizedSearch)
      )
    },
  })

  return {
    searchValue,
    page,
    pageSize: COMPETITIONS_PAGE_SIZE,
    paginationTotal,
    paginatedCompetitions: paginatedItems,
    isLoading,
    isError,
    error,
    handleSearchChange,
    handlePageChange,
  }
}
