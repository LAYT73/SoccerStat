import { useTeams } from '@/entities/team'
import { useClientSearchPagination } from '@/shared/lib/list/useClientSearchPagination'

const TEAMS_PAGE_SIZE = 16

export const useTeamsPage = () => {
  const { data, isLoading, isError, error } = useTeams()

  const {
    searchValue,
    page,
    paginationTotal,
    paginatedItems,
    handleSearchChange,
    handlePageChange,
  } = useClientSearchPagination({
    items: data?.teams,
    pageSize: TEAMS_PAGE_SIZE,
    totalFromResponse: data?.count,
    filterFn: (team, normalizedSearch) =>
      team.name.trim().toLowerCase().includes(normalizedSearch),
  })

  return {
    searchValue,
    page,
    pageSize: TEAMS_PAGE_SIZE,
    paginationTotal,
    paginatedTeams: paginatedItems,
    isLoading,
    isError,
    error,
    handleSearchChange,
    handlePageChange,
  }
}
