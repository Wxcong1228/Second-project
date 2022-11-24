<template>
    <!-- 歌手专辑 -->
    <div class="Album">
        <van-icon class="Album-TB" name="arrow-left" size="25px" color="#fff"
        @click="TB"/>
        <div class="Album-content">
            <div class="Album-bg">
                <img :src="bg" alt="">
                <div class="Album-singer-name">{{singerName}}</div>
            </div>
            <div class="Album-list">歌曲({{length}})</div>
            <div class="Album-item">
                <div class="Album-item-content" v-for="(item,index) in albumArr" :key="item.id"
                @click="TSLD(item.id)">
                    <div class="content-left">{{index+1}}</div>
                    <div class="content-right">
                        <div class="song-name">{{item.name}}</div>
                        <div class="singer-name">{{item.artists[0].name}}</div>
                    </div>
                    <van-icon class="Album-icon" name="ellipsis" color="#fff"
                    size="20px"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { TB } from '@/utils/apis/toBack'
import { getSingerAlbum } from '@/utils/apis/discover'
import { TSLD } from '@/utils/apis/toSongListDetail'
export default {
    data(){
        return{
            id:this.$route.query.id,
            albumArr:[],
            bg:'',
            songName:'',
            singerName:'',
            length:''
        }
    },
    mounted(){
        this.getID()
        this.getSingerAlbum()
    },
    methods:{
        // 检查ID传入是否成功
        getID(){
            console.log(this.id);
        },
        TB,
        TSLD,
        // 获取歌手专辑内容
        getSingerAlbum(){
            this.$axios(getSingerAlbum(this.id)).then((data)=>{
                this.albumArr = data.hotAlbums
                this.bg = data.artist.picUrl
                this.singerName = data.artist.name
                this.length = this.albumArr.length
            })
        },
    },
}
</script>

<style lang="scss" scoped>
.Album {
    width: 100vw;
    height: 100vh;
    position: relative;
    .Album-TB {
        position: absolute;
        top: 15px;
        left: 10px;
        z-index: 3;
    }
    .Album-content {
        width: 100%;
        .Album-bg {
            width: 100%;
            position: relative;
            
            img {
            width: 100%;
             }
            .Album-singer-name {
                width: 100%;
                height: 40px;
                position: absolute;
                bottom: 0;
                left: 0;
                color: #b0b0b0;
                padding-left: 10px;
                background-color: rgb(255, 255, 254,.1);
                line-height: 40px;
            }
        }
        .Album-list {
            color: #ccc;
            padding: 10px;
        }
        .Album-item {
            width: 100%;
            height: 382px;
            overflow: auto;
           .Album-item-content {
            width: 100%;
            padding: 15px 10px 15px 10px;
            display: flex;
            position: relative;
            .content-left {
                width: 15%;
                text-align: center;
                color: #aaa;
                padding-top: 2.2%;
            }
            .content-right {
                color: #ddd;

                .singer-name {
                    color: #aaa;
                    font-size: 12px;
                    margin-top: 5px;
                }   
            }
            .Album-icon {
                position: absolute;
                right: 10px;
                transform: rotateZ(90deg);
                top: 33%;
            }
           }
        }
        
    }
}
</style>