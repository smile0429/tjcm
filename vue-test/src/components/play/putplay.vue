<template>
	<div>
		<div class="modal fade bs-example-modal-lg" tabindex="-1" role="dialog" id="putPlaydModal">
			<div class="modal-dialog" role="document">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-label="Close"></button>
						<h4 class="modal-title">播放记录详情</h4>
					</div>
					<div class="modal-body">
						
                        <table class="table table-striped table-bordered table-hover" id="playRecordTable">

							<thead>
				
								<tr>
									<th class="hidden-480">终端名称</th>
									<th class="hidden-480">Mac地址</th>
									<th class="hidden-480">播放开始时间</th>
									<th class="hidden-480">播放结束时间</th>
								</tr>
				
							</thead>
				             <tfoot>
								<tr>
									<td colspan="4" v-if="playList.length!=0">

					  			        <v-pagination :total="total" :pageSize="pageSize" :current-page='current' @pagechange="pagechange" ></v-pagination>

									</td>
								</tr>
							</tfoot>
							<tbody>
								<tr class="odd gradeX" v-for="(listitems,index) in playList">
									<td>{{listitems.terminal_info.name}}</td>
									<td>{{listitems.mac_address}}</td>
									<td>{{listitems.begin_time}}</td>
									<td>{{listitems.end_time}}</td>
								</tr>
								<tr v-if="playList.length==0">
				            		<td colspan="4" v-if="this.code=='0000'">
				            			 <h3>暂无播放记录！</h3>
				            		</td>
				            		<td colspan="4"  v-if="this.code!='0000'">
										<h4>
											接口有错误，请检验接口
										</h4>
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
	import {lookEnd} from 'api/end'
	import { SUCCESS_OK } from 'api/config'
	import pagination from 'base/pagination.vue'
	export default {
		props: ['putinObj'],
		data: function() {
			return {
				code:'',
				playList:[],
				total:1,
	   	 		pageSize:5, //每页有多少条记录
				current: 1
			}
		},
		components: {
			'v-pagination':pagination
		},
		watch:{
			putinObj:function(to,from){
				this._getPlayList();
			}
		},
		name: 'playRecordModal',

		methods: {
			_getPlayList(page){
				var params = {
					"page":page==''||page==undefined?1:page,
					"pagesize":this.pageSize,
					 "putin_id":this.putinObj.putin_id,
					 "putin_name":this.putinObj.putin_name
				};
				lookEnd(params).then((res)=>{
					if(res.repCode==SUCCESS_OK){
						this.playList =res.datas;
						this.total = res.totalCount;
						this.pageSize =res.pageSize;
						this.code=SUCCESS_OK;
					}else{
						this.code=res.repCode;
					}
				})
			},
		    pagechange(page){
				this._getPlayList(page)
			},
		}
	}
</script>
<style>
	.testClass{
		float:right;
	}
</style>
<style scoped="">
	#putPlaydModal{
		display: none;
		width: 60%;
		left:45%;
	}
	#putPlaydModal tr th, #playRecordTable tr td{
		text-align: center;
	}
</style>