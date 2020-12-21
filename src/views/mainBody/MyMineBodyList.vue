<template>
  <div class="container">
    <div>
      <!--头部-->
      <MyHeader>
        <template #left>
          <van-tabs v-model="active" swipeable animated color="black" line-width="20">
            <van-tab title="数据"/>
            <van-tab title="动态"/>
          </van-tabs>
        </template>

        <template #right>
          <van-icon name="setting-o" size="18" color="black" style="margin-right: 20px"/>
          <van-icon name="envelop-o" size="18" color="black"/>
        </template>
      </MyHeader>
      <!--头部end-->
    </div>

    <!--用户基本信息-->
    <div style="margin-top: 50px">
      <van-card>
        <template #thumb>
          <van-image round width="5rem" height="5rem"
                     src="http://qk8mtetqy.hn-bkt.clouddn.com/66f57f9ee4ee4846a0bc95a9d7024d86"/>
        </template>

        <template #title>
          <div style="font-size: 20px;margin-top: 20px">
            <span>Violet__</span>
            <span style="margin-left: 20px">
              <van-tag color="#7232dd">LV12</van-tag>
            </span>
          </div>
        </template>

        <template #desc>
          <div style="margin-top: 10px">唯独你没懂</div>
        </template>
      </van-card>

      <van-grid :column-num="4" :border="false">
        <van-grid-item>
          <div>6</div>
          <div style="font-size: 10px">关注</div>
        </van-grid-item>

        <van-grid-item>
          <div>5</div>
          <div style="font-size: 10px">粉丝</div>
        </van-grid-item>

        <van-grid-item>
          <div>16</div>
          <div style="font-size: 10px">收藏</div>
        </van-grid-item>

        <van-grid-item>
          <div>9</div>
          <div style="font-size: 10px">最近浏览</div>
        </van-grid-item>
      </van-grid>
    </div>
    <!--用户基本信息end-->

    <!--推销信息-->
    <div>
      <van-grid direction="horizontal" :column-num="2">
        <van-grid-item icon="checked" text="主人的任务"/>
        <van-grid-item icon="checked" text="M币商城"/>
      </van-grid>
    </div>
    <!--推销信息end-->

    <!--游戏统计信息-->
    <div>
      <van-card
          currency=""
          price="账号价值 ￥ 2.00"
          title="Violet__"
          desc="游戏数量 79"
          thumb="http://qk8mtetqy.hn-bkt.clouddn.com/66f57f9ee4ee4846a0bc95a9d7024d86"/>
    </div>
    <!--游戏统计信息end-->

    <!--拥有游戏列表-->
    <div>
      <van-tabs>
        <van-tab title="拥有游戏">
          <van-card
              desc="描述信息"
              title="赛博朋克2077"
              thumb="https://img.yzcdn.cn/vant/ipad.jpeg"/>
        </van-tab>
        <van-tab title="关注游戏">内容 2</van-tab>
      </van-tabs>
    </div>
    <!--拥有游戏列表end-->
  </div>
</template>

<script>
import MyHeader from "@/views/header/MyHeader";

export default {
  name: "MyMineBodyList",
  components: {MyHeader},
  data() {
    return {
      //激活的tab
      active: 0
    }
  }
}
</script>

<style scoped lang="less">

</style>