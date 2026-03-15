import { Layout, Menu } from 'antd'
import { useNavigate, useLocation } from 'react-router-dom'

import Logo from '@/shared/assets/fifa_logo.svg?react'
import { HEADER_URLS } from '@/shared/consts/header-urls'
import Container from '@/shared/ui/Container/Container'

import type { MenuProps } from 'antd'

const AntHeader = Layout.Header

type MenuItem = Required<MenuProps>['items'][number]

const Header = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const handleClick: MenuProps['onClick'] = (e) => {
    navigate(e.key)
  }

  const selectedKeys = [location.pathname]

  return (
    <AntHeader className="bg-white! border-b border-gray-200 px-0">
      <Container className="flex items-center gap-6">
        <Logo width={80} aria-label="FIFA Logo" />
        <Menu
          mode="horizontal"
          items={HEADER_URLS as MenuItem[]}
          selectedKeys={selectedKeys}
          onClick={handleClick}
          className="flex-1 border-b-0"
        />
      </Container>
    </AntHeader>
  )
}

export default Header
