### 子应用通知 iframe 高度变化

<blockquote class="green-tip">
  <p>iframe 内的子应用数据变化导致页面高度变化调用该方法通知外层 iframe 高度调整。</p>
</blockquote>

#### 代码实现分为两部分：

##### main.js

```js
...
import changeHeight from './utils/notifyHeight'; //路径根据实际情况调整

if (window.self !== window.parent) {
  let isAntUI = true;
  // eslint-disable-next-line
  const installedPlugins = Vue._installedPlugins || (Vue._installedPlugins = []);
  if (typeof ElementUI !== 'undefined' && installedPlugins.indexOf(ElementUI) > -1) {
    isAntUI = false;
  }
  changeHeight(router, isAntUI); // 通知iframe高度变化
}
...
```

##### notifyHeight.js

```js
export default function changeHeight(router, isAntUI) {
  const setFrameHeight = {
    updated() {
      const height = () => {
        const current = !isAntUI
          ? document.querySelector('.main-content').clientHeight
          : document.querySelector('.ant-layout-content>div').clientHeight;
        return current > 400 ? current + 66 : 400;
      };
      const params = {
        isLoading: false,
        height: height(),
      };
      window.parent.postMessage(params, '*');
    },
  };

  router.beforeEach((to, from, next) => {
    to.matched.forEach(b => {
      if (!b.components) {
        return false;
      }
      const vm = b.components.default;
      // eslint-disable-next-line
      for (let i in vm.components) {
        if (!vm.components[i].mixins) {
          vm.components[i].mixins = [setFrameHeight];
        } else {
          vm.components[i].mixins.push(setFrameHeight);
        }
      }
      if (!vm.mixins) {
        vm.mixins = [setFrameHeight];
      } else {
        vm.mixins.push(setFrameHeight);
      }
    });
    next();
  });
}
```
