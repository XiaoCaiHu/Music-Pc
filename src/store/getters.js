// getters相当于计算属性
export const loadShow = state => state.loadShow
export const singerID = state => state.singerID
export const playing = state => state.playing
export const fullScreen = state => state.fullScreen
export const playlist = state => state.playlist
export const sequenceList = state => state.sequenceList
export const mode = state => state.mode
export const currentIndex = state => state.currentIndex 
export const randomIndex = state => state.randomIndex
export const song = state => state.song
export const lyric = state => state.lyric  
export const lyricLine1 = state => state.lyricLine
export const currentSong = (state) => {
    return state.playlist[state.currentIndex]
}