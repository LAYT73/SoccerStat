import { Alert, Pagination, Spin } from 'antd'
import { useNavigate } from 'react-router-dom'

import { TeamGrid } from '@/entities/team'
import { EntitySearchInput } from '@/features/entity-search'
import { APP_ROUTES } from '@/shared/consts/routes'

import { useTeamsPage } from '../model/useTeamsPage'

const TeamsPage = () => {
  const navigate = useNavigate()

  const {
    searchValue,
    page,
    pageSize,
    paginationTotal,
    paginatedTeams,
    isLoading,
    isError,
    error,
    handleSearchChange,
    handlePageChange,
  } = useTeamsPage()

  const openTeamPage = (teamId: number) => {
    navigate(APP_ROUTES.teamCalendar.getPath(teamId))
  }

  return (
    <section className="w-full flex flex-col gap-6">
      <EntitySearchInput
        value={searchValue}
        onChange={handleSearchChange}
        placeholder="Поиск по названию команды"
      />

      {isError && (
        <Alert
          type="error"
          showIcon
          title="Не удалось загрузить команды"
          description={error instanceof Error ? error.message : undefined}
        />
      )}

      {isLoading ? (
        <div className="w-full py-20 flex justify-center">
          <Spin size="large" />
        </div>
      ) : (
        <TeamGrid teams={paginatedTeams} onOpenTeam={openTeamPage} />
      )}

      <div className="w-full flex justify-center pt-2">
        <Pagination
          current={page}
          total={paginationTotal}
          pageSize={pageSize}
          showSizeChanger={false}
          onChange={handlePageChange}
        />
      </div>
    </section>
  )
}

export default TeamsPage
