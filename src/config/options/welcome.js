export const fields = {
  id: { init: "", label: "ID", placeholder: "唯一标识", disabled: true },
  title: { init: "", label: "标题", placeholder: "请输入标题", tip: "自定义欢迎词标题" },
  number: {
    init: "",
    label: "序号",
    optional: true,
    placeholder: "请输入序号",
    tip: "数据显示顺序,自动生成,也可自定义",
  },
  path: { init: "", label: "背景", type: "upload", listType: "picture", tip: "欢迎词文件(若上传错误请检查文件类型)" },
  color: { init: "", label: "主题颜色", optional: true, tip: "主题颜色" },
  font: { init: "", label: "主题字体大小", optional: true, tip: "主题字体大小" },
  offset_x: { init: "", label: "主标题X偏移", optional: true, tip: "主标题横向偏移" },
  offset_y: { init: "", label: "主标题y偏移", optional: true, tip: "主标题纵向偏移" },
  align: {
    init: "0",
    label: "主标题对齐方式",
    type: "radio",
    data: [
      { value: "0", label: "center" },
      { value: "1", label: "right" },
      { value: "2", label: "left" },
    ],
    decorator: {
      rules: [{ required: true, message: "不能为空" }],
    },
    tip: "主标题对齐方式",
  },
  sub_title: { init: "", label: "副标题", tip: "欢迎词副标题" },
  sub_color: { init: "", label: "副标题颜色", optional: true, tip: "副标题颜色" },
  sub_font: { init: "", label: "副标题字体大小", optional: true, tip: "副标题字体大小" },
  sub_x: { init: "", label: "副标题X偏移", optional: true, tip: "副标题横向偏移" },
  sub_y: { init: "", label: "副标题y偏移", optional: true, tip: "副标题纵向偏移" },
  sub_align: {
    init: "1",
    label: "副标题对齐方式",
    type: "radio",
    data: [
      { value: "0", label: "center" },
      { value: "1", label: "right" },
      { value: "2", label: "left" },
    ],
    decorator: {
      rules: [{ required: true, message: "不能为空" }],
    },
    tip: "副标题对齐方式",
  },
  extra: { init: "", label: "描述", type: "textarea", optional: true, tip: "额外信息" },
};

export const parseFields_welcome = () => {
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
