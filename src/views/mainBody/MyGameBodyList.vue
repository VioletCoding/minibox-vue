<!--游戏库页-->
<template>
  <div class="container" v-if="dataFlag">
    <!--头部和轮播图-->
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
    <!--使用vant的下拉刷新功能-->
    <van-pull-refresh v-model="isLoading" @refresh="showGameList"
                      loosing-text="松手刷新..." loading-text="加载中..."
                      success-text="加载成功" style="min-height: 100vh;">
      <div style="margin-top: 50px">
        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
          <van-swipe-item v-for="(item,index) in imgList" :key="index" v-if="index < 5">
            <p class="swipe-text van-multi-ellipsis--l2">{{ item.name }}</p>
            <van-image lazy-render=true width="100%" height="200" fit="cover" :src="item.coverImg"
                       @click="showGameDetail(item.gid)"/>
          </van-swipe-item>
        </van-swipe>
      </div>
      <!--头部和轮播图end-->
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
        <div v-if="RecommendedGame.mbComment!=null" @click="showGameDetail(RecommendedGame.gid)">
          <van-card :desc="RecommendedGame.mbComment.content" :title="RecommendedGame.name"
                    :thumb="RecommendedGame.coverImg">
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
            :thumb="item.coverImg" :origin-price="item.originPrice" @click="showGameDetail(item.gid)"/>
      </div>
    </van-pull-refresh>
    <!--游戏列表end-->
  </div>
</template>

<script>
import MyHeader from "@/views/header/MyHeader";
import Api from "@/api/api";
import { Notify } from "vant";

export default {
  name: "MyGameBodyList",
  components: {MyHeader},
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
      //游戏列表
      gameList: [],
      //激活的tab
      active: 0
    }
  },
  methods: {
    //展示帖子列表
    showGameList() {
      this.$http.get(Api.getAllGame).then(res => {
        if (res.data.code === 200 && res.data.data != null && res.data.data.length > 0) {
          res.data.data.forEach(v => {
            //将BigDecimal转成2位小数，不知道为什么本来后台是带.00的，传上来就不带.00了
            v.price = v.price.toFixed(2);
            v.originPrice = v.originPrice.toFixed(2);
            //这里是安利墙的展示，就展示最新的一条安利，所以取数组下标0
            this.RecommendedGame = res.data.data[0];
            //计算折扣
            let i = ((v.price / v.originPrice) * 10).toFixed(1) + "折";
            //动态往对象里添加一个属性，也就是把计算完的折扣值放到对象里
            v[this.discount] = i;
          });
          //游戏列表
          this.gameList = res.data.data;
          //给轮播图赋值
          this.imgList = res.data.data;
        } else {
          Notify({type: 'danger', message: res.data.message});
        }
      }).catch(err => {
        Notify({type: 'danger', message: err.response.data.message});
      }).finally(f => {
        this.isLoading = false;
        this.dataFlag = true;
      });
    },
    //显示游戏详情
    showGameDetail(v) {
      this.$router.push({
        path: '/gameDetail',
        query: {
          gid: v
        }
      })
    },
  },
  mounted() {
    this.dataFlag = false;
    this.isLoading = true;
    this.showGameList();
  }
}
</script>
<style scoped lang="less">
.swipe-text {
  color: white;
  bottom: 10px;
  position: absolute;
  left: 36%;
  z-index: 10;
  font-size: 20px;
}
</style>