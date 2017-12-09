import React from 'react';
import Layout, { Header, Footer, Content, Sider } from 'antd/lib/layout';

const Workspace = () => {
  return (
    <Layout>
      <Header>Header</Header>
      <Layout>
        <Sider>Sider</Sider>
        <Content>Content</Content>
      </Layout>
      <Footer>Footer</Footer>
    </Layout>
  );
};

export default Workspace;
