<template>
  <div>
    <!--用户信息-->
    <div class="user">
      <!--用户头像-->
      <div class="user-left inline-block">
        <slot name="photo">
          <van-image round
                     fit="cover"
                     width="80"
                     height="80"
                     :src="userInfo.photoLink"
                     @click="show(userInfo.photoLink)"/>
        </slot>
      </div>

      <!--用户昵称和签名-->
      <div class="user-right inline-block">
        <slot name="nickname">
          <div class="user-right-nickname">{{ userInfo.nickname }}</div>
        </slot>
        <slot name="desc">
          <div class="user-right-desc">{{ userInfo.description }}</div>
        </slot>
      </div>
      <!--用户昵称和签名end-->
    </div>
    <!--用户信息end-->
  </div>
</template>

<script>
import { ImagePreview } from "vant";

export default {
  name: "MyUserInfo",
  props: {
    userInfo: Object
  },
  methods: {
    //图片预览
    show(v) {
      ImagePreview({images: [v], showIndex: false});
    }
  }
}
</script>

<style scoped lang="less">
.inline-block {
  display: inline-block;
}

.user {
  margin-top: 10px;
  height: 100px;

  .user-left {
    padding: 10px;
  }

  .user-right {
    vertical-align: top;
    padding: 10px;
    margin-top: 19px;

    .user-right-nickname {
      height: 25px;
      font-size: 14px;
    }

    .user-right-desc {
      height: 20px;
      font-size: 12px;
    }
  }

}
</style>