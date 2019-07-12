# block

## 简介
block 插件为`@xiyun/cli`提供了一个可以从 github 下载代码到项目中的功能。

## 使用方法

```bash
$ xy block <git-repo> <target-directory>
```

## 示例

```bash
# 从 github 下载一个指定文件到当前目录
$ xy block https://github.com/xiyun-international/antd-ui-template/blob/master/src/utils/http.js

# 从 github 下载 utils 目录下的所有文件到当前 tools 目录下
$ xy block https://github.com/xiyun-international/antd-ui-template/blob/master/src/utils ./tools
```
