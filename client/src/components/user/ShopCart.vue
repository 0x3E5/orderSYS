<template>
    <div>
        <div class="shopcart">
            <div class="contents" @click="toggleList">
                <div class="content-left">
                    <div class="logo-wrapper">
                        <div class="logo" :class="{'highlight':totalCount>0}">
                            <i class="el-icon-shopping-cart-1" :class="{'highlight':totalCount>0}"></i>
                        </div>
                        <div class="num" v-show="totalCount>0">{{totalCount}}</div>
                    </div>
                    <div class="price">¥{{totalPrice}}元</div>
                </div>
                <div class="content-right" @click.stop.prevent="pay">
                    <div class="pay" :class="payClass">
                        确认下单
                    </div>
                </div>
            </div>
            <transition name="fold">
                <div class="shopcart-list" v-show="listShow">
                    <div class="list-header">
                        <h1 class="title">购物车</h1>
                        <span class="empty" @click="empty">清空</span>
                    </div>
                    <div class="list-content" ref="listContent">
                        <ul>
                            <li class="food" v-for="(food,index) in selectFoods" :key="index">
                                <span class="name">{{food.name}}</span>
                                <div class="price">
                                    <span>¥{{Math.round((food.price * food.count) * 100) / 100}}</span>
                                </div>
                                <div class="cartcontrol-wrapper">
                                    <CartControl :food="food"></CartControl>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </transition>
        </div>
        <transition name="fade">
            <div class="list-mask" v-show="listShow" @click="hideList"></div>
        </transition>
        <Confirm ref="confirm" @clear="empty" :orderData="orderData" ></Confirm>
    </div>
</template>

<script>
import BScroll from 'better-scroll'
import CartControl from '@/components/user/CartControl'
import Confirm from '@/components/user/Confirm'
export default {
  name: 'shopCart',
  props: {
    selectFoods: {
      type: Array,
      default () {
        return [{
          price: 0,
          count: 0
        }]
      }
    },
    id: {
      type: String
    }
  },
  data () {
    return {
      fold: true,
      showConfirm: false,
      orderData: {}
    }
  },
  computed: {
    totalPrice () {
      let total = 0
      this.selectFoods.forEach((food) => {
        total += food.price * food.count
      })
      total = Math.round(total * 100) / 100
      return total
    },
    totalCount () {
      let count = 0
      this.selectFoods.forEach((food) => {
        count += food.count
      })
      return count
    },
    payClass () {
      if (this.totalPrice <= 0) {
        return 'not-enough'
      } else {
        return 'enough'
      }
    },
    listShow () {
      if (!this.totalCount) {
        this.fold = true
        return false
      }
      const show = !this.fold
      if (show) {
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.listContent, {
              click: true
            })
          } else {
            this.scroll.refresh()
          }
        })
      }
      return show
    }
  },
  methods: {
    toggleList () {
      if (!this.totalCount) {
        return
      }
      this.fold = !this.fold
    },
    empty () {
      this.selectFoods.forEach((food) => {
        food.count = 0
      })
    },
    pay () {
      if (this.totalPrice <= 0) {
        return
      }
      this.orderData = { deskNo: parseInt(this.id), totalPrice: this.totalPrice, order: this.selectFoods }
      this.$refs.confirm.show()
    },
    hideList () {
      this.fold = true
    }
  },
  components: {
    CartControl,
    Confirm
  }
}
</script>

<style>
    .shopcart{
        position: fixed;
        left: 0px;
        bottom: 0px;
        z-index: 50;
        width: 100%;
        height: 48px;
    }
    .shopcart > .contents{
        display: flex;
        background: #fff;
        border-top: 1px solid #ddd;
        font-size: 0;
        color: #333;
    }
    .contents > .content-left{
        flex: 1;
    }
    .contents > .content-left > .logo-wrapper{
        display: inline-block;
        vertical-align: top;
        position: relative;
        top: -10px;
        margin: 0 12px;
        padding: 6px;
        width: 56px;
        height: 56px;
        box-sizing: border-box;
        border-radius: 50%;
        background: #fff;
        border: 1px solid #ccc;
    }
    .contents > .content-left > .logo-wrapper > .logo{
        width: 100%;
        height: 100%;
        border-radius: 50%;
        text-align: center;
        background: #ccc;
        color: #fff;
    }
    .contents > .content-left > .logo-wrapper > .logo > i{
        font-size: 30px;
        display: block;
        height: 44px;
        width: 44px;
        line-height: 44px;
    }
    .contents > .content-left > .logo-wrapper > .logo.highlight{
        background: #00a0dc;
        color: #fff;
    }
    .contents > .content-left > .logo-wrapper > .num{
        position: absolute;
        top: 0px;
        right: 0px;
        width: 24px;
        height: 16px;
        line-height: 16px;
        text-align: center;
        border-radius: 16px;
        font-size: 9px;
        font-weight: 700;
        color: #fff;
        background: #f01414;
        box-shadow: 0 4px 8px 0 rgba(0,0,0,0.4);
    }
    .contents > .content-left > .price{
        display: inline-block;
        vertical-align: top;
        margin-top: 12px;
        line-height: 24px;
        padding-right: 12px;
        box-sizing: border-box;
        font-size: 16px;
        font-weight: 700;
    }
    .contents > .content-left > .desc{
        display: inline-block;
        vertical-align: top;
        margin: 12px 0 0 12px;
        line-height: 24px;
        font-size: 10px;
    }
    .contents > .content-right{
        flex: 0 0 105px;
        width: 105px;
    }
    .contents > .content-right > .pay{
        height: 48px;
        line-height: 48px;
        text-align: center;
        font-size: 12px;
        font-weight: 700;
        background: #ccc;
    }
    .contents > .content-right > .pay.not-enough{
        background: #ccc;
        color: #fff;
    }
    .contents > .content-right > .pay.enough{
        background: #00b43c;
        color: #fff;
    }

    .shopcart > .ball-container .ball{
        position: fixed;
        left: 32px;
        bottom: 22px;
        z-index: 200;
        transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41);
    }
    .shopcart > .ball-container .ball > .inner{
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background: rgb(0,160,220);
        transition: all 0.4s linear;
    }

    .shopcart > .shopcart-list{
        position: absolute;
        left: 0px;
        top: 0px;
        z-index: -1;
        width: 100%;
        transform: translate3d(0,-100%,0);
    }
    .shocart > .shopcart-list.fold-enter-active,.shocart > .shopcart-list.fold-leave-active{
        transition: all .5s;
    }
    .shopcart >.shopcart-list.fold-enter, .shopcart> .shopcart-list.fold-leave-to{
        transform: translate3d(0,0,0);
    }
    .shopcart > .shopcart-list > .list-header{
        height: 40px;
        line-height: 40px;
        padding: 0 10px;
        background: #f3f5f7;
        border-bottom: 1px solid rgba(7,17,27,0.1);
    }
    .shopcart > .shopcart-list > .list-header > .title{
        float: left;
        font-size: 14px;
        color: rgb(7,17,27);
    }
    .shopcart > .shopcart-list > .list-header > .empty{
        float: right;
        font-size: 12px;
        color: rgb(0,160,220);
    }
    .shopcart > .shopcart-list > .list-content{
        padding: 0 18px;
        max-height: 217px;
        overflow: hidden;
        background: #fff;
    }
    .shopcart > .shopcart-list > .list-content  .food{
        position: relative;
        padding: 12px 0;
        box-sizing: border-box;
    }
    .shopcart > .shopcart-list > .list-content  .food::after{
        display: block;
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        border-top: 1px solid rgba(7,17,27,0.1);
        content: ' ';
    }
    .shopcart > .shopcart-list > .list-content  .food > .name{
        line-height: 24px;
        font-size: 14px;
        color: rgb(7,17,27);
    }
    .shopcart > .shopcart-list > .list-content  .food > .price{
        position: absolute;
        right: 90px;
        bottom: 12px;
        line-height: 24px;
        font-size: 14px;
        font-weight: 700;
        color: rgb(240,20,20);
    }
    .shopcart > .shopcart-list > .list-content  .food > .cartcontrol-wrapper{
        position: absolute;
        right: 0px;
        bottom: 6px;
    }

    .list-mask{
        position: fixed;
        top: 0px;
        left: 0px;
        width: 100%;
        height: 100%;
        z-index: 40;
        backdrop-filter: blur(10px);
        opacity: 1;
        background: rgba(7, 17, 27, 0.6);
    }
    .list-mask.fade-enter-active, .list-mask.fade-leave-active{
        transition: all 0.5s;
    }
    .list-mask.fade-enter, .list-mask.fade-leave-to{
        opacity: 0;
        background: rgba(7, 17, 27, 0);
    }
</style>
