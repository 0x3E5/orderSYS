<template>
    <div class="home">
        <el-row>
            <el-col class="home-card" :xs="12" :sm="12" :md="6" :lg="6" :xl="6">
                <div class="card-bg card-1">
                    <h3 class="card-title">今日订单</h3>
                    <span class="card-data">0</span>
                </div>
            </el-col>
            <el-col class="home-card" :xs="12" :sm="12" :md="6" :lg="6" :xl="6">
                <div class="card-bg card-2">
                    <h3 class="card-title">今日收入</h3>
                    <span class="card-data">0</span>
                </div>
            </el-col>
            <el-col class="home-card" :xs="12" :sm="12" :md="6" :lg="6" :xl="6">
                <div class="card-bg card-3">
                    <h3 class="card-title">商品数量</h3>
                    <span class="card-data">0</span>
                </div>
            </el-col>
            <el-col class="home-card" :xs="12" :sm="12" :md="6" :lg="6" :xl="6">
                <div class="card-bg card-4">
                    <h3 class="card-title">分类数量</h3>
                    <span class="card-data">0</span>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    name:'home'
}
</script>

<style>
    .home{
        height: 100%;
    }
    .home .home-card{
        padding: 5px;
    }
    .home-card > .card-bg{
        position: relative;
        width: 100%;
        height: 100px;
        border-radius: 10px;
    }
    .card-1{
        background-image: linear-gradient(230deg, #759bff, #843cf6);
    }
    .card-2{
        background-image: linear-gradient(230deg, #fc5286, #fbaaa2);
    }
    .card-3{
        background-image: linear-gradient(230deg, #ffc480, #ff763b);
    }
    .card-4{
        background-image: linear-gradient(230deg, #0e4cfd, #6a8eff);
    }
    .home-card > .card-bg > .card-title{
        font-size: 16px;
        font-weight: 500;
        color: #fff;
        position: absolute;
        top: 8px;
        left: 10px;
    }
    .home-card > .card-bg > .card-data{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        color: #fff;
        font-size: 30px;
        font-weight: bold;
    }
</style>