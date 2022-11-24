<template>
  <!-- 推荐歌单 -->

  <div class="playList">
    <div class="title">{{ title }}</div>
    <div
      class="play-list-item"
      v-for="item in blocks"
      :key="item.id"
      @click="TSLD(item.id)"
    >
      <div class="img-wrap">
        <van-image
          class="img"
          width="30vw"
          height="108.84px"
          lazy-load
          :src="item.picUrl"
        />
        <h3 class="play-title">{{ item.name }}</h3>
      </div>
    </div>
  </div>
</template>

<script>
import { getDiscoverData } from "@/utils/apis/discover";
import { TSLD } from "@/utils/apis/toSongListDetail"
export default {
  data() {
    return {
      blocks: [],
      title: "",
      songListArr: [],
      // creativeId:''
    };
  },
  mounted() {
    this.getDate();
  },
  methods: {
    getDate() {
      this.$axios(getDiscoverData).then((res) => {
        console.log('😁',res);
        this.blocks = res.result;
      });
    },
    TSLD,
    // toSongListDetail(id, arr) {
    //   this.$router.push({
    //     path: "/SongListDetail",
    //     query: {
    //       id: id,
    //       arr: arr,
    //     },
    //   });
    // },
  },
};
</script>

<style lang="scss" scoped>
.playList {
  padding-bottom: 10px;
  width: 100%;
  //   height: 650px;
  overflow: auto;
  display: flex;
  margin-top: 10px;
}
.play-list-item {
  flex: 0 0 29vw;
  // margin-right: 10px;
  margin-left: 10px;
  width: 30vw;

  .img-wrap {
    position: relative;

    width: 100%;
    overflow: hidden;

    .img {
      display: block;
      overflow: hidden;
      border-radius: 10px;
      width: 100%;
    }
  }
}
.play-title {
  position: relative;
  color: white;
  width: 100%;
  height: 12px;
  // padding: 5px;
  margin-top: 5px;
  font-size: 12px;
  // transform: scale(.5);
  max-height: 24px;
  overflow: hidden;
}
.title {
  font-size: 12px;
}
// .loading1 {
//   margin-top: 50%;
// }
</style>