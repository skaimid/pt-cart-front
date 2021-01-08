<template>
  <a-input-group compact class="add-link">

    <a-select default-value="" placeholder="选择一个分发频道" v-model="selectChannelId" style="width: 12rem; margin-bottom: 1rem">
      <a-select-option
          v-for="ch in channels()"
          v-bind:key="ch.channelId"
          :value="ch.channelId"
      >
        {{ ch.channelName }}
      </a-select-option>
    </a-select>

    <a-input v-model="newLinkRef" placeholder="在此输入链接" style="width: 70%; margin-bottom: 1rem"></a-input>

    <a-button @click="submit">提交</a-button>

  </a-input-group>
</template>

<script>
import {mapActions} from "vuex";

export default {
  name: "AddLink",
  data() {
    return {
      selectChannelId: undefined,
      newLinkRef: "",
    };
  },
  methods: {
    ...mapActions(["newLink"]),
    channels() {
      return this.$store.state.channels;
    },
    submit() {
      if (this.selectChannelId === undefined) {
        this.$message.warn("请选择需要添加的频道");
        return;
      }
      if(this.newLinkRef === ""){
        this.$message.warn("请选择需要添加的链接");
        return;
      }
      this["newLink"]({cid: this.selectChannelId, link: this.newLinkRef})
          .then(() => {
            this.selectChannelId = undefined;
            this.newLinkRef = "";
            this.$message.info("新增成功");
          })
          .catch((err) => console.log(err));
      console.log(
          "newLink: " + this.newLinkRef + "\nchannelId: " + this.selectChannelId
      );
    },
  },
};
</script>

<style>

</style>
