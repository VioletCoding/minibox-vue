<!--头部组件-->
<template>
  <van-sticky>
    <div class="Biggest">
      <div class="myContainer">
        <!--引入vant布局-->
        <van-row type="flex" justify="start" class="myRow">
          <van-col span="3" class="myFollow">关注</van-col>
          <van-col span="3" class="myRecommend">推荐</van-col>
          <van-col span="2" offset="12" class="mySearch">
            <van-icon name="search"/>
          </van-col>
          <van-col span="2" offset="1" class="myMessage">
            <van-icon name="envelop-o"/>
          </van-col>
        </van-row>
      </div>
      <!--引入vant的tabs标签-->
      <div>
        <van-tabs v-model="active">
          <van-tab v-for="(item,index) in blockList" :key="index" :title="item.name"></van-tab>
        </van-tabs>
      </div>
    </div>
  </van-sticky>
</template>

<script>
export default {
  name: "MyHeader",
  data() {
    return {
      //tabs标签激活索引，默认是0，也就是第一个
      active: 0
    }
  },
  props: {
    //版块信息，由父组件传入
    blockList: {
      type: Array,
      default() {
        return []
      }
    }
  },
}
</script>

<style scoped lang="less">
.Biggest {
  background-color: white;

  .myContainer {
    height: 50px;
    font-size: 18px;
    font-weight: bold;

    .myRow {
      height: 50px;
      text-align: center;
      line-height: 50px;

    }

    .myFollow {
    }

    .myRecommend {
    }

    .myGame {
    }

    .mySearch {
    }

    .myMessage {
    }
  }
}
</style>