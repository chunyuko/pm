import Vue from "vue";
import VueRouter from "vue-router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
//路由组件
import store from "@/store";

// hack router push callback
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject);
  return originalPush.call(this, location).catch((err) => err);
};

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  // base: process.env.BASE_URL,
  base: "/",
  routes: store.state.router.constantMap,
});

router.beforeEach((to, from, next) => {
  if (to.path !== from.path) {
    // 防止同一路由情况下，显示进度条
    NProgress.start();
  }

  const loginRoutePath = "/user/login";
  // if (!store.getters.hasUser && to.path.indexOf(loginRoutePath) < 0 && !to.path.startsWith("/api")) {
  if (!store.getters.hasUser && to.path != loginRoutePath && !to.path.startsWith("/api")) {
    store.dispatch("getUser").then((data) => {
      if (!data) {
        Vue.prototype.$message.error("登入失效");
        next({ path: loginRoutePath, replace: true });
        // window.location.href = loginRoutePath;
      } else {
        // let roles = store.getters.roles,
        // permissions = store.getters.permissions;
        Vue.prototype.$message.info("身份校验完成！");
        let roles = store.getters.roles,
          permissions = null;
        store.dispatch("generate", { roles, permissions }).then((asyncMap) => {
          router.addRoutes(store.state.router.asyncMap);
          // next({ ...to, replace: true });
          // 请求带有 redirect 重定向时，登录自动重定向到该地址
          const redirect = decodeURIComponent(from.query.redirect || to.path);
          if (to.path === redirect) {
            // set the replace: true so the navigation will not leave a history record
            next({ ...to, replace: true });
          } else {
            // 跳转到目的路由
            next({ path: redirect });
          }
        });
      }
    });
  } else {
    // console.log("to>>>", to);
    next();
  }
});

router.afterEach((to, from, next) => {
  NProgress.done();
});

export default router;
