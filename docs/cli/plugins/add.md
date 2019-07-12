### add

#### 简介
add 插件，是`@xiyun/cli`的一个核心功能，已在内部集成。
它的功能是为`@xiyun/cli`安装符合规范的插件，安装完成后就可以使用插件中提供的命令了。

#### 使用方法

```bash
$ xy add <plugin-name>
```

#### 示例

比如：你定义了一个插件，包名叫`xy-plugin-foo`，安装的命令叫`foo`，那么在安装好该插件后，你就可以按照如下方式来使用命令了：
```bash
# 安装插件
$ xy add xy-plugin-foo
# 执行命令
$ xy foo
```

#### 插件规范

向外暴露出如下格式的对象，都是符合规范的插件：
```js
export default {
  name: 'xy-plugin-foo', // 插件名
  command: 'foo', // 命令
  alias: 'f', // 命令别名，可选
  // 执行插件的方法
  onRun: args => {
    // args 接收了到命令行参数，需要你自行解析
    // 你的插件逻辑
  },
}
```
