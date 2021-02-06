<template>
  <div v-if="dataFlag" style="margin-bottom: 70px">
    <div v-for="(item,index) in dataList"
         :key="index"
         class="container">
      <p>{{ item.content }}</p>
      <p>{{ item.createDate }}</p>
      <div v-if="item.postModel != null"
           class="parent"
           @click="postDetail(item.postModel.id)">
        <div>
          <van-image :src="item.postModel.photoLink"
                     width="40"
                     height="40"
                     fit="cover"
                     radius="5"/>
        </div>
        <p>{{ item.postModel.title }}</p>
      </div>
      <div v-else
           class="parent"
           @click="gameDetail(item.gameModel.id)">
        <div>
          <van-image :src="item.gameModel.photoLink"
                     width="150"
                     height="100"
                     fit="cover"
                     radius="5"/>
        </div>
        <p>{{ item.gameModel.name }}</p>
      </div>
      <van-divider/>
    </div>
  </div>
</template>

<script>
import Api from "@/api/api";
import utils from "@/api/utils";

export default {
  name: "MyNewsComment",
  data() {
    return {
      dataFlag: false,
      dataList: []
    }
  },
  methods: {
    //显示用户的评论
    showComments() {
      this.$http.get(Api.userComments, {
        params: {
          id: localStorage.getItem("userId")
        }
      }).then(resp => {
        if (resp.data.code == 200) {
          this.dataList = resp.data.data;
          this.dataFlag = true;
        } else {
          this.$toast.fail(resp.data.message);
        }
      }).catch(err => this.$toast.fail(utils.errMessage(err)));
    },
    gameDetail(gameId) {
      this.$router.push({
        path: "/gameDetail",
        query: {id: gameId}
      }).catch(err => err);
    },
    postDetail(postId) {
      this.$router.push({
        path: "/postDetail",
        query: {id: postId}
      }).catch(err => err);
    }

  },
  mounted() {
    this.showComments();
  }
}
</script>

<style scoped lang="less">
.container {
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
</style>