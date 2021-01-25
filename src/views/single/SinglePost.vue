<template>

  <div class="myContainer" v-if="dataFlag">
    <!--顶部-->
    <div class="top">
      <van-nav-bar safe-area-inset-top fixed>
        <template #left>
          <van-icon name="arrow-left" color="black" @click="back"/>
        </template>
        <template #right>
          <van-icon name="ellipsis" color="black"/>
        </template>
        <template #title>
          <span>正文</span>
        </template>
      </van-nav-bar>
    </div>
    <!--顶部end-->
    <div class="headPhoto">
      <van-image :src="returnValue.coverImg" fit="cover" height="200" width="100%"/>
    </div>

    <!-- 标题 最多显示三行 -->
    <div class="title van-multi-ellipsis--l3">
      <van-cell :value="returnValue.title" style="font-size: 22px" size="large"/>
    </div>
    <!--作者信息-->
    <div style="padding: 20px">

      <div style="float: left;width: 30%">
        <van-image round width="50" height="50" fit="cover" :src="returnValue.mbUser.userImg"/>
      </div>

      <div style="float: right;width: 70%;margin:20px 0 5px 0">
        <span>{{ returnValue.mbUser.nickname }}</span>
        <span style="margin-left: 10px;">
          <van-tag color="#7232dd">{{ 'Lv ' + returnValue.mbUser.level }}</van-tag>
        </span>
      </div>

      <p style="font-size: 10px;color: #808080">
        {{ returnValue.createDate }}
      </p>
    </div>
    <!--正文 MarkDown渲染，包括图片的链接，必须符合MarkDown的语法才能被正确渲染-->
    <mavon-editor :toolbarsFlag="markDownConfig.toolbarsFlag"
                  :scrollStyle="markDownConfig.scrollStyle"
                  :subfield="markDownConfig.subfield"
                  :placeholder="markDownConfig.placeholder"
                  :value="value"
                  :editable="markDownConfig.editable"
                  :boxShadow="markDownConfig.boxShadow"
                  :ishljs="markDownConfig.ishljs"
                  :shortCut="markDownConfig.shortCut"
                  :defaultOpen="markDownConfig.defaultOpen" style="z-index: -1"/>

    <div style="font-size: 14px;padding: 10px;font-weight: bold">
      <div v-if="returnValue.commentList.length > 0">
        <p style="text-align: center">全部评论</p>
        <van-divider/>
      </div>
      <span v-else>
        <van-empty description="这里还没有评论呢"/>
      </span>
    </div>
    <!--评论-->
    <div v-if="returnValue.commentList.length > 0"
         class="commentArea"
         v-for="(item,index) in returnValue.commentList">

      <van-skeleton title
                    avatar
                    :row="3"
                    :loading="loading">
        <van-card
            :price="item.content" :desc="item.createDate"
            :title="item.mbUser.nickname" :tag="'LV '+item.mbUser.level"
            :thumb="item.mbUser.userImg"
            centered
            currency=""
            @click="reply(item.mbUser.nickname,item.mbUser.id,item.id)">
        </van-card>
        <!--回复-->
        <div class="replyArea">
          <van-collapse v-model="activeName">
            <van-collapse-item v-if="item.replyList.length > 0"
                               title="查看回复"
                               :name="index">
              <div v-for="(reply1,replyIndex) in item.replyList"
                   :key="replyIndex"
                   @click="reply(reply1.mbUser.nickname,reply1.mbUser.id,item.id)">
                <div>
                  <span style="color: deepskyblue">{{ reply1.mbUser.nickname }}</span>
                  <strong>&nbsp;回复&nbsp;</strong>
                  {{ item.mbUser.nickname }}
                  <strong>&nbsp;</strong>
                  <span style="color: black">{{ reply1.replyContent }}</span>
                  <div>
                    <small>&nbsp;{{ reply1.replyDate }}</small>
                  </div>
                </div>
                <van-divider/>
              </div>

            </van-collapse-item>
          </van-collapse>
        </div>
        <!--回复 end-->
      </van-skeleton>
    </div>
    <!--评论end-->
    <!--评论框-->
    <div class="commentField">
      <van-tabbar v-model="active">
        <van-field v-model="commentValue"
                   center
                   clearable
                   placeholder="说点什么吧">
          <template #button>
            <van-button size="small"
                        type="primary"
                        @click="publishComment">发表
            </van-button>
          </template>
        </van-field>
      </van-tabbar>
    </div>
    <!--评论框end-->

    <!--回复框-->
    <div>
      <van-popup v-model="showReplyPop"
                 position="bottom"
                 :style="{width:'100%',height:'35%'}">
        <van-field v-model="replyMessage"
                   rows="2"
                   type="textarea"
                   maxlength="300"
                   :placeholder="'回复 '+replyWho"
                   show-word-limit>
          <template #button>
            <van-button size="small"
                        type="primary"
                        @click="doReply">回复
            </van-button>
          </template>
        </van-field>
      </van-popup>
    </div>
    <!--回复框end-->
  </div>
</template>

<script>
import marked from 'marked';
import Api from "@/api/api";
import utils from "@/api/utils";

export default {
  name: "SinglePost",
  props: {
    postData: {
      type: Object,
      require: true
    }
  },
  data() {
    return {
      //MarkDown
      markDownConfig: {
        //是否开启工具栏
        toolbarsFlag: false,
        //滚轮模式（只支持Chrome）
        scrollStyle: false,
        //true： 双栏(编辑预览同屏)， false： 单栏(编辑预览分屏)
        subfield: false,
        //内容为空时的提示内容
        placeholder: '输入内容...',
        //是否允许编辑
        editable: false,
        //边框阴影
        boxShadow: false,
        //代码高亮
        ishljs: true,
        //快捷键
        shortCut: false,
        defaultOpen: 'preview'
      },
      //MD中的正文
      value: '',
      //是否正在加载
      loading: true,
      //是否已加载完成
      finished: false,
      //错误信息
      error: '',
      //帖子ID，通过上一页（首页列表）传入，通过此ID查找对应的帖子
      id: this.$route.query.id,
      //请求的返回值
      returnValue: {},
      //数据是否加载完
      dataFlag: false,
      //标签激活的下标
      active: 0,
      //手风琴
      activeName: [],
      //评论框输入的内容
      commentValue: '',
      //显示回复框
      showReplyPop: false,
      //回复内容
      replyMessage: "",
      //回复人nickname
      replyWho: "",
      //要回复的人的uid
      replyUid: 0,
      //评论cid
      commentCid: 0
    }
  },
  methods: {
    //加载
    onLoad() {
      this.$http.get(Api.getPostDetail, {
        params: {id: this.id}
      }).then(res => {
        this.returnValue = res.data.data;
        this.value = this.returnValue.content;
        this.dataFlag = true;
        this.loading = false;
      }).catch(err => this.$toast.fail(utils.errMessage(err)));
    },
    //返回上一个路由
    back() {
      this.$router.go(-1);
    },
    //发表评论
    async publishComment() {
      await this.$http.post(Api.publishComment, {
        tid: this.id,
        uid: localStorage.getItem("userId"),
        content: this.commentValue,
        type: 'TC'
      }).then(res => {
        if (res.data.code == 200)
          this.$toast.success(res.data.message);
        this.commentValue = '';
        this.onLoad();
      }).catch(err => this.$toast.fail(utils.errMessage(err)));
    },
    //回复弹出框
    reply(nickname, uid, cid) {
      this.showReplyPop = true;
      this.replyWho = nickname;
      this.replyUid = uid;
      this.commentCid = cid;
    },
    //发表回复
    doReply() {
      if (this.replyMessage.length < 10) {
        this.$toast.fail("内容最少10个字哦~");
      } else {
        this.$http.post(Api.publishReply, {
          type: "TR",
          replyWho: this.replyUid,
          replyInPost: Number(this.id),
          replyContent: this.replyMessage,
          replyInComment: this.commentCid,
          replyUid: this.replyUid
        }).then(resp => {
          if (resp.data.code == 200) {
            this.showReplyPop = false;
            this.replyMessage = "";
            this.$toast.success(resp.data.message);
            this.onLoad();
          }
        }).catch(err => utils.errMessage(err));
      }
    }
  },
  mounted() {
    //页面初始化，使用加载方法
    this.dataFlag = false;
    this.onLoad();
  }
}
</script>

<style scoped lang="less">

.myContainer {

  .top {
    height: 50px;
    width: 100%;
  }

  .title {
    font-size: 20px;
    font-weight: bold;
    font-family: Menlo, "Ubuntu Mono", Consolas, "Courier New", "Microsoft Yahei", "Hiragino Sans GB", "WenQuanYi Micro Hei", sans-serif;
  }

  .mainContent {
    width: 100%;
  }

  .commentField {
    height: 50px;
  }
}
</style>