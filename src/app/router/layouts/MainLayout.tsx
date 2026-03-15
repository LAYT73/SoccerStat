import { Layout } from 'antd'
import { Outlet } from 'react-router-dom'

import { Container } from '@/shared/ui'
import { Header } from '@/widgets'

const { Content } = Layout

const MainLayout = () => {
  return (
    <Layout className="min-h-screen flex flex-col">
      <Header />
      <Content className="flex-1 p-6 min-h-[calc(100vh-64px)]!">
        <Container className="flex-1 flex flex-col">
          <Outlet />
        </Container>
      </Content>
    </Layout>
  )
}

export default MainLayout
