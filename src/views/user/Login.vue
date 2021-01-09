<template>
  <div style="overflow: hidden">
    <!--头部-->
    <div>
      <MyHeader>
        <template #left>
          <van-icon name="cross" color="black" size="30"/>
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
        <van-field v-model="input" placeholder="输入邮箱" input-align="center"
                   clearable :right-icon="icon" @blur="validate" :error-message="errMsg"
                   error-message-align="center"/>
      </van-form>
      <!--输入验证码弹出层-->
      <van-popup v-model="showAuth" position="right" closeable :style="{ width: '100%',height:'100%' }">
        <div style="margin-top: 150px">
          <van-password-input :value="authCode" :mask="false" :focused="showKeyboard" @focus="showKeyboard = true"/>

          <div class="btn">
            <van-button color="linear-gradient(to right, #ff6034, #ee0a24)" text="登录" block @click="login(authCode)"/>
          </div>

          <van-number-keyboard v-model="authCode" :show="showKeyboard" @blur="showKeyboard = false"
                               safe-area-inset-bottom/>
        </div>
      </van-popup>
      <!--输入验证码弹出层end-->
    </div>
    <!--输入框end-->

    <!--获取验证码按钮-->
    <div class="btn">
      <van-button color="linear-gradient(to right, #ff6034, #ee0a24)" text="获取验证码" block :disabled="disabled"
                  @blur="checkAuth" @click="auth(input)"/>
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
import { Notify } from "vant";

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
      if (this.authCode.length == 6) {
        this.disabled = false;
      }
    },
    //校验表单的值是否是邮箱
    validate() {
      let pattern = "^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$";
      //校验是否匹配正则表达式，返回boolean
      let v = new RegExp(pattern).test(this.input);

      if (!v) {
        this.errMsg = "邮箱格式不正确";
        this.icon = "warning-o"
      }

      if (v) {
        this.errMsg = "";
        this.icon = "";
        this.disabled = false;
      }
      return v;
    },
    //验证
    auth(email) {
      this.$http.post(Api.auth, {username: email})
          .then(res => {
            this.showAuth = true;
            this.disabled = true;
          }).catch(err => {
        Notify({type: "danger", message: err.response.data.message});
      })
    },
    //登陆
    login(authCode) {
      if (authCode.length < 6) {
        Notify({type: "warning", message: "请输入6位数验证码"});
        return;
      }
      if (this.input == null || this.input == "") {
        Notify({type: "warning", message: "请输入邮箱"});
        return;
      }
      this.$http.post(Api.loginOrReg, {
        username: this.input,
        authCode: authCode
      }).then(resp => {
        console.log("login -> ",resp);
        let code = resp.data.code;
        let msg = resp.data.message;
        if (code == 200) {
          localStorage.setItem("accessToken", resp.data.data.token);
          localStorage.setItem("userId", resp.data.data.id);
          this.$router.push("/");
        }
      }).catch(err => {
        Notify({type: "danger", message: err.response.data.message});
      }).finally(f => {
        this.showAuth = false;
        this.showKeyboard = false;
      })
    }
  },mounted() {
    console.log(navigator.userAgent);
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

.btn {
  margin-top: 30px;
}

.pwd-login {
  font-size: 12px;
  color: #969799;
  padding: 20px 0 0 20px;
}
</style>