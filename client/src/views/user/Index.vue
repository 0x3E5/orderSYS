<template>
    <div id="userShop">
        <Header></Header>
        <Commodities :id="id"></Commodities>
    </div>
</template>

<script>
import Header from '@/components/user/Header'
import Commodities from '@/components/user/Commodities'
export default {
  name: 'userShop',
  props: ['id'],
  data () {
    return {

    }
  },
  methods: {

  },
  components: {
    Header,
    Commodities
  }
}
</script>

<style scoped>
body,html{
    line-height: 1;
    font-weight: 200;
    font-family: "PingFang SC", "STHeitiSC-Light", "Helvetica-Light", arial, san-serif;
}
 #userShop{
     height: 100%;
 }
</style>
