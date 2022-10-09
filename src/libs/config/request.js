import { Modal, notification } from "ant-design-vue";
notification.config({
  placement: "topRight",
  top: "50px",
  duration: 3,
  rtl: true,
  maxCount: 3,
});

export default {
  defaults: {
    baseURL: "http://localhost:8080",
    timeout: 5000,
  },
  success: function (res, config) {
    notification.success({ message: "新弹框待修改信息", description: "请求成功！" });
  },
  fail: function (status, statusText, options, error) {},
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
  403: function (error) {},
  404: function (error) {},
  500: function (error) {},
  504: function (error) {},
};
