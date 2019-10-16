# xy-plugin-mock

提供给 xy 命令使用的插件，用于为组件提供 mock 数据。

请求支持 get 和 post 两种方式

| 参数    | 说明            |
| ------- | --------------- |
| --watch    | 监听__mock__文件夹内的 mock 数据变化 |
| --path    | 扫描指定路径下的 mock 数据，默认扫描根目录下 __mock__ 文件 |


#### 使用方法

```js
import { mock } from 'xy-plugin-block';

xy mock --watch // 监听模式
xy mock --path="**/__mock__/a.js" // 扫描指定匹配路径下的 mock 数据
```
#### mock 数据样例
```js
module.exports = {
  '/api/a': { a: 1 },
  'POST /api/a': { a: 1 },
  '/api/users/:userId': { a: 1 },
  '/api/b': (req, res) => {
    res.end(JSON.stringify({ b: 1 }));
  },
  '/api/d': { a: 1 },
}
```
