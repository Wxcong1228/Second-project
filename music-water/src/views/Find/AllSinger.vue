<template>
    <div class="all-singer">
        <div class="all-singer-title">
            <van-icon class="allSinger-TB" name="arrow-left" 
            color="#fff" size="20px" @click="TB"/>
            <span>歌手</span>
        </div>
        <div class="allSinger-select">
            <div class="select-list">
                <div class="list" :class="{active : type == -1}" @click="changeType(-1)">全部</div>
                <div class="list" :class="{active : type == 1}" @click="changeType(1)">男歌手</div>
                <div class="list" :class="{active : type == 2}" @click="changeType(2)">女歌手</div>
                <div class="list" :class="{active : type == 3}" @click="changeType(3)">乐队</div>
            </div>
            <div class="select-list">
                <div class="list" :class="{active : all == -1}" @click="changeAll(-1)">全部</div>
                <div class="list" :class="{active : all == 7}" @click="changeAll(7)">华语</div>
                <div class="list" :class="{active : all == 96}" @click="changeAll(96)">欧美</div>
                <div class="list" :class="{active : all == 8}" @click="changeAll(8)">日本</div>
                <div class="list" :class="{active : all == 16}" @click="changeAll(16)">韩国</div>
                <div class="list" :class="{active : all == 0}" @click="changeAll(0)">其他</div>
            </div>
            <div class="select-list1">
                <div class="list1" v-for="i in arr" :key="i"
                :class="{active1 : letter == i}" @click="changeLetter(i)">{{i}}</div>
            </div>
        </div>
       
        <div class="all-content">
            <van-loading class="loading1" size="50px" vertical v-if=" allSingerArr == '' ">加载中...</van-loading>
            <div class="all-content-list" v-for="item in allSingerArr" :key="item.id"
            @click="toSeeSinger(item.id)">
                <div class="all-content-list-left">
                    <img v-lazy="item.picUrl" />
                </div>
                <div class="all-content-list-right">
                    <div>{{item.name}}</div>
                    <div class="fans-count">粉丝数量:{{item.fansCount}}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { TB } from '@/utils/apis/toBack'
import { getAllSinger } from '@/utils/apis/discover'
export default {
    data(){
        return{
            type: -1,
            all: -1,
            letter: 'a',
            allSingerArr:[],
            arr:['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
        }
    },
    mounted(){
        this.getAllSinger()
    },
    methods:{
        TB,
        toSeeSinger(id){
      this.$router.push({
        path:'/singer',
        query:{
          id:id
        }
      })
    },
        changeType(val){
            this.type = val
            this.getAllSinger(this.type,this.all,this.letter)
            console.log(this.type);
        },
        changeAll(val){
            this.all = val
            this.getAllSinger(this.type,this.all,this.letter)
        },
        changeLetter(val){
            this.letter = val
            this.getAllSinger(this.type,this.all,this.letter)
        },
        getAllSinger(){
            this.$axios(getAllSinger(this.type,this.all,this.letter)).then((data)=> {
                console.log('🤦‍♂️',data);
                this.allSingerArr = data.artists
                // this.arID = this.allSingerArr.
            })
        }
    },
    watch:{
        changeType(val){
            console.log(this.type);
            console.log(this.letter);
            this.type = val
            this.getAllSinger(this.type,this.all,this.letter)
            
        },
        changeAll(val){
            this.all = val
            this.getAllSinger(this.type,this.all,this.letter)
        },
        changeLetter(val){
            this.letter = val
            this.getAllSinger(this.type,this.all,this.letter)
        },
    }
}
</script>

<style lang="scss" scoped>
.all-singer {
    width: 100%;
    height: 100%;

    .all-singer-title {
        width: 100%;
        height: 50px;
        text-align: center;
        position: relative;
        line-height: 50px;
        font-size: 17px;
        color: #fff;

        .allSinger-TB {
            position: absolute;
            left: 15px;
            top: 15px;
        }
    }
    .allSinger-select {
        width: 100%;
        height: 16%;
        margin-top: 10px;

        .select-list {
            color: #ddd;
            display: flex;
            width: 100%;
            margin-bottom: 10px;
            padding-left: 10px;
            // flex: 0 0 20vw;
            .list {
                padding: 5px 10px;
            }
        }
        .select-list1 {
            width: 100%;
            display: flex;
            overflow: auto;
            
            .list1 {
                color: #ddd;
                flex: 0 0 10vw;
                font-size: 15px;
                padding: 5px 15px;
                text-align: center;
                margin-left: 10px;
            }
        }
    }
    .all-content {
        width: 100%;
        height: 76.2%;
        overflow: auto;
        .all-content-list {
            width: 100%;
            padding: 10px;
            display: flex;
            .all-content-list-left {
                width: 30%;
                img {
                    width: 100%;
                    border-radius: 10px;
                }
            }
            .all-content-list-right {
                width: 70%;
                color: #ddd;
                padding-top: 7%;
                padding-left: 10px;
                .fans-count {
                    margin-top: 10px;
                    font-size: 13px;
                }
            }
        }
    }
}
.active {
    border-radius: 20px;
    background-color: rgb(166, 97, 97);
}
.active1 {
    border-radius: 10px;
    background-color: rgb(166, 97, 97);
}
.select-list1::-webkit-scrollbar{
    display: none;
}
.loading {
    margin: 50% auto;
}
</style>