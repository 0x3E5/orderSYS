import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    meta: {
      title: '系统登录'
    },
    redirect: '/login'
  },
  {
    path: '/init',
    component: () => import('../views/init/Init'),
    meta: {
      title: '系统初始化'
    },
    children: [
      {
        path: '',
        meta: {
          title: '初始化管理员'
        },
        component: () => import('../views/init/Admin')
      },
      {
        path: '/init/admin',
        name: 'RegAdmin',
        component: () => import('../views/init/Admin'),
        meta: {
          title: '初始化管理员'
        }
      },
      {
        path: '/init/shop',
        name: 'SetShop',
        component: () => import('../views/init/Shop'),
        meta: {
          title: '设置店铺信息'
        }
      },
      {
        path: '/init/complete',
        name: 'Complete',
        component: () => import('../views/init/Complete'),
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
    component: () => import('../views/admin/Index'),
    children: [
      {
        path: '',
        meta: {
          title: '首页'
        },
        component: () => import('../views/admin/Home')
      },
      {
        path: '/admin/home',
        name: 'Home',
        meta: {
          title: '首页'
        },
        component: () => import('../views/admin/Home')
      },
      {
        path: '/admin/order',
        name: 'Order',
        meta: {
          title: '订单管理'
        },
        component: () => import('../views/admin/Order')
      },
      {
        path: '/admin/history',
        name: 'History',
        meta: {
          title: '历史订单'
        },
        component: () => import('../views/admin/History')
      },
      {
        path: '/admin/category',
        name: 'Category',
        meta: {
          title: '分类管理'
        },
        component: () => import('../views/admin/Category')
      },
      {
        path: '/admin/commodity',
        name: 'Commodity',
        meta: {
          title: '商品管理'
        },
        component: () => import('../views/admin/Commodity')
      },
      {
        path: '/admin/qrcode',
        name: 'QRcode',
        meta: {
          title: '点餐码管理'
        },
        component: () => import('../views/admin/QRCode')
      },
      {
        path: '/admin/shop',
        name: 'Shop',
        meta: {
          title: '店铺信息'
        },
        component: () => import('../views/admin/Shop')
      },
      {
        path: '/admin/user',
        name: 'User',
        meta: {
          title: '个人信息'
        },
        component: () => import('../views/admin/User')
      },
      {
        path: '/admin/*',
        name: 'AdminNotFount',
        meta: {
          title: '出错了'
        },
        component: () => import('../views/404')
      }
    ]
  },
  {
    path: '/index/:id',
    name: 'UserShop',
    props: true,
    meta: {
      title: '在线点餐'
    },
    component: () => import('../views/user/Index')
  },
  {
    path: '/*',
    name: 'NotFound',
    meta: {
      title: '出错了'
    },
    component: () => import('../views/404')
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
router.beforeEach((to, from, next) => {
  setTitle(to)
  const isLogin = !!localStorage.getItem('orderTk')
  if (to.path == '/login' || to.path == '/init' || to.path == '/init/admin' || to.path == '/init/shop' || to.path == '/init/complete' || to.path.startsWith('/index/')) {
    next()
  } else {
    isLogin ? next() : next('/login')
  }
})

export default router
