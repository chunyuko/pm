export const fields = {
  id: { init: "", label: "ID", placeholder: "唯一标识,自动生成", disabled: true },
  title: { init: "", label: "标题", placeholder: "请输入标题", tip: "解说词标题" },
  number: {
    init: "",
    label: "序号",
    optional: true,
    placeholder: "请输入序号",
    tip: "数据显示顺序,自动生成,也可自定义",
  },
  path: {
    init: "",
    label: "解说词文件",
    type: "upload",
    tip: "音频文件(若上传错误请检查文件类型)",
    listType: "picture",
  },
  text: { init: "", label: "解说词文字", tip: "解说词内容" },
  extra: { init: "", label: "描述", type: "textarea", optional: true, tip: "额外信息" },
};

export const parseFields_caption = () => {
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
