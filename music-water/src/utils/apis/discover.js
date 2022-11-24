export const getDiscoverData = '/personalized?limit=10'
export const getHomepageItemList = '/homepage/dragon/ball'
export const getMoreSongData = '/personalized'
export const getSongListDate =  id => `/playlist/track/all?id=${id}&limit=20`
export const getToDetailDate = id => `/song/detail?ids=${id}`
export const getLryic = id => `/lyric?id=${id}`
export const getComment = id => `/comment/music?id=${id}`
export const getBannerDate = '/banner'
// 搜索
export const getSearchDate = keyword => `/cloudsearch?keywords=${keyword}&limit=10`
export const getSongItem = keyword => `/cloudsearch?keywords=${keyword}&limit=5`
export const getSongAllItem = keyword => `/cloudsearch?keywords=${keyword}`
export const getSearchAllSongDate = keyword => `/cloudsearch?keywords=${keyword}`
// 
export const getOrderDate = '/playlist/track/all?id=19723756&limit=20'
export const getNewSongDate = '/playlist/track/all?id=3779629&limit=20'
export const getOriginalDate = '/playlist/track/all?id=2884035&limit=20'
export const getHotDate = '/playlist/hot'
export const getHotSongDate = id => `/playlist/track/all?id=${id}&limit=10`
export const getSongUrl = id => `https://music.163.com/song/media/outer/url?id=${id}.mp3`
export const NEW_SONGS_API = '/personalized/newsong'
export const getRadioDate = id => `/personalized?id=${id}`
export const getMoreRadio = id => `/personalized?id=${id}&limit=1000`
// 获取歌手全部歌曲
export const getAllSongDate = id => `/artist/songs?id=${id}&limit=1000`
//获取歌单全部歌曲
export const getSongDetail = id => `/playlist/detail?id=${id}`
// 搜索专辑
export const getAlbumDate = id => `/cloudsearch?keywords=${id}&type=10`
// 搜索歌单
export const getSearchDetailDate = id => `/cloudsearch?keywords=${id}&type=1000`

// /playlist/track/all?id=${id}&limit=20
export const getDailySongDate = '/recommend/songs'

// 查看歌手
export const getSingerMessage = id => `/artists?id=${id}`
// 查看专辑
export const getSingerAlbum = id => `/artist/album?id=${id}&limit=30`

// 热门歌手
export const getHotSinger = '/top/artists?offset=0&limit=10'

// 歌手粉丝数量
export const getCount = id => `/artist/follow/count?id=${id}`

export const getAllSinger = (id,i,l) => `/artist/list?type=${id}&area=${i}&initial=${l}`