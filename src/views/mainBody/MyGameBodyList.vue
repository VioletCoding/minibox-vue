<!--游戏库页-->
<template>
  <div class="container"
       v-if="dataFlag">
    <!--头部和轮播图-->
    <MyHeader>
      <template #left>
        <span style="border-bottom: 1px solid black">推荐</span>
      </template>
    </MyHeader>
    <!--使用vant的下拉刷新功能-->
    <van-pull-refresh v-model="isLoading"
                      @refresh="showGameList"
                      loosing-text="松手刷新..."
                      loading-text="加载中..."
                      success-text="加载成功"
                      @load="showGameList"
                      style="min-height: 100vh;">

      <div style="margin-top: 50px">
        <van-swipe class="my-swipe"
                   :autoplay="3000"
                   indicator-color="white">
          <van-swipe-item v-for="(item,index) in gameList"
                          :key="index"
                          v-if="index < 5">
            <p class="swipe-text van-multi-ellipsis--l2">{{ item.name }}</p>
            <van-image lazy-render=true
                       width="100%"
                       height="200"
                       fit="cover"
                       :src="item.photoLink"
                       @click="showGameDetail(item.id)"/>
          </van-swipe-item>
        </van-swipe>
      </div>

      <!--头部和轮播图end-->

      <!--游戏列表-->
      <div style="margin-bottom: 50px">
        <van-cell title="为您推荐"/>
        <van-card
            v-for="(item,index) in gameList"
            :key="index"
            currency="￥"
            :tag="item.discount"
            :price="item.price"
            :desc="item.description"
            :title="item.name"
            :thumb="item.photoLink"
            :origin-price="item.originPrice"
            @click="showGameDetail(item.id)"/>
      </div>
    </van-pull-refresh>
    <!--游戏列表end-->
  </div>
</template>

<script>
import MyHeader from "@/views/header/MyHeader";
import Api from "@/api/api";
import utils from "@/api/utils";

export default {
  name: "MyGameBodyList",
  components: {MyHeader},
  data() {
    return {
      //数据是否加载完毕
      dataFlag: false,
      //轮播图，传递给子组件
      imgList: [],
      //下拉刷新-是否正在刷新
      isLoading: false,
      //游戏列表
      gameList: [],
      //激活的tab
      active: 0,
      pageNum: 1
    }
  },
  methods: {
    //展示游戏列表
    showGameList() {
      this.$http.post(Api.getAllGame,{})
          .then(res => {
            if (res.data.code === 200) {
              res.data.data.forEach(v => {
                //将BigDecimal转成2位小数，不知道为什么本来后台是带.00的，传上来就不带.00了
                v.price = v.price.toFixed(2);
                v.originPrice = v.originPrice.toFixed(2);
                //计算折扣
                if (v.price != 0 && v.price != v.originPrice) {
                  let i = ((v.price / v.originPrice) * 10).toFixed(1) + "折";
                  //动态往对象里添加一个属性，也就是把计算完的折扣值放到对象里
                  v.discount = i;
                } else if (v.price == 0) {
                  v.discount = "免费";
                }
              });
              //游戏列表
              this.gameList = res.data.data;
            } else {
              this.$toast.fail(res.data.message);
            }
          }).catch(err => this.$toast.fail(utils.errMessage(err)))
          .finally(f => {
            this.isLoading = false;
            this.dataFlag = true;
          });
    },
    //显示游戏详情
    showGameDetail(v) {
      this.$router.push({path: '/gameDetail', query: {id: v}}).catch(err => err);
    },
  },
  mounted() {
    this.dataFlag = false;
    this.isLoading = true;
    this.showGameList();
  }
}
</script>
<style scoped>
.swipe-text {
  position: absolute;
  width: 100%;
  height: 40px;
  z-index: 10;
  text-align: center;
  bottom: 0;
  color: white;
  font-size: 12px;
}
</style>