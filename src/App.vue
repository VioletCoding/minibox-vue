<template>
  <div id="app" v-cloak>
    <transition name="slide-fade">
      <router-view/>
    </transition>

    <!-- 如果在 A 页面和 B 页面都渲染了一个 Tabbar 组件，这两个 Tabbar 的状态是不共享的，单页面应用可以把 Tabbar 放到 router-view 外面-->
    <div v-if="$route.meta.showFooter">
      <van-tabbar v-model="active" route>
        <van-tabbar-item v-for="(item,index) in tabBarMenu"
                         :key="index"
                         :icon="item.icon"
                         replace
                         :to="item.path">
          {{ item.chineseName }}
        </van-tabbar-item>
      </van-tabbar>
    </div>

  </div>
</template>

<script>


export default {
  data() {
    return {
      active: 0,
      //按钮菜单信息
      tabBarMenu: [
        {path: "/", chineseName: "首页", icon: "circle"},
        {path: "/game", chineseName: "游戏库", icon: "cross"},
        {path: "/mine", chineseName: "我", icon: "user-o"}
      ]
    }
  }
}
</script>

<style lang="scss">
//解决跳路由闪屏问题
[v-cloak] {
  display: none !important;
}

html, body, #app {
  height: 100%;
  margin: 0;
  padding: 0;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
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
