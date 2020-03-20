<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import jwtDecode from 'jwt-decode'
export default {
  name: 'app',
  data () {
    return {
      active: 0
    }
  },
  components: {

  },
  methods: {
    isEmpty (value) {
      return (value === undefined || value === null || (typeof value === 'object' && Object.keys(value).length === 0) || (typeof value === 'string' && value.trim().length === 0))
    }
  },
  created () {
    if (localStorage.orderTk) {
      const decoded = jwtDecode(localStorage.orderTk)
      this.$store.dispatch('changeStat', !this.isEmpty(decoded))
      this.$store.dispatch('setUser', decoded)
    }
  }
}
</script>

<style>
html,
body,
#app {
  width: 100%;
  height: 100%;
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
}
#app {
  margin: 0;
  padding: 0;
}
/*修改滚动条样式*/
::-webkit-scrollbar{
  width:10px;
  height:10px;
}
::-webkit-scrollbar-track{
  background: rgb(239, 239, 239);
  border-radius:2px;
}
::-webkit-scrollbar-thumb{
  background: #bfbfbf;
  border-radius:10px;
}
::-webkit-scrollbar-thumb:hover{
  background: #304156a2;
}
::-webkit-scrollbar-corner{
  background: #ddd;
}
</style>
