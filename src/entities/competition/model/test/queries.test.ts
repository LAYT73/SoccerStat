import { beforeEach, describe, expect, it, vi } from 'vitest'

import { competitionsQueryOptions, useCompetitions } from '../queries'
import { competitionQueryKeys } from '../queryKeys'

const { getCompetitionsMock, queryOptionsMock, useQueryMock } = vi.hoisted(() => ({
  getCompetitionsMock: vi.fn(),
  queryOptionsMock: vi.fn(<T>(options: T) => options),
  useQueryMock: vi.fn((options: unknown) => options),
}))

vi.mock('@tanstack/react-query', () => ({
  queryOptions: queryOptionsMock,
  useQuery: useQueryMock,
}))

vi.mock('../../api/competition.api', () => ({
  getCompetitions: getCompetitionsMock,
}))

describe('competition queries', () => {
  beforeEach(() => {
    queryOptionsMock.mockClear()
    useQueryMock.mockClear()
    getCompetitionsMock.mockReset()
  })

  it('builds competitions query options', async () => {
    getCompetitionsMock.mockResolvedValueOnce({ count: 0, competitions: [] })

    const options = competitionsQueryOptions()

    expect(options.queryKey).toEqual(competitionQueryKeys.list())
    expect(options.staleTime).toBe(5 * 60 * 1000)

    expect(options.queryFn).toBeDefined()
    await options.queryFn?.({} as never)

    expect(getCompetitionsMock).toHaveBeenCalled()
  })

  it('calls useQuery with list query options in useCompetitions', () => {
    useCompetitions()

    expect(useQueryMock).toHaveBeenCalledWith(
      expect.objectContaining({ queryKey: competitionQueryKeys.list() }),
    )
  })
})
