export const columns = [
  {
    title: "名称",
    dataIndex: "title",
  },
  {
    title: "时间",
    dataIndex: "time",
  },
  {
    title: "操作",
    dataIndex: "action",
    width: "200px",
    scopedSlots: { customRender: "action" },
  },
];

export const fields = {
  id: {
    init: "",
    label: "ID",
    placeholder: "唯一标识，自动生成",
    decorator: { initialValue: 0 },
    disabled: true,
    optional: true,
  },
  title: { init: "", label: "名称", placeholder: "请输入文件名称", tip: "服务器文件名称" },
  number: {
    init: "",
    label: "序号",
    optional: true,
    placeholder: "请输入序号",
    tip: "数据显示顺序,自动生成,也可自定义",
  },
  path: { init: "", label: "文件", type: "upload", tip: "服务器文件(若上传错误请检查文件类型)" },
  extra: {
    init: "",
    label: "简述",
    placeholder: "补充描述",
    optional: true,
    tip: "额外信息",
  },
};

export const parseFields = () => {
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
