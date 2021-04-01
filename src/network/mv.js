import {request} from './request'

// 获取Mv内容
export function _getMvDetail(mvid){
    return request({
        url:'/mv/detail',
        params:{
            mvid:mvid
        }
    })
}

// 获取Mv内容
export function _getMvUrl(id){
    return request({
        url:'/mv/url',
        params:{
            id:id
        }
    })
}
// 获取MV评论 
export function _getMvComment(id,limit){
    return request({
        url:'/comment/mv',
        params:{
            id:id,
            limit:limit
        }
    })
}
//   添加评论 
export function _setComment(t,type,id,content){
    return request({
        url:'/comment',
        params:{ 
            t:t,
            type:type,
            id:id,
            content:content
        }
    })
}
// 相似MV 
export function _getMvSimi(mvid){
    return request({
        url:'/simi/mv',
        params:{
            mvid:mvid
        }
    })
}
// 最新MV 
export function _getMvFirst(area,limit){
    return request({
        url:'/mv/first',
        params:{
            area:area,
            limit:limit
        }
    })
}
// 排行Nv 
export function _getMvTop(area,limit){
    return request({
        url:'/top/mv',
        params:{
            area:area,
            limit:limit
        }
    })
}
// 全部MV 
export function _getMvAll(area='全部',type='全部',order='最新',limit){
    return request({
        url:'/mv/all',
        params:{
            area:area,
            type:type,
            order:order,
            limit:limit
        }
    })
}
