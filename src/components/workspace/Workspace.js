import React from 'react';
import Layout, { Header, Footer, Content, Sider } from 'antd/lib/layout';
import Menu from 'antd/lib/menu';
import Icon from 'antd/lib/icon';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

const Workspace = () => {
  return (
    <Layout style={{ height: '100%' }}>
      <Header
        style={{
          backgroundColor: '#F4F4F4',
          color: '#1faeff',
          fontSize: '15px' }}
      >
        DPE Dashboard
      </Header>
      <Layout>
        <Sider>
          <Menu
            onClick={this.handleClick}
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode="inline"
          >
            <SubMenu key="sub1" title={<span><Icon type="solution" /><span>Proyek</span></span>}>
              <Menu.Item key="1">Daftar Proyek</Menu.Item>
              <Menu.Item key="2">Progress Proyek</Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" title={<span><Icon type="setting" /><span>Settings</span></span>}>
              <Menu.Item key="3">User</Menu.Item>
              <Menu.Item key="4">Role</Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Content>Content</Content>
      </Layout>
      <Footer>&copy; WIKA DPE 2018</Footer>
    </Layout>
  );
};

export default Workspace;
