<template>
	<div>
		<div class="modal fade bs-example-modal-lg" tabindex="-1" role="dialog" id="playRecordModal">
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
									<th class="hidden-480">投放名称</th>
									<th class="hidden-480">播放开始-结束时间</th>
									<th class="hidden-480">投放类型</th>
									<th class="hidden-480">播放图片</th>
								</tr>
				
							</thead>
				             <tfoot>
								<tr>
									<td colspan="4" v-if="(playList.length!=0)&&(!loading)">
            							<v-pagination :total="total" :pageSize="pageSize" :current-page='current' @pagechange="pagechange" ></v-pagination>
										 
									</td>
									<td colspan="4" v-show="loading">
            							<my-loading v-show="loading"></my-loading> 
									</td>
								</tr>
							</tfoot>
							<tbody v-show="!loading">
								<tr class="odd gradeX" v-for="(listitems,index) in playList">
									<td >{{listitems.putin_info ==null ?"数据异常":listitems.putin_info.putin_name}}</td>
									<td>{{listitems.begin_time}}到{{listitems.end_time}}</td>
									<td>{{listitems.putin_info==null ?"数据异常":listitems.putin_info.putin_type|putTypeName}}</td>
									<td>
										<!--{{listitems.material_url}}-->
										<img v-lazy="imgPort+listitems.material_url" class="show-img"/>
									</td>
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
	import {Config} from 'api/config.js'
	import {lookEnd} from 'api/end'
	import myLoading from 'base/page/Loading.vue'
	import { SUCCESS_OK } from 'api/config'
	import pagination from 'base/pagination.vue'
	import {getDicName} from 'api/commonUtil.js'
	export default {
		props: ['playRecords'],
		data: function() {
			return {
				imgPort:Config.ResourceHost,
				code:'',
				playList:[],
				total:1,
	   	 		pageSize:10, //每页有多少条记录
				current: 1,
				loading:true
			}
		},
		filters:{
			putTypeName:function(v){
				let name=getDicName("putin_type",v);
	   	 		return name;
			}
		},
		components: {
			myLoading,
			'v-pagination':pagination
		},
		watch:{
			'playRecords':function(to,from){
				console.log(this.current);
				this._getPlayList(this.current)
			}
		},
		name: 'playRecordModal',

		methods: {
			_getPlayList(page){
				var params = {
					"page":page==''||page==undefined?1:page,
					//"page":36,
					"pagesize":this.pageSize,
					"terminal_id":this.playRecords
				};
				this.loading=true;
				this.playList=[];
				lookEnd(params).then((res)=>{
					this.loading=false;
					if(res.repCode==SUCCESS_OK){
						this.playList =res.datas;
						this.total = res.totalCount;
						this.current=res.currentPage;
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
	#playRecordModal{
		display: none;
		width: 80%;
		left:30%;
	}
	#playRecordTable tr th, #playRecordTable tr td{
		text-align: center;
		vertical-align: middle;
	}
	.show-img{
		width: 50px;
		height: 50px;
	}
</style>