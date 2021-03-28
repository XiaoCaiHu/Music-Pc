import {request} from './request'
// import {formatDate} from "assets/common/tool"
// 获取轮播图
export function _getBanner(){
    return request({
        url:'/banner'
    })
    // /personalized
}
// 获取推荐歌单
export function _getPersonalized(){
    return request({
        url:'/personalized'
    })
}
// 获取独家放送
export function _getPrivatecontent(){
    return request({
        url:'/personalized/privatecontent'
    })
}
// 获取推荐新音乐
export function _getPerNewsong(){
    return request({
        url:'/personalized/newsong'
    })
}
// 获取歌单详情
export function _getPlaylistDetail(id){
    return request({
        url:'/playlist/detail',
        params:{
            id:id
        }
    })
}
//  获取歌曲详情
export function _getSongsDetail(id){
    return request({
        url:'/song/detail',
        params:{
            ids:id
        }
    })
}
//  获取歌单评论
export function _getSongsComment(id,limit){
    return request({
        url:'/comment/playlist',
        params:{
            id:id,
            limit:limit
        }
    })
}
//  获取歌曲评论 
export function _getMusicComment(id,limit){
    return request({
        url:'/comment/music',
        params:{
            id:id,
            limit:limit
        }
    })
}
// 获取歌单收藏者
export function _getSongSubscribers(id,limit){
    return request({
        url:'/playlist/subscribers',
        params:{
            id:id,
            limit:limit
        }
    })
}
// 获取歌曲url
export function getSongUrl(id){
    return request({
        url:'/song/url',
        params:{
            id:id
        }
    })
}
// 获取歌词
export function getSongLyric(id){
    return  request({
        url:'/lyric',
        params:{
            id:id
        }
    })
}


// 处理歌曲数据
export class songDetail{
    constructor(songs){
        this.id=songs[0].id;
        this.name=songs[0].name;
        this.album=songs[0].al.name;
        this.song=songs[0].ar[0].name;
        this.pic=songs[0].al.picUrl;
        this.time=songs[0].dt/1000
    }
}

