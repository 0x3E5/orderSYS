<template>
    <div id="admin-index">
        <div :class="['left',{'left-hide':!show}]">
            <LeftNav />
        </div>
        <div :class="['right',{'right-hide':!show}]">
            <TopNav @toggleLeft="toggleLeft" />
            <div class="container">
                <transition class="el-fade-in">
                    <router-view></router-view>
                </transition>
            </div>
        </div>
    </div>
</template>

<script>
import TopNav from '@/components/TopNav'
import LeftNav from '@/components/LeftNav'
export default {
  name: 'adminIndex',
  data () {
    return {
        show:true
    }
  },
  methods: {
      toggleLeft(){
          this.show=!this.show
      }
  },
  mounted() {
  },
  components: {
    TopNav,
    LeftNav
  }
}
</script>

<style>
    #admin-index{
        height: 100%;
        width: 100%;
        position: relative;
    }
    .left{
        position: absolute;
        /* float: left; */
        top: 0;
        left: 0;
        width: 224px;
        height: 100%;
        transition: all .3s;
    }
    .left-hide{
        left: -224px;
    }
    .right{
        box-sizing: border-box;
        padding-left: 224px;
        width: 100%;
        height: 100%;
        transition: all .3s;
    }
    .right-hide{
        padding-left: 0px;
    }
    .container{
        box-sizing: border-box;
        width: 100%;
        height: calc(100% - 85px);
        padding: 10px 24px 10px;
        overflow: auto;
    }
</style>
