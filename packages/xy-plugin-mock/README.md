# xy-plugin-mock

提供给 xy 命令使用的插件，用于为组件提供 mock 数据。
当前只支持扫描根目录下 __mock__ 文件

请求只支持 get 和 post，后续会陆续完善

| 参数    | 说明            |
| ------- | --------------- |
| --watch    | 监听__mock__文件夹内的数据变化 |


#### 使用方法

```js
import { mock } from 'xy-plugin-block';

xy mock [--watch]
```
#### __mock__ 内文件样例
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
