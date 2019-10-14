# block-dev

## 简介

禧云区块开发服务工具是为了方便开发独立 Vue 组件使用的，运行该命令后，会开启一个开发环境服务，并渲染你提供的组件，非常方便。

开发环境目前提供了以下开发资源：
- ant-design-vue 全局 UI 组件，你无需额外引入即可使用。
- lodash 
- moment
- less

## 使用方法
```bash
$ xy block-dev [options] <demo.vue>
```
## 选项

- `--port <8080>` 设置开发服务的端口，默认 8080

## 使用示例

```bash
$ xy block-dev demo.vue
$ xy block-dev --port 8000 demo.vue
```
