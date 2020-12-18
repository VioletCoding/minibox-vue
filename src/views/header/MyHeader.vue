<!--头部组件-->
<template>

  <van-nav-bar :fixed="isFixed">

    <template #left>
      <van-tabs v-model="active" swipeable animated color="black" line-width="20">
        <van-tab title="推荐"/>
        <van-tab title="关注"/>
      </van-tabs>
    </template>

    <template #right>
      <van-icon name="search" size="18" color="black" style="margin-right: 20px" @click="toSearch"/>
      <van-icon name="envelop-o" size="18" color="black"/>
    </template>
  </van-nav-bar>

</template>

<script>
export default {
  name: "MyHeader",
  data() {
    return {
      //是否把导航栏固定在顶部
      isFixed: true,
      //van-tab当前激活的标签
      active: 0
    }
  },
  methods: {
    toSearch() {
      this.$toast.success("点击了搜索图标");
    }
  }
}
</script>

<style scoped lang="less">

</style>