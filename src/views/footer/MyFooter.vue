<template>
  <div>
    <van-tabbar v-model="active">
      <van-tabbar-item icon="home-o" to="/">首页</van-tabbar-item>
      <van-tabbar-item icon="circle">社区</van-tabbar-item>
      <van-tabbar-item icon="cross" to="/game">游戏库</van-tabbar-item>
      <van-tabbar-item icon="user-o">我</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: "MyFooter",
  data() {
    return {
      active: 0
    }
  }
}
</script>

<style scoped>

</style>