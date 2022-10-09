<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/home">Home</router-link>
      |
      <router-link to="/user">user</router-link>
      |
      <router-link to="/user/login">login</router-link>
      |
      <router-link to="/user/register">register</router-link>
      |
      <router-link to="/">仪表盘</router-link>
      |
      <router-link to="/dashboard/analysis">分析页</router-link>
      |
      <router-link to="/form/basic-form">基础表单</router-link>
      |
      <router-link to="/form/step-form">步骤表单</router-link>
      |
      <router-link to="/form/step-form/info">step1</router-link>
      |
      <router-link to="/form/step-form/confirm">step2</router-link>
      |
      <router-link to="/form/step-form/result">step3</router-link>
      |
      <router-link to="/nn">404</router-link>
    </div> -->

    <transition name="transitionRouter">
      <router-view></router-view>
    </transition>
  </div>
</template>
<script></script>

<style lang="less">
.transitionRouter-enter-active,
.transitionRouter-leave-active {
  transition: all 0.4s;
}
.transitionRouter-enter,
.transitionRouter-leave {
  transform: translate3d(100%, 0, 0);
}
</style>
