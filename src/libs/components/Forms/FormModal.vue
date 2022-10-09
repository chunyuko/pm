<template>
  <a-modal
    :title="typeTitle"
    :width="640"
    :visible="visible"
    :confirmLoading="isLoading"
    :mask="isLoading"
    :maskClosable="!isLoading"
    okText="提交"
    cancelText="取消"
    @ok="handleOk"
    @cancel="handleCancel"
    :destroyOnClose="destroy"
    :zIndex="zIndex"
  >
    <!-- <a-spin :spinning="isLoading">
      <h-form :models="models" :configs="configs" ref="formModel" @take="handleSub"></h-form>
    </a-spin> -->
    <h-form :models="models" :configs="configs" ref="formModel" :type="type" :initModel="initModel" />
  </a-modal>
</template>

<script>
// import HForm from "./FormModel.vue";
import HForm from "./Form.vue";
import { promised } from "@/core/utils";
// 表单字段
const fields = ["description", "id"];

export default {
  name: "HFormModal",
  components: { HForm },
  props: Object.assign({}, HForm.props, {
    visible: {
      type: Boolean,
      required: true,
    },
    footer: {
      type: String,
      default: "null",
    },
    loading: {
      type: Boolean,
      default: false,
    },
    handle: {
      type: Function,
      default: () => () => {},
    },
    typeTitle: {
      type: String,
      default: "新增",
    },
    destroy: {
      type: Boolean,
      required: false,
    },
    zIndex: {
      type: Number,
      default: 1000,
    },
  }),
  computed: {
    form() {
      return this.$refs.formModel.form;
    },
  },
  data() {
    return {
      isLoading: false,
      // form: this.$form.createForm(this),
      // form: this.$form.createForm(this.$refs.formModel),
    };
  },
  created() {},
  destroyed() {
    // console.log("destroyed in formModal");
  },
  methods: {
    handleOk() {
      this.$refs.formModel.validate(
        (formData, formCom, values, form) => {
          this.isLoading = true;
          return promised(this.handle(formData, formCom, values, form))
            .then((res) => {
              this.isLoading = false;
              return Promise.resolve(res);
            })
            .catch((err) => {
              // console.log("服务器异常，关闭FormModal进度效果");
              this.isLoading = false;
              return Promise.reject(err);
            });
        },
        (formCom, values, form, errors) => {
          console.log(errors);
          this.$message.error(`表单校验失败！${Object.keys(errors)}`);
        }
      );
    },
    handleCancel() {
      if (this.isLoading) {
        return false;
      }
      this.$emit("cancel");
      this.$refs.formModel.cancel();
    },
  },
};
</script>
