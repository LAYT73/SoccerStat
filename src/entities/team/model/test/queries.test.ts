import { beforeEach, describe, expect, it, vi } from 'vitest'

import { teamDetailQueryOptions, teamsQueryOptions, useTeam, useTeams } from '../queries'
import { teamQueryKeys } from '../queryKeys'

const { getTeamByIdMock, getTeamsMock, queryOptionsMock, useQueryMock } = vi.hoisted(
  () => ({
    getTeamByIdMock: vi.fn(),
    getTeamsMock: vi.fn(),
    queryOptionsMock: vi.fn(<T>(options: T) => options),
    useQueryMock: vi.fn((options: unknown) => options),
  }),
)

vi.mock('@tanstack/react-query', () => ({
  queryOptions: queryOptionsMock,
  useQuery: useQueryMock,
}))

vi.mock('../../api/team.api', () => ({
  getTeamById: getTeamByIdMock,
  getTeams: getTeamsMock,
}))

describe('team queries', () => {
  beforeEach(() => {
    queryOptionsMock.mockClear()
    useQueryMock.mockClear()
    getTeamByIdMock.mockReset()
    getTeamsMock.mockReset()
  })

  it('builds teams query options', async () => {
    getTeamsMock.mockResolvedValueOnce({ count: 0, teams: [] })

    const options = teamsQueryOptions()

    expect(options.queryKey).toEqual(teamQueryKeys.list())
    expect(options.staleTime).toBe(5 * 60 * 1000)

    expect(options.queryFn).toBeDefined()
    await options.queryFn?.({} as never)

    expect(getTeamsMock).toHaveBeenCalled()
  })

  it('builds team detail query options', async () => {
    getTeamByIdMock.mockResolvedValueOnce({ id: 57 })

    const options = teamDetailQueryOptions(57)

    expect(options.queryKey).toEqual(teamQueryKeys.detail(57))
    expect(options.staleTime).toBe(5 * 60 * 1000)

    expect(options.queryFn).toBeDefined()
    await options.queryFn?.({} as never)

    expect(getTeamByIdMock).toHaveBeenCalledWith(57)
  })

  it('calls useQuery with list query options in useTeams', () => {
    useTeams()

    expect(useQueryMock).toHaveBeenCalledWith(
      expect.objectContaining({ queryKey: teamQueryKeys.list() }),
    )
  })

  it('calls useQuery with enabled detail query in useTeam', () => {
    useTeam(57)

    expect(useQueryMock).toHaveBeenCalledWith(
      expect.objectContaining({
        enabled: true,
        queryKey: teamQueryKeys.detail(57),
      }),
    )
  })

  it('disables detail query when team id is missing', () => {
    useTeam(undefined)

    expect(useQueryMock).toHaveBeenCalledWith(
      expect.objectContaining({
        enabled: false,
        queryKey: teamQueryKeys.detail(0),
      }),
    )
  })
})
