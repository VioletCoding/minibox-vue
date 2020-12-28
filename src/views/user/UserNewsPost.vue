<template>
  <div class="container">
    <div v-for="(item,index) in dataList" :key="index" class="news-post" @click="toPost(item.tid)">
      <div class="new-post-title">
        {{ item.title }}
      </div>
      <div class="new-post-date">
        {{ item.createDate }} - {{ item.mbBlock.name }}
      </div>
      <div>
        <van-image :src="item.coverImg" width="150" height="100" fit="fill"/>
      </div>
      <van-divider/>
    </div>
  </div>
</template>

<script>
import Api from "@/api/api";

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
      await this.$http.get(Api.getPostList, {
        params: {
          uid: localStorage.getItem("userId")
        }
      }).then(res => {
        this.dataList = res.data.data;
      }).catch(err => {
        this.$toast.fail('加载失败,请重试');
      });
    },
    //点击去帖子详情
    toPost(v) {
      this.$router.push({path: "/postDetail", query: {tid: v}})
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
    margin-top: 20px;

    .new-post-title {
      text-align: left;
      font-size: 18px;
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