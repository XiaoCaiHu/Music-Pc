import {request} from './request'

//  手机号登录
export function _LoginCellphone(phone,password){
    return  request({
        url:'/login/cellphone',
        params: {
            phone:phone,
            password:password
        }
    })
}