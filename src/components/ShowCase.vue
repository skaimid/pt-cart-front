<template>
  <div class="content-warp">
    <img class="img-warp" v-bind:src="imgUrl"/>
    <div class="descriptor-warp">
      <h1>{{ title }}</h1>
      <h3>{{ detail }}</h3>
    </div>
  </div>

</template>

<script>
export default {
  name: "ShowCase",
  props: {
    imgUrl: String,
    title: String,
    detail: String
  }
}
</script>

<style scoped>
.content-warp {
  margin-top: 2rem;
  max-width: 85%;
  width: 100%;
  display: flex;
  justify-content: left;
}

.img-warp {
  max-width: 30%;
  margin-right: 4rem;
}

.descriptor-warp {
  width: 100%;
}
</style>
