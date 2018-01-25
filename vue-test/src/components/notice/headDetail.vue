<template>
	<div>
		<div class="modal fade bs-example-modal-lg" tabindex="-1" role="dialog" id="headDetail">
			<div class="modal-dialog" role="document">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-label="Close"></button>
						<h4 class="modal-title">公告详情</h4>
					</div>
					<div class="modal-body">
						   
							<div class="infoDiv">
								<span>公告名称：</span>
								<span>{{headparams.title}}</span>
							</div>
							<div class="infoDiv">
								<span>公告内容：</span>
								<span>{{headparams.content}}</span>
							</div>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-primary" data-dismiss="modal" @click="jumpTo">查看更多公告</button>
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
	export default{
		props:['headparams'],
	 	data(){
	   	 	return {

	   	 	}
	   	},
	   	
		methods:{
		      jumpTo:function(){
		      	this.$router.push({path:'/notice/list'});
		      	// 关闭当前弹框
		      	$("#headDetail").modal('hide')
		      }
		}
	 }
</script>

<style>
	#headDetail{
		display: none;
	}
	.infoDiv {
		    width: 90%;
    margin-bottom: 5%;
    margin-left: 10%;
	}
	
	.infoDiv span {
		font-size: 16px;
	}
</style>