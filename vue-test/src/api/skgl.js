import {Config,listParam} from './config' 
import axios from 'axios'


// 获取上刊列表接口
export function getSkglList(data){
	return axios.post(Config.host+Config.SKGL_LIST,data).then((res) => {
     return Promise.resolve(res.data)
  })
}

// 更新上刊的接口
export function updateSkglList(data){
	return axios.post(Config.host+Config.SKGL_UPDATE,data).then((res) => {
    return Promise.resolve(res.data)
  })
}

// 添加上刊
export function addSkglList(params){
	return axios.post(Config.host+Config.SKGL_ADD,params).then((res)=>{
		return Promise.resolve(res.data)
	})
}
// 添加上刊素材接口
export function addSkglMaterial(params){
	return axios.post(Config.host+Config.SKGL_ADDMATERIAL,params).then((res)=>{
		return Promise.resolve(res.data)
	})
}
//删除上刊素材的接口
export function deleteSkglMaterial(params){
	return axios.post(Config.host+Config.SKGL_DELETEMATERIAL,params).then((res)=>{
		return Promise.resolve(res.data)
	})
}
//根据上下刊时间获得重叠上刊的列表
export function getSkglCoinList(params){
	return axios.post(Config.host+Config.SKGL_PUTIN,params).then((res)=>{
		return Promise.resolve(res.data)
	})
}

// 根据上刊的id获取获取上刊详情
export function getSkglDetail(id){
	var params={
		"putin_id":id
	}
	return axios.post(Config.host+Config.SKGL_DETAIL,params).then((res)=>{
		return Promise.resolve(res.data)
	})
}
// 根据id获取已经选择的终端列表
export function getSkglSelected(data){
	return axios.post(Config.host+Config.SKGL_CHOSEDTERNAL,data).then((res)=>{
		return Promise.resolve(res.data)
	})
}

//添加上刊所选择的终端
export function addSkglTernal(data){
	return axios.post(Config.host+Config.SKL_ADDTERNAL,data).then((res)=>{
		return Promise.resolve(res.data)
	})
}
// 删除上刊选择的终端
export function deleteSkglSelected(data){
	return axios.post(Config.host+Config.SKGL_CHOSEDELETE,data).then((res)=>{
		return Promise.resolve(res.data)
	})
}
//提交上刊审核
export function subMitSkglList(data){
	return axios.post(Config.host+Config.SUBMIT_CHECK,data).then((res)=>{
		return Promise.resolve(res.data)
	})
}

//批量或者单个初审核
export function checkSkgl(datas){
	return axios.post(Config.host+Config.SKGL_FIRSTCHECKS,datas).then((res)=>{
		return Promise.resolve(res.data)
	})
}
//批量或者单个复审
export function checkSecondSkgl(datas){
	return axios.post(Config.host+Config.SKGL_SECONDCHECKS,datas).then((res)=>{
		return Promise.resolve(res.data)
	})
}