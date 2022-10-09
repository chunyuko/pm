export const fields = {
  id: {
    init: "",
    label: "ID",
    placeholder: "唯一标识，自动生成",
    decorator: { initialValue: 0 },
    disabled: true,
  },
  title: { init: "", label: "名称", placeholder: "请输入名称", tip: "自定义图片名称" },
  number: {
    init: "",
    label: "序号",
    optional: true,
    placeholder: "请输入序号",
    tip: "数据显示顺序,自动生成,也可自定义",
  },
  path: { init: "", label: "图片", type: "upload", tip: "图片文件(若上传错误请检查文件类型)", listType: "picture" },
  style: { init: "", label: "图片展示样式", optional: true, tip: "图片展示样式" },
  type: { init: "image", label: "文件类型", optional: true, tip: "文件类型" },
  extra: {
    init: "",
    label: "简述",
    placeholder: "补充描述",
    optional: true,
    tip: "额外信息",
  },
};

export const parseFields_image = () => {
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
