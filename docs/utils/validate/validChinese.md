### 仅匹配汉字 

<blockquote class="green-tip">
  <p>仅匹配汉字</p>
</blockquote>



#### 代码实现：
```vue
...
<el-form :model="form" :rules='validForm' label-width="100px">
  <el-form-item label="姓名：" prop="userName">
    <el-input v-model="form.userName" placeholder="请输入姓名"></el-input>
  </el-form-item>
</el-form>
...

<script>
    import { validChinese } from '@xiyun/utils';

    export default{
      name:"app",
      data() {
        return {
          form: {
            userName: '',
          },
          validForm: {
             userName: [{
                validator: (rules, value, callback) => {
                  if (value !== '') {
                    if (!validChinese(value)) {
                      callback(new Error('姓名不正确'));
                    }
                  }
                  callback();
                },
                trigger: 'blur',
             }],
          },
        }       
      },
    }
</script>
```
