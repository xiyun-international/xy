# 隐藏邮箱前两位后的四位 

<blockquote class="green-tip">
  <p>隐藏邮箱前两位后的四位。</p>
</blockquote>

### 示例：

<div>12****3434@163.com</div>

### 代码实现：
```vue
...
<div>{{mail | hideMailMiddle}}</div>
...  

<script>
import { hideMailMiddle } from "@xiyun/utils";

export default {
    filters: { hideMailMiddle },
    data() {
        return {
            mail: '1234323434@163.com',
        }
    },
}
</script>
```
