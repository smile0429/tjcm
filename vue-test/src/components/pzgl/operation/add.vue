<template>
	<div>
		<div class="modal fade bs-example-modal-lg" tabindex="-1" role="dialog" id="opearateAddModal">
			<div class="modal-dialog modal-lg" role="document">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-label="Close"></button>
						<h4 class="modal-title">添加指令</h4>
					</div>
					<div class="modal-body">
						<div class="row-fluid">
							<div class="span12">
								<div class="portlet box ">
									<div class="portlet-body form">
										<form class="form-horizontal" enctype="multipart/form-data">

											<div class="control-group">

												<label class="control-label">关机时间&nbsp;<span class="redPoint">*</span></label>

												<div class="controls">
													<div class="jeitem">
										                
										                <div class="jeinpbox"><input type="text" class="jeinput" id="power_off" placeholder="hh:mm:ss"></div>
										            </div>

												</div>

											</div>
											<div class="control-group">

												<label class="control-label">音量</label>

												<div class="controls">

													<input type="number" class="span10 m-wrap" v-model="volume_command" />

												</div>

											</div>
											<div class="control-group">

												<label class="control-label">选择终端&nbsp;<span class="redPoint">*</span></label>

												<div class="controls">

													<input type="text" class="span10 m-wrap " readonly v-model="terListName"  @click="deviceModal" />


												</div>
											</div>

											<div class="control-group">

												<label class="control-label">备注</label>

												<div class="controls">

													<textarea class="span10 m-wrap" v-model="remark"></textarea>
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
						<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
					</div>
				</div>

			</div>

            
		</div>
         <my-device ref="myDevice" v-on:child-param="listenTochild"></my-device>
	</div>
</template>

<script>
	import Cookies from 'js-cookie'
	import Config from 'api/config'
    import myDevice from '../../end/device'
    import {addCommand} from 'api/pzgl'
    import {SUCCESS_OK} from 'api/config'
	export default {
		data: function() {
			return {
				list:'',
				remark:'',
				terListName:'',
				ternalList:'',
				volume_command:''
			}
		},
		mounted() {
		   $("#power_off").jeDate({
		        format: "hh:mm:ss",
		        isinitVal:false,
		         zIndex:2099,
		   });
		},
		name: 'opearateAddModal',
        components: {
			myDevice
		},
		methods: {
			listenTochild:function(msg){
				
				this.terListName=msg.names;
				this.ternalList=msg.obj;
			},
			deviceModal:function(){
				$('#deviceModal').show();
				$('#deviceModal').modal();
			},
			sureAdd: function() {
				let params = {
					"add_user":JSON.parse(Cookies.get('user_id')),
					"power_off_time_command":$("#power_off").val(),
					"remark ": this.remark,
					"volume_command": this.volume_command,
					"trml_list":this.ternalList
				}
				if($("#power_off").val()==''){
					jeBox.msg('请输入关机时间');
					return false;
				}
				
				
				this._addCommand(params);
			},
			_addCommand:function(p){
				var duration = jeBox.loading(1,"请稍等");
				var that=this;
				addCommand(p).then((res)=>{
					jeBox.close(duration);
					if(res.repCode==SUCCESS_OK){
						 jeBox.msg('添加成功！', {icon: 2,time:1});
						 this.$emit('refreshList');
						 $('#opearateAddModal').modal('hide');
			
					}
				})
			}
		}
	}
</script>

<style>
	#opearateAddModal{
		display: none;
	}
</style>