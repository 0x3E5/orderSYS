<template>
    <div>
        <div id="commodities">
            <div class="tab-title">商品列表</div>
            <div class="goods">
                <div class="menu-wrapper" ref="menuWrapper">
                    <ul>
                        <li v-for="(item,index) in goods" :key='index' :class="{'menu-item':true,'current':currentIndex === index}" @click="selectMenu(index,$event)" ref="menuList">
                            <span class="text border-1px">
                                {{item.name}}
                            </span>
                        </li>
                    </ul>
                </div>
                <div class="foods-wrapper" ref="foodsWrapper">
                    <ul>
                        <li v-for="(item,index) in goods" :key='index' class="food-list food-list-hook">
                            <h1 class="title">{{item.name}}</h1>
                            <ul>
                                <li @click="selectFood(food,$event)" v-for="food in item.foods" :key='food._id' class="food-item">
                                    <div class="icon">
                                        <img width="57" height="57" :src="food.img">
                                    </div>
                                    <div class="contents">
                                        <h2 class="name">{{food.name}}</h2>
                                        <div class="desc">{{food.describe}}</div>
                                        <div class="price">
                                            <span class="now">¥{{food.price}}</span><span class="old" v-show="food.isDiscount">¥{{food.onSale}}</span>
                                        </div>
                                        <div v-if="!food.soldOut" class="cartcontrol-wrapper">
                                            <CartControl :food="food"></CartControl>
                                        </div>
                                        <div v-else class="sold-out">已售罄</div>
                                    </div>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
            <ShopCart ref="shopcart" :selectFoods="selectFoods" :showConfirm="showConfirm" :id="id"></ShopCart>
        </div>
        <CommodityDetail ref="detail" :food="selectedFood"></CommodityDetail>
    </div>
</template>

<script>
import BScroll from 'better-scroll'
import ShopCart from '@/components/user/ShopCart'
import CartControl from '@/components/user/CartControl'
import CommodityDetail from '@/components/user/CommodityDetail'
export default {
  name: 'commoditiesList',
  props: ['id'],
  data () {
    return {
      goods: [],
      listHeight: [],
      scrollY: 0,
      drop: [],
      selectedFood: {},
      showConfirm: false
    }
  },
  methods: {
    selectMenu (index, event) {
      // 把原生自带的click事件过滤掉
      if (!event._constructed) {
        return
      }
      const foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook')
      const el = foodList[index]
      this.foodScroll.scrollToElement(el, 300)
    },
    selectFood (food, event) {
      if (!event._constructed) {
        return
      }
      this.selectedFood = food
      this.$refs.detail.show()
    },
    _initScroll () {
      this.meunScroll = new BScroll(this.$refs.menuWrapper, {
        click: true
      })
      this.foodScroll = new BScroll(this.$refs.foodsWrapper, {
        click: true,
        probeType: 3
      })
      this.foodScroll.on('scroll', (pos) => {
        if (pos.y <= 0) {
          this.scrollY = Math.abs(Math.round(pos.y))
        }
      })
    },
    _calculateHeight () {
      const foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook')
      let height = 0
      this.listHeight.push(height)
      for (let i = 0; i < foodList.length; i++) {
        const item = foodList[i]
        height += item.clientHeight
        this.listHeight.push(height)
      }
    },
    _followScroll (index) {
      const menuList = this.$refs.menuList
      const el = menuList[index]
      this.meunScroll.scrollToElement(el, 300, 0, -100)
    }
  },
  computed: {
    currentIndex () {
      for (let i = 0; i < this.listHeight.length; i++) {
        const height1 = this.listHeight[i]
        const height2 = this.listHeight[i + 1]
        if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
          this._followScroll(i)
          return i
        }
      }
      return 0
    },
    selectFoods () {
      const foods = []
      this.goods.forEach((good) => {
        good.foods.forEach((food) => {
          if (food.count) {
            foods.push(food)
          }
        })
      })
      return foods
    }
  },
  created () {
    this.$axios.get('/api/commodity/menu')
      .then(res => {
        this.goods = res.data
        this.$nextTick(() => {
          this._initScroll()
          this._calculateHeight()
        })
      })
      .catch(err => console.log(err))
  },
  components: {
    ShopCart,
    CartControl,
    CommodityDetail
  }
}
</script>

<style scoped>
    #commodities > .tab-title{
        position: relative;
        height: 40px;
        text-align: center;
        line-height: 40px;
        color: #333;
    }
    #commodities > .tab-title::after{
        display: block;
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        border-top: 1px solid rgba(7,17,27,0.1);
        content: ' ';
    }
    #commodities > .goods{
        display: flex;
        position: absolute;
        top: 174px;
        bottom: 46px;
        width: 100%;
        overflow: hidden;
    }
    #commodities > .goods > .menu-wrapper{
        flex: 0 0 80px;
        width: 80px;
        background: #f3f5f7;
    }
    .menu-wrapper > ul > .menu-item{
        display: table;
        height: 54px;
        width: 56px;
        line-height: 14px;
        padding: 0 12px;
    }
    .menu-wrapper > ul > .current{
        position: relative;
        z-index: 10;
        margin-top: -1px;
        color: #000!important;
        background: #fff;
        font-weight: 700;
    }
    .menu-wrapper > ul > .current::before{
        content: '';
        position: absolute;
        height: 30px;
        width: 3px;
        background:#297FFF;
        top: 50%;
        left: 0;
        transform: translateY(-50%);
    }
    .goods .text{
        display: table-cell;
        vertical-align: middle;
        text-align: center;
        color: #666;
        width: 56px;
        font-size: 12px;
        position: relative;
    }
    .goods .text::after{
        display: block;
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        border-top: 1px solid rgba(7,17,27,0.1);
        content: ' ';
    }
    #commodities > .goods > .foods-wrapper{
        flex: 1;
        min-width: 0;
    }
    .goods > .foods-wrapper .title{
        padding-left: 14px;
        height: 26px;
        line-height: 26px;
        border-left: 2px solid #d9dde1;
        font-size: 12px;
        color: #93999f;
        background: #f3f5f7;
        font-weight: bold;
    }
    .goods > .foods-wrapper .food-item{
        display: flex;
        margin: 18px;
        padding-bottom: 18px;
        position: relative;
    }
    .goods > .foods-wrapper .food-item::after{
        display: block;
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        border-top: 1px solid rgba(7,17,27,0.1);
        content: ' ';
    }
    .goods > .foods-wrapper .food-item:last-of-type::after{
        border-top: 0px solid rgba(7,17,27,0.1);
    }
    .foods-wrapper .food-item > .icon{
        flex: 0 0 57px;
        margin-right: 10px;
    }
    .foods-wrapper .food-item > .contents{
        flex: 1;
        min-width: 0;
    }

    .food-item > .contents > .name{
        margin: 2px 0 8px 0;
        height: 14px;
        line-height: 14px;
        font-size: 14px;
        color: #07111b;
        font-weight: bold;
    }
    .food-item > .contents > .desc{
        line-height: 12px;
        margin-bottom: 8px;
        font-size: 10px;
        color: #93999f;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .food-item > .contents > .price{
        font-weight: 700;
        line-height: 24px;
    }
    .food-item > .contents > .price > .now{
        margin-right: 8px;
        font-size: 14px;
        color: #f01414;
    }
    .food-item > .contents > .price > .old{
        text-decoration: line-through;
        font-size: 10px;
        color: #93999f;
    }
    .food-item > .contents > .cartcontrol-wrapper{
        position: absolute;
        right: 0px;
        bottom: 12px;
    }
    .food-item > .contents > .sold-out{
        position: absolute;
        right: 0px;
        bottom: 20px;
        font-size: 14px;
        color: #666;
    }
</style>
