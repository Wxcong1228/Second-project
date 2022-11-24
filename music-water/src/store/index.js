import Vue from 'vue'
import Vuex from 'vuex'
import { NEW_SONGS_API} from '@/utils/apis/discover'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    blocks: [],
    title: "",
    songListArr: [],
    songsLists: [],
    playingMusic: '',
    showSongList: false,
    audioPlayState: false,
    currentTime: 0,
    duration: 0,
    liveUrl: {},
    isLogin:false,
    isLove: true,
  },
  getters: {},
  mutations: {
    // 登录
    setIsLogin(state,val){
      state.isLogin = val
    },
    // 收藏
    setChangeIsLove(state,love){
      state.isLove = love
    },
    setSongsList(state, songsLists) {
      state.songsLists = songsLists
    },
    setPlayingMusic(state, music) {
      state.playingMusic = music
    },
    showSongList(state) {
      state.showSongList = true
    },
    hideSongList(state) {
      state.showSongList = false
    },
    // 修改播放状态的方法
    setAudioPlayState(state, isPlay) {
      state.audioPlayState = isPlay
    },
    // 修改歌曲总时长
    setDuration(state, duration) {
      state.duration = duration
    },
    setCurrentTime(state, currentTime) {
      state.currentTime = currentTime
    },
    setLiveUrl(state,liveUrl) {
      state.liveUrl = liveUrl
    }

  },
  actions: {
    async getNewSong({ commit, state }, { axios }) {
      // 获取本地是否已经缓存数据
      let songsList = localStorage.songsList
      if (songsList) {
        songsList = JSON.parse(songsList)
      } else {
        let { result } = await axios(NEW_SONGS_API)
        songsList = result
      }
      commit('setSongsList', songsList)
      if (!state.playingMusic) {
        commit('setPlayingMusic', songsList[0])
      }
    },
    playMusicMergeSongsList({ commit, state }, music) {
      commit('setPlayingMusic', music)
      let index = state.songsLists.findIndex(s => s.id == music.id)
      console.log(index, music.id);
      if (index == -1) {
        let newSongsList = [music, ...state.songsLists]
        commit('setSongsList', newSongsList)
        localStorage.songsList = JSON.stringify(newSongsList)
      }
    }
  },
  modules: {}
})