<template>
  <div>
    <a-input-group compact>
      <a-input v-model="newChannel" placeholder="在此输入新频道名称" style="margin-bottom: 1rem; width: 20rem; max-width: 90%"></a-input>
      <a-button @click="submit">提交</a-button>
    </a-input-group>
  </div>
</template>

<script>
import {mapActions} from "vuex";

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
          .then(() => {
            this.newChannel = ''
            this.$message.info('增加频道成功')
          })
          .catch((err) => console.log('addChannels fails: ' + err))
    },
  },
};
</script>

<style></style>
