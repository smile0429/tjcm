<template>
	<div>
		<div class="modal fade bs-example-modal-lg" tabindex="-1" role="dialog" id="opearateDetailModal">
			<div class="modal-dialog modal-lg" role="document">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-label="Close"></button>
						<h4 class="modal-title">指令详情</h4>
					</div>
					<div class="modal-body">
						<!--<p>{{operateParams}}</p>-->
						<table class="table table-striped table-bordered table-hover" id="opearatedetailTable">

							<thead>
				
								<tr>
									
									<th class="hidden-480">Mac地址</th>
									<th class="hidden-480">是否已获取</th>
									<th class="hidden-480">修改关机命令执行时间</th>
									<th class="hidden-480">修改关机命令执行结果</th>
									<th class="hidden-480">修改音量执行时间</th>
									<th class="hidden-480">修改音量执行结果</th>
									
								</tr>
				
							</thead>
				            <tfoot>
								<tr>
									<td colspan="6" v-show="!loading">
										<v-pagination :total="total" :pageSize="pageSize" :current-page='current' @pagechange="pagechange" ></v-pagination>
									</td>
									<td colspan="6" v-show="loading">
					  		            <my-loading ></my-loading>
				            		</td>
								</tr>
							</tfoot>
							<tbody>
								<tr class="odd gradeX" v-for="(listitems,index) in dtailList">
									
									<td>{{listitems.mac_address}}</td>
									<td>{{listitems.had_got|gotName}}</td>
									<td>{{listitems.power_off_time_execute_time_str|orgaName}}</td>
									<td>{{listitems.result_power_off_time|result}}</td>
									<td>{{listitems.volume_execute_time_str|orgaName}}</td>
									<td>{{listitems.result_volume|result}}</td>
									
								</tr>
							</tbody>
				
						</table>
					</div>
					<div class="modal-footer">
						
						<button type="button" class="btn btn-default" data-dismiss="modal" >关闭</button>
					</div>
				</div>
				
			</div>
			
		</div>
		
	</div>
</template>

<script>
	import {getDicName} from 'api/commonUtil.js'
	import {lookCommand} from 'api/pzgl'
	import { SUCCESS_OK } from 'api/config'
	import pagination from 'base/pagination.vue'
	import myLoading from 'base/page/Loading.vue'
	
	 export default {
	 	props:['operateParams'],
	 	data: function () {
		  return { 
		  	dtailList:[],
	   	 	total: 1,
			pageSize: 5, //每页有多少条记录
			current: 1,
			loading:true
		  }
		},
		watch:{
			'operateParams':function(to,from){
				this._getDetailList()
			}
		},
		components: {
			'v-pagination':pagination,
			myLoading
		},
		name: 'opearateDetailModal',
		filters:{
			result:function(val){
				let name=getDicName("command_execute_result",val);
	   	 		return name;
			},
			gotName(val){
				let name=(val===null?'_':(val==0?'未获取':'已获取'));
	   	 		return name;
			},
			orgaName:function(val){
	   	 		let name=(val===null?'_':val);
	   	 		
	   	 		return name;
	   	 	}
		},
		methods:{
			_getDetailList(page){
				this.loading=true;
				this.dtailList=[];
				var params = {
					"page":page==''||page==undefined?1:page,
					"pagesize":this.pageSize,
					"command_id":this.operateParams
				};
				lookCommand(params).then((res)=>{
					this.loading=false;
					if(res.repCode==SUCCESS_OK){
						this.dtailList =res.datas;
						this.total = res.totalCount;
						this.pageSize =res.pageSize;
					}
				})
			},
			pagechange(page) {
				this._getDetailList(page);
			}
		}
	 }
</script>

<style>
	#opearateDetailModal{
		display: none;
		width: 80%;
		left: 30%;
	}
	#opearatedetailTable tr th, #opearatedetailTable tr td{
		text-align: center;
	}
</style>