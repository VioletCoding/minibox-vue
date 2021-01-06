<template>
  <div class="container" v-if="dataFlag">
    <div v-for="(item,index) in dataList" :key="index" @click="toPost(item.id)">
      <div class="com-and-date" v-for="(com,cIndex) in item.commentList" :key="cIndex">
        <div>{{ com.content }}</div>
        <div>{{ com.createDate }}</div>
      </div>

      <div>
        <div class="inline-block pic">
          <van-image :src="item.coverImg" fit="fill" width="50" height="50"/>
        </div>

        <div class="inline-block nickname-and-title van-ellipsis">
          <div class="van-ellipsis">{{ item.mbUser.nickname }} :</div>
          <div class="van-ellipsis">{{ item.title }}</div>
        </div>

      </div>
      <van-divider/>
    </div>

  </div>
</template>

<script>
import Api from "@/api/api";
import { Notify } from "vant";

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
      this.$http.get(Api.showUserComment, {
        params: {
          uid: localStorage.getItem("userId")
        }
      }).then(resp => {
        console.log("「个人信息」->「个人评论」->", resp);
        this.dataList = resp.data.data;
        this.dataFlag = true;
      }).catch(err => {
        Notify({type: "danger", message: "加载失败，请重试"});
      })
    },
    toPost(v) {
      this.$router.push({path: "/postDetail", query: {id: v}})
    }
  },
  mounted() {
    this.showComments();
  }
}
</script>

<style scoped lang="less">
.inline-block {
  display: inline-block;
}

.container {
  width: 90%;
  margin: 20px auto 0;

  .com-and-date {
    margin-bottom: 10px;

    div:nth-child(1) {
      font-size: 14px;
    }

    div:nth-child(2) {
      font-size: 12px;
      margin-top: 10px;
      color: #969799;
    }
  }

  .pic {
    width: 50px;
    height: 50px;
  }

  .nickname-and-title {
    width: 80%;
    vertical-align: top;
    margin-left: 10px;
    background-color: #FAFBFC;

    div:nth-child(1) {
      font-size: 12px;
    }

    div:nth-child(2) {
      margin-top: 5px;
      font-size: 14px;
    }
  }
}
</style>