<!--搜索结果页-->
<template>
  <div style="padding: 0 10px 0 10px">
    <div v-if="returnData.post.length > 0 || returnData.game.length > 0">
      <div v-if="returnData.post.length > 0 ">
        <p style="font-weight: bold;">社区</p>
        <div v-for="(item,index) in returnData.post"
             :key="index">
          <p style="font-size: 14px;font-weight: bold">{{ item.title }}</p>
          <van-image :src="item.photoLink"
                     alt="图片加载失败..."
                     fit="cover"
                     radius="5"
                     style="width: 200px;height: 100px"/>
          <van-divider/>
        </div>
      </div>
      <div v-if="returnData.game.length > 0">
        <!--     // TODO 游戏搜索展示-->
      </div>
    </div>
  </div>
</template>

<script>
import Api from "@/api/api";

export default {
  name: "MySearchResult",
  methods: {
    //去游戏详情
    toGameDetail(gameId) {
      this.$router.push({path: "/gameDetail", query: {id: gameId}});
    },
    //去帖子详情
    toPostDetail(postId) {
      this.$router.push({path: "/postDetail", query: {id: postId}})
    }
  },
  props: {
    returnData: Object
  }
}
</script>

<style scoped lang="less">
</style>