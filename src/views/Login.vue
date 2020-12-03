<template>
    <div class="container">
        <!--左右背景图 start-->
        <div class="box">
            <div class="left"></div>
            <div class="right"></div>
        </div>
        <!--左右背景图 end-->

        <!--登陆注册窗口 start-->
        <div class="box2">
            <div :id="id" class="box2-input">
                <!--左边 注册 start-->
                <div class="m-form" v-if="this.type=='register'">
                    <div class="header">注册</div>
                    <div class="input">
                        <el-input v-model="email" placeholder="email" type="email"/>
                        <el-input v-model="password" placeholder="password" type="password"/>
                    </div>
                    <!--底部按钮 start-->
                    <div class="button">
                        <el-button type="primary" @click="toRight">登陆</el-button>
                        <el-button type="primary">注册</el-button>
                    </div>
                    <!--底部按钮 end-->
                </div>


                <!--左边 注册 end-->
                <!--右边 登陆 start-->
                <div class="m-form" v-if="this.type=='login'">
                    <div class="header">登陆</div>
                    <div class="input">
                        <el-input v-model="email" placeholder="email" type="email"/>
                        <el-input v-model="password" placeholder="password" type="password"/>
                    </div>
                    <!--底部按钮 start-->
                    <div class="button">
                        <el-button type="primary" @click="toLeft" style="background-color: #ffffff">注册</el-button>
                        <el-button type="primary">登陆</el-button>
                    </div>
                    <!--底部按钮 end-->
                </div>
                <!--右边登陆 end-->
            </div>
        </div>
        <!--登陆注册窗口 end-->
    </div>
</template>

<script>

    export default {
        data() {
            return {
                email: '',
                password: '',
                //用户判断是登陆框还是注册框
                type: 'login',
                //用于绑定动画
                id: "reset"
            }
        },
        methods: {
            toRight() {
                this.id = "right";
                this.type = 'login';
            },
            toLeft() {
                this.id = "left";
                this.type = 'register';
            }
        },
        mounted() {
            //页面初始化
        }
    }

</script>

<style scoped lang="less">
    //最大的div
    .container {
        width: 99.9%;
        height: 99.9vh;
        font-family: 'Roboto', sans-serif;
        //第一个盒子，里面是左右背景图
        .box {
            width: 100%;
            height: 100%;
            position: fixed;
            z-index: -1;

            div {
                display: inline-block;
            }

            //左背景图
            .left {
                width: 50%;
                height: 100%;
                background: #3498db url(https://download.unsplash.com/photo-1428279148693-1cf2163ed67d);
                background-size: cover;
                background-position: 50% 50%;
            }

            //右背景图
            .right {
                width: 50%;
                height: 100%;
                background: #3498db url(https://download.unsplash.com/photo-1429041966141-44d228a42775);
                background-size: cover;
                background-position: 50% 50%;
            }
        }

        //第二个盒子，包括的是切换的灰白背景，以及登陆的输入框和按钮等
        .box2 {
            width: 100%;
            height: 100vh;

            div {
                display: inline-block;
            }

            //输入框
            .box2-input {
                width: 50%;
                height: 100%;
                background-color: #2C3034;
                color: #03A9F4;

                .m-form {
                    width: 400px;
                    height: 300px;
                    margin: 280px 0 0 260px;
                    //Sign Up和Login的大字
                    .header {
                        width: 100%;
                        text-align: center;
                        font-size: 50px;
                    }

                    //输入框
                    .input {
                        width: 60%;
                        margin: 20px 0 0 80px;
                        //第二个输入框
                        .el-input:nth-child(2) {
                            margin: 20px 0;
                        }
                    }

                    //按钮
                    .button {
                        width: 90%;
                        margin: 0px 0 0 90px;

                        .el-button:first-child {
                            background-color: #2C3034;
                            border: 0;
                            font-size: 15px;
                            color: #03A9F4;
                        }

                        .el-button:first-child:hover {
                            background-color: #363A3D;
                        }

                        .el-button:nth-child(2) {
                            margin: 0 0 0 60px;
                        }
                    }
                }
            }

            //左背景图动画
            #left {
                position: relative;
                animation: leftAnimation 0.5s;
                -webkit-animation: leftAnimation 0.5s; /* Safari and Chrome */
                -webkit-animation-fill-mode: forwards;
                scroll-behavior: smooth
            }

            @keyframes leftAnimation {
                from {
                    left: 961px;
                }
                to {
                    left: 0px;
                }
            }

            #right {
                position: relative;
                animation: RightAnimation 1s;
                -webkit-animation: RightAnimation 1s; /* Safari and Chrome */
                -webkit-animation-fill-mode: forwards;
                scroll-behavior: smooth;
                background-color: #ffffff;
                float: right;
            }

            #reset {
                background-color: #ffffff;
                float: right;
                position: relative;
            }

            @keyframes RightAnimation {
                from {
                    right: 961px;
                }
                to {
                    right: 0px;
                }
            }
        }
    }

</style>