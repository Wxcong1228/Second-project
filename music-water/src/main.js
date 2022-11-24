import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueAxiosPlugin from 'vue-axios-plugin'
import {
  Icon,
  Slider,
  Lazyload,
  Swipe,
  SwipeItem,
  Image as VanImage,
  Tab,
  Tabs,
  List,
  NoticeBar,
  Popup,
  Skeleton
} from 'vant';
import { Toast } from 'vant';
import { Uploader } from 'vant';
import { Form } from 'vant';
import { Field } from 'vant';
import { PullRefresh } from 'vant';
import { Overlay } from 'vant';
import { Loading } from 'vant';

Vue.use(Loading);

Vue.use(Overlay);

Vue.use(PullRefresh);

Vue.use(Form);
Vue.use(Field);

Vue.use(Uploader);

Vue.use(Toast);

Vue.use(Popup);

Vue.use(NoticeBar);

Vue.use(List);

Vue.use(Tab);
Vue.use(Tabs);

Vue.use(VanImage);

Vue.use(Swipe);
Vue.use(SwipeItem);

Vue.use(Lazyload);
Vue.use(Slider);
Vue.use(Icon);
Vue.use(Skeleton);


Vue.use(VueAxiosPlugin, {
  // 请求拦截处理
  reqHandleFunc: config => ({
    ...config,
    baseURL: 'https://apis.netstart.cn/music/',
  }),
  reqErrorFunc: error => Promise.reject(error),
  // 响应拦截处理
  resHandleFunc: ({
    data
  }) => data,
  resErrorFunc: error => Promise.reject(error)
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')