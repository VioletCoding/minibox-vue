<!--查看他人的用户信息-->
<template>
  <div>
    <div v-if="!loading">
      <div style="width: 100%">
        <van-button class="back"
                    round
                    hairline
                    @click="()=>this.$router.go(-1)">
          <van-icon name="arrow-left"/>
          返回
        </van-button>
        <van-tabs v-model="activeTab"
                  color="black"
                  swipeable
                  animated>
          <van-tab title="动态">
            <!--1.用户信息-->
            <div class="user-info" v-if="dataSource">
              <van-image
                  round
                  width="70px"
                  height="70px"
                  fit="cover"
                  alt="加载失败"
                  :src="dataSource.photoLink"
                  @click="showBigPhoto(dataSource.photoLink)"/>
              <div class="info">
                <div class="name">{{ dataSource.nickname }}</div>
                <div class="desc van-ellipsis">{{ dataSource.description }}</div>
              </div>
            </div>
            <div v-else>
              <van-loading>数据加载中</van-loading>
            </div>
            <!--2.用户动态-->
            <van-divider/>
            <div class="news">
              <van-tabs v-model="innerTabActive"
                        color="black"
                        animated
                        lazy-render
                        type="card">
                <van-tab title="发帖">
                  <!--3.动态 -> 发过的帖子-->
                  <div class="posts">
                    <div v-if="newsLoading" style="text-align: center">
                      <van-loading>加载中</van-loading>
                    </div>
                    <div v-else v-for="(post,index) in posts" :key="index"
                         @click="toPost(post.id)">
                      <p class="post-title">{{ post.title }}</p>
                      <div class="post-cover">
                        <van-image :src="post.photoLink"
                                   alt="加载失败"
                                   height="200px"
                                   fit="cover"
                                   radius="5"/>
                      </div>
                      <van-divider/>
                    </div>
                  </div>
                </van-tab>
                <!--4.动态 -> 发过的评论-->
                <van-tab title="评论">
                  <div v-for="(com,index) in comments"
                       :key="index + 'c'"
                       class="comment">
                    <p>{{ com.content }}</p>
                    <p>{{ com.createDate }}</p>
                    <div v-if="com.postModel"
                         class="parent"
                         @click="toPost(com.postModel.id)">
                      <div>
                        <van-image :src="com.postModel.photoLink"
                                   width="40"
                                   height="40"
                                   fit="cover"
                                   radius="5"/>
                      </div>
                      <p>{{ com.postModel.title }}</p>
                    </div>
                    <div v-else
                         class="parent"
                         @click="toGame(com.gameModel.id)">
                      <div>
                        <van-image :src="com.gameModel.photoLink"
                                   width="150"
                                   height="100"
                                   fit="cover"
                                   radius="5"/>
                      </div>
                      <p>{{ com.gameModel.name }}</p>
                    </div>
                    <van-divider/>
                  </div>
                </van-tab>
              </van-tabs>
            </div>

          </van-tab>
          <van-tab title="游戏">
            <div v-if="dataSource">
              <div class="game-list"
                   v-for="(item,index) in dataSource.gameModelList"
                   :key="index +'g'"
                   @click="toGame(item.id)">

                <div class="game-list-left">
                  <van-image width="120"
                             height="70"
                             fit="cover"
                             :src="item.photoLink"
                             radius="5px"/>
                </div>
                <div class="game-list-right">
                  <div class="game-list-right-game-name">
                    {{ item.name }}
                  </div>
                  <div class="game-list-right-game-desc van-multi-ellipsis--l3">
                    {{ item.description }}
                  </div>
                </div>
              </div>
            </div>
            <div v-else>
              <van-loading>数据加载中</van-loading>
            </div>
          </van-tab>
        </van-tabs>
      </div>
    </div>
    <div v-else>
      <van-loading style="text-align: center;margin-top: 50px">加载中</van-loading>
    </div>
  </div>
</template>

<script>
import api from "@/api/api";
import utils from "@/api/utils";
import { ImagePreview } from "vant";

export default {
  name: "MyUserDetailView",
  data() {
    return {
      loading: false,
      newsLoading: false,
      activeTab: 0,
      innerTabActive: 0,
      dataSource: undefined,
      posts: undefined,
      comments: undefined
    }
  },
  methods: {
    showBigPhoto(v) {
      ImagePreview({images: [v], showIndex: false});
    },
    loadInfo() {
      this.loading = true;
      this.$http.get(api.showUserInfo, {params: {id: this.$route.query.id}})
          .then(resp => {
            if (resp.data.code === 200) {
              this.dataSource = resp.data.data;
            } else {
              this.$toast.fail(resp.data.message);
            }
          }).catch(err => utils.errMessage(err));
      this.loading = false;
    },
    loadPosts() {
      this.newsLoading = true;
      this.$http.get(api.userPosts, {params: {id: this.$route.query.id}})
          .then(resp => {
            if (resp.data.code === 200) {
              this.posts = resp.data.data;
            } else {
              this.$toast.fail(resp.data.message);
            }
          }).catch(err => utils.errMessage(err));
      this.newsLoading = false;
    },
    loadComments() {
      this.newsLoading = true;
      this.$http.get(api.userComments, {params: {id: this.$route.query.id}})
          .then(resp => {
            if (resp.data.code === 200) {
              this.comments = resp.data.data;
            } else {
              this.$toast.fail(resp.data.message);
            }
          }).catch(err => utils.errMessage(err));
      this.newsLoading = false;
    },
    toPost(id) {
      this.$router.push({
        path: "postDetail",
        query: {id: id}
      })
    },
    toGame(gameId) {
      this.$router.push({
        path: "/gameDetail",
        query: {id: gameId}
      }).catch(err => err);
    },
  },
  mounted() {
    this.loadInfo();
    this.loadPosts();
    this.loadComments();
  }
}
</script>

<style scoped lang="less">
.back {
  width: 60px;
  height: 60px;
  bottom: 50%;
  right: 10px;
  z-index: 999;
  position: fixed;
}

.user-info {
  margin-top: 10px;
  display: flex;
  align-items: center;
  padding: 15px;
  width: 100%;
  height: 70px;

  .info {
    margin-left: 20px;
    width: 70%;

    .name {
      font-size: 20px;
    }

    .desc {
      font-size: 14px;
      margin-top: 10px;
      color: #969799;
    }
  }
}

.news {
  width: 100%;

  .posts {
    padding: 15px;

    .post-title {
      padding: 0;
      margin: 0 0 10px;
      font-size: 18px;
      font-weight: bold;
    }

    .post-cover {
      width: 100%;
      height: 200px;
    }
  }
}

.comment {
  width: 99%;

  p:first-child {
    padding: 0 15px 0 15px;
    font-size: 14px;
  }

  p:nth-child(2) {
    font-size: 10px;
    padding-left: 15px;
    color: #969799;
  }

  .parent {
    display: flex;
    flex-direction: row;
    padding: 0 15px 0 15px;
    background-color: #FCFCFC;

    p {
      padding: 0;
      margin: 0;
    }

    :nth-child(1) {
      width: 40px;
      height: 40px;
    }

    :nth-child(2) {
      font-size: 12px;
      height: 40px;
      line-height: 40px;
      text-overflow: ellipsis;
      margin: 0 0 0 20px;
    }
  }

}

.game-list {
  height: 100px;
  margin-top: 10px;
  display: flex;

  .game-list-left {
    padding: 5px;
  }

  .game-list-right {
    padding-top: 5px;

    .game-list-right-game-name {
      width: 220px;
      font-size: 16px;
    }

    .game-list-right-game-desc {
      margin-top: 3px;
      color: #969799;
      width: 220px;
      font-size: 10px;
    }
  }
}
</style>