export const fields = {
  id: {
    init: "",
    label: "ID",
    placeholder: "唯一标识，自动生成",
    disabled: true,
    optional: true,
  },
  title: { init: "", label: "名称", placeholder: "请输入名称", tip: "自定义情景名称" },
  number: {
    init: "",
    label: "序号",
    optional: true,
    placeholder: "排序序号",
    tip: "数据显示顺序,自动生成,也可自定义",
  },
};

export const parseFields = () => {
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
