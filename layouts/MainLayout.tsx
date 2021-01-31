import Link from 'next/link'
import { useRouter } from 'next/router'
import './MainLayout.less'

import { Layout, Menu } from 'antd'
import { LogoutOutlined, DashboardOutlined } from '@ant-design/icons'
import fetch from '../lib/fetch'
import { useEffect, useState } from 'react'

const { Content, Sider } = Layout

interface LayoutProps {
  children: any
  user: any
}

interface SideBartProps {
  user: any
  onSideBarCollapse: any
}

const SideBar: React.FC<SideBartProps> = ({ user, onSideBarCollapse }) => {
  const router = useRouter()

  // const logout = async (): Promise<void> => {
  const logout = async (): Promise<void> => {
    await fetch('/auth/logout', { method: 'POST' })
    router.replace('/login')
  }

  return (
    <Sider
      width="232"
      style={{
        // overflow: 'auto',
        // left: 0,
        height: '100vh',
        position: 'fixed',
        background: !user ? null : 'linear-gradient(180deg, #8E2DE2 0%, #4A00E0 100%)',
      }}
      breakpoint="lg"
      collapsedWidth="0"
      onCollapse={(collapsed) => {
        onSideBarCollapse(collapsed)
      }}
    >
      <div className="logo">
        <Link href="/">
          <a>Dive</a>
        </Link>
      </div>

      {user && (
        <div className="menu">
          <Menu theme="dark" selectedKeys={[router.pathname]} mode="inline">
            <Menu.Item key="/" icon={<DashboardOutlined />}>
              <Link href="/">
                <a>Dashboard</a>
              </Link>
            </Menu.Item>
          </Menu>

          <Menu theme="dark" selectedKeys={[router.pathname]} mode="inline" className="menu-extra">
            <Menu.Item key="/logout" icon={<LogoutOutlined />} onClick={logout}>
              Logout {user.email}
            </Menu.Item>
          </Menu>
        </div>
      )}
    </Sider>
  )
}

const MainLayout: React.FC<LayoutProps> = ({ children, user }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(null)
  const [addMarginToContent, setAddMarginToContent] = useState(null)

  useEffect(() => {
    setAddMarginToContent(user && !sidebarCollapsed)
  }, [user, sidebarCollapsed])

  const onSidebarCollapse = (collapsed): void => {
    setSidebarCollapsed(collapsed)
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* {user && sideBar(user)} */}
      <SideBar user={user} onSideBarCollapse={onSidebarCollapse} />

      <Layout className="site-layout" style={{ marginLeft: addMarginToContent ? 232 : 0 }}>
        {/* <Header className="site-layout-background" style={{ padding: 0 }} /> */}

        <Content>
          <div className="site-layout-background" style={{ padding: '22px 75px', minHeight: 360 }}>
            {children}
          </div>
        </Content>

        {/* <Footer style={{ textAlign: 'center' }}>
          Dive Analytics ©2020 Created by Dive Analytics
        </Footer> */}
      </Layout>
    </Layout>
  )
}

export default MainLayout
