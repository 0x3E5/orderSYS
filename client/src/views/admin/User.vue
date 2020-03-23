<template>
    <div id="user-info">
        <el-row type="flex" class="row-height" justify="center" align="middle">
            <el-col :xs="24" :sm="18" :md="12" :lg="10" :xl="6">
                <img :src="form.avatar" class="user-avatar">
                <el-form ref="form" :model="form" label-width="80px">
                    <el-form-item label="用 户 名 ">
                        <el-input v-model="form.username"></el-input>
                    </el-form-item>
                    <el-form-item label="电子邮箱">
                        <el-input v-model="form.email"></el-input>
                    </el-form-item>
                    <el-form-item label="原始密码">
                        <el-input type="password" v-model="form.password" placeholder="不修改密码可不填写"></el-input>
                    </el-form-item>
                    <el-form-item label="新 密 码 ">
                        <el-input type="password" v-model="form.newpassword" placeholder="不修改密码可不填写"></el-input>
                    </el-form-item>
                        <el-button type="primary" class="submitBtn" @click="update">更新信息</el-button>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
  name: 'user',
  data () {
    return {
      form: {
        id: '',
        avatar: '',
        username: '',
        email: '',
        password: '',
        newpassword: ''
      }
    }
  },
  methods: {
    update () {
      this.$axios.post('/api/users/chinfo', this.form)
        .then(res => {
          if (res.data === '密码修改成功,请重新登录！') {
            localStorage.removeItem('orderTk')
            this.$store.dispatch('clearCurrentState')
            this.$message({
              type: 'success',
              message: res.data
            })
            this.$router.push('/login')
          } else {
            this.$axios.get('/api/users/authorization')
              .then(res => {
                localStorage.setItem('orderTk', res.data.token)
              })
            this.$message({
              type: 'success',
              message: res.data
            })
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  created () {
    this.form = this.$store.getters.getUser
  }
}
</script>

<style scoped>
    #user-info{
        width: 100%;
        height: 100%;
    }
    .user-avatar{
        height: 100px;
        width: 100px;
        border-radius: 50%;
        box-shadow: 1px 0px 40px rgba(58, 59, 69, 0.3);
        display: block;
        margin: 10px auto;
        margin-bottom: 20px;
    }
    .submitBtn{
        width: 200px;
        display: block;
        margin: 0 auto;
        box-shadow: 0px 0px 20px rgba(53, 141, 230, 0.562);
    }
    .row-height{
        height: 100%;
    }
</style>
