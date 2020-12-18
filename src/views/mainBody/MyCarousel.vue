<!--轮播图组件-->
<template>
  <div class="myCarousel">
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="(item,index) in imgList" :key="index" v-if="index < 5">
        <van-image lazy-render=true width="100%" height="200" fit="cover" :src="item.coverImg"
                   @click="showDetail(item.tid)"/>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
import Api from "@/api/api";

export default {

  name: "MyCarousel",
  props: {
    //图片列表信息
    imgList: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {}
  },
  methods: {
    //发射一个事件
    showDetail(v) {
      this.$emit('getYouATid',v);
    }
  }
}
</script>

<style scoped lang="less">
.myCarousel {
  width: 100%;
  margin-top: 50px;
}
</style>