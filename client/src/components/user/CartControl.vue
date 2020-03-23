<template>
    <div class="cartcontrol">
        <transition name="move">
            <div class="cart-decrease" v-show="food.count>0" @click.stop.prevent="decreaseCart">
                <span class="inner el-icon-remove-outline"></span>
            </div>
        </transition>
        <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
        <div class="cart-add el-icon-circle-plus" @click.stop.prevent="addCart"></div>
    </div>
</template>
<script>
export default {
  props: {
    food: {
      type: Object
    }
  },
  methods: {
    addCart (event) {
      if (!event._constructed) {
        return
      }
      if (!this.food.count) {
        this.$set(this.food, 'count', 1)
      } else {
        this.food.count++
      }
    },
    decreaseCart (event) {
      if (!event._constructed) {
        return
      }
      if (this.food.count) {
        this.food.count--
      }
    }
  }
}
</script>
<style>
.cartcontrol{
	font-size: 0;
}
.cartcontrol .cart-decrease{
    display: inline-block;
    padding: 6px;
    transform: translate3d(0,0,0) rotate(0);
}
.cartcontrol .cart-decrease > .inner{
    display: inline-block;
    line-height: 24px;
    font-size: 24px;
    color: rgb(0,160,220);
}

.cartcontrol .cart-decrease.move-enter-active, .cartcontrol .cart-decrease.move-leave-active{
    transition: all .4s linear;
}
.cartcontrol .cart-decrease.move-enter, .cartcontrol .cart-decrease.move-leave-to{
    opacity: 1;
    transform: translate3d(24px,0,0) rotate(180deg);
}
.cartcontrol > .cart-count{
    display: inline-block;
    vertical-align: top;
    width: 12px;
    padding-top: 6px;
    line-height: 24px;
    text-align: center;
    font-size: 10px;
    color: rgb(147,153,159);
}
.cartcontrol > .cart-add{
    display: inline-block;
    padding: 6px;
    line-height: 24px;
    font-size: 24px;
    color: rgb(0,160,220);
}
</style>
