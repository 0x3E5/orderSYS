<template>
    <div id="userShop">
        <Header></Header>
        这是用户商店{{ id }}
    </div>
</template>

<script>
import Header from '@/components/user/Header'
export default {
    name:'userShop',
    props:['id'],
    data(){
        return{

        }
    },
    methods: {
        
    },
    components:{
        Header
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