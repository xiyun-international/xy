### 身份证号码校验 

<blockquote class="green-tip">
  <p>身份证号码校验</p>
</blockquote>



#### 代码实现：
```vue
...
<el-form :model="form" :rules='validForm' label-width="100px">
  <el-form-item label="身份证号码：" prop="IdCard">
    <el-input v-model="form.IdCard" placeholder="请输入身份证号码" :maxlength='18'></el-input>
  </el-form-item>
</el-form>
...

<script>
    import { validIdCard } from '@xiyun/utils';

    export default{
      name:"app",
      data() {
        return {
          form: {
            IdCard: '',
          },
          validForm: {
             IdCard: [{
                validator: (rules, value, callback) => {
                  if (value !== '') {
                    if (!validIdCard(value)) {
                      callback(new Error('身份证号码格式不正确'));
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
