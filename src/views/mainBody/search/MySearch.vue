<!--搜索页面-->
<template>
  <div>
    <!--返回按钮 & 搜索框 -->
    <div>
      <van-search v-model="searchContent"
                  placeholder="输入搜索内容"
                  @search="getSearchResult">
        <template #left>
          <van-icon name="arrow-left"
                    size="25"
                    @click="back"/>
        </template>
      </van-search>
    </div>
    <div class="divider"></div>
    <MySearchResult v-if="showResult"
                    :returnData="returnData"/>
  </div>
</template>

<script>
import MySearchResult from "@/views/mainBody/search/MySearchResult";
import Api from "@/api/api";
import utils from "@/api/utils";

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
    //获取搜索结果
    getSearchResult() {
      let check = utils.isBlank(this.searchContent);
      if (check) {
        this.$toast.fail("请输入搜索内容");
        return 0;
      }
      this.$http.get(Api.search, {params: {keyword: this.searchContent}}
      ).then(resp => {
        this.returnData = resp.data.data;
        this.showResult = true;
      }).catch(err => this.$toast.fail(utils.errMessage(err)));
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