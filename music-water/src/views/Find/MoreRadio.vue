<template>
  <div class="more-radio">
    <div class="more-radio-title">
      <van-icon
        class="radio-icon"
        name="arrow-left"
        color="#fff"
        size="20px"
        @click="TB"
      />
      <span>歌单广场</span>
    </div>

    <div class="radio-content"  >
      <div class="radio-content-tab">
        <div class="radio-content-tab-item" v-for="(index,a) in arr"  
        :key="index.id"
        :class="{active: curIndex == a}"
        @click="ChangeID(index.id), curIndex = a">
          <span>{{index.name}}</span>
        </div>
       
      </div>
      <van-loading size="24px" vertical v-show=" arr2 == ''">加载中...</van-loading>
      <div class="radio-content-list">
          <div class="radio-songDetail" v-for="item in arr2" :key="item.id"
          @click="TSLD(item.id)">
            <div class="radio-picUrl">
              <img :src="item.picUrl" alt="">
            </div>
            <!-- <van-notice-bar class="radio-text" scrollable text="{{item.name}}" /> -->
            <div class="radio-text">{{item.name}}</div>
          </div>
        </div>
      <!-- <van-tabs @click="onClick(index.id)">
        <van-tab v-for="index in arr" :title="index.name" :key="index.id" 
        >
          {{  }}
        </van-tab>
      </van-tabs> -->
    </div>
   
  </div>
  
</template>

<script>
import { TB } from "@/utils/apis/toBack";
import { getMoreRadio,getHotDate } from "@/utils/apis/discover"
import { TSLD } from "@/utils/apis/toSongListDetail"
export default {
  data() {
    return {
        arr:[],
        id:5001,
        active1:5001,
        arr2:[],
        curIndex:0
    };
  },
  created(){
    this.getArrHot()
    // this.ChangeID()
    this.getMoreRadio(this.id)
    this.getHotDate()
  },
  methods: {
    TB,
    TSLD,
    getArrHot(){
        console.log('aaa',this.arr);
    },
    // onClick(id){
    //     this.id = id
    //     console.log('🎶',this.id);
    // },
    async getMoreRadio(id){
         await this.$axios(getMoreRadio(id)).then((data) => {
          console.log('😒',this.id);
            console.log('👌',data);
            this.arr2 = data.result
            console.log('😘',this.arr2);
        })
    },
    getHotDate(){
        this.$axios(getHotDate).then((data) => {
            console.log('👍image.png',data);
            this.arr = data.tags

        })
    },
    ChangeID(id){
        this.id = id
        this.getMoreRadio(this.id)
        console.log('🎶',this.id);
    },
  },
  watch: {
  }
};
</script>

<style lang="scss" scoped>
.more-radio {
  width: 100%;
  height: 100%;

  .more-radio-title {
    position: relative;
    width: 100%;
    height: 50px;
    text-align: center;
    line-height: 50px;
    color: #fff;
    .radio-icon {
      position: absolute;
      top: 15px;
      left: 15px;
    }
  }
  .radio-content {
    width: 100%;
    height: calc(100vh - 50px);
    .radio-content-tab {
      width: 100%;
      height: 40px;
      // background-color: #fff;
      display: flex;
      overflow: auto;
      
      .radio-content-tab-item {
        flex: 0 0 20vw;
        line-height: 40px;
        text-align: center;
        font-size: 14px;
        color: #aaa;
      }
    }
  }
  .radio-content-list {
    width: 100%;
    height: calc(100vh - 93px);
    // overflow: auto;
    display: flex;
    flex-wrap: wrap;
    overflow: auto;
    box-sizing: border-box;
    // padding: 0 10px 15px 10px;
    // justify-content: space-between;
    
    .radio-songDetail{
      width: 50%;
      padding: 10px 5px 0 5px;
      box-sizing: border-box;
      
      .radio-picUrl {
        width: 100%;
        img {
          width: 100%;
          border-radius: 10px;
          overflow: hidden;
        }
      }
      .radio-text {
        width: 100%;
        height: 35px;
        padding: 5px;
        color: #c4c2c3;
        font-size: 14px;
        overflow: hidden;
      }
    }
  }
}
.active {
  span{
    color: #fff;
    // border: 1px solid red;
  }
  
}
.radio-content-tab::-webkit-scrollbar{
    display: none;
}

</style>