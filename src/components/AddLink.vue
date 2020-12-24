<template>
  <div>
    <a-select default-value="" v-model="selectChannelId" style="width: 120px">
      <a-select-option
        v-for="ch in channels()"
        v-bind:key="ch.channelId"
        :value="ch.channelId"
      >
        {{ ch.channelName }}
      </a-select-option>
    </a-select>

    <a-input v-model="newLinkRef" placeholder="在此输入链接"></a-input>

    <a-button @click="submit">提交</a-button>
  </div>
</template>

<script>
import { mapActions } from "vuex";
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
      if (this.selectChannelId == undefined) {
        this.$message.warn("请选择需要添加的频道");
      }
      this["newLink"]({ cid: this.selectChannelId, link: this.newLinkRef })
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

<style></style>
