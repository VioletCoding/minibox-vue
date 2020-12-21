<!--头部组件，采用vant-navbar-->
<template>
  <div>
    <van-nav-bar :fixed="isFixed">
      <template #left>
        <slot name="left"></slot>
      </template>
      <template #title>
        <slot name="middle"></slot>
      </template>
      <template #right>
        <slot name="right"></slot>
      </template>
    </van-nav-bar>
  </div>
</template>

<script>
export default {
  name: "MyHeader",
  data() {
    return {
      //是否把导航栏固定在顶部
      isFixed: true
    }
  }
}
</script>