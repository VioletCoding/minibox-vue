<!--发表游戏评论和评分-->
<template>
  <div style="overflow: hidden">
    <!--头部-->
    <MyHeader>
      <template #left>
        <van-icon name="arrow-left" color="black" @click="close"/>
      </template>
      <template #middle>
        <span>添加评价</span>
      </template>
      <template #right>
        <span @click="publish">发表</span>
      </template>
    </MyHeader>
    <!--头部end-->
    <!--标题-->
    <div style="margin-top: 50px">
      <van-cell :title="v.name" value="评分规则"/>
    </div>
    <!--标题end-->
    <!--评分星星-->
    <div>
      <van-rate v-model="v.score" :size="25" color="#ffd21e"
                style="margin-left: 120px"
                void-icon="star" void-color="#eee" @change="showText"/>
    </div>
    <!--评分星星end-->
    <!--解释-->
    <div>
      <p style="text-align: center">{{ text }}</p>
      <p style="text-align: center;font-size: 12px;color: #969799">{{ subText }}</p>
    </div>
    <!--解释end-->
    <!--评论内容-->
    <div>
      <van-field
          v-model="message" :autosize="{maxHeight: 200, minHeight: 70}" type="textarea"
          maxlength="4000" show-word-limit placeholder="写下您的宝贵意见"/>
    </div>
    <!--评论内容end-->
  </div>
</template>

<script>
import MyHeader from "@/views/header/MyHeader";
import Api from "@/api/api";
import { Notify } from "vant";

export default {
  name: "MyGameCommentPublish",
  components: {MyHeader},
  data() {
    return {
      //用户id
      id: localStorage.getItem("userId"),
      //游戏评分下的文字
      text: "",
      //游戏评分下的文字-小字
      subText: "",
      //游戏评论内容
      message: ""
    }
  },
  props: {
    //用于父子传值
    v: {
      //游戏gid
      gid: 0,
      //游戏名
      name: "",
      //评分
      score: 1
    }
  },
  methods: {
    //发表评论
    publish() {
      if (this.message === null || this.message == "") {
        Notify({type: "warning", message: "说点什么吧"});
        return;
      }
      this.$http.post(Api.publishComment, {
        id: localStorage.getItem("userId"),
        gid: this.v.gid,
        content: this.message,
        type: "GC",
        score: this.v.score
      }).then(res => {
        if (res.data.code == 200) {
          //关闭弹出层
          this.message = "";
          this.close();
          Notify({type: "success", message: res.data.message});
        }
      }).catch(err => {
        Notify({type: "danger", message: err.response.data.message});
      }).finally(f => {
        this.close();
      })
    },
    //关闭弹出层
    close() {
      this.$emit("close", false);
    },
    //评分下面的文字
    showText() {
      if (this.v.score === 1) {
        this.text = "不好玩";
        this.subText = "游戏有致命的缺陷，很难找到亮点";
      }
      if (this.v.score === 2) {
        this.text = "非常一般";
        this.subText = "缺点大过优点，游戏内容扔需大幅调整";
      }
      if (this.v.score === 3) {
        this.text = "中规中矩";
        this.subText = "游戏有亮点，同时缺点也很明显";
      }
      if (this.v.score === 4) {
        this.text = "优秀之作";
        this.subText = "虽然有小瑕疵，但游戏整体非常棒";
      }
      if (this.v.score === 5) {
        this.text = "旷世神作";
        this.subText = "游戏无可挑剔，基本没有缺点";
      }
    }
  },
  mounted() {
    if (this.v.score === 1) {
      this.text = "不好玩";
      this.subText = "游戏有致命的缺陷，很难找到亮点";
    }
    if (this.v.score === 2) {
      this.text = "非常一般";
      this.subText = "缺点大过优点，游戏内容扔需大幅调整";
    }
    if (this.v.score === 3) {
      this.text = "中规中矩";
      this.subText = "游戏有亮点，同时缺点也很明显";
    }
    if (this.v.score === 4) {
      this.text = "优秀之作";
      this.subText = "虽然有小瑕疵，但游戏整体非常棒";
    }
    if (this.v.score === 5) {
      this.text = "旷世神作";
      this.subText = "游戏无可挑剔，基本没有缺点";
    }
  }
}
</script>