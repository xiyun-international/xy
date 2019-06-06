### 匹配汉字、字母、数字、下划线、中文括号

<blockquote class="green-tip">
  <p>匹配汉字、字母、数字、下划线、中文括号</p>
</blockquote>



#### 代码实现：
```vue
...
<el-form :model="form" :rules='validForm' label-width="100px">
  <el-form-item label="商户名称：" prop="registerName">
    <el-input v-model="form.registerName" placeholder="请输入商户名称"></el-input>
  </el-form-item>
</el-form>
...

<script>
    import { validCLN } from '@xiyun/utils';

    export default{
      name:"app",
      data() {
        return {
          form: {
            registerName: '',
          },
          validForm: {
             registerName: [{
                validator: (rules, value, callback) => {
                  if (value !== '') {
                    if (!validCLN(value)) {
                      callback(new Error('商户名称格式不正确'));
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
