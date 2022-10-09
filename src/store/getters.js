const getters = {
  // isMobile: (state) => state.app.isMobile,
  // lang: (state) => state.app.lang,
  // theme: (state) => state.app.theme,
  // color: (state) => state.app.color,
  // token: (state) => state.user.token,
  // addRouters: (state) => state.permission.addRouters,
  // multiTab: (state) => state.app.multiTab,
  avatar: (state) => state.user.info.avatar,
  nickname: (state) => state.user.info.name,
  // welcome: (state) => state.user.welcome,
  roles: (state) => state.user.info.roles,
  permissions: (state) => state.user.info.permissions,
  operate: (state) => state.user.info.operate,
  userInfo: (state) => state.user.info,
  getUser: (state) => (attr) => {
    return state.user.info[attr];
  },
  hasUser: (state) => {
    return state.user.length > 0;
  },
  scene_list: (state) => state.scene.mapping,
  scene_data: (state) => state.scene.result.tree,
};

export default getters;
