<template>
  <a-layout
    id="components-layout-demo-side"
    style="min-height: 100vh"
    :class="[`nav-theme-${theme}`, `nav-layout-${layout}`]"
  >
    <a-layout-sider
      :theme="theme"
      v-model="collapsed"
      collapsible
      :trigger="null"
      v-if="layout === 'left'"
      width="256px"
    >
      <div class="logo">上海宝瓶创意</div>

      <SiderMenu :theme="theme" />
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <a-icon
          class="trigger"
          :type="collapsed ? 'menu-unfold' : 'menu-fold'"
          @click="collapsed = !collapsed"
        ></a-icon>
        <Header />
      </a-layout-header>
      <!-- <a-layout-content style="margin: 0 16px"> -->
      <a-layout-content>
        <router-view></router-view>
      </a-layout-content>
      <a-layout-footer style="text-align: center"><Footer /></a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<script>
import SiderMenu from "@/components/layouts/SiderMenu.vue";
import Header from "@/components/layouts/Header.vue";
import Footer from "@/components/layouts/Footer.vue";
export default {
  components: {
    SiderMenu,
    Header,
    Footer,
  },
  data() {
    return {
      collapsed: false,
    };
  },
  computed: {
    theme() {
      return this.$route.query.theme || "dark";
    },
    layout() {
      return this.$route.query.layout || "left";
    },
  },
};
</script>

<style scoped>
#components-layout-demo-side .logo {
  /* width: 180px; */
  height: 32px;
  /* background: rgba(255, 255, 255, 0.2); */
  margin: 16px;
  font-size: 25px;
  font-family: "FangSong";
  text-align: center;
  /* color: #2d7cff; */
}
.trigger {
  padding: 0 20px;
  line-height: 64px;
  font-size: 20px;
}
.trigger:hover {
  background: #eee;
}
.logo {
  text-align: center;
  line-height: 30px;
  overflow: hidden;
}
.nav-theme-dark >>> .logo {
  color: #fff;
}
</style>
