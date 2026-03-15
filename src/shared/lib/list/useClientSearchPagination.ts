import { useMemo, useState } from 'react'

interface UseClientSearchPaginationParams<TItem> {
  items: TItem[] | undefined
  pageSize: number
  totalFromResponse?: number
  filterFn: (item: TItem, normalizedSearch: string) => boolean
}

const normalizeText = (value: string) => value.trim().toLowerCase()

export const useClientSearchPagination = <TItem>({
  items,
  pageSize,
  totalFromResponse,
  filterFn,
}: UseClientSearchPaginationParams<TItem>) => {
  const [searchValue, setSearchValue] = useState('')
  const [page, setPage] = useState(1)

  const normalizedSearch = normalizeText(searchValue)

  const filteredItems = useMemo(() => {
    const list = items ?? []

    if (!normalizedSearch) {
      return list
    }

    return list.filter((item) => filterFn(item, normalizedSearch))
  }, [items, normalizedSearch, filterFn])

  const totalFilteredItems = filteredItems.length
  const maxPage = Math.max(1, Math.ceil(totalFilteredItems / pageSize))
  const currentPage = Math.min(page, maxPage)

  const paginatedItems = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize
    return filteredItems.slice(startIndex, startIndex + pageSize)
  }, [currentPage, filteredItems, pageSize])

  const rawTotal = totalFromResponse ?? items?.length ?? 0
  const paginationTotal = normalizedSearch ? totalFilteredItems : rawTotal

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
    paginationTotal,
    paginatedItems,
    handleSearchChange,
    handlePageChange,
  }
}
