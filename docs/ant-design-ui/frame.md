### frame 订购应用

#### 概述
iFrame 组件，用于订购多个应用的支持。

#### 代码示例
<antd-xy-frame url="http://www.baidu.com" debug></antd-xy-frame>

#### 模板部分
```html
<xy-frame :url="url" ></xy-frame>
```

#### 逻辑部分
```javascript
export default {
  data() {
    return {
      url: '',
    }
  },
  mounted() {
    this.url = 'http://www.baidu.com';
  },
}
```

### API
| 属性 | 说明 | 默认值 |
| ------ | ------ | :------: |
| url | URL 值 | '' |



