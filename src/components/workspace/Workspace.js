import React from 'react';
import Layout, { Header, Footer, Content, Sider } from 'antd/lib/layout';
import Menu from 'antd/lib/menu';
import Icon from 'antd/lib/icon';
import { Link } from 'react-router-dom';

const SubMenu = Menu.SubMenu;

const Workspace = ({ children }) => {
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
        <Sider style={{ backgroundColor: '#FFF' }}>
          <Menu
            onClick={this.handleClick}
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1', 'sub2', 'sub3']}
            mode="inline"
            style={{ height: '100%' }}
          >
            <SubMenu key="sub1" title={<span><Icon type="solution" /><span>Proyek</span></span>}>
              <Menu.Item key="1"><Link to="/projects">Daftar Proyek</Link></Menu.Item>
              <Menu.Item key="2"><Link to="/projectprogresses">Progress Proyek</Link></Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" title={<span><Icon type="solution" /><span>Finance</span></span>}>
              <Menu.Item key="3"><Link to="/piutangs">Piutang</Link></Menu.Item>
              <Menu.Item key="4"><Link to="/projections">Proyeksi</Link></Menu.Item>
            </SubMenu>
            <SubMenu key="sub3" title={<span><Icon type="setting" /><span>Settings</span></span>}>
              <Menu.Item key="5"><Link to="/users">User</Link></Menu.Item>
              <Menu.Item key="6"><Link to="/roles">Role</Link></Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Content style={{ backgroundColor: '#FFF' }}>{children}</Content>
      </Layout>
      <Footer>&copy; WIKA DPE 2018</Footer>
    </Layout>
  );
};

export default Workspace;
