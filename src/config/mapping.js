export default {
  status: {
    0: {
      status: "default",
      text: "离线",
    },
    1: {
      // status: "processing",
      status: "warning", // 链接，发生询问未返回
      text: "未注",
    },
    2: {
      status: "success",
      text: "在线",
    },
    3: {
      status: "error",
      text: "异常", //链接，发生询问时发生异常
    },
  },
  route: {
    handware: "设备管理",
    electric: "继电器",
    red: "红外",
    serial: "串口",
    pc: "PC机",
    content: "多媒体",
  },
};
