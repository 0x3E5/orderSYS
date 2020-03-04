import Vue from 'vue'
import VueRouter from 'vue-router'
import NotFound from '../views/404.vue'
import Init from '../views/init/Init'
import InitAdmin from '../views/init/Admin'
import Shop from '../views/init/Shop.vue'
import Complete from '../views/init/Complete.vue'
import Admin from '../views/admin/Index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    meta: {
      title: '系统登录'
    },
    redirect: '/login',
  },
  {
    path: '/init',
    component: Init,
    meta: {
      title: '系统初始化'
    },
    children: [
      {
        path: '',
        meta: {
          title: '初始化管理员',
        },
        component: InitAdmin
      },
      {
        path: '/init/admin',
        name: 'RegAdmin',
        component: InitAdmin,
        meta: {
          title: '初始化管理员'
        }
      },
      {
        path: '/init/shop',
        name: 'SetShop',
        component: Shop,
        meta: {
          title: '设置店铺信息'
        }
      },
      {
        path: '/init/complete',
        name: 'Complete',
        component: Complete,
        meta: {
          title: '初始化完成'
        }
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    meta: {
      title: '系统登录'
    },
    component: () => import('../views/admin/Login')
  },
  {
    path: '/admin',
    component: Admin,
    children: [
      {
        path: '',
        meta: {
          title: '首页'
        },
        component: () => import('../views/admin/Home.vue')
      },
      {
        path: '/admin/home',
        name: 'Home',
        meta: {
          title: '首页'
        },
        component: () => import('../views/admin/Home.vue')
      },
      {
        path: '/admin/category',
        name: 'Category',
        meta: {
          title: '分类管理'
        },
        component: () => import('../views/admin/Category.vue')
      },
      {
        path: '/admin/commodity',
        name: 'Commodity',
        meta: {
          title: '商品管理'
        },
        component: () => import('../views/admin/Commodity.vue')
      },
      {
        path: '/admin/qrcode',
        name: 'QRcode',
        meta: {
          title: '点餐码管理'
        },
        component: () => import('../views/admin/QRCode.vue')
      },
      {
        path: '/admin/shop',
        name: 'Shop',
        meta: {
          title: '店铺信息'
        },
        component: () => import('../views/admin/Shop.vue')
      },
      {
        path: '/admin/user',
        name: 'User',
        meta: {
          title: '个人信息'
        },
        component: () => import('../views/admin/User.vue')
      }
    ]
  },
  {
    path: '/*',
    name: 'NotFound',
    meta: {
      title: 'NotFound'
    },
    component: NotFound
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


function setTitle (to) {
  if (to.meta.title) {
    document.title = to.meta.title
  }
}

// 路由守卫
router.beforeEach((to,from,next)=>{
  setTitle(to)
  const isLogin = localStorage.getItem('orderTk')?true:false;
  if(to.path=="/login"){
    next();
  }else{
    isLogin?next():next('/login');
  }
})

export default router
