<template>
    <div class="myContainer">
        <div class="top">
            <!--引入vant布局-->
            <van-row type="flex" justify="start" class="myRow">
                <van-col span="1" offset="1">
                    <van-icon name="arrow-left"/>
                </van-col>
                <van-col span="3" offset="6">正文</van-col>
                <van-col span="3" offset="3">评论</van-col>
                <van-col span="1" offset="3">
                    <van-icon name="share-o"/>
                </van-col>
                <van-col span="1" offset="1">
                    <van-icon name="ellipsis"/>
                </van-col>
            </van-row>
        </div>

        <div class="headPhoto">
            <van-image width="100%" height="200" src="https://img.yzcdn.cn/vant/cat.jpeg" fit="fill"/>
        </div>

        <!-- 最多显示三行 -->
        <div class="title van-multi-ellipsis--l3">
                这是一段最多显示三行的文字，多余的内容会被省略这是一段最多显示三行的文字，多余的内容会被省略这是一段最多显示三行的文字，多余的内容会被省略这是一段最多显示三行的文字，多余的内容会被省略这是一段最多显示三行的文字，多余的内容会被省略
        </div>

        <div class="authorInfo">
            <div class="authorImg">
                <van-image round width="60" height="60" src="https://img.yzcdn.cn/vant/cat.jpeg"/>
            </div>

            <div class="authorNickName van-ellipsis">
                <!-- 最多显示一行 -->
                <span>EdNovas</span>
            </div>

            <div class="isFollow">
                <van-button icon="plus" type="info" text="关注" size="small"/>
            </div>
        </div>

        <!--MarkDown渲染-->
        <div class="mainText">
            <mavon-editor :toolbarsFlag="markDownConfig.toolbarsFlag"
                          :scrollStyle="markDownConfig.scrollStyle"
                          :subfield="markDownConfig.subfield"
                          :placeholder="markDownConfig.placeholder"
                          :value="value"
                          :editable="markDownConfig.editable"
                          :boxShadow="markDownConfig.boxShadow"
                          :ishljs="markDownConfig.ishljs"
                          :shortCut="markDownConfig.shortCut"
                          :defaultOpen="markDownConfig.defaultOpen"/>
        </div>

        <!--评论区域-->
        <div class="commentArea">
            <!--评论输入框-->
            <div class="publishComment">
                <van-tabbar>
                    <van-field placeholder="评论" center clearable v-model="sms">
                        <template #button>
                            <van-button plain size="mini" type="primary" icon="good-job-o"></van-button>
                            <van-button plain size="mini" type="primary" icon="comment-o"></van-button>
                        </template>
                    </van-field>
                </van-tabbar>
            </div>
            <!--引入vant的无限加载组件-->
            <van-list>
                <div class="showComments">

                </div>
            </van-list>

        </div>


    </div>
</template>

<script>
    import marked from 'marked'

    export default {
        name: "SinglePost",
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
                value: `### 这是一段MarkDown文本`,
                sms: '',
                loading: false,
                finished: false,
                error: ''
            }
        },
        methods: {
            onLoad() {
                console.log('调用了onload')
            }
        }
    }
</script>

<style scoped lang="less">
    .myContainer {

        .top {
            height: 50px;
            width: 100%;
            line-height: 55px;
            background-color: white;
        }

        .headPhoto {

        }

        .title {
            font-size: 20px;
            font-weight: bold;
            font-family: Menlo, "Ubuntu Mono", Consolas, "Courier New", "Microsoft Yahei", "Hiragino Sans GB", "WenQuanYi Micro Hei", sans-serif;
        }

        .authorInfo {
            width: 100%;
            height: 70px;
            display: inline-block;

            .authorImg {
                width: 17%;
                height: 90%;
                padding-left: 5px;
                display: inline-block;
            }

            .authorNickName {
                height: 100%;
                width: 20%;
                line-height: 70px;
                font-size: 20px;
                font-weight: bold;
                display: inline-block;
            }

            .isFollow {
                width: 18%;
                height: 72%;
                float: right;
                display: inline-block;
                padding-top: 20px;
            }
        }

        .mainText {
            width: 100%;
            height: auto;
        }

        .commentArea {
            .showComments {
                height: auto;
            }
        }
    }
</style>