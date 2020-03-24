<template>
    <el-row class="menu-page">
        <el-col :span="24">
            <h5 class="leftLogo">在线点餐系统</h5>
            <el-menu
            :default-active="active"
            background-color="#304156"
            text-color="#fff"
            active-text-color="#409EFF">
                <template v-for="item in items">
                    <router-link v-if="!item.isGroup" :to="item.path" :key="item.path">
                        <el-menu-item
                        :index="item.path"
                        >
                            <i :class="item.icon"></i>
                            <span slot="title">{{item.name}}</span>
                        </el-menu-item>
                    </router-link>
                    <el-submenu v-if="item.children" :index="item.path" :key="item.path">
                        <template slot="title">
                            <i :class="item.icon"></i>
                            <span slot="title">{{ item.name }}</span>
                        </template>
                        <router-link v-for="(citem,cindex) in item.children" :to="citem.path" :key="cindex">
                            <el-menu-item :index="citem.path"><span slot="title">{{citem.name}}</span></el-menu-item>
                        </router-link>
                    </el-submenu>
                </template>
            </el-menu>
        </el-col>
    </el-row>
</template>

<script>
export default {
  name: 'leftNav',
  data () {
    return {
      items: [
        {
          icon: 'el-icon-odometer',
          name: '运营统计',
          path: '/admin/home',
          isGroup: false
        },
        {
          icon: 'el-icon-document',
          name: '订单管理',
          path: '/admin/order',
          isGroup: false
        },
        {
          icon: 'el-icon-takeaway-box',
          name: '历史订单',
          path: '/admin/history',
          isGroup: false
        },
        {
          icon: 'el-icon-receiving',
          name: '分类管理',
          path: '/admin/category',
          isGroup: false
        },
        {
          icon: 'el-icon-box',
          name: '商品管理',
          path: '/admin/commodity',
          isGroup: false
        },
        {
          icon: 'el-icon-mobile',
          name: '点餐码管理',
          path: '/admin/qrcode',
          isGroup: false
        },
        {
          icon: 'el-icon-setting',
          name: '系统管理',
          path: 'system',
          isGroup: true,
          children: [
            { path: '/admin/shop', name: '店铺信息' },
            { path: '/admin/user', name: '个人信息' }
          ]
        }
      ]
    }
  },
  computed: {
    active () {
      if (location.pathname === '/admin') {
        return '/admin/home'
      }
      return location.pathname
    }
  }
}
</script>

<style scoped>
a{
    text-decoration: none;
}
.leftLogo{
    height: 60px;
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    color: #fff;
    font-size: 25px;
    letter-spacing: 3px;
    text-align: center;
    line-height: 60px;
    background-color: #4c84ff;
}
.menu-page{
    min-height: 100%;
    background-color: #304156;
    z-index: 99;
}
.el-menu{
    border-right: none;
}
</style>
