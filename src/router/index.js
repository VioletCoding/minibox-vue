import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err);
};

const routes = [
    {
        path: "/",
        name: "MyMainBodyList",
        component: () => import("@/views/mainBody/MyMainBodyList")
    },
    {
        path: "/postDetail",
        name: "SinglePost",
        component: () => import("@/views/single/SinglePost")
    },
    {
        path: "/gameDetail",
        name: "SingleGame",
        component: () => import("@/views/single/SingleGame")
    },
    {
        path: "/game",
        name: "MyGameBodyList",
        component: () => import("@/views/mainBody/MyGameBodyList")
    },
    {
        path: "/gameCommentPublish",
        name: "MyGameCommentPublish",
        component: () => import("@/views/single/MyGameCommentPublish")
    },
    {
        path: "/mine",
        name: "MyMineBodyList",
        component: () => import("@/views/user/MyMineBodyList")
    },
    {
        path: "/community",
        name: "MyCommunityBodyList",
        component: () => import("@/views/mainBody/MyCommunityBodyList")
    },
    {
        path: "/login",
        name: "Login",
        component: () => import("@/views/user/Login")
    },
    {
        path: "/modifyPassword",
        name: "MyModifyPassword",
        component: () => import("@/views/user/MyModifyPassword")
    }
]

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});

export default router;
