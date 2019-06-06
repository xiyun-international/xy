### 介绍

<blockquote class="green-tip">
  <p>我们根据业务基于 ElementUI 中的 Form 表单组件封装了 常用表单校验方法，目的是为了避免再去封装它。

目前封装了 手机号码校验、身份证号码校验、邮箱校验、匹配汉字、字母、数字、下划线、中文括号校验和 仅匹配汉字 校验，你只需要做一些业务级的状态码判断，就可以快速的使用。

</p>
</blockquote>

#### 代码示例：
```vue
...
<el-form :model="form" :rules='validForm' label-width="100px">
  <el-form-item label="手机号码：" prop="mobile">
    <el-input v-model.number="form.mobile" placeholder="请输入手机号码" :maxlength='11'></el-input>
  </el-form-item>
  <el-form-item label="身份证号码：" prop="IdCard">
    <el-input v-model="form.IdCard" placeholder="请输入身份证号码" :maxlength='18'></el-input>
  </el-form-item>
  <el-form-item label="邮箱：" prop="email">
    <el-input v-model="form.email" placeholder="请输入邮箱"></el-input>
  </el-form-item>
   <el-form-item label="商户名称：" prop="registerName">
    <el-input v-model="form.registerName" placeholder="请输入商户名称"></el-input>
  </el-form-item>
  <el-form-item label="姓名：" prop="userName">
    <el-input v-model="form.userName" placeholder="请输入姓名"></el-input>
  </el-form-item>
</el-form>
...

<script>
    import { 
      validMobile, 
      validEmail, 
      validIdCard, 
      validCLN,
      validChinese 
    } from '@xiyun/utils';

    export default{
      name:"app",
      data() {
        return {
          form: {
            mobile: '',
            IdCard: '',
            email: '',
            registerName: '',
            userName: '',
          },
          validForm: {
            mobile: [{
                required: false,
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
            IdCard: [{
                required: false,
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
            email: [{
                required: false,
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
            registerName: [{
                required: false,
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
            userName: [{
                required: false,
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
