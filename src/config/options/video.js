export const fields = {
  id: { init: "", label: "ID", placeholder: "唯一标识,自动生成", disabled: true },
  title: { init: "", label: "名称", placeholder: "请输入名称", tip: "自定义视频名称" },
  number: {
    init: "",
    label: "序号",
    optional: true,
    placeholder: "排序序号",
    tip: "数据显示顺序,自动生成,也可自定义",
  },
  path: {
    init: "",
    label: "视频",
    type: "upload",
    decorator: {
      rules: [
        { required: true, message: "不能为空", trigger: "blur" },
        { min: 1, max: 10, message: "1到10个字符", trigger: "blur" },
      ],
    },
    tip: "视频文件(若上传错误请检查文件类型)",
  },
  cover: { init: "", label: "封面", type: "upload", listType: "picture", optional: true, tip: "视频封面" },
  display_modal: {
    init: "0",
    label: "视频显示模式",
    type: "radioBtn",
    data: [
      { value: "0", label: "全屏" },
      { value: "1", label: "自定义" },
    ],
    optional: true,
    tip: "视频显示模式",
  },
  play_modal: {
    init: "0",
    label: "播放模式",
    type: "radioBtn",
    data: [
      { value: "0", label: "回屏保" },
      { value: "1", label: "单循环" },
      { value: "2", label: "顺序循环" },
      { value: "3", label: "停止" },
    ],
    // src: true,
    optional: true,
    // type: "select",
    tip: "视频播放模式",
  },
  offset_x: { init: "", label: "app偏移x", optional: true, tip: "app横向偏移" },
  offset_y: { init: "", label: "app偏移y", optional: true, tip: "app纵向偏移" },
  zoom_x: { init: "", label: "room偏移x", optional: true, tip: "room横向偏移" },
  zoom_y: { init: "", label: "room偏移y", optional: true, tip: "room纵向偏移" },
  width: {
    init: 1920,
    label: "视频宽",
    tip: "视频宽",
  },
  height: {
    init: 1080,
    label: "视频高",
    tip: "视频高",
  },
  action_start: { init: "", label: "开始播放动作", optional: true, tip: "开始播放动作" },
  action_end: { init: "", label: "结束播放动作", optional: true, tip: "结束播放动作" },
  times: { init: "", label: "视频时长", optional: true, tip: "视频时长" },
  cover_size: { init: "", label: "视频封面大小", optional: true, tip: "视频封面大小" },
  extra: {
    init: "",
    label: "简述",
    placeholder: "补充描述",
    optional: true,
    tip: "额外信息",
  },
};

export const parseFields_video = () => {
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
