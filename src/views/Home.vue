<!--首页父组件-->
<template>
  <div class="container">
    <!--自定义头部组件，将版块信息传给子组件-->
    <MyHeader/>
    <!--使用vant的下拉刷新功能-->
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh"
                      loosing-text="松手刷新..." loading-text="加载中..."
                      success-text="加载成功" :disabled="disabledPullRefresh">
      <!--自定义轮播图组件，将图片信息传给子组件-->
      <MyCarousel :imgList="pictureList" @getYouATid="showPostDetail"/>
      <!--自定义首页数据集合，将数据传给子组件-->
      <!--@disabledPullRefresh 子组件发射的事件，控制是否允许下拉刷新-->
      <MyMainBodyList :dataList="mainBodyList" @disabledPullRefresh="pullRefreshStatus"/>
    </van-pull-refresh>
    <MyFooter/>
  </div>
</template>

<script>
import Api from "../api/api";
import MyHeader from "./header/MyHeader";
import MyCarousel from "./mainBody/MyCarousel";
import MyMainBodyList from "./mainBody/MyMainBodyList";
import MyFooter from "./footer/MyFooter";
import axios from "axios";

export default {
  name: "Home",
  components: {MyHeader, MyCarousel, MyMainBodyList, MyFooter},
  data() {
    return {
      //是否正在加载
      isLoading: false,
      //图片list
      pictureList: [],
      //传给MyMainBodyList组件，类型是数组
      mainBodyList: [],
      //判定是否请求成功状态码标识
      code: 0,
      //是否禁止下拉刷新
      disabledPullRefresh: false
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
        this.code = 0;
      } else {
        this.$toast.fail('加载失败，请重试');
        this.isLoading = false;
        this.code = 0;
      }
    },
    //获取帖子列表
    async getPostList() {
      await axios.get(Api.getPostList).then(res => {
        //把回调赋值给要传给子组件的值，这里只把数组传了过去
        this.mainBodyList = res.data.data;
        this.pictureList = res.data.data;
        this.code = res.data.code;
      }).catch(err => {
        this.$toast.fail('加载失败,请重试');
      });
    },
    //下拉刷新是否被禁止
    pullRefreshStatus(v) {
      this.disabledPullRefresh = v;
    },
    //显示帖子列表
    showPostDetail(v) {
      axios.get(Api.getPostDetail, {
        params: {
          tid: v
        }
      }).then(res => {
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
  },
  mounted() {
    //进入主页就自动获取帖子列表
    this.getPostList();
  }
}
</script>

<style lang="less">
</style>