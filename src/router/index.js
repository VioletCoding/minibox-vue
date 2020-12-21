import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('@/views/Home'),
    },
    {
        path: '/',
        name: 'MyHeader',
        component: () => import('@/views/header/MyHeader')
    },
    {
        path: '/',
        name: 'MyMainBodyList',
        component: () => import('@/views/mainBody/MyMainBodyList')
    },
    {
        path: '/',
        name: 'MyFooter',
        component: () => import('@/views/footer/MyFooter')
    },
    {
        path: '/postDetail',
        name: 'SinglePost',
        component: () => import('@/views/single/SinglePost')
    },
    {
        path: '/gameDetail',
        name: 'SingleGame',
        component: () => import('@/views/single/SingleGame')
    },
    {
        path: '/game',
        name: 'MyGameBodyList',
        component: () => import('@/views/mainBody/MyGameBodyList')
    },
    {
        path: "/mine",
        name: "MyMineBodyList",
        component: () => import('@/views/mainBody/MyMineBodyList.vue')
    },
    {
        path: "/community",
        name: "MyCommunityBodyList",
        component: () => import('@/views/mainBody/MyCommunityBodyList.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
