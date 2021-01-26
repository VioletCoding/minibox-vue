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
                     :src="userInfo.userImg"
                     @click="show(userInfo.userImg)"/>
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

      <!--等级-->
      <div class="user-level inline-block">
        <slot name="level">
          <van-tag color="#7232dd">
            {{ 'Lv ' + userInfo.level }}
          </van-tag>
        </slot>
      </div>
      <!--等级end-->
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

  .user-level {
    margin-top: 19px;
    padding: 10px;
    vertical-align: top;
  }

}
</style>