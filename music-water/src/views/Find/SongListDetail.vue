<template>
  <div class="SongListDetail">
    <!-- <div class="song-detail-tab"> -->
      <div class="detail-TB" @click="TB">
        <img src="../../assets/fanhuibgg.png" alt="" />
      </div>
      <!-- <div class="song-detail-tab-title">歌单详情</div> -->
    <!-- </div> -->
    <div class="song-detail-bg">
        <div class="bg-pic">
          <img :src="imgUrl" alt="" />
        </div>
        <div class="bg-text">{{ text }}</div>
      </div>

    <!-- 背景图 -->
    <div class="song-detail-content">
      <!-- 播放全部 -->
      <div class="song-detail-list-title">
        <div class="detail-btn">
          <img src="../../assets/img/play/player_play_night.png" alt="" />
        </div>
        <div class="song-detail-title-text">
          <div class="playAll" @click="playAll(cid)">播放全部</div>
          <div class="detail1">
            <van-icon name="down" />
          </div>
          <div class="detail2">
            <van-icon name="bars" />
          </div>
        </div>
      </div>

      <!-- 歌单列表 -->
      <div class="detail-songList" v-for="(d, i) in detailArr" :key="i.id">
        <div class="detail-left" @click="TSS(d.id), addHistory(d.id)">
          {{ i + 1 }}
        </div>
        <div class="detail-right" @click="TSS(d.id), addHistory(d.id)">
          <div class="detail-name">{{ d.name }}</div>
          <div class="Singer-name">{{ d.ar[0].name }}</div>
        </div>
        <van-icon
          class="detail-icon1"
          name="ellipsis"
          color="#bbb"
          size="20px"
          @click="changShow(d.id)"
        />
      </div>
      <van-popup
        v-model="show"
        round
        position="bottom"
        :style="{ height: '63%' }"
      >
        <div class="popup-content">
          <div class="popup-title">
            <div class="popup-left-pic">
              <img :src="bg" alt="" />
            </div>
            <div class="popup-right-text">
              <div class="popup-songName">{{ songName }}</div>
              <div class="popup-singerName">{{ singerName }}</div>
            </div>
          </div>
          <div class="popup-icon">
            <div class="popup-icon-item" @click="addLove1(ID)">
              <div class="love-icon">
                <van-icon name="like" color="red" size="25px" v-if="isLove1"/>
              <van-icon name="like-o" color="#bbb" size="25px" v-if="!isLove1"/>
             
            </div>
              <div class="popup-icon-item-text">喜欢</div>
            </div>
            <div class="popup-icon-item" @click="toClick1">
              <van-icon name="descending" color="#bbb" size="25px" />
              <div class="popup-icon-item-text" >下一首播放</div>
            </div>
            <div class="popup-icon-item" @click="toClick">
              <van-icon name="music-o" color="#bbb" size="25px" />
              <div class="popup-icon-item-text">添加到歌单</div>
            </div>
            <div
              class="popup-icon-item"
              @click="toShare(bg, songName, singerName)"
            >
              <van-icon name="share-o" color="#bbb" size="25px" />
              <div class="popup-icon-item-text">分享</div>
            </div>
            <div class="popup-icon-item" @click="addDownload(songID)">
              <van-icon name="down" color="#bbb" size="25px" />
              <div class="popup-icon-item-text">下载</div>
            </div>
            <div class="popup-icon-item" @click="toSeeSinger(arID)">
              <van-icon name="manager-o" color="#bbb" size="25px" />
              <div class="popup-icon-item-text">查看歌手</div>
            </div>
            <div class="popup-icon-item" @click="toSeeAlbum(arID)">
              <van-icon name="fire-o" color="#bbb" size="25px" />
              <div class="popup-icon-item-text">查看专辑</div>
            </div>
          </div>
        </div>
      </van-popup>
    </div>
  </div>
</template>

<script>
import { TB } from "@/utils/apis/toBack";
import { getSongListDate } from "@/utils/apis/discover";
import { mapMutations, mapState } from "vuex";
import { TSS } from "../../utils/apis/toSongStart";
import { getSongDetail, getToDetailDate } from "@/utils/apis/discover";
import { Toast } from 'vant';
export default {
  data() {
    return {
      id: this.$route.query.id,
      blocks2: "",
      detailArr: [],
      imgUrl: "",
      text: "",
      show: false,
      songName: "",
      singerName: "",
      bg: "",
      cid: "",
      historyArr: [],
      arID:'',
      downloadArr:[],
      songID:'',
      getLoveArr:[],
      ID:''
    };
  },
  created() {
    this.getId();
    this.getSongListDate();
    this.getDate1();
    this.getLocalStorageData()
  },
  computed:{
    isLove1() {
      if (this.getLoveArr.indexOf(this.ID) == -1) {
        console.log('true');
        return false;
      }
      return true;
    },
  },
  methods: {
    ...mapState([""]),
    ...mapMutations([""]),
    addLove1(id) {
      console.log(234325152435);
      // this.isLove1 == !this.isLove1
      if (this.getLoveArr.indexOf(id) == -1) {
        this.getLoveArr.unshift(id);
        this.LocalStorage();
      } else if (this.isLove1 == true && this.getLoveArr.indexOf(id) !== -1) {
        console.log(1656);
        console.log('aa',this.getLoveArr);
        this.getLoveArr=this.getLoveArr.filter((item,index) => index !== this.getLoveArr.indexOf(id));
        this.LocalStorage();
        console.log('aa1',this.getLoveArr);
      } 
    },
    // 检查是否获取到过来的id
    getId() {
      console.log(this.id);
    },
    addDownload(id){
      console.log('ss',id);
      if (this.downloadArr.indexOf(id) !== -1) {
        Toast('已经下载了')
      }else {
        this.downloadArr.unshift(id);
        Toast('下载成功')
      }
      this.LocalStorage();
    },
    playAll(cid) {
      this.LocalStorage();
      this.TSS(cid);
    },
    toClick(){
      Toast('已加到歌单中')
    },
    toClick1(){
      Toast('添加到队列成功')
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
        this.downloadArr = JSON.parse(localStorage.download)
        this.getLoveArr = JSON.parse(localStorage.LoveArr);
      }
    },
    LocalStorage() {
      localStorage.LoveArr = JSON.stringify(this.getLoveArr);
      localStorage.detailArr = JSON.stringify(this.detailArr);
      localStorage.Arr = JSON.stringify(this.historyArr);
      localStorage.download = JSON.stringify(this.downloadArr)
    },
    // 是否显示弹出框
    changShow(id) {
      this.show = !this.show;
      this.getToDetailDate(id);
      this.ID = id
    },
    // 跳转到分享页面
    toShare(bg, songName, singerName) {
      this.$router.push({
        path: "/share",
        query: {
          bg: bg,
          songName: songName,
          singerName: singerName,
        },
      });
    },
    toSeeAlbum(id){
      this.$router.push({
        path:'/Album',
        query:{
          id:id
        }
      })
    },
    toSeeSinger(id){
      this.$router.push({
        path:'/singer',
        query:{
          id:id
        }
      })
    },

    // 获取歌曲的详情
    getToDetailDate(val) {
      this.$axios(getToDetailDate(val)).then((res) => {
        console.log('ff',res);
        this.songName = res.songs[0].name;
        this.singerName = res.songs[0].ar[0].name;
        this.bg = res.songs[0].al.picUrl;
        this.arID = res.songs[0].ar[0].id
        this.songID = res.songs[0].id
      });
    },
    TB,
    TSS,
    // 获取歌单里的歌曲列表
    getSongListDate() {
      this.$axios(getSongListDate(this.id)).then((res) => {
        this.detailArr = res.songs;
        this.cid = this.detailArr[0].id;
      });
    },
    // 获取歌单详情页的背景图片
    getDate1() {
      this.$axios(getSongDetail(this.id)).then((res) => {
        this.blocks2 = res.playlist;
        this.imgUrl = this.blocks2.coverImgUrl;
        this.text = this.blocks2.name;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.SongListDetail {
  width: 100vw;
  height: 100vh;
  position: relative;

  .song-detail-tab {
    position: relative;
    width: 100vw;
    height: 50px;
    background-color: transparent;

    .song-detail-tab-title {
      color: white;
      font-size: 18px;
      line-height: 50px;
      text-align: center;
    }
  }

  .detail-TB {
    position: absolute;
    width: 26px;
    top: 12px;
    left: 10px;
    z-index: 3;
    img {
      width: 100%;
    }
  }
  .song-detail-content {
    width: 100%;
    height: 418px;
    overflow: auto;

   
    .song-detail-list-title {
      width: 100%;
      height: 40px;
      background-color: transparent;
      display: flex;
      position: relative;

      .detail-btn {
        width: 25px;
        height: 25px;
        text-align: center;
        border-radius: 999px;
        margin-left: 15px;
        margin-top: 7px;
        background-color: #00cb64;

        img {
          width: 80%;
          height: 80%;
          margin-top: 2px;
        }
      }
      .song-detail-title-text {
        color: #ddd;
        display: flex;
        height: 40px;
        line-height: 40px;
        margin-left: 10px;
        font-size: 14px;
        span {
          font-size: 12px;
          color: #aaa;
          margin-left: 5px;
        }
      }
      .detail1 {
        position: absolute;
        right: 40px;
        // top: 0;
      }
      .detail2 {
        position: absolute;
        right: 10px;
        // top: 0;
      }
    }
    .detail-songList {
      width: 100%;
      height: 40px;
      display: flex;
      margin-bottom: 10px;

      .detail-left {
        width: 10%;
        height: 40px;
        line-height: 40px;
        text-align: center;
        color: #bbb;
      }
      .detail-right {
        width: 90%;
        height: 40px;
        font-size: 14px;
        padding-top: 4px;
        padding-left: 5px;
        color: #fff;
        .Singer-name {
          color: #aaa;
          font-size: 12px;
          margin-top: 5px;
        }
      }
    }
  }
}
.detail-icon1 {
  transform: rotateZ(90deg);
  margin-right: 20px;
}
.van-popup {
  background-color: #292929;
}
.popup-icon-item {
  width: 100%;
  padding: 10px;
  display: flex;
  .love-icon {
      animation: small 1s linear;
    }
  .popup-icon-item-text {
    font-size: 15px;
    line-height: 25px;
    color: #bbb;
    margin-left: 10px;
    
  }
}
.popup-title {
  width: 100%;
  padding: 10px;
  display: flex;
  .popup-left-pic {
    width: 20%;

    img {
      width: 100%;
      border-radius: 10px;
    }
  }
  .popup-right-text {
    margin-left: 10px;
    padding: 20px 0;

    .popup-songName {
      font-size: 18px;
      color: #fff;
    }
    .popup-singerName {
      color: #aaa;
      margin-top: 10px;
      font-size: 14px;
    }
  }
}
.song-detail-bg {
      width: 100vw;
      position: relative;
      .bg-pic {
        width: 100%;
        height: 250px;
        overflow: hidden;
        img {
          width: 100%;
          // height: 100%;
        }
      }
      .bg-text {
        position: absolute;
        width: 100%;
        height: 40px;
        bottom: 0;
        left: 0;
        font-size: 18px;
        font-weight: bold;
        padding: 10px;
        color: #fff;
        background-color: rgba(9, 8, 8, 0.4);
      }
    }
    @keyframes small {
  0% {
    transform: scale(1.2);
  }
  25% {
    transform: scale(1);
  }
  50% {
    transform: scale(0.9);
  }
  75% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}
</style>