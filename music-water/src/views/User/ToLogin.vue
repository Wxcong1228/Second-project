<template>
    <div class="login">
        <div class="login-content">
            <div class="login-toBack" @click="TB">
                <van-icon name="cross" color="#ddd" size="25px"/>
            </div>
            <div class="click-login" @click="toLoginStart">
                <span>账号密码登录</span>
            </div>
            <div class="click-register" @click="toRegister">
                <span>免费注册</span>
            </div>
        </div>
    </div>
</template>

<script>
import { TB } from '@/utils/apis/toBack'
export default {
    methods:{
        TB,
        toRegister(){
            this.$router.push({
                path: '/register'
            })
        },
        toLoginStart(){
            this.$router.push({
                path:'/loginStart'
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.login {
    width: 100vw;
    height: 100vh;
    background-size: 100% 100%;
      background-repeat: no-repeat;
      background-position: center center;
    background-image: url('@/assets/img/login-bg.gif');

    .login-content {
        width: 100%;
        height: 100%;
        color: #ddd;
        position: relative;

        .click-login {
            position: absolute;
            top: 50%;
            left: 0;
            right: 0;
            margin:0 auto;
            width: 60%;
            padding: 10px;
            text-align: center;
            background-color: rgb(86, 79, 79,.4);
            input {
                background-color: #ddd;
            }
        }
        .click-register {
            position: absolute;
            top: 60%;
            left: 0;
            right: 0;
            margin: 0 auto;
            width: 60%;
            padding: 10px;
            text-align: center;
            margin-top: 10px;
            background-color: rgb(86, 79, 79,.4);
        }
    }
    .login-toBack {
        position: absolute;
        top: 15px;
        left: 15px;
    }
}
</style>