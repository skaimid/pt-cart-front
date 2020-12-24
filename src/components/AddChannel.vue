<template>
  <div>
    <a-input v-model="newChannel" placeholder="在此输入新频道名称"></a-input>

    <a-button @click="submit">提交</a-button>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      newChannel: '',
    };
  },
  methods: {
    ...mapActions(["addChannels"]),
    submit() {
      console.log(this.newChannel);
      this["addChannels"](this.newChannel)
      .then(()=>{
          this.newChannel=''
          this.$message.info('增加频道成功')
      })
      .catch((err)=>console.log('addChannels fails: ' + err))
    },
  },
};
</script>

<style></style>
