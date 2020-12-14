// import App from 'next/app'

import Link from 'next/link'
import { useRouter } from 'next/router'
import "./MainLayout.less";

import type { AppProps /*, AppContext */ } from 'next/app'
import { Layout, Menu, Breadcrumb } from 'antd';
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';

const { Header, Content, Footer, Sider } = Layout;

function MainLayout({ children }) {
  const router = useRouter()
  
  return (<Layout style={{ minHeight: '100vh' }}>
    <Sider width="232">
      <div className="logo">
        Dive
      </div>
      <Menu theme="dark" selectedKeys={[router.pathname]} mode="inline">
        <Menu.Item key="/dashboard" icon={<PieChartOutlined />}>
          <Link href="/dashboard">
            <a>Dashboard</a>
          </Link>
        </Menu.Item>
        <Menu.Item key="/activity" icon={<DesktopOutlined />}>
          <Link href="/activity">
            <a>Activity Tracking</a>
          </Link>
        </Menu.Item>
        <Menu.Item key="/store-intelligence" icon={<FileOutlined />}>
          <Link href="/store-intelligence">
            <a>Store Intelligence</a>
          </Link>
        </Menu.Item>
      </Menu>
    </Sider>

    <Layout className="site-layout">
      {/* <Header className="site-layout-background" style={{ padding: 0 }} /> */}
      
      <Content style={{ margin: '0 16px' }}>
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
      
      <Footer style={{ textAlign: 'center' }}>
        Dive Analytics ©2020 Created by Dive Analytics
      </Footer>
    </Layout>
  </Layout>);
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);
//
//   return { ...appProps }
// }

export default MainLayout
