import { Config, SUCCESS_OK } from './config'
import axios from 'axios'

function setValues(name) {
	httpGetDic().then((res) => {
		if(res.repCode == SUCCESS_OK) {
			let stroedValue = window.localStorage.setItem(name, JSON.stringify(res.datas));
			return stroedValue;
		}
	})
}

function httpGetDic() {

	return axios.get(Config.host + Config.DIC_API, {}).then((res) => {
		return Promise.resolve(res.data)
	})

}

let dicItem = function(code) {
	let dictionary = JSON.parse(window.localStorage.getItem("dictionary"));
	let codeValue = dictionary[code];
	return codeValue;
}

let getDicName = function(KEY, Code) {
	//判断传过来的code有没有逗号，有逗号就是两个
	var dic = {};
	var NAME = '';
	dic = JSON.parse(window.localStorage.getItem("dictionary"));

	$.each(dic[KEY].items, function(ItemKey, ItemName) {
		if(ItemName.dic_item_value == Code) {
			NAME = ItemName.dic_item_name;

		}
	})
	return NAME;
}
let getFileName = function(v) {
	var san = jeBox.loading(3,"正在上传...",{maskLock:true,maskClose:false});
	var fileName = '';
	$.ajax({
		url: Config.host + Config.FILE_UPLOAD,
		type: 'POST',
		cache: false,
		data: v,
		async: false,
		processData: false,
		contentType: false
	}).done(function(res) {
		if(res.repCode == SUCCESS_OK) {
			fileName = res.datas;
		}
       jeBox.close(san);
	}).fail(function(res) {});

	return fileName;
}
// 去除数组中的空值
let getArr = function(arr) {
	for(var i = 0; i < arr.length; i++) {
		if(arr[i] == "" || typeof(arr[i]) == "undefined") {
			arr.splice(i, 1);
			i = i - 1;

		}
	}
	return arr;
}
//  变换另一种数组
let newObjArr = function(arr) {
	var newArrs=[];
	for(var i=0;i<arr.length;i++){
		var datas={};
		var urlStr = arr[i];
		if(urlStr.indexOf('.mp4')!=-1){
			datas.url=urlStr;
			datas.type="1"; // 1是视频
		}else{
			datas.url=urlStr;
			datas.type="2"; // 2是图片
		}
		
		newArrs.push(datas);
	}
	arr=newArrs;
	return arr;
}

let editeTitle=function(name){
	
}
export {
	setValues,
	dicItem,
	getDicName,
	getFileName,
	getArr,
	newObjArr
};