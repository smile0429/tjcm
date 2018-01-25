<template>
	<div>
		 <my-file v-on:resourceParam="changeCart" :source="Parentmaterial_url" id="addPicForm">
		    
	     </my-file>
	     <my-loading v-show="loading" class="materialLoading"></my-loading>
	</div>
	
</template>

<script>
	import Cookies from 'js-cookie'
	import bus from 'api/event'
	import { getSkglDetail, updateSkglList,addSkglMaterial,deleteSkglMaterial} from 'api/skgl'
	import { SUCCESS_OK } from 'api/config'
	import { getFileName,getArr} from 'api/commonUtil.js'
	import myFile from 'base/page/fileUpload'
	import myLoading from 'base/page/Loading.vue'
	
	export default {
		data() {
			return {
				putin_type: '',
				material_url: '',
				Parentmaterial_url:[],
				parentTime: '',
				material_url:'',//传递给上刊更新的url字符串
				pid:this.$store.state.app.putin_id,
				display_type:this.$store.state.app.playType,
				loading:true
			}
		},
		components: {
			myFile,
			myLoading
		},
       
		created: function() {
            this._getSkglDetail();
		},

		methods: {
			changeCart:function(info){
				let comBackArr=[]
				$.each(info,function(key,value){
					var obj = JSON.parse(JSON.stringify(value));
					delete obj.type;
					comBackArr.push(obj);
				})
			
				this.material_url=comBackArr;
			},
			_updateSkglMaterial(){
				let _this=this;
				let isfinish=this.material_url.every(function(currentValue,index,arr){
					if(_this.display_type==1||_this.display_type==3){ //轮播
						let isExit=(currentValue.duration_every_time)&&(currentValue.duration_every_time!=0)&&(currentValue.frequency)&&(currentValue.frequency!=0)
					    return isExit
					}else if(_this.display_type==2){ //插播或者插播并且轮播
						let isExit=(currentValue.duration_every_time)&&(currentValue.duration_every_time!=0)
					    return isExit
					}
					
				})
				
				if(isfinish){
					let data={
						material_list:this.material_url,
						putin_id:this.pid
					}
					if(this.material_url.length!=0){
						var duration = jeBox.loading(1,"正在添加");
						addSkglMaterial(data).then((res) => {
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
							}else{
								alert(res.errorMsg)
								
							}
						})
					}else{
						jeBox.msg('请添加素材', {
							time: 1
						});
						return false;
					}
					
				}else{
					jeBox.msg('请完善图片上刊所必填的字段', {
						time: 1
					});
					return false;
				}
			},
			_getSkglDetail: function() {
				var _this = this;
				var id =this.$store.state.app.putin_id;
				_this.loading=true;
				getSkglDetail(id).then((res) => {
					_this.loading=false;
					if(res.repCode == SUCCESS_OK) {
						if(res.datas.material_list_response!=null){
							
							_this.material_url=res.datas.material_list_response;
							//判断素材的类型
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
						   _this.Parentmaterial_url=myArr;
						}
						
					}
				})
			}
		}

	}
</script>

<style>
	#addPicForm{
		
		min-height: 300px;
		margin-top: 20px;
		margin-bottom: 20px;
	}
	.materialLoading{
		margin-top: -200px;
		margin-bottom:100px;
	}
</style>