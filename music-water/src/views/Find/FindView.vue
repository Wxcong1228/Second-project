<template>
 
  <div class="find">
    <transition name="move">
      <div>
    <div class="find-tab">
      <div class="tab-nav">
        <div class="tab-nav-text">发现</div>
        <div class="tab-nav-search" @click="toSearch">
          <img src="../../assets/img/sosuobaise.png" alt="" />
        </div>
      </div>
    </div>
    <van-loading class="loading" size="50px" vertical v-if="bannerImage == '' || hotArr1 == ''
    || hotSingerArr == '' ">加载中...</van-loading>
    <div class="find-all-content" ref="comicContent">
      <!-- 轮播图 -->
      
      <div class="find-lbt">
        <van-swipe class="lbt" :autoplay="3000">
          <van-swipe-item v-for="(image, index) in bannerImage" :key="index">
            <!-- <img :src="image.imageUrl" @click="TSS(image.encodeId)" /> -->
            <van-image lazy-load width="90vw" height="150px" :src="image.imageUrl"
            @click="TSS(image.encodeId)" />
          </van-swipe-item>
        </van-swipe>
      </div>
    <!-- </transition> -->

      <!-- 音乐电台 -->
      <div class="find-music">
        <div class="find-music-content">
          <div class="find-music-content-title">
            <span>音乐电台</span>
            <div class="find-music-content-title-icon" @click="TMR">
              <van-icon name="arrow" size="15px"/>
            </div>
          </div>
          <div class="content-big">
            <div class="music-content">
              <div
                class="content-songList"
                v-for="(i, index) in hotArr1"
                :key="i.id"
                @click="TR(i.id)"
              >
                <div class="fenLei">
                  <div class="fenLei-text">{{ i.name }}</div>
                  <van-image lazy-load width="33vw" height="115px" :src="bgArr1[index]" />
                </div>
              </div>
            </div>
            <div class="music-content">
              <div
                class="content-songList"
                v-for="(i, index) in hotArr2"
                :key="i.id"
                @click="TR(i.id)"
              >
                <div class="fenLei">
                  <div class="fenLei-text">{{ i.name }}</div>
                  <van-image lazy-load width="33vw" :src="bgArr[index]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 推荐歌单 -->
      <div class="song-item">
        <div class="song-item-title">
          <div class="item-title">推荐歌单</div>
          <div class="moreSong" @click="toMoreList">
            <img src="../../assets/img/baisefanhui.png" alt="" />
          </div>
        </div>
        <song-list></song-list>
      </div>

      <!-- 热门歌手  -->
      <div class="hot-singer">
        <div class="hot-singer-title">
          <span>热门歌手</span>
          <van-icon class="moreSinger" name="arrow" color="#fff" size="18px"
          @click="toAllSinger"/>
        </div>
        
        <div class="singer-list" >
          <div class="singer-list-content" v-for="item in hotSingerArr" :key="item.id"
          @click="toSeeSinger(item.id)">
            <div class="singer-list-left">
              <van-image lazy-load width="20vw" height="57.72px" :src="item.picUrl" />
              <!-- <img  v-lazy="item.picUrl" /> -->
            </div>
          <div class="singer-list-right">
            <span>{{item.name}}</span>
            <van-skeleton :row="1" v-if="hotSingerArr == ''"/>
          </div>
          </div>
        </div>
      </div>
      <!-- 排行榜 -->
      <div class="find-order">
        <van-tabs
          v-model="active"
          background="transparent"
          animated
          title-inactive-color="#656565"
          title-active-color="#fff"
          type="none"
         
        >
          <van-tab class="title" title="飙升榜">
            <div class="find-order-content">
              <div class="content-title">
                <van-icon
                  class="order-icon"
                  name="play-circle"
                  size="25px"
                  color="#00cb64"
                />
                <div class="text">播放全部</div>
                <span>(20)</span>
              </div>

              <div class="order-list">
                <div
                  class="order-item"
                  @click="TSS(item.id),addHistory(item.id)"
                  v-for="(item, index) in soarArr"
                  :key="index.id"
                >
                  <div class="item-index">
                    <div class="item-index-top">{{ index + 1 }}</div>
                  </div>
                  <div class="item-content">
                    <div class="item-content-top">{{ item.name }}</div>
                  </div>
                </div>
                <div class="order-list-footer" @click="backTop">回到顶部</div>
              </div>
            </div>
          </van-tab>
          <van-tab title="新歌榜">
            <div class="find-order-content">
              <div class="content-title">
                <van-icon
                  class="order-icon"
                  name="play-circle"
                  size="25px"
                  color="#00cb64"
                />
                <div class="text">播放全部</div>
                <span>(20)</span>
              </div>

              <div class="order-list">
                <div
                  class="order-item"
                  @click="TSS(item.id),addHistory(item.id)"
                  v-for="(item, index) in newSongArr"
                  :key="index.id"
                >
                  <div class="item-index">
                    <div class="item-index-top">{{ index + 1 }}</div>
                  </div>
                  <div class="item-content">
                    <div class="item-content-top">{{ item.name }}</div>
                  </div>
                </div>
                <div class="order-list-footer" @click="backTop">回到顶部</div>
              </div>
            </div>
          </van-tab>
          <van-tab title="原创榜">
            <div class="find-order-content">
              <div class="content-title">
                <van-icon
                  class="order-icon"
                  name="play-circle"
                  size="25px"
                  color="#00cb64"
                />
                <div class="text">播放全部</div>
                <span>(20)</span>
              </div>

              <div class="order-list">
                <div
                  class="order-item"
                  @click="TSS(item.id),addHistory(item.id)"
                  v-for="(item, index) in originalArr"
                  :key="index.id"
                >
                  <div class="item-index">
                    <div class="item-index-top">{{ index + 1 }}</div>
                  </div>
                  <div class="item-content">
                    <div class="item-content-top">{{ item.name }}</div>
                  </div>
                </div>
                <div class="order-list-footer" @click="backTop">回到顶部</div>
              </div>
            </div>
          </van-tab>
        </van-tabs>
      </div>
    </div>
  </div>
  </transition>
  </div>

</template>

<script>
import { getBannerDate, getHotDate,getHotSinger,getCount } from "@/utils/apis/discover";
import SongList from "./SongList.vue";
import { TSS } from "@/utils/apis/toSongStart";
import { TR } from "@/utils/apis/toRadio"
import { TMR } from "@/utils/apis/toMoreRadio"
import {
  getOrderDate,
  getNewSongDate,
  getOriginalDate,
} from "@/utils/apis/discover";
export default {
  components: { SongList },
  data() {
    return {
      title: "",
      songListArr: [],
      bannerImage: [],
      active: 0,
      // 飙升数组
      soarArr: [],
      //新歌
      newSongArr: [],
      //原创数组
      originalArr: [],
      hotArr: [],
      hotArr1: [],
      hotArr2: [],
      bgArr: [
        require("@/assets/img/01.jpeg"),
        require("@/assets/img/02.jpeg"),
        require("@/assets/img/03.jpeg"),
        require("@/assets/img/04.jpeg"),
        require("@/assets/img/05.jpeg"),
      ],
      bgArr1: [
        require("@/assets/img/06.jpeg"),
        require("@/assets/img/07.jpeg"),
        require("@/assets/img/08.jpeg"),
        require("@/assets/img/09.jpeg"),
        require("@/assets/img/010.jpeg"),
      ],
      historyArr:[],
      hotSingerArr:[],
      fansCount:[]
    };
  },
  created(){
    this.getHotSinger()
    this.getCount()
  },
  mounted() {
    this.getBannerDate();
    this.getOrderDate();
    this.getNewSongDate();
    this.getOriginalDate();
    this.getHotDate();
    this.getLocalStorageData()
    this.LocalStorage()
  },
  methods: {
    toSeeSinger(id){
      this.$router.push({
        path:'/singer',
        query:{
          id:id
        }
      })
    },
    toAllSinger(){
      this.$router.push({
        path:'/allSinger'
      })
    },
    getCount(){
      this.hotSingerArr.map((item)=> {
        if(this.fansCount.indexOf(item.id) == -1){
          this.fansCount.push(item.id)
        }
      })
      console.log('...',this.fansCount);
      this.fansCount.map((item)=>{
        this.axios(getCount(item)).then((data)=>{
        console.log('as',data);
      })
      })
    },
    getHotSinger(){
      this.$axios(getHotSinger).then((data) => {
        console.log("😘",data);
        this.hotSingerArr = data.artists
        console.log(this.hotSingerArr);
      })
    },
    TR,
    TMR,
    getHotDate() {
      this.$axios(getHotDate).then((data) => {
        console.log(data);
        this.hotArr = data.tags;
        this.hotArr.map((item, index) => {
          if (index <= 4) {
            this.hotArr1.push(item);
          } else {
            this.hotArr2.push(item);
          }
        });
      });
    },
    addHistory(id) {
      if (this.historyArr.indexOf(id) !== -1) {
        return
      }else {
        this.historyArr.unshift(id);
      }
      this.LocalStorage();
    },
   
    getLocalStorageData() {
      if (!localStorage.Arr) {
        localStorage.Arr = JSON.stringify([]);
        this.historyArr = JSON.parse(localStorage.Arr);
      } else {
        this.historyArr = JSON.parse(localStorage.Arr);
      }
    },
    LocalStorage() {
      localStorage.Arr = JSON.stringify(this.historyArr);
    },
    TSS,
    toSearch() {
      this.$router.push({
        path: "/search",
      });
    },
    toMoreList() {
      this.$router.push({
        path: "/moreList",
      });
    },
    getBannerDate() {
      this.$axios(getBannerDate).then((data) => {
        this.bannerImage = data.banners;
        console.log(this.bannerImage);
      });
    },
    getOrderDate() {
      this.$axios(getOrderDate).then((data) => {
        console.log(data);
        this.soarArr = data.songs;
      });
    },
    getNewSongDate() {
      this.$axios(getNewSongDate).then((data) => {
        console.log(data);
        this.newSongArr = data.songs;
      });
    },
    getOriginalDate() {
      this.$axios(getOriginalDate).then((data) => {
        console.log(data);
        this.originalArr = data.songs;
      });
    },
    backTop() {
      this.$refs.comicContent.scrollTop = 0;
    },
    toSongListDetail(id, arr) {
      this.$router.push({
        path: "/SongListDetail",
        query: {
          id: id,
          arr: arr,
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.find-all-content {
  width: 100%;
  height: calc(100vh - 105px);
  overflow: auto;
}
.find-tab {
  width: 100vw;
  height: 50px;

  .tab-nav {
    width: 100%;
    height: 100%;
    display: flex;
    // border: 1px solid black;
    // background-color: black;
    justify-content: space-between;

    .tab-nav-text {
      font-size: 20px;
      color: #edf0f1;
      padding: 15px 0 10px 15px;
    }

    .tab-nav-search {
      width: 35px;
      padding: 15px 10px 10px 0;

      img {
        width: 75%;
      }
    }
  }
}
.song-item-title {
  width: 100%;
  display: flex;
  justify-content: space-between;

  .moreSong {
    width: 8px;
    text-align: center;
    margin-top: 13px;
    margin-right: 15px;

    img {
      width: 100%;
    }
  }
}
.item-title {
  color: #edf0f1;
  font-size: 18px;
  padding: 10px 0 0 15px;
}
.song-item {
  // position: fixed;
  top: 200px;
  left: 0;
  // padding-top: 50px;
  width: 100%;
  // height: 562px;
  // background-color: #edf0f1;
}

.find-lbt {
  width: 100%;
  margin-top: 10px;
 
  .lbt {
    width: 90%;
    margin: 0 auto;
    border-radius: 10px;
      overflow: hidden;
    img {
      width: 100%;
      border-radius: 10px;
      overflow: hidden;
    }
  }
}
.find-order {
  // position: absolute;
  width: 100%;
  top: 370px;
}
.content-title {
  width: 100%;
  display: flex;
  padding: 5px 0;
  .order-icon {
    margin-left: 20px;
  }
  .text {
    color: #ddd;
    line-height: 25px;
    margin-left: 10px;
  }
  span {
    color: #aaa;
    font-size: 13px;
    line-height: 25px;
    margin-left: 3px;
  }
}

.order-list {
  width: 100%;
  .order-item {
    width: 100%;
    display: flex;
    .item-index {
      width: 10%;
      color: #ddd;
      margin-left: 5px;
      padding: 9px 0;
      text-align: center;
    }
    .item-content {
      color: #ddd;
      font-size: 14px;
      padding: 10px 5px;
    }
  }
  .order-list-footer {
    width: 80%;
    color: #ddd;
    margin: 10px auto;
    text-align: center;
    line-height: 40px;
    background-color: rgb(43, 42, 42,.6);
  }
}
.find-music {
  width: 100%;
  // background-color: #fff;

  .find-music-content {
    width: 100%;

    .find-music-content-title {
      width: 100%;
      overflow: auto;
      color: #fff;
      padding: 10px 0 10px 15px;
      font-size: 19px;
      display: flex;
      justify-content: space-between;

      .find-music-content-title-icon {
        padding-right: 10px;
      }
    }
    .music-content {
      display: flex;
      // overflow: auto;
      width: 100%;
      padding: 0 10px 10px 0;

      .content-songList {
        height: 100px;
        flex: 0 0 33vw;
        color: #fff;
        margin-left: 10px;
        // border: 1px solid #fff;
        position: relative;
        overflow: hidden;
        border-radius: 5px;
        

        img {
          width: 100%;
          height: 100%;
          overflow: hidden;
          flex-grow: 1;
          border-radius: 5px;
        }
        .fenLei-text {
          position: absolute;
          z-index: 2;
          font-size: 12px;
          top: 5px;
          left: 5px;
        }
      }
    }
  }
}
.content-big {
  width: 100%;
  overflow: auto;
}
::v-deep .van-tab {
  font-size: 15px;
  line-height: 40px;
  flex: none;
  margin-left: 20px;
}

.move-enter-from,
.move-leave-to {
 transform: translateX(100%);
}

.move-enter-active,
.move-leave-active {
transition: all 3s;
}

.move-enter-to,
.move-leave-from {
  transform: translateX(0);
}

.hot-singer {
  width: 100%;
  height: 50%;
  .hot-singer-title {
    padding: 10px 0 10px 15px;
    color: #fff;
    font-size: 17px;
    position: relative;
  }
  .moreSinger{
    position: absolute;
    right: 10px;
    bottom: 6px;
  }
  .singer-list{
    width: 100%;
    height: 88%;
    overflow: auto;
    .singer-list-content {
      width: 100%;
      padding: 10px;
      display: flex;
      .singer-list-left {
        width: 20%;
        border-radius: 10px;
        overflow: hidden;
      }
      .singer-list-right {
        width: 80%;
        padding-left: 10px;
        color: #ddd;
        padding-top: 5%;
      }
    }
  }
}
.loading {
  position: absolute;
  top: 50%;
  left: 45%;
}
</style>
