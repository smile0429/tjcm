import {Config} from './config' 
import axios from 'axios'
// 获取公告列表接口
export function getNoticeList(listParam){
	return axios.post(Config.host+Config.NOTICE_LIST, listParam).then((res) => {
    return Promise.resolve(res.data)
  })
}

// 添加公告
export function addNoticeList(params){
	return axios.post(Config.host+Config.NOTICE_ADD,params).then((res)=>{
		return Promise.resolve(res.data)
	})
}

// 获取最新的公告

export function latestNotice(){
	return axios.post(Config.host+Config.NOTICE_LATEST,{}).then((res)=>{
		return Promise.resolve(res.data)
	})
}