<template>
  <div class="container"
       v-if="dataFlag">
    <div>
      <!--头像大图-->
      <div class="photo">
        <MyUserInfo :userInfo="userInfo">
          <template #photo>
            <van-uploader :after-read="afterRead">
              <van-image :src="userInfo.photoLink"
                         alt="头像加载失败"
                         width="80"
                         height="80"
                         round
                         fit="cover"/>
            </van-uploader>
          </template>
        </MyUserInfo>
      </div>

      <van-divider>点击图片修改头像</van-divider>
      <!--个人信息-->
      <div class="information">
        <van-form>
          <van-field clickable
                     label="用户ID"
                     :placeholder="id"
                     readonly/>
          <van-field clickable
                     v-model="userInfo.nickname"
                     label="昵称"
                     :placeholder="userInfo.nickname"/>
          <van-field clickable
                     v-model="userInfo.description"
                     label="签名"
                     :placeholder="userInfo.description"/>

          <van-button color="linear-gradient(to right, #464A4F, #16191E)"
                      text="保存"
                      block
                      @click="userModify({id:id,description:userInfo.description,nickname:userInfo.nickname})"/>
        </van-form>
      </div>
    </div>

    <div class="modify-password">
      <van-button type="info"
                  text="修改密码"
                  block
                  @click="toUpdatePassword"/>
    </div>

    <div class="logout">
      <van-button type="danger"
                  text="退出登录"
                  block
                  @click="logout"/>
    </div>

  </div>
</template>

<script>
import { Dialog } from 'vant';
import Api from "@/api/api";
import MyUserInfo from "@/views/user/MyUserInfo";
import utils from "@/api/utils";

export default {
  name: "MySetting",
  props: {
    userInfo: Object
  },
  components: {MyUserInfo},
  data() {
    return {
      //用户信息
      id: localStorage.getItem("userId"),
      //返回数据
      returnData: {},
      //数据标识
      dataFlag: false
    }
  },
  methods: {
    //初始化页面数据
    onLoad() {
      this.returnData = this.userInfo;
      this.dataFlag = true;
    },
    //修改头像
    afterRead(file) {
      let formData = new FormData();
      formData.append("multipartFile", file.file);
      this.$http({
        url: Api.uploadImg,
        data: formData,
        method: 'post',
        headers: {'Content-Type': 'multipart/form-data'}
      }).then(resp => {
        if (resp.data.code === 200) {
          let image = resp.data.data.images[0];
          let user = {};
          user.id = utils.getLoginUserId();
          user.photoLink = image;
          this.userModify(user);
        } else {
          this.$toast.fail(resp.data.message);
        }
      }).catch(err => err => this.$toast.fail(utils.errMessage(err)))
    },
    //修改用户信息
    userModify(user) {
      this.$http.post(Api.userModify, user)
          .then(resp => {
            if (resp.data.code === 200) {
              this.$toast.success(resp.data.message);
              this.returnData = resp.data.data;
              this.$emit("updateImg", this.returnData);
            } else {
              this.$toast.fail(resp.data.message);
            }
          }).catch(err => this.$toast.fail(utils.errMessage(err)));
    },
    //修改密码
    toUpdatePassword() {
      Dialog.confirm({
        title: "修改密码",
        message: "确定要修改密码吗？"
      }).then(() => this.$router.push("/modifyPassword"))
          .catch(() => null);
    },
    //退出登录
    logout() {
      Dialog.confirm({
        title: "退出登录",
        message: "确定要退出登录吗？"
      }).then(() => {
        this.$http.get(Api.logout).then(resp => {
          localStorage.removeItem("userId");
          localStorage.removeItem("accessToken");
          this.$router.replace("/login");
        }).catch(err => this.$toast.fail(utils.errMessage(err)))
      }).catch(() => null)
    }
  },
  mounted() {
    this.onLoad();
  }
}
</script>

<style scoped lang="less">
.inline-block {
  display: inline-block;
}

.container {
  .information {
    margin-top: 20px;
  }
}


</style>