<template>
  <div class="container" v-if="dataFlag">
    <div>
      <!--头像大图-->
      <div class="photo">
        <MyUserInfo :userInfo="transfer">

          <template #photo>
            <van-uploader :after-read="afterRead">
              <van-image :src="userInfo.mbPhoto.photoLink" :alt="userInfo.mbPhoto.photoLink" height="200" fit="cover"/>
            </van-uploader>
          </template>

        </MyUserInfo>
      </div>

      <van-divider>点击图片修改头像</van-divider>
      <!--个人信息-->
      <div class="information">
        <van-form>
          <van-field clickable label="用户ID" :placeholder="uid" readonly/>
          <van-field clickable v-model="nickname" label="昵称" :placeholder="nickname"/>
          <van-field clickable v-model="description" label="签名" :placeholder="description"/>
          <van-button type="info" text="保存" block @click="save"/>
        </van-form>
      </div>
    </div>

    <div class="modify-password">
      <van-button type="primary" text="修改密码" block/>
    </div>

    <div class="logout">
      <van-button color="linear-gradient(to right, #ff6034, #ee0a24)" text="退出登录" block/>
    </div>

  </div>
</template>

<script>
import { Notify } from 'vant';
import Api from "@/api/api";
import MyUserInfo from "@/views/user/MyUserInfo";

export default {
  name: "MySetting",
  props: {
    userInfo: {
      type: Object, default() {
        return {}
      }
    }
  },
  components: {MyUserInfo},
  data() {
    return {
      //用户信息
      uid: "",
      description: "",
      nickname: "",
      userImg: "",
      //数据标识
      dataFlag: false,
      //传递给子组件的对象
      transfer: {
        mbPhoto: {
          photoLink: ""
        }
      }
    }
  },
  methods: {
    //保存更新的个人信息
    save() {
      this.$http.post(Api.updateUserInfo, {
        uid: localStorage.getItem("userId"),
        description: this.description,
        nickname: this.nickname
      }).then(resp => {
        let v = resp.data.data;
        this.nickname = v.nickname;
        this.description = v.description;
        Notify({type: "success", message: resp.data.message});
      }).catch(err => {
        Notify({type: "danger", message: err.response.data.message});
      })
    },
    //初始化页面数据
    onLoad() {
      this.uid = localStorage.getItem("userId");
      this.description = this.userInfo.description;
      this.nickname = this.userInfo.nickname;
      this.transfer.mbPhoto.photoLink = this.userInfo.mbPhoto.photoLink;
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
        this.userImg = resp.data.data.photoLink;
        Notify({type: "success", message: resp.data.message});
        //发射事件，通知父组件更新数据（图片链接）
        this.$emit("updateImg", resp.data.data.photoLink);
      }).catch(err => {
        Notify({type: "danger", message: err.response.data.message});
      })
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
    //margin-top: 30px;
  }
}


</style>