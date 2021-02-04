<template>
  <div style="overflow: hidden">
    <!--文字提示-->
    <div class="text">{{ loginFlag ? "验证码登陆" : "密码登陆" }}</div>
    <!--文字提示end-->

    <div v-if="loginFlag">
      <!--输入框-->
      <div class="input-field van-hairline--bottom">
        <van-form>
          <van-field v-model="username"
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
              <van-button color="linear-gradient(to right, #464A4F, #16191E)"
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
        <van-button text="获取验证码"
                    color="linear-gradient(to right, #464A4F, #16191E)"
                    :disabled="disabled"
                    @blur="checkAuth"
                    @click="auth"/>
      </div>
      <!--获取验证码按钮end-->
    </div>

    <div v-else>
      <div style="margin-top: 20px">
        <van-form submit-on-enter
                  :scroll-to-error=true>
          <van-field v-model="username"
                     ref="username"
                     type="text"
                     name="邮箱"
                     label="用户名"
                     placeholder="用户名是你的邮箱"
                     :rules="[{ required: true, message: '请填写用户名'}]"
                     autocomplete="off"/>
          <van-field v-model="password"
                     ref="password"
                     type="password"
                     name="密码"
                     label="密码"
                     placeholder="输入密码"
                     :rules="[{ required: true, message: '请输入密码' }]"
                     autocomplete="off"/>

          <div style="display: flex;flex-direction: row">
            <div style="margin: 20px auto">
              <van-button color="linear-gradient(to right, #464A4F, #16191E)"
                          style="width: 105px"
                          @click="usingPassword"
                          native-type="submit">提交
              </van-button>
            </div>
          </div>
        </van-form>
      </div>
    </div>
    <!--密码登陆-->
    <div class="pwd-login"
         @click="loginWayChange">
      {{ loginFlag ? "密码登录" : "验证码登陆" }}
    </div>
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
      username: "",
      //密码
      password: "",
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
      showKeyboard: true,
      //验证码登陆还是密码登陆
      loginFlag: true
    }
  },
  methods: {
    //验证码或者密码登陆切换
    loginWayChange() {
      this.loginFlag = !this.loginFlag;
    },
    usingPassword() {
      if (!utils.checkEmailFormat(this.username)) {
        this.$refs.username.focus();
        this.$toast.fail("邮箱格式不正确");
        return 0;
      }
      if (utils.isNullOrEmptyOrUndefined(this.password)) {
        this.$refs.password.focus();
        return 0;
      }
      this.$http.post(Api.passwordLogin, {username: this.username, password: this.password})
          .then(resp => {
            if (resp.data.code === 200) {
              localStorage.setItem("accessToken", resp.data.data.token);
              localStorage.setItem("userId", resp.data.data.userInfo.id);
              this.$router.replace("/");
            } else {
              this.$toast.fail(resp.data.message);
            }
          }).catch(err => utils.errMessage(err));
    },
    //校验验证码
    checkAuth() {
      if (this.authCode.length == 6)
        this.disabled = false;
      else
        this.$toast.fail("请填写完整验证码！");
    },
    //校验表单的值是否是邮箱
    validate() {
      let v = utils.checkEmailFormat(this.username);
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
      formData.append("username", this.username);
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
      if (utils.isNullOrEmpty(this.username)) {
        this.$toast.fail("请输入邮箱");
        return 0;
      }
      let formData = new FormData();
      formData.append("username", this.username);
      formData.append("authCode", authCode);
      this.$http.post(Api.loginOrReg, formData)
          .then(resp => {
            console.log("登陆回调=>", resp);
            let code = resp.data.code;
            let msg = resp.data.message;
            localStorage.setItem("accessToken", resp.data.data.token);
            localStorage.setItem("userId", resp.data.data.userInfo.id);
            this.$router.replace("/");
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