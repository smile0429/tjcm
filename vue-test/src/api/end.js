import {Config,listParam} from './config' 
import axios from 'axios'
// 获取终端列表接口
export function getEndList(data){
	
	return axios.post(Config.host+Config.END_LIST,data).then((res) => {
    return Promise.resolve(res.data)
  })
}
//获取上刊时可用的终端列表
export function canUseEndList(data){
	
	return axios.post(Config.host+Config.CAN_USE_ENDLIST,data).then((res) => {
    return Promise.resolve(res.data)
  })
}
// 添加终端
export function addAppList(params){
	return axios.post(Config.host+Config.END_ADD,params).then((res)=>{
		return Promise.resolve(res.data)
	})
}
// 修改终端
export function editeApp(params){
	return axios.post(Config.host+Config.APP_EDITE,params).then((res)=>{
		return Promise.resolve(res.data)
	})
}
//播放列表
export function lookEnd(data){
	return axios.post(Config.host+Config.PLAY_LIST,data).then((res)=>{
		return Promise.resolve(res.data)
	})
}

//终端异常记录

export function errEndList(para){
	return axios.post(Config.host+Config.ERR_LIST,para).then((res)=>{
		return Promise.resolve(res.data)
	})
}

// 单个终端异常记录
export function errEndListSingle(para){
	return axios.post(Config.host+Config.ERR_SINGLELIST,para).then((res)=>{
		return Promise.resolve(res.data)
	})
}