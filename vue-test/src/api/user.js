import {Config,listParam} from './config' 
import axios from 'axios'
// 获取用户列表接口
export function getUserList(data){
	return axios.post(Config.host+Config.USER_LIST,data).then((res) => {
    return Promise.resolve(res.data)
  })
}

// 添加
export function addUserList(params){
	return axios.post(Config.host+Config.USER_ADD,params).then((res)=>{
		return Promise.resolve(res.data)
	})
}

//修改 用户的一些身份信息

export function editUserManagement(params){
	return axios.post(Config.host+Config.USER_UPDATE,params).then((res)=>{
		return Promise.resolve(res.data)
	})
}

// 用户更新密码
export function repeatPwd(params){
	return axios.post(Config.host+Config.USER_EDITE_PWD,params).then((res)=>{
		return Promise.resolve(res.data)
	})
}

// 用户修改密码
export function updatePwd(params){
	return axios.post(Config.host+Config.USER_UPDATE_PWD,params).then((res)=>{
		return Promise.resolve(res.data)
	})
}