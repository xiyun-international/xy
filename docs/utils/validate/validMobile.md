### 手机号码校验 

<blockquote class="green-tip">
  <p>手机号码校验</p>
</blockquote>



#### 代码实现：
```vue
...
<el-form :model="form" :rules='validForm' label-width="100px">
  <el-form-item label="手机号码：" prop="mobile">
    <el-input v-model.number="form.mobile" placeholder="请输入手机号码" :maxlength='11'></el-input>
  </el-form-item>
</el-form>
...

<script>
    import { validMobile } from '@xiyun/utils';

    export default{
      name:"app",
      data() {
        return {
          form: {
            mobile: '',
          },
          validForm: {
             mobile: [{
                validator: (rules, value, callback) => {
                  if (value !== '') {
                    if (!validMobile(value)) {
                      callback(new Error('手机号码格式不正确'));
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
