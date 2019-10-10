# block

## 简介
block 插件为`@xiyun/cli`提供了一个可以从 GitHub 下载代码到项目中的功能。

## 使用方法

```bash
$ xy block [options] [github-repo-url] 
```

## 选项
options 支持两个选项：
- `--path <path>` 要下载的目标路径
- `--collection` 从当前目录下的 `package.json` 文件中读取 `"blocks"` 选项配置的区块集合进行下载，会把这些区块集合下载到`./src/blocks`目录中

`package.json` 配置示例：
```json
{
  "blocks": {
    "title": "https://github.com/xiyun-international/xy/tree/master/packages/ant-design-ui/packages/countdown-button"
  }
}
```

## 使用示例

```bash
# 下载一个目录中的所有文件
$ xy block https://github.com/xiyun-international/xy/tree/master/packages/ant-design-ui/packages/title

# 下载单个文件
$ xy block https://github.com/xiyun-international/xy/blob/master/packages/ant-design-ui/packages/title/index.vue

# 将组件下载到当前项目的 src/components 目录下
$ xy block https://github.com/xiyun-international/xy/tree/master/packages/ant-design-ui/packages/title --path ./src/components

# 下载区块集合
$ xy block --collection
```
