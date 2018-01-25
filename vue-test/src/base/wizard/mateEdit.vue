<template>
	<div>
		<div class="mateLabel" v-if="display_type==1||display_type==3">
             
			<label class=" ">频次&nbsp;<span class="redPoint">*</span></label>
			<div class="frequence">

				<input type="text" name="" />

			</div>
			
		</div>
		<div class="mateLabel" >
            <p>{{num}}</p>
			<label class="timeLabel">播放时长/次&nbsp;<span class="redPoint">*</span></label>
			<div class="input-append">

				<input type="text" class="timeInput"  v-model="duration_every_time"/>
				<span class="add-on m-wrap" >("秒")</span>
				<p>{{duration_every_time}}</p>

			</div>
		</div>
	</div>
</template>

<script>
	import { dicItem } from 'api/commonUtil.js'

	export default {
		data() {
			return {
				display_type:this.$store.state.app.playType,
				/*duration_every_time:[],*/
				transdatas:[]
			}
		},
		mounted() {
			this.initArr();
		},
		computed:{
			duration_every_time(){
				console.log(num);
				return this.$store.state.app.order; 
			}
		},
		watch:{
			num(to,from){
				
			},
			duration_every_time(to,from){
				/*console.log(to);*/
				this.initArr();
			}
		},
		props: ['num'],
		methods:{
			initArr(){
				this.transdatas=[];
				console.log(this.duration_every_time);
				for(let i=0;i<this.num+1;i++){
					let transObj={};
					transObj.order=i;
					transObj.duration_every_time=this.duration_every_time[i];
					this.transdatas.push(transObj);
				}
				console.log(this.transdatas)
				
			}
		}
		
	}
</script>

<style>
	.mateLabel {
		width: 100%;
		display: flex;
		margin: 10px auto;
		vertical-align: middle;
	}
	
	.mateLabel>label {
		width: 33%;
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
		width: 33% !important;
	}
	.frequence, .input-append{
		width: 67%;
	}
	.frequence input{
		width: 70%;
	}
	.input-append input{height: 24px !important;}
</style>