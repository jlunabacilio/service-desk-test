import { ConfigProvider, theme, Layout } from 'antd';
import { createRootRoute, Outlet } from '@tanstack/react-router';

const { Header, Content } = Layout;

export const Route = createRootRoute({
  component: Root,
});

function Root() {
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.defaultAlgorithm,
        token: {
          colorPrimary: '#1677ff',
          borderRadius: 6,
        },
      }}
    >
      <Layout style={{ minHeight: '100vh' }}>
        <Header style={{ display: 'flex', alignItems: 'center' }}>
          <span style={{ color: '#fff', fontSize: 18, fontWeight: 600 }}>
            Service Desk
          </span>
        </Header>
        <Content style={{ padding: '24px 48px' }}>
          <Outlet />
        </Content>
      </Layout>
    </ConfigProvider>
  );
}
