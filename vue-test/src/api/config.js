
export const listParam= {
    "page":1,
    "pagesize":5
}


export const Config={
	host:'http://39.106.15.225:8081/media-media/',
	ResourceHost:'http://39.106.15.225/upload-file/',
	// 获取字典接口
	DIC_API:'api/sysdictionary/list',
	// 文件上传接口
	FILE_UPLOAD:'api/file/uploadfile',
	
	// 登陆
	LOGIN:'api/pmsnuserinfo/login',
	// 公告管理接口
	NOTICE_LIST:'api/pmsnannouncement/listwithpage', //公告管理
	NOTICE_ADD:'api/pmsnannouncement/save',//添加公告
	NOTICE_LATEST:'api/pmsnannouncement/getlatestann',
	
	//用户管理接口
	USER_LIST:'api/pmsnuserinfo/listwithpage',
	USER_ADD:'api/pmsnuserinfo/save',
	USER_UPDATE:'api/pmsnuserinfo/update',
	USER_EDITE_PWD:'api/pmsnuserinfo/resetpwd',
	USER_UPDATE_PWD:'api/pmsnuserinfo/updatepwd',
	
	// app更新管理接口
	APP_LIST:'api/trmlapkinfo/listwithpage',
	APP_ADD:'api/trmlapkinfo/save',
	APP_EDITE:'api/trmlterminalinfo/update',
	
	//指令列表相关接口
	COMMAND_LIST:'api/trmlcommand/listwithpage',
	COMMAND_DETAIL:'api/trmlcommand/listwithpageresult',
	COMMAND_ADD:'api/trmlcommand/save',
	
	//终端管理的相关接口
	END_LIST:'api/trmlterminalinfo/listwithpage',
	END_ADD:'api/trmlterminalinfo/save',
	PLAY_LIST:'api/mediadisplaylog/listwithpage',
	CAN_USE_ENDLIST:'api/trmlterminalinfo/listwithpageforusable',
	
	// 终端异常记录
	ERR_LIST:'api/trmlterminalheartstatisticsday/listwithpage',
	ERR_SINGLELIST:'api/trmlterminalheartstatisticsday/listwithpagedetial',
	
	//上刊管理的相关接口
	SKGL_LIST:'api/mediaputininfo/listwithpage', //分页获取上刊列表
	SKGL_PUTIN:'api/mediaputininfo/getcoincidenceputin',// 获取上刊周期叠加的上刊
	SKGL_ADD:'api/mediaputininfo/save',//保存上刊
	SKGL_UPDATE:'api/mediaputininfo/update', //更新上刊
	SKGL_DETAIL:'api/mediaputininfo/getdetail',//获取上刊id的详情
	SUBMIT_CHECK:'api/mediaputininfo/submit', // 单个上刊提交审核
	SKGL_FIRSTCHECKS:'api/mediareviewlog/batchfirstreview',//上刊id的第一次审核
	SKGL_SECONDCHECKS:'api/mediareviewlog/batchreview',//上刊id的第二次审核
	SKGL_CHOSEDTERNAL:'api/mediaputininfo/getputinterminallistwithpage', //分页获取已经选择过的终端列表
	SKL_ADDTERNAL:'api/mediaputininfo/addterminal',
	SKGL_CHOSEDELETE:'api/mediaputininfo/deleteterminal', //删除终端
	SKGL_ADDMATERIAL:'api/mediaputinmaterialinfo/savebatch', //添加上刊id的素材
	SKGL_DELETEMATERIAL:'api/mediaputinmaterialinfo/delete' //删除上刊id的素材
}

export const SUCCESS_OK = '0000'
	

