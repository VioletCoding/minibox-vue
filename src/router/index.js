import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err);
};

const routes = [
    //用户 「首页」
    {
        path: "/",
        name: "MyMainBodyList",
        meta: {
            showFooter: true
        },
        component: () => import("@/views/mainBody/MyMainBodyList")
    },
    // 用户 「帖子详情页」
    {
        path: "/postDetail",
        name: "SinglePost",
        meta: {
            showFooter: false
        },
        component: () => import("@/views/single/SinglePost")
    },
    // 用户 「游戏详情页」
    {
        path: "/gameDetail",
        name: "SingleGame",
        meta: {
            showFooter: false
        },
        component: () => import("@/views/single/SingleGame")
    },
    // 用户 「游戏库」
    {
        path: "/game",
        name: "MyGameBodyList",
        meta: {
            showFooter: true
        },
        component: () => import("@/views/mainBody/MyGameBodyList")
    },
    //用户 「游戏库」->「发表游戏评价」
    {
        path: "/gameCommentPublish",
        name: "MyGameCommentPublish",
        meta: {
            showFooter: false
        },
        component: () => import("@/views/single/MyGameCommentPublish")
    },
    //用户 「我的」
    {
        path: "/mine",
        name: "MyMineBodyList",
        meta: {
            showFooter: true
        },
        component: () => import("@/views/user/MyMineBodyList")
    },
    //用户登录页
    {
        path: "/login",
        name: "Login",
        meta: {
            showFooter: false
        },
        component: () => import("@/views/user/Login")
    },
    //修改密码页
    {
        path: "/modifyPassword",
        name: "MyModifyPassword",
        meta: {
            showFooter: false
        },
        component: () => import("@/views/user/MyModifyPassword")
    },
    //订单页
    {
        path: "/order",
        name: "MyGameOrder",
        meta: {
            showFooter: false
        },
        component: () => import("@/views/order/MyGameOrder")
    }
]

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});

export default router;
