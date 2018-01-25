<template>
	<div>
		<div class="modal fade bs-example-modal-lg" tabindex="-1" role="dialog" id="addNoticeModal">
			<div class="modal-dialog" role="document">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-label="Close"></button>
						<h4 class="modal-title">添加公告</h4>
					</div>
					<div class="modal-body">
						    <div class="row-fluid">

					<div class="span12">

						<!-- BEGIN SAMPLE FORM PORTLET-->   

						<div class="portlet box ">
							<div class="portlet-body form">

								<!-- BEGIN FORM-->

								<form  class="form-horizontal" enctype="multipart/form-data" >
									
									
									<div class="control-group">

										<label class="control-label">公告标题&nbsp;<span class="redPoint">*</span></label>

										<div class="controls">

											<input type="text" class="span6 m-wrap notice_title"  v-model="notice_title" maxlength="20" placeholder="输入20个字以内"/>

											

										</div>

									</div>

									<div class="control-group">

										<label class="control-label">公告内容&nbsp;<span class="redPoint">*</span></label>

										<div class="controls">

											<textarea rows="3" cols="20" placeholder="您可以在这里输入内容" v-model="notice_content">
												
											</textarea>
											

										</div>

									</div>

									
									
                                   
                                  
								</form>

								<!-- END FORM-->       

							</div>

						</div>

						<!-- END SAMPLE FORM PORTLET-->

					</div>

				</div>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-primary" @click="sureAdd">确定</button>
						<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
						
					</div>
				</div>
				<!-- /.modal-content -->
			</div>
			<!-- /.modal-dialog -->
		</div>
		<!-- /.modal -->
	</div>
</template>

<script>
	import Cookies from 'js-cookie'
	import {addNoticeList} from 'api/notice'
	import {SUCCESS_OK} from 'api/config'

	export default{
	 	data(){
	   	 	return {
	   	 		notice_title:'',
	   	 		notice_content:'' 
	   	 	}
	   	 },
		name: 'addNoticeModal',
		methods:{
			sureAdd:function(){
				
				let params={
					"add_user":JSON.parse(Cookies.get('user_id')),
					"content":this.notice_content,
					"title":this.notice_title
				}
				if(this.notice_title===''){
					jeBox.msg('请添加公告标题',{time:1});
					return false;
				}
				if(this.notice_content===''){
					jeBox.msg('请添加公告内容',{time:1});
					return false;
				}
				var duration = jeBox.loading(1,"正在添加");
				addNoticeList(params).then((res)=>{
					jeBox.close(duration);
					if(res.repCode==SUCCESS_OK){
						jeBox.msg('添加成功',{time:1});
						this.$emit('refreshList');
						$("#addNoticeModal").modal('hide');
					}
				})
				
			}
		}
	 }
</script>

<style>
	.notice_title{
		width: 67% !important;
	}
</style>