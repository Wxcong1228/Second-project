<template>
  <div class="register">
    <van-icon class="register-TB" name="cross" color="#ddd" size="25px" @click="TB"/>
    <div class="register-username">
      <span>用户名:</span>
      <input type="text" v-model="username" placeholder="请输入你的用户名" />
    </div>
    <div class="register-password">
      <span>密&nbsp;&nbsp;&nbsp;码:</span>
      <input type="password" v-model="password" placeholder="请输入你的密码" />
    </div>
    <div class="btn" @click="getLoginArr">注册</div>
  </div>
</template>

<script>
import { TB } from '@/utils/apis/toBack'
import { Toast } from 'vant';
export default {
  data() {
    return {
      username: "",
      password: "",
      loginArr: [],
      loginArr1:[]
    };
  },
  methods: {
    TB,
    getLoginArr() {
      this.getLocalStorageData()
      if(this.username == '') {
        Toast('用户名不能为空');
      }else if(this.password == ''){
        Toast('密码不能为空')
      }else {
        this.saveComicViewHistory()
      }
    },
    saveComicViewHistory() {
      if (!window.localStorage.comicViewHistory) {
        window.localStorage.comicViewHistory = JSON.stringify([]);
      }

      let loginArr = JSON.parse(window.localStorage.comicViewHistory) || [];

      if (
        loginArr.findIndex((ele) => ele.username == this.username) == -1 ||
        loginArr == []
      ) {

        Toast('注册成功')
        this.goToLogin()
        loginArr.push({
          username: this.username,
          password: this.password,
        });
        
      } else {
        
        loginArr.forEach((element) => {
          if (element.username == this.username) {
            element.username == this.username;
            element.password == this.password;
            Toast('当前用户名已存在')
          }
          
        });
      }

      window.localStorage.comicViewHistory = JSON.stringify(loginArr);
    },
    getLocalStorageData() {
      if (!localStorage.comicViewHistory) {
        window.localStorage.comicViewHistory = JSON.stringify([]);
      } else {
        this.loginArr1 = JSON.parse(window.localStorage.comicViewHistory);
        console.log("h", this.loginArr1);
      }
    },
    goToLogin(){
        this.$router.push({
            path:'/login',
        })
    },
  },
  watch:{
    getLoginArr(){
      this.getLocalStorageData()
      if(this.username == '') {
        Toast('用户名不能为空');
      }else if(this.password == ''){
        Toast('密码不能为空')
      }else {
        this.saveComicViewHistory()
        Toast('注册成功,')
      }
      this.username == ''
      this.password == ''
    }
  }
};
</script>

<style lang="scss" scoped>
.register {
  width: 100%;
  height: 100%;
  background-color: #fff;
  position: relative;
  background-size: 100% 100%;
  background-image: url("@/assets/img/login-bg.gif");

  .register-TB {
    position: absolute;
    top: 15px;
    left: 15px;
  }

  .register-username {
    position: absolute;
    top: 40%;
    left: 0;
    right: 0;
    margin: 0 auto;
    width: 80%;
    padding: 10px;
    text-align: center;
    color: #fff;
    // background-color: rgba(252, 250, 250, 0.3);
    input {
      width: 215px;
      height: 25px;
      background: rgba(255, 255, 255, 0.001);
    }
  }
  .register-password {
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    margin: 0 auto;
    width: 80%;
    padding: 10px;
    text-align: center;
    color: #fff;
    // background-color: rgb(170, 164, 164,.3);
    input {
      width: 215px;
      height: 25px;
      background: rgba(255, 255, 255, 0.001);
    }
  }
  .btn {
    position: absolute;
    top: 60%;
    left: 0;
    right: 0;
    margin: 0 auto;
    width: 50%;
    padding: 10px;
    color: #ddd;
    text-align: center;
    background-color: rgb(170, 164, 164, 0.15);
  }
}
</style>