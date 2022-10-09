export const columns = [
  {
    title: "昵称",
    dataIndex: "nickname",
  },
  {
    title: "排序",
    dataIndex: "number",
  },
  {
    title: "权限",
    dataIndex: "rank",
    customRender: (text) => (text == "1000" ? "超级管理员" : text == "800" ? "管理员" : "用户"),
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
  },
  nickname: { init: "", label: "昵称", placeholder: "请输入昵称", tip: "用户昵称" },
  number: {
    init: "",
    label: "序号",
    placeholder: "请输入序号",
    optional: true,
    tip: "数据显示顺序,自动生成,也可自定义",
  },
  rank: {
    init: "",
    label: "权限",
    type: "radio",
    data: [
      { value: 1000, label: "超级管理员" },
      { value: 800, label: "管理员" },
      { value: 100, label: "用户" },
    ],
    tip: "用户权限",
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
