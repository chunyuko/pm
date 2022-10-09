import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "@/derive/lazy";
import "@/derive/filter"; // global filter
// 全局注册antd
// import antd from "ant-design-vue";
// import antd from "ant-design-vue/lib/button";
// import "ant-design-vue/lib/button/style";
// import "ant-design-vue/dist/antd.css";//使用Less目的在于自定义主题
// import "ant-design-vue/dist/antd.less";
// Vue.use(antd);

// import "./mock";

import "@/api";
Vue.config.productionTip = false;
console.log("环境检测：", process.env);
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
