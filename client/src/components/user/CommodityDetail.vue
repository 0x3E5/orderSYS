<template>
    <transition name="move">
        <div v-show="showFlag" class="food">
            <div class="fond-content">
                <div class="image-header">
                    <img :src="food.img" alt="">
                    <div class="back" @click="hide">
                        <i class="el-icon-arrow-left"></i>
                    </div>
                </div>
                <div class="contents">
                    <h1 class="title">{{food.name}}</h1>
                    <div class="price">
                        <span class="now">¥{{food.price}}</span>
                        <span class="old" v-show="food.isDiscount">¥{{food.onSale}}</span>
                    </div>
                    <template v-if="!food.soldOut">
                        <div class="cartcontrol-wrapper">
                            <CartControl :food="food"></CartControl>
                        </div>
                        <transition name="fade">
                            <div class="buy" @click.stop.prevent="addFirst($event)" v-show="!food.count || food.count === 0">加入购物车</div>
                        </transition>
                    </template>
                        <div v-else class="sold-out">已售罄</div>
                </div>
                <div class="split" v-show="food.describe"></div>
                <div class="info" v-show="food.describe">
                    <h1 class="title">商品信息</h1>
                    <p class="text">{{food.describe}}</p>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
import BScroll from 'better-scroll'
import CartControl from '@/components/user/CartControl'
export default {
  name: 'commodityDetail',
  props: {
    food: {
      type: Object
    }
  },
  data () {
    return {
      showFlag: false
    }
  },
  methods: {
    show () {
      this.showFlag = true
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$el, {
            click: true
          })
        } else {
          this.scroll.refresh()
        }
      })
    },
    hide () {
      this.showFlag = false
    },
    addFirst (event) {
      if (!event._constructed) {
        return
      }
      this.$set(this.food, 'count', 1)
    }
  },
  components: {
    CartControl
  }
}
</script>

<style>
    .food{
        position: fixed;
        left: 0;
        top: 0;
        bottom: 48px;
        z-index: 30;
        width: 100%;
        background: #fff;
        transform: translate3d(0, 0, 0);
    }
    .food.move-enter-active, .food.move-leave-active{
		transition: all 0.2s linear;
    }
	.food.move-enter, .food.move-leave-to{
		opacity: 0;
		transform: translate3d(100%, 0, 0);
    }
    .food .image-header{
        position: relative;
        width: 100%;
        height: 0;
        padding-top: 100%;
    }
    .food .image-header > img{
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;
    }
    .food .image-header > .back{
        position: absolute;
        top: 10px;
        left: 0;
    }
    .food .image-header > .back > .el-icon-arrow-left{
        display: block;
        padding: 10px;
        font-size: 20px;
        color: #fff;
    }
    .food .contents{
        position: relative;
        padding: 18px;
    }
    .food .contents > .title{
        line-height: 14px;
        margin-bottom: 8px;
        font-size: 14px;
        font-weight: 700;
        color: #07111b;
    }

    .food .contents > .price{
        font-weight: 700;
        line-height: 24px;
    }
    .food .contents > .price > .now{
        margin-right: 8px;
        font-size: 14px;
        color: #f01414;
    }
    .food .contents > .price > .old{
        text-decoration: line-through;
        font-size: 10px;
        color: #93999f;
    }
    .food .contents > .sold-out{
        position: absolute;
        right: 10px;
        bottom: 20px;
        font-size: 14px;
        color: #666;
    }
    .food .contents > .cartcontrol-wrapper{
        position: absolute;
        right: 12px;
        bottom: 12px;
    }
    .food .contents > .buy{
        position: absolute;
        right: 18px;
        bottom: 18px;
        z-index: 10;
        height: 24px;
        line-height: 24px;
        padding: 0 12px;
        box-sizing: border-box;
        border-radius: 12px;
        font-size: 10px;
        color: #fff;
        background: #00a0dc;
    }
    .food .contents > .buy.fade-enter-active, .food .contents > .buy.fade-leave-active{
        transition: all 0.2s;
    }
    .food .contents > .buy.fade-enter, .food .contents > .buy.fade-leave-to{
        opacity: 0;
    }
    .food .info{
        padding: 18px;
        padding-bottom: 25px;
    }
    .food .info > .title{
        line-height: 14px;
        margin-bottom: 6px;
        font-size: 14px;
        color: #07111b;
    }
    .food .info > .text{
        font-size: 12px;
        line-height: 24px;
        padding: 0 8px;
        color: #4d555d;
    }
    .split{
        width: 100%;
        height: 16px;
        border-top: 1px solid rgba(1, 17, 27, 0.1);
        border-top: 1px solid rgba(1, 17, 27, 0.1);
        background: #f3f5f7;
    }
</style>
