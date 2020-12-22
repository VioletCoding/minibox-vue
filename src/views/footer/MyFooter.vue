<!--脚部标签菜单栏，采用vant-tabbar组件-->
<template>
  <div>
    <van-tabbar v-model="active">
      <van-tabbar-item v-for="(item,index) in tabBarMenu" :key="index"
                       :icon="item.icon" replace :to="item.path">
        {{ item.chineseName }}
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: "MyFooter",
  data() {
    return {
      //激活的标签索引
      active: 0,
      //按钮菜单信息
      tabBarMenu: [
        {name: "home", path: "/", chineseName: "首页", icon: "home-o"},
        //{name: "community", path: "/community", chineseName: "社区", icon: "circle"},
        {name: "game", path: "/game", chineseName: "游戏库", icon: "cross"},
        {name: "mine", path: "/mine", chineseName: "我", icon: "user-o"}
      ]
    }
  }
}
</script>