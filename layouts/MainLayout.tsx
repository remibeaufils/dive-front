import Link from 'next/link'
import { useRouter } from 'next/router'
import "./MainLayout.less";

import { Layout, Menu, Breadcrumb } from 'antd';
import {
  LogoutOutlined,
  PlusCircleOutlined,
  DashboardOutlined,
} from '@ant-design/icons';
import fetch from '../lib/fetch';

const { Header, Content, Footer, Sider } = Layout;

interface Props {
  children: any;
  user: any;
}

const sideBar = user => {
  const router = useRouter();

  const logout = async () => {
    await fetch('/auth/logout', { method: 'POST' });
    router.replace('/login');
  };

  return <Sider width="232" style={{
    overflow: 'auto',
    height: '100vh',
    position: 'fixed',
    left: 0,
    background: !user ? null : 'linear-gradient(180deg, #8E2DE2 0%, #4A00E0 100%)',
  }}>
    <div className="logo">
      <Link href="/">
        <a>Dive</a>
      </Link>
    </div>

    { user && <div className="menu">
      <Menu theme="dark" selectedKeys={[router.pathname]} mode="inline">
        <Menu.Item key="/" icon={<DashboardOutlined />}>
          <Link href="/">
            <a>Dashboard</a>
          </Link>
        </Menu.Item>

        {/* <Menu.Item key="/index-sdui" icon={<PieChartOutlined />}>
          <Link href="/dashboard-sdui">
            <a>Dashboard SDUI</a>
          </Link>
        </Menu.Item> */}     

        {/* <Menu.Item key="/connectors" icon={<PlusCircleOutlined />}>
          <Link href="/connectors">
            <a>Connectors</a>
          </Link>
        </Menu.Item>    */}
      </Menu>

      <Menu theme="dark" selectedKeys={[router.pathname]} mode="inline" className="menu-extra">
        <Menu.Item key="/logout" icon={<LogoutOutlined/>} onClick={logout}>
          Logout {user.email}
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
            style={{ padding: '22px 75px', minHeight: 360 }}>
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
