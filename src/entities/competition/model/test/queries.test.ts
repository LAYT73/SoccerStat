import { beforeEach, describe, expect, it, vi } from 'vitest'

import {
  competitionDetailQueryOptions,
  competitionsQueryOptions,
  useCompetition,
  useCompetitions,
} from '../queries'
import { competitionQueryKeys } from '../queryKeys'

const { getCompetitionByIdMock, getCompetitionsMock, queryOptionsMock, useQueryMock } =
  vi.hoisted(() => ({
    getCompetitionByIdMock: vi.fn(),
    getCompetitionsMock: vi.fn(),
    queryOptionsMock: vi.fn(<T>(options: T) => options),
    useQueryMock: vi.fn((options: unknown) => options),
  }))

vi.mock('@tanstack/react-query', () => ({
  queryOptions: queryOptionsMock,
  useQuery: useQueryMock,
}))

vi.mock('../../api/competition.api', () => ({
  getCompetitionById: getCompetitionByIdMock,
  getCompetitions: getCompetitionsMock,
}))

describe('competition queries', () => {
  beforeEach(() => {
    queryOptionsMock.mockClear()
    useQueryMock.mockClear()
    getCompetitionByIdMock.mockReset()
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

  it('builds competition detail query options', async () => {
    getCompetitionByIdMock.mockResolvedValueOnce({ id: 2013 })

    const options = competitionDetailQueryOptions(2013)

    expect(options.queryKey).toEqual(competitionQueryKeys.detail(2013))
    expect(options.staleTime).toBe(5 * 60 * 1000)

    expect(options.queryFn).toBeDefined()
    await options.queryFn?.({} as never)

    expect(getCompetitionByIdMock).toHaveBeenCalledWith(2013)
  })

  it('calls useQuery with list query options in useCompetitions', () => {
    useCompetitions()

    expect(useQueryMock).toHaveBeenCalledWith(
      expect.objectContaining({ queryKey: competitionQueryKeys.list() }),
    )
  })

  it('calls useQuery with enabled detail query in useCompetition', () => {
    useCompetition(2013)

    expect(useQueryMock).toHaveBeenCalledWith(
      expect.objectContaining({
        enabled: true,
        queryKey: competitionQueryKeys.detail(2013),
      }),
    )
  })

  it('disables detail query when competition id is missing', () => {
    useCompetition(undefined)

    expect(useQueryMock).toHaveBeenCalledWith(
      expect.objectContaining({
        enabled: false,
        queryKey: competitionQueryKeys.detail(0),
      }),
    )
  })
})
