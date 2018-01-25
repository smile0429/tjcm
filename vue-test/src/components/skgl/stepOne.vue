<template>

	<form class="form-horizontal one_form form-horizontal" enctype="multipart/form-data">

		<div class="row-fluid">
			<div class="span6 ">
				<div class="control-group">

					<label class="control-label">上刊名称&nbsp;<span class="redPoint">*</span></label>

					<div class="controls">

						<input type="text" class="span12 m-wrap" v-model="putin_name" />

					</div>

				</div>
			</div>
			<div class="span6 ">
				<div class="control-group">

					<label class="control-label ">客户名称&nbsp;<span class="redPoint">*</span></label>

					<div class="controls ">

						<input type="text" class=" span12 m-wrap" v-model="customer_name" />
					</div>

				</div>
			</div>
		</div>
		<div class="row-fluid">
			<div class="span6 ">
				<div class="control-group">

					<label class="control-label">上刊时间&nbsp;<span class="redPoint">*</span></label>

					<div class="controls">

						<div class="jeinpbox"><input type="text" class="span12 m-wrap" id="putin_begin_time" placeholder="请选择您的上刊时间" /></div>

					</div>

				</div>
			</div>
			<div class="span6 ">
				<div class="control-group">

					<label class="control-label">下刊时间&nbsp;<span class="redPoint">*</span></label>

					<div class="controls">
						<div class="jeinpbox"><input type="text" class="span12 m-wrap" id="putin_end_time" placeholder="请选择您的下刊时间" /></div>

					</div>

				</div>
			</div>
		</div>
		<div class="row-fluid">
			<div class="span6">

				<div class="control-group">
                    <label class="control-label feeOne">播放类型&nbsp;<span class="redPoint">*</span></label>
                    <div class="controls">
						<label class="radio choseRadio" v-for="typeItem in displaySort.items">
			
						    <input type="radio"  :value="typeItem.dic_item_value" v-model="display_type"/>
		
						     {{typeItem.dic_item_name}}
		
						</label>
                    </div>
				</div>

			</div>
			<div class="span6">

				<div class="control-group">

					<label class="control-label feeOne">是否付费&nbsp;<span class="redPoint">*</span></label>

					<div class="controls">
						<label class="radio choseRadio" v-for="typeItem in putinsort.items">
				
								    <input type="radio" name="putType" :value="typeItem.dic_item_value" v-model="putin_type"/>
				
								     {{typeItem.dic_item_name}}
				
								</label>

					</div>

				</div>

			</div>
			<div class="span6" v-show="display_type==2||display_type==3">

				<div class="control-group ">

					<label class="control-label span3 feeOne">播放时段&nbsp;<span class="redPoint">*</span></label>

					<div class="controls span7">
						  
							<div class="periodItem">
								<div class="jeinpbox mateBox"><input type="text" class="jeinput" id="display_begin_time" placeholder="hh:mm:ss"></div>
								<span>至&nbsp;</span>
								<div class="jeinpbox mateBox"><input type="text" class="jeinput" id="display_end_time" placeholder="hh:mm:ss"></div>
							</div>
						

					</div>

				</div>

			</div>
			
		</div>

		<div class="row-fluid">

			<div class="span12 ">

				<div class="control-group">

					<label class="control-label">不相邻上刊&nbsp;</label>

					<div class="controls">

						<input type="text" v-model="not_near_putin_name" placeholder="请选择投不相邻的广告主" class="span12 m-wrap not_putInName" readonly @click="putinAdvert" />

					</div>

				</div>
			</div>

		</div>
		<my-customer :time="parentTime" v-on:child-param="listenTochild"></my-customer>
	</form>
</template>

<script>
	import Cookies from 'js-cookie'
	import bus from 'api/event'
	import { addSkglList, getSkglDetail, updateSkglList } from 'api/skgl'
	import { SUCCESS_OK } from 'api/config'
	import { dicItem, getFileName, getArr } from 'api/commonUtil.js'
	import myCustomer from '../advertiser/notAll'

	export default {
		data() {
			return {
				customer_name: '',
				duration_every_time: '',
				frequency: '',
				putin_begin_time: '',
				putin_end_time: '',
				putin_name: '',
				putin_type: '',
				parentTime: '',
				display_type:this.$store.state.app.playType,
				putinsort: dicItem("putin_type"),
				displaySort:dicItem("display_type"),
				not_near_putin_id: '',
				not_near_putin_name: ''
			}
		},
		watch:{
			display_type(to,from){
	         	this.$store.commit('updatePlayType',to)
	        },
		},
		components: {
			myCustomer
		},
		created: function() {
			if(this.$store.state.app.putin_id) {
				this._getSkglDetail();
			}
		},
		mounted() {
			$("#putin_begin_time").jeDate({
				format: "YYYY-MM-DD",
				okfun: function(elem, value) {}
			});

			$("#putin_end_time").jeDate({
				format: "YYYY-MM-DD",
				okfun: function(elem, value) {}
			});
			$("#display_begin_time").jeDate({
						format: "hh:mm:ss",
						isinitVal: false,
						zIndex: 2099,
				});
				$("#display_end_time").jeDate({
						format: "hh:mm:ss",
						isinitVal: false,
						zIndex: 2099,
				});
			
		},
		methods: {
			listenTochild: function(msg) {
				this.not_near_putin_id = msg.ids;
				this.not_near_putin_name = msg.names;
			},
			putinAdvert: function() {
				let bTime = $("#putin_begin_time").val();
				let eTime = $("#putin_begin_time").val();
				if(bTime == '' || eTime == '') {
					jeBox.msg('请先选择上下刊时间', {
						time: 1
					});
				} else {
					this.parentTime = $("#putin_begin_time").val() + ',' + $("#putin_end_time").val();
					$("#adverTiserModal").show();
					$('#adverTiserModal').modal();
				}
			},

			checkFrom: function() {

				if(this.customer_name === '' || this.customer_name == null) {
					jeBox.msg('请输入客户名称', {
						time: 1
					});
					return false;
				}
				if(this.putin_name === '' || this.putin_name === null) {
					jeBox.msg('请输入投放名称', {
						time: 1
					});

					return false;
				}
				
				if(this.display_type === '' || this.display_type === null) {
					jeBox.msg('请选择播放类型', {
						time: 1
					});

					return false;
				}
				if(this.display_type ===2||this.display_type ===3){
					 if($("#display_begin_time").val() == '' || $("#display_begin_time").val() === null) {
						jeBox.msg('请输入开始时间段', {
							time: 1
						});
	
						return false;
					}
					if($("#display_end_time").val() == '' || $("#display_end_time").val() === null) {
						jeBox.msg('请输入结束时间段', {
							time: 1
						});
	
						return false;
					}
				}

				if($("#putin_begin_time").val() == '' || $("#putin_begin_time").val() === null) {
					jeBox.msg('请输入上刊时间', {
						time: 1
					});

					return false;
				}
				if($("#putin_end_time").val() == '' || $("#putin_end_time").val() === null) {
					jeBox.msg('请输入下刊时间', {
						time: 1
					});

					return false;
				}
				if(this.putin_type == '' || this.putin_type === null) {
					jeBox.msg('请选择投放类型', {
						time: 1
					});

					return false;
				}

				return true;
			},

			_addSkglList: function() {
				var _this = this;
				
				// 这里要做一个判断 如果有putid就是更新，否则是添加
				let params = {
					"add_user_id": JSON.parse(Cookies.get('user_id')),
					"customer_name": this.customer_name,
					"putin_begin_date": $("#putin_begin_time").val(),
					"putin_end_date": $("#putin_end_time").val(),
					"putin_name": this.putin_name,
					"putin_type": this.putin_type,
					"not_near_putin_id": this.not_near_putin_id,
					"not_near_putin_name": this.not_near_putin_name,
					"display_type":this.display_type
				}
				if(this.display_type!=1){ // 不是1说明是插播或者是轮播加插播
					params.interrupt_display_begin_time=$("#display_begin_time").val();
					params.interrupt_display_end_time =$("#display_end_time").val();
				}
				if(this.$store.state.app.putin_id == '' || this.$store.state.app.putin_id == undefined) { //添加
                    var duration = jeBox.loading(1,"正在添加");
					addSkglList(params).then((res) => {
						jeBox.close(duration);
						if(res.repCode == SUCCESS_OK) {
							this.$store.commit('updatePutinId', res.datas.putin_id);
							// 这里要看指令是要跳转到下一步还是列表页面
							if(this.$store.state.app.isList==1){
									 this.$store.commit('nextStep');
								}else if(this.$store.state.app.isList==2){
									var san = jeBox.loading(3, "请稍等", {
										maskLock: true,
										maskClose: false
									});
									setTimeout(function() {
											jeBox.close(san)
											_this.$router.push({
												path: '/skgl/list'
											})
										}, 3000);
								}else if(this.$store.state.app.isList==3){
									this.$emit('submitCheck');
								}
							
						} else {
							alert(res.errorMsg)
						}
					})

					
				} else {
					let data = Object.assign({}, params, { //更新
						"putin_id": this.$store.state.app.putin_id
					})
					var duration = jeBox.loading(1,"正在更新");
					updateSkglList(data).then((res) => {
						jeBox.close(duration);
						if(res.repCode == SUCCESS_OK) {
							if(this.$store.state.app.isList==1){
									 this.$store.commit('nextStep');
								}else if(this.$store.state.app.isList==2){
									var san = jeBox.loading(3, "请稍等", {
										maskLock: true,
										maskClose: false
									});
									setTimeout(function() {
											jeBox.close(san)
											_this.$router.push({
												path: '/skgl/list'
											})
										}, 3000);
								}else if(this.$store.state.app.isList==3){
									this.$emit('submitCheck');
								}
						} else {
							alert(res.errorMsg)
						}
					})

					
				}

			},
			_getSkglDetail: function() {
				var _this = this;
				var id = this.$store.state.app.putin_id;
				getSkglDetail(id).then((res) => {
					if(res.repCode == SUCCESS_OK) {
						_this.customer_name = res.datas.customer_name;
						_this.putin_name = res.datas.putin_name;

						_this.frequency = res.datas.frequency;
						_this.duration_every_time = res.datas.duration_every_time;
						_this.putin_type = res.datas.putin_type;
						_this.not_near_putin_name = res.datas.not_near_putin_name;
						$("#putin_begin_time").val(res.datas.putin_begin_date);
						$("#putin_end_time").val(res.datas.putin_end_date);
						$("#display_begin_time").val(res.datas.interrupt_display_begin_time);
						$("#display_end_time").val(res.datas.interrupt_display_end_time);

					}
				})
			}
		}

	}
</script>

<style scoped>
	.redPoint {
		color: red;
	}
	
	.feeOne {
		margin-right: 40px;
	}
	
	.controls>.radio.choseRadio {
		margin-right: 30px !important;
	}
	
	.one_form {
		margin-top: 20px !important;
	}
	.periodItem{
		display: inline-flex;
		margin-left: -24px;
	}
	.mateBox{
		width: 33%;
		margin-right: 20px;
	}
	.mateBox input{
		width: 100%;
	}
</style>