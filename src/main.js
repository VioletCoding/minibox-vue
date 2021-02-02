import Vue from 'vue';
import App from './App.vue';
import router from './router';
import Axios from 'axios';
import utils from "@/api/utils";
//===========================================Vant=========================================
//Vant 是一个面向移动端的组件库，因此默认只适配了移动端设备，这意味着组件只监听了移动端的 touch 事件，没有监听桌面端的 mouse 事件。
//如果你需要在桌面端使用 Vant，可以引入我们提供的 @vant/touch-emulator，这个库会在桌面端自动将 mouse 事件转换成对应的 touch 事件，使得组件能够在桌面端使用。
import '@vant/touch-emulator';
import { Col, Lazyload, Row } from 'vant';
import { Tab, Tabs } from 'vant';
import { Swipe, SwipeItem } from 'vant';
import { Image as VanImage } from 'vant';
import { List } from 'vant';
import { PullRefresh } from 'vant';
import { Cell, CellGroup } from 'vant';
import { Sticky } from 'vant';
import { Toast } from "vant";
import { Tabbar, TabbarItem } from 'vant';
import { Grid, GridItem } from 'vant';
import { Icon } from 'vant';
import { NavBar } from 'vant';
import { Button } from 'vant';
import { Popup } from 'vant';
import { Field } from 'vant';
import { Card } from 'vant';
import { Skeleton } from 'vant';
import { Uploader } from 'vant';
import { Collapse, CollapseItem } from 'vant';
import { Divider } from 'vant';
import { Loading } from 'vant';
import { Rate } from 'vant';
import { Tag } from 'vant';
import { Progress } from 'vant';
import { RadioGroup, Radio } from 'vant';
import { Search } from 'vant';
import { Form } from 'vant';
import { PasswordInput, NumberKeyboard } from 'vant';
import { Notify } from 'vant';
import { Overlay } from 'vant';
import { ImagePreview } from 'vant';
import { Dialog } from 'vant';
import { GoodsAction, GoodsActionIcon, GoodsActionButton } from 'vant';
import { SubmitBar } from 'vant';
import { Badge } from 'vant';
import { Empty } from 'vant';


//MarkDown解析工具
import mavonEditor from 'mavon-editor';
import 'mavon-editor/dist/css/index.css';

Vue.use(mavonEditor);
//MarkDown解析工具

//Vant
// 全局注册
Vue.use(Empty);
Vue.use(Badge);
Vue.use(SubmitBar);
Vue.use(GoodsAction);
Vue.use(GoodsActionButton);
Vue.use(GoodsActionIcon);
Vue.use(Dialog);
Vue.use(ImagePreview);
Vue.use(Overlay);
Vue.use(Notify);
Vue.use(PasswordInput);
Vue.use(NumberKeyboard);
Vue.use(Form);
Vue.use(Search);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(Progress);
Vue.use(Tag);
Vue.use(Rate);
Vue.use(Loading);
Vue.use(Divider);
Vue.use(Collapse);
Vue.use(CollapseItem);
Vue.use(Uploader);
Vue.use(Skeleton);
Vue.use(Card);
Vue.use(Field);
Vue.use(Popup);
Vue.use(Button);
Vue.use(NavBar);
Vue.use(Icon);
Vue.use(Grid);
Vue.use(GridItem);
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(Toast);
Vue.use(Sticky);
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(PullRefresh);
Vue.use(List);
Vue.use(VanImage);
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(Lazyload);
Vue.use(Col);
Vue.use(Row);
Vue.use(Tab);
Vue.use(Tabs);
//===========================================Vant=========================================
//这样 this.$http.post 就 = axios.post了，相当于赋值
Vue.prototype.$http = Axios;
//关掉vue那个提示生产用压缩版的控制台提示
Vue.config.productionTip = false;
new Vue({router, render: h => h(App)}).$mount('#app');

//设置URL，这样具体的接口地址就能写post/all这样的相对路径了，会自动在前面加baseURL
Axios.defaults.baseURL = "http://192.168.0.105:20001/";
//请求超时时间5秒钟
Axios.defaults.timeout = 5000;
//请求拦截器，自动加请求头
Axios.interceptors.request.use(
    config => {
        config.headers['Content-Type'] = 'application/json;charset=UTF-8';
        config.headers["accessToken"] = localStorage.getItem("accessToken");
        return config;
    },
    err => Promise.reject(err)
);
//响应拦截器
Axios.interceptors.response.use(
    resp => {
        return resp;
    },
    error => {
        let status = error.response.status;
        let message = error.response.data.message;
        //如果请求状态是401，那么去掉存储的token和userId，并且跳转到登录页
        if (status === 401) {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("userId");
            router.replace("/login").catch(err => err);
        }
        return Promise.reject(error);
    }
)