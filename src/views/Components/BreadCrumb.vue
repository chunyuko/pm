<template>
  <div>
    <a-page-header
      style="border: 1px solid rgb(235, 237, 240); border-width: 1px 0; margin-bottom: 20px; background: #fff"
      :breadcrumb="{ props: { routes } }"
    />
  </div>
</template>
<script>
export default {
  name: "BreadCrumb",
  data() {
    return {
      routes: [],
    };
  },
  created() {
    const list = this.$router.history.current.matched;
    for (let i = 1; i < list.length; i++) {
      let route = {
        path: list[i].path,
        breadcrumbName: list[i].meta.title,
      };
      this.routes.push(route);
    }
  },
  methods: {},
};
</script>
<style></style>
