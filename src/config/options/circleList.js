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
  y: {
    init: "",
    label: "Y",
    tip: "视频显示模式",
  },
  x: {
    init: "",
    label: "X",
    tip: "视频显示模式",
  },
  question: {
    init: "",
    label: "问题",
    tip: "视频显示模式",
  },
  answer: {
    init: "",
    label: "答案",
    tip: "视频显示模式",
  },
  range: {
    init: "",
    label: "范围",
    tip: "视频显示模式",
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

export const parseFields_circleList = () => {
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
