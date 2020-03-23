# qiniu

## 简介
qiniu 插件是为项目提供将图片上传到七牛的工具，图片支持格式： png、jpeg、jpg、gif、webp。

## 安装
使用 xy-plugin-qiniu 首先需要安装 @vue/cli

```shell
yarn add @xiyun/cli
```
再执行
```shell
yarn add @xiyun/xy-plugin-qiniu
```

## 使用方法
```shell
xy qiniu <img-file> 
?在接下来请输入您的七牛配置文件目录：（）qiniuConfig-file
? 请输入您要上传到的七牛目录，根目录无需输入：（）a/
```
# 选项
img-file 图片地址，支持相对路径和绝对路径

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
a/  上传到的七牛目录，七牛将根据你的目录加上文件名称返回地址，如果不填默认是根目录，示例：
图片名称是 1.jpg，上传到的七牛目录是 a/,七牛返回图片地址是：http://xxx.com/a/1.jpg
图片名称是 1.jpg，上传到的七牛目录默认根目录,七牛返回图片地址是：http://xxx.com/1.jpg




## 使用示例:
上传相对路径图片：
```shell
xy qiniu ./2.jpg
```
上传绝对路径图片：
```shell
xy qiniu /Users/Downloads/1.jpg
```



