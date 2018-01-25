<template>
	<div>
		<div class="modal fade bs-example-modal-lg" tabindex="-1" role="dialog" id="repeatPwdModal">
			<div class="modal-dialog" role="document">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-label="Close"></button>
						<h4 class="modal-title">修改密码</h4>
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

										<label class="control-label">原始密码</label>

										<div class="controls">

											<input type="password" class="span6 m-wrap" v-model="pwd"  />
										</div>

									</div>
                                    <div class="control-group">

										<label class="control-label">新密码</label>

										<div class="controls">

											<input type="password" class="span6 m-wrap" v-model="new_pwd"/>
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
						<button type="button" class="btn btn-default" data-dismiss="modal" >关闭</button>	
					</div>
				</div>
				
			</div>
			
		</div>
		
	</div>
</template>

<script>
	  import Cookies from 'js-cookie'
	 import {updatePwd} from 'api/user'
     import {SUCCESS_OK} from 'api/config'
	 export default {
	 	
	 	data: function () {
		  return { 
	   	 		pwd:'',
	   	 		new_pwd:''
		  }
		},
		name: 'repeatPwdModal',
		
		methods:{
			
			sureAdd:function(){
				// 判断是添加还是更新
				var duration = jeBox.loading(1,"请稍等");
				let params={
					"user_id":JSON.parse(Cookies.get('user_id')),
					"pwd":this.pwd,
					"new_pwd":this.new_pwd
				}
			    
				updatePwd(params).then((res)=>{
					jeBox.close(duration);
					if(res.repCode==SUCCESS_OK){
						$("#repeatPwdModal").modal("hide");
						jeBox.msg('修改成功',{time:1});
					}else{
						/*alert(res.errorMsg)*/
						jeBox.msg(res.errorMsg,{time:1});
					}
				})
				
				
			}
		}
	 }
</script>

<style scoped>
	#repeatPwdModal{
		display: none;
	}
	
</style>