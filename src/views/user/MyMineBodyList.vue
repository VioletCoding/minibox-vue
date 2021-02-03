<template>
  <div v-if="dataFlag">
    <!--头部-->
    <div>
      <van-tabs v-model="active"
                swipeable
                animated
                sticky
                lazy-render>
        <van-tab title="数据">
          <MyUserInfo :user-info="userInfo"></MyUserInfo>
          <van-divider/>
          <!--订阅信息end-->
          <!--游戏统计信息-->
          <div>
            <van-grid :column-num="2">
              <van-grid-item>
                <div>{{ userInfo.totalPrice == null ? 0 : userInfo.totalPrice }}</div>
                <div>账号价值￥</div>
              </van-grid-item>
              <van-grid-item>
                <div>{{ userInfo.gameModelList.length > 0 ? userInfo.gameModelList.length : 0 }}</div>
                <div>游戏数量</div>
              </van-grid-item>
            </van-grid>
          </div>
          <!--游戏统计信息end-->
          <van-divider>拥有游戏</van-divider>
          <!--空状态-->
          <div v-if="userInfo.gameModelList.length == 0">
            <van-empty description="你好像没有购买游戏哦"/>
          </div>

          <!--游戏列表-->
          <div v-else
               class="game-list"
               v-for="(item,index) in userInfo.gameModelList"
               :key="index">

            <div class="game-list-left inline-block">
              <van-image width="120"
                         height="70"
                         fit="cover"
                         :src="item.photoLink"
                         radius="5px"/>
            </div>
            <div class="game-list-right inline-block">
              <div class="game-list-right-game-name">
                {{ item.name }}
              </div>
              <div class="game-list-right-game-desc van-ellipsis">
                {{ item.description }}
              </div>
            </div>
          </div>
          <!--游戏列表end-->
        </van-tab>

        <van-tab title="动态">
          <MyUserInfo :userInfo="userInfo">
            <template #photo>
              <van-image round
                         fit="cover"
                         width="80"
                         height="80"
                         :src="userInfo.photoLink"/>
            </template>
          </MyUserInfo>
          <!--用户动态分类-->
          <van-tabs type="card"
                    animated
                    lazy-render>
            <van-tab title="发帖">
              <UserNews></UserNews>
            </van-tab>

            <van-tab title="评论">
              <MyNewsComment></MyNewsComment>
            </van-tab>
          </van-tabs>
        </van-tab>
        <!--用户动态分类end-->

        <van-tab title="设置">
          <MySetting :userInfo="userInfo"
                     @updateImg="updateImg"></MySetting>
        </van-tab>

      </van-tabs>
    </div>
    <!--头部end-->
  </div>
</template>

<script>
import Api from "@/api/api";
import UserNews from "@/views/user/UserNewsPost";
import MyNewsComment from "@/views/user/MyNewsComment";
import MySetting from "@/views/user/MySetting";
import MyUserInfo from "@/views/user/MyUserInfo";
import utils from "@/api/utils";

export default {
  name: "MyMineBodyList",
  components: {MySetting, UserNews, MyNewsComment, MyUserInfo},
  data() {
    return {
      //激活的tab
      active: 0,
      //用户信息
      userInfo: {},
      //数据标识
      dataFlag: false,
      //是否正在加载
      loading: false,
      //数据列表
      dataList: [],
      //帖子列表
      imgList: []
    }
  },
  methods: {
    //显示用户信息
    async showUserInfo() {
      await this.$http.get(Api.showUserInfo, {
        params: {id: localStorage.getItem("userId")}
      }).then(resp => {
        console.log("个人信息=>", resp);
        //计算下游戏总价格
        if (resp.data.data.gameModelList.length > 0) {
          let v = resp.data.data.gameModelList;
          let totalPrice = 0;
          v.forEach(game => {
            totalPrice = totalPrice + game.price;
          })
          resp.data.data.totalPrice = totalPrice;
          this.userInfo = resp.data.data;
        } else {
          this.userInfo = resp.data.data;
        }
        this.dataFlag = true;
      }).catch(err => utils.errMessage(err));
    },
    //更换头像以后，把其他引用了MyUserInfo组件的图片也更新
    updateImg(v) {
      this.showUserInfo();
    }
  },
  mounted() {
    this.showUserInfo();
  }
}
</script>

<style scoped lang="less">
.inline-block {
  display: inline-block;
}

.game-list {
  height: 100px;
  margin-bottom: 30px;
  margin-top: 10px;

  .game-list-left {
    padding: 5px;
  }

  .game-list-right {
    vertical-align: top;
    padding: 10px;

    .game-list-right-game-name {
      width: 220px;
      font-size: 16px;
    }

    .game-list-right-game-desc {
      color: #969799;
      width: 220px;
      font-size: 10px;
    }
  }
}
</style>