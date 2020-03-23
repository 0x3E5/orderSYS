<template>
  <div>
    <el-row>
      <el-col :span="24">
        <el-form
          ref="form"
          :model="form"
          label-width="80px"
          :rules="rules"
        >
          <el-form-item label="用 户 名  " prop="username">
            <el-input v-model="form.username" placeholder="请输入用户名！"></el-input>
          </el-form-item>
          <el-form-item label="电子邮箱" prop="email">
            <el-input type="email" v-model="form.email" placeholder="请输入电子邮箱！"></el-input>
          </el-form-item>
          <el-form-item label="登录密码" prop="password">
            <el-input type="password" v-model="form.password" placeholder="请输入密码！"></el-input>
          </el-form-item>
          <el-form-item label="重复密码" prop="password2">
            <el-input type="password" v-model="form.password2" placeholder="请输入重复密码！"></el-input>
          </el-form-item>
            <el-button
              type="primary"
              @click="submitForm('form')"
              class="submitBtn"
            >下一步</el-button>
        </el-form>
      </el-col>
    </el-row>

  </div>
</template>

<script>
export default {
  name: 'admin',
  data () {
    const validatePass2 = (rule, value, callback) => {
      if (value !== this.form.password) {
        callback(new Error('两次输入密码不一致！'))
      } else {
        callback()
      }
    }
    return {
      form: {
        username: '',
        email: '',
        password: '',
        password2: ''
      },
      rules: {
        username: [
          { required: true, message: '用户名不能为空！', trigger: 'blur' },
          { min: 6, max: 10, message: '长度在6到10个字符之间！', trigger: 'blur' }
        ],
        email: [
          { type: 'email', required: true, message: '邮箱格式不正确', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空！', trigger: 'blur' },
          { min: 6, max: 16, message: '长度在6到16之间！', trigger: 'blur' }
        ],
        password2: [
          { required: true, message: '确认密码不能为空！', trigger: 'blur' },
          { min: 6, max: 16, message: '长度在6到16之间！', trigger: 'blur' },
          { validator: validatePass2, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios.post('/api/users/init', this.form)
            .then(res => {
              this.$message({
                message: '管理员初始化成功',
                type: 'success'
              })
              this.$axios.post('/api/init/setStat', { admin: true })
              this.$emit('changeStatus')
              this.$router.push('/init/shop')
            })
            .catch(err => {
              console.log(err)
            })
        } else {
          this.$message({
            type: 'error',
            message: '填写信息有误请重新输入！'
          })
          return false
        }
      })
    }
  },
  created () {
    this.$emit('changeStatus', 0)
    this.$axios.get('/api/init/getStat')
      .then(result => {
        const status = result.data
        if (status.admin) {
          this.$emit('changeStatus', 1)
          this.$router.push('/init/shop')
        }
      })
      .catch(err => {
        console.log(err)
      })
  }
}
</script>

<style scoped>
.submitBtn{
    width: 200px;
    display: block;
    margin: 0 auto;
}
</style>
