<template>
	<div>
		<div class="modal fade bs-example-modal-lg" tabindex="-1" role="dialog" id="singleErr">
			<div class="modal-dialog" role="document">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-label="Close"></button>
						<h4 class="modal-title">异常列表</h4>
					</div>
					<div class="modal-body">
						<table>
							<tr>
								<td>
									开始日期&nbsp;
								</td>
								<td>
									<input type="text" class="input-td"  id="single_begin_date"/>&nbsp;&nbsp;&nbsp;&nbsp;
								</td>
								<td>
									结束日期&nbsp;
								</td>
								<td>
									<input type="text" class="input-td" id="single_end_date" />&nbsp;&nbsp;&nbsp;&nbsp;
									&nbsp;&nbsp;&nbsp;
								</td>
								<td>
									<a href="javascript:void(0)" class="btn blue" @click="singleSearch()"><i class="icon-search"></i>搜索</a>
								</td>
							</tr>
						</table>
						
						<table class="table table-striped table-bordered table-hover" id="singleTable">

							<thead>

								<tr>
									<th class="hidden-480">异常日期</th>
									<th class="hidden-480">开机时间</th>
									<th class="hidden-480">关机时间</th>
									<th class="hidden-480">开机时长</th>
								</tr>
							</thead>
							<tfoot>
								<tr>
									<td colspan="4" v-show="!loading">
										<v-pagination :total="total" :pageSize="pageSize" :current-page='current' @pagechange="pagechange" ></v-pagination>
									</td>
									<td colspan="4" v-show="loading">
										<my-loading v-show="loading"></my-loading>
									</td>
								</tr>
							</tfoot>
							<tbody v-show="!loading">
								<tr class="odd gradeX" v-for="(listitems,index) in errsingleList">
									<td>{{listitems.statistics_date_str}}</td>
									<td>{{listitems.first_heart_str}}</td>
									<td>{{listitems.last_heart_str}}</td>
									<td>{{listitems.power_on_duration_str}}</td>
								</tr>
								<tr v-if="errsingleList.length==0">
									<td colspan="4">
										<h3>暂无数据!</h3>
									</td>
								</tr>
							</tbody>

						</table>
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
	import { dicItem } from 'api/commonUtil.js'
	import myLoading from 'base/page/Loading.vue'
	import {errEndListSingle} from 'api/end'
	import { SUCCESS_OK } from 'api/config'
	import pagination from 'base/pagination.vue'
	
	export default {
		props: ['params'],
		data() {
			return {
				
				datas:[],
				total:1,
	   	 		pageSize:10, //每页有多少条记录
				current: 1,
				loading:true
			}
		},
		
		name: 'singleErr',
		computed:{
			errsingleList(){
				return this.datas;
			}
		},
		
		watch: {
			params: function() {
				this._getErrSingle();
			}
		},
		mounted(){
			$("#single_begin_date").jeDate({
		        format: "YYYY-MM-DD",
		        okfun:function (elem,value) {
		           
		        }
		    });
		    
		    $("#single_end_date").jeDate({
		        format: "YYYY-MM-DD",
		        okfun:function (elem,value) {
		            
		        }
		    });
		},
		components: {
			 'v-pagination':pagination,
			 myLoading
		},
		methods: {
			singleSearch:function(){
				this._getErrSingle();
			},
			_getErrSingle(page){
				var _this=this;
				var para={
				 	"mac_address":this.params,
				 	"page":page==''||page==undefined?1:page,
				 	"pagesize":this.pageSize,
				 	"begin_date":$("#single_begin_date").val(),
				 	"end_date":$("#single_end_date").val()
				};
				this.loading=true;
				this.datas=[];
				 errEndListSingle(para).then((res)=>{
				 	this.loading=false;
					if(res.repCode==SUCCESS_OK){
						this.datas=res.datas;
						this.total = res.totalCount;
						this.pageSize =res.pageSize;
					}
				})
			},
			pagechange(page){
				this._getErrSingle(page);
			}	
		}
		
	}
</script>

<style scoped>
	#singleErr {
		display: none;
		width: 80%;
		left: 30%;
	}
</style>

<style scoped>
	.input-td {
		margin-top: 10px;
		width:150px;
	}
	#singleTable tr th, #singleTable tr td{
		text-align: center;
	}
</style>