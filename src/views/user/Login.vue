<template>
  <div style="overflow: hidden">
    <!--头部-->
    <div>
      <MyHeader>
        <template #left>
          <van-icon name="cross"
                    color="black"
                    size="30"/>
        </template>
      </MyHeader>
    </div>
    <!--头部end-->
    <!--文字提示-->
    <div class="text">验证码登陆</div>
    <!--文字提示end-->

    <!--输入框-->
    <div class="input-field van-hairline--bottom">
      <van-form>
        <van-field v-model="input"
                   placeholder="输入邮箱"
                   input-align="center"
                   clearable
                   :right-icon="icon"
                   @blur="validate"
                   :error-message="errMsg"
                   error-message-align="center"/>
      </van-form>
      <!--输入验证码弹出层-->
      <van-popup v-model="showAuth"
                 position="right"
                 closeable
                 :style="{ width: '100%',height:'100%' }">
        <div style="margin-top: 150px">

          <van-password-input :value="authCode"
                              :mask="false"
                              :focused="showKeyboard"
                              @focus="showKeyboard = true"/>

          <div style="width: 105px;margin: 20px auto">
            <van-button type="info"
                        text="登录"
                        block
                        @click="login(authCode)"/>
          </div>

          <van-number-keyboard v-model="authCode"
                               :show="showKeyboard"
                               @blur="showKeyboard = false"
                               safe-area-inset-bottom/>
        </div>
      </van-popup>
      <!--输入验证码弹出层end-->
    </div>
    <!--输入框end-->

    <!--获取验证码按钮-->
    <div style="width: 105px;margin: 20px auto">
      <van-button type="info"
                  text="获取验证码"
                  :disabled="disabled"
                  @blur="checkAuth"
                  @click="auth"/>
    </div>
    <!--获取验证码按钮end-->

    <!--密码登陆-->
    <div class="pwd-login">密码登录</div>
    <!--密码登陆end-->


  </div>
</template>

<script>
import MyHeader from "@/views/header/MyHeader";
import Api from "@/api/api";
import utils from "@/api/utils";

export default {
  name: "Login",
  components: {MyHeader},
  data() {
    return {
      //输入框的输入值
      input: "",
      //错误信息
      errMsg: "",
      //图标
      icon: "",
      //是否禁用按钮
      disabled: true,
      //显示弹出层
      showAuth: false,
      //验证码
      authCode: "",
      //显示密码输入键盘
      showKeyboard: true
    }
  },
  methods: {
    //校验验证码
    checkAuth() {
      if (this.authCode.length == 6)
        this.disabled = false;
      else
        this.$toast.fail("请填写完整验证码！");
    },
    //校验表单的值是否是邮箱
    validate() {
      let v = utils.checkEmailFormat(this.input);
      if (!v) {
        this.errMsg = "邮箱格式不正确";
        this.icon = "warning-o";
      }
      if (v) {
        this.errMsg = "";
        this.icon = "";
        this.disabled = false;
      }
      return v;
    },
    //验证
    auth() {
      this.showAuth = true;
      let formData = new FormData();
      formData.append("username", this.input);
      this.$http.post(Api.auth, formData)
          .then(res => this.disabled = true)
          .catch(err => this.$toast.fail(utils.errMessage(err)));
    },
    //登陆
    login(authCode) {
      if (authCode.length < 6) {
        this.$toast.fail("请输入6位数验证码");
        return 0;
      }
      if (utils.isNullOrEmpty(this.input)) {
        this.$toast.fail("请输入邮箱");
        return 0;
      }
      let formData = new FormData();
      formData.append("username", this.input);
      formData.append("authCode", authCode);
      this.$http.post(Api.loginOrReg, formData)
          .then(resp => {
            console.log("登陆回调=>",resp);
            let code = resp.data.code;
            let msg = resp.data.message;
            localStorage.setItem("accessToken", resp.data.data.token);
            localStorage.setItem("userId", resp.data.data.userInfo.id);
            this.$router.push("/");
          })
          .catch(err => this.$toast.fail(utils.errMessage(err)))
          .finally(f => {
            this.showAuth = false;
            this.showKeyboard = false;
          })
    }
  }
}
</script>

<style scoped lang="less">

.text {
  margin-top: 150px;
  font-size: 25px;
  font-weight: bold;
  margin-left: 20px;
}

.input-field {
  margin-top: 50px;
}

.pwd-login {
  font-size: 12px;
  color: #969799;
  padding: 20px 0 0 20px;
}
</style>