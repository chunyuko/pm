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
    dataIndex: "ip",
    scopedSlots: { customRender: "ip" },
  },
  {
    title: "屏保模式",
    dataIndex: "cover_play",
    customRender: (text) => (text == "video" ? "视频" : "图片"),
  },
  {
    title: "显示",
    dataIndex: "display",
    scopedSlots: { customRender: "display" },
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
  title: { init: "", label: "名称", placeholder: "请输入名称", tip: "自定义多媒体设备名称" },
  number: {
    init: "",
    label: "序号",
    optional: true,
    placeholder: "请输入序号",
    tip: "数据显示顺序,自动生成,也可自定义",
  },
  tag: {
    init: "",
    label: "设备标识",
    placeholder: "请输入设备标识",
    decorator: {
      rules: [
        { required: true, message: "不能为空", trigger: "blur" },
        { min: 1, max: 10, message: "1到10个字符", trigger: "blur" },
      ],
    },
    tip: "多媒体设备唯一标识号",
  },
  ip: {
    init: "",
    label: "屏幕IP",
    optional: true,
    tip: "设备IP地址",
  },
  width: {
    init: 1920,
    label: "设备屏宽",
    tip: "设备屏宽",
  },
  height: {
    init: 1080,
    label: "设备屏高",
    tip: "设备屏高",
  },
  cover_play: {
    init: "image",
    label: "屏保模式",
    type: "radio",
    data: [
      { value: "video", label: "视频" },
      { value: "image", label: "图片" },
    ],
    tip: "屏保模式",
  },
  loop: {
    init: "0",
    label: "是否循环",
    type: "radioBtn",
    data: [
      { value: "0", label: "不循环" },
      { value: "1", label: "循环" },
    ],
    optional: true,
    tip: "播放内容是否循环",
  },
  play: { init: "", label: "默认播放内容", optional: true, tip: "设备默认播放内容" },
  volume: { init: "100", label: "播放音量", optional: true, tip: "设备音量" },
  style: { init: "", label: "App样式", optional: true, tip: "App样式" },
  scale: { init: "", label: "App缩放大小", optional: true, tip: "App缩放大小" },
  offset_x: { init: "", label: "app偏移x", optional: true, tip: "app横向偏移" },
  offset_y: { init: "", label: "app偏移y", optional: true, tip: "app纵向偏移" },
  display: {
    init: "1",
    label: "App是否显示",
    type: "radioBtn",
    data: [
      { value: "0", label: "隐藏" },
      { value: "1", label: "显示" },
    ],
    tip: "设备是否隐藏",
  },
  content_type: {
    init: "0",
    label: "内容类型",
    type: "radioBtn",
    data: [
      { value: "0", label: "三方控制" },
      { value: "1", label: "复杂模式" },
      { value: "2", label: "简易模式" },
    ],
    optional: true,
    tip: "内容类型",
  },
  extra: {
    init: "",
    label: "简述",
    placeholder: "补充描述",
    optional: true,
    tip: "额外信息",
  },
};

export const icon = {
  electric: "/statics/images/electric.jpg",
  red: "/statics/images/red.jpg",
  serial: "/statics/images/serial.jpg",
  pc: "/statics/images/pc.jpg",
  content: "/statics/images/content.jpg",
  video: "/statics/images/video.jpg",
  saver: "/statics/images/saver.jpg",
  cover: "/statics/images/cover.jpg",
  image: "/statics/images/image.jpg",
  web: "/statics/images/web.jpg",
  welcome: "/statics/images/welcome.jpg",
  caption: "/statics/images/caption.jpg",
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

export const tabs = [
  {
    key: "saver",
    tab: "屏保",
  },
  {
    key: "cover",
    tab: "屏保",
  },
  {
    key: "video",
    tab: "视频",
  },
  {
    key: "image",
    tab: "图片",
  },
  {
    key: "ppt",
    tab: "PPT",
  },
  {
    key: "web",
    tab: "网页",
  },
  {
    key: "welcome",
    tab: "欢迎词",
  },
  {
    key: "caption",
    tab: "解说词",
  },
];

export const tabsHardware = [
  {
    key: "electric",
    tab: "继电器",
  },
  {
    key: "red",
    tab: "红外",
  },
  {
    key: "serial",
    tab: "串口",
  },
  {
    key: "pc",
    tab: "PC主机",
  },
  {
    key: "content",
    tab: "多媒体",
  },
];
