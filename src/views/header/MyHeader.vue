<!--头部组件，采用vant-navbar-->
<template>
  <div>
    <van-nav-bar :fixed="true">
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
  name: "MyHeader"
}
</script>