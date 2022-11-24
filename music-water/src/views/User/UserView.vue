<template>
  <div class="user">
    <div class="user-tab">
      <van-icon class="setting" name="setting-o" color="#fff" size="20px" />
    </div>
    <div class="user-login">
      <div class="login-left">
        <van-uploader  v-model="fileList" multiple :max-count="1" />
        <!-- <van-uploader :after-read="afterRead" /> -->
      </div>
      <div class="user-center">
        <div class="user-text">关注</div>
        <div class="count">0</div>
      </div>
      <div class="user-center">
        <div class="user-text">粉丝</div>
        <div class="count">0</div>
      </div>
    </div>

    <div class="login-name">
      <div class="login-name-text" v-show="isLogin" @click="toLogin">
        <span>登录</span>
      </div>
      <div class="login-name-text" v-show="isLogin" @click="toLogin">
        <span>{{username}}</span>
      </div>
    </div>

    <div class="select-tab">
      <van-tabs v-model="active" background="rgb(86, 79, 79,.1)"
          animated
          title-inactive-color="#656565"
          title-active-color="#fff"
          type="none"
          sticky>
        <van-tab title="喜欢">
          <div class="history-content">
            <div class="history-content-item" v-for="item in loveArr1" :key="item.id"
            @click="TSS(item.id)">
            <div class="history-content-left">
              <img :src="item.al.picUrl" alt="">
            </div>
            <div class="history-content-right">
              <div class="history-content-right-songName">{{item.al.name}}</div>
              <div class="history-content-right-singerName">{{item.ar[0].name}}</div>
            </div>
          </div>
          </div>
        </van-tab>
        <van-tab title="下载">
          <div class="history-content">
            <div class="history-content-item" v-for="item in downloadArr1" :key="item.id"
            @click="TSS(item.id)">
            <div class="history-content-left">
              <img :src="item.al.picUrl" alt="">
            </div>
            <div class="history-content-right">
              <div class="history-content-right-songName">{{item.al.name}}</div>
              <div class="history-content-right-singerName">{{item.ar[0].name}}</div>
            </div>
          </div>
          </div>
        </van-tab>
        <van-tab title="历史播放">
          <div class="history-content">
            <div class="history-content-item" v-for="item in contentArr1" :key="item.id"
            @click="TSS(item.id)">
            <div class="history-content-left">
              <img :src="item.al.picUrl" alt="">
            </div>
            <div class="history-content-right">
              <div class="history-content-right-songName">{{item.al.name}}</div>
              <div class="history-content-right-singerName">{{item.ar[0].name}}</div>
            </div>
          </div>
          </div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { getToDetailDate } from '@/utils/apis/discover'
import { TSS } from '@/utils/apis/toSongStart'
export default {
  data() {
    return {
        active: 0,
        fileList: [],
        username:this.$route.query.username,
        history:[],
        contentArr:[],
        contentArr1:[],
        download:[],
        downloadArr:[],
        downloadArr1:[],
        love:[],
        loveArr:[],
        loveArr1:[],
    };
  },
  created(){
    this.getLocalStorageData()
    this.getToDetailDate()
    this.getToDetailDate1()
    this.getToDetailDate2()
  },
  methods: {
    ...mapState(["isLogin"]),
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      console.log(file);
    },
    TSS,
    toLogin(){
        this.$router.push({
            path:'/login'
        })
    },
    getLocalStorageData() {
      if (!localStorage.Arr) {
        localStorage.Arr = JSON.stringify([]);
        this.history = JSON.parse(localStorage.Arr);
      } else {
        this.history = JSON.parse(localStorage.Arr);
        this.download = JSON.parse(localStorage.download)
        this.love = JSON.parse(localStorage.LoveArr)
      }
    },
    getToDetailDate(){
      this.history.map((item) =>{
        console.log(item);
        this.$axios(getToDetailDate(item)).then((data)=>{
        console.log('👍',data);
        this.contentArr = data.songs
        console.log(this.contentArr);
          if(this.contentArr1.indexOf(this.contentArr[0])==-1){
            this.contentArr1.push(this.contentArr[0])
            console.log('sdfg',this.contentArr1);
          }else {
            return
          }
      })
      })
    },
    getToDetailDate1(){
      console.log('sd',this.download);
      this.download.map((item) =>{
        console.log(item);
        this.$axios(getToDetailDate(item)).then((data)=>{
        console.log('kk',data);
        this.downloadArr = data.songs
        console.log(this.downloadArr);
          if(this.downloadArr1.indexOf(this.downloadArr[0])==-1){
            this.downloadArr1.push(this.downloadArr[0])
            console.log('sdfg',this.downloadArr1);
          }else {
            return
          }
      })
      })
      
    },
    getToDetailDate2(){
      console.log('sd',this.love);
      this.love.map((item) =>{
        console.log(item);
        this.$axios(getToDetailDate(item)).then((data)=>{
        console.log('kk',data);
        this.loveArr = data.songs
        console.log(this.loveArr);
          if(this.loveArr1.indexOf(this.loveArr[0])==-1){
            this.loveArr1.push(this.loveArr[0])
            console.log('sdfg',this.loveArr1);
          }else {
            return
          }
      })
      })
      
    },
  },
};
</script>

<style lang="scss" scoped>
.user {
  width: 100vw;
  height: 100vh;
  background-image: url(@/assets/img/bg.gif);

  .user-tab {
    position: relative;
    width: 100%;
    height: 50px;
    .setting {
      position: absolute;
      top: 15px;
      right: 15px;
    }
  }
  .user-login {
    width: 100%;
    display: flex;
    justify-content: space-between;

    .login-left {
      margin-left: 20px;
    }
    .user-center {
      // height: 88px;
      text-align: center;
      color: #fff;
      // line-height: 88px;
      margin: 30px;
      .user-text {
        color: #aaa;
      }
      .count {
        margin-top: 5px;
        font-size: 20px;
      }
    }
  }
  .login-name {
    width: 100%;
    padding-left: 20px;
    padding-top: 10px;
    .login-name-text {
      color: #fff;
      font-size: 20px;
    }
  }
  .select-tab {
    margin-top: 10%;
    color: #ddd;
  }
}
.history-content {
  width: 100%;
  height: 53vh;
  overflow: auto;
  padding: 10px;
  .history-content-item {
    width: 100%;
    display: flex;
    margin-top: 10px;

    .history-content-left {
      width: 18%;
      img {
        width: 100%;
        // border-radius: 10px;
      }
    }
    .history-content-right {
      padding-left: 10px;
      .history-content-right-songName {
        margin-top: 25px;
      }
      .history-content-right-singerName {
        margin-top: 10px;
        font-size: 12px;
        color: #aaa;
      }
    }
  }
}
::v-deep .van-tab {
  font-size: 15px;
  line-height: 40px;
  flex: none;
  margin-left: 20px;
}
</style>