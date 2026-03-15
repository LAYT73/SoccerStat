import { Button, Card, Space, Typography } from 'antd'
import { Link } from 'react-router-dom'

import { APP_ROUTES } from '@/shared/consts/routes'
import { Container } from '@/shared/ui'

const { Paragraph, Text, Title } = Typography

const NotFoundPage = () => {
  return (
    <Container className="flex min-h-[calc(100vh-160px)] items-center justify-center py-8">
      <Card
        className="w-full max-w-2xl rounded-3xl border-gray-200 shadow-sm"
        variant="outlined"
      >
        <Space direction="vertical" size={20} className="w-full text-center">
          <Text className="text-xs font-semibold uppercase tracking-[0.32em] text-gray-500">
            SoccerStat
          </Text>

          <div className="space-y-3">
            <Title level={1} className="!mb-0 !text-5xl sm:!text-6xl">
              404
            </Title>
            <Title level={3} className="!mb-0">
              Страница не найдена
            </Title>
            <Paragraph className="!mb-0 text-base text-gray-600">
              Возможно, ссылка устарела или страница была перемещена. Вернитесь к списку
              лиг или откройте раздел с командами.
            </Paragraph>
          </div>

          <Space size={12} wrap className="justify-center">
            <Button type="primary">
              <Link to={APP_ROUTES.competitions.path}>
                {APP_ROUTES.competitions.label}
              </Link>
            </Button>
            <Button>
              <Link to={APP_ROUTES.teams.path}>{APP_ROUTES.teams.label}</Link>
            </Button>
          </Space>
        </Space>
      </Card>
    </Container>
  )
}

export default NotFoundPage
