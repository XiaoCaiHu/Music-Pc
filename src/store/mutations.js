import * as types from './mutations-types'
import {createLrcObj} from 'common/js/lrc'

const mutations = {
    [types.SETLOADSHOW](state,loadShow){
        state.loadShow = loadShow
    },
    [types.GETSINGERID](state,id){
        state.singerID = id
    },
    [types.GETMUSICLIST](state,list){
        state.musiclist = list
    },
    [types.SET_PLAYING](state,flag){
        state.playing = flag
    },
    [types.SET_FULL_SCREEN](state,flag){
        state.fullScreen = flag
    },
    [types.SET_PLAYLIST](state,list){
        state.playlist = list
    },
    [types.SET_SEQUENCE_LIST](state,list){
        state.sequenceList = list
    },
    [types.SET_PLAY_MODE](state,mode){
        state.mode = mode
    },
    [types.SET_CURRENT_INDEX](state,index){
        state.currentIndex = index
    },
    [types.SET_RANDOM_INDEX](state,index){
        // let index1 = list.findIndex((item) => {
        //     return item.id === this.currentSong.id
        // })
        state.randomIndex = index
    },
    [types.SET_SONG](state,res){
        if(res) {
            for(let k in res){
                state.song = res[k].url
                console.log(state.song);
            }
        }else {
            state.song = null
        }
        
    },
    [types.SET_LYRIC](state,lyricRes){
        if(lyricRes.nolyric==true || lyricRes.needDesc==true) {
            state.lyric = []
            return
        }else{
            state.lyric = createLrcObj(lyricRes.lrc.lyric)
        } 
    },
    [types.GETLYRICLINE](state,lyricLine){
        state.lyricLine = lyricLine
    },
}

export default mutations