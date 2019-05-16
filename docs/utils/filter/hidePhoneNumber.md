# 隐藏手机号中间四位

<blockquote class="green-tip">
  <p>隐藏手机号中间四位。</p>
</blockquote>

### 示例：

<div>177****8767</div>

### 代码实现：
```vue
...
<div>{{phoneNumber | hidePhoneMiddle}}</div>
...

<script>
import { hidePhoneMiddle } from "@xiyun/utils";

export default {
    filters: { hidePhoneMiddle },
    data() {
        return {
            phoneNumber: '17789098767',
        }
    },
}
</script>
```
