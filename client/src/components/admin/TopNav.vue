<template>
    <div id="top-nav">
        <el-row>
            <i @click="toggleLeft" :class="[show?'el-icon-s-fold':'el-icon-s-unfold','size']"></i>
            <el-col :span="6" class="logo-container">
                <!-- <span class="title">在线点餐系统</span> -->
            </el-col>
            <el-col :span="6" class="user">
                <div class="user-info">
                    <img :src="user.avatar" class="avatar" alt="">
                    <div class="welcome">
                        <p class="name comename">欢迎</p>
                        <p class="name avatarname">{{ user.username }}</p>
                    </div>
                    <span class="username">
                        <el-dropdown trigger="click" @command="setDialogInfo">
                            <span>
                                <i class="el-icon-caret-bottom el-icon--right"></i>
                            </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item command="info">个人信息</el-dropdown-item>
                                <el-dropdown-item command="logout">退出</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>

                    </span>
                </div>
            </el-col>
        </el-row>
        <div class="audioBar">
            <audio ref="ding" src="../../assets/audio/ding.mp3">
            您的浏览器不支持 audio 标签。
            </audio>
        </div>
    </div>
</template>

<script>
export default {
  name: 'topNav',
  data () {
    return {
      show: true
    }
  },
  methods: {
    setDialogInfo (cmdItem) {
      switch (cmdItem) {
        case 'info':
          this.$router.push('/admin/user')
          break
        case 'logout':
          this.logout()
          break
        default:
          break
      }
    },
    logout () {
      localStorage.removeItem('orderTk')
      this.$store.dispatch('clearCurrentState')
      this.$router.push('/login')
    },
    toggleLeft () {
      this.$emit('toggleLeft')
      this.show = !this.show
    }
  },
  computed: {
    user () {
      return this.$store.getters.getUser
    }
  },
  destroyed () {
    console.clear()
  },
  sockets: {
    playAudio () {
      this.$refs.ding.play()
      this.$notify({
        title: '您有新的订单',
        message: '请前往订单管理页面查看！',
        type: 'success',
        offset: 60
      })
    }
  }
}
</script>

<style>
    *{
        margin: 0;
        padding: 0;
    }
    #top-nav{
        box-sizing: border-box;
        height: 60px;
        width: 100%;
        padding: 8px 16px;
        box-shadow: 1px 0px 40px rgba(58, 59, 69, 0.3);
        margin-bottom: 15px;
        overflow: hidden;
    }
    .size{
        font-size: 22px;
        line-height: 44px;
        cursor: pointer;
    }
    .logo-container{
        line-height: 44px;
        min-width: 400px;
    }
    .title{
        line-height: 44px;
        font-size: 22px;
        letter-spacing: 3px;
        font-family: "Microsoft YaHei";
    }
    .user{
        line-height: 44px;
        float: right;
        text-align: right;
        padding-right: 10px;
    }
    .avatar{
        height: 44px;
        width: 44px;
        border-radius: 50%;
        vertical-align: middle;
    }
    .welcome{
        line-height: 44px;
        display: inline-block;
        vertical-align: middle;
        padding: 0 5px;
        width: auto;
    }
    .name{
        line-height: 22px;
        text-align: center;
        font-size: 14px;
    }
    .comename{
        font-size: 12px;
        color: #858796;
    }
    .username{
        cursor: pointer;
        margin-right: 5px;
    }
    .el-dropdown-menu{
        border-radius: 6px;
        box-shadow: 0px 2px 30px rgba(58, 59, 69, .3);
    }
    .audioBar{
        display: none;
    }
</style>
