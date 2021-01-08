import Vue from "vue";
import Vuex from "vuex";
import {
  getChannels,
  deleteChannle,
  login,
  validate,
  addChannels,
  newLink,
  getRssToken, resetRssToken,
} from "./api/user"; //必须用这种方式引入
import {setLocal} from "./libs/local"; //引入lib文件夹下的local.js文件中的setLocal方法（往localStorage里存放token）

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    //定义动画是否显示
    // isShowLoading:false,
    username: "",
    channels: [],
    rssToken: "",
    isLogin: false,
  },
  mutations: {
    // //使动画显示
    // showLoading(state){
    //   state.isShowLoading = true;
    // },
    // //使动画隐藏
    // hideLoading(state){
    //   state.isShowLoading = false;
    // },
    //定义修改用户名的方法
    setUser(state, username) {
      state.username = username;
    },
    setChannels(state, channels) {
      state.channels = channels;
    },
    setRssToken(state, rssToken) {
      state.rssToken = rssToken;
    },
    setIsLogin(state, rs) {
      state.isLogin = rs;
    },
  },
  // actions存放接口的调用  dispatch actions里面放方法
  actions: {
    //这里面所有的方法都是异步的

    //登录方法
    async toLogin({commit}, {username, password}) {
      // console.log("action" + username, + password)
      let r = await login(username, password); //调用user.js中的login方法，也就是调用登录接口
      // console.log(r);
      if (r.status === 200) {
        setLocal("token", r.headers.token);
        commit("setIsLogin", true);
        commit("setUser", username);
        return r.data;
      } else {
        commit("setIsLogin", false);
        return Promise.reject(r.data); //如果失败，返回一个promise失败态
      }
    },
    async toGetChannels({commit}) {
      let r = await getChannels();
      if (r.data != null) {
        commit("setChannels", r.data);
        return r.data;
      } else {
        return Promise.reject(r.data);
      }
    },
    async deleteChannles({commit}, cid) {
      let r = await deleteChannle(cid);
      if (r.data != null) {
        commit("setChannels", r.data);
        return r.data;
      } else {
        return Promise.reject(r.data);
      }
    },
    async addChannels({commit}, cname) {
      let r = await addChannels(cname);
      if (r.data != null) {
        commit("setChannels", r.data);
        return r.data;
      } else {
        return Promise.reject(r.data);
      }
    },

    // 验证token方法
    async toValidate({commit}) {
      try {
        let r = await validate(); //调用user.js中的validate方法，也就是调用验证接口
        if (r.status === 200) {
          // console.log(r)
          commit("setIsLogin", true);
          commit("setUser", r.data.username);
          // setLocal("token", r.headers.Authorization); //我们说了，验证通过，或者每次切换路由时，都要重新生成token
        }
        // console.log(commit);
        return r.status === 200; //返回token是否失效,true或者false
      } catch (e) {
        commit("setIsLogin", false);
        return Promise.reject(e)
      }
    },

    async newLink({commit}, {cid, link}) {
      let r = await newLink(cid, link);
      if (r.data != null) {
        commit("setChannels", r.data);
        return r.data;
      } else {
        return Promise.reject(r.data);
      }
    },

    async toGetRssToken() {
      let r = await getRssToken();
      if (r.status === 200) {
        this.commit("setRssToken", r.data.token);
      }
    },
    async toResetRssToken() {
      let r = await resetRssToken();
      if (r.status === 200) {
        this.commit("setRssToken", r.data.token);
      }
    }
  },
});
