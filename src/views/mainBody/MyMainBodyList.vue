<!--主显示区域-->
<template>
  <div>
    <!--头部-->
    <MyHeader>
      <template #left>
        <van-tabs v-model="active" swipeable animated color="black" line-width="20">
          <van-tab title="推荐"/>
        </van-tabs>
      </template>
      <template #right>
        <van-icon name="add-o" size="18" color="black" style="margin-right: 20px" @click="showPop"/>
        <van-icon name="search" size="18" color="black" style="margin-right: 20px"/>
        <van-icon name="envelop-o" size="18" color="black"/>
      </template>
    </MyHeader>
    <!--头部end-->

    <!--轮播图-->
    <div>
      <van-pull-refresh v-model="loading" @refresh="onLoad" success-text="刷新成功">
        <div style="margin-top: 50px">
          <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
            <van-swipe-item v-for="(item,index) in imgList" :key="index" v-if="index < 5">
              <p class="swipe-text van-multi-ellipsis--l2">{{ item.title }}</p>
              <van-image lazy-render=true width="100%" height="200" fit="cover" :src="item.coverImg"
                         @click="toDetail(item)"/>
            </van-swipe-item>
          </van-swipe>
        </div>
        <!--轮播图-->

        <!--帖子列表-->
        <van-list v-model="loading" :finished="finished" finished-text="暂时没有更多了喵" @load="onLoad" :error.sync="error"
                  error-text="加载失败，点击重试">
          <div class="myContainer" v-for="(item,index) in dataList" :key="index">
            <!--路由跳转方法，点击帖子跳转到帖子详情-->
            <div @click="toDetail(item)">
              <div class="mySingleGrid van-hairline--bottom">
                <div class="leftContain">
                  <!-- 帖子标题 最多显示两行 -->
                  <div class="myTitle van-multi-ellipsis--l2">
                    {{ item.title }}
                  </div>
                  <!-- 帖子发表时间 最多显示一行 -->
                  <div class="myTime van-ellipsis">
                    {{ item.createDate }}
                  </div>
                  <!--版块名称 最多显示一行-->
                  <div class="myBlock van-ellipsis">
                    {{ item.mbBlock.name }}
                  </div>
                  <!--评论数-->
                  <div class="myComment">
                    <van-icon name="chat-o" :badge="item.countComment" color="#808080"/>
                  </div>
                </div>
                <!--帖子封面图-->
                <div class="rightContain">
                  <van-image width="100%" height="100%" fit="fill" :src="item.coverImg"/>
                </div>
              </div>
            </div>
          </div>
        </van-list>
      </van-pull-refresh>
    </div>
    <!--帖子列表-->

    <!--弹出层内容-->
    <div>
      <van-popup v-model="popPostBackground" position="bottom" :style="{ height: '100%'}" safe-area-inset-bottom>
        <!--导航栏-->
        <van-nav-bar
            title="帖子" left-text="返回" right-text="发送"
            @click-left="onClickLeft" @click-right="onClickRight"/>
        <!--选择社区和标题-->
        <van-cell-group>
          <van-cell>
            <van-button type="default" icon="plus" size="small" @click="showBlock" style="margin-right: 10px">
              <span>添加社区</span>
            </van-button>
            <!--选中的社区-->
            <van-button type="default" color="linear-gradient(to right, #ff6034, #ee0a24)"
                        size="small" @click="showBlock" v-if="radio!=''">
              {{ blockName }}
            </van-button>
          </van-cell>
          <van-cell>
            <van-field v-model="popTitle" placeholder="标题" required/>
          </van-cell>
          <!--MarkDown编辑区-->
          <van-cell>
            <mavon-editor :toolbarsFlag="markDownConfig.toolbarsFlag"
                          :scrollStyle="markDownConfig.scrollStyle"
                          :subfield="markDownConfig.subfield"
                          :placeholder="markDownConfig.placeholder"
                          v-model="value"
                          :editable="markDownConfig.editable"
                          :boxShadow="markDownConfig.boxShadow"
                          :ishljs="markDownConfig.ishljs"
                          :shortCut="markDownConfig.shortCut"
                          :defaultOpen="markDownConfig.defaultOpen"
                          :toolbars="toolbars"
                          :autofocus="markDownConfig.autofocus"
                          ref=md @imgAdd="$imgAdd" @imgDel="$imgDel"/>
          </van-cell>
        </van-cell-group>
      </van-popup>

      <!--展示版块（社区）的弹出层-->
      <van-popup v-model="showBlockPop" position="bottom" :style="{height: '100%'}" safe-area-inset-bottom>
        <!--导航栏-->
        <van-nav-bar title="请选择社区" left-arrow @click-left="close"/>
        <!--搜索框-->
        <van-search v-model="search" placeholder="输入搜索内容"/>
        <van-cell title="推荐" style="margin-bottom: 10px;font-weight: bold"/>
        <!--版块信息-->
        <van-grid :column-num="2" direction="horizontal" clickable>
          <van-grid-item v-for="(item,index) in blockList" :key="index" @click="label(item.bid,item.name)">
            <div style="width: 160px">
              <div class="inline-block"
                   style="height: 100%;width: 30px">
                <van-image width="30" height="30" src="https://img.yzcdn.cn/vant/cat.jpeg"/>
              </div>

              <div class="inline-block van-ellipsis"
                   style="font-size: 12px;vertical-align: top;padding-top: 10px;margin-left: 10px">
                {{ item.name }}
              </div>
              <div class="inline-block" style="float: right;margin-top: 10px">
                <van-radio-group v-model="radio">
                  <van-radio :name="item.bid"/>
                </van-radio-group>
              </div>
            </div>
          </van-grid-item>
        </van-grid>

      </van-popup>
      <!--展示版块（社区）的弹出层-->
    </div>
    <!--弹出层内容-->
  </div>
</template>

<script>
import SinglePost from "../single/SinglePost";
import MyHeader from "@/views/header/MyHeader";
import Api from "@/api/api";

export default {
  name: "MyMainBodyList",
  components: {SinglePost, MyHeader},
  data() {
    return {
      //MarkDown
      markDownConfig: {
        //是否开启工具栏
        toolbarsFlag: true,
        //true： 双栏(编辑预览同屏)， false： 单栏(编辑预览分屏)
        subfield: false,
        //内容为空时的提示内容
        placeholder: '发帖时注意选择相应的内容分类哦！',
        //是否允许编辑
        editable: true,
        //边框阴影
        boxShadow: true,
        //代码高亮
        ishljs: true,
        //快捷键
        shortCut: false,
        //默认展开 edit:编辑 preview:渲染
        defaultOpen: 'edit',
        //自动对焦到编辑区
        autofocus: false
      },
      //MarkDown编辑器的工具栏
      toolbars: {
        bold: true, // 粗体
        italic: true, // 斜体
        underline: true, // 下划线
        strikethrough: true, // 中划线
        mark: true, // 标记
        ol: true, // 有序列表
        ul: true, // 无序列表
        imagelink: true, // 图片链接
        code: true, // code
        alignleft: true, // 左对齐
        aligncenter: true, // 居中
        alignright: true, // 右对齐
        preview: true, // 预览
        trash: true, // 清空
      },
      //MD中的图片文件
      img_file: {},
      //MD中的正文
      value: '',
      //用于接收dataList
      list: [],
      //是否正在加载
      loading: false,
      //错误信息
      error: false,
      //是否已加载结束
      finished: false,
      //弹出层
      popPostBackground: false,
      //弹出层-标题
      popTitle: '',
      //封面图
      coverImage: '',
      //轮播图
      imgList: [],
      //激活的tab
      active: 0,
      //帖子列表
      dataList: [],
      //展示版块（社区）的弹出层
      showBlockPop: false,
      //版块列表
      blockList: [],
      //单选框
      radio: "",
      //选中的社区名字
      blockName: "",
      //搜索内容
      search: ""
    }
  },
  methods: {
    async onLoad() {
      // 异步更新数据
      // 如果请求失败，this.error = true;
      if (this.loading) {
        this.dataList = [];
        //调用帖子方法
        this.getPostList();
      }
      // 加载状态结束
      this.loading = false;
      //将获取到的dataList传给list存放
      this.list = this.dataList;
      // 数据全部加载完成
      if (this.list.length >= this.dataList.length) {
        this.finished = true;
      }
      //超时时间
    },
    //去帖子详情
    toDetail(value) {
      this.$router.push({
        path: '/postDetail',
        query: {
          tid: value.tid
        },
      })
    },
    //显示弹出层
    showPop() {
      this.popPostBackground = true;
      this.$emit('disabledPullRefresh', true);
    },
    //弹出层-返回
    onClickLeft() {
      if (this.popPostBackground) {
        this.popPostBackground = false;
        this.$emit('disabledPullRefresh', false);
      }
    },
    //弹出层-发送
    onClickRight() {
      if (this.radio == "" || this.radio == null || this.radio == undefined) {
        this.$toast.fail("请选择社区哦~");
        return;
      }
      this.$http.post(Api.publishPost, {
        //TODO
        //用户ID，暂时这么写，以后后台是从token里面取的，就不用传这个了
        uid: 10000,
        //版块ID
        bid: this.radio,
        //图片ID，由后端返回用于回显，但是要再次传给后台的另一个接口用于插入数据
        mbPhoto: {
          pid: this.pid,
        },
        //帖子标题
        title: this.popTitle,
        //帖子正文内容，是MD格式，图片的链接也包含在里面了，故上传图片接口无需再传tid字段
        content: this.value,
        //封面图链接，由后端返回用于回显，但是要再次传给后台的另一个接口用于插入数据
        coverImg: this.coverImage
      }).then(res => {
        if (res.data.code == 200) {
          console.log("发布帖子res=>", res);
          this.$toast.success("发布成功");
          this.popPostBackground = false;
          this.value = '';
          this.img_file = {};
          this.radio = "";
          this.blockName = "";
          //调用帖子方法
          this.getPostList();
        } else {
          this.$toast.fail(res.data.message);
        }
      }).catch(err => {
        console.log(err);
        this.$toast.fail("发布失败");
      })
    },
    // 绑定@imgAdd event
    //pos 编辑区内容，$file 文件
    $imgAdd(pos, $file) {
      // 缓存图片信息
      this.img_file[pos] = $file;
      //new 一个formdata用来存储文件
      var multipartFiles = new FormData();
      //把文件加入到formdata里
      multipartFiles.append('multipartFiles', $file);
      //发送请求，注意headers
      this.$http({
        url: Api.uploadImg,
        method: 'post',
        data: multipartFiles,
        headers: {'Content-Type': 'multipart/form-data'}
      }).then(res => {
        let link = res.data.data;
        //将回调的图片链接替换文本编辑器原来的链接
        this.$refs.md.$img2Url(pos, link.photoImg);
        this.coverImage = link.photoImg;
        this.pid = link.photoId;
      }).catch(err => {
        this.$toast.fail('图片上传失败', err);
      })
    },
    //MD里删除图片
    $imgDel(pos) {
      //TODO
      delete this.img_file[pos];
    },
    //获取帖子列表
    async getPostList() {
      await this.$http.get(Api.getPostList).then(res => {
        this.dataList = res.data.data;
        this.imgList = res.data.data;
        this.code = res.data.code;
      }).catch(err => {
        this.$toast.fail('加载失败,请重试');
      });
    },
    //展示帖子详情
    showPostDetail(tid) {
      this.$http.get(Api.getPostDetail, {
        tid: tid
      }).then(res => {
        console.log("展示帖子详情=>", res);
      }).catch(err => {
        console.log("展示帖子详情err=>", err);
      })
    },
    //在发表帖子的时候显示社区（版块）弹出层
    showBlock() {
      if (this.popPostBackground) {
        this.showBlockPop = true;
        this.$http.get(Api.getBlockList)
            .then(res => {
              console.log("获取版块信息的回调=>", res);
              this.blockList = res.data.data;
            }).catch(err => {
          console.log("获取版块信息的回调错误=>", err);
        })
      }
    },
    //在发表帖子的时候显示社区（版块）弹出层-关闭
    close() {
      if (this.showBlockPop) {
        this.showBlockPop = false;
      }
    },
    //点击宫格也能选中单选框
    label(bid, name) {
      this.radio = bid;
      this.blockName = name;
    }
  },
  mounted() {
    this.getPostList();
  }
}
</script>

<style scoped lang="less">
.inline-block {
  display: inline-block;
}

.block {
  display: block;
}


.swipe-text {
  color: white;
  bottom: 10px;
  position: absolute;
  left: 30%;
  z-index: 10;
  font-size: 18px;
}

.myContainer {
  margin-top: 5px;
  width: 100%;
  height: 100%;
  display: inline-block;

  .mySingleGrid {
    width: 100%;
    height: 70px;
    padding: 2%;
    cursor: pointer;

    .leftContain {
      width: 65%;
      display: inline-block;

      .myTitle {
        width: 100%;
        text-decoration: none;
      }

      .myTime {
        margin-top: 10px;
        margin-right: 5px;
        display: inline-block;
        font-size: 10px;
        color: #D4D7DB;
      }

      .myBlock {
        display: inline-block;
        font-size: 10px;
        color: #D4D7DB;
      }

      .myComment {
        display: inline-block;
        float: right;
        margin-right: 5px;
        margin-top: 5px;
      }
    }

    .rightContain {
      width: 33%;
      height: 70px;
      float: right;
      display: inline-block;
      z-index: 10;
    }
  }
}
</style>