<!--搜索结果页-->
<template>
  <div v-if="dataFlag">
    <van-loading vertical v-if="!dataFlag">加载中</van-loading>

    <!--游戏结果-->
    <div class="game-result">
      <p><strong>游戏</strong></p>
      <div>
        <div class="inline-block">
          <van-image src="https://img.yzcdn.cn/vant/cat.jpeg" width="150" height="80" radius="5" fit="cover"/>
        </div>

        <div class="inline-block name-desc">
          <div>Apex 英雄</div>
          <div>
            <van-tag type="warning" radius="5">免费</van-tag>
          </div>
        </div>
      </div>
    </div>
    <!--游戏结果end-->

    <!--分割线-->
    <div class="divider"></div>
    <!--分割线end-->

    <!-- 搜索提示 -->
    <van-empty image="search" description="没有找到结果" v-if="returnData.length == 0"/>

    <!--帖子结果-->
    <div class="post-result" v-for="(item,index) in returnData" :key="index" v-if="returnData.length!=0">
      <p><strong>社区</strong></p>
      <div class="inline-block">
        <van-image :src="item.mbUser.userImg" width="50" height="50" radius="5" fit="cover"/>
      </div>
      <div class="inline-block author-info">
        <div>
          <div class="van-ellipsis nickname inline-block">{{ item.mbUser.nickname }}</div>
          <div class="inline-block level">
            <van-tag type="warning">{{ 'Lv ' + item.mbUser.level }}</van-tag>
          </div>
        </div>
        <div class="small-text">{{ item.createDate }} {{ item.mbBlock.name }}</div>
      </div>
      <div class="inline-block comment-count">
        <van-icon name="comment-o" color="#C9CDD1"><span class="comment-number">{{ item.commentList.length }}</span>
        </van-icon>
      </div>

      <div class="post-info">
        <!--帖子标题-->
        <p class="van-multi-ellipsis--l2">
          {{ item.title }}
        </p>
        <!--帖子正文 最多显示3行-->
        <p class="van-multi-ellipsis--l3">{{ item.content }}</p>

        <div>
          <van-image :src="item.coverImg" width="80%" height="150" radius="5" fit="cover"/>
        </div>
      </div>
      <van-divider/>

    </div>
    <!--帖子结果end-->
  </div>
</template>

<script>
import Api from "@/api/api";

export default {
  name: "MySearchResult",
  data() {
    return {
      dataFlag: false,
    }
  },
  props: {
    returnData: {
      type: Array,
      default() {
        return []
      }
    }
  },
  mounted() {
    this.dataFlag = true;
  }
}
</script>

<style scoped lang="less">
.inline-block {
  display: inline-block;
}

.divider {
  width: 100%;
  height: 5px;
  background-color: #F7F8F9;
}

.game-result {
  padding: 0 20px 0 20px;
  margin-bottom: 10px;

  .name-desc {
    vertical-align: top;
    margin-left: 10px;

    div:nth-child(2) {
      margin-top: 10px;
    }
  }
}

.post-result {
  padding: 0 20px 0 20px;

  .author-info {
    vertical-align: top;
    margin-left: 10px;
    font-size: 16px;

    .nickname {
      width: 150px;
    }

    .level {
      vertical-align: top;
    }

    .small-text {
      margin-top: 10px;
      font-size: 12px;
      color: #C9CDD1;
    }
  }

  .comment-count {
    vertical-align: top;
    float: right;
    margin-right: 10px;

    .comment-number {
      font-size: 10px;
      vertical-align: top;
      margin-left: 5px;
      color: #C9CDD1;
    }
  }

  .post-info {
    p:nth-child(2) {
      font-size: 14px;
    }
  }
}
</style>