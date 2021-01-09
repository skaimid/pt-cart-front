<template>
  <div class="home-body">
    <div class="banner">
      <div class="mask">
        <div class="banner-text">
          <h1 style="color: azure;width: 100%;text-align: center">PT 小货车</h1>
          <h3 style="color: azure;width: 100%;text-align: center">PT/BT自定义订阅源</h3>
        </div>
      </div>
    </div>
    <div class="board">
      <ShowCase img-url="/images/logo.png" title="test" detail="asdasdasdasdas"></ShowCase>
      <ShowCase img-url="/images/logo.png" title="tttt" detail="asdasdasdasqwrewq"></ShowCase>
      <ShowCase img-url="/images/logo.png" title="rerr" detail="ghjfgdfgd"></ShowCase>
    </div>
    <div style="width: 100%;margin-top: 2rem" class="banner-text">
      <h2 style="width: 100%;text-align: center; margin: 1rem">
        注册或者登录以开始:
      </h2>
      <a-button size="large" type="primary" @click="handleNextClick">现在开始</a-button>
    </div>

    <div style="width: 100%;margin-top: 2rem; text-align: center;padding: 1rem" class="banner-text">
      copyright 2020
    </div>
  </div>
</template>

<script>
import ShowCase from "@/components/ShowCase";

export default {
  name: 'home',
  components: {ShowCase},
  methods: {
    handleNextClick() {
      this.$router.push("/login");
    }

  }
}
</script>

<style scoped>
.home-body {
  height: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.banner {
  background: url('/images/background.png') center center / cover no-repeat;
  width: 100%;
  height: 85%;
  display: flex;
  justify-content: center; /* 水平居中 */
}

.mask {
  background-color: rgba(0, 0, 0, 0.3);
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center; /* 垂直居中 */
  justify-content: center; /* 水平居中 */
}

.banner-text {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}

.board {
  margin-top: 2rem;
  padding: 2rem;
  width: 100%;
  max-width: 1140px;
  transition: background-color 0.2s ease-in-out;
  border-radius: 0.5rem;
  z-index: 3;
  box-shadow: 0 12px 15px 0 rgba(0, 0, 0, 0.24), 0 17px 50px 0 rgba(0, 0, 0, 0.19);
  display: flex;
  flex-wrap: wrap;
}

</style>


