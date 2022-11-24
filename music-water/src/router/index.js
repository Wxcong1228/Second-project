import Vue from 'vue'
import VueRouter from 'vue-router'
import FindView from '../views/Find/FindView.vue'
import MusicView from '../views/music/MusicView.vue'
import UserView from '../views/User/UserView.vue'
import SearchView from '../views/SearchView.vue'
import { Tabbar, TabbarItem } from 'vant'
import MoreListView from '../views/Find/MoreSongList.vue'
import SongListDetailView from '../views/Find/SongListDetail.vue'
import SongStartView from '../components/SongStart.vue'
import CommentView from '../components/ToCommentC.vue'
import RadioStationView from '../components/RadioStation.vue'
import ShowSongDetailView from '../components/ShowSongDetail.vue'
import MoreRadioView from '../views/Find/MoreRadio.vue'
import ShareView from '../views/Find/ShareView.vue'
import LoginView from '../views/User/ToLogin.vue'
import registerView from '../views/User/ToRegister.vue'
import LoginStartView from '../views/User/LoginStart.vue'
import AlbumView from '../components/AlbumComponents.vue'
import SingerView from '../components/singerComponents.vue'
import AllSingerView from '../views/Find/AllSinger.vue'

Vue.use(Tabbar);
Vue.use(TabbarItem);

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'find',
    component: FindView,
    meta: {
      istrue:true,
      name: find
    }
  },
  {
    path: '/music',
    name: 'music',
    component: MusicView,
    meta: {
      istrue:true
    } 
  },
  {
    path: '/user',
    name: 'user',
    component: UserView,
    meta: {
      istrue:true
    } 
  },
  {
    path: '/search',
    name: 'search',
    component: SearchView,
    meta: {
      istrue:false
    }
  },
  {
    path: '/moreList',
    name: 'moreList',
    component: MoreListView,
    meta: {
      istrue:false
    }
  },
  {
    path: '/SongListDetail',
    name: 'SongListDetail',
    component: SongListDetailView,
    meta: {
      istrue:false
    }
  },
  {
    path: '/SongStart',
    name: 'SongStart',
    component: SongStartView,
    meta: {
      istrue:false
    }
  },
  {
    path: '/comment',
    name: 'comment',
    component: CommentView,
    meta: {
      istrue:false
    }
  },
  {
    path: '/radioStation',
    name: 'radioStation',
    component: RadioStationView,
    meta: {
      istrue:false
    }
  },
  {
    path: '/showSongDetail',
    name: 'showSongDetail',
    component: ShowSongDetailView,
    meta: {
      istrue:false
    }
  },
  {
    path: '/moreRadio',
    name: 'moreRadio',
    component: MoreRadioView,
    meta: {
      istrue:false
    }
  },
  {
    path: '/share',
    name: 'share',
    component: ShareView,
    meta: {
      istrue:false
    }
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    meta: {
      istrue:false
    }
  },
  {
    path: '/register',
    name: 'register',
    component: registerView,
    meta: {
      istrue:false
    }
  },
  {
    path: '/loginStart',
    name: 'loginStart',
    component: LoginStartView,
    meta: {
      istrue:false
    }
  },
  {
    path: '/Album',
    name: 'Album',
    component: AlbumView,
    meta: {
      istrue:false
    }
  },
  {
    path: '/singer',
    name: 'singer',
    component: SingerView,
    meta: {
      istrue:false,
    }
  },
  {
    path: '/allSinger',
    name: 'allSinger',
    component: AllSingerView,
    meta: {
      istrue:false,
    }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
