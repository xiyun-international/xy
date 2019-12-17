### pic-upload 上传图片

#### 概述

pic-upload 上传图片组件，支持上传、展示、删除、预览。

#### 组件示例

<div style="margin-top: 20px;">
  <antd-xy-pic-upload v-decorator="[
            'attachment',
            {
              rules: [
                { required: true, message: '请上传终止协议附件' },
              ],
            },
          ]"
          :max="3">
    <a-row>最多3张，支持格式：jpg/png/jpeg，单张图片不超过5MB，建议尺寸在2000*1500以上。</a-row>
  </antd-xy-pic-upload>
</div>

#### 代码示例

```html
<xy-pic-upload :max="3">
  <a-row>最多3张，支持格式：jpg/png/jpeg，单张图片不超过5MB，建议尺寸在2000*1500以上。</a-row>
</xy-pic-upload>
```

#### API

| 属性     |  类型  | 说明                   | 默认值  |
| -------- | :----: | ---------------------- | :-----: |
| value    | Array  | 字段名称            |   空    |
| fileData    | Array  | 已上传图片列表             |   空    |
| url      | String | 上传图片接口地址       |   空    |
| token    | String | token|   空    |
| max | Number | 上传图片最大数量 | 1 |
