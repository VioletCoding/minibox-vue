<template>
  <div v-if="dataFlag">
    <!--头部-->
    <div class="header">
      <van-tabs v-model="active" swipeable animated sticky lazy-render @change="onTabChange">
        <van-tab title="数据">
          <!--用户信息-->
          <div class="user">
            <!--用户头像-->
            <div class="user-left inline-block">
              <van-image round width="80" height="80" :src="userInfo.mbPhoto.photoLink"/>
            </div>
            <!--用户头像end-->
            <!--用户昵称和签名-->
            <div class="user-right inline-block">
              <div class="user-right-nickname">{{ userInfo.nickname }}</div>
              <div class="user-right-desc">{{ userInfo.description }}</div>
            </div>
            <!--等级-->
            <div class="user-level inline-block">
              <div>
                <van-tag color="#7232dd">{{ userInfo.level }}</van-tag>
              </div>
            </div>
            <!--等级end-->
            <!--用户昵称和签名end-->
          </div>
          <!--用户信息end-->
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
                <div>{{ userInfo.gamePrice }}</div>
                <div>账号价值￥</div>
              </van-grid-item>
              <van-grid-item>
                <div>{{ userInfo.gameNumber }}</div>
                <div>游戏数量</div>
              </van-grid-item>
            </van-grid>
          </div>
          <!--游戏统计信息end-->
          <van-divider/>
          <van-tabs animated swipeable lazy-render>
            <van-tab title="拥有游戏">
              <!--游戏列表-->
              <div v-if="userInfo.gameList!=null && userInfo.gameList.length > 0" class="game-list"
                   v-for="(item,index) in userInfo.gameList" :key="index">
                <div class="game-list-left inline-block">
                  <van-image width="120" height="90" :src="item.coverImg"/>
                </div>
                <div class="game-list-right inline-block">
                  <div class="game-list-right-game-name">{{ item.name }}</div>
                  <div class="game-list-right-game-desc">{{ item.description }}</div>
                </div>
              </div>
              <!--游戏列表end-->
            </van-tab>
            <van-tab title="关注游戏"/>
          </van-tabs>
        </van-tab>


        <van-tab title="动态">
          <!--用户信息-->
          <div class="user">
            <!--用户头像-->
            <div class="user-left inline-block">
              <van-image round width="80" height="80" :src="userInfo.mbPhoto.photoLink"/>
            </div>
            <!--用户头像end-->
            <!--用户昵称和签名-->
            <div class="user-right inline-block">
              <div class="user-right-nickname">{{ userInfo.nickname }}</div>
              <div class="user-right-desc">{{ userInfo.description }}</div>
            </div>
            <!--等级-->
            <div class="user-level inline-block">
              <div>
                <van-tag color="#7232dd">{{ userInfo.level }}</van-tag>
              </div>
            </div>
            <!--等级end-->
            <!--用户昵称和签名end-->
          </div>
          <!--用户信息end-->

          <!--用户动态分类-->
          <van-tabs type="card">
            <!--发帖-->
            <van-tab title="帖子">
              <UserNews></UserNews>
            </van-tab>
            <van-tab title="评论">

            </van-tab>
            <!--发帖end-->
          </van-tabs>
        </van-tab>


        <van-tab title="设置"></van-tab>
      </van-tabs>
    </div>
    <!--头部end-->
  </div>
</template>

<script>
import Api from "@/api/api";
import UserNews from "@/views/user/UserNewsPost";

export default {
  name: "MyMineBodyList",
  components: {UserNews},
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
    //切换标签页时
    onTabChange(name, title) {
      console.log(name, title);
    },
    //显示用户信息
    async showUserInfo() {
      await this.$http.get(Api.showUserInfo, {
        params: {
          uid: localStorage.getItem("userId")
        }
      }).then(resp => {
        console.log("显示用户信息=>", resp);
        let v = resp.data.data;
        let gamePrice = 0;
        v["gamePrice"] = gamePrice;
        if (v.gameList != null && v.gameList.length > 0) {
          v.gameList.forEach(v => {
            gamePrice = gamePrice + v.price;
          })
          v["gamePrice"] = gamePrice;
        }
        this.userInfo = v;
        this.dataFlag = true;
      }).catch(err => {
        console.log("显示用户信息err=>", err);
      })
    },
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

.block {
  display: block;
}

.user {
  margin-top: 10px;
  height: 100px;

  .user-left {
    padding: 10px;
  }

  .user-right {
    vertical-align: top;
    padding: 10px;
    margin-top: 19px;

    .user-right-nickname {
      height: 25px;
      font-size: 14px;
    }

    .user-right-desc {
      height: 20px;
      font-size: 12px;
    }
  }

  .user-level {
    margin-top: 19px;
    padding: 10px;
    vertical-align: top;
  }

}

.game-list {
  height: 100px;
  margin-bottom: 5px;
  margin-top: 10px;

  .game-list-left {
    padding: 5px;
  }

  .game-list-right {
    vertical-align: top;
    padding: 10px;
    border-bottom: 1px solid #363A3F;

    .game-list-right-game-name {
      font-size: 18px;
    }

    .game-list-right-game-desc {
      margin-top: 25px;
      font-size: 14px;
    }
  }
}
</style>