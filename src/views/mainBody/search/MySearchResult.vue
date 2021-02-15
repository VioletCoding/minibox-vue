<!--搜索结果页-->
<template>
  <div style="padding: 0 10px 0 10px">
    <div v-if="returnData.post.length > 0 || returnData.game.length > 0">

      <div v-if="returnData.game.length > 0">
        <p style="font-weight: bold;font-size: 20px">游戏</p>
        <div v-for="(item,index) in returnData.game"
             :key="index + 'game' "
             @click="toGameDetail(item.id)">
          <van-image :src="item.photoLink"
                     alt="图片加载失败"
                     fit="cover"
                     radius="5"
                     style="width: 50%;height: 100px;display: inline-block"/>
          <div style="display:inline-block;vertical-align: top;margin-left: 20px;">
            <p style="font-size: 14px">{{ item.name }}</p>
            <van-tag type="warning">
              <strong>￥</strong>
              <a style="font-size: 14px">{{ item.price }}</a>
              <a style="text-decoration-line: line-through;margin-left: 5px;font-size: 10px">{{ item.originPrice }}</a>
            </van-tag>
          </div>
        </div>
        <van-divider/>
      </div>

      <div v-if="returnData.post.length > 0 ">
        <p style="font-weight: bold;font-size: 20px">社区</p>
        <div v-for="(item,index) in returnData.post"
             :key="index"
             @click="toPostDetail(item.id)">
          <p style="font-size: 14px;font-weight: bold">{{ item.title }}</p>
          <van-image :src="item.photoLink"
                     alt="图片加载失败..."
                     fit="cover"
                     radius="5"
                     style="width: 200px;height: 100px"/>
        </div>
        <van-divider/>
      </div>
    </div>

    <div v-else>
      <van-empty description="似乎没有你想要的结果"/>
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