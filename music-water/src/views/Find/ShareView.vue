<template>
  <div class="share">
    <div class="share-pic">
      <img :src="bg" alt="" />
    </div>
    <div class="share-message">
      <div class="share-message-pic">
        <img :src="bg" alt="" />
      </div>
      <div class="share-message-songName">{{ songName }}</div>
      <div class="share-message-singerName">{{ singerName }}</div>
    </div>

    <div class="share-copy" @click="onShareClick">
      <van-icon
        class="share-copy-icon"
        name="coupon-o"
        color="#fff"
        size="25px"
      />
      <span>复制链接</span>
    </div>

    <div class="close" @click="TBS">关闭</div>
  </div>
</template>

<script>
// import { TB } from "@/utils/apis/toBack";
import { Toast } from 'vant';
export default {
  data() {
    return {
      bg: this.$route.query.bg,
      songName: this.$route.query.songName,
      singerName: this.$route.query.singerName,
      // Toast('提示内容');
    };
  },
  methods: {
    TBS(){
      this.$router.go(-1)
    },
    onShareClick() {
      Toast("复制成功");
    },
  },
};
</script>

<style lang="scss" scoped>
.share {
  width: 100%;
  height: 100%;
  position: relative;

  .share-pic {
    width: 100%;
    height: 100vh;
    filter: blur(50px);
    z-index: 0;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .share-message {
    width: 100%;
    position: absolute;
    // z-index: 2;
    top: 50px;
    text-align: center;

    .share-message-pic {
      width: 40%;
      margin: 0 auto;

      img {
        width: 100%;
        border-radius: 10px;
      }
    }
    .share-message-songName {
      color: #eee;
      font-size: 18px;
      margin: 10px 0;
    }
    .share-message-singerName {
      color: #bbb;
      font-size: 14px;
    }
  }
  .share-copy {
    width: 100%;
    position: absolute;
    top: 300px;
    padding-left: 15px;
    display: flex;
    align-items: center;

    .share-copy-icon {
      line-height: 20px;
    }

    span {
      font-size: 14px;
      color: #ddd;
      margin-left: 10px;
    }
  }
  .close {
    width: 100%;
    position: absolute;
    bottom: 10px;
    padding: 20px 0;
    text-align: center;
    color: #ddd;
  }
}
</style>