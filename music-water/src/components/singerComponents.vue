<template>
    <!-- 歌手信息详情 -->
    <div class="singer">
        <van-icon class="TB" name="arrow-left" color="#fff" size="25px"
        @click="TB"/>
        <div class="singer-content">
            <div class="singer-picUrl">
                <img :src="bg" alt="">
            </div>
            <div class="sing-name">{{sing}}</div>
            <div class="sing-dec">{{briefDesc}}</div>
            <div class="sing-songList">
                <div class="hotSong">热门单曲</div>
                <div class="sing-playAll">
                    <van-icon name="play-circle" color="#00cb64"/>
                    <span>播放全部({{length}})</span>
                </div>
                <div class="list">
                    <div class="song" v-for="(m,index) in messageArr"
                     :key="m.id" @click="TSS(m.id)">
                     <div class="song-left">{{index+1}}</div>
                     <div class="song-right">
                        <div class="song-name">{{m.name}}</div>
                        <div class="singer-box">
                        <div class="song-singer">{{m.ar[0].name}}</div>
                     </div>
                        
                    </div>
                    <van-icon class="list-icon" name="ellipsis" color="#fff" size="20px"/>
                </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { TB } from '@/utils/apis/toBack'
import { TSS } from '@/utils/apis/toSongStart'
import { getSingerMessage } from '@/utils/apis/discover'
export default {
    data(){
        return{
            id:this.$route.query.id,
            messageArr:[],
            bg:'',
            sing:'',
            briefDesc:"",
            length:''
        }
    },
    mounted(){
        this.getID()
        this.getSingerMessage()
    },
    methods:{
        getID(){
            console.log(this.id);
        },
        TB,
        TSS,
        // 获取歌手信息
        getSingerMessage(){
            this.$axios(getSingerMessage(this.id)).then((data)=>{
                console.log('singer',data);
                this.messageArr = data.hotSongs
                console.log(this.messageArr);
                this.bg = data.artist.picUrl
                this.sing = data.artist.name
                this.briefDesc = data.artist.briefDesc
                this.length = this.messageArr.length
            })
        },
    },
}
</script>

<style lang="scss" scoped>
.singer {
    width: 100vw;
    height: 100vh;
    position: relative;
    .TB {
        position: absolute;
        top: 15px;
        left: 10px;
    }
    .singer-content {
        width: 100vw;
        padding-top: 60px;

        .singer-picUrl {
            width: 30%;
            height: 112.5px;
            
            margin: 0 auto;
            img {
                border-radius: 999px;
                width: 100%;
                height: 100%;
            }
        }
        .sing-name {
            width: 100%;
            color: #fff;
            font-size: 20px;
            text-align: center;
            padding-top: 15px;
        }
        .sing-dec {
            width: 100%;
            height: 33px;
            margin-top: 10px;
            padding: 0 10px 0 10px;
            font-size: 12px;
            overflow: auto;
            color: #aaa;
        }
        .sing-songList {
            width: 100%;
            color:#fff;

            .hotSong {
                font-size: 16px;
                color: #eee;
                padding: 10px;
            }
            .sing-playAll {
                padding: 0 10px;
                font-size: 15px;
                span {
                    color: #ddd;
                    margin-left: 5px;
                }
            }
            .list {
                width: 100%;
                height: 361px;
                overflow: auto;
                padding: 10px 10px 10px 0;
                .song {
                    width: 100%;
                    margin-bottom: 15px;
                    display: flex;
                    position: relative;

                    .song-left {
                        width: 10%;
                        text-align: center;
                        padding-top: 2.5%;
                    }
                    .song-right{
                        width: 90%;
                        .song-name {
                        font-size: 14px;
                        color: #eee;
                    }
                    .singer-box {
                        margin-top: 7px;
                        display: flex;
                        .song-singer {
                        font-size: 12px;
                        color: #aaa;
                    }
                    }
                    }
                    .list-icon {
                        position: absolute;
                        right: 0;
                        transform: rotateZ(90deg);
                        top: 1%;
                    }
                    
                }
            }
        }
    }
}
</style>