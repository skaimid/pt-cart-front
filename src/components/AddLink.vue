<template>
  <div>
    <a-input-group compact class="add-link">

      <a-select default-value="" placeholder="选择一个分发频道" v-model="selectChannelId"
                style="width: 12rem; margin-bottom: 1rem">
        <a-select-option
            v-for="ch in channels()"
            v-bind:key="ch.channelId"
            :value="ch.channelId"
        >
          {{ ch.channelName }}
        </a-select-option>
      </a-select>

      <a-input v-model="newLinkRef" :disabled="loadFile" placeholder="在此输入链接"
               style="width: 70%;margin-bottom: 1rem"></a-input>
    </a-input-group>

    <a-upload
        name="file"
        :multiple="true"
        :action="uploadUrl"
        :headers="headers"
        @change="handleChange"

    >或者选择一个文件来代替链接:
      <a-button :disabled="loadFile" style="margin-bottom: 1rem">
        <a-icon type="upload"/>
        Click to Upload
      </a-button>
    </a-upload>

    <a-button @click="submit">提交</a-button>
  </div>


</template>

<script>
import {mapActions} from "vuex";
import {getLocal} from "@/libs/local";

export default {
  name: "AddLink",
  data() {
    return {
      selectChannelId: undefined,
      newLinkRef: "",
      loadFile: false,
      uploadUrl:
          (process.env.NODE_ENV === "production" ? "/" : "http://localhost:23333/") + "api/file",
      headers: {Authorization: getLocal('token')},
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
      if (this.newLinkRef === "") {
        this.$message.warn("请选择需要添加的链接");
        return;
      }
      this["newLink"]({cid: this.selectChannelId, link: this.newLinkRef})
          .then(() => {
            this.selectChannelId = undefined;
            this.newLinkRef = "";
            this.$message.info("新增成功");
            this.loadFile = false;
          })
          .catch((err) => console.log(err));

    },
    handleChange(info) {
      if (info.file.status !== 'uploading') {
        this.loadFile = true;
      }
      if (info.file.status === 'done') {
        this.$message.success(`${info.file.name} 上传成功!`);
        this.newLinkRef = (process.env.NODE_ENV === "production" ? (window.location.protocol + "//" + window.location.host + "/") : "http://localhost:23333/")
            + 'file'
            + '/' + this.$store.state.username
            + '/' + info.file.name
      } else if (info.file.status === 'error') {
        this.$message.error(`${info.file.name} 上传失败!`);
      }

    },
  },
};
</script>

<style>

</style>
