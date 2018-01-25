<template>
	<div>

		<div class="modal fade bs-example-modal-lg" tabindex="-1" role="dialog" id="resourceModal">
			<div class="modal-dialog" role="document">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-label="Close"></button>
						<h4 class="modal-title"><strong>{{url.display_type|name}}</strong>资源查看</h4>
					</div>
					<div class="modal-body">
						
						 <div v-for="urlItem in material_url" class="urlDiv">
						 	<div class="sourceArea">
						 		 <!--<video v-lazy="imgPort+urlItem.material_url" controls="controls" v-if="urlItem.type==1" class="videoDiv">
								    抱歉您的浏览器不支持视频播放
								</video>-->
							 	<video :src="urlItem.material_url|totalUrl" controls="controls" v-if="urlItem.type==1" class="videoDiv">
								    抱歉您的浏览器不支持视频播放
								</video>
							 	<img v-lazy="imgPort+urlItem.material_url" class="img" v-if="urlItem.type==2"/>
						 	</div>
						 	<div v-if="url.display_type==1||url.display_type==3" class="showDIv">
						 		<span>频次：</span>
						 	    <span>{{urlItem.frequency}}次</span>
						 	</div>
						 	<div class="showDIv">
						 		<span>播放时长：</span>
						 	    <span><span>{{urlItem.duration_every_time}}(秒)</span></span>
						 	</div>
						 	
						 </div>
						 <h3 v-if="!material_url||material_url.length==0" v-show="!loading">
						 	您还没添加任何素材!
						 </h3>
						 <my-loading v-show="loading"></my-loading>
					</div>
					<div class="modal-footer">
						
						<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
						
					</div>
				</div>
				
			</div>
		
		</div>
		
		
	</div>
</template>

<script>
	import {Config} from 'api/config.js'
	import myLoading from 'base/page/Loading.vue'
	import {getSkglDetail} from 'api/skgl'
	import { SUCCESS_OK } from 'api/config'
	import { getDicName,getArr } from 'api/commonUtil.js'
	export default {
		data() {
			return {
				imgPort:Config.ResourceHost,
				material_url:[],
				loading:true
			}
		},
		components: {
			myLoading	
		},
		filters:{
			totalUrl:function(v){
				let result=Config.ResourceHost+v;
	   	 		return result;
			},
			name(v){
				let name=getDicName("display_type",v);
	   	 		return name;
			}
		},
		props: ['url'],
		watch:{
			url:{
		      handler: function (newVal) {
		          this.getDetail();
		      },
		      deep: true
		    }
		},
		methods:{
			getDetail(){
				let id=this.url.putin_id,
			        display_type=this.url.display_type
				var _this=this;
			    this.material_url=[]
			    this.loading=true;
				getSkglDetail(id).then((res) => {
					this.loading=false;
					if(res.repCode == SUCCESS_OK) {
						if(res.datas.material_list_response!=null){
						   var myArr=[];
						   let	backresult=getArr(res.datas.material_list_response);
					    	$.each(backresult, function(k,v) {
					    		
					    		if(v.material_url.indexOf('.mp4')>=0){
					    			
					    			v.type="1"; // 1是视频
					    		}else{
					    
					    			v.type="2"; // 2是图片
					    		}
					    		myArr=backresult;
					       });
						   _this.material_url=myArr;
						}

					}
				})
			}
		}
		

	}
</script>

<style>
	#resourceModal {
		display: none;
		width: 80%;
		left: 30%;
	}
	
	.urlDiv{
		width: 200px;
		height: 280px;
		border: solid 1px #EEEEEE;
		float: left;
		margin-right: 20px;
	}
	.sourceArea {
		display: block;
		height: 200px;
		position: relative;
		border: solid 1px #EEEEEE;
		margin-bottom: 10px;
		padding-top: 10px;
	}
	.videoDiv{
		display: block;
		width: 200px;
		height: 200px;
		display: block;
		margin: 0px auto;
		
	}
	.urlDiv img{
		display: block;
		max-width: 100%;
		max-height: 200px;
		margin: 0px auto;
	}
	.showDIv{
		text-align: center;
		
	}
</style>