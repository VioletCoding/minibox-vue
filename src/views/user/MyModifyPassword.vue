<template>
  <div class="container">
    <div class="text">请输入验证码：</div>
    <div class="authInput">
      <!-- 验证码输入框 -->
      <van-password-input :value="authCode" :mask="false" :focused="showKeyboard" @focus="showKeyboard = true"/>
      <!-- 数字键盘 -->
      <van-number-keyboard v-model="authCode" :show="showKeyboard" @blur="showKeyboard = false" safe-area-inset-bottom/>
    </div>

    <div class="btn">
      <van-button color="linear-gradient(to right, #ff6034, #ee0a24)" text="返回"
                  @click="()=>{this.$router.go(-1)}"/>
      <van-button color="linear-gradient(to right, #ff6034, #ee0a24)" text="下一步"
                  style="margin-left: 50px" @click="next"/>
    </div>


    <van-popup v-model="showPop" position="right" safe-area-inset-bottom :style="{width:'100%',height:'100%'}">

      <div class="popup">
        <div class="modify">
          修改密码
        </div>
        <div>
          <van-form @submit="onSubmit" submit-on-enter :scroll-to-error=true>
            <van-field
                v-model="password" type="text" name="新密码" label="新密码" placeholder="新密码"
                :rules="[{ required: true, message: '请填写新密码' }]" clearable autofocus autocomplete="off"/>
            <van-field
                v-model="confirmPwd" type="text" name="确认密码" label="确认密码" placeholder="确认密码"
                :rules="[{ required: true, message: '请确认新密码' }]" clearable autocomplete="off"/>

            <div style="margin: 16px;">
              <van-button round block type="info" native-type="submit">提交</van-button>
            </div>

            <p class="cancel" @click="()=>{this.$router.replace('/mine')}">我不想改了</p>

          </van-form>
        </div>
      </div>
    </van-popup>

  </div>
</template>

<script>
import Api from "@/api/api";
import { Notify } from 'vant';

export default {
  name: "MyModifyPassword",
  data() {
    return {
      authCode: "",
      showKeyboard: false,
      showPop: false,
      password: "",
      confirmPwd: ""
    }
  },
  methods: {
    //下一步，开始重置密码
    next() {
      if (this.authCode.length < 6) {
        Notify({type: "warning", message: "请填写验证码"});
        return;
      }
      this.$http.post(Api.check, {
        authCode: this.authCode
      }).then(resp => {
        if (resp.data.code == 200) {
          this.showPop = true;
        }
      }).catch(err => {
        Notify({type: "danger", message: err.response.data.message});
        return;
      })
    },
    //修改密码
    onSubmit() {
      if (this.password != this.confirmPwd) {
        Notify({type: "warning", message: "两次密码不一致"});
        return;
      }
      if (this.password.length < 8 && this.confirmPwd.length < 8) {
        Notify({type: "warning", message: "密码长度应为8-16位"});
        return;
      }
      this.$http.post(Api.doUpdatePassword, {
        uid: localStorage.getItem("userId"),
        password: this.password
      }).then(resp => {
        console.log(resp);
        if (resp.data.code == 200) {
          localStorage.removeItem("userId");
          localStorage.removeItem("accessToken");
          Notify({type: "success", message: resp.data.message});
          this.$router.replace("/login");
        }
      }).catch(err => {
        Notify({type: "danger", message: err.response.data.message});
      })
    }
  }
}
</script>

<style scoped lang="less">
.container {
  width: 100%;
  height: 30%;
  position: relative;
  top: 50%;
  margin-top: -150px;

  .text {
    padding: 20px 0 0 20px;
    font-size: 25px;
    font-weight: bold;
  }

  .authInput {
    margin-top: 40px;
  }

  .btn {
    width: 180px;
    margin: 30px auto;
  }

  .popup {
    width: 100%;
    height: 30%;
    position: relative;
    top: 30%;

    .modify {
      font-size: 25px;
      font-weight: bold;
      padding: 10px 0 10px 20px;
    }

    .cancel {
      text-align: center;
      font-size: 12px;
      color: #969799;
      margin-top: 30px;
    }
  }

}
</style>