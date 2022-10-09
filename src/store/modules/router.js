import filterAsyncRouter from "@/core/router";
import conRouter from "@/config/router";

const constantMap = conRouter.routeMap.constantMap;
const asyncMap = conRouter.routeMap.asyncMap;

const router = {
  state: {
    constantMap,
    asyncMap: [],
    routers: conRouter.routeMap.constantMap,
  },
  mutations: {
    set_routers: (state, routers) => {
      state.asyncMap = routers;
      state.routers = state.constantMap.concat(routers);
    },
  },
  actions: {
    generate({ commit, state }, { roles, permissions }) {
      return new Promise((resolve) => {
        commit("set_routers", filterAsyncRouter(asyncMap, roles, permissions));
        return resolve(state.asyncMap);
      });
    },
  },
};

export default router;
