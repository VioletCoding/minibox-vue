<!--主显示区域-->
<template>
  <div>
    <!--头部-->
    <MyHeader>
      <template #left>
        <span style="border-bottom: 1px solid black">推荐</span>
      </template>
      <template #right>
        <van-icon name="add-o"
                  size="18"
                  color="black"
                  style="margin-right: 20px"
                  @click="showPop"/>
        <van-icon name="search"
                  size="18"
                  color="black"
                  @click="showSearch=true"/>
      </template>
    </MyHeader>
    <!--搜索框弹出层-->
    <van-popup v-model="showSearch"
               position="right"
               :style="{ height: '100%',width:'100%' }">
      <MySearch @back="listenMySearch"></MySearch>
    </van-popup>
    <!--搜索框弹出层end-->
    <!--头部end-->

    <!--轮播图-->
    <div>
      <van-pull-refresh v-model="loading"
                        @refresh="onLoad"
                        success-text="刷新成功">
        <div style="margin-top: 50px">
          <van-swipe :autoplay="3000"
                     indicator-color="white">
            <van-swipe-item v-for="(item,index) in dataList"
                            :key="index"
                            v-if="index < 5">
              <div class="swipe-image van-multi-ellipsis--l2">
                <van-image lazy-render=true
                           fit="cover"
                           :src="item.photoLink"
                           @click="toDetail(item.id)"/>
                <p>{{ item.title }}</p>
              </div>
            </van-swipe-item>
          </van-swipe>
        </div>
        <!--轮播图-->
        <!--帖子列表-->
        <van-list v-model="loading"
                  :finished="finished"
                  finished-text="暂时没有更多了喵"
                  @load="onLoad"
                  :error.sync="error"
                  error-text="加载失败">
          <div v-for="(item,index) in dataList"
               :key="index">
            <!--路由跳转方法，点击帖子跳转到帖子详情-->
            <div @click="toDetail(item.id)"
                 class="main-container">
              <div class="left-text">
                <!-- 帖子标题 最多显示两行 -->
                <div class="van-multi-ellipsis--l2">
                  {{ item.title }}
                </div>
                <!-- 帖子发表时间 最多显示一行 -->
                <span class="van-ellipsis">
                  {{ item.createDate }}
                </span>
                <!--版块名称 最多显示一行-->
                <span class="van-ellipsis">
                  {{ item.blockName }}
                </span>
              </div>
              <!--帖子封面图-->
              <div class="right-image">
                <van-image fit="cover"
                           radius="2"
                           height="70"
                           :src="item.photoLink"/>
              </div>
            </div>
          </div>
        </van-list>
      </van-pull-refresh>
    </div>
    <!--帖子列表-->

    <!--弹出层内容-->
    <div>
      <van-popup v-model="popPostBackground"
                 position="bottom"
                 :style="{ height: '100%'}"
                 safe-area-inset-bottom>
        <!--导航栏-->
        <van-nav-bar
            title="发布帖子"
            left-text="返回"
            right-text="发送"
            @click-left="onClickLeft"
            @click-right="onClickRight"/>
        <!--选择社区和标题-->
        <van-cell-group>
          <van-cell>
            <van-button type="default"
                        icon="plus"
                        size="small"
                        @click="showBlock"
                        style="margin-right: 10px">
              <span style="color: #969799">添加社区</span>
            </van-button>
            <!--选中的社区-->
            <van-button v-if="radio!='' "
                        type="default"
                        size="small"
                        @click="showBlock">
              {{ blockName }}
            </van-button>
          </van-cell>
          <van-cell>
            <van-field v-model="popTitle"
                       placeholder="标题"
                       ref="title"/>
          </van-cell>
          <!--MarkDown编辑区-->
          <div style="height: 100%">
            <mavon-editor :toolbarsFlag="markDownConfig.toolbarsFlag"
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
                          ref=md
                          @imgAdd="$imgAdd"
                          @imgDel="$imgDel"
                          style="min-height: 80vh"/>
          </div>
        </van-cell-group>
      </van-popup>

      <!--展示版块（社区）的弹出层-->
      <van-popup v-model="showBlockPop"
                 position="bottom"
                 :style="{height: '100%'}"
                 safe-area-inset-bottom>
        <!--导航栏-->
        <van-nav-bar title="请选择社区"
                     left-arrow
                     @click-left="close"/>
        <!--版块信息-->
        <div style="display: flex;flex-direction: row;padding: 10px;height: 60px"
             v-for="(item,index) in blockList" :key="index"
             @click="label(item.id,item.name)">
          <div style="width: 40%">
            <van-image width="100"
                       height="60"
                       fit="cover"
                       radius="5"
                       :src="item.photoLink"/>
          </div>
          <div style="width: 40%;line-height: 60px;font-size: 14px;font-weight: bold;">
            {{ item.name }}
          </div>
          <div style="margin-top: 20px">
            <van-radio-group v-model="radio">
              <van-radio :name="item.id"/>
            </van-radio-group>
          </div>
        </div>
        <div style="padding: 20px"
             @click="showBlockPop=false">
          <van-button color="black"
                      block>完成
          </van-button>
        </div>
      </van-popup>
      <!--展示版块（社区）的弹出层 end-->
    </div>
    <!--弹出层内容-->
  </div>
</template>

<script>
import MyHeader from "@/views/header/MyHeader";
import Api from "@/api/api";
import utils from "@/api/utils";
import MySearch from "@/views/mainBody/search/MySearch";

export default {
  name: "MyMainBodyList",
  components: {MySearch, MyHeader},
  data() {
    return {
      //MarkDown
      markDownConfig: {
        //是否开启工具栏
        toolbarsFlag: true,
        //true： 双栏(编辑预览同屏)， false： 单栏(编辑预览分屏)
        subfield: false,
        //内容为空时的提示内容
        placeholder: '在这里输入内容',
        //是否允许编辑
        editable: true,
        //边框阴影
        boxShadow: false,
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
      blockSearch: "",
      //显示搜索内容
      showSearch: false
    }
  },
  methods: {
    async onLoad() {
      this.loading = true;
      this.dataList = [];
      //调用帖子方法
      this.getPostList();
      // 加载状态结束
      this.loading = false;
      this.finished = true;
    },
    //去帖子详情，参数为帖子的id
    toDetail(id) {
      this.$router.push({
        path: '/postDetail',
        query: {id: id},
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
      if (utils.isNullOrEmptyOrUndefined(this.radio)) {
        this.$toast.fail("请选择社区");
        return 0;
      }
      if (utils.isNullOrEmptyOrUndefined(this.popTitle)) {
        this.$toast.fail("请输入标题");
        this.$refs.title.focus();
        return 0;
      }
      if (utils.isNullOrEmptyOrUndefined(this.value)) {
        this.$toast.fail("请输入正文");
        return 0;
      }
      this.$http.post(Api.publishPost, {
        authorId: localStorage.getItem("userId"),
        blockId: this.radio,
        blockName: this.blockName,
        title: this.popTitle,
        content: this.value,
        photoLink: this.coverImage
      }).then(res => {
        if (res.data.code == 200) {
          this.$toast.success(res.data.message);
          this.popPostBackground = false;
          this.value = '';
          this.img_file = {};
          this.radio = "";
          this.blockName = "";
          this.title = "";
          //调用帖子方法
          this.getPostList();
        } else {
          this.$toast.fail(res.data.message);
        }
      }).catch(err => this.$toast.fail(utils.errMessage(err)));
    },
    // 绑定@imgAdd event
    //pos 编辑区内容，$file 文件
    $imgAdd(pos, $file) {
      // 缓存图片信息
      this.img_file[pos] = $file;
      //new 一个formdata用来存储文件
      let multipartFiles = new FormData();
      //把文件加入到formdata里
      multipartFiles.append('multipartFile', $file);
      //发送请求，注意headers
      this.$http({
        url: Api.uploadImg,
        method: 'post',
        data: multipartFiles,
        headers: {'Content-Type': 'multipart/form-data'}
      }).then(res => {
        let link = [];
        link = res.data.data.images;
        link.forEach(v => {
          //将回调的图片链接替换文本编辑器原来的链接
          this.$refs.md.$img2Url(pos, v);
          this.coverImage = v;
        });
      }).catch(err => this.$toast.fail(utils.errMessage(err)))
    },
    //MD里删除图片
    $imgDel(pos) {
      delete this.img_file[pos];
    },
    //获取帖子列表
    async getPostList() {
      await this.$http.post(Api.getPostList)
          .then(res => {
            console.log("帖子列表回调=>", res);
            this.dataList = res.data.data;
          })
          .catch(err => this.$toast.fail(utils.errMessage(err)));
    },
    //在发表帖子的时候显示社区（版块）弹出层
    showBlock() {
      if (this.popPostBackground) {
        this.showBlockPop = true;
        this.$http.post(Api.getBlockList)
            .then(res => this.blockList = res.data.data)
            .catch(err => this.$toast.fail(utils.errMessage(err)));
      }
    },
    //在发表帖子的时候显示社区（版块）弹出层-关闭
    close() {
      if (this.showBlockPop)
        this.showBlockPop = false;
    },
    //点击宫格也能选中单选框
    label(id, name) {
      this.radio = id;
      this.blockName = name;
    },
    //搜索框监听事件
    listenMySearch(v) {
      this.showSearch = v;
    }
  },
  mounted() {
    this.getPostList();
  }
}
</script>

<style scoped lang="less">

.swipe-image {
  width: 100%;
  height: 200px;

  p {
    width: 100%;
    position: absolute;
    bottom: 15px;
    color: white;
    font-size: 12px;
    text-align: center;
  }
}

.main-container {
  display: flex;
  flex-direction: row;
  padding: 10px;

  .left-text {
    width: 60%;
    height: 100%;

    div:first-child {
      font-size: 13px;
      font-weight: bold;
      margin-bottom: 12px;
    }

    span {
      font-size: 10px;
      color: #969799;
    }
  }

  .right-image {
    width: 40%;
  }
}


</style>