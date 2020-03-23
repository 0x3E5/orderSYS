<template>
  <div>
    <el-row>
      <el-col :span="24">
        <p class="success">恭喜你！</p>
        <p class="tips">已经完成系统初始化，开始使用吧！</p>
        <router-link to="/login"><el-button class="submitBtn" type="primary">开始使用</el-button></router-link>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'complete',
  data () {
    return {
    }
  },
  methods: {
  },
  created () {
    this.$emit('changeStatus', 3)
  }
}
</script>

<style scoped>
a{
    text-decoration: none;
}
.success{
    margin-bottom: 5px;
    font-size: 25px;
    text-align: center;
}
.tips{
    font-size: 16px;
    text-align: center;
    margin-bottom: 40px;
}
.submitBtn{
    width: 200px;
    display: block;
    margin: 0 auto;
}
</style>
