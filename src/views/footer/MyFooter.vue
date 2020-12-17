<template>
  <div>
    <van-tabbar v-model="active" @change="onChange">
      <van-tabbar-item name='home' icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item name='community' icon="circle">社区</van-tabbar-item>
      <van-tabbar-item name='gameRepo' icon="cross" to="/game">游戏库</van-tabbar-item>
      <van-tabbar-item name='mine' icon="user-o">我</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: "MyFooter",
  data() {
    return {
      active: 'home'
    }
  },
  methods: {
    onChange() {
      this.$toast.success('切换成功,当前标签是' + this.active);
    }
  }
}
</script>

<style scoped>

</style>