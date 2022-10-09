import { Modal, notification } from "ant-design-vue";
notification.config({
  placement: "bottomRight",
  top: "50px",
  duration: 3,
  rtl: true,
  maxCount: 3,
});

export default {
  success: function (res, config) {
    if (res.success == false && res.code == 10002) {
      window.location.href = "/user/login";
    }
    if (config.msg === false) {
      return false;
    }
    let code = res.code ? "执行编码：" + res.code : "";
    let msg = res.msg ? res.msg : res.success;
    notification.success({ message: msg, description: code });
  },
  fail: function (status, statusText, options, error) {
    notification.error({ message: status, description: statusText });
    console.log("请求异常》》", status, statusText, options, error);
    return true;
  },
  401: function (error) {
    let msg = error.response.data.message || "服务器401状态码";
    Modal.error({
      title: "没有登入",
      content: msg,
      okText: "重新登入",
      mask: true,
      onOk: () => {},
    });
    return true;
    // notification.error({ message: 401, description: msg });
  },
  403: function (error) {
    return true;
  },
  404: function (error) {
    return true;
  },
  500: function (error) {
    return true;
  },
  504: function (error) {
    return true;
  },
};
