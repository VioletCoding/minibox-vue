<template>
  <div class="container">
    <MyHeader></MyHeader>
    <MyCarousel :img-list="imgList"></MyCarousel>
    <!--功能选项-->
    <van-grid :column-num="5">
      <van-grid-item icon="point-gift" text="赠送游戏"/>
      <van-grid-item icon="clock" text="即将发售"/>
      <van-grid-item icon="shop" text="游戏中心"/>
      <van-grid-item icon="cluster" text="游戏厂商"/>
      <van-grid-item icon="shopping-cart" text="M币商城"/>
    </van-grid>
    <!--功能选项end-->

    <!--安利墙-->
    <van-cell title="安利墙" value="更多"/>
    <van-swipe class="my-swipe" :autoplay="0" :show-indicators="false">
      <van-swipe-item>1</van-swipe-item>
      <van-swipe-item>2</van-swipe-item>
      <van-swipe-item>3</van-swipe-item>
      <van-swipe-item>4</van-swipe-item>
    </van-swipe>
    <!--安利墙-->

    <!--游戏列表-->
    <van-cell title="为您推荐" value="更多"/>
    <van-card
        tag="-10%"
        price="268"
        desc="早上好，夜之城！"
        title="赛博朋克2077"
        thumb="http://qk8mtetqy.hn-bkt.clouddn.com/1907ca49e74747738bb8f484f6f7c846"
        origin-price="298.00"/>
    <van-card
        tag="-10%"
        price="11"
        desc="早上好，打桩机！"
        title="巫师3：狂猎"
        thumb="http://qk8mtetqy.hn-bkt.clouddn.com/1907ca49e74747738bb8f484f6f7c846"
        origin-price="10.00"/>
    <van-card
        tag="-10%"
        price="11"
        desc="早上好，打桩机！"
        title="巫师3：狂猎"
        thumb="http://qk8mtetqy.hn-bkt.clouddn.com/1907ca49e74747738bb8f484f6f7c846"
        origin-price="10.00"/>
    <!--游戏列表end-->
  </div>
</template>

<script>
import MyHeader from "@/views/header/MyHeader";
import MyCarousel from "@/views/mainBody/MyCarousel";

export default {
  name: "MyGameBodyList",
  components: {MyCarousel, MyHeader},
  data() {
    return {
      imgList: [
        {coverImg: 'http://qk8mtetqy.hn-bkt.clouddn.com/03f0ea416eaa47f4b3666ef447af97cc'},
        {coverImg: 'http://qk8mtetqy.hn-bkt.clouddn.com/1907ca49e74747738bb8f484f6f7c846'}
      ]
    }
  }
}
</script>

<style scoped lang="less">
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  background-color: #39a9ed;
}
</style>