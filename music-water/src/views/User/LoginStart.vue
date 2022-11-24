<template>
  <div class="login-start">
    <van-icon
      class="login-start-TB"
      name="cross"
      color="#ddd"
      size="25px"
      @click="TB"
    />

    <div class="login-start-username">
      <span>账号:</span>
      <input type="text" v-model="username1" placeholder="请输入你的账号" />
    </div>
    <div class="login-start-password">
      <span>密码:</span>
      <input type="password" v-model="password1" placeholder="请输入你的密码" />
    </div>
    <div class="login-start-btn" @click="goToLogin">登录</div>
  </div>
</template>

<script>
import { TB } from "@/utils/apis/toBack";
import { Toast } from 'vant';
import { mapMutations, mapState } from 'vuex';
export default {
  data() {
    return {
        loginArr1:[],
        username1:'',
        password1:''
    };
  },
  created(){
    this.getLocalStorageData()
    this.getUsername()
  },
  methods: {
    TB,
    getUsername(){
        console.log(this.username);
    },
    ...mapState(["isLogin"]),
    ...mapMutations(["setIsLogin"]),
    getIsLogin(){
        this.$store.commit('setIsLogin',true)
        // console.log('😁',this.isLogin.value);
        this.goToUser(this.username1)
    },
    goToUser(username){
        this.$router.push({
            path:'/user',
            query:{
                username:username
            }
        })
    },
    goToLogin(){
        if(this.loginArr1.findIndex((ele) => ele.username == this.username1) !== -1 && 
        this.loginArr1.findIndex((ele) => ele.password == this.password1) !== -1){
            Toast('登录成功')
            this.getIsLogin()
        }else {
            Toast('登陆失败')
        }
    },
    getLocalStorageData() {
      if (!localStorage.comicViewHistory) {
        window.localStorage.comicViewHistory = JSON.stringify([]);
      } else {
        this.loginArr1 = JSON.parse(window.localStorage.comicViewHistory);
        console.log("h", this.loginArr1);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.login-start {
  width: 100%;
  height: 100%;
  position: relative;
  background-size: 100% 100%;
  background-image: url(@/assets/img/login-bg.gif);

  .login-start-TB {
    position: absolute;
    top: 15px;
    left: 15px;
  }
  .login-start-username {
    width: 70%;
    color: #ddd;
    position: absolute;
    top: 40%;
    left: 0;
    right: 0;
    margin: 0 auto;
    input {
        width: 83%;
      height: 25px;
      background: rgba(255, 255, 255, 0.001);
    }
  }
  .login-start-password {
    width: 70%;
    color: #ddd;
    position: absolute;
    top: 47%;
    left: 0;
    right: 0;
    margin: 0 auto;
    input {
        width: 83%;
      height: 25px;
      background: rgba(255, 255, 255, 0.001);
    }
  }
  .login-start-btn {
    width: 50%;
    color: #ddd;
    position: absolute;
    background-color: rgb(255, 255, 255, 0.1);
    top: 55%;
    padding: 10px;
    left: 0;
    right: 0;
    margin: 0 auto;
    text-align: center;
  }
}
</style>