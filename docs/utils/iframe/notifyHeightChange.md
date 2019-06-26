### 子应用通知 iframe 高度变化

<blockquote class="green-tip">
  <p>iframe 内的子应用数据变化导致页面高度变化调用该方法通知外层 iframe 高度调整。</p>
</blockquote>

#### 代码实现：

```js
import Vue from 'vue';

Vue.mixin({
  updated() {
    const params = {
      isLoading: false,
      height: document.querySelector('.main-content')
        ? document.querySelector('.main-content').clientHeight + 40
        : document.querySelector('.ant-layout-content>div').clientHeight + 40, // 40这个数字可根据实际项目调整
    };
    window.parent.postMessage(params, '*');
  },
});
```
