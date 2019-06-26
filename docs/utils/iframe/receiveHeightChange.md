### iframe 接收高度变化消息

<blockquote class="green-tip">
  <p>iframe 调用该方法获取内部子应用因数据变化而变化的页面高度，并设置为更新后的高度。</p>
</blockquote>

#### 代码实现：

```js
...
listenerPostMessageEvent() {
    let self=this
    // 接收消息
    window.addEventListener(
        'message',
        event => {
          let iframe = document.getElementById('iframe')
          const { data } = event;
          if (data !== '' && data.isLoading === false) {

            self.isLoading = data.isLoading;

            if (!data.height) {
              return false;
            }

            //兼容老Bug
            if (data.height === 0) {
              return false;
            }

            // 设置高度
            if (iframe) {
              iframe.height=data.height;
            }
          }
          return false;
        },
        false
    );
},
...
```
