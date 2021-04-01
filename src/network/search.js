import {request} from './request'

// /search/hot/detail
// 获取热门搜索
export function _getSearctHot(){
    return  request({
        url:'/search/hot/detail'
    })
}

// 搜索建议
export function _getSearcSuggest(keywords){
    return  request({
        url:'/search/suggest',
        params:{
            keywords:keywords
        }
    })
}

// 多重搜索（搜索结果）   
export function _getSearcMultimatch(keywords){
    return  request({
        url:'/search/multimatch',
        params:{
            keywords:keywords
        }
    })
}

// 搜索结果 /searchs
export function _search(key){
    return request({
        url:'/search',
        params:{
            keywords:key,
            limit:50
        }
    })
}