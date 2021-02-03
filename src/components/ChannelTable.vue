<template>
  <div>
    <a-table :columns="columns" :data-source="channels()" rowKey="channelId">
      <span slot="link" slot-scope="text, record">
        <a :href="generateRss(record.channelId)">{{ generateRss(record.channelId) }}</a>
      </span>

      <span slot="num" slot-scope="text, record">
        {{ record.linkSet.length }}
      </span>

      <span slot="action" slot-scope="text, record">
        <a-button size="small" type="primary" v-clipboard:copy="generateRss(record.channelId)"
                  v-clipboard:success="copySuccess">复制链接</a-button>
        <a-button size="small" type="danger" @click="removeClick(record.channelId)"
                  style="margin-left: 0.5rem">删除</a-button>

      </span>
    </a-table>

    <!-- 删除弹出 -->
    <a-modal
        title="确认删除？"
        :visible="confirmVis"
        :confirm-loading="confirmLoading"
        @ok="handleOk"
        @cancel="handleCancel"
    >删除后不可恢复！
    </a-modal>
  </div>
</template>

<script>
import {mapActions} from "vuex";

export default {
  name: "ChannelTable",
  data() {
    return {
      confirmVis: false,
      confirmLoading: false,
      tempCId: 0,
      columns: [
        {
          title: "名称",
          dataIndex: "channelName",
          key: "channelName",
        },
        {
          title: "现存链接数",
          dataIndex: "num",
          scopedSlots: {customRender: "num"},
        },
        {
          title: "订阅链接",
          dataIndex: "link",
          scopedSlots: {customRender: "link"},
        },
        {
          title: "操作",
          key: "action",
          scopedSlots: {customRender: "action"},
        },
      ],
    };
  },
  methods: {
    ...mapActions(["deleteChannles"]),
    channels() {
      return this.$store.state.channels;
    },
    username() {
      return this.$store.state.username;
    },
    rssToken() {
      return this.$store.state.rssToken;
    },
    generateRss(cid) {
      return (
          (process.env.NODE_ENV === "production" ?
              (window.location.protocol + "//" + window.location.host) :
              "http://localhost:23333")
          + "/rss?username=" +
          this.username() +
          "&token=" +
          this.rssToken() +
          "&channel=" +
          cid
      );
    },

    // loger(msg) {
    //   console.log("msg: " + msg);
    // },
    removeClick(ChannelId) {
      this.confirmVis = true;

      this.tempCId = ChannelId;
    },
    handleOk() {
      this.confirmLoading = true;
      this["deleteChannles"](this.tempCId)
          .then(() => {
            this.$message.info("删除成功");
            this.confirmLoading = false;
            this.confirmVis = false;
          })
          .catch((err) => {
            console.log(err);
            this.confirmLoading = false;
            this.confirmVis = false;
          });
    },
    handleCancel() {
      this.tempCId = 0;
      this.confirmVis = false;
    },
    copySuccess() {
      this.$message.success("拷贝成功")
    }
  }
  ,
}
;
</script>

<style></style>
