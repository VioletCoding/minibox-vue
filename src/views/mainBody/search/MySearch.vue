<!--搜索页面-->
<template>
  <div>
    <!--返回按钮 & 搜索框  @keyup.enter按下回车-->
    <div>
      <van-search v-model="searchContent" placeholder="输入搜索内容" @keydown.enter="toSearchPage">
        <template #left>
          <van-icon name="arrow-left" size="25" @click="back"/>
        </template>
      </van-search>
    </div>

    <!--分割线-->
    <div class="divider"></div>
    <!--分割线end-->

    <!--热门搜索 这个功能待定，我再想想ES怎么弄-->
    <MySearchResult v-if="showResult"></MySearchResult>
      <div class="searchContent" v-if="!showResult">
        <p><strong>热门搜索</strong></p>
        <div class="inline-block van-ellipsis"><span>1 apex</span></div>
        <div class="inline-block van-ellipsis"><span>2 epic</span></div>
        <p><Strong>热议中</Strong></p>
        <div class="inline-block van-ellipsis"><span>1 #盒友杂谈# </span></div>
        <div class="inline-block van-ellipsis"><span>2 #再见2020# </span></div>
      </div>
    <!--热门搜索 end-->


  </div>
</template>

<script>
import MySearchResult from "@/views/mainBody/search/MySearchResult";
export default {
  name: "MySearch",
  components: {MySearchResult},
  data() {
    return {
      //搜索内容
      searchContent: "",
      //是否显示结果页
      showResult: false
    }
  },
  methods: {
    //获取当前搜索内容，然后调用搜索接口，先跳到搜索结果页，再渲染数据
    toSearchPage() {
      if (this.searchContent === "") return 0;
      this.showResult = !this.showResult;
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