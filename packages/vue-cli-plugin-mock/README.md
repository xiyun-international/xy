# vue-cli-plugin-mock

## 简介
mock 插件是为 Vue 项目提供 mock 数据的工具，支持 [Mock.js](https://github.com/nuysoft/Mock/wiki) 语法。

## 安装

```shell
yarn add @xiyun/vue-cli-plugin-mock -D
```

## 示例
package.json 添加如下：
```
"scripts": {
  "start": "vue-cli-service serve --port=8005 --fix",
  ...
}
```
执行命令如下：
```shell
yarn start
```
扫描 __mock__ 目录内所有文件(默认)，默认运行监听模式，mock 文件变化无需重新执行︰

mock 数据文件格式如下︰
```shell
module.exports = {
  '/api/a': { a: 1 }, // 默认 get 请求
  'POST /api/a': { a: 1 },
  '/api/users/:userId': { a: 1 },
  '/api/b': (req, res) => {
    res.end(JSON.stringify({ b: 1 }));
  },
   "/random": function () {
    return Math.random() < 0.1 ? 1 : 0;
  },
  '/api/w':  {
    'list|100': [{ 'value|1-100': 50, 'type|0-2': 1 }], // 支持 Mock.js 语法
  },
};
```

