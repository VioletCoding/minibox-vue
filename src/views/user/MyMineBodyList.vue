<template>
  <div v-if="dataFlag">
    <!--头部-->
    <div>
      <van-tabs v-model="active" swipeable animated sticky lazy-render>
        <van-tab title="数据">
          <MyUserInfo :userInfo="userInfo"></MyUserInfo>
          <!--订阅信息-->
          <div>
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
          <van-divider/>
          <!--订阅信息end-->
          <!--游戏统计信息-->
          <div>
            <van-grid :column-num="2">
              <van-grid-item>
                <div>{{ userInfo.gamePrice == null ? 0 : userInfo.gamePrice }}</div>
                <div>账号价值￥</div>
              </van-grid-item>
              <van-grid-item>
                <div>{{ userInfo.gameList.length > 0 ? userInfo.gameList[0].game_num : 0 }}</div>
                <div>游戏数量</div>
              </van-grid-item>
            </van-grid>
          </div>
          <!--游戏统计信息end-->
          <van-divider/>
          <van-tabs animated swipeable lazy-render>
            <van-tab title="拥有游戏">
              <!--空状态-->
              <div v-if="userInfo.gameList.length == 0">
                <van-empty description="你好像没有购买游戏哦" />
              </div>

              <!--游戏列表-->
              <div v-if="userInfo.gameList!=null && userInfo.gameList.length > 0" class="game-list"
                   v-for="(item,index) in userInfo.gameList" :key="index">

                <div class="game-list-left inline-block">
                  <van-image width="120" height="70" fit="cover" :src="item.cover_img" radius="5px"/>
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
            <van-tab title="关注游戏"/>
          </van-tabs>
        </van-tab>


        <van-tab title="动态">
          <MyUserInfo :userInfo="userInfo">
            <template #photo>
              <van-image round fit="cover" width="80" height="80" :src="userInfo.userImg"/>
            </template>
          </MyUserInfo>
          <!--用户动态分类-->
          <van-tabs type="card" animated lazy-render>
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
          <MySetting :userInfo="userInfo" @updateImg="updateImg"></MySetting>
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
import { Notify } from "vant";

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
        params: {
          id: localStorage.getItem("userId")
        }
      }).then(resp => {
        console.log("个人详情->", resp);
        let v = resp.data.data;
        let gamePrice = 0;
        //计算游戏总价格，并加到对象里
        if (v.gameList.length > 0) {
          v.gameList.forEach(value => {
            gamePrice = gamePrice + value.price;
          })
          v["gamePrice"] = gamePrice;
        }
        this.userInfo = v;
        this.dataFlag = true;
      }).catch(err => {
        Notify({type: "danger", message: "加载失败，请重试"});
      })
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