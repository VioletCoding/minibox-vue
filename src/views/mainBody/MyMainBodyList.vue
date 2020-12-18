<!--主显示区域-->
<template>
  <div>
    <!--引入vant的无限加载组件-->
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
    <!--发布帖子按钮-->
    <van-button round type="primary" icon="plus" size="normal" color="black" @click="showPop"
                style="position: fixed;top: 300px;right: 0"/>
    <!--弹出层内容-->
    <div>
      <van-popup v-model="popPostBackground" position="bottom" :style="{ height: '100%'}" safe-area-inset-bottom>
        <!--导航栏-->
        <van-nav-bar
            title="帖子"
            left-text="返回"
            right-text="发送"
            @click-left="onClickLeft"
            @click-right="onClickRight"/>
        <!--选择社区和标题-->
        <van-cell-group>
          <van-cell>
            <van-button type="default" icon="plus" size="small">添加社区</van-button>
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
    </div>
    <!--弹出层内容-->
  </div>
</template>

<script>
import SinglePost from "../inPost/SinglePost";
import Api from "@/api/api";
import axios from "axios";

export default {
  name: "MyMainBodyList",
  components: {SinglePost},
  props: {
    //数据集合
    dataList: {
      type: Array,
      required: true
    }
  },
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
      coverImage: ''
    }
  },
  methods: {
    async onLoad() {
      // 异步更新数据
      // 如果请求失败，this.error = true;
      if (this.refreshing) {
        this.dataList = [];
        this.refreshing = false;
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
      axios.post(Api.publishPost, {
        //TODO
        //用户ID，暂时这么写，以后后台是从token里面取的，就不用传这个了
        uid: 10032,
        //版块ID，暂时这么写，应该是选择那些版块自动获取的
        bid: 10002,
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
          this.onLoad();
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
      //遍历缓存的图片信息，把图片流加入到formdata里
      //this.img_file.forEach(formData => {

      multipartFiles.append('multipartFiles', $file);

      //});
      //发送请求，注意headers
      axios({
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
        console.log(err);
        this.$toast.fail('图片上传失败');
      })
    },
    $imgDel(pos) {
      //TODO
      delete this.img_file[pos];
    },
  }
}
</script>

<style scoped lang="less">
.router-link-active {
  color: red;
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