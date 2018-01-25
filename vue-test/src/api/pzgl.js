import {Config,listParam} from './config' 
import axios from 'axios'
// 获取App列表接口
export function getAppList(para){
	return axios.post(Config.host+Config.APP_LIST,para).then((res) => {
    return Promise.resolve(res.data)
  })
}

// 添加app
export function addAppList(params){
	return axios.post(Config.host+Config.APP_ADD,params).then((res)=>{
		return Promise.resolve(res.data)
	})
}

//获取指令列表
export function getCommandList(para){
	return axios.post(Config.host+Config.COMMAND_LIST,para).then((res)=>{
		return Promise.resolve(res.data)
	})
}

// 查看指令详情
export function lookCommand(datas){
	return axios.post(Config.host+Config.COMMAND_DETAIL,datas).then((res)=>{
		return Promise.resolve(res.data)
	})
}

// 添加指令
export function addCommand(datas){
	return axios.post(Config.host+Config.COMMAND_ADD,datas).then((res)=>{
		return Promise.resolve(res.data)
	})
}
