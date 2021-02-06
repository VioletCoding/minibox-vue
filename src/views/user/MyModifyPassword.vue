<template>
  <div style="overflow: hidden;padding: 20px;margin-top: 30%">
    <p style="font-size: 18px;font-weight: bold">修改密码</p>
    <div>
      <van-form @submit="onSubmit"
                submit-on-enter
                :scroll-to-error=true>
        <van-field v-model="password"
                   type="text"
                   name="新密码"
                   label="新密码"
                   placeholder="新密码"
                   :rules="[{ required: true, message: '请填写新密码' }]"
                   autocomplete="off"/>
        <van-field v-model="confirmPwd"
                   type="text"
                   name="确认密码"
                   label="确认密码"
                   placeholder="确认密码"
                   :rules="[{ required: true, message: '请确认新密码' }]"
                   autocomplete="off"/>

        <div style="display: flex;flex-direction: row">

          <div style="margin: 30px auto">
            <van-button type="danger"
                        @click="()=>{this.$router.replace('/mine')}">
              取消
            </van-button>
          </div>

          <div style="margin: auto">
            <van-button type="primary"
                        native-type="submit">提交
            </van-button>
          </div>

        </div>

      </van-form>
    </div>

  </div>
</template>

<script>
import Api from "@/api/api";
import utils from "@/api/utils";

export default {
  name: "MyModifyPassword",
  data() {
    return {
      authCode: "",
      showKeyboard: false,
      password: "",
      confirmPwd: ""
    }
  },
  methods: {
    //修改密码
    onSubmit() {
      if (this.password != this.confirmPwd) {
        this.$toast.fail("两次密码不一致");
        return 0;
      }
      if (this.password.length < 8 || this.confirmPwd.length < 8) {
        this.$toast.fail("密码长度应为8-16位");
        return 0;
      }
      this.$http.post(Api.userPwdModify, {
        id: utils.getLoginUserId(),
        password: this.password
      }).then(resp => {
        if (resp.data.code === 200) {
          localStorage.removeItem("userId");
          localStorage.removeItem("accessToken");
          this.$toast.success(resp.data.message);
          this.$router.replace("/login");
        } else {
          this.$toast.fail(resp.data.message);
        }
      }).catch(err => this.$toast.fail(utils.errMessage(err)));
    }
  }
}
</script>