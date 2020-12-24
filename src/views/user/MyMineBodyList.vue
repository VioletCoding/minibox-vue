<template>
  <div>
    <!--头部-->
    <div class="header">
      <van-tabs v-model="active" swipeable animated sticky>
        <van-tab title="数据">
          <!--用户信息-->
          <div class="user">
            <!--用户头像-->
            <div class="user-left inline-block">
              <van-image round width="80" height="80" src="https://img.yzcdn.cn/vant/cat.jpeg"/>
            </div>
            <!--用户头像end-->
            <!--用户昵称和签名-->
            <div class="user-right inline-block">
              <div class="user-right-nickname">用户_5fe1a5efb592f82ec4460</div>
              <div class="user-right-desc">唯独你没懂</div>
            </div>
            <!--等级-->
            <div class="user-level inline-block">
              <div>
                <van-tag color="#7232dd">LV12</van-tag>
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
                <div>3998</div>
                <div>账号价值￥</div>
              </van-grid-item>
              <van-grid-item>
                <div>79</div>
                <div>游戏数量</div>
              </van-grid-item>
            </van-grid>
          </div>
          <!--游戏统计信息end-->
          <van-divider/>
          <van-tabs>
            <van-tab title="拥有游戏">
              <!--游戏列表-->
              <div class="game-list">
                <div class="game-list-left inline-block">
                  <van-image width="120" height="90" src="https://img.yzcdn.cn/vant/cat.jpeg"/>
                </div>
                <div class="game-list-right inline-block">
                  <div class="game-list-right-game-name">赛博猫客2077</div>
                  <div class="game-list-right-game-desc">欢迎来到夜之城！</div>
                </div>
              </div>
              <!--游戏列表end-->
            </van-tab>
            <van-tab title="关注游戏"/>
          </van-tabs>
        </van-tab>

        <van-tab title="动态"></van-tab>
        <van-tab title="设置"></van-tab>
      </van-tabs>
    </div>
    <!--头部end-->
  </div>
</template>

<script>
import Api from "@/api/api";
export default {
  name: "MyMineBodyList",
  data() {
    return {
      //激活的tab
      active: 0
    }
  },
  methods: {
    showUserInfo() {

    }
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

  .game-list-left {
    padding: 5px;
  }

  .game-list-right {
    vertical-align: top;
    padding: 10px;

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