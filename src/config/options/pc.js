export const columns = [
  {
    title: "ID",
    dataIndex: "id",
  },
  {
    title: "名称",
    dataIndex: "title",
  },
  {
    title: "设备标识",
    dataIndex: "tag",
    customRender: (text) => text,
  },
  {
    title: "IP地址",
    dataIndex: "address",
    scopedSlots: { customRender: "address" },
    customRender: (text) => (text ? text : "未知"),
  },
  {
    title: "显示",
    dataIndex: "display",
    sorter: true,
    scopedSlots: { customRender: "time" },
    customRender: (text) => (text == 0 ? "隐藏" : "显示"),
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
  title: { init: "", label: "名称", placeholder: "请输入名称", tip: "自定义主机名称" },
  number: {
    init: "",
    label: "序号",
    placeholder: "请输入序号",
    optional: true,
    tip: "数据显示顺序,自动生成,也可自定义",
  },
  tag: {
    init: "",
    label: "设备标识",
    placeholder: "请输入主机标识",
    decorator: {
      rules: [
        { required: true, message: "不能为空", trigger: "blur" },
        { min: 1, max: 10, message: "1到10个字符", trigger: "blur" },
      ],
    },
    tip: "主机设备唯一标识号。",
  },
  display: {
    init: "1",
    label: "显示",
    type: "radioBtn",
    data: [
      { value: "0", label: "隐藏" },
      { value: "1", label: "显示" },
    ],
    decorator: {
      rules: [{ required: true, message: "不能为空", trigger: "blur" }],
    },
    tip: "设备是否隐藏",
  },
  address: { init: "", label: "IP地址", optional: true, tip: "设备IP地址" },
  open_delay: { init: 0, label: "开延迟(秒)", optional: true, tip: "设备开启延迟时间(秒)" },
  open_num: { init: 1, label: "开次数(次)", optional: true, tip: "设备开启次数" },
  open_gap: { init: 1, label: "开间隔(秒)", optional: true, tip: "设备开启间隔" },
  close_delay: { init: 0, label: "关延迟(秒)", optional: true, tip: "设备关闭延迟时间(秒)" },
  close_num: { init: 1, label: "关次数(次)", optional: true, tip: "设备关闭次数" },
  close_gap: { init: 1, label: "关间隔(秒)", optional: true, tip: "设备关闭间隔" },
  extra: { init: "", label: "说明", placeholder: "其他信息", optional: true, tip: "设备额外信息" },
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
