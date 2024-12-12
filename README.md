<p align="left">
  这是一个基于Webpack、pnpm、React 的Monorepo架构包管理案例。
内含开发中常见的配置，如 Babel、tailwindcss、TypeScript、husky、commitlint、elsint、pretter 等基础配置

以及相关Webpack打包优化案例

</p>
<br/>
<p align="center">
<img alt="Static Badge" src="https://img.shields.io/badge/npm-%5E9.0.0-green?style=for-the-badge">

<img alt="Static Badge" src="https://img.shields.io/badge/node-%5E18.0.0%20%7C%7C%20%5E20.0.0%20%7C%7C%20%5E22.0.0-green?style=for-the-badge">

</p>
<br/>

# 📦installation

You can clone it for local development: <br/>
[![][pnpm-shield]][pnpm-link]

```js
git clone https://github.com/Alicehhhmm/Norush-Monorepo-react.git
cd Norush-Monorepo-react
pnpm install
pnpm start
// or
pnpm run start
```

# 💻Common command

- 给根目录安装依赖

```bash
pnpm add <package-name> -w
# or
pnpm add <package-name> --workspace-root
```

- 给指定的`workspace`安装依赖

```bash
pnpm add <package-name> -F <workspace-name>
# or
pnpm add <package-name> --filter <workspace-name>
```

例如: 给`@norush/react.temp `包添加`dayjs`依赖

```bash
pnpm add dayjs -F @norush/react.temp
```

- 子包之间的引用

```bash
pnpm add @norush/shared -F @norush/react.temp
```

# 📝 License

Copyright ©2023-present [Norush][profile-link]. <br />
This project is [MIT](./LICENSE) licensed.

<div align="right">

[![][back-to-top]](#readme-top)

</div>

<!-- LINK GROUP -->

[back-to-top]: https://img.shields.io/badge/back_to_top-%E2%AC%86-25c2a0?style=for-the-badge&logoColor=green
[pnpm-link]: https://pnpm.io/
[pnpm-shield]: https://img.shields.io/badge/pnpm-v9.14.0-brightgreen?style=for-the-badge&logo=pnpm&label=pnpm&labelColor=block&color=f69220
[rspack-link]: https://rspack.dev/zh/index
[rspack-shield]: https://img.shields.io/badge/rspack-V1.0.0-brightgreen?style=for-the-badge&logo=rspack&label=Rspack&labelColor=block&color=ffc920
[profile-link]: https://github.com/Alicehhhmm
