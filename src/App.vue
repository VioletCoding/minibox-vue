<template>
  <div id="app" v-cloak>
    <transition name="slide-fade">
      <keep-alive>
        <router-view/>
      </keep-alive>
    </transition>

    <!-- 如果在 A 页面和 B 页面都渲染了一个 Tabbar 组件，这两个 Tabbar 的状态是不共享的，单页面应用可以把 Tabbar 放到 router-view 外面-->
    <div v-if="showFooter">
      <van-tabbar v-model="active" route>
        <van-tabbar-item v-for="(item,index) in tabBarMenu" :key="index"
                         :icon="item.icon" replace :to="item.path">
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
      //是否显示底部？
      showFooter: true,
      active: 0,
      //按钮菜单信息
      tabBarMenu: [
        {path: "/", chineseName: "首页", icon: "home-o"},
        {path: "/game", chineseName: "游戏库", icon: "cross"},
        {path: "/mine", chineseName: "我", icon: "user-o"}
      ]
    }
  },
  //监听路由，什么时候显示底部tabbar
  watch: {
    $route(to, from) {
      if (this.$route.path === "/") {
        this.showFooter = true;
      }
      if (this.$route.path === "/postDetail" ||
          this.$route.path === "/gameDetail" ||
          this.$route.path === "/login" ||
          this.$route.path === "/modifyPassword" ||
          this.$route.path === "/order") {
        this.showFooter = false;

      } else {
        this.showFooter = true;
      }
    }
  },
  methods: {
    checkUserAgent() {
      let flag =
          navigator.userAgent.match(
              /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i);
      return flag;
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
