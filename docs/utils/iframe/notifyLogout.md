### 登录超时通知 iframe

<blockquote class="green-tip">
  <p>iframe 内的子应用登录超时通知 iframe 登出。</p>
</blockquote>

#### 在 post.js 中超时判断处添加代码：

```js
...
if (window.self !== window.parent) {
    window.parent.postMessage(
        {
            logout: true,
        },
        '*'
    );
    return false;
}
...
```
