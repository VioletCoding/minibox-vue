import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
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


//MarkDown解析工具
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

Vue.use(mavonEditor);
//MarkDown解析工具

//Vant
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
//Vant
//===========================================Vant=========================================
//将axios放到原型上，不懂这个有什么好处
//Vue.prototype.$http = Axios
Vue.use(VueAxios, axios)
Vue.config.productionTip = false
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
