<template>
    <transition name="van-slide-up">
    <div class="comment">
        <!-- 头部导航栏 -->
        <div class="comment-tab">
            <div class="comment-fanhui" @click="TB">
                <van-icon name="arrow-left" color="#fff" size="20px"/>
            </div>
            <div class="comment-title">评论</div>
        </div>
        <!-- 评论内容 -->
        <div class="comment-content">
            <div class="comment-content-list" v-for="item in arr" :key="item.userId">
                <div class="content-list-left">
                    <img :src="item.user.avatarUrl" alt="">
                </div>
                <div class="content-list-right">
                    <div class="user-nickname">{{item.user.nickname}}</div>
                    <div class="content-time">{{item.timeStr}}</div>
                    <div class="content">{{item.content}}</div>
                </div>
            </div>
        </div>
    </div>
</transition>
</template>

<script>
import { TB } from "@/utils/apis/toBack"
export default {
    data() {
        return {
            arr: this.$route.query.arr,
        }
    },
    created() {
        this.getArr();
    },
    methods:{
        TB,
        getArr(){
            console.log(this.arr);
        },
    }
}
</script>

<style lang="scss" scoped>
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
                width: 10%;
                margin-left: 15px;

                img {
                    width: 100%;
                    overflow: hidden;
                    border-radius: 999px;
                }
            }
            .content-list-right {
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
.move1-enter,
.move1-leave-to {
  transform: translateY(100%);
}

.move1-enter-active,
.move1-leave-active {
  transition: all 20s linear;
}

.move1-enter,
.move1-leave-from {
  transform: translateY(0);
}
</style>