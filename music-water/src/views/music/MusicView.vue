<template>
  <div class="song-start">
    <!-- 背景图片 -->
    <div class="start-bg">
      <img :src="bg" alt="" />
    </div>
    <!-- 返回上一页按钮 -->
    <div class="start-fanhui">
      推荐
    </div>
    <!-- 歌曲配图 -->
    <div class="start-picUrl">
      <img :src="bg" alt="" />
    </div>
    <!-- 歌词 -->
    <div class="start-detail" @click="show1=true">
      <div class="lry-list" ref="lyricUL">
        <p
          v-for="(l, i) in lyricArr"
          :key="i"
          :class="{ selected: hightLightLyricIndex == i }"
        >
          {{ l.lyc }}
        </p>
      </div>
    </div>

    <!-- 歌曲名字与作者 -->
    <div class="start-name">
      <div class="song-name">{{ songName }}</div>
      <div class="singer-name">{{ singerName }}</div>
    </div>
    <!-- 收藏等按钮 -->
    <div class="start-btn">
      <div class="btn-left">
        <div class="start-shoucang" @click="addLove1(id)">
          <van-icon class="shouCang-icon" name="like" size="30px" color="#fff" v-if="!isLove1" />
          <van-icon
          class="shouCang-icon"
            name="like"
            ref="love"
            size="30px"
            color="red"
            v-if="isLove1"
          />
          <div>3.8w</div>
        </div>
        <div class="start-pinlun" @click="toShowComment">
          <van-icon name="chat" size="30px" color="#fff" />
          <div>{{ lengthLabel }}</div>
        </div>
        <div class="start-fenxiang" @click="changePopUpShow">
          <van-icon name="share" size="30px" color="#fff" />
          <div>2.4k</div>
        </div>
      </div>
      <div class="btn-right">
        <div class="btn-list" @click="changeShow">
          <van-icon name="bars" size="20px" color="#fff" />
        </div>
        <div class="btn-more" @click="changeMoreState">
          <van-icon name="ellipsis" color="#fff" size="22px" />
        </div>
      </div>
    </div>

    <!-- 播放进度条 -->
    <div class="progress">
     
      <!-- <div class="progress-slider"> -->
      <van-slider
        class="progress-slider"
        v-model="progressValue"
        button-size="18px"
        active-color="#eee"
        inactive-color="#aaa"
        @change="changeBar"
      />
      <!-- </div> -->
     
    </div>
    <div
        class="progress-btn"
        @click="togglePlay"
        :class="{ pause: audioPlayState }"
      ></div>
      <div class="start-prev" @click="getIndex1">
      <img src="@/assets/img/play/last_night.png">
      </div>
      <div class="start-next" @click="getIndex">
        <img src="@/assets/img/play/next_night.png">
      </div>

      <van-popup
      v-model="isShow"
      round
      position="bottom"
      :style="{ height: '70%' }"
    >
      <div class="popup">播放列表</div>
      <div class="popup-content">
        <div
          class="popup-content-item"
          v-for="d in dailySongArr"
          :key="d.id"
          @click="switchSongs(d.id),addHistory(d.id)"
        >
          <div class="popup-content-item-left">
            <img :src="d.al.picUrl" />
          </div>
          <div class="popup-content-item-right">
            <div class="popup-item-songName"  :class="{ selected1: id == d.id }">{{ d.name }}</div>
            <div class="popup-singer-item">
              <div class="popup-item-singerName" v-for="n in d.ar" :key="n.id"  :class="{ selected1: id == d.id }">
                {{ n.name }}
              </div>
            </div>
          </div>
          <van-icon class="love" name="like-o" color="#aaa" size="20px" />
        </div>
      </div>
    </van-popup>
    <!-- 分享 -->
    <van-popup
      v-model="popUpShow"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <div class="share">
        <div class="share-pic">
          <img :src="bg" alt="" />
        </div>
        <div class="share-message">
          <div class="share-message-pic">
            <img :src="bg" alt="" />
          </div>
          <div class="share-message-songName">{{ songName }}</div>
          <div class="share-message-singerName">{{ singerName }}</div>
        </div>

        <div class="share-copy" @click="onShareClick">
          <van-icon
            class="share-copy-icon"
            name="coupon-o"
            color="#fff"
            size="25px"
          />
          <span>复制链接</span>
        </div>

        <div class="close" @click="closePopUp">关闭</div>
      </div>
    </van-popup>
    <!-- 评论 -->
    <van-popup
      v-model="showComment"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <div class="comment">
        <!-- 头部导航栏 -->
        <div class="comment-tab">
          <div class="comment-fanhui" @click="toBack">
            <van-icon name="arrow-left" color="#fff" size="20px" />
          </div>
          <div class="comment-title">评论</div>
        </div>
        <!-- 评论内容 -->
        <div class="comment-content">
          <div
            class="comment-content-list"
            v-for="item in commentArr"
            :key="item.userId"
          >
            <div class="content-list-left">
              <img :src="item.user.avatarUrl" alt="" />
            </div>
            <div class="content-list-right">
              <div class="user-nickname">{{ item.user.nickname }}</div>
              <div class="content-time">{{ item.timeStr }}</div>
              <div class="content">{{ item.content }}</div>
            </div>
          </div>
        </div>
      </div>
    </van-popup>
    <!-- 更多 -->
    <van-popup
      v-model="morePopup"
      round
      position="bottom"
      :style="{ height: '20%' }"
    >
      <div class="morePopup">
        <div class="download">
          <div class="box">
            <van-icon class="box-icon" name="down" color="#ddd" size="20px"
            @click="addDownload(id)"/>
          </div>
          <span>下载</span>
        </div>
        <div class="download">
          <div class="box">
            <van-icon class="box-icon" name="smile-o" color="#ddd" size="20px"/>
          </div>
          <span>不喜欢</span>
        </div>
        <div class="download">
          <div class="box">
            <van-icon class="box-icon" name="clock-o" color="#ddd" size="20px"
            @click="changeTime()"/>
          </div>
          <span>定时关闭</span>
        </div>
        <div class="download">
          <div class="box">
            <van-icon class="box-icon" name="manager-o" color="#ddd"
             size="20px" @click="toSeeSinger(arID)"/>
          </div>
          <span>查看歌手</span>
        </div>
        <div class="download">
          <div class="box">
            <van-icon class="box-icon" name="eye-o" color="#ddd" size="20px"
            @click="toSeeAlbum(arID)"/>
          </div>
          <span>查看专辑</span>
        </div>
        <div class="download">
          <div class="box">
            <van-icon class="box-icon" name="flag-o" color="#ddd" size="20px"/>
          </div>
          <span>歌曲信息反馈</span>
        </div>
        <div class="download">
          <div class="box">
            <van-icon class="box-icon" name="warning-o" color="#ddd" size="20px"
            @click="changeTime1()"/>
          </div>
          <span>举报</span>
        </div>
      </div>
    </van-popup>
    <!-- 定时关闭 -->
    <van-popup
      v-model="time"
      round
      position="bottom"
      :style="{ height: '25%' }"
    >   
    <div class="popup-time">
      <div class="popup-time-title">定时关闭</div>
      <div class="popup-time-select">
        <div :class="{active1 : active == 0}" @click="changeActive(0)">关闭</div>
        <div :class="{active1 : active == 1}" @click="changeActive(1)">10</div>
        <div :class="{active1 : active == 2}" @click="changeActive(2)">20</div>
        <div :class="{active1 : active == 3}" @click="changeActive(3)">30</div>
        <div :class="{active1 : active == 4}" @click="changeActive(4)">60</div>
        <div :class="{active1 : active == 5}" @click="changeActive(5)">90</div>
      </div>
    </div>
    </van-popup>

    <van-popup
      v-model="show2"
      round
      position="bottom"
      :style="{ height: '45%' }"
    >   
      <div class="report">
        <div class="report-content">
          <div class="report-content-title">选择举报类型</div>
          <div class="report-list">
            <div>色情低俗</div>
            <div>时政不实内容</div>
            <div>违法违规</div>
            <div>未成年保护</div>
            <div>音乐侵权</div>
            <div>引人不适</div>
            <div>其他</div>
          </div>
        </div>
      </div>
    </van-popup>

    <van-overlay :lock-scroll="false" :show="show1">
  <div class="wrapper">
    <div class="show-detail"  @click=" show1=false ">
        <div class="detail-content">
            <div class="detail-top">
                <div class="detail-song-picUrl">
                    <img :src="bg" alt="">
                </div>
                <div class="detail-content-text">
                    <div class="detail-songName">{{songName}}</div>
                    <div class="detail-singerName">{{singerName}}</div>
                </div>
            </div>
            <div class="detail-list">
            <div class="detail-bottom" v-for=" item,index in lyricArr" :key="index" ref="lyricUL1">
                <p 
                :class="{ selected: hightLightLyricIndex == index }" >
                    {{item.lyc}}
                </p>
            </div>
          </div>
        </div>
    </div>
  </div>
     </van-overlay>
    </div>

</template>

<script>
import { getToDetailDate,getDailySongDate } from "@/utils/apis/discover";
import { TB } from "@/utils/apis/toBack";
import { getLryic } from "@/utils/apis/discover";
import { mapActions, mapMutations, mapState } from "vuex";
import { getComment } from "@/utils/apis/discover";
import { TC } from "@/utils/apis/toComment";
import { getSongDetail } from "@/utils/apis/index";
import { Toast } from 'vant';
// import { Toast } from 'vant';
export default {
  data() {
    return {
      time:false,
      active:0,
      isLoading: false,
      id:'',
      bg: "",
      songName: "",
      singerName: "",
      value: 0,
      commentArr: [],
      length: "",
      lrcStr: "",
      showLyrc: false,
      detailArr1:[],
      index1:'',
      isShow: false,
      dailySongArr:[],
      // isLove1:false,
      popUpShow: false,
      showComment: false,
      morePopup: false,
      getLoveArr:[],
      arr:[],
      downloadArr:[],
      arID:'',
      show1:false,
      show2:false,
    };
  },
  computed: {
    isLove1() {
      if (this.getLoveArr.indexOf(this.id) == -1) {
        console.log('true');
        return false;
      }
      return true;
    },
    // 歌词解析获取歌词数组
    lyricArr() {
      let res = [];
      const lyrReg = /^\[(\d+):(\d+\.\d+)\](.*)/gim;

      while (lyrReg.test(this.lrcStr)) {
        let m = RegExp.$1 * 60;
        let time = Math.ceil((m + parseFloat(RegExp.$2)) * 1000) / 1000;
        res.push({
          time,
          lyc: RegExp.$3,
        });
      }
      return res;
    },
    ...mapState(["playingMusic", "audioPlayState", "duration", "currentTime"]),
    progressValue: {
      get() {
        return (this.currentTime / this.duration) * 100;
      },
      set(value) {
        let currentTime = (value / 100) * this.duration;
        this.$emit("setAudioCurrentTime", currentTime);
      },
    },

    // 获取高亮歌词的下标
   hightLightLyricIndex() {
      let index = 0;
      for (let i = 0; i < this.lyricArr.length; i++) {
        // 解决最后一句没有下一句的bug
        if (i >= this.lyricArr.length - 1) {
          index = i;
          break;
        }
        let time = this.lyricArr[i].time;
        // bug 最后一句话没有下一句话
        let nextTime = this.lyricArr[i + 1].time;
        if (this.currentTime >= time && this.currentTime < nextTime) {
          index = i;
          break;
        }
        // if(i === index) {
        //   this.$refs.lyricUL.style.transform = `translateY(${-(i * 60)}px)`
        // }
      }
      return index;
    },
    lengthLabel() {
      let res = this.length;
      if (this.length >= 10000 && this.length < 100000) {
        res = Math.floor(res / 1000) / 10 + "w";
      } else if (this.length >= 100000) {
        res = Math.floor(res / 10000) + "w";
      } else if (this.length >= 1000) {
        res = Math.floor(res / 100) / 10 + "k";
      }
      return res;
    },
  },
  mounted() {
    this.getDailySongDate()
    this.getComment();
    this.getLyricData();
    this.getPlayId()
    this.Love(this.id)
    this.getToDetailDate();
  },
  methods: {
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
    changeShow1(){
      this.show1 = false
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
    changeActive(val){
      this.active = val
      if(this.active == 1){
        Toast('10分钟后关闭')
      }else if(this.active == 2){
        Toast('20分钟后关闭')
      }else if(this.active == 3){
        Toast('30分钟后关闭')
      }else if(this.active == 4){
        Toast('60分钟后关闭')
      }else if(this.active == 5){
        Toast('90分钟后关闭')
      }else{
        return
      }
    },
    changeTime(){
      this.time = !this.time
      this.morePopup = !this.morePopup
    },
    changeTime1(){
      this.show2 = !this.show2
  this.morePopup = !this.morePopup
    },
    onRefresh() {
      setTimeout(() => {
        Toast('刷新成功');
        this.isLoading = false;
        this.count++;
      }, 1000);
    },
    Love(id){
      this.arr= this.getLoveArr.slice(1)
      console.log('👌',this.arr);
      if(this.arr.indexOf(id) > -1){
        this.isLove1 = true
      }else {
        this.isLove1 = false
      }
    },
    LocalStorage() {
      localStorage.LoveArr = JSON.stringify(this.getLoveArr)
      localStorage.Arr = JSON.stringify(this.historyArr);
      localStorage.download = JSON.stringify(this.downloadArr)
    },
    changeLove(id) {
      console.log('💖',id);
      this.isLove1 = !this.isLove1
      if(this.isLove1 == true && this.getLoveArr.indexOf(parseInt(id)) == -1){
        this.getLoveArr.push({
          id:id
        })
      }
      console.log('hfjgh',this.getLoveArr);
      this.LocalStorage()
      this.changeThisLove()
    },
    changeThisLove(){
      this.getLoveArr.forEach((item)=> {
        if(this.id == item) {
          this.isLove1 = true
        }else {
          this.isLove = false
        }
      })
    },
    changeMoreState(){
      this.morePopup = !this.morePopup
    },
    toShowComment() {
      this.showComment = !this.showComment;
    },
    toBack() {
      this.showComment = false;
    },
    onShareClick() {
      Toast("复制成功");
    },
    addHistory(id) {
      if (this.historyArr.indexOf(id) !== -1) {
        return
      }else {
        this.historyArr.unshift(id);
      }
      this.LocalStorage();
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
    getDailySongDate(){
      this.$axios(getDailySongDate).then((data)=> {
        this.dailySongArr = data.data.dailySongs
        console.log('🤦‍♂️',this.dailySongArr);
        this.id = this.dailySongArr[0].id
        this.getToDetailDate(this.id);
        this.getComment(this.id);
        console.log("cc",this.id);
      })
     
    },
    goToShare(bg, songName, singerName) {
      this.$router.push({
        path: "/share",
        query: {
          bg: bg,
          songName: songName,
          singerName: singerName,
        },
      });
    },
    closePopUp() {
      this.popUpShow = false;
    },
    switchSongs(val){
      this.id = val
      this.getToDetailDate()
        this.getPlayId()
        this.getLyricData()
    },

    changeShow(){
      this.isShow = !this.isShow
    },
    changePopUpShow() {
      this.popUpShow = !this.popUpShow;
    },
// 下一首
    getIndex(){
      this.dailySongArr.map((item,index) => {
        if(this.id == item.id){
         this.index1 = index
        }
      })
      if(this.index1 == (this.dailySongArr.length-1)){
        Toast("已经是最后一首了")
      }else {
        this.id = this.dailySongArr[(this.index1+1)].id
        console.log('ccccc',this.id);
        this.getToDetailDate()
        this.getPlayId()
        this.getLyricData()
      }
      
    },
    // 上一首
    getIndex1(){
      this.dailySongArr.map((item,index) => {
        if(this.id == item.id){
         this.index1 = index
        }
      })
      if(this.index1 == 0){
        Toast("已经是第一首了")
      }else {
        this.id = this.dailySongArr[(this.index1-1)].id
        console.log('ccccc',this.id);
        this.getToDetailDate()
        this.getPlayId()
        this.getLyricData()
      }
    },
    // 将当前id传给audio
    getPlayId() {
      this.$store.commit("setPlayingMusic", this.id);
      return this.$route.query.id;
    },
    // 改变播放状态
    getPlayState() {
      this.$store.commit("setAudioPlayState", this.palying);
    },
    // getLocalStorageData() {
    //   if (!localStorage.detailArr) {
    //     localStorage.detailArr = JSON.stringify([]);
    //     this.detailArr1 = JSON.parse(localStorage.detailArr);
    //     console.log('asdfg',this.detailArr1);
    //   } else {
    //     this.detailArr1 = JSON.parse(localStorage.detailArr);
    //     console.log('34r',this.detailArr1);
    //   }
    // },
    ...mapMutations([
      "setAudioPlayState",
      "showSongList",
      "setAudioPlayState",
      "setCurrentTime",
    ]),
    ...mapActions(["playMusicMergeSongsList"]),
    inputBar() {
      return (this.duration / 100) * this.value;
    },
    changeBar() {
      this.value = (this.currentTime / 100) * this.duration;
    },

    togglePlay() {
      this.setAudioPlayState(!this.audioPlayState);
    },
    onChange() {
      this.$store.commit("setCurrentTime", this.value);
      console.log("ccc", this.value);
    },
    TC,
    TB,
    toShowSongDetail(arr, songName, singerName, bg) {
      this.$router.push({
        path: "/showSongDetail",
        query: {
          arr: arr,
          songName: songName,
          singerName: singerName,
          bg: bg,
        },
      });
    },
    getID() {
      console.log(this.id);
    },
    getToDetailDate() {
      console.log('😁',this.id);
      this.$axios(getToDetailDate(this.id)).then((res) => {
        console.log('dfg',res);
        this.songName = res.songs[0].name;
        this.singerName = res.songs[0].ar[0].name;
        this.bg = res.songs[0].al.picUrl;
        this.arID = res.songs[0].ar[0].id
      });
    },
    mergeMusicIDAndPlayingMusicDiff() {
      if (this.id == this.playingMusic.id) {
        console.log("相等");
      } else {
        console.log("不同");
        this.getSongDetailData();
      }
    },
    async getLyricData() {
      let { lrc } = await this.$axios(getLryic(this.id));
      this.lrcStr = lrc?.lyric;
      console.log("c", lrc);
    },
    async getSongDetailData() {
      let url = getSongDetail(this.id);
      let { songs } = await this.$axios(url);

      if (!songs) {
        this.$router.replace("/");
        return;
      }

      let { id, name, al, alia, ar } = songs[0];
      if (id) {
        let song = {
          id,
          name,
          picUrl: al.picUrl,
          song: {
            alias: alia,
            artists: ar,
          },
        };
        this.playMusicMergeSongsList(song);
      }
    },
    getComment() {
      this.$axios(getComment(this.id)).then((data) => {
        console.log("ad", data);
        this.commentArr = data.comments;
        this.length = data.total;
        console.log('sdf',this.commentArr);
      });
    },
  },
  watch: {
    progressValue(val) {
      this.value = 100 * (val / this.duration);
    },
    hightLightLyricIndex() {
      let index = 0;
      for (let i = 0; i < this.lyricArr.length; i++) {
        let time = this.lyricArr[i].time;
        let nextTime = this.lyricArr[i + 1].time;
        if (this.currentTime >= time && this.currentTime < nextTime) {
          index = i;
          this.$refs.lyricUL.style.transform = `translateY(${-(i * 60)}px)`;
          break;
        }
      }
      return index;
    },
    lyricArr() {
      let res = [];
      const lyrReg = /^\[(\d+):(\d+\.\d+)\](.*)/gim;

      while (lyrReg.test(this.lrcStr)) {
        let m = RegExp.$1 * 60;
        let time = Math.ceil((m + parseFloat(RegExp.$2)) * 1000) / 1000;
        res.push({
          time,
          lyc: RegExp.$3,
        });
      }
      return res;
    },
    getPlayId(newId, oldId) {
      if (newId !== oldId) {
        this.getLyricData();
        this.$store.commit("setAudioPlayState", false);
        this.getPlayState();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }
  .show-detail {
    width:100vw;
    height: 100%;
    color: #fff;
    background-color: #333131;

    .detail-content {
        width: 100%;
        height: 100%;
        .detail-top {
            width: 100%;
            padding: 20px;
            display: flex;

            .detail-song-picUrl {
                width: 20%;
                border-radius: 10px;
                overflow: hidden;
                
                img {
                    width: 100%;
                }
            }
            .detail-content-text {
                padding: 10px;

                .detail-songName {
                    font-size: 20px;
                }
                .detail-singerName {
                    padding-top: 10px;
                    color: #aaa;
                }
            }
        }
        .detail-list {
          width: 100%;
            height: calc(100vh - 100px);
            overflow: auto;
        }
        .detail-bottom {
            width: 100%;
            height: 56px;
            p{
              width: 100%;
              height: 56px;
              box-sizing: border-box;
                font-size: 16px;
                color: #ddd;
                padding: 20px 0 20px 20px;
            }
            .selected {
                color: red;
            }
        }
    }
}
* {
  padding: 0;
  margin: 0;
  border: 0;
}
.song-start {
  width: 100%;
  height: 100%;
  // transition: ;
  position: relative;

  .start-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: white;
    // backdrop-filter: blur(100px);
    filter: blur(50px);
    z-index: 0;

    img {
      width: 100%;
      height: 100%;
    }
  }
  .start-fanhui {
    position: absolute;
    top: 15px;
    left: 15px;
    width: 20%;
    color: #ddd;
    font-size: 20px;
    // z-index: 2;

    img {
      width: 100%;
    }
  }
  .start-picUrl {
    position: absolute;
    width: 70%;
    left: 0;
    right: 0;
    top: 60px;
    margin: 0 auto;
    border-radius: 20px;
    overflow: hidden;
    // z-index: 2;
    // background-color: red;

    img {
      width: 100%;
    }
  }
  .start-name {
    position: absolute;
    bottom: 230px;
    width: 80%;
    left: 20px;

    .song-name {
      color: #f8f8f8;
      font-size: 18px;
      font-weight: bold;
      // font: inherit;
    }
    .singer-name {
      color: #eee;
      font-size: 15px;
      margin-top: 5px;
    }
  }
  .start-btn {
    position: absolute;
    bottom: 180px;
    display: flex;
    justify-content: space-between;
    .btn-left {
      display: flex;
      .start-shoucang {
        margin-left: 15px;
        display: flex;
        .shouCang-icon{
          animation: small 1s linear;
        }
        div {
          color: #ddd;
        }
      }
      .start-pinlun {
        margin-left: 15px;
        display: flex;
        div {
          color: #ddd;
        }
      }
      .start-fenxiang {
        margin-left: 15px;
        display: flex;
        div {
          color: #ddd;
        }
      }
    }
    .btn-right {
      display: flex;
      margin-right: 20px;

      .btn-list {
        margin-left: 70px;
        margin-top: 5px;
      }
      .btn-more {
        margin-left: 15px;
        // margin-right: 15px;
        transform: rotateZ(90deg);
      }
    }
  }
  .start-detail {
    width: 100%;
    height: 60px;
    position: absolute;
    bottom: 250px;
    overflow: hidden;
    .lry-list {
      width: 100%;
      height: 100%;

      p {
        width: 100%;
        font-size: 14px;
        height: 60px;
        color: #ddd;
        padding: 0px 0 0px 20px;
        overflow: hidden;
        box-sizing: border-box;
      }
      .selected {
        color: #66cfa2;
      }
    }
  }
  .progress {
    width: 100%;
    height: 40px;
    bottom: 120px;
    left: 0;
    position: absolute;
    display: flex;
    .progress-slider {
      width: 90%;
      margin-top: 5%;
      margin-left: 5.5%;
    }
    
  }
  .progress-btn {
      position: absolute;
      bottom: 11.5%;
      left: 45%;
      width: 40px;
      height: 40px;
      color: #fff;
      // margin-left: 15px;
      background-size: 100% 100%;
      background-repeat: no-repeat;
      background-position: center 5px;
      background-image: url(@/assets/img/play/player_play_night.png);

      &.pause {
        background-image: url(@/assets/img/play/player_pause_night.png);
      }
    }
    .progress-btn1 {
      width: 20px;
      // height: 30px;
      color: #fff;
      margin-left: 15px;
      background-size: 20px 30px;
      background-repeat: no-repeat;
      background-position: center 5px;
      background-image: url(@/assets/img/play/player_play_night.png);
    }
  .start-prev {
    position: absolute;
    width: 40px;
    height: 40px;
    bottom: 11%;
    left: 30%;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .start-next {
    position: absolute;
    width: 40px;
    height: 40px;
    bottom: 11%;
    left: 60%;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
.popup {
  width: 100%;
  padding: 10px 15px;
  font-size: 18px;
  color: #ddd;
}
.popup-content {
  width: 100%;
  height: 91%;
  overflow: auto;
  .popup-content-item {
    position: relative;
    width: 100%;
    padding: 10px;
    display: flex;
    // color: #ccc;
    .popup-content-item-left{
      width: 15%;

      img{
        width: 100%;
        border-radius: 10px;
      }
    }
    .popup-content-item-right {
      width: 75%;
      margin-left: 10px;
      color: #ccc;
      .popup-item-songName {
        font-size: 14px;
        padding-top: 5%;
        
      }
      .popup-singer-item {
        display: flex;
        margin-top: 3%;
        .popup-item-singerName {
        font-size: 12px;
        // color: #aaa;
      }
      }
      
    }
    .love {
      position: absolute;
      top: 40%;
      right: 25px;
    }
  }
}

::v-deep .van-popup {
  background-color: #3c3c3c;
}
.selected1 {
        color: red;
      }

      .share {
  width: 100%;
  height: 100%;
  position: relative;

  .share-pic {
    width: 100%;
    height: 100vh;
    filter: blur(50px);
    z-index: 0;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .share-message {
    width: 100%;
    position: absolute;
    // z-index: 2;
    top: 50px;
    text-align: center;

    .share-message-pic {
      width: 40%;
      margin: 0 auto;

      img {
        width: 100%;
        border-radius: 10px;
      }
    }
    .share-message-songName {
      color: #eee;
      font-size: 18px;
      margin: 10px 0;
    }
    .share-message-singerName {
      color: #bbb;
      font-size: 14px;
    }
  }
  .share-copy {
    width: 100%;
    position: absolute;
    top: 300px;
    padding-left: 15px;
    display: flex;
    align-items: center;

    .share-copy-icon {
      line-height: 20px;
    }

    span {
      font-size: 14px;
      color: #ddd;
      margin-left: 10px;
    }
  }
  .close {
    width: 100%;
    position: absolute;
    bottom: 10px;
    padding: 20px 0;
    text-align: center;
    color: #ddd;
  }
}
.comment {
  width: 100vw;
  height: 100vh;

  .comment-tab {
    width: 100vw;
    height: 50px;
    line-height: 50px;
    text-align: center;
    position: relative;

    .comment-fanhui {
      left: 15px;
      position: absolute;
    }

    .comment-title {
      color: #fff;
    }
  }
  .comment-content {
    width: 100%;
    height: 617px;
    overflow: auto;

    .comment-content-list {
      display: flex;
      width: 100%;
      // background-color: #fff;
      padding: 15px 15px 15px 5px;
      .content-list-left {
        width: 40px;
        height: 40px;
        margin-left: 15px;

        img {
          width: 100%;
          height: 100%;
          // overflow: hidden;
          border-radius: 999px;
        }
      }
      .content-list-right {
        width: 300px;
        margin-left: 10px;

        .user-nickname {
          color: #fff;
        }
        .content-time {
          font-size: 12px;
          color: #fff;
          margin-top: 10px;
        }
        .content {
          color: #fff;
          margin-top: 10px;
        }
      }
    }
  }
}
.morePopup {
  width: 100%;
  display: flex;
  // line-height: 100px;
  // overflow: auto;
  .download{
    flex: 0 0 27vw;
    width: 100%;
    height: 100%;
    padding-top: 9%;

  .box {
        width: 45px;
        height: 45px;
        margin-top: 40%;
        border-radius: 999px;
        background-color: rgb(255, 255, 255,.1);
        text-align: center;
        margin: auto;
        .box-icon{
          margin-top: 27%;
        }
  }
  span {
    display: block;
    // width: 90px;
    margin-top: 10px;
    text-align: center;
    color: #ddd;
  }
}
}
.popup-time {
  width: 100%;
  height: 100%;
  padding: 20px;
  .popup-time-title {
    width: 100%;
    color: #ddd;
    font-size: 19px;
   
  }
  .popup-time-select {
    width: 100%;
    display: flex;
    color: #aaa;
    // padding: 20px;
    // border: 1px solid ;
    border-radius: 10px;
    margin-top: 30px;
    padding: 3px;
    background-color: rgb(245, 244, 244,.1);
    div {
      width: 16.62%;
      text-align: center;
      padding: 20px 0;
    }
  }
}
.report {
  width: 100%;
  height: 100%;
  .report-content {
    width: 100%;
    height: 100%;
    .report-content-title {
      width: 100%;
      padding: 20px 0 0 15px;
      color: #fff;
      font-size: 16px;
    }
    .report-list {
      width: 100%;
      padding: 10px 0 10px 15px;
      div {
        width: 100%;
        padding: 10px 0;
        color: #ccc;
        font-size: 15px;
      }
    }
  }
}
.active1 {
  background-color: #e1e1e1;
  color: #57565d;
  border-radius: 10px;
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