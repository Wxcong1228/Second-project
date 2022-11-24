<template>
  <div class="search">
    <div class="search-tab">
      <div class="search-tb" @click="TB">
        <van-icon name="arrow-left" color="#fff" size="20px" />
      </div>
      <div class="search-box">
        <div class="search-icon">
          <img src="../assets/img/discover_icon_search.png" alt="" />
        </div>
        <div class="search-ipt">
          <input
            type="text"
            placeholder="歌手、歌曲或专辑名"
            v-model="searchValue"
          />
        </div>
      </div>
    </div>
    <!-- 搜索轮播图 -->
    <div class="search-lbt" v-if="isShow && !isTrue">
      <van-swipe class="search-lbt-img" :autoplay="3000">
        <van-swipe-item v-for="image in newSongArr" :key="image.targetId">
          <img :src="image.imageUrl" />
          <div class="newSong">{{ image.typeTitle }}</div>
        </van-swipe-item>
      </van-swipe>
    </div>
    <!-- 搜索歌曲列表 -->

    <div class="search-songList" v-if="!isShow && !isTrue">
      <div
        class="song-item"
        v-for="s in songArr"
        :key="s.id"
        @click="ChangeIsTrue(s.name)"
      >
        <div class="song-item-left">
          <img src="../assets/img/discover_icon_search.png" alt="" />
        </div>
        <div class="song-item-right">{{ s.name }}</div>
      </div>
    </div>
    <van-loading
      class="loading"
      size="50px"
      vertical
      v-if="songArr == '' && !isShow && !isTrue"
      >加载中...</van-loading
    >
    <!-- 点击弹出所有与搜索歌曲相关的内容 -->
    <div class="song-content" v-show="isTrue">
      <div class="song-content-title">
        <van-tabs
          v-model="active"
          animated
          title-inactive-color="#656565"
          title-active-color="#fff"
          line-height="1px"
          color="#aaa"
          background="transparent"
          line-width="15px"
        >
          <van-tab title="综合">
            <div class="bigbox">
              <!-- 你可能想搜索 -->
              <div class="want-search">
                <div class="want-search-title">你可能想搜索</div>
                <div class="want-search-content">
                  <div class="want-search-content-pic">
                    <img :src="picUrl" alt="" />
                  </div>
                  <div class="want-search-content-text">
                    <div class="want-search-content-text-singerName">
                      {{ singerName1 }}
                    </div>
                    <div class="want-search-content-text-allSong">
                      音乐人·{{ count }}首歌
                    </div>
                  </div>
                </div>
              </div>

              <!-- 歌曲 -->
              <div class="search-item">
                <div class="search-item-list">
                  <div class="search-item-list-title">歌曲</div>
                  <div
                    class="allSong-item"
                    v-for="(a, i) in songArr2"
                    :key="i"
                    @click="TSS(a.id)"
                  >
                    <div class="search-song-name">{{ a.name }}</div>
                    <div class="singer-box">
                      <div
                        class="search-singer-name"
                        v-for="b in a.ar"
                        :key="b.id"
                      >
                        {{ b.name }}
                      </div>
                    </div>
                  </div>
                  <div class="search-item-footer" @click="changeActive">
                    <span>查看所有歌曲</span>
                    <van-icon name="arrow" color="#fff" size="15px" />
                  </div>
                </div>
              </div>

              <!-- 音乐人 -->
              <div class="search-singer">
                <div class="search-singer-title">音乐人</div>
                <div class="box">
                  <div
                    class="search-singer-list"
                    v-for="(s, i) in songArr"
                    :key="s.id"
                    @click="TSLD(s.id)"
                  >
                    <div class="search-singer-list-left" v-if="i <= 2">
                      <img :src="s.al.picUrl" alt="" />
                    </div>
                    <div class="search-singer-list-right" v-if="i <= 2">
                      <div
                        class="search-singer-list-name"
                        v-for="(s1, i1) in s.ar"
                        :key="i1 + 1"
                      >
                        {{ s1.name }}
                      </div>
                      <div class="search-singer-list-count">{{ s.v }}首歌</div>
                    </div>
                  </div>
                </div>
                <div class="search-item-footer" @click="changeActive1">
                  <span>查看所有音乐人</span>
                  <van-icon name="arrow" color="#fff" size="15px" />
                </div>
              </div>

              <!-- 歌单 -->
              <div class="search-singer">
                <div class="search-singer-title">专辑</div>
                <div class="box">
                  <div
                    class="search-singer-list"
                    v-for="(s, i) in songAlmb"
                    :key="s.id"
                    @click="TSLD(s.id)"
                  >
                    <div class="search-singer-list-left" v-if="i <= 2">
                      <img :src="s.blurPicUrl" alt="" />
                    </div>
                    <div class="search-singer-list-right" v-if="i <= 2">
                      <div class="search-singer-list-name">
                        {{ s.artist.name }}
                      </div>
                      <div class="search-singer-list-count">
                        {{ s.size }}首歌
                      </div>
                    </div>
                  </div>
                  <div class="search-item-footer" @click="changeActive2">
                    <span>查看所有专辑</span>
                    <van-icon name="arrow" color="#fff" size="15px" />
                  </div>
                </div>
              </div>

              <!-- 专辑 -->
              <div class="search-singer">
                <div class="search-singer-title">歌单</div>
                <div class="box">
                  <div
                    class="search-singer-list"
                    v-for="(s, i) in searchSongDetail"
                    :key="s.id"
                    @click="TSLD(s.id)"
                  >
                    <div class="search-singer-list-left" v-if="i <= 2">
                      <img :src="s.coverImgUrl" alt="" />
                    </div>
                    <div class="search-singer-list-right" v-if="i <= 2">
                      <div class="search-singer-list-name">
                        {{ s.creator.nickname }}
                      </div>
                      <div class="search-singer-list-count">{{ s.name }}</div>
                    </div>
                  </div>
                  <div class="search-item-footer" @click="changeActive3">
                    <span>查看所有歌单</span>
                    <van-icon name="arrow" color="#fff" size="15px" />
                  </div>
                </div>
              </div>
            </div>
          </van-tab>
          <van-tab title="歌曲" class="song">
            <div class="search-item">
              <div class="search-item-list">
                <div
                  class="allSong-item"
                  v-for="(a, i) in songArr3"
                  :key="i"
                  @click="TSS(a.id)"
                >
                  <div class="search-song-name">{{ a.name }}</div>
                  <div class="singer-box">
                    <div
                      class="search-singer-name"
                      v-for="b in a.ar"
                      :key="b.id"
                    >
                      {{ b.name }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </van-tab>
          <van-tab title="音乐人" class="singer">
            <div class="search-singer">
              <div class="box">
                <div
                  class="search-singer-list"
                  v-for="s in songArr3"
                  :key="s.id"
                  @click="TSLD(s.id)"
                >
                  <div class="search-singer-list-left">
                    <img :src="s.al.picUrl" alt="" />
                  </div>
                  <div class="search-singer-list-right">
                    <div class="search-singer-list-name">
                      {{ s.ar[0].name }}
                    </div>
                    <div class="search-singer-list-count">{{ s.v }}首歌</div>
                  </div>
                </div>
              </div>
            </div>
          </van-tab>
          <van-tab title="专辑" class="Albm">
            <div class="search-singer">
              <!-- <div class="search-singer-title">专辑</div> -->
              <div class="box">
                <div
                  class="search-singer-list"
                  v-for="s in songAlmb"
                  :key="s.id"
                  @click="TSLD(s.id)"
                >
                  <div class="search-singer-list-left">
                    <img :src="s.blurPicUrl" alt="" />
                  </div>
                  <div class="search-singer-list-right">
                    <div class="search-singer-list-name">
                      {{ s.artist.name }}
                    </div>
                    <div class="search-singer-list-count">{{ s.size }}首歌</div>
                  </div>
                </div>
                <!-- <div class="search-item-footer" @click="changeActive2">
                    <span>查看所有专辑</span>
                    <van-icon name="arrow" color="#fff" size="15px" />
                  </div> -->
              </div>
            </div>
          </van-tab>
          <van-tab title="歌单" class="songDetail">
            <div class="search-singer">
              <!-- <div class="search-singer-title">歌单</div> -->
              <div class="box">
                <div
                  class="search-singer-list"
                  v-for="s in searchSongDetail"
                  :key="s.id"
                  @click="TSLD(s.id)"
                >
                  <div class="search-singer-list-left">
                    <img :src="s.coverImgUrl" alt="" />
                  </div>
                  <div class="search-singer-list-right">
                    <div class="search-singer-list-name">
                      {{ s.creator.nickname }}
                    </div>
                    <div class="search-singer-list-count">{{ s.name }}</div>
                  </div>
                </div>
                <!-- <div class="search-item-footer" @click="changeActive3">
                    <span>查看所有歌单</span>
                    <van-icon name="arrow" color="#fff" size="15px" />
                  </div> -->
              </div>
            </div>
          </van-tab>
        </van-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import { TB } from "@/utils/apis/toBack";
import { TSS } from '@/utils/apis/toSongStart'
import { TSLD } from '@/utils/apis/toSongListDetail'
import {
  getSearchDate,
  getAllSongDate,
  getSearchAllSongDate,
  getBannerDate,
  getSongItem,
  getSongAllItem,
  getAlbumDate,
  getSearchDetailDate,
} from "@/utils/apis/discover";
export default {
  data() {
    return {
      searchBannerImage: [],
      newSongArr: [],
      searchValue: "",
      songArr: [],
      isShow: true,
      active: 0,
      isTrue: false,
      picUrl: "",
      singerName1: "",
      allSongArr: [],
      songArr2: [],
      songArr3:[],
      songAlmb:[],
      searchSongDetail:[],
      count:''
    };
  },
  created() {
    this.getSearchBannerDate();
    
  },
  methods: {
    TB,
    TSS,
    TSLD,
    getSearchBannerDate() {
      this.$axios(getBannerDate).then((data) => {
        this.searchBannerImage = data.banners;
        console.log(this.searchBannerImage);
        this.searchBannerImage.map((item) => {
          if (item.typeTitle == "新歌首发") {
            this.newSongArr.push(item);
          }
        });
        console.log(this.newSongArr);
      });
    },
    changeActive(){
      this.active = 1
    },
    changeActive1(){
      this.active = 2
    },
    changeActive2(){
      this.active = 3
    },
    changeActive3(){
      this.active = 4
    },
    getSongItem() {
      this.$axios(getSongItem(this.searchValue)).then((data) => {
        this.songArr2 = data.result.songs;
        console.log("😁", this.songArr2);
      });
    },
    getSongAllItem(){
      this.$axios(getSongAllItem(this.searchValue)).then((data)=>{
        this.songArr3 = data.result.songs;
        console.log("😍",this.songArr3);
      })
    },
    getAlbumDate(){
      this.$axios(getAlbumDate(this.searchValue)).then((data)=> {
        this.songAlmb = data.result.albums
        console.log('hhh',data);
      })
    },
    getSearchDetailDate(){
      this.$axios(getSearchDetailDate(this.searchValue)).then((data)=> {
        console.log('ggg',data);
        this.searchSongDetail = data.result.playlists
      })
    },

     getSearchData() {
      let timer = null
          clearTimeout(timer)
          timer = setTimeout(() => {
            this.$axios(getSearchDate(this.searchValue)).then((data) => {
            console.log('😁',data);
            this.songArr = data.result.songs;
            this.picUrl = this.songArr[0].al.picUrl;
            this.singerName1 = this.songArr[0].ar[0].name;
            this.count = this.songArr[0].v
          })
        },200)
     
    },
    getAllSongDate(id) {
      this.$axios(getAllSongDate(id)).then((res) => {
        console.log('😘',res);
      });
    },
    getSearchAllSongDate() {
      this.$axios(getSearchAllSongDate(this.searchValue)).then((data) => {
        console.log(data);
        this.allSongArr = data.result.songs;
      });
    },
    toHot(val) {
      this.searchValue = val;
    },
    ChangeIsTrue(val) {
      this.isTrue = !this.isTrue;
      this.searchValue = val;
    },
  },
  watch: {
    searchValue(val) {
      // if()
      if (this.searchValue == "") {
        this.songArr == "";
        this.songArr2 == "";
        this.isShow = true;
        this.isTrue = false;
      } else {
        this.isShow = false;
        this.getSearchData(val);
        this.getSongItem();
        this.getSongAllItem()
        this.getAllSongDate()
        this.getAlbumDate()
        this.getSearchDetailDate()
      }
    },
    ChangeIsTrue(val) {
      this.isTrue = !this.isTrue;
      this.searchValue = val;
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep.search {
  width: 100%;
  height: 100%;
  position: relative;

  .search-tab {
    width: 100%;
    height: 50px;
    display: flex;

    .search-tb {
      width: 10%;
      height: 50px;
      line-height: 50px;
      margin-left: 10px;
    }
    .search-box {
      display: flex;
      width: 85%;
      height: 30px;
      margin: auto 0;
      border-radius: 999px;
      border: 1px solid rgb(238, 236, 236, 0.2);
      // background-color: #1e1e1e;

      .search-icon {
        width: 6%;
        line-height: 35px;
        margin-left: 10px;

        img {
          width: 100%;
        }
      }
      .search-ipt {
        width: 83%;
        height: 100%;
        margin-left: 5px;

        input {
          width: 100%;
          height: 90%;
          border: none;
          outline: none;
          caret-color: #16bd68;
          font-size: 12px;
          color: white;
          background-color: transparent;
        }
      }
    }
  }
  .search-lbt {
    width: 100%;
    // margin-top: 15px;
    .search-lbt-img {
      width: 95%;
      position: relative;
      margin: 0 auto;

      img {
        width: 100%;
        border-radius: 5px;
      }
      .newSong {
        position: absolute;
        top: 0;
        left: 0;
        color: #ccc;
        border-radius: 5px;
        font-size: 12px;
        padding: 5px;
        background-color: transparent;
      }
    }
  }
  .search-songList {
    position: absolute;
    left: 0;
    top: 60px;
    width: 100%;
    height: 70%;
    // background-color: white;

    .song-item {
      width: 100%;
      display: flex;
      .song-item-left {
        width: 15%;
        padding: 15px;
        img {
          width: 60%;
        }
      }
      .song-item-right {
        width: 80%;
        font-size: 12px;
        padding: 16px 0;
        color: #fff;
      }
    }
  }
  .song-content {
    width: 100%;
    height: calc(100vh - 50px);

    .song-content-title {
      width: 100%;
      // height: 100%;
      // background-color: #fff;
    }
  }
  .bigbox {
    width: 100%;
    overflow: auto;
    height: calc(100vh - 93px);

    .want-search {
      width: 100%;
      padding: 10px 0 0 0;

      .want-search-title {
        padding: 10px 0 10px 10px;
        font-size: 15px;
        color: #fff;
      }
      .want-search-content {
        width: 100%;
        display: flex;
        // background-color: transparent;
        // align-items: flex-start;
        .want-search-content-pic {
          width: 20%;
          padding: 10px;
          img {
            width: 100%;
            border-radius: 999px;
            overflow: hidden;
          }
        }
        .want-search-content-text {
          padding: 15px 0;

          .want-search-content-text-singerName {
            margin-top: 5px;
            color: #fff;
          }
          .want-search-content-text-allSong {
            color: #bbb;
            font-size: 13px;
            margin-top: 10px;
          }
        }
      }
    }
    .search-item {
      width: 100%;

      .search-item-list {
        width: 100%;
        // padding: 10px;
        .search-item-list-title {
          padding: 10px;
          color: #fff;
        }
        .allSong-item {
          width: 100%;
          padding: 10px;

          .search-song-name {
            color: #fff;
            font-size: 14px;
          }
          .search-singer-name {
            margin-top: 10px;
            font-size: 12px;
            color: #ddd;
            // float: left;
            margin-right: 5px;
          }
        }
      }
    }

    .search-item-list {
      width: 100%;
      // margin-top: 50px;
    }
    .search-item-footer {
      color: #aaa;
      font-size: 12px;
      padding: 10px;
      display: flex;
      justify-content: space-between;
    }
    .search-singer {
      width: 100%;
      .search-singer-title {
        width: 100%;
        padding: 10px 0 10px 10px;
        color: #fff;
      }
      .search-singer-list {
        width: 100%;
        // padding: 10px;
        display: flex;
        .search-singer-list-left {
          width: 15%;
          img {
            width: 100%;
            border-radius: 999px;
            overflow: hidden;
          }
        }
        .search-singer-list-right {
          padding: 10px 0 10px 10px;
          color: #fff;
          .search-singer-name {
            color: #fff;
          }
          .search-singer-list-count {
            color: #aaa;
            margin-top: 10px;
          }
        }
      }
    }
  }
}
.song {
  color: #fff;
  .search-item {
    width: 100%;
    height: calc(100vh - 95px);
    overflow: auto;
    padding-left: 10px;

    .search-item-list {
      width: 100%;

      .search-item-list-title {
        padding: 10px;
        color: #fff;
      }
      .allSong-item {
        width: 100%;
        padding: 10px;

        .search-song-name {
          color: #fff;
          font-size: 14px;
        }
        .search-singer-name {
          margin-top: 10px;
          font-size: 12px;
          color: #ddd;
          // float: left;
          margin-right: 5px;
        }
      }
    }
  }
}
.singer {
  color: #fff;
  .search-singer {
    width: 100%;
    height: calc(100vh - 93px);
    overflow: auto;
    .search-singer-title {
      width: 100%;
      padding: 10px 0 10px 10px;
      color: #fff;
    }
    .search-singer-list {
      width: 100%;
      padding: 10px;
      display: flex;
      .search-singer-list-left {
        width: 15%;
        img {
          width: 100%;
          border-radius: 999px;
          overflow: hidden;
        }
      }
      .search-singer-list-right {
        padding: 10px 0 10px 10px;
        color: #fff;
        .search-singer-name {
          color: #fff;
        }
        .search-singer-list-count {
          color: #aaa;
          margin-top: 10px;
        }
      }
    }
  }
}
.singer-box {
  display: flex;
}
.Albm {
  color: #fff;
  .search-singer {
    width: 100%;
    height: calc(100vh - 93px);
    overflow: auto;
    .search-singer-title {
      width: 100%;
      padding: 10px 0 10px 10px;
      color: #fff;
    }
    .search-singer-list {
      width: 100%;
      padding: 10px;
      display: flex;
      .search-singer-list-left {
        width: 15%;
        img {
          width: 100%;
          border-radius: 10px;
          overflow: hidden;
        }
      }
      .search-singer-list-right {
        padding: 10px 0 10px 10px;
        color: #fff;
        .search-singer-name {
          color: #fff;
        }
        .search-singer-list-count {
          color: #aaa;
          margin-top: 10px;
        }
      }
    }
  }
}
.songDetail {
  color: #fff;
  .search-singer {
    width: 100%;
    height: calc(100vh - 93px);
    overflow: auto;
    .search-singer-title {
      width: 100%;
      padding: 10px 0 10px 10px;
      color: #fff;
    }
    .search-singer-list {
      width: 100%;
      padding: 10px;
      display: flex;
      .search-singer-list-left {
        width: 15%;
        img {
          width: 100%;
          border-radius: 10px;
          overflow: hidden;
        }
      }
      .search-singer-list-right {
        padding: 10px 0 10px 10px;
        color: #fff;
        .search-singer-name {
          color: #fff;
        }
        .search-singer-list-count {
          color: #aaa;
          margin-top: 10px;
        }
      }
    }
  }
}
.box {
  padding: 10px 0 10px 10px;
}
.loading {
  margin-top: 40%;
}
</style>