<template>
  <div class="container">
    <div v-for="(item,index) in dataList"
         :key="index"
         class="news-post"
         @click="toPost(item.id)">
      <div class="new-post-title">
        {{ item.title }}
      </div>
      <div style="margin-top: 10px">
        <van-image :src="item.photoLink"
                   width="150"
                   height="100"
                   radius="5"
                   fit="cover"/>
      </div>
      <van-divider/>
    </div>
  </div>
</template>

<script>
import Api from "@/api/api";
import utils from "@/api/utils";

export default {
  name: "UserNews",
  data() {
    return {
      //数据
      dataList: []
    }
  },
  methods: {
    //获取帖子列表
    async getPostList() {
      await this.$http.get(Api.userPosts, {
        params: {
          id: localStorage.getItem("userId")
        }
      }).then(res => {
        console.log(res.data.data);
        this.dataList = res.data.data;
      }).catch(err => this.$toast.fail(utils.errMessage(err)));
    },
    //点击去帖子详情
    toPost(v) {
      this.$router.push({path: "/postDetail", query: {id: v}})
    }
  },
  mounted() {
    this.getPostList();
  }
}
</script>

<style scoped lang="less">
.container {
  width: 90%;
  margin: 0 auto;

  .news-post {
    margin: 20px 0 70px 0;

    .new-post-title {
      text-align: left;
      font-size: 14px;
      font-weight: bold;
    }

    .new-post-date {
      text-align: left;
      font-size: 12px;
      margin-bottom: 15px;
      color: #969799;
    }

  }
}

</style>