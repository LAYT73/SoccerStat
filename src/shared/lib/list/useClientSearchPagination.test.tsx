import { act, renderHook } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { useClientSearchPagination } from './useClientSearchPagination'

type TeamLike = {
  id: number
  name: string
}

const items: TeamLike[] = [
  { id: 1, name: 'Arsenal' },
  { id: 2, name: 'Barcelona' },
  { id: 3, name: 'Chelsea' },
]

describe('useClientSearchPagination', () => {
  it('resets page to 1 and applies filtered totals when search is set', () => {
    const { result } = renderHook(() =>
      useClientSearchPagination<TeamLike>({
        items,
        pageSize: 1,
        totalFromResponse: 10,
        filterFn: (item, search) => item.name.toLowerCase().includes(search),
      }),
    )

    act(() => {
      result.current.handlePageChange(3)
    })
    expect(result.current.page).toBe(3)

    act(() => {
      result.current.handleSearchChange('bar')
    })

    expect(result.current.page).toBe(1)
    expect(result.current.paginationTotal).toBe(1)
    expect(result.current.paginatedItems).toEqual([{ id: 2, name: 'Barcelona' }])
  })

  it('uses totalFromResponse when search query is empty', () => {
    const { result } = renderHook(() =>
      useClientSearchPagination<TeamLike>({
        items,
        pageSize: 2,
        totalFromResponse: 50,
        filterFn: (item, search) => item.name.toLowerCase().includes(search),
      }),
    )

    expect(result.current.paginationTotal).toBe(50)
    expect(result.current.paginatedItems).toEqual([
      { id: 1, name: 'Arsenal' },
      { id: 2, name: 'Barcelona' },
    ])
  })
})
