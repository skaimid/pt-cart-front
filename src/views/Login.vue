<template>
  <div style="margin-left: 1rem; margin-top: 1rem; margin-right: 1rem">
    <a-row>
      <a-col :span="8">
        <a-input v-model="username" placeholder="请输入用户名" class="login-input"></a-input>
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="8">
        <a-input-password v-model="password" placeholder="请输入密码" class="login-input"></a-input-password>
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="8">
        <a-button @click="loginClick" type="primary"> 登录</a-button>
        <a-button @click="registerClick" style="margin-left: 1rem">注册</a-button>
      </a-col>
    </a-row>
  </div>
</template>

<script>
// import ref from "vue";
import {mapActions} from "vuex";

export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: ""
    };
  },
  // beforeRouteUpdate(to, from, next) {
  //   console.log(from.path)
  //   if (from.path === "/profile") {
  //     this.$message.error("请您登录")
  //   }
  //   next()
  // },
  methods: {
    ...mapActions(["toLogin"]),
    loginClick() {
      this["toLogin"]({username: this.username, password: this.password})
          .then((data) => {
            //因为toLogin返回的是一个Promise，所以可以.then
            this.$router.push("/"); //登录成功，跳到首页面
            console.log(data);
          })
          .catch((err) => {
            console.log(err);
            this.$message.error("登录失败", {
              confirmButtonText: "确定",
            });
          });
    },
    registerClick() {
      this.$router.push('/register')
    },

  },
};
</script>

<style>
.login-input {
  margin-bottom: 1rem;

}

.login-button {
}
</style>
