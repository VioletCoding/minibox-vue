<template>
  <div v-if="dataFlag">
    <div>
      <!--头部-->
      <MyHeader>
        <template #left>
          <van-icon name="arrow-left"
                    color="black"
                    @click="back"/>
        </template>
        <template #middle>
          <p class="top-title">{{ returnData.gameInfo.name }}</p>
        </template>
      </MyHeader>
      <!--头部end-->
    </div>

    <!--轮播图-游戏图片展示区-->
    <div>
      <div style="background-color: #464A4F;margin-top: 50px">
        <van-swipe :autoplay="3000"
                   indicator-color="white">
          <van-swipe-item v-for="(item,index) in returnData.gamePhotos"
                          :key="index"
                          v-if="index < 10">
            <div>
              <van-image lazy-render
                         width="100%"
                         height="200"
                         fit="cover"
                         :src="item.photoLink"/>
            </div>
          </van-swipe-item>
        </van-swipe>
      </div>
    </div>
    <!--子展示区-->
    <div class="sub-show">
      <p>￥{{ returnData.gameInfo.price }}</p>
    </div>
    <!--子展示区end-->
    <!--轮播图-游戏图片展示区end-->

    <!--游戏基本信息-->
    <div class="container">
      <div>
        <div class="game-name">
          <!--游戏名字-->
          <div>{{ returnData.gameInfo.name }}</div>
          <!--游戏评分-->
          <div>{{ returnData.gameInfo.score }}</div>
        </div>
        <!--游戏标签-->
        <div class="tags">
          <div v-for="(item,index) in returnData.tags"
               :key="index">
            <van-tag color="#F3F4F5"
                     text-color="black">
              {{ item.tagName }}
            </van-tag>
          </div>
        </div>
        <!--分隔线-->
        <van-divider/>
      </div>
      <!--游戏基本信息end-->

      <!--游戏简介-->
      <div>
        <!--标头-->
        <p style="font-size: 18px;font-weight: bold;">游戏简介</p>
        <!--简介内容-->
        <p style="margin: 5px 0 5px 0;font-size: 12px;font-weight: 500;">
          {{ returnData.gameInfo.description }}
        </p>
        <!--开发商等信息-->
        <div style="font-size: 12px;display: flex;flex-direction: row;">
          <div style="justify-content: left">发行商： {{ returnData.gameInfo.publisher }}</div>
          <div style="margin-left: auto">开发商： {{ returnData.gameInfo.developer }}</div>
        </div>
        <div style="font-size: 12px">发行时间：{{ returnData.gameInfo.releaseTime }}</div>
      </div>
      <!--游戏简介end-->
      <!--分隔线-->
      <van-divider/>
      <!--游戏评分-->
      <div>
        <!--评分与点击评分-->
        <div @click="toPublish"
             class="flex">
          <p style="font-size: 14px;justify-content: left;color: #969799">轻点评分</p>
          <div style="margin-left: auto;background-color: #FCFCFC">
            <van-rate v-model="score"
                      void-icon="star"
                      void-color="#eee"
                      size="20"/>
          </div>
        </div>
      </div>
      <!--游戏评分end-->

      <!--评论列表-->
      <div class="comment-area">
        <div v-if="returnData.commentInfo.length">
          <van-divider>全部评论</van-divider>
          <div v-for="comment in returnData.commentInfo"
               style="margin-bottom: 20px">
            <div class="user-info">
              <!--头像-->
              <div>
                <van-image :src="comment.userModel.photoLink"
                           fit="cover"
                           round/>
              </div>
              <!-- 昵称 | 评论时间-->
              <div>
                <p>{{ comment.userModel.nickname }}</p>
                <span>{{ comment.createDate }}</span>
                <span>
                  <van-rate :value="comment.score"
                            void-icon="star"
                            void-color="#eee" size="5"/>
                </span>
              </div>
            </div>
            <!--评论内容-->
            <div class="content">
              <p>{{ comment.content }}</p>
            </div>
            <!--回复-->
            <div class="reply"
                 v-for="reply in comment.replyModel">
              <div>
                <span>{{ reply.userModel.nickname }}：</span>
                <span>回复&nbsp;{{ comment.userModel.nickname }}：</span>
                <p>{{ reply.content }}</p>
              </div>
            </div>
          </div>
        </div>

        <div v-else>
          <van-empty description="这里还没有评论呢"/>
        </div>
      </div>
    </div>


    <div style="width: 100%;height: 40px">
      <van-goods-action>
        <van-goods-action-button color="linear-gradient(to right, #464A4F, #16191E)"
                                 type="danger"
                                 text="立即购买"
                                 @click="generateOrder"/>
      </van-goods-action>
    </div>
    <!--评论列表end-->
    <!--弹出层-发表游戏评论-->
    <van-popup v-model="popPostBackground"
               position="bottom"
               :style="{ height: '100%'}"
               safe-area-inset-bottom>
      <MyGameCommentPublish @close="close"
                            :v="toSon"/>
    </van-popup>

  </div>
</template>

<script>
import MyHeader from "@/views/header/MyHeader";
import MyGameCommentPublish from "@/views/single/MyGameCommentPublish";
import Api from "@/api/api";
import utils from "@/api/utils";

export default {
  name: "SingleGame",
  components: {MyHeader, MyGameCommentPublish},
  data() {
    return {
      //返回的数据
      returnData: {},
      //评分
      score: 0,
      //激活的标签页
      active: 0,
      //是否弹出弹出层
      popPostBackground: false,
      dataFlag: false,
      //传给子组件
      toSon: {
        id: this.$route.query.id,
        name: ""
      }
    }
  },
  methods: {
    //关闭弹出层
    close(v) {
      this.popPostBackground = v;
      this.showGame();
    },
    //显示游戏详情
    showGame() {
      this.$http.get(Api.getGameDetail, {params: {id: this.$route.query.id}})
          .then(res => {
            console.log("游戏详情=>", res);
            this.returnData = res.data.data;
          })
          .catch(err => utils.errMessage(err))
          .finally(f => this.dataFlag = true)
    },
    //返回
    back() {
      this.$router.go(-1);
    },
    //去游戏评分
    toPublish() {
      this.toSon.name = this.returnData.gameInfo.name;
      this.popPostBackground = true;
    },
    //生成订单
    generateOrder() {
      this.$http.post(Api.order_generate, {
        gameId: this.$route.query.id,
        orderCost: this.returnData.gameInfo.price,
        userId: localStorage.getItem("userId")
      }).then(resp => {
        if (resp.data.code == 200) {
          this.$router.push({name: "MyGameOrder", params: resp.data.data});
        } else {
          this.$toast.fail(resp.data.message);
        }
      }).catch(err => this.$toast.fail(utils.errMessage(err)));
    }
  },
  mounted() {
    this.showGame();
  }
}
</script>

<style scoped lang="less">
.flex {
  display: flex;
  flex-direction: row;
}

p {
  padding: 0;
  margin: 0;
}

.top-title {
  font-size: 14px;
  font-weight: bold;
}

.sub-show {
  width: 100%;
  height: 45px;
  padding: 5px 0 0 0;
  background-image: linear-gradient(to right, #464A4F, #16191E);

  p:first-child {
    font-size: 28px;
    font-weight: bold;
    color: white;
  }
}

.container {
  padding: 0 10px 0 10px;

  .game-name {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 40px;
    padding: 15px 0 0 0;

    div:first-child {
      font-size: 18px;
      justify-content: left;
    }

    div:nth-child(2) {
      width: 60px;
      height: 25px;
      font-size: 28px;
      color: white;
      text-align: center;
      background-color: #F19E38;
      border-radius: 2px;
      margin-left: auto;
    }
  }

  .tags {
    display: flex;
    flex-direction: row;

    div {
      margin-right: 5px;
    }
  }
}

.comment-area {
  width: 100%;

  .user-info {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 40px;

    div:first-child {
      width: 40px;
      height: 40px;
    }

    div:nth-child(2) {
      width: 90%;
      height: 50px;
      margin: 5px 0 0 10px;

      p:first-child {
        font-size: 14px;
      }

      span:nth-child(2) {
        font-size: 10px;
        color: #969799;
        margin-right: 10px;
      }
    }
  }

  .content {
    margin-left: 50px;
    font-size: 12px;
  }

  .reply {
    margin: 15px 0 0 50px;
    background-color: #FCFCFC;

    div {
      font-size: 12px;
      line-height: 18px;

      span:first-child {
        color: #519BE5;
      }

      span:nth-child(2) {
        color: #969799;
      }
    }
  }

}

</style>