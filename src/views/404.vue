<template>
  <a-result status="404" title="404" sub-title="对不起，没有访问的路由！">
    <template #extra>
      <a-button type="primary" @click="back">返回首页</a-button>
    </template>
  </a-result>
</template>

<script>
export default {
  methods: {
    back(e) {
      window.location.href = "/";
    },
  },
};
</script>

<style scoped></style>
