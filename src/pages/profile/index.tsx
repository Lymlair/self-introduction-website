import React, { useState, useEffect } from 'react';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import BaseInfo from '../../components/BaseInfo';
import Career from '../../components/Career';
import styles from './index.module.scss';

const items: TabsProps['items'] = [
  {
    key: '1',
    label: '学历信息',
    children: <BaseInfo />,
  },
  {
    key: '2',
    label: '就职经历',
    children: <Career />,
  },
  {
    key: '3',
    label: 'Tab 3',
    children: 'Content of Tab Pane 3',
  },
];

const Profile = () => {
  return (
    <div className={styles.profileContainer}>
      <div className={styles.header}>
        <h1>Hello，欢迎来到我的个人主页</h1>
        <h2>
          通过我的个人页面，你可以了解我的基本信息、技能和项目经验等内容。希望你能喜欢我的个人主页，并且对我有更深入的了解！
        </h2>
      </div>
      <div className="profile-header">
        <Tabs defaultActiveKey="1" items={items} />
      </div>
    </div>
  );
};

export default Profile;
