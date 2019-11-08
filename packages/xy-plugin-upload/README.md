# upload

## 简介
upload 插件是为项目提供将图片上传到七牛的工具，图片支持格式： png、jpeg、jpg、gif、webp。

## 安装
使用 xy-plugin-upload 首先需要安装 @vue/cli

```shell
yarn add @xiyun/cli
```
再执行
```shell
yarn add @xiyun/xy-plugin-upload
```

## 使用方法
```shell
xy upload <qiniuConfig-file> <img-file> 
```
# 选项
qiniuConfig-file 七牛账号配置文件地址，支持相对路径和绝对路径

在本地需要将七牛账号配置项写到 qiniuConfig.json 中，格式如下：
```shell
{
  "accessKey": "公钥",
  "secretKey": "私钥",
  "bucket": "空间名",
  "domain": "自定义域名地址"
}
```
img-file 图片地址，支持相对路径和绝对路径



## 使用示例:
上传相对路径图片：
```shell
xy upload ./qiniuConfig.json  ./2.jpg
```
上传绝对路径图片：
```shell
xy upload /Users/Downloads/qiniuConfig.json /Users/Downloads/1.jpg
```



