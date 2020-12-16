<!--首页父组件-->
<template>
  <div class="container">
    <!--自定义头部组件，将版块信息传给子组件-->
    <MyHeader :blockList="gameList"></MyHeader>
    <!--使用vant的下拉刷新功能-->
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <!--自定义轮播图组件，将图片信息传给子组件-->
      <MyCarousel :imgList="pictureList"></MyCarousel>
      <!--自定义首页数据集合，将数据传给子组件-->
      <MyMainBodyList :dataList="mainBodyList"></MyMainBodyList>
    </van-pull-refresh>
    <MyFooter></MyFooter>
  </div>
</template>

<script>
import Api from "../api/api";
import '@/assets/icon/ali/iconfont.css';
import MyHeader from "./header/MyHeader";
import MyCarousel from "./mainBody/MyCarousel";
import MyMainBodyList from "./mainBody/MyMainBodyList";
import MyFooter from "./footer/MyFooter";

export default {
  name: "Home",
  components: {MyHeader, MyCarousel, MyMainBodyList, MyFooter},
  data() {
    return {
      //是否正在加载
      isLoading: false,
      //图片list
      pictureList: [],
      //版块list
      gameList: [],
      //传给MyMainBodyList组件，类型是数组
      mainBodyList: [],
      //
      code: 0
    }
  },
  methods: {
    //下拉刷新，正在刷新
    onRefresh() {
      //请求帖子列表接口
      this.getPostList();
      if (this.code == 200) {
        //设置正在加载为false
        this.isLoading = false;
        this.$toast.success('刷新成功');
        this.code = 0;
      } else {
        this.$toast.fail('加载失败，请重试');
        this.isLoading = false;
        this.code = 0;
      }
    },
    //获取帖子列表
    async getPostList() {
      await this.$http.get(Api.getPostList).then(res => {
        console.log(res)
        //把回调赋值给要传给子组件的值，这里只把数组传了过去
        this.mainBodyList = res.data.data;
        this.pictureList = res.data.data;
        this.code = res.data.code;
      }).catch(err => {
        this.$toast.fail('加载失败,请重试');
      });
    },
    async getBlockList() {
      await this.$http.get(Api.getBlockList).then(res => {
        console.log("板块=>", res)
        if (res.data.code = 200) {
          this.gameList = res.data.data;
          this.$toast.success("加载板块成功");
        } else {
          this.$toast.fail("加载板块失败");
        }
      })
    }
  },
  mounted() {
    //获取帖子列表
    this.getPostList();
    //获取板块列表
    this.getBlockList();
  }
}
</script>

<style lang="less">
</style>