<template>
	<div>
		<div class="modal fade bs-example-modal-lg" tabindex="-1" role="dialog" id="appAddModal">
			<div class="modal-dialog modal-lg" role="document">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-label="Close"></button>
						<h4 class="modal-title">添加App</h4>
					</div>
					<div class="modal-body">
						<div class="row-fluid">
							<div class="span12">
								<div class="portlet box ">
									<div class="portlet-body form">
										<form class="form-horizontal" enctype="multipart/form-data" id="appUp">

											<div class="control-group">

												<label class="control-label">选择App文件&nbsp;<span class="redPoint">*</span></label>

												<div class="controls">
													<form id="app_url">
														<input type="file" name="file" class="span10 m-wrap" @change="uploadFile" accept=".apk" />
														<span class="redNotice">注：只允许上传.apk文件</span>
													</form>

												</div>

											</div>
											<div class="control-group">

												<label class="control-label">APP版本号&nbsp;<span class="redPoint">*</span></label>

												<div class="controls">

													<input type="num" class="span10 m-wrap" name="version_num" v-model="version_num" />

												</div>

											</div>
											<div class="control-group">

												<label class="control-label">App名称</label>

												<div class="controls">

													<input type="text" class="span10 m-wrap" name="app_name" v-model="app_name" />

												</div>

											</div>
											<div class="control-group">

												<label class="control-label">版本名称</label>

												<div class="controls">

													<input type="num" class="span10 m-wrap" name="version_name" v-model="version_name" />

												</div>

											</div>
											<input type="hidden" id="paramAppUrl">
										</form>
									</div>
								</div>
							</div>

						</div>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-primary" @click="sureAdd">确定</button>
						<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
					</div>
				</div>

			</div>

		</div>
       
        
	</div>
</template>

<script>
	import Cookies from 'js-cookie'
	import {addAppList} from 'api/pzgl'
	import {getFileName,getArr} from 'api/commonUtil.js'
    import {SUCCESS_OK} from 'api/config'

    
	export default {

		data: function() {
			return {
				app_name: '',
				app_url: '',
				version_name: '',
				version_num: ''
			}
		},
		name: 'appAddModal',
        
		methods: {
			uploadFile: function() {
				let para=new FormData($('#app_url')[0]);
				var backValue=getFileName(para);
				$("#paramAppUrl").val(backValue);
			},
			sureAdd: function() {
				let urlArr=getArr($("#paramAppUrl").val().split(','));
				let truePath=urlArr.join(',');
				let params = {
					"add_user":JSON.parse(Cookies.get('user_id')),
					"app_url": truePath,
					"app_name": this.app_name,
					"version_num": this.version_num,
					"version_name": this.version_name
				}
				if($("#paramAppUrl").val()===''){
					jeBox.msg('请添加上刊文件',{time:1});
					return false;
				}
				if(this.version_num===''){
					jeBox.msg('请添加版本号',{time:1});
					return false;
				}
				this._addApp(params);
				
			},
			_addApp:function(obj){
				var duration = jeBox.loading(1,"请稍等");
				addAppList(obj).then((res)=>{
					jeBox.close(duration);
					if(res.repCode==SUCCESS_OK){
						$("#appAddModal").modal('hide');
						this.$emit('refreshList');
						jeBox.msg('添加成功',{time:1});
						
					}else{
						alert(res.errorMsg)
					}
				})
			}
		}
	}
</script>

<style>
	.redNotice{
		display: block;
		color: red;
	}
	.redPoint{
		color: red;
	}
</style>