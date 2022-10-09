<template>
  <div>
    <a-layout style="min-height: 100vh; padding: 0">
      <!-- <a-layout-header style="background: #f0f2f5; padding: 0">Header</a-layout-header> -->
      <a-layout>
        <a-layout-sider width="50%" style="background-color: #f0f2f5">
          <div class="login"></div>
        </a-layout-sider>
        <a-layout-content><router-view></router-view></a-layout-content>
      </a-layout>
      <!-- <a-layout-footer style="background: #f0f2f5; padding: 0">Footer</a-layout-footer> -->
    </a-layout>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
aside .login {
  width: 624px;
  height: 372px;
  position: absolute;
  top: 25%;
  right: 0;
  background-color: #f0f2f5;
  /* background-color: #000; */
  background-image: url("../../assets/images/bg_.png");
  /* background-image: url("../../../public/statics/images/bg_.png"); */
  background-position: center 0px;
  background-repeat: no-repeat;
  background-size: cover;
  text-indent: -999px;
}
</style>
