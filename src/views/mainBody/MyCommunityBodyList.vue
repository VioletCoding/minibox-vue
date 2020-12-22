<!--社区页-->
<template>
  <div>
    <!--头部-->
    <div>
      <MyHeader>
        <template #left>
          <van-tabs v-model="active" swipeable animated color="black" line-width="20">
            <van-tab title="推荐"/>
          </van-tabs>
        </template>
        <template #right>
          <van-icon name="search" size="18" color="black" style="margin-right: 20px"/>
          <van-icon name="envelop-o" size="18" color="black"/>
        </template>
      </MyHeader>
    </div>
    <!--头部end-->

    <!--版块-->
    <div style="margin-top: 50px">
      <van-tabs>
        <van-tab title="标签 1">
          <!--帖子列表-->
          <div class="post-list">

          </div>
          <!--帖子列表end-->
        </van-tab>
        <van-tab title="标签 2">内容 2</van-tab>
      </van-tabs>
    </div>
    <!--版块end-->
  </div>
</template>

<script>
import MyHeader from "@/views/header/MyHeader";

export default {
  name: "MyCommunityBodyList",
  components: {MyHeader},
  data() {
    return {
      //激活的tab
      active: 0
    }
  }
}
</script>