import {playMode} from 'common/js/config'

const state = {
    loadShow:true,
    singerID:0,
    playing: false,  //开/关
    fullScreen: false, //播放器是否显示
    playlist: [],  //歌曲列表
    sequenceList: [], //备份歌曲列表（用于处理随机播放等）
    mode: playMode.sequence,  //播放模式
    currentIndex: -1,  //播放索引
    randomIndex: -1,  //随机播放样式索引
    song: '',   //歌曲播放链接
    lyric: [],  //歌词
    lyricLine: true, //歌词初始化（用于歌词滚动）
}



export default state