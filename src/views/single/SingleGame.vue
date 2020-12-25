<template>
  <div>
    <div>
      <!--头部-->
      <MyHeader>
        <template #left>
          <van-icon name="arrow-left" color="black" @click="back"/>
        </template>

        <template #middle>
          <span style="font-weight: bold">{{ returnData.name }}</span>
        </template>

        <template #right>
          <van-icon name="search" size="18" color="black" style="margin-right: 20px"/>
          <van-icon name="envelop-o" size="18" color="black" style="margin-right: 20px"/>
          <van-icon name="share-o" size="18" color="black"/>
        </template>
      </MyHeader>
      <!--头部end-->
    </div>

    <!--轮播图-游戏图片展示区-->
    <div style="margin-top: 50px">
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white" style="background-color:#363A3F">
        <van-swipe-item v-for="(item,index) in imgList" :key="index" v-if="index < 5">
          <van-image lazy-render width="100%" height="200" fit="cover" :src="item.photoLink"/>
        </van-swipe-item>
      </van-swipe>
      <!--子展示区-->
      <van-cell style="background-color: #363A3F">
        <template #title>
          <div>
            <span class="game-price">￥{{ returnData.price }}</span>
          </div>
        </template>

        <template #default>
          <van-tag size="large" color="#474A4E">全区价格</van-tag>
        </template>
      </van-cell>
      <!--子展示区end-->
    </div>
    <!--轮播图-游戏图片展示区end-->

    <!--游戏基本信息-->
    <div class="game-basic-info">
      <div>
        <!--游戏名字-->
        <div class="game-name">
          <span>{{ returnData.name }}</span>
          <!--游戏评分-->
          <span class="game-score">
            <span>
              <van-tag color="#CF2CF6" size="large">评分：{{ returnData.score }}</van-tag>
            </span>
          </span>
        </div>
        <!--标签分类-->
        <div class="tag-group">
          <span>{{ returnData.name }}</span>
        </div>

      </div>
      <!--游戏标签-->
      <div>
        <span v-for="(item,index) in returnData.tagList" :key="index" class="game-tag">
          <van-tag color="#F3F4F5" text-color="black">{{ item.tagName }}</van-tag>
        </span>
      </div>
      <!--分隔线-->
      <van-divider/>
    </div>
    <!--游戏基本信息end-->

    <!--游戏简介-->
    <div class="game-description">
      <!--标头-->
      <div>
        <span class="desc-content">游戏简介</span>
        <span class="desc-more">更多</span>
      </div>
      <!--简介内容-->
      <div class="desc">
        {{ returnData.description }}
      </div>
      <!--开发商等信息-->
      <div class="dev-container">
        <div class="dev-info">
          <div class="inline-block dev">
            <span>发行时间：{{ returnData.releaseTime }}</span>
          </div>
          <div class="inline-block">开发商：
            <span class="link-style">{{ returnData.developer }}</span>
          </div>
        </div>

        <div class="devAndHardDrive">
          <div class="inline-block dev">
            <span>发行商：</span>
            <span class="link-style">{{ returnData.publisher }}</span>
          </div>
          <div class="inline-block">
            <span>硬件配置：</span>
            <span class="link-style">点击查看</span>
          </div>
        </div>
      </div>
    </div>
    <!--游戏简介end-->
    <!--分隔线-->
    <van-divider/>
    <!--游戏评分-->
    <div class="game-rating">
      <!--标题-->
      <div class="game-rating-title">
        <div class="game-rating-title-left inline-block">游戏评分</div>
        <div class="game-rating-title-right inline-block">评分规则</div>
      </div>
      <!--评分与点击评分-->
      <div class="game-rating-overall">
        <div class="game-rating-overall-left inline-block">
          <span class="span-text">{{ returnData.score }}</span>
        </div>
        <div class="game-rating-overall-right inline-block" @click="toPublish">
          <div class="inline-block"><span class="touch-score">轻点评分</span></div>
          <div>
            <van-rate v-model="score" void-icon="star" void-color="#eee" size="30"/>
          </div>
        </div>
      </div>
    </div>
    <!--游戏评分end-->
    <!--分隔线-->
    <van-divider/>


    <!--评论列表-->
    <div class="comment-list">
      <!--标题-->
      <div class="comment-list-title">
        <van-tabs v-model="active">
          <van-tab title="最新">
            <div class="comment-list-comment" v-for="(item,index) in returnData.commentList" :key="index">
              <!--评论区域-标题-包含用户信息-->

              <div class="comment-list-comment-title">
                <!--评论区域-标题-用户头像-->
                <div class="comment-list-comment-title-photo inline-block">
                  <van-image round width="2.5rem" height="2.5rem" :src="item.mbUser.mbPhoto.photoLink"/>
                </div>
                <!--评论区域-标题-用户昵称-->
                <div class="comment-list-comment-title-info inline-block">
                  <div class="comment-list-comment-title-info-nickname inline-block">
                    <span>{{ item.mbUser.nickname }}</span>
                  </div>
                  <!--用户的评分-->
                  <div class="comment-list-comment-title-info-score">
                    <van-rate readonly allow-half size="10"
                              color="#ffd21e" void-icon="star" void-color="#eee"
                              :value="item.score"/>
                  </div>
                </div>
              </div>
              <!--评论内容-->
              <div class="comment-list-comment-text">
                <span>{{ item.content }}</span>
              </div>
              <!--评论日期-->
              <div class="comment-list-comment-date">
                <span>{{ item.createDate }}</span>
              </div>
              <!--分隔线-->
              <van-divider/>
            </div>
          </van-tab>
        </van-tabs>
      </div>
    </div>
    <!--评论列表end-->
    <!--弹出层-发表游戏评论-->
    <van-popup v-model="popPostBackground" position="bottom" :style="{ height: '100%'}" safe-area-inset-bottom>
      <MyGameCommentPublish @close="close" :v="toSon"/>
    </van-popup>

  </div>
</template>

<script>
import MyHeader from "@/views/header/MyHeader";
import MyGameCommentPublish from "@/views/single/MyGameCommentPublish";
import Api from "@/api/api";
import { Notify } from "vant";

export default {
  name: "SingleGame",
  components: {MyHeader, MyGameCommentPublish},
  data() {
    return {
      //轮播图片列表
      imgList: [],
      //返回的数据
      returnData: {},
      //评分
      score: 0,
      //激活的标签页
      active: 0,
      //是否弹出弹出层
      popPostBackground: false,
      //传给子组件
      toSon: {
        gid: 0,
        name: "",
        score: 1
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
       this.$http.get(Api.getGameDetail, {
        params: {
          gid: this.$route.query.gid
        }
      }).then(res => {
        this.imgList = res.data.data.photoList;
        this.returnData = res.data.data;
      }).catch(err => {
         Notify({type: "danger", message: err.response.data.message});
      })
    },
    //返回
    back() {
      this.$router.go(-1);
    },
    //去游戏评分
    toPublish() {
      this.toSon.gid = this.returnData.gid;
      this.toSon.name = this.returnData.name;
      this.toSon.score = this.score;
      this.popPostBackground = true;
    }
  },
  mounted() {
    this.showGame();
  }
}
</script>

<style scoped lang="less">

.game-name {
  padding: 8px 0 0 8px;
  font-weight: bold;
}

.tag-group {
  padding: 5px 0 0 8px;
  font-size: 12px;
  margin-bottom: 5px;
  color: #969799;
}

.game-score {
  float: right;
  margin-top: 20px;
  margin-right: 10px;
}

.game-price {
  font-size: 28px;
  color: white;
}

.link-style {
  color: #519BE5;
}

.inline-block {
  display: inline-block;
}

.desc {
  height: 100px;
  padding: 10px 0 0 10px;
  font-size: 14px;
}

.desc-more {
  float: right;
  padding: 0 10px 0 10px;
  font-weight: bold;
  font-size: 14px;
}

.desc-content {
  padding: 0 0 0 10px;
  font-size: 20px;
  font-weight: bold;
}

.dev-container {
  height: 64px;
}

.dev {
  width: 50%;
}

.dev-info {
  font-size: 14px;
  padding: 10px;
}

.devAndHardDrive {
  font-size: 14px;
  padding: 0 10px 0 10px;
}

.game-tag {
  margin-right: 5px;
  padding: 0 0 0 8px;
}

.game-rating {
  height: 130px;

  .game-rating-title {
    padding: 10px 10px 0 10px;

    .game-rating-title-left {
      font-weight: bold;
    }

    .game-rating-title-right {
      float: right;
      font-size: 12px;
    }
  }

  .game-rating-overall {
    height: 70px;
    margin-top: 10px;
    padding: 10px 0 0 10px;

    .game-rating-overall-left {
      width: 30%;
      height: 100%;
      color: white;
      float: left;
      vertical-align: center;
      font-size: 30px;
      text-align: center;
      background-color: #D52DF6;
      border-radius: 3px;

      .span-text {
        display: block;
        padding-top: 20px;
      }
    }

    .game-rating-overall-right {
      .touch-score {
        display: block;
        margin-left: 50px;
        margin-bottom: 15px;
        color: #969799;
      }

      margin-left: 50px;
    }

  }
}

.game-basic-info {
  width: 100%;
  height: 80px;
}

.game-description {
  width: 100%;
  height: 200px;
  margin-top: 20px;
}


.comment-list {

  .comment-list-title {
    .comment-list-comment {
      .comment-list-comment-title {
        height: 50px;

        .comment-list-comment-title-photo {
          width: 12%;
          padding: 6px 0 0 6px;
        }

        .comment-list-comment-title-info {
          vertical-align: top;
        }

        .comment-list-comment-title-info-nickname {
          vertical-align: top;
          padding: 4px 0 0 5px;
          font-size: 13px;
        }

        .comment-list-comment-title-info-score {
          padding: 5px 0 0 5px;
        }
      }

      .comment-list-comment-text {
        padding: 5px 0 0 10px;
        font-size: 14x;
      }

      .comment-list-comment-date {
        height: 15px;
        margin-top: 15px;
        font-size: 14px;
        padding: 5px 0 0 10px;
        color: #D5D8DC;
      }
    }
  }
}

</style>