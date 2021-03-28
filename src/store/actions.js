import * as types from './mutations-types'
import {getSongLyric,getSongUrl} from 'network/diyRecom.js'


export const selectPlay = async function({commit},{list,index}) {
  // 获取歌曲,写在这里防止踩坑!>_<!
  const {data:res} = await getSongUrl(list[index].id)
  // console.log(res);
  const {data:lyricRes} = await getSongLyric(list[index].id)
  console.log(lyricRes);
  // 判断是否能获取歌词
  
  if(res.code===200 && lyricRes.code===200) {
    commit(types.SET_SEQUENCE_LIST,list)
    commit(types.SET_PLAYLIST,list)
    commit(types.SET_CURRENT_INDEX,index)
    commit(types.SET_FULL_SCREEN,true)
    commit(types.SET_PLAYING,true) 
    commit(types.SET_SONG,res.data)
    commit(types.SET_LYRIC,lyricRes)
  }
}

// 点击前进/后退换歌,问就是之前搞得坑
export const NextPrev = async function({commit},{list,index}) {

  const {data:res} = await getSongUrl(list[index].id)
  const {data:lyricRes} = await getSongLyric(list[index].id)

  if(res.code===200 && lyricRes.code===200) {
    commit(types.SET_SONG,res.data)
    commit(types.SET_LYRIC,lyricRes)
  }
}