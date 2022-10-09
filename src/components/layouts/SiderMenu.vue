<template>
  <div style="width: 256px">
    <!-- <a-button type="primary" style="margin-bottom: 16px" @click="toggleCollapsed">
      <a-icon :type="collapsed ? 'menu-unfold' : 'menu-fold'" />
    </a-button> -->
    <!-- <a-menu
      :selectedKeys="selectedkeys"
      :openKyes="openKeys"
      mode="inline"
      :theme="theme"
      :inline-collapsed="collapsed"
    > -->
    <!-- <a-menu :selectedKeys="selectedkeys" :openKyes.sync="openKeys" mode="inline" :theme="theme"> -->
    <a-menu
      :selectedKeys="selectedkeys"
      :openKyes="openKeys"
      mode="inline"
      :theme="theme"
      :default-open-keys="defaultOpenKeys"
    >
      <!-- <template v-for="item in list"> -->
      <template v-for="item in aysncData">
        <a-menu-item
          v-if="!item.children"
          :key="item.path"
          @click="() => ($route.path == item.path ? false : $router.push({ path: item.path, query: $route.query }))"
        >
          <a-icon v-if="item.meta.icon" :type="item.meta.icon" />
          <span>{{ item.meta.title }}</span>
        </a-menu-item>
        <sub-menu v-else :key="item.path" :menu-info="item" />
      </template>
    </a-menu>
  </div>
</template>

<script>
import SubMenu from "./SubMenu.vue";
export default {
  props: {
    theme: {
      type: String,
      default: "dark",
    },
  },
  components: {
    "sub-menu": SubMenu,
  },
  watch: {
    // "$route.path": function (val) {
    //   this.setSelected(val);
    //   // this.selectedkeys = this.selectedkeysMap[val];
    //   // this.openKeys = this.collapsed ? [] : this.openKeysMap[val];
    // },
  },
  data() {
    // 获取路由配置信息：1.直接导入import router.js，2.使用this.$router
    this.selectedkeysMap = {};
    this.openKeysMap = {};
    // const allMenuData = this.getMenuData(this.$router.options.routes);
    // const menuData = this.getMenuData([]);
    return {
      collapsed: false,
      // allMenuData,
      selectedkeys: this.selectedkeysMap[this.$route.path],
      openKeys: this.collapsed ? [] : this.openKeysMap[this.$route.path],
      defaultOpenKeys: [],
    };
  },
  computed: {
    routersData() {
      return this.$store.state.router.routers;
    },
    aysncData() {
      let res = this.getMenuData(this.routersData);
      this.setSelected(this.$route.path);
      return res;
    },
  },
  methods: {
    beforeunloadFn(e) {},
    toggleCollapsed() {
      this.collapsed = !this.collapsed;
    },
    getMenuData(routes = [], parentKeys = [], selectedKye) {
      const menuData = [];
      // 递归获取菜单信息
      for (let item of routes) {
        let ignore = item.meta.ignore,
          hide = item.meta.hide,
          hideChildren = item.meta.hideChildren;
        // if (item.name && !item.hideInMenu) {
        if (!ignore && !hide) {
          // 该路由有name属性和不隐藏该路由时
          this.openKeysMap[item.path] = parentKeys;
          this.selectedkeysMap[item.path] = [selectedKye || item.path];
          const newItem = { ...item }; //解构原数据，生成新对象，防止修改。相当于拷贝一个新数据对象
          delete newItem.children; //重新组织该路由下的孩子路由
          // if (item.children && !item.hideChildrenInMenu) {
          if (item.children && !hideChildren) {
            //循环该路由下的子路由
            newItem.children = this.getMenuData(item.children, [...parentKeys, item.path]);
          } else {
            //当隐藏子路由时
            this.getMenuData(
              item.children,
              selectedKye ? parentKeys : [...parentKeys, item.path],
              selectedKye || item.path
            );
          }
          menuData.push(newItem);
          // } else if (!item.hideInMenu && item.children && !item.hideChildrenInMenu) {
        } else if (!hide && item.children && !hideChildren) {
          // 该路由不隐藏且有子路由其不隐藏该子路由时
          menuData.push(...this.getMenuData(item.children, [...parentKeys, item.path]));
        }
      }
      // routes.forEach((item) => {});
      return menuData;
    },
    filterAsyncRouter(
      routerMap = [],
      roles,
      permissions,
      alias = { roles: "authority", tags: "tags" },
      children = false
    ) {
      return routerMap.filter((route) => {
        route.meta = route.meta ? route.meta : {};
        let permission = this.permit(route, roles, permissions, alias);
        if (permission) {
          if (route.children && route.children.length) {
            route.children = this.filterAsyncRouter(route.children, roles, permissions, alias, true);
          }
          return true;
        }
        return false;
      });
    },
    permit(route, roles, permissions, alias) {
      let meta = route.meta,
        role = this.access(route, alias.roles, roles),
        tag = this.access(route, alias.tags, permissions);
      return role && tag;
    },
    access(route, name, items = []) {
      return this.formatMeta(route, name)
        ? this.fromatArray(items).some((i, num) => {
            return route.meta[name].includes(i) ? true : false;
          })
        : true;
    },
    formatMeta(route, name) {
      let res = false;
      if (route.meta && route.meta[name]) {
        route.meta[name] = this.fromatArray(route.meta[name]);
        res = route.meta[name].length ? true : false;
      }
      return res;
    },
    fromatArray(val) {
      return Object.prototype.toString.call(val) === "[object Array]" ? val : [val];
    },
    setSelected(path, beforeMount = false) {
      let _path_ = path.endsWith("/") ? path.substring(0, path.length - 1) : path;
      this.selectedkeys = this.selectedkeysMap[path] ? this.selectedkeysMap[path] : this.selectedkeysMap[_path_];
      this.openKeys = this.collapsed ? [] : this.openKeysMap[path] ? this.openKeysMap[path] : this.openKeysMap[_path_];
      // this.defaultOpenKeys = this.openKeys;
    },
  },
  beforeMount() {
    this.defaultOpenKeys = this.$route.path.split("/").map((p) => {
      return "/" + p;
    });
  },
  updated() {},
  mounted() {},
};
</script>
