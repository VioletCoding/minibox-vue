<template>
    <div id="login">
        <div class="input-size">
            <el-input v-model="username" placeholder="请输入邮箱"/>
            <el-input v-model="password" type="password" placeholder="请输入密码"/>
            <el-button type="primary" @click="login">登陆</el-button>
        </div>

    </div>
</template>

<script>
    import Api from "../api/api.js";

    export default {
        data() {
            return {
                username: "",
                password: ""
            }
        },
        methods: {
            login() {
                this.$http({
                    url: Api.login,
                    method: "post",
                    data: {
                        username: this.username,
                        password: this.password
                    }
                }).then(res => {
                    console.log("login方法成功回调==>", res);
                }).catch(err => {
                    console.log("login方法异常回调==>", err);
                })
            }
        },
        mounted() {
            //页面初始化
        }
    }
</script>

<style scoped lang="less">
    #login {
        border: 1px solid aquamarine;

        .input-size {
            width: 200px;
        }
    }


</style>