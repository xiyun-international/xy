### init

#### 功能描述

init 插件，是`@xiyun/cli`里的一个重要插件。
它的主要功能是通过调用`@xiyun/xy-plugin-block`的`block`方法将定义好的template模板下载下来，
并且通过调用`@xiyun/xy-plugin-router`的`router`方法将模板对应的路由的代码也直接下载下来。
这样直接提高了至少10%的工作效率。

#### 使用方法

npm install -g @xiyun/xy-plugin-generator
or
yarn global add @xiyun/xy-plugin-generator

#### 示例
```bash
# 下载指定template模板
$ xy generator templateName

# 下载所有template模板
$ xy generator templateName --scaffold
```

