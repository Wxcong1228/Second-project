<template>
  <div class="radio">
    <!-- 头部导航 -->
    <div class="radio-tab">
      <div class="radio-tab-TB" @click="TB">
        <img src="@/assets/fanhuibgg.png" alt="" />
      </div>
      <div class="radio-tab-title">音乐电台</div>
    </div>
    <!-- 内容 -->
    <div class="content">
      <div
        class="radio-content"
        v-for="item in radioArr"
        :key="item.id"
        @click="TSLD(item.id)"
      >
        <div class="radio-left">
          <img :src="item.picUrl" alt="" />
        </div>
        <div class="radio-right">
          {{ item.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getRadioDate } from "@/utils/apis/discover";
import { TB } from "@/utils/apis/toBack";
import { TSLD } from "@/utils/apis/toSongListDetail";
export default {
  data() {
    return {
      id: this.$route.query.id,
      radioArr: [],
    };
  },
  created() {
    this.getRadioDate();
  },
  methods: {
    TSLD,
    TB,
    // 获取音乐电台的内容
    getRadioDate() {
      this.$axios(getRadioDate(this.id)).then((data) => {
        this.radioArr = data.result;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.radio {
  width: 100vw;
  height: 100vh;
  color: #fff;

  .radio-tab {
    width: 100vw;
    position: relative;
    .radio-tab-TB {
      width: 25px;
      position: absolute;
      top: 12px;
      left: 15px;
      img {
        width: 100%;
      }
    }
    .radio-tab-title {
      width: 100%;
      height: 50px;
      line-height: 50px;
      text-align: center;
      font-size: 18px;
    }
  }
  .content {
    width: 100%;
    overflow: auto;
    height: calc(100% - 50px);
    .radio-content {
      width: 100%;
      display: flex;
      align-items: flex-end;
      .radio-left {
        width: 50%;
        padding: 20px;
        img {
          width: 100%;
          border-radius: 10px;
          overflow: hidden;
        }
      }
      .radio-right {
        width: 50%;
        padding: 10px 0 30px 0;
        font-size: 18px;
      }
    }
  }
}
</style>