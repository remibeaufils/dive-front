import Link from 'next/link'
import { useRouter } from 'next/router'
import "./MainLayout.less";

import { Layout, Menu, Breadcrumb } from 'antd';
import {
  DesktopOutlined,
  PieChartOutlined,
  LogoutOutlined,
  SafetyOutlined,
  EyeOutlined,
  InfoOutlined,
  LoginOutlined,
} from '@ant-design/icons';
import fetch from '../lib/fetch';
import { withAuth } from '../lib/withAuth';
import { GetServerSidePropsContext } from 'next';

const { Header, Content, Footer, Sider } = Layout;

interface Props {
  children: any;
  user: any;
}

const sideBar = user => {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch('/auth/logout', { method: 'POST' });
    router.replace('/login');
  };

  return <Sider width="232" style={{
    overflow: 'auto',
    height: '100vh',
    position: 'fixed',
    left: 0,
    backgroundColor: user ? null : 'inherit'
  }}>
    <div className="logo">
      <Link href="/">
        <a>Dive</a>
      </Link>
    </div>

    { user && <div className="menu">
      <Menu theme="dark" selectedKeys={[router.pathname]} mode="inline">
        {/* <Menu.Item key="/private" icon={<SafetyOutlined />}>
          <Link href="/private">
            <a>Private</a>
          </Link>
        </Menu.Item>
        <Menu.Item key="/about" icon={<InfoOutlined />}>
          <Link href="/about">
            <a>About</a>
          </Link>
        </Menu.Item> */}
        <Menu.Item key="/dashboard" icon={<PieChartOutlined />}>
          <Link href="/dashboard">
            <a>Dashboard</a>
          </Link>
        </Menu.Item>
        {/* <Menu.Item key="/dashboard-sdui" icon={<PieChartOutlined />}>
          <Link href="/dashboard-sdui">
            <a>Dashboard SDUI</a>
          </Link>
        </Menu.Item>
        <Menu.Item key="/activity" icon={<DesktopOutlined />}>
          <Link href="/activity">
            <a>Activity Tracking</a>
          </Link>
        </Menu.Item> */}
        {/* <Menu.Item key="/login" icon={<LoginOutlined />}>
          <Link href="/login">
            <a>Login</a>
          </Link>
        </Menu.Item> */}
        
      </Menu>

      <Menu theme="dark" selectedKeys={[router.pathname]} mode="inline" className="menu-extra">
        {/* <Menu.Item key="/about" icon={<InfoOutlined />}>
          <Link href="/about">
            <a>About</a>
          </Link>
        </Menu.Item> */}
        <Menu.Item key="/logout" icon={<LogoutOutlined />}>
          <span onClick={handleLogout}>Logout {user.email}</span>
        </Menu.Item>
      </Menu>
    </div> }
  </Sider>;
};

const MainLayout = ({ children, user }: Props) => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* {user && sideBar(user)} */}
      { sideBar(user) }

      <Layout className="site-layout" style={{ marginLeft: user ? 232 : 0 }}>
        {/* <Header className="site-layout-background" style={{ padding: 0 }} /> */}
        
        <Content>
          {/* <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb> */}
          
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 360 }}>
            {children}
          </div>
        </Content>
        
        {/* <Footer style={{ textAlign: 'center' }}>
          Dive Analytics ©2020 Created by Dive Analytics
        </Footer> */}
      </Layout>
    </Layout>
  );
}

export default MainLayout
