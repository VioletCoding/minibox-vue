<template>
  <div class="container"
       v-if="dataFlag">
    <div>
      <!--头像大图-->
      <div class="photo">
        <MyUserInfo :userInfo="userInfo">

          <template #photo>
            <van-uploader :after-read="afterRead">
              <van-image :src="userInfo.userImg"
                         :alt="userInfo.userImg"
                         height="200"
                         fit="cover"/>
            </van-uploader>
          </template>
          <!--留空插槽，这个页面不显示这些信息在这个位置-->
          <template #nickname><span></span></template>
          <template #desc><span></span></template>
          <template #level><span></span></template>
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

          <van-button type="primary"
                      text="保存"
                      block
                      @click="save"/>
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
    userInfo: {
      type: Object
    }
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
    //保存更新的个人信息
    save() {
      this.$http.post(Api.updateUserInfo, {
        id: this.id,
        description: this.userInfo.description,
        nickname: this.userInfo.nickname
      }).then(resp => {
        let v = resp.data.data;
        this.userInfo.nickname = v.nickname;
        this.userInfo.description = v.description;
        this.$toast.success(resp.data.message);
      }).catch(err => this.$toast.fail(utils.errMessage(err)));
    },
    //初始化页面数据
    onLoad() {
      this.returnData = this.userInfo;
      this.dataFlag = true;
    },
    //修改头像
    afterRead(file) {
      let formData = new FormData();
      formData.append("userImg", file.file);
      formData.append("uid", localStorage.getItem("userId"));
      this.$http({
        url: Api.modifyUserImg,
        data: formData,
        method: 'post',
        headers: {'Content-Type': 'multipart/form-data'}
      }).then(resp => {
        this.returnData = resp.data.data;
        this.$toast.success(resp.data.message);
        //发射事件，通知父组件更新数据（图片链接）
        this.$emit("updateImg", this.returnData);
      }).catch(err => err => this.$toast.fail(utils.errMessage(err)))
    },
    //修改密码
    toUpdatePassword() {
      Dialog.confirm({
        title: "修改密码",
        message: "确定要修改密码吗？"
      }).then(() => {
        this.$http.get(Api.beforeUpdatePassword)
            .then(resp => {
              this.$toast.success(resp.data.message);
              this.$router.push("/modifyPassword");
            })
            .catch(err => this.$toast.fail(utils.errMessage(err)))
      }).catch(() => null);
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
  .photo {
    height: 200px;
  }

  .information {
    margin-top: 20px;
  }

  .modify-password {
    margin-top: 70px;
  }

  .logout {

  }
}


</style>