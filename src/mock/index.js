import mock from "@/core/mock";

const datas = () => {
  require("./datas/user");
  require("./datas/electric");
  require("./datas/content");
  require("./datas/video");
  require("./datas/scene");
};
mock(datas);
