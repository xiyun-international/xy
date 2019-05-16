# 隐藏证件号中间数字 

<blockquote class="green-tip">
  <p>隐藏证件号中间数字，只保留首尾两处各三位数字</p>
</blockquote>


### 示例：

<div>233****234</div>

### 代码实现：
```vue
...
<div>{{ID | hideIDMiddle}}</div>
...  

<script>
import { hideIDMiddle } from "@xiyun/utils";

export default {
    filters: { hideIDMiddle },
    data() {
        return {
            ID: '233205199210121234',
        }
    },
}
</script>
```
