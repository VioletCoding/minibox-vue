<!--轮播图组件-->
<template>
    <div class="myCarousel">
        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
            <van-swipe-item v-for="(item,index) in imgList" :key="index">
                <van-image width="100%" height="100%" fit="scale-down" :src="item.headPhotoLink"/>
            </van-swipe-item>
        </van-swipe>
    </div>
</template>

<script>
    export default {
        name: "MyCarousel",
        props: {
            //图片列表信息
            imgList: {
                type: Array,
                default() {
                    return []
                }
            }
        },
        data() {
            return {}
        }
    }
</script>

<style scoped lang="less">
    .myCarousel {
        height: 100%;
        width: 100%;
        background-color: #666666;
        z-index: -1;
    }
</style>