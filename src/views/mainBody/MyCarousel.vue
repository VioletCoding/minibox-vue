<!--轮播图组件-->
<template>
  <div class="myCarousel">
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="(item,index) in imgList" :key="index">
        <van-image lazy-render=true width="100%" height="200" fit="fill" :src="item.coverImg"
                   @click="showPostDetail(item.tid)"/>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
import Api from "@/api/api";
import axios from "axios";

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
    showPostDetail(v) {
      axios.get(Api.getPostDetail, {
        params: {
          tid: v
        }
      }).then(res => {
        console.log("点击轮播=>", res);
        if (res.data.code == 200) {
          this.$router.push({
            path: '/postDetail',
            query: {
              tid: v
            }
          })
        }
      }).catch(err => {
        console.log("点击轮播错误=>", err);
      })
    }
  }
}
</script>

<style scoped lang="less">
.myCarousel {
  width: 100%;
}
</style>