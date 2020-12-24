<template>
  <div id="app">
    <a-menu v-model="current" mode="horizontal">
      <a-menu-item key="/">
        <router-link to="/"> <a-icon type="mail" />主页 </router-link>
      </a-menu-item>

      <a-menu-item key="login">
        <router-link to="/login"> <a-icon type="mail" />登录 </router-link>
      </a-menu-item>

      <a-menu-item key="profile">
        <router-link to="/profile"><a-icon type="mail" />管理 </router-link>
      </a-menu-item>
    </a-menu>
    <router-view></router-view>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "App",
  data() {
    return {
      current: ["mail"],
    };
  },
  mounted(){
    this.current = [this.$route.path]
    console.log(this.$route.fullPath)
  },
  methods: {
    ...mapActions(["toValidate"]),
  },
  watch: {
    $route(to) {
      if (to === "/profile") {
        this.current = ["profile"];
      }
      if (to === "/") {
        this.current = ["/"];
      }
      if (to === "/login") {
        this.current = ["login"];
      }
    },
  },
};
</script>

<style></style>
