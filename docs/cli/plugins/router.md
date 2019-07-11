### router

#### 功能描述
router 插件，是`@xiyun/cli`的一个核心功能，已在内部集成。
它为`@xiyun/cli`的`generator`功能提供了一个自动创建路由的功能，
避免了安装好一个新业务模板后，还需要手动添加路由等繁琐的操作。

#### 使用方法

虽然 router 插件已在内部集成，可以直接在命令行中执行，
但还是推荐放到 generator 插件中去调用。

```js
import { router } from '@xiyun/xy-plugin-router';

// 执行后，就会自动创建好 foo 相关的路由文件
router('foo');
```

