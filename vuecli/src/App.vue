<template>
    <div id="main" class="app-main">
      <keep-alive>
        <router-view v-if="$route.meta.keep_alive"></router-view>
      </keep-alive>
      <router-view v-if="!$route.meta.keep_alive"></router-view>
    </div>
</template>

<script>
export default {
  data() {
    return {
      theme: this.$store.state.app.themeColor
    };
  },
//   created() {
//     // 当this.$router.options.routes的长度为1，且本地缓存存在菜单列表的时候才重新配置路由
//     if (!localStorage.getItem("routerList")) {
//       let subList = JSON.parse(localStorage.getItem("routerList"))
//       this.$router.addRoutes(subList);
//       // this.$router不是响应式的，所以手动将路由元注入路由对象
//       this.$router.options.routes.push(subList);
//     }
//   },
  mounted() {},
  beforeDestroy() {},
  methods: {}
};
</script>

<style lang="less">
@import "./styles/theme.less";
html,body {
  width: 100%;
  height: 100%;
  background: #f0f0f0;
  overflow: hidden;
}
.app-main {
  width: 100%;
  height: 100%;
}
</style>
