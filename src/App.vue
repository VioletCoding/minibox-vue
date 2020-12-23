<template>
  <div id="app" v-cloak>
    <transition name="slide-fade">
      <router-view/>
    </transition>
    <!-- 如果在 A 页面和 B 页面都渲染了一个 Tabbar 组件，这两个 Tabbar 的状态是不共享的，单页面应用可以把 Tabbar 放到 router-view 外面-->
    <MyFooter v-if="showFooter"/>
  </div>
</template>


<script>

import MyFooter from "@/views/footer/MyFooter";

export default {
  components: {MyFooter},
  data() {
    return {
      //是否显示底部？
      showFooter: true
    }
  },
  //监听路由，什么时候显示底部tabbar
  watch: {
    $route(to, from) {
      if (this.$route.path === "/" || this.$route.path === "/home") {
        this.showFooter = true;
      }
      if (this.$route.path === "/postDetail"
          ||
          this.$route.path === "/gameDetail"
          ||
          this.$route.path === "/login") {
        this.showFooter = false;
      } else {
        this.showFooter = true;
      }
    }
  }
}
</script>

<style lang="scss">
//解决调路由闪屏问题
[v-cloak] {
  display: none !important;
}

html, body, #app {
  height: 100%;
  margin: 0;
  padding: 0;
}

/* 可以设置不同的进入和离开动画 */
/* 设置持续时间和动画函数 */
.slide-fade-enter-active {
  transition: all .1s ease;
}

.slide-fade-leave-active {
  transition: all .1s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}

.slide-fade-enter, .slide-fade-leave-to {
  opacity: 0;
}

</style>
