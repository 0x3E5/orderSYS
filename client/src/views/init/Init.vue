<template>
  <div id="init">
    <div class="content">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span class="init-title">系统初始化</span>
        </div>
        <el-steps class="step" :active="active" finish-status="success">
          <el-step title="管理员"></el-step>
          <el-step title="店铺信息"></el-step>
          <el-step title="完成"></el-step>
        </el-steps>
        <div class="views">
          <router-view @changeStatus='chStatus'></router-view>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Init',
  data () {
    return {
      active: 0
    }
  },
  methods: {
    chStatus (value) {
      this.active = value
    }
  }
}
</script>

<style>
#init {
  width: 100%;
  height: 100%;
  position: relative;
  background-color: #409eff;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 1600 800'%3E%3Cg stroke='%23c9ff54' stroke-width='56.2' stroke-opacity='0' %3E%3Ccircle fill='%23409eff' cx='0' cy='0' r='1800'/%3E%3Ccircle fill='%234ca3ff' cx='0' cy='0' r='1700'/%3E%3Ccircle fill='%2357a7ff' cx='0' cy='0' r='1600'/%3E%3Ccircle fill='%2361acff' cx='0' cy='0' r='1500'/%3E%3Ccircle fill='%236ab1ff' cx='0' cy='0' r='1400'/%3E%3Ccircle fill='%2373b6ff' cx='0' cy='0' r='1300'/%3E%3Ccircle fill='%237cbaff' cx='0' cy='0' r='1200'/%3E%3Ccircle fill='%2385bfff' cx='0' cy='0' r='1100'/%3E%3Ccircle fill='%238dc4ff' cx='0' cy='0' r='1000'/%3E%3Ccircle fill='%2396c8ff' cx='0' cy='0' r='900'/%3E%3Ccircle fill='%239ecdff' cx='0' cy='0' r='800'/%3E%3Ccircle fill='%23a7d1ff' cx='0' cy='0' r='700'/%3E%3Ccircle fill='%23afd6ff' cx='0' cy='0' r='600'/%3E%3Ccircle fill='%23b7daff' cx='0' cy='0' r='500'/%3E%3Ccircle fill='%23c0dfff' cx='0' cy='0' r='400'/%3E%3Ccircle fill='%23c8e3ff' cx='0' cy='0' r='300'/%3E%3Ccircle fill='%23d1e8ff' cx='0' cy='0' r='200'/%3E%3Ccircle fill='%23d9ecff' cx='0' cy='0' r='100'/%3E%3C/g%3E%3C/svg%3E");
  background-attachment: fixed;
  background-size: cover;
}
.content {
  width: 500px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.init-title{
  display: inline-block;
  width: 100%;
  text-align: center;
  font-size: 25px;
}
.step{
  box-sizing: border-box;
  margin-bottom: 15px;
}
body{
  margin: 0;
  padding: 0;
}
</style>
