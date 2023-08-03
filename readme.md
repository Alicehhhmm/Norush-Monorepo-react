这是一个基于webpack、pnpm、React 的Monorepo架构包管理案例。
内含开发中常见的相关配置，如Babel,tailwind,TypeScript 等基础配置

# 📦installation 
```javascript
pnpm install
pnpm start 
// or
pnpm run start
```

# 💻add package
- 子包第三方包安装过滤例子 
> pnpm add  [第三方包] -D --filter  [对应子包名称]
```javascript
pnpm add webpack-dev-server -D --filter @norush/react.temp 
```

