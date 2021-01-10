<!--搜索页面-->
<template>
  <div>
    <!--返回按钮 & 搜索框 -->
    <div>
      <van-search v-model="searchContent" placeholder="输入搜索内容" @input="getSearchResult">
        <template #left>
          <van-icon name="arrow-left" size="25" @click="back"/>
        </template>
      </van-search>
    </div>

    <!--分割线-->
    <div class="divider"></div>
    <!--分割线end-->

    <!--热门搜索 这个功能待定，我再想想ES怎么弄-->
    <MySearchResult v-if="showResult" :returnData="returnData"></MySearchResult>
    <!--还没有搜索结果的时候，显示一些推荐搜索的内容 TODO还没有实际功能-->
    <!--    <div class="searchContent" v-if="searchContent==''">-->
    <!--      <p><strong>热门搜索</strong></p>-->
    <!--      <div class="inline-block van-ellipsis"><span>1 apex</span></div>-->
    <!--      <div class="inline-block van-ellipsis"><span>2 epic</span></div>-->
    <!--      <p><Strong>热议中</Strong></p>-->
    <!--      <div class="inline-block van-ellipsis"><span>1 #盒友杂谈# </span></div>-->
    <!--      <div class="inline-block van-ellipsis"><span>2 #再见2020# </span></div>-->
    <!--    </div>-->
    <!--热门搜索 end-->

  </div>
</template>

<script>
import MySearchResult from "@/views/mainBody/search/MySearchResult";
import Api from "@/api/api";

export default {
  name: "MySearch",
  components: {MySearchResult},
  data() {
    return {
      //搜索内容
      searchContent: "",
      //是否显示结果页
      showResult: false,
      //搜索结果
      returnData: []
    }
  },
  methods: {
    //加载一些随机“推荐”内容
    loadRecommand() {

    },
    //获取当前搜索内容，然后调用搜索接口，先跳到搜索结果页，再渲染数据
    //获取搜索结果
    getSearchResult() {
      this.$http.get(Api.simpleSearch, {params: {title: this.searchContent}}
      ).then(resp => {
        this.returnData = resp.data.data;
        this.showResult = true;
      }).catch(err => {
        console.log(err);
      })
    },
    //返回
    back() {
      this.$emit("back", false);
    }
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

.searchContent {
  margin-top: 20px;
  padding: 0 20px 0 20px;

  div {
    width: 50%;
    height: 30px;
    line-height: 30px;
  }

  span {
    font-size: 15px;
  }

}
</style>