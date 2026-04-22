import React from 'react';
import { Space, Table, Card } from 'antd';
import type { TableProps } from 'antd';
import DiceRoller from '../DiceRoller';
import styles from './index.module.scss';

interface DataType {
  key: string;
  name: string;
  number: number;
  score: string;
  link?: string;
}

const { Meta } = Card;

const courseDesc: Record<string, string> = {
  '1': '从物理层到应用层，理解数据如何通过网络传输。核心是TCP/IP协议栈：IP负责路由寻址，TCP保证可靠传输（三次握手、拥塞控制），HTTP、DNS等应用协议支撑起互联网。重点掌握：分层模型、子网划分、滑动窗口、路由算法。学完后你能明白“为什么浏览器输入网址就能打开网页”。',
  '2': '数据结构是计算机科学的基石，学习如何高效组织和存储数据。核心内容包括：线性表（数组、链表）、树（二叉树、平衡树）、图（邻接矩阵、邻接表）、哈希表等。重点掌握：时间复杂度分析、递归与迭代、常用算法（排序、搜索）。学完后你能理解“为什么有些算法比其他算法更快”。',
  '3': '计算机组成原理揭示了计算机的内部结构和工作原理。核心内容包括：指令系统、数据通路、控制单元、存储系统等。重点掌握：指令执行周期、流水线技术、缓存机制。学完后你能理解“CPU是如何执行指令的”。',
  '4': '操作系统是管理计算机硬件和软件资源的程序。核心内容包括：进程管理（调度算法、死锁）、内存管理（分页、分段）、文件系统（目录结构、权限）。重点掌握：多线程编程、虚拟内存机制。学完后你能理解“为什么操作系统需要管理资源”。',
  '5': '离散数学是计算机科学的数学基础，涵盖逻辑、集合论、图论等内容。核心内容包括：命题逻辑、谓词逻辑、集合运算、图的遍历算法等。重点掌握：证明方法（归纳法、反证法）、组合数学。学完后你能理解“为什么计算机科学需要数学”。',
  '6': 'C语言是一种通用的编程语言，广泛用于系统编程和嵌入式开发。核心内容包括：基本语法（变量、数据类型、控制结构）、函数、指针、内存管理等。重点掌握：指针运算、动态内存分配、文件操作。学完后你能理解“为什么C语言被称为‘接近硬件的语言’”。',
};
const columns: TableProps<DataType>['columns'] = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Number',
    dataIndex: 'number',
    key: 'number',
  },
  {
    title: '成绩',
    dataIndex: 'score',
    key: 'score',
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space
        size="middle"
        style={{ display: 'flex', justifyContent: 'space-around' }}
      >
        <a
          style={{ display: 'inline-block', width: 320 }}
          target="_blank"
          href={record.link}
        >
          我倒要看看这门课怎么个事儿😁
        </a>
        <a style={{ flex: 1 }}>算了算了看着脑壳晕，把这门课给我删了😵‍💫</a>
      </Space>
    ),
  },
];
const data: DataType[] = [
  {
    key: '1',
    name: '《计算机网络》',
    number: 1,
    score: '作为一班之长，努力学习，天天向上，最后61分飘过~',
    link: 'https://weread.qq.com/web/reader/af532c005a007caf51371b1kc81322c012c81e728d9d180',
  },
  {
    key: '2',
    name: '《数据结构》',
    number: 2,
    score: 'London No. 1 Lake Park',
    link: 'https://www.bilibili.com/video/av22258871/?vd_source=d17ba4e044dffc3b7236a0e7ec5b4f0b',
  },
  {
    key: '3',
    name: '《计算机组成原理》',
    number: 3,
    score: 'Sydney No. 1 Lake Park',
    link: 'https://www.bilibili.com/video/BV1ng37zfEg5/?vd_source=d17ba4e044dffc3b7236a0e7ec5b4f0b',
  },
  {
    key: '4',
    name: '《操作系统》',
    number: 4,
    score: 'New York No. 1 Lake Park',
    link: 'https://weread.qq.com/web/reader/db8329d071cc7f70db8a479',
  },
  {
    key: '5',
    name: '《离散数学》',
    number: 5,
    score: 'London No. 1 Lake Park',
    link: 'https://www.bilibili.com/video/BV13FQoB3EMW/?vd_source=d17ba4e044dffc3b7236a0e7ec5b4f0b',
  },
  {
    key: '6',
    name: '《C语言》',
    number: 6,
    score: 'Sydney No. 1 Lake Park',
    link: 'https://www.runoob.com/cprogramming/c-tutorial.html',
  },
];
const BaseInfo: React.FC = () => {
  const [randomVal, setRandomVal] = React.useState(1);

  return (
    <div className={styles.baseInfo}>
      <div className={styles.school}>
        <a
          href="https://www.swpu.edu.cn/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Card
            hoverable
            style={{ width: 240 }}
            cover={
              <img
                style={{ padding: '8px' }}
                draggable={false}
                alt="example"
                src="https://ts3.tc.mm.bing.net/th/id/OIP-C.N5y-zlrGP6-oU9LIO8SgwgHaHY?rs=1&pid=ImgDetMain&o=7&rm=3"
              />
            }
          >
            <Meta
              title="毕业院校：西南石油大学"
              description="https://www.swpu.edu.cn/"
            />
          </Card>
        </a>
        <div className={styles.intro}>
          <p>
            本人于2018年6月毕业于西南石油大学计算机与软件学院，主修
            <a
              href="https://www.swpu.edu.cn/scs/info/1234/5197.htm"
              target="_blank"
              rel="noopener noreferrer"
            >
              网络工程
            </a>
            专业。专业主修《计算机网络》、《数据结构》、《计算机组成原理》、《操作系统》、《离散数学》、C语言、Java
            等课程，顺利通过各项专业考试，并取得学士学位。大学期间积极参与各类学术活动和项目实践，积累了丰富的计算机网络相关知识和技能，为后续的职业发展奠定了坚实的基础。
          </p>
        </div>
      </div>
      <div className={styles.course}>
        <p className={styles.courseIntro}>
          好了，上面只是一些官方客套的介绍，你肯定还对我的专业课程感兴趣！想了解我们在大学里都学什么东西吗，那就继续往下看吧
          ：）
        </p>
        <div className={styles.gameIntro}>
          这是一个骰子小游戏，点击按钮即可投掷，我们有一个表格可以将骰子的点数和我们的课程对应起来，当你投掷出某个点数时，就能看到对应的课程介绍啦。
        </div>
        <Table<DataType>
          columns={columns}
          dataSource={data}
          pagination={false}
        />
        <div className={styles.diceSection}>
          <DiceRoller setRandomVal={setRandomVal} />
          <div className={styles.courseDesc}>
            {courseDesc[randomVal.toString()]}
            {`（当前点数：${randomVal}）`}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BaseInfo;
