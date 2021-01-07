import Vue from 'vue'
import  VueRouter from 'vue-router'
import Home from './views/Home.vue'

Vue.use(VueRouter)

// const routerHistory  = createWebHistory()
const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Home,

    },
    {
      path: '/login',
      component: () => import('./views/Login.vue')
    },
    {
      path: '/profile',
      component: () => import('./views/Profile.vue'),
      meta:{
        needLogin:true
      }
    }
  ]
})

export default router;
