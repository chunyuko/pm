export const columns = [
  // {
  //   title: "#",
  //   scopedSlots: { customRender: "serial" },
  // },
  {
    title: "ID",
    dataIndex: "id",
  },
  {
    title: "名称",
    dataIndex: "name",
  },
  {
    title: "序号",
    dataIndex: "number",
  },
  {
    title: "问答",
    dataIndex: "questions",
    scopedSlots: { customRender: "questions" },
  },
  {
    title: "找茬",
    dataIndex: "faults",
    scopedSlots: { customRender: "faults" },
  },
  {
    title: "排序",
    dataIndex: "sorts",
    scopedSlots: { customRender: "sorts" },
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
    optional: true,
    disabled: true,
  },
  name: { init: "", label: "名称", placeholder: "请输入名称", tip: "自定义光电集控器名称" },
  number: {
    init: "",
    label: "序号",
    placeholder: "请输入序号",
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
