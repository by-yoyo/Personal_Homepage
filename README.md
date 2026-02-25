# Personal Homepage

一个现代化的个人主页项目，使用Next.js 16、React 19、TypeScript和Tailwind CSS 4构建。

## 项目概述

这是一个响应式、现代化的个人主页，展示个人资料、项目和其他信息。项目采用最新的Web技术栈，具有良好的开发体验和性能优化。

## 功能特性

- 🚀 **现代化技术栈**: 使用Next.js 16、React 19、TypeScript和Tailwind CSS 4
- 🎨 **响应式设计**: 适配各种屏幕尺寸
- 🔧 **可交互导航栏**: 支持显示/隐藏的导航栏
- 👤 **个人资料页面**: 展示个人信息
- 🔗 **GitHub集成**: 通过GitHub API获取用户信息
- 🐳 **Docker支持**: 提供完整的Docker部署方案
- ⚡ **性能优化**: 使用Next.js的静态生成和服务器端渲染
- 🛠️ **开发工具**: 集成ESLint、TypeScript等开发工具

## 技术栈

- **框架**: Next.js 16.1.6
- **UI库**: React 19.2.3
- **样式**: Tailwind CSS 4
- **语言**: TypeScript
- **构建工具**: Next.js Build System
- **代码质量**: ESLint
- **容器化**: Docker

## 项目结构

```
personal_homepage/
├── src/
│   ├── app/
│   │   ├── components/     # React组件
│   │   │   └── Navbar.tsx  # 导航栏组件
│   │   ├── profile/        # 个人资料页面
│   │   │   ├── page.tsx    # 个人资料主页面
│   │   │   ├── layout.tsx  # 个人资料布局
│   │   │   └── [子页面]/   # 个人资料子页面
│   │   ├── layout.tsx      # 根布局
│   │   ├── page.tsx        # 主页
│   │   └── globals.css     # 全局样式
│   ├── lib/
│   │   └── github.ts       # GitHub API工具
│   └── pages/
│       └── api/            # API路由
├── public/                  # 静态资源
├── Dockerfile              # Docker配置
├── next.config.ts          # Next.js配置
├── package.json            # 项目依赖
└── tsconfig.json           # TypeScript配置
```

## 快速开始

### 前提条件

- Node.js 18+ 或 Docker
- npm 或 yarn

### 安装依赖

```bash
npm install
# 或
yarn install
```

### 开发模式

```bash
npm run dev
# 或
yarn dev
```

开发服务器将在 [http://localhost:3000](http://localhost:3000) 启动。

### 构建生产版本

```bash
npm run build
# 或
yarn build
```

### 启动生产服务器

```bash
npm start
# 或
yarn start
```

## Docker部署

### 构建Docker镜像

```bash
docker build -t personal-homepage .
```

### 运行Docker容器

```bash
docker run -p 3000:3000 personal-homepage
```

### 使用Docker Compose

创建 `docker-compose.yml` 文件：

```yaml
version: '3.8'
services:
  personal-homepage:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
```

然后运行：

```bash
docker-compose up -d
```

## 配置说明

### Next.js配置 (next.config.ts)

- `output: 'standalone'`: 生成独立部署包
- `reactCompiler: true`: 启用React编译器优化
- `images.remotePatterns`: 配置远程图片域名
- `redirects`: 配置路由重定向（根路径重定向到/profile）

### GitHub API集成

项目集成了GitHub API，可以获取用户信息。在 `src/lib/github.ts` 中配置GitHub用户名。

```typescript
// 修改用户名
const response = await fetch(`https://api.github.com/users/by-yoyo`, {
  next: { revalidate: 30 }
});
```

## 开发指南

### 添加新页面

1. 在 `src/app/` 目录下创建新文件夹
2. 添加 `page.tsx` 文件作为页面组件
3. 页面将自动根据文件夹结构生成路由

### 添加新组件

1. 在 `src/app/components/` 目录下创建组件文件
2. 使用TypeScript和React函数组件
3. 在需要的地方导入使用

### 样式开发

- 使用Tailwind CSS工具类进行样式设计
- 全局样式定义在 `src/app/globals.css`
- 页面特定样式可以在页面目录中创建CSS文件

## 部署

### Vercel部署（推荐）

由于这是Next.js项目，推荐使用Vercel进行部署：

1. 将代码推送到GitHub仓库
2. 在Vercel中导入项目
3. 配置构建设置（自动检测Next.js）
4. 点击部署

### 其他平台

项目支持多种部署方式：
- **Vercel**: 原生Next.js支持
- **Netlify**: 支持Next.js
- **AWS**: 使用Amplify或EC2
- **自有服务器**: 使用Docker或Node.js直接运行

## 环境变量

创建 `.env.local` 文件添加环境变量：

```env
# GitHub API配置（可选）
GITHUB_TOKEN=your_github_token_here
```

## 脚本说明

- `npm run dev`: 启动开发服务器
- `npm run build`: 构建生产版本
- `npm start`: 启动生产服务器
- `npm run lint`: 运行代码检查

## 贡献指南

1. Fork项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建Pull Request

## 许可证

本项目采用MIT许可证。详见 [LICENSE](LICENSE) 文件。

## 联系方式

- 项目维护者: by-yoyo
- GitHub: [https://github.com/by-yoyo](https://github.com/by-yoyo)

## 更新日志

### v0.1.0
- 初始版本发布
- 基础Next.js项目结构
- 导航栏组件
- 个人资料页面
- GitHub API集成
- Docker支持
- Tailwind CSS 4集成
