import { Alert, Pagination, Spin } from 'antd'
import { useNavigate } from 'react-router-dom'

import { CompetitionGrid } from '@/entities/competition'
import { CompetitionSearchInput } from '@/features/competition-search'

import { useCompetitionsPage } from '../model/useCompetitionsPage'

const CompetitionsPage = () => {
  const navigate = useNavigate()

  const {
    searchValue,
    page,
    pageSize,
    paginationTotal,
    paginatedCompetitions,
    isLoading,
    isError,
    error,
    handleSearchChange,
    handlePageChange,
  } = useCompetitionsPage()

  const openCompetitionCalendar = (competitionId: number) => {
    navigate(`/competition/${competitionId}`)
  }

  return (
    <section className="w-full flex flex-col gap-6">
      <CompetitionSearchInput value={searchValue} onChange={handleSearchChange} />

      {isError && (
        <Alert
          type="error"
          showIcon
          title="Не удалось загрузить лиги"
          description={error instanceof Error ? error.message : undefined}
        />
      )}

      {isLoading ? (
        <div className="w-full py-20 flex justify-center">
          <Spin size="large" />
        </div>
      ) : (
        <CompetitionGrid
          competitions={paginatedCompetitions}
          onOpenCompetition={openCompetitionCalendar}
        />
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

export default CompetitionsPage
