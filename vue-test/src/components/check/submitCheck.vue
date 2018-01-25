<template>
	<div>
		<div class="modal fade bs-example-modal-lg" tabindex="-1" role="dialog" id="submitcheckModal">
			<div class="modal-dialog" role="document">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-label="Close"></button>
						<h4 class="modal-title">提交审核</h4>
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

										<label class="control-label">提交说明</label>

										<div class="controls">
											<textarea class="span10 m-wrap"  v-model="submit_remark" placeholder="请填写您的审核意见"></textarea>
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
	import {subMitSkglList,getSkglDetail} from 'api/skgl'
	 export default {
	 	props:['subPara'],
	 	data: function () {
		  return { 
		  	    submit_remark:'',
		  	    marerial:[],
		  	    ternalList:[]
		  }
		},
		name: 'submitcheckModal',
		watch:{
			subPara:{
		      handler: function (newVal) {
		          this.getDetail();
		      },
		      deep: true
		    }
		},
		methods:{
			getDetail(){
				 let id=this.subPara,
				      _this=this;
				getSkglDetail(id).then((res) => {
					if(res.repCode == SUCCESS_OK) {
						if(res.datas.material_list_response!=null){
						   _this.marerial=res.datas.material_list_response;
						    _this.ternalList=res.datas.terminal_list_response;
						}

					}
				})
			},
			sureAdd:function(){
				if(this.marerial.length==0){
					jeBox.msg('此上刊还没添加素材',{time:1});
					return false;
				}
				if(this.ternalList.length==0){
					jeBox.msg('此上刊还没添加终端',{time:1});
					return false;
				}
				var para = {
					"putin_id": this.subPara,
					"submit_remark": this.submit_remark
				}
				subMitSkglList(para).then((res) => {
					if(res.repCode == SUCCESS_OK) {
						jeBox.msg('操作成功',{time:1});
						this.$emit('requestList');
						$("#submitcheckModal").modal('hide');
					} else {
						alert(res.errorMsg)
					}
				})
				
			}
			
		}
	 }
</script>

<style>
	#submitcheckModal{
		display: none;
	}
</style>