import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('../views/Home.vue'),
    },
    {
        path: '/',
        name: 'MyHeader',
        component: () => import('../views/header/MyHeader.vue')
    },
    {
        path: '/',
        name: 'MyCarousel',
        component: () => import('../views/mainBody/MyCarousel.vue')
    },
    {
        path: '/',
        name: 'MyMainBodyList',
        component: () => import('../views/mainBody/MyMainBodyList.vue')
    },
    {
        path: '/',
        name: 'MyFooter',
        component: () => import('../views/footer/MyFooter.vue')
    },
    {
        path: '/postDetail',
        name: 'SinglePost',
        component: () => import('../views/inPost/SinglePost.vue')
    },
    {
        path: '/game',
        name: 'MyGameBodyList',
        component: () => import('../views/mainBody/MyGameBodyList.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
