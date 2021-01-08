import Vue from 'vue';
import Antd from 'ant-design-vue';
import App from './App';
import 'ant-design-vue/dist/antd.css';
import router from './router'
import store from './stroe'
import VueClipboard from 'vue-clipboard2'

Vue.config.productionTip = false;

router.beforeEach(async (to, from, next) => {
  let isLogin = false;
  try {
    isLogin = await store.dispatch('toValidate')  //判断是否登录了
  } catch (e) {
    isLogin = false;
  }

  // needLogin  表示哪些路由需要在登录条件下才能访问
  let needLogin = to.matched.some(match => match.meta.needLogin)
  console.log("needLogin", needLogin);
  if (needLogin) {
    //需要登录
    if (isLogin) {
      //登录过了
      next()
    } else {
      //没有登录
      next('/login')
    }
  } else {
    //不需要登录
    if (isLogin && (to.path === '/login' || to.path === '/register')) {  //如果你访问login或者reg页面，则给你跳到首页面，因为不需要登录
      next('/profile')
    } else {
      next()
    }
  }
})


Vue.use(Antd)
Vue.use(VueClipboard)


/* eslint-disable no-new */
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
