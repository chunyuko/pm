<template>
  <a-form-item>
    <div slot="extra" v-if="option.tip" style="padding-top: 5px">{{ option.tip }}</div>
    <label slot="label" :for="option._name_" :title="option.tip ? option.tip : option.label">
      <span>
        {{ option.label }}
      </span>
    </label>
    <!-- <a-upload
          :name="val._name_"
          :action="val.action ? val.action : '#'"
          :headers="val.headers ? val.headers : {}"
          @change="upChange"
          :before-upload="upBefore"
          :remove="upRemove"
          :file-list="fileList"
          v-decorator="[`${val._name_}`, { valuePropName: 'upList', getValueFromEvent: normFile }]"
        > -->
    <a-upload
      :name="option._name_"
      :action="option.action ? option.action : '#'"
      :headers="option.headers ? option.headers : {}"
      @change="upChange"
      :before-upload="upBefore"
      :remove="upRemove"
      :list-type="listType"
      :showUploadList="option.showUploadList ? option.showUploadList : showUploadList"
      v-decorator="[`${option._name_}`, { valuePropName: 'fileList', getValueFromEvent: normFile }]"
    >
      <a-button>
        <a-icon type="upload" />
        {{ text }}
      </a-button>
    </a-upload>
  </a-form-item>
</template>

<script>
export default {
  props: {
    option: {
      type: Object,
      default: () => {},
    },
    text: {
      type: String,
      default: "点击选择",
    },
    number: {
      type: Number,
      default: 1,
    },
  },
  name: "HUpLoad",
  computed: {
    listType() {
      return ["text", "picture", "picture-card"].includes(this.option.listType) ? this.option.listType : "text";
    },
  },
  data() {
    return {
      // lists: [{ uid: "-1", name: "1.png", status: "done", url: "/statics/image/1.jpg" }],
      showUploadList: { showPreviewIcon: true, showRemoveIcon: true },
      lists: [],
    };
  },
  methods: {
    upChange(info) {
      let fileList = [...info.fileList];
      // 限制上传数量
      fileList = fileList.slice(-this.number);
      // 读取远程路径并显示链接
      fileList = fileList.map((file) => {
        if (file.response) {
          file.url = file.response.url;
        }
        return file;
      });
      this.lists = fileList;
      info.fileList = fileList;
    },
    upBefore(file) {
      // 关闭自动上传
      this.lists = [...this.lists, file];
      return false;
    },
    upRemove(file) {
      const index = this.lists.indexOf(file);
      const copy_list = this.lists.slice();
      copy_list.splice(index, 1);
      this.lists = copy_list;
    },
    normFile(e) {
      if (Array.isArray(e)) {
        return e;
      }
      return e && e.fileList;
    },
    inform(e) {
      // console.log(e);
    },
  },
};
</script>
<style scoped></style>
