<template>
  <!-- <a-form-model ref="modeler" v-bind="formLayout" :model="model" :roules="roule">
    <a-form-model-item label="主键ID" prop="id">
      <a-input placeholder="ID" disabled />
    </a-form-model-item>
    <a-form-model-item label="描述" prop="description">
      <a-input placeholder="简述信息" />
    </a-form-model-item>
  </a-form-model> -->
  <a-spin :spinning="loading">
    <a-form :form="form" v-bind="formLayout" ref="form">
      <!-- 检查是否有 id 并且大于0，大于0是修改。其他是新增，新增不显示主键ID -->
      <!-- <a-form-item v-show="model && model.id > 0" label="主键ID">
      <a-input v-decorator="['id', { initialValue: 0 }]" disabled />
    </a-form-item> -->
      <template v-if="!optional">
        <h-form-item :values="requires" />
      </template>
      <a-collapse :bordered="false" :activeKey="activeKey" v-else>
        <template #expandIcon="props">
          <a-icon type="caret-right" :rotate="props.isActive ? 90 : 0" />
        </template>
        <a-collapse-panel header="必填" key="0" :forceRender="true">
          <!-- <a-form-item v-for="(val, index) in requires" :label="val.label" :key="index">
            <a-input v-decorator="[`${val._name_}`, val.decorator]" :placeholder="val.placeholder" />
          </a-form-item> -->
          <h-form-item :values="requires" />
        </a-collapse-panel>
        <a-collapse-panel header="选填" :style="customStyle" key="1" :forceRender="true">
          <!-- <a-form-item v-for="(val, index) in options" :label="val.label" :key="index">
            <a-input v-decorator="[`${val._name_}`, val.decorator]" :placeholder="val.placeholder" />
          </a-form-item> -->
          <h-form-item :values="options" />
        </a-collapse-panel>
      </a-collapse>
      <!-- <a-collapse default-active-key="4" :bordered="true">
        <a-collapse-panel key="4" header="党建">
          <a-form-item label="test">
            <a-input />
          </a-form-item>
        </a-collapse-panel>
      </a-collapse> -->
      <a-form-item
        :wrapper-col="{
          xs: { span: 24, offset: 0 },
          sm: { span: 16, offset: 8 },
        }"
        v-if="botton"
      >
        <a-button type="primary" @click="submit">提交</a-button>
        <a-button type="primary" style="margin-left: 20px" @click="cancel">取消</a-button>
      </a-form-item>
    </a-form>
  </a-spin>
</template>

<script>
// 表单字段
// const fields = ["description", "id"];
import pick, { name } from "lodash/pick";
import { is, promised } from "@/core/utils";
import HFormItem from "./FormItem.vue";
export default {
  name: "HForm",
  components: { HFormItem },
  props: {
    models: {
      type: Object,
      default: () => {},
    },
    configs: {
      type: Object,
      default: () => {},
    },
    success: {
      type: Function,
      default: () => () => {},
    },
    fail: {
      type: Function,
      default: () => () => {},
    },
    type: {
      type: String,
      default: "add",
    },
    initModel: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    config() {
      let def = { label: " ", placeholder: "", decorator: {}, type: "input", disable: false, hide: false };
      let con = this.configs,
        res = {};
      this.fields.forEach((i, num) => {
        res[i] = Object.assign({}, def, con[i]);
      });
      return res;
    },
    formModel() {
      return this.$refs.form;
    },
  },
  data() {
    this.formLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 13 },
      },
      fields: [],
    };
    return {
      form: this.$form.createForm(this),
      // form: this.$refs.model,
      loading: false,
      botton: false,
      sample: {
        id: [{ required: true, message: "Please input Activity name", trigger: "blur" }],
        description: [
          { required: true, message: "Please input Activity name", trigger: "blur" },
          { min: 3, max: 5, message: "Length should be 3 to 5", trigger: "blur" },
        ],
      },
      options: [],
      requires: [],
      optional: false,
      activeKey: ["0"],
      customStyle: "background: #f7f7f7;border-radius: 4px;margin-bottom: 24px;border: 0;overflow: hidden",
    };
  },
  created() {
    this.fields = Object.keys(this.configs);
    // 防止表单未注册
    this.setting(this.models);
    // 当 model 发生改变时，为表单设置值
    this.$watch("models", () => {
      this.setting(this.models);
    });
    // 设置必填项和选填项
    this.fields.forEach((nm) => {
      let val = this.configs[nm];
      val["_name_"] = nm;
      val.optional ? this.options.push(val) : this.requires.push(val);
    });
    this.optional = this.options.length > 0 ? true : false;
  },
  destroyed() {
    // console.log("destroyed in Form");
  },
  mounted() {
    // console.log("initModel>>>", this.initModel);
  },
  methods: {
    handle() {
      this.$refs.modeler.validate((v, obj) => {});
    },
    setting(value) {
      for (let k in value) {
        let field = this.configs[k];
        if (field ? field["type"] == "upload" : false) {
          let val = value[k];
          val = is(val, "Array") ? val : val ? [val] : [];
          value[k] = val.map((v, i) => {
            let nm = is(v, "string") ? v : "setting reload";
            return { uid: i, name: nm, status: "done", url: "/statics/" + nm };
          });
        }
      }
      // 防止表单未注册
      this.fields.forEach((v) => this.form.getFieldDecorator(v));
      value && this.form.setFieldsValue(pick(value, this.fields));
    },
    validate(success, fail) {
      const form = this.form;
      form.validateFields((errors, values) => {
        if (!errors) {
          this.loading = true;
          promised(is(success, "function") ? success(this.createFormData(values), this, values, form) : success)
            .then((res) => {
              this.loading = false;
              // this.cancel();
            })
            .catch((err) => {
              // console.log("服务器异常，关闭Form进度效果");
              this.loading = false;
            });
        } else {
          is(fail, "function") && fail(this, values, form, errors);
        }
      });
    },
    createFormData(values) {
      const formData = new FormData();
      // for (let k in values) {
      for (let k in this.configs) {
        let field = this.configs[k],
          v = values[k];

        if (field ? field["type"] == "upload" : false) {
          v = v ? v : [];
          if (v && v.length == 0) {
            // 没有上传内容
            formData.set(k, "");
          } else {
            //有上传内容：1全是旧内容，2全是新内容，3一部分新内容一部分就内容
            let ups = [];
            v.forEach((file) => {
              let fileObj = file.originFileObj;
              !fileObj && file.status == "done" ? ups.push(file.name) : formData.append(k, fileObj);
            });
            ups.length > 1 ? formData.set(k, JSON.stringify(ups)) : ups.length == 1 && formData.set(k, ups[0]);
          }
        } else {
          // values[k] != "null" && values[k] != null && formData.set(k, values[k]);
          // 补全字段值
          formData.set(k, v ? v : [0, false].indexOf(v) < 0 ? "" : v);
          // formData.set(k, v ? v : [0, false].indexOf(v) < 0 ? this.models[k] : v);
        }
      }
      return formData;
    },
    cancel() {
      if (this.loading) {
        return false;
      }
      // console.log(this.form.getFieldsValue());
      this.form.resetFields();
      this.initModel && this.setting(this.initModel);
    },
    submit() {
      this.validate(this.success, this.fail);
    },
  },
};
</script>
