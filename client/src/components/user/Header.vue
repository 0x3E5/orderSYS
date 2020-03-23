<template>
    <div class="header">
        <div class="content-wrapper">
            <div class="avatar">
                <img :src="shopInfo.shopImg" height="64" width="64" alt="">
            </div>
            <div class="shop-info">
                <div class="title">{{ shopInfo.shopName }}</div>
                <div class="intro">{{ shopInfo.shopIntro }}</div>
            </div>
            <div class="detail-btn" @click="showDetail">
                <span>详情</span>
                <i class="el-icon-arrow-right"></i>
            </div>
        </div>
        <div class="notice-wrapper" @click="showDetail">
            <span class="notice-title"></span>
            <span class="notice-text">{{ shopInfo.shopNotice }}</span>
            <i class="el-icon-arrow-right"></i>
        </div>
        <div class="background">
            <img :src="shopInfo.shopImg" width="100%" height="100%" alt="">
        </div>
        <transition name="el-fade-in">
            <div v-show="isShow" class="detail">
                <div class="detail-wrapper clearfix">
                    <div class="detail-main">
                        <img :src="shopInfo.shopImg" width="90px" height="90px" alt="">
                        <h1 class="name">{{ shopInfo.shopName }}</h1>
                        <div class="title">
                            <div class="line"></div>
                            <div class="text">店铺详情</div>
                            <div class="line"></div>
                        </div>
                        <div class="text">
                            <p>{{ shopInfo.shopIntro }}</p>
                        </div>
                        <div class="title">
                            <div class="line"></div>
                            <div class="text">店铺公告</div>
                            <div class="line"></div>
                        </div>
                        <div class="text">
                            <p>{{ shopInfo.shopNotice }}</p>
                        </div>
                    </div>
                </div>
                <div class="detail-close" @click="showDetail">
                    <i class="el-icon-close"></i>
                </div>
            </div>
        </transition>
    </div>
</template>
<script>

export default {
  data () {
    return {
      shopInfo: {
        shopName: '',
        shopIntro: '',
        shopNotice: '',
        shopImg: ''
      },
      isShow: false
    }
  },
  methods: {
    showDetail () {
      this.isShow = !this.isShow
    }
  },
  created () {
    this.$axios.get('/api/shop/get')
      .then(res => {
        this.shopInfo = res.data
      })
  }
}
</script>
<style>
    .header{
        position: relative;
        overflow: hidden;
        color: #fff;
        background:rgba(7, 17, 27, 0.5);
    }
    .content-wrapper{
        position: relative;
        padding: 24px 12px 15px 24px;
    }
    .content-wrapper > .avatar{
        display: inline-block;
        vertical-align: top;
        border-radius: 2px;
        overflow: hidden;
    }
    .content-wrapper > .shop-info{
        display: inline-block;
        width: 60%;
        margin-left: 16px;
        vertical-align: baseline;
    }
    .content-wrapper > .shop-info > .title{
        font-size: 100%;
        font-weight: bold;
        margin: 2px 0 8px 0;
    }
    .content-wrapper > .shop-info > .intro{
        font-size: 12px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .content-wrapper > .detail-btn {
        position: absolute;
        right: 12px;
        font-size: 10px;
        bottom: 14px;
        padding: 0 8px;
        height: 24px;
        line-height: 24px;
        border-radius: 14px;
        background: rgba(0,0,0,0.2);
    }
    .notice-wrapper{
        position: relative;
        height: 28px;
        line-height: 28px;
        padding: 0 22px 0 12px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        background: rgba(7,17,27,0.2);
    }
    .notice-wrapper > .notice-title{
        display: inline-block;
        vertical-align: top;
        margin-top: 8px;
        width: 22px;
        height: 12px;
        background-image: url('../../assets/images/notice.png');
        background-size: 22px 12px;
        background-repeat: no-repeat;
    }
    .notice-wrapper > .notice-text{
        vertical-align: top;
        font-size: 10px;
        margin: 0 6px;
    }
    .notice-wrapper > i {
        position: absolute;
        font-size: 10px;
        right: 12px;
        top: 8px;
    }
    .background{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
        filter: blur(10px);
    }
    .detail{
        position: fixed;
        /* display: none; */
        z-index: 100;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: auto;
        background: rgba(7,17,27,0.8);
    }
    .detail > .detail-wrapper{
        width: 100%;
        min-height: 100%;
    }
    .detail-wrapper > .detail-main{
        padding-top: 64px;
        padding-bottom: 64px;
    }
    .detail-main > img{
        display: block;
        border-radius: 50%;
        margin: 15px auto;
    }
    .detail-main > .name{
        line-height: 16px;
        text-align: center;
        font-size: 16px;
        font-weight: 700;
    }
    .detail-main > .title{
        display: flex;
        width: 80%;
        margin: 28px auto 24px auto;
    }
    .title>.line{
        flex: 1;
        position: relative;
        top: -6px;
        border-bottom: 1px solid rgba(255,255,255,0.2);
    }
    .title>.text{
        padding: 0 12px;
        font-weight: 700;
        font-size: 14px;
    }
    .detail-main > .text{
        width: 80%;
        margin: 0 auto;
    }
    .detail-main>.text>p{
        padding: 0 12px;
        line-height: 24px;
        font-size: 12px;
    }
    .detail > .detail-close{
        position: relative;
        width: 32px;
        height: 32px;
        margin: -64px auto 0 auto;
        clear: both;
        font-size: 32px;
    }
    .show{
        display: block;
    }
    .clearfix::after{
        display: inline-block;
        content: '.';
        height: 0;
        line-height: 0;
        clear: both;
        visibility: hidden;
    }
</style>
