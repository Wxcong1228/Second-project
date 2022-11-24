<template>
    <div class="show-detail">
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
            <div class="detail-bottom">
                <p v-for=" item,index in arr" :key="index"
                :class="{ selected: hightLightLyricIndex == index }">
                    {{item.lyc}}
                </p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            arr:this.$route.query.arr,
            songName: this.$route.query.songName,
            singerName: this.$route.query.singerName,
            bg:this.$route.query.bg
        }
    },
    created(){
        this.getDetail()
    },
    methods:{
        getDetail(){
            console.log(this.songName);
        },
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
      }
      return index;
    },
    }
}
</script>

<style lang="scss" scoped>
.show-detail {
    width:100vw;
    height: 100vh;
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
        .detail-bottom {
            width: 100%;

            p{
                font-size: 20px;
                color: #ddd;
                padding: 20px 0 20px 20px;
            }
            .selected {
                color: red;
            }
        }
    }
}
</style>