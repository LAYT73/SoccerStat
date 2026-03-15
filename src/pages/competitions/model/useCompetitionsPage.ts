import { useMemo, useState } from 'react'

import { useCompetitions } from '@/entities/competition'

const COMPETITIONS_PAGE_SIZE = 16

const normalizeText = (value: string) => value.trim().toLowerCase()

export const useCompetitionsPage = () => {
  const { data, isLoading, isError, error } = useCompetitions()

  const [searchValue, setSearchValue] = useState('')
  const [page, setPage] = useState(1)

  const competitions = data?.competitions
  const normalizedSearch = normalizeText(searchValue)

  const filteredCompetitions = useMemo(() => {
    const competitionList = competitions ?? []

    if (!normalizedSearch) {
      return competitionList
    }

    return competitionList.filter((competition) => {
      const leagueName = normalizeText(competition.name)
      const countryName = normalizeText(competition.area.name)

      return (
        leagueName.includes(normalizedSearch) || countryName.includes(normalizedSearch)
      )
    })
  }, [competitions, normalizedSearch])

  const totalFilteredItems = filteredCompetitions.length
  const maxPage = Math.max(1, Math.ceil(totalFilteredItems / COMPETITIONS_PAGE_SIZE))
  const currentPage = Math.min(page, maxPage)

  const paginatedCompetitions = useMemo(() => {
    const startIndex = (currentPage - 1) * COMPETITIONS_PAGE_SIZE
    return filteredCompetitions.slice(startIndex, startIndex + COMPETITIONS_PAGE_SIZE)
  }, [currentPage, filteredCompetitions])

  const totalFromResponse = data?.count ?? competitions?.length ?? 0
  const paginationTotal = normalizedSearch ? totalFilteredItems : totalFromResponse

  const handleSearchChange = (value: string) => {
    setSearchValue(value)
    setPage(1)
  }

  const handlePageChange = (nextPage: number) => {
    setPage(nextPage)
  }

  return {
    searchValue,
    page: currentPage,
    pageSize: COMPETITIONS_PAGE_SIZE,
    paginationTotal,
    paginatedCompetitions,
    isLoading,
    isError,
    error,
    handleSearchChange,
    handlePageChange,
  }
}
