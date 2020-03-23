<template>
    <transition name="move">
        <div v-show="showConfirm" class="confirm-order">
            <div class="header">
                <div class="back" @click="hide">
                    <i class="el-icon-arrow-left"></i>
                </div>
                <div class="title">确认订单</div>
            </div>
            <div class="contents">
                <div class="order-list">
                    <div class="order-header">
                        <span class="pic">图片</span>
                        <span class="name">名称</span>
                        <span class="count">数量</span>
                        <span class="on-sale">打折</span>
                        <span class="price">价格</span>
                    </div>
                    <ul>
                        <li v-for="item in orderData.order" :key="item._id">
                            <img :src="item.img" width="40px" height="40px" alt="">
                            <span class="name">{{ item.name }}</span>
                            <span class="count">x{{ item.count }}</span>
                            <span class="onSale">￥{{ item.onSale * item.count }}</span>
                            <span class="price">￥{{ item.price * item.count }}</span>
                        </li>
                    </ul>
                    <div class="total">总计：<span class="price">￥{{ orderData.totalPrice }}</span></div>
                    <p class="remark">订单备注：</p>
                    <el-input type="textarea" :autosize="{ minRows: 5, maxRows: 5}" v-model="remark" placeholder="请填写备注，如无则忽略"></el-input>
                    <el-button type="success" class="submitBtn" @click="submitOrder">确认下单</el-button>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
  name: 'confirmOrder',
  props: {
    orderData: {
      type: Object
    }
  },
  data () {
    return {
      showConfirm: false,
      remark: ''
    }
  },
  methods: {
    show () {
      this.showConfirm = true
    },
    hide () {
      this.showConfirm = false
    },
    submitOrder () {
      this.orderData.remark = this.remark
      this.$axios.post('/api/order/submit', this.orderData)
        .then(res => {
          this.showConfirm = false
          this.$socket.emit('submitOrder')
          this.$emit('clear')
          this.remark = ''
          this.$message({
            type: 'success',
            message: '下单成功店家正在处理您的订单请耐心等待...'
          })
        })
        .catch(err => {

        })
    }
  }
}
</script>

<style>
    .move-enter-active, .move-leave-active{
		transition: all 0.2s linear;
    }
	.move-enter, .move-leave-to{
		opacity: 0;
		transform: translate3d(100%, 0, 0);
    }
    .confirm-order{
        z-index: 50;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background:#F0F0F0;
    }
    .confirm-order > .header{
        background:rgb(0,160,220);
        height: 45px;
        width: 100%;
    }
    .confirm-order > .header > .back{
        position: absolute;
        top: 2px;
        left: 0;
    }
    .confirm-order > .header > .back > .el-icon-arrow-left{
        display: block;
        padding: 10px;
        font-size: 20px;
        color: #fff;
    }
    .confirm-order > .header > .title{
        font-size: 20px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
    }
    .confirm-order > .contents{
        height: 100%;
        width: 100%;
        background: #FFF;
        box-sizing: border-box;
        overflow: auto;
    }
    .confirm-order > .contents > .order-list{
        padding: 15px 20px;
    }
    .contents > .order-list > .order-header{
        display: flex;
        font-size: 14px;
        color: #666;
        text-align: center;
        padding-bottom: 5px;
        border-bottom: 1px dashed #dddddd;
        margin-bottom: 10px;
    }
    .contents > .order-list > .order-header > .pic{
        display: block;
        width: 40px;
    }
    .contents > .order-list > .order-header > .name{
        flex: 2;
    }
    .contents > .order-list > .order-header > .count,
    .contents > .order-list > .order-header > .on-sale,
    .contents > .order-list > .order-header > .price{
        text-align: right;
        flex: 1;
    }
    .contents > .order-list > ul > li{
        margin-bottom: 5px;
        display: flex;
    }
    .contents > .order-list > ul > li > img{
        border-radius: 4px;
        overflow: hidden;
    }
    .contents > .order-list > ul > li > .name{
        line-height: 40px;
        text-align: center;
        font-size: 14px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        flex: 2;
    }
    .contents > .order-list > ul > li > .count{
        line-height: 40px;
        font-size: 14px;
        text-align: right;
        flex: 1;
    }
    .contents > .order-list > ul > li > .onSale{
        line-height: 40px;
        font-size: 14px;
        text-decoration: line-through;
        color: #bbb;
        text-align: right;
        flex: 1;
    }
    .contents > .order-list > ul > li > .price{
        line-height: 40px;
        font-size: 14px;
        text-align: right;
        flex: 1;
    }
    .contents > .order-list > .total{
        margin-top: 10px;
        border-top: 1px dashed #dddddd;
        border-bottom: 1px dashed #dddddd;
        padding: 5px 0;
        text-align: right;
        font-size: 16px;
    }
    .contents > .order-list > .total > .price{
        color: red;
    }
    .contents > .order-list > .remark{
        margin: 10px 0;
    }
    .contents > .order-list > .submitBtn{
        width: 100%;
        margin-top: 20px;
        margin-bottom: 40px;
        box-shadow: 0px 0px 20px rgba(89, 248, 137, 0.562);
    }
</style>
