<template>
	<div id="slAdd">

		<my-title></my-title>
		<div class="underContent">
			<div class="row-fluid">

				<div class="span12">

					<div class="portlet box" id="form_wizard_1">

						<div class="portlet-title">
						</div>

						<div class="portlet-body form">

							<form action="#" class="form-horizontal" id="submit_form">

								<div class="form-wizard">

									<my-step :stepParam="parentStep"></my-step>
									<my-bar :barParam="parentbar"></my-bar>
									<div class="tab-content">
										<div class="tab-pane" v-if="parentStep==1" :class="parentStep==1? 'active' : ''">

											<step-one ref="stepOne" @submitCheck="subCheck"></step-one>
										</div>

										<div class="tab-pane" v-if="parentStep==2" :class="parentStep==2? 'active' : ''">

											<step-two ref="stepTwo" @submitCheck="subCheck"></step-two>
										</div>

										<div class="tab-pane" v-if="parentStep==3" :class="parentStep==3? 'active' : ''">

											<step-three ref="stepThree" @submitCheck="subCheck"></step-three>

										</div>
										<div class="tab-pane" v-if="parentStep==4" :class="parentStep==4? 'active' : ''">
											<step-four ref="stepFour"></step-four>

										</div>
									</div>

									<div class="form-actions clearfix">

										<a href="javascript:;" class="btn button-previous" v-if="((editeType==1)&&(parentStep!=1))||((editeType==2)&&(parentStep!=1)&&(currentState==1))" @click="prestep">

											<i class="m-icon-swapleft"></i>上一步

										</a>

										<div v-if="((editeType==1)&&(parentStep!=4))||((editeType==2)&&(parentStep!=4)&&(currentState==1))" class="inlineBlock">
											<a href="javascript:;" class="btn blue button-next" @click="nextstep">

												下一步 <i class="m-icon-swapright m-icon-white"></i>

											</a>

											<a href="javascript:;" class="btn green button-submit" @click="subSk">

												保存草稿
											</a>
										</div>
										<div class="inlineBlock checkBlock" v-if="((editeType==1)&&(parentStep==4))||((editeType==2)&&(parentStep==4)&&(currentState==1))||((editeType==2)&&((currentState==4)||(currentState==5)||(currentState==8)))">
											
											<!--<input type="text" placeholder="请填写您修改过的内容，方便审核" class="remarks" v-model="submit_remark">-->
											<textarea placeholder="请填写内容，方便审核" class="remarks" v-model="submit_remark"></textarea>
											<a href="javascript:;" class="btn green button-submit" @click="subCheckTodo">

												提交审核
											</a>

										</div>

										<a href="javascript:;" class="btn icn-only yellow backList" v-if="editeType!=1" @click="skglMenu">

											<i class="m-icon-swapleft m-icon-white"></i>&nbsp;&nbsp;返回上刊列表
										</a>
									</div>

								</div>

							</form>

						</div>
					</div>

				</div>

			</div>
		</div>
	</div>

</template>

<script>
	import myTitle from 'base/page/title'
	import { subMitSkglList } from 'api/skgl'
	import { SUCCESS_OK } from 'api/config'
	import jQuery from 'common/js/jquery-1.10.1.min.js'
	import Config from 'api/config'

	import myStep from 'base/wizard/stepTitle'
	import myBar from 'base/wizard/stepBar'
	import stepOne from './stepOne'
	import stepTwo from './stepTwo'
	import stepThree from './stepThree'
	import stepFour from './stepFour'
	export default {
		data() {
			return {
				isShowLeftRight: true,
				submit_remark: ''
			}
		},
		computed: {
			editeType(){
				return this.$store.state.app.editeype;
			},
			parentStep() {
				return this.$store.state.app.stepFlag;
			},
			parentbar() {
				return this.$store.state.app.stepFlag;
			},
			currentState() {
				return this.$store.state.app.putin_state;
			},
			putin_id() {
				return this.$store.state.app.putin_id;
			},
			display_type() {
				return this.$store.state.app.playType;
			}
		},
		name: 'slAdd',
		components: {
			myTitle,
			myStep,
			myBar,
			stepOne,
			stepTwo,
			stepThree,
			stepFour
		},
		watch: {
			editeType(to, from) {
				this.$store.commit('updataEditeype', to);
			},
			parentStep(to, from) {
				this.$store.commit('updateStep', to);
			},
			currentState(to, from) {
				this.$store.commit('updatePutinstate', to);
			},
			putin_id(to, from) {
				this.$store.commit('updatePutinId', to);
			},
			display_type(to, from) {
				this.$store.commit('updatePlayType', to)
			}
		},
		created: function() {

			if(JSON.stringify(this.$route.params) == "{}") {} else {
				let editeType = this.$route.params.editType; // list页面传过来的操作类型
				let stepNum = this.$route.params.stepParam;
				let putin_state = this.$route.params.putin_state;
				let putin_id = this.$route.params.putin_id;
				let display_type = this.$route.params.display_type;
				this.$store.commit('updataEditeype', editeType);
				// 把状态管理中的步骤值改为最新的
				this.$store.commit('updatePlayType', display_type)
				this.$store.commit('updateStep', stepNum);
				// 把状态管理中的状态更新为最新的
				this.$store.commit('updatePutinstate', putin_state);
				// 更新状态管理的投放id
				this.$store.commit('updatePutinId', putin_id);
				if(this.currentState == 1) {
					this.isShowLeftRight = true;
				} else {
					this.isShowLeftRight = false;
				}

			}
		},
		methods: {
			nextstep: function() {
				this.$store.commit('updateIsList', 1);
				if(this.parentStep == 1) {
					if(this.isNextStep()) {
						this.$refs.stepOne._addSkglList(); // 第一步进行添加或者更新上刊
					}
				} else if(this.parentStep == 2) {
					this.$refs.stepTwo._updateSkglMaterial()
				} else if(this.parentStep == 3) {
					this.$refs.stepThree.checkternals()
				}

			},
			prestep: function() {
				this.$store.commit('updateIsList', 1);
				var _this = this;
				if(this.parentStep == 2) {
					this.$store.commit('preStep');

				} else if(this.parentStep == 3) {
					this.$store.commit('preStep');
				} else if(this.parentStep == 4) {
					this.$store.commit('preStep');
				}
			},
			subSk: function() {
				this.$store.commit('updateIsList', 2);
				var _this = this;
				if(this.parentStep == 1) {
					if(this.isNextStep()) {
						this.$refs.stepOne._addSkglList()
					}
				} else if(this.parentStep == 2) {
					this.$refs.stepTwo._updateSkglMaterial()
				} else if(this.parentStep == 3) {
					this.$refs.stepThree.checkternals()
				} else if(this.parentStep == 4) {
					// 正常流程的第四步是提交审核
					if(_this.subCheck()) {
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
					}

				}
			},

			// 提交审核的接口
			subCheckTodo() {
				this.$store.commit('updateIsList', 3);
				var _this = this;
				if(this.parentStep == 1) {
					if(this.isNextStep()) {
						this.$refs.stepOne._addSkglList()
					}
				} else if(this.parentStep == 2) {
					this.$refs.stepTwo._updateSkglMaterial();
				} else if(this.parentStep == 3) {
					this.$refs.stepThree.checkternals()
				} else if(this.parentStep == 4) {
					if(this.$refs.stepFour.savePut()) {
						_this.subCheck()
					}

				}
			},
			isNextStep: function() {
				// 以下都是每一步的验证
				if(this.parentStep == 1) {
					return this.$refs.stepOne.checkFrom();
				} else if(this.parentStep == 2) {

				}
			},
			subCheck() {
				var _this = this;
				var para = {
					"putin_id": this.$store.state.app.putin_id,
					"submit_remark": this.submit_remark
				}
				subMitSkglList(para).then((res) => {
					if(res.repCode == SUCCESS_OK) {
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
					} else {
						alert(res.errorMsg)
					}
				})

			},
			skglMenu() {
				this.$router.push({
					path: '/skgl/list'
				});
			}

		}

	}
</script>

<style scoped>
	.remarks {
		width: 40%;
		margin-left: 10px;
	}
	
	.backList {
		float: right;
	}
	
	.inlineBlock {
		display: inline-block;
	}
	.checkBlock{
		width: 70%;
	}
</style>