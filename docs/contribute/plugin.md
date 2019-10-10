# 开发 @xiyun/cli 插件

1、克隆禧云生态代码

```bash
$ git clone https://github.com/xiyun-international/xy.git
$ cd xy
```

2、创建一个 xy-plugin-yarn 插件
```bash
lerna create xy-plugin-yarn
```

3、启动 TS 监听模式，使用 TypeScript 进行开发
```bash
$ yarn ts:dev
```

4、按照 PluginAPI 规范开发插件

开发要在 src 目录创建入口文件
```bash
.
├── README.md
├── __tests__
│   └── xy-plugin-init.test.js
├── lib
│   └── index.js
├── package.json
└── src
    └── index.ts
```

入口文件举例
```ts
export default {
  name: 'xy-plugin-yarn',
  command: 'yarn',
  onRun: api => {
  },
};
```

5、开发完成，执行编译，会创建 lib 目录
```bash
$ yarn ts:build
```

6、执行发布（如果你是以PR的方式贡献代码，那么这一步将由我们来执行）
```bash
$ lerna publish
```
