# xy-plugin-block

提供给 xy 命令使用的插件，用于下载 github 仓库、目录或单个文件。

对外提供了 `block(repo: string, destDir: string): Promise<void>` 方法，

| 参数    | 说明            |
| ------- | --------------- |
| repo    | github 仓库地址 |
| destDir | 下载的目标地址  |

#### 使用方法

```js
import { block } from 'xy-plugin-block';

block('https://github.com/xxxxxx', './test');
```
