// src/api/index.ts
import axios from 'axios';

// 方案 A：直接使用 import.meta.env.DEV / PROD 判断
// 开发环境：使用代理，因此 baseURL 可以留空（请求 /api/menu 会被代理到 localhost:3001）
// 生产环境：如果你的后端部署在 Netlify Functions（通过 /api 重写）或独立服务（如 Render），请替换为真实地址
const baseURL = import.meta.env.PROD
  ? 'https://self-introduction-website-server.onrender.com' // 如果你使用 Netlify Functions + 重写规则，相对路径即可
  : // : 'https://your-backend.onrender.com/api'; // 如果你用 Render 等独立后端，取消注释并替换
    '/'; // 开发环境利用 Rsbuild 代理

// 方案 B（推荐）：通过 .env 文件 + import.meta.env.PUBLIC_API_BASE_URL
// 详见后文说明
// const baseURL = import.meta.env.PUBLIC_API_BASE_URL;

const request = axios.create({
  baseURL,
  timeout: 10000,
});

// 可选：添加请求/响应拦截器
request.interceptors.response.use(
  (response) => response, // 可自定返回的数据结构
  (error) => Promise.reject(error),
);

// 定义菜单数据的类型（根据后端返回结构）
export interface MenuItem {
  key: string;
  icon?: string;
  label: string;
  children?: MenuItem[];
}

// 获取菜单数据
export const fetchMenu = (): Promise<MenuItem[]> => {
  return request.get('/api/menu'); // 最终请求地址 = baseURL + '/menu'
};
