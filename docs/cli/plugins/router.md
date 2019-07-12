# router

## 简介
router 插件为`@xiyun/cli`的`generator`命令提供了一个自动创建路由的功能。

## 使用方法

虽然 router 插件已在内部集成，可以直接在命令行中执行，
但还是需要放到 generator 插件中去调用。

内部调用方法：
```js
import { router } from '@xiyun/xy-plugin-router';

// 执行后，就会自动创建好 foo 相关的路由文件
router('foo');
```

## 示例

首先执行 generator 命令：
```bash
$ xy generator --scaffold user
```
然后会在你项目的`src/views/`目录下安装好下面这些文件：
```text
user/
  |--create/
    |--index.vue
  |--change/
    |--index.vue
  |--detail
    |--index.vue
  |--list
    |--index.vue
  |--update
    |--index.vue
```

这个时候，generator 会调用 router 方法根据所生成的目录，在`src/router`中创建路由
```text
routers/  
  user/
    index.js #user 的路由配置项
```
路由生成好后，还会在`childrenRouter.js`中写入相应的路由配置项。

至此模板就安装完成了，可以看到路由的功能就是避免了安装好一个新业务模板后，
还需要手动添加路由等繁琐的操作。
