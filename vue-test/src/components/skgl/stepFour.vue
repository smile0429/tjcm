<template>
	<div>
		<div class="portlet box grey myportlet">

			<div class="portlet-title">

				<div class="caption">

					<span>上刊基本信息</span>

				</div>

				<div class="tools hidden-phone">

					<a href="javascript:;" class="collapse"></a>
				</div>

			</div>
			<div class="portlet-body">
				
				<div class="infoDivThree">
					<span>客户名称：</span>
					<span>{{data.customer_name}}</span>
				</div>
				<div class="infoDivThree">
					<span>投放名称：</span>
					<span>{{data.putin_name}}</span>
				</div>
				<div class="infoDivThree">
					<span>投放开始时间：</span>
					<span>{{data.putin_begin_date}}</span>
				</div>
				<div class="infoDivThree">
					<span>投放结束时间：</span>
					<span>{{data.putin_end_date}}</span>
				</div>
				<div class="infoDivThree">
					<span>播放类型：</span>
					<span>{{data.display_type|displayName}}</span>
				</div>
				<div class="infoDivThree">
					<span>投放类型：</span>
					<span>{{data.putin_type|putTypeName}}</span>
				</div>
				<div class="infoDivThree">
					<span>不相邻投放：</span>
					<span>{{data.not_near_putin_name|totalName}}</span>
				</div>
				
				<div class="infoDivThree">
					
					<a href="javascript:void(0)" @click="lookMaterail">素材查看</a>
				</div>
				<div class="infoDivThree">
					<span>投放状态：</span>
					<span>{{data.putin_state|stateName}}</span>
				</div>
			</div>
		</div>
		 <selected-end :selectedId="transId"  ref="selectedEnd"></selected-end>
	    <my-resource :url="parentUrl"></my-resource>
	</div>
</template>

<script>
	import bus from 'api/event'
	import { getSkglDetail,subMitSkglList } from 'api/skgl'
	import selectedEnd from './selectedEnd'
	import { SUCCESS_OK } from 'api/config'
	import { dicItem, getDicName,getArr,newObjArr } from 'api/commonUtil.js'
	import myResource from '../advertiser/resource'

	export default {
		data() {
			return {
				data: '',
				transId:this.$store.state.app.putin_id,
				displayType:'',
				parentUrl:''
			}
		},
		created: function() {
			this._getSkglDetail();
		},
		components: {
			selectedEnd,
			myResource
		},
		mounted(){
			this.parentUrl={
				putin_id:'',
				display_type:''
			}
		},
		filters:{
			putTypeName:function(v){
				let name=getDicName("putin_type",v);
	   	 		return name;
			},
			stateName:function(v){
				let name=getDicName("putin_state",v);
	   	 		return name;
			},
			totalName:function(v){
				let name=v===''||v===undefined?'暂无':v;
	   	 		return name;
			},
			displayName:function(v){
				let name=getDicName("display_type",v);
	   	 		return name;
			}
		},
		methods: {
			
			_getSkglDetail: function() {
				var num_id =this.$store.state.app.putin_id;
				getSkglDetail(num_id).then((res) => {
					if(res.repCode == SUCCESS_OK) {
						this.data = res.datas;
						this.displayType=res.datas.display_type;
					}
				})
			},
			lookMaterail(param){
				$("#resourceModal").show();
				$("#resourceModal").modal();
				this.parentUrl.putin_id=this.$store.state.app.putin_id;
				this.parentUrl.display_type=this.displayType;
				
			},
			// 第三步的保存方法
			savePut(){
				  var flag=true;
				    if(this.data.material_list_response==''||this.data.material_list_response==null){
						jeBox.msg('请添加素材才能提交审核', {
								time: 1
						});
						return false;
					}
					if(this.data.terminal_list_response.length==0){
						jeBox.msg('请添加终端才能提交审核', {
								time: 1
						});
						return false;
					}
		    	
		    	return flag;
			}
		}
	}
</script>

<style>
	.infoDivThree {
		width: 33%;
		float: left;
		height: 30px;
		line-height: 30px;
	}
	
	.infoDivThree span {
		font-size: 16px;
	}
	
	.myportlet {
		margin-top: 10px !important;
		overflow: hidden;
	}
</style>