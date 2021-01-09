<template>
  <div style="margin-left: 1rem; margin-top: 1rem; margin-right: 1rem">
    <h1>个人中心</h1>
    <div class="profile-welcome">欢迎您：{{ username() }}</div>
    <div style="margin-bottom: 0.5rem">在此添加新下载链接</div>
    <add-link></add-link>
    <a-divider>分发频道设置</a-divider>
    <div style="margin-bottom: 0.5rem">在此添加新的分发频道</div>
    <add-channel></add-channel>
    <channel-table></channel-table>
    <a-divider>账号安全设置</a-divider>
    <div>
      重置订阅链接
      <a-button style="margin-bottom: 1rem; margin-left: 2rem" type="danger" @click="updateRssToken">确认</a-button>
    </div>
  </div>
</template>

<script>
import AddChannel from "../components/AddChannel.vue";
import AddLink from "../components/AddLink.vue";
import ChannelTable from "../components/ChannelTable.vue";

export default {
  name: "Profile",
  components: {
    AddLink,
    AddChannel,
    ChannelTable,
  },
  mounted() {
    this.$store.dispatch("toValidate")
    this.$store.dispatch("toGetChannels");
    this.$store.dispatch("toGetRssToken");
  },
  methods: {
    username() {
      return this.$store.state.username;
    },
    updateRssToken() {
      this.$store.dispatch("toResetRssToken").then(() => {
        this.$message.success("重置成功！")
      }).catch(() => {
        this.$message.error("重置失败")
      })
    }
  },
};
</script>

<style>
.profile-welcome {
  margin-bottom: 1rem;
  font-weight: bold;
}
</style>
