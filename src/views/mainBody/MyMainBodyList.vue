<!--主显示区域-->
<template>
    <div>
        <!--引入vant的无限加载组件-->
        <van-list v-model="loading" :finished="finished" finished-text="暂时没有更多了喵" @load="onLoad" :error.sync="error"
                  error-text="加载失败，点击重试">
            <div class="myContainer" v-for="(item,index) in dataList" :key="index">
                <div class="mySingleGrid van-hairline--bottom">
                    <div class="leftContain">
                        <!-- 最多显示两行 -->
                        <div class="myTitle van-multi-ellipsis--l2">
                            {{ item.title }}
                        </div>
                        <!-- 最多显示一行 -->
                        <div class="myTime van-ellipsis">
                            {{ item.createDate }}
                        </div>
                        <div class="myBlock van-ellipsis">
                            {{ item.mbBlock.name }}
                        </div>
                        <div class="myComment van-ellipsis">
                            <van-icon name="comment-o"/>
                            0
                            <!--                            {{ item.commentCount }}-->
                        </div>
                    </div>
                    <div class="rightContain">
                        <van-image width="100%" height="100%" fit="scale-down" :src="item.headPhotoLink"/>
                    </div>
                </div>
            </div>
        </van-list>
    </div>
</template>

<script>

    export default {
        name: "MyMainBodyList",
        props: {
            //数据集合
            dataList: {
                type: Array,
                required: true
            }
        },
        data() {
            return {
                //用于接收dataList
                list: [],
                //是否正在加载
                loading: false,
                error: false,
                //是否已加载结束
                finished: false
            }
        },
        methods: {
            onLoad() {
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
            }
        },
        mounted() {

        }
    }
</script>

<style scoped lang="less">

    .myContainer {
        margin-top: 5px;
        width: 100%;
        height: 100%;

        .mySingleGrid {
            width: 100%;
            height: 70px;
            padding: 2%;

            .leftContain {
                width: 65%;
                display: inline-block;

                .myTitle {
                    width: 100%;
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
                    font-size: 10px;
                    float: right;
                    margin-right: 5px;
                    margin-top: 5px;
                    color: #D4D7DB;
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