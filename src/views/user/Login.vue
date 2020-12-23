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
      </div>
      <!--输入框end-->

      <!--获取验证码按钮-->
      <div class="btn">
        <van-button color="linear-gradient(to right, #ff6034, #ee0a24)" text="获取验证码" block :disabled="disabled"
                    @click="auth(input)"/>
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
import axios from "axios";

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
      disabled: true
    }
  },
  methods: {
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
      axios.post(Api.auth, {
        username: this.input
      }).then(res => {
        console.log("这是校验回调=>", res);
      }).catch(err=>{
        console.log("校验回调错误=>",err);
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

.btn {
  margin-top: 30px;
}

.pwd-login {
  font-size: 12px;
  color: #969799;
  padding: 20px 0 0 20px;
}
</style>