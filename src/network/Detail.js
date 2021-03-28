import {request} from './request'

// 获取歌单分类
export function _getHot(){
    return request({
        url:'/playlist/hot'
    })
}

// 获取歌单分类内容
export function _getHigDetail(cat,limit){
    return request({
        url:'/top/playlist/highquality',
        params:{
            cat:cat,
            limit:limit
        }
    })
}
// 获取歌单分类内容
export function _getArtistList(type,area,limit){
    return request({
        url:'/artist/list',
        params:{
            type:type,
            area:area,
            limit:limit
        }
    })
}
// 所有榜单
export function _getTopList(){
    return request({
        url:'/toplist'  
    })
}
// 获得歌手部分信息和热门歌曲
export function _getArtists(id){
    return request({
        url:'/artists',
        params:{
            id:id
        }  
    })
}
// 获取歌手专辑 
export function _getArtistsAlbum(id){
    return request({
        url:'/artist/album',
        params:{
            id:id
        }  
    })
}
// 获取歌手MV 
export function _getArtistsMV(id){
    return request({
        url:'/artist/mv',
        params:{
            id:id
        }  
    })
}
// 获取歌手履历 
export function _getArtistsDesc(id){
    return request({
        url:'/artist/desc',
        params:{
            id:id
        }  
    })
}
// 获取歌手专辑歌曲
export function _getAlbum(id){
    return request({
        url:'/album',
        params:{
            id:id
        }
    })
}


