<template>
	<div>
		<div class="modal fade bs-example-modal-lg" tabindex="-1" role="dialog" id="checkModal">
			<div class="modal-dialog" role="document">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-label="Close"></button>
						<h4 class="modal-title">审核</h4>
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

										<label class="control-label">审核结果</label>

										<div class="controls">


											<select v-model="review_result" class="chosen-with-diselect span10" tabindex="-1" >
												<option value="">请选择</option>
												<option v-for="reviewItems in review.items" :value="reviewItems.dic_item_value">{{reviewItems.dic_item_name}}</option>
											</select>

										</div>

									</div>
                                    <div class="control-group">

										<label class="control-label">审核意见</label>

										<div class="controls">
											<textarea class="span10 m-wrap"  v-model="review_content" placeholder="请填写您的审核意见"></textarea>
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
	import { SUCCESS_OK } from 'api/config'
	import { dicItem,getDicName } from 'api/commonUtil.js'
	import {checkSkgl,checkSecondSkgl} from 'api/skgl'
	 export default {
	 	props:['putItems'],
	 	data: function () {
		  return { 
		  	    review_result:'',
		  	    review_content:'',
	   	 		review:dicItem("review_result")
		  }
		},
		name: 'checkModal',
		
		methods:{
			sureAdd:function(){
				if(this.putItems.putin_state==2){
					let params={
						"first_review_user":JSON.parse(Cookies.get('user_id')),
						"putin_ids":this.putItems.put_ids,
						"log_ids":this.putItems.put_logs,
						"first_review_result":this.review_result,
						"first_review_content":this.review_content
					}	
				    this._checkPut(params);
				}else if(this.putItems.putin_state==3){
					let params={
						"review_user":JSON.parse(Cookies.get('user_id')),
						"putin_ids":this.putItems.put_ids,
						"log_ids":this.putItems.put_logs,
						"review_result":this.review_result,
						"review_content":this.review_content
					}	
				    this._checkSecond(params);
				}
				
			},
			// 待初审
			_checkPut:function(params){
				checkSkgl(params).then((res) => {
					if(res.repCode == SUCCESS_OK) {
						$("#checkModal").modal('hide');
						this.$emit('refreshList');
						jeBox.msg('操作成功',{time:1});
					}else{
						alert(res.errorMsg);
					}
				})
			},
			// 复审
			_checkSecond(params){
				checkSecondSkgl(params).then((res) => {
					if(res.repCode == SUCCESS_OK) {
						$("#checkModal").modal('hide');
						this.$emit('refreshList');
						jeBox.msg('操作成功',{time:1});
					}else{
						alert(res.errorMsg);
					}
				})
			}
			
		}
	 }
</script>

<style>
	#checkModal{
		display: none;
	}
</style>