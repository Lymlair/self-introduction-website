import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Layout, Button, Menu, Spin } from 'antd';
import axios from 'axios';

import type { MenuProps } from 'antd';
import * as Icons from '@ant-design/icons';
import './App.css';

import Profile from './pages/profile';
const { Sider, Content } = Layout;

const contentStyle: React.CSSProperties = {
  textAlign: 'center',
  minHeight: 120,
  lineHeight: '120px',
  color: '#fff',
};

const siderStyle: React.CSSProperties = {
  textAlign: 'center',
  lineHeight: '120px',
  color: '#fff',
};

const layoutStyle = {
  borderRadius: 8,
  overflow: 'hidden',
};

const iconMap: Record<string, React.ComponentType> = {
  PieChartOutlined: Icons.PieChartOutlined,
  DesktopOutlined: Icons.DesktopOutlined,
  ContainerOutlined: Icons.ContainerOutlined,
  MailOutlined: Icons.MailOutlined,
  AppstoreOutlined: Icons.AppstoreOutlined,
  MenuFoldOutlined: Icons.MenuFoldOutlined,
  MenuUnfoldOutlined: Icons.MenuUnfoldOutlined,
};

// 递归转换后端菜单数据，将 icon 字符串替换为图标组件
const transformMenuItems = (items: any[]): MenuProps['items'] => {
  return items.map((item) => {
    const newItem: any = { ...item };
    if (item.icon && iconMap[item.icon]) {
      newItem.icon = React.createElement(iconMap[item.icon]);
    }
    if (item.children) {
      newItem.children = transformMenuItems(item.children);
    }
    return newItem;
  });
};

const keyToPath: Record<string, string> = {
  '1': '/profile',
  '2': '/profile',
};

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState(['1']);
  const [menuItems, setMenuItems] = useState<MenuProps['items']>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // 请求后端菜单数据
    axios
      .get('/api/menu')
      .then((response) => {
        const transformed = transformMenuItems(response.data);
        setMenuItems(transformed);
      })
      .catch((error) => {
        console.error('Failed to load menu:', error);
        // 可设置 fallback 静态数据
      })
      .finally(() => setLoading(false));
  }, []);

  const toggleCollapsed = () => setCollapsed(!collapsed);

  // 处理菜单点击：根据 key 跳转路由
  const handleMenuClick: MenuProps['onClick'] = ({ key }) => {
    const path = keyToPath[key];
    setSelectedKey([key]);
    if (path) {
      navigate(path);
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', marginTop: 50 }}>
        <Spin />
      </div>
    );
  }

  return (
    <div className="content">
      <Layout style={layoutStyle}>
        <Sider style={siderStyle}>
          <Button
            type="primary"
            onClick={toggleCollapsed}
            style={{ marginBottom: 16 }}
          >
            {collapsed ? (
              <Icons.MenuUnfoldOutlined />
            ) : (
              <Icons.MenuFoldOutlined />
            )}
          </Button>
          <Menu
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode="inline"
            theme="dark"
            inlineCollapsed={collapsed}
            items={menuItems}
            onClick={handleMenuClick}
            selectedKeys={selectedKey}
          />
        </Sider>
        <Layout>
          <Content style={contentStyle}>
            <Routes>
              <Route path="/profile" element={<Profile />} />
              {/* 其他路由 */}
              <Route path="*" element={<div>404</div>} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default App;
