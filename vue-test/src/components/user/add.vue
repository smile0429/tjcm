<template>
	<div>
		<div class="modal fade bs-example-modal-lg" tabindex="-1" role="dialog" id="userAddModal">
			<div class="modal-dialog" role="document">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="closeModal"></button>
						<h4 class="modal-title">用户操作</h4>
					</div>
					<div class="modal-body">
						    <div class="row-fluid">

					<div class="span12">

						<!-- BEGIN SAMPLE FORM PORTLET-->   

						<div class="portlet box ">
							<div class="portlet-body form">

								<!-- BEGIN FORM-->

								<form  class="form-horizontal" enctype="multipart/form-data" id="userForm" >
									
									
									<div class="control-group" v-if="params.user_id==''||params.user_id==null">

										<label class="control-label">用户名&nbsp;<span class="redPoint">*</span></label>

										<div class="controls">

											<input type="text" class="span6 m-wrap"  v-model="params.user_name" autocomplete="off"/>
										</div>

									</div>
                                    
									<div class="control-group">

										<label class="control-label">用户类型&nbsp;<span class="redPoint">*</span></label>

										<div class="controls">

											<select v-model="params.user_type" class="chosen-with-diselect span6" tabindex="-1" >
												<option value="0"  >请选择用户类型</option>
							
												<option v-for="userIrems in userSort.items" :value="userIrems.dic_item_value">
													{{userIrems.dic_item_name}}
												</option>
												
												
											</select>

										</div>
									</div>

                                     <div class="control-group">

										<label class="control-label">状态&nbsp;<span class="redPoint">*</span></label>

										<div class="controls">

											<select v-model="params.state" class="chosen-with-diselect span6" tabindex="-1" >
												<option value="">请选择账户状态</option>
												<option v-for="stateSortItems in stateSort.items" :value="stateSortItems.dic_item_value">{{stateSortItems.dic_item_name}}</option>
											</select>

										</div>
									</div>
									
								</form>    
							</div>
						</div>
					</div>

				</div>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-primary" @click="sureAdd">确定</button>
						<button type="button" class="btn btn-default" data-dismiss="modal" @click="closeModal">关闭</button>
					</div>
				</div>
				
			</div>
			
		</div>
		
	</div>
</template>

<script>
	import Cookies from 'js-cookie'
	import {addUserList,editUserManagement} from 'api/user'
	import {SUCCESS_OK} from 'api/config'
	import {dicItem} from 'api/commonUtil.js'
	 export default {
	 	props:['params'],
	 	data: function () {
		  return { 
	   	 		userSort:dicItem("user_type"),
	   	 		stateSort:dicItem("state")
		  }
		},
		name: 'userAddModal',
		created:function(){
			
		},
		methods:{
			closeModal:function(){
				 
			},
			sureAdd:function(){
				
				let user_id=this.params.user_id;
				// 判断是添加还是更新
				if(this.params.user_name===''){
					jeBox.msg('请输入用户名',{time:1});
					return false;
				}
				if(this.params.user_type===''){
					jeBox.msg('请选择用户类型',{time:1});
					return false;
				}
				if(this.params.state===''){
					jeBox.msg('请选择状态',{time:1});
					return false;
				}
				let params={
					"add_user":JSON.parse(Cookies.get('user_id')),
					"user_name":this.params.user_name,
					"user_type":this.params.user_type,
					"state":this.params.state
				}
				
				
				if(user_id==undefined||user_id==''){
					this._addUser(params);
				}else{
					delete params.user_name;
					delete params.pwd;
					params.user_id=user_id;
					this._editUser(params);	
				}
			},
			_addUser:function(obj){
				 var duration = jeBox.loading(1,"请稍等");
				addUserList(obj).then((res)=>{
					jeBox.close(duration);
					if(res.repCode==SUCCESS_OK){
						jeBox.msg('添加成功',{time:1});
						this.$emit('refreshList');
						$("#userAddModal").modal('hide');
					}else{
						alert(res.errorMsg)
					}
				})
			},
			_editUser:function(obj){
				var duration = jeBox.loading(1,"请稍等");
				editUserManagement(obj).then((res)=>{
					jeBox.close(duration);
					if(res.repCode==SUCCESS_OK){
						jeBox.msg('修改成功',{time:1});
						this.$emit('refreshList');
						$("#userAddModal").modal('hide');
					}
				})
			}
		}
	 }
</script>

<style scoped>
	#userAddModal{
		display: none;
	}
</style>