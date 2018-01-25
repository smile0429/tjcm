<template>
	<div>
		<div>
			<form enctype="multipart/form-data" id="fileForm">
				<a id='addPic' class="btn btn-default"  href="" v-on:click="addPic">点击添加</a>&nbsp;&nbsp;<span class="redPoint">(支持.jpg、.png、.jpeg、.mp4格式的文件)</span>
				<input type="file" @change="onFileChange" multiple style="display: none;" name="file">
			</form>
		</div>
		<div v-if="source.length >0">
			
			<ul class="filestag">
				<li v-for="(item ,index) in source">
					<div class="sourceArea">
						 <video :src="item.material_url|totalURl" controls="controls" v-if="item.type==1" @click='delImage(index)'>
						    抱歉您的浏览器不支持视频播放
						</video>
						<img v-lazy="imgPort+item.material_url" class="img" v-if="item.type==2"/>
					</div>
					
					
					
					<a href="javascript:void(0)" class=" deleteImg" @click='delImage(index,item.material_id)'>
						<span class="icon-trash redIcon"></span>
					</a>
					<div>
						
						<div class="mateLabel" v-if="display_type==1||display_type==3">
             
							<label class=" ">频次&nbsp;<span class="redPoint">*</span></label>
							<div class="frequence">
				
								<input type="number" v-model="item.frequency" />
				
							</div>
							
						</div>
						<div class="mateLabel">
							<p>{{item.frequence}}</p>
							<label class="timeLabel">播放时长/次&nbsp;<span class="redPoint">*</span></label>
							<div class="input-append">
				                
								<input type="number" class="timeInput" v-model="item.duration_every_time"/>
								<span class="add-on m-wrap" >秒</span>
							</div>
						</div>
					</div>
				</li>
			</ul>	
		</div>
		
	
		<div v-if="source.length==0" class="noticeError">
			<h2>您还没添加任何素材！</h2>
		</div>
	     
		 
		
	</div>



</template>

<script>
	import { Config, SUCCESS_OK } from 'api/config.js'
    import { getArr } from 'api/commonUtil.js'
    import {deleteSkglMaterial} from 'api/skgl'
    /*import myLoading from 'base/page/Loading.vue'*/
export default {
	data() {
		return {
			display_type: this.$store.state.app.playType,
			imgPort:Config.ResourceHost
			/*loading:true*/
		}
	},
	props: ['source'],
	components: {
		/*myLoading,*/
	},
	filters: {
		totalURl: function(v) {
			let name = Config.ResourceHost + v;
			return name;
		}
	},
	mounted(){
		this.initArr();
	},
	watch:{
		
		source:{
	      handler: function (newVal) {
	         // console.log(newVal)
	          this.$emit('resourceParam', this.source);
	      },
	      deep: true
	    }
	},
	methods: {
		initArr(){
		    for(let i=0;i<this.source.length;i++){
				Vue.set(this.source[i], 'duration_every_time','');
				Vue.set(this.source[i], 'frequency','');
			}
		},
		listenToMyBoy(data) {
			console.log(data);
		},
		
		addPic(e) {
			e.preventDefault();
			$('input[type=file]').trigger('click');
			return false;
		},
		onFileChange(e) {
			var vm = this;
			let file = e.target.files[0];
			let supportedTypes = ['image/jpg', 'image/jpeg', 'image/png', 'video/mp4'];
			if(file && supportedTypes.indexOf(file.type) >= 0) {
				this.createImage(new FormData($("#fileForm")[0]))
			}
		},
		createImage(file) {
			let _this=this;
			
			// 文件上传
			if(typeof FileReader === 'undefined') {
				alert('您的浏览器不支持图片上传，请升级您的浏览器');
				return false;
			}
			var san = jeBox.loading(3, "正在上传...", {
				maskLock: true,
				maskClose: false
			});
			$.ajax({
				url: Config.host + 'api/file/uploadfile',
				type: 'POST',
				cache: false,
				data: file,
				async: false,
				processData: false,
				contentType: false
			}).done(function(res) {
				if(res.repCode == SUCCESS_OK) {
					var dataArr = [];
					let result = getArr(res.datas.split(','));
					$.each(result, function(k, v) {
						var resultObj = {};
						if(v.indexOf('.mp4') != -1) {
							resultObj.material_url = v;
							resultObj.type = "1"; // 1是视频
						} else {
							resultObj.material_url = v;
							resultObj.type = "2"; // 2是图片
						}
						_this.source.push(resultObj);

					});
					
					
					_this.$emit('resourceParam', _this.source);

					jeBox.close(san);
				}

			}).fail(function(res) {});

		},
		delImage: function(index,id) {
			if(id!=''&&id!=null&&id!=undefined){
				var san = jeBox.loading(3, "正在删除...", {
					maskLock: true,
					maskClose: false
				});
			    let params={
			    	"material_ids":id
			    }
			    deleteSkglMaterial(params).then((res)=>{
			    	jeBox.close(san);
			    	if(res.repCode == SUCCESS_OK){
			    		 this.source.splice(index, 1)
			             this.$emit('resourceParam', this.source);
			             jeBox.msg('删除成功', {
							time: 1
						});
			    	}else{
			    		alert(res.errorMsg)
			    	}
			    })
			}else{
				this.source.splice(index, 1)
			    this.$emit('resourceParam', this.source);
			}
			
		}
	}

}</script>

<style>.filestag {
	list-style: none outside none;
	margin: 0;
	padding: 0;
	/*overflow: hidden;*/
	clear: left;
	position: relative;
	/*margin-bottom: 100px !important;*/
}

.filestag li {
	margin: 0 10px;
	display: block;
	float: left;
	width: 250px;
	height: auto;
	position: relative;
	border: solid 1px #EEEEEE;
}

.sourceArea {
	display: block;
	height: 200px;
	position: relative;
	border: solid 1px #EEEEEE;
}

.filestag img {
	max-width: 100%;
	max-height: 200px;
	position: absolute;
	margin: auto;
	top: -9999px;
	right: -9999px;
	bottom: -9999px;
	left: -9999px;
}

.filestag video {
	width: 200px;
	height: 200px;
}

.deleteImg {
	position: absolute;
	top: 0;
	right: 0;
}

.redIcon {
	color: red;
}

#fileForm {
	margin-bottom: 20px !important;
	margin-left: 20px !important;
}

.noticeError {
	text-align: center;
}

.mateLabel {
	width: 100%;
	display: flex;
	margin: 10px auto;
	vertical-align: middle;
}

.mateLabel>label {
	width: 40%;
	text-align: right;
	padding-right: 10px;
	line-height: 30px;
}

.radioLine {
	width: 67%;
	margin-left: 2%;
}

.displayradio {
	width: 33%;
	display: inline-flex;
}

.timeInput {
	width: 30%;
}

.timeLabel {
	width: 40% !important;
}

.frequence,
.input-append {
	width: 67%;
}

.frequence input {
	width: 70%;
}

.input-append input {
	height: 24px !important;
}</style>