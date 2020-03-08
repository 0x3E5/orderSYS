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
                    <div class="desc">另需配送费¥{{deliveryPrice}}元</div>
                </div>
                <div class="content-right" @click.stop.prevent="pay">
                    <div class="pay" :class="payClass">
                        {{payDesc}}
                    </div>
                </div>
            </div>
            <div class="ball-container">
                <div v-for="(ball,index) in balls" :key="index">
                    <transition name="drop" @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
                        <div v-show="ball.show" class="ball">
                            <div class="inner inner-hook"></div>
                        </div>
                    </transition>
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
                                    <span>¥{{food.price*food.count}}</span>
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
    </div>
</template>

<script>
import BScroll from 'better-scroll';
import CartControl from '@/components/user/CartControl';
export default {
    name:'shopCart',
    props: {
        selectFoods: {
            type: Array,
            default () {
                return [{
                    price: 30,
                    count: 1
                }];
            }
        },
        deliveryPrice: {
            type: Number,
            default: 4
        },
        minPrice: {
            type: Number,
            default: 10
        }
    },
    data() {
        return {
            balls: [{
                show: false
            }, {
                show: false
            }, {
                show: false
            }, {
                show: false
            }, {
                show: false
            }],
            dropBalls: [],
            fold: true
        };
    },
    computed: {
        totalPrice() {
            let total = 0;
            this.selectFoods.forEach((food) => {
                total += food.price * food.count;
            });
            return total;
        },
        totalCount() {
            let count = 0;
            this.selectFoods.forEach((food) => {
                count += food.count;
            });
            return count;
        },
        payDesc() {
            if (this.totalPrice === 0) {
                return `¥${this.minPrice}元起送`;
            } else if (this.totalPrice < this.minPrice) {
                let diff = this.minPrice - this.totalPrice;
                return `还差¥${diff}元起送`;
            } else {
                return '去结算';
            }
        },
        payClass() {
            if (this.totalPrice < this.minPrice) {
                return 'not-enough';
            } else {
                return 'enough';
            }
        },
        listShow() {
            if (!this.totalCount) {
                this.fold = true;
                return false;
            }
            let show = !this.fold;
            if (show) {
                this.$nextTick(() => {
                    if (!this.scroll) {
                        this.scroll = new BScroll(this.$refs.listContent, {
                            click: true
                        });
                    } else {
                        this.scroll.refresh();
                    }
                });
            }
            return show;
        }
    },
    methods: {
        drop(el) {
            for (let i = 0; i < this.balls.length; i++) {
                let ball = this.balls[i];
                if (!ball.show) {
                    ball.show = true;
                    ball.el = el;
                    this.dropBalls.push(ball);
                    return;
                }
            }
        },
        toggleList() {
            if (!this.totalCount) {
                return;
            }
            this.fold = !this.fold;
        },
        empty() {
            this.selectFoods.forEach((food) => {
                food.count = 0;
            });
        },
        pay() {
            if (this.totalPrice < this.minPrice) {
                return;
            }
            window.alert('支付' + this.totalPrice + '元');
        },
        hideList() {
            this.fold = true;
        },
        beforeEnter(el) {
            let count = this.balls.length;
            while (count--) {
                let ball = this.balls[count];
                if (ball.show) {
                    let rect = ball.el.getBoundingClientRect();
                    let x = rect.left - 32;
                    let y = -(window.innerHeight - rect.top - 22);
                    el.style.display = '';
                    el.style.webkitTransform = `translate3d(0,${y}px,0)`;
                    el.style.tranform = `translate3d(0,${y}px,0)`;
                    let inner = el.getElementsByClassName('inner-hook')[0];
                    inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
                    inner.style.tranform = `translate3d(${x}px,0,0)`;
                }
            }
        },
        enter(el) {
            // 触发浏览器重绘
            /* eslint-disable no-unused-vars */
            let rf = el.offsetHeight;
            this.$nextTick(() => {
                el.style.webkitTransform = 'translate3d(0,0,0)';
                el.style.tranform = 'translate3d(0,0,0)';
                let inner = el.getElementsByClassName('inner-hook')[0];
                inner.style.webkitTransform = 'translate3d(0,0,0)';
                inner.style.tranform = 'translate3d(0,0,0)';
            });
        },
        afterEnter(el) {
            let ball = this.dropBalls.shift();
            if (ball) {
                ball.show = false;
                el.style.display = 'none';
            }
        }
    },
    components: {
        CartControl
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
        background: #141d27;
        font-size: 0;
        color: rgba(255,255,255,0.4);
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
        background: #141d27;
    }
    .contents > .content-left > .logo-wrapper > .logo{
        width: 100%;
        height: 100%;
        border-radius: 50%;
        text-align: center;
        background: #2b343c;
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
        border-right: 1px solid rgba(255,255,255,0.1);
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
        background: #2b333b;
    }
    .contents > .content-right > .pay.not-enough{
        background: #2b333b;
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