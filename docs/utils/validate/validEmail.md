### 邮箱校验 

<blockquote class="green-tip">
  <p>邮箱校验</p>
</blockquote>



#### 代码实现：
```vue
...
<el-form :model="form" :rules='validForm' label-width="100px">
  <el-form-item label="邮箱：" prop="email">
    <el-input v-model="form.email" placeholder="请输入邮箱"></el-input>
  </el-form-item>
</el-form>
...

<script>
    import { validEmail } from '@xiyun/utils';

    export default{
      name:"app",
      data() {
        return {
          form: {
            email: '',
          },
          validForm: {
             email: [{
                validator: (rules, value, callback) => {
                  if (value !== '') {
                    if (!validEmail(value)) {
                      callback(new Error('邮箱格式不正确'));
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
