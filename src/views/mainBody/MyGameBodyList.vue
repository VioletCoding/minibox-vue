<template>
  <div class="container" v-if="dataFlag">
    <!--使用vant的下拉刷新功能-->
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh"
                      loosing-text="松手刷新..." loading-text="加载中..."
                      success-text="加载成功" style="min-height: 100vh;">
      <!--头部和轮播图-->
      <MyHeader/>
      <MyCarousel :img-list="imgList" @getYouATid="showGameDetail"/>
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
      <div>
        <van-cell title="安利墙" value="更多"/>
        <div v-if="RecommendedGame.mbComment!=null">
          <van-card :desc="RecommendedGame.mbComment.content" :title="RecommendedGame.name" :thumb="RecommendedGame.coverImg">
            <template #price>
              <van-rate allow-half readonly size="10" v-model="RecommendedGame.mbComment.score"/>
            </template>
            <template #footer>
              {{ RecommendedGame.mbComment.mbUser.nickname }}
              <br/>
              {{ RecommendedGame.mbComment.createDate }}
            </template>
          </van-card>
        </div>

      </div>
      <!--安利墙end-->
      <!--游戏列表-->
      <div style="margin-bottom: 50px">
        <van-cell title="为您推荐" value="更多"/>
        <van-card
            v-for="(item,index) in gameList" :key="index"
            currency="￥"
            :tag="item.discount" :price="item.price"
            :desc="item.description" :title="item.name"
            :thumb="item.coverImg" :origin-price="item.originPrice"/>
      </div>
    </van-pull-refresh>
    <!--游戏列表end-->
    <MyFooter/>
  </div>
</template>

<script>
import MyHeader from "@/views/header/MyHeader";
import MyCarousel from "@/views/mainBody/MyCarousel";
import MyFooter from "@/views/footer/MyFooter";
import Api from "@/api/api";
import axios from "axios";

export default {
  name: "MyGameBodyList",
  components: {MyCarousel, MyHeader, MyFooter},
  data() {
    return {
      //数据是否加载完毕
      dataFlag: false,
      //轮播图，传递给子组件
      imgList: [],
      //安利墙
      RecommendedGame: {},
      //下拉刷新-是否正在刷新
      isLoading: false,
      //折扣
      discount: "discount",
      //这个实际上是个游戏id，只不过我轮播图写死成了tid，临时解决下
      tid: 'tid',
      //游戏列表
      gameList: []
    }
  },
  methods: {
    //展示帖子列表
    showGameList() {
      axios.get(Api.getAllGame)
          .then(res => {
            if (res.data.code === 200 && res.data.data != null && res.data.data.length > 0) {
              res.data.data.forEach(v => {
                //将BigDecimal转成2位小数，不知道为什么本来后台是带.00的，传上来就不带.00了
                v.price = v.price.toFixed(2);
                v.originPrice = v.originPrice.toFixed(2);
                this.RecommendedGame = res.data.data[0];
              });
              //游戏列表
              res.data.data.forEach(v2 => {
                //如果降价了，才计算折扣
                if (v2.price < v2.originPrice) {
                  //计算折扣
                  let i = "-" + (v2.originPrice - v2.price) * 1 + "%";
                  //动态往对象里添加一个属性，也就是把计算完的折扣值放到对象里
                  v2[this.discount] = i;
                }
                v2[this.tid] = v2.gid;
              });
              //游戏列表
              this.gameList = res.data.data;

              //给轮播图赋值
              this.imgList = res.data.data;
              this.dataFlag = true;
              this.isLoading = false;
            } else {
              if (res.data.message != null || res.data.message != "") {
                this.$toast.fail(res.data.message);
              } else {
                this.$toast.fail("请求失败...麻烦再试一下吧")
              }
            }
          })
          .catch(err => {
            console.log(err);
            this.$toast.fail("加载失败");
            this.isLoading = false;
            this.dataFlag = true;
          });
    },
    //显示游戏详情
    showGameDetail(v) {

    },
    //刷新方法
    onRefresh() {
      this.showGameList();
    }
  },
  mounted() {
    this.dataFlag = false;
    this.isLoading = true;
    this.showGameList();
  }
}
</script>

<style scoped lang="less">

</style>