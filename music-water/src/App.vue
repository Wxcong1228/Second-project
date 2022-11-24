<template>
  <div id="app">
    <nav class="nav" v-show="$route.meta.istrue">
      <router-link class="tab-bar-item icon-find" to="/">
        </router-link>
      <router-link class="tab-bar-item icon-music" to="/music">
       <transition>
        <div class="voice-icon">
          <i></i>
          <i></i>
          <i></i>
        </div>
        </transition>
        <div class="nav-text">音乐</div>
        </router-link>
      <router-link class="tab-bar-item icon-user" to="/user">
        </router-link>
    </nav>
    <transition name="m">
    <router-view
    @setAudioCurrentTime="setAudioCurrentTime"/>
      </transition>
    <audio 
    :src="songUrl" 
    ref="audio"  
    loop
    autoplay
    @change="onChange"
    @canplay="getAudioMetaData"
    @timeupdate="audioTimeupdate"/>
  </div>
</template>


<script>
import { mapActions, mapMutations, mapState } from 'vuex'
import { getSongUrl } from '@/utils/apis/discover'
export default {
  data() {
    return {
      
    }
  },
  computed:{
    ...mapState(["showSongList","playingMusic", "audioPlayState","currentTime"]),
    songUrl() {
      return getSongUrl(this.playingMusic);
    },
  },

  methods:{
    getAudioMetaData() {
      this.setDuration(this.$refs.audio.duration)
    },
    setAudioCurrentTime(currentTime) {
      this.$refs.audio.currentTime = currentTime
    },
    audioTimeupdate() {
      this.$store.commit("setCurrentTime",this.$refs.audio.currentTime)
    },
    onChange(){
      this.$refs.audio.currentTime = this.currentTime
    },
    onPlay(){
      if(this.audioPlayState == true){
        this.$refs.audio.play()
      }else {
        this.$refs.pause()
      }
    },
    ...mapActions(["getNewSong"]),
    ...mapMutations(["hideSongList","setDuration","setCurrentTime","setAudioPlayState"]),
  },
  created() {
    this.getNewSong({ axios: this.$axios });
    this.onPlay()
  },
  watch:{
    audioPlayState(newVal, oldVal) {
      if (newVal !== oldVal) {
        if (newVal && this.audioPlayState == true) {
          this.$refs.audio.play();
        } else {
          this.$refs.audio.pause();
        }
      }
    },
  }
}
</script>
<style lang="scss" scoped>
#app {
  width: 100vw;
  height: 100vh;
  // background-color: #111;
  background: #000000;  /* fallback for old browsers */
background: -webkit-linear-gradient(to top, #434343, #000000);  /* Chrome 10-25, Safari 5.1-6 */
background: linear-gradient(to right, #434343, #000000); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */


}
.nav {
  width: 100%;
  height: 55px;
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  flex: 1;
  z-index: 999;

  .tab-bar-item {
    flex: 1;
    line-height: 50px;
    font-size: 12px;
    background-size:40px 40px;
    background-repeat: no-repeat;
    background-position: center 5px;

    .nav-text {
      text-align: center;
      margin-top: 13px;
      color: #bbb;
      font-size: 20px;
      transform: scale(.5);
   }
   &.router-link-exact-active {
    background-color: none;
    &.icon-find {
      background-image: url(../src/assets/img/tabbar/icon_discover_selected_night.png);
      color: aliceblue;
    }
    &.icon-user {
      background-image: url(../src/assets/img/tabbar/icon_me_selected_night.png);
    }
   }
  }
  .icon-find {
    background-image: url(../src/assets/img/tabbar/icon_discover_night.png);
  }
  .icon-user {
    background-image: url(../src/assets/img/tabbar/icon_me_night.png);
  }
}

.icon-music {
  position: relative;
}
.voice-icon {
        position: absolute;
        display: flex;
        justify-content: space-between;
        flex: 0 0 13px;
        width:20px;
        margin: auto;
        left: 0;
        right: 0;
        top: 15px;
       
        i {
          display: block;
          width: 2px;
          height: 10px;
          background: #ddd;
          transform-origin: left bottom;
        }
      }

      .voice-icon i {
      &:nth-child(1) {
        animation: besmall 2s linear infinite;
      }

      &:nth-child(2) {
        animation: besmall 2s linear 0.65s infinite;
      }

      &:nth-child(3) {
        animation: besmall 2s linear 1.2s infinite;
      }
    }
@keyframes besmall {
  0% {
    transform: scaleY(1.8);
  }
  25%{
    transform: scaleY(1);
  }
  50% {
    transform: scaleY(0.5);
  }
  75%{
    transform: scaleY(1.2);
  }
  100% {
    transform: scaleY(1.8);
  }
}

.m-enter,
.m-leave-to{
  transform: translateX(-100vw);
}
.m-enter-active,
.m-leave-active {
  transition: all ease-in 1s;
}

.m-enter-to,
.m-leave {
  transform: translateX(0);
}

.m-enter { transform: translateX(-100vw) }
.m-enter-to { transform: translateX(0) }

.m-enter-active { transition: all ease-in  .1s }

.m-leave { transform: translateX(0) }
.m-leave-to { transform: translateX(100vw) }

.m-leave-active { transition: all ease-in .1s}



</style>
