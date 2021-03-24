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
