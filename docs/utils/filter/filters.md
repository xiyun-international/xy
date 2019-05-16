### xy-filters 

<blockquote class="green-tip">
  <p>自定义常用过滤器，可被用于一些常见的文本格式化。</p>
</blockquote>

#### 隐藏手机号中间四位：

##### 示例：
<div>177****8767</div>

##### 代码实现：
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
#### 隐藏证件号中间数字，只保留首尾两处各三位数字：

##### 示例：
<div>233****234</div>

##### 代码实现：
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
#### 隐藏邮箱前两位后的四位：

##### 示例：
<div>12****3434@163.com</div>

##### 代码实现：
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
