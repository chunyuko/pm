export const fields = {
  id: { init: "", label: "ID", placeholder: "唯一标识", disabled: true },
  title: { init: "", label: "名称", placeholder: "请输入名称", tip: "自定义网站名称" },
  number: {
    init: "",
    label: "序号",
    optional: true,
    placeholder: "请输入序号",
    tip: "数据显示顺序,自动生成,也可自定义",
  },
  url: { init: "", label: "网址", tip: "网站网址" },
  extra: { init: "", label: "描述", optional: true, tip: "额外信息" },
};

export const parseFields_web = () => {
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
