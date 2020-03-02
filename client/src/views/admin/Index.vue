<template>
    <div id="admin-index">
        <div class="left">
            <LeftNav />
        </div>
        <div class="right">
            <TopNav />
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

    }
  },
  methods: {
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
    }
    .left{
        float: left;
        width: 224px;
        height: 100%;
    }
    .right{
        box-sizing: border-box;
        padding-left: 224px;
        width: 100%;
        height: 100%;
    }
    .container{
        box-sizing: border-box;
        width: 100%;
        height: calc(100% - 85px);
        padding: 10px 24px 10px;
        overflow: auto;
    }
</style>
