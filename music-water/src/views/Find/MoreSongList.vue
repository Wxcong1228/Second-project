<template>
  <transition name="move">
    <div class="more-song-list">
      <div class="more-tab">
        <div class="more-fanhui">
          <img src="../../assets/fanhuibgg.png" @click="TB" />
        </div>
        <div class="more-tab-title">每日推荐</div>
      </div>

      <div class="more-content">
        <van-loading class="loading1" size="50px" vertical v-if=" moreSong == '' ">加载中...</van-loading>
        <div class="content-list" v-for="m in moreSong" :key="m.id" @click="TSLD(m.id)">
          <div class="content-img">
            <!-- <img :src="m.picUrl" alt="" /> -->
            <van-image
              class="img"
              width="170"
              lazy-load
              :src="m.picUrl"
              alt=""
            />
          </div>
          <van-skeleton row="1" row-width="150px" v-if="moreSong == ''" />
          <div class="content-name">{{ m.name }}</div>
        </div>
          <!-- <van-cell v-for="item in list" :key="item" :title="item" /> -->
        <!-- </van-list> -->
        
      </div>
    </div>
  </transition>
</template>

<script>
import { getMoreSongData } from "@/utils/apis/discover";
import { TB } from "@/utils/apis/toBack";
import { TSLD } from "@/utils/apis/toSongListDetail"
export default {
  data() {
    return {
      moreSong: [],
      loading: false,
      finished: false,
    };
  },
  mounted() {
    this.getMoreSongData();
  },
  methods: {
    TB,
    TSLD,
    getMoreSongData() {
      this.$axios(getMoreSongData).then((res) => {
        console.log(res);
        this.moreSong = res.result;
        console.log(this.moreSong);
      });
    },
    onLoad() {
      // 异步更新数据
      setTimeout //仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        for (let i = 0; i < 20; i++) {
          this.list.push(this.list.length + 1);
        }

        // 加载状态结束
        this.loading = false;

        // 数据全部加载完成
        if (this.list.length >= 20) {
          this.finished = true;
        }
      }, 1000);
    },
  
  },
};
</script>

<style lang="scss" scoped>
.more-tab {
  position: relative;
  width: 100%;
  height: 50px;
  // background-color: black;
  .more-tab-title {
    color: #fff;
    line-height: 50px;
    text-align: center;
  }

  .more-fanhui {
    position: absolute;
    width: 20px;
    top: 15px;
    left: 10px;

    img {
      width: 100%;
    }
  }
}
.more-content {
  width: 100%;
  // height: 617px;
  height: calc(100vh - 50px);
  // padding-top: 50px;
    display: flex;
    flex-wrap: wrap;
    overflow: auto;
    box-sizing: border-box;


  .content-list {
    width: 50%;
    float: left;
    margin-bottom: 5px;
    // display: flex;

    .content-img {
      width: 100%;
      padding: 10px;
      .img {
        width: 100%;
        border-radius: 10px;
        // height: 100%;
        overflow: hidden;
      }
    }
  }
  .content-name {
    width: 90%;
    height: 12.3px;
    // padding: 5px;
    color: #fff;
    padding-top: 1px;
    font-size: 12px;
    overflow: hidden;
    text-align: center;
    margin-left: 5px;
  }
}
.loading1 {
  // margin-top: 50%;
  margin: 50% auto;
}

// .move-enter-from,
// .move-leave-to {
//   transform: translateX(100%);
// }

// .move-enter-active,
// .move-leave-active {
//   transition: all 2s linear;
// }

// .move-enter-to,
// .move-leave-from {
//   transform: translateX(0);
// }
</style>