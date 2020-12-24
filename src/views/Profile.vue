<template>
  <div>
    <h1>个人中心</h1>
    <div>{{ username() }}</div>
    <add-link></add-link>
    <channel-table></channel-table>
    <add-channel></add-channel>
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
  },
};
</script>
