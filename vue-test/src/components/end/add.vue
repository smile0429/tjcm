<template>
	<div>
		<div class="modal fade bs-example-modal-lg" tabindex="-1" role="dialog" id="addOrEditModal">
			<div class="modal-dialog" role="document">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-label="Close"></button>
						<h4 class="modal-title">操作终端</h4>
					</div>
					<div class="modal-body">
						<div class="row-fluid">
                               
							<div class="span12">
								<div class="portlet box ">
									<div class="portlet-body form">
										<form class="form-horizontal" enctype="multipart/form-data">
											<div class="control-group">
												<label class="control-label">终端名称&nbsp;<span class="redPoint">*</span></label>
												<div class="controls">
													<input type="text" class="span10 m-wrap" v-model="params.name" />
												</div>

											</div>

											<div class="control-group">

												<label class="control-label">所在城市&nbsp;<span class="redPoint">*</span></label>

												<div class="controls">
													<select v-model="params.city" class="chosen-with-diselect span10" tabindex="-1">
														<option value="">请选择城市</option>

														<option v-for="cityItems in city.items" :value="cityItems.dic_item_value">
															{{cityItems.dic_item_name}}
														</option>

													</select>
												</div>

											</div>
											<div class="control-group">
												<label class="control-label">所在机构&nbsp;<span class="redPoint">*</span></label>
												<div class="controls">
													<input type="text" class="span10 m-wrap" v-model="params.organization_name" />
												</div>
											</div>
											<div class="control-group">
												<label class="control-label">Mac地址&nbsp;<span class="redPoint">*</span></label>
												<div class="controls">
													<input type="text" class="span10 m-wrap" v-model="params.mac_address" />
												</div>
											</div>
											<div class="control-group">
												<label class="control-label">Ip地址</label>
												<div class="controls">
													<input type="text" class="span10 m-wrap" v-model="params.ip_address" />
												</div>
											</div>

											<div class="control-group">
												<label class="control-label">状态&nbsp;<span class="redPoint">*</span></label>
												<div class="controls">
													<select v-model="params.state" class="chosen-with-diselect span10" tabindex="-1">
														<option value="">请选择状态</option>

														<option v-for="stateItems in state.items" :value="stateItems.dic_item_value">
															{{stateItems.dic_item_name}}
														</option>

													</select>
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
	import { dicItem } from 'api/commonUtil.js'
	import { addAppList,editeApp } from 'api/end'
	import { SUCCESS_OK } from 'api/config'
	export default {
		props: ['params'],
		data() {
			return {
				/*endType:'',*/
				city: dicItem("city"),
				state: dicItem("state")
			}
		},
		name: 'addOrEditModal',
		/*watch:{
			endType(){
				if(this.params){
					this.endType="修改"
				}else{
					this.endType="添加"
				}
			}
		},*/
		methods: {
			sureAdd: function() {
				if(this.params.name===''||this.params.name==undefined){
					jeBox.msg('请输入终端名称',{time:1});
					return false;
				}
				if(this.params.city===''||this.params.city==undefined){
					jeBox.msg('请选择所在的城市',{time:1});
					return false;
				}
				
				if(this.params.organization_name===''||this.params.organization_name==undefined){
					jeBox.msg('请输入所在机构名称',{time:1});
					return false;
				}
				if(this.params.mac_address===''||this.params.mac_address==undefined){
					jeBox.msg('请输入终端Mac地址',{time:1});
					return false;
				}
				let params = {
					"add_user_id":JSON.parse(Cookies.get('user_id')),
					"city": this.params.city,
					"ip_address": this.params.ip_address,
					"mac_address": this.params.mac_address,
					"name": this.params.name,
					"organization_name": this.params.organization_name,
					"state": this.params.state
				}
				if(this.params.terminal_id == '' || this.params.terminal_id == undefined || this.params.terminal_id == null) {
					this._addAppList(params);
				} else {
					params.terminal_id = this.params.terminal_id;
					this._editeAppList(params);
				}
			},
			_addAppList(params){
				var duration = jeBox.loading(1,"请稍等");
				addAppList(params).then((res) => {
					jeBox.close(duration);
					if(res.repCode == SUCCESS_OK) {
						jeBox.msg('操作成功',{time:1});
						this.$emit('refreshList');
						$("#addOrEditModal").modal('hide')
					} else {
						jeBox.msg(res.errorMsg,{time:1})
					}
				})
			},
			_editeAppList(params){
				var duration = jeBox.loading(1,"请稍等");
				editeApp(params).then((res)=>{
					jeBox.close(duration);
					if(res.repCode == SUCCESS_OK) {
						jeBox.msg('操作成功',{time:1});
						this.$emit('refreshList');
						$("#addOrEditModal").modal('hide')
					} else {
						jeBox.msg(res.errorMsg,{time:1})
					}
				})
			}
			
		}
	}
</script>

<style scoped>
	#addOrEditModal {
		display: none;
	}
</style>