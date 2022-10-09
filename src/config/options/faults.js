export const fields = {
  name: {
    init: "",
    label: "名称",
    placeholder: "排序序号",
    tip: "数据显示顺序,自动生成,也可自定义",
  },
  number: {
    init: "",
    label: "序号",
    placeholder: "排序序号",
    tip: "数据显示顺序,自动生成,也可自定义",
  },
  info: {
    init: "",
    label: "信息",
    tip: "视频显示模式",
  },
  spriteData: {
    init: "",
    label: "图片",
    type: "upload",
    decorator: {
      rules: [
        { required: true, message: "不能为空", trigger: "blur" },
        { min: 1, max: 10, message: "1到10个字符", trigger: "blur" },
      ],
    },
    tip: "图片文件(若上传错误请检查图片类型)",
  },
  id: {
    init: "",
    label: "ID",
    placeholder: "唯一标识，自动生成",
    decorator: { initialValue: 0 },
    optional: true,
    disabled: true,
  },
};

export const parseFields_faults = () => {
  // let copy_fields = { ...fields },
  let models = {},
    configs = {};
  Object.keys(fields).forEach((key, index) => {
    let field = { ...fields[key] };
    field["init"] = field["init"] != undefined ? field["init"] : "";
    models[key] = field["init"];
    delete field.init;
    configs[key] = {};
    Object.assign(configs[key], field);
  });
  return [models, configs];
};
