<template>
	<div>

		<div class="modal fade bs-example-modal-lg" tabindex="-1" role="dialog" id="adverTiserModal">
			<div class="modal-dialog" role="document">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-label="Close"></button>
						<h4 class="modal-title">选择不相邻的用户列表</h4>
					</div>
					<div class="modal-body">
						<table class="table table-striped table-bordered table-hover" id="notALL_table">

							<thead>

								<tr>

									
                                    <th></th>
									<th>客户名称</th>

									<th class="hidden-480">上刊名称</th>

									<th class="hidden-480">上下刊时间</th>

									<th class="hidden-480">是否付费</th>
									<th class="hidden-480">素材详情</th>

								</tr>

							</thead>
                             <tfoot>
								<tr>
									<td colspan="6">

										<v-pagination :total="total" :pageSize="pageSize" :current-page='current' @pagechange="pagechange" ></v-pagination>

									</td>
								</tr>
							</tfoot>
							<tbody>
								<tr class="odd gradeX" v-for="listItems in notAllList">

									<td><input type="checkbox" class="checkboxes" v-bind:value="listItems.putin_id+'-'+listItems.putin_name"  v-model="checkPuts"/></td>

									<td>{{listItems.customer_name}}</td>
									<td>{{listItems.putin_name}}</td>
									<td>{{listItems.putin_begin_date_str}}到{{listItems.putin_end_date_str}}</td>
									<td>{{listItems.putin_type|putTypeName}}</td>
									<td>
										<a href="javascript:void(0)" @click="lookMaterail(listItems.putin_id)" v-if="listItems.material_url!='string'||listItems.material_url!=''">查看</a>
									</td>
									

								</tr>
								<tr v-if="notAllList.length==0">
                                    <td colspan="6">
                                    	<h3>暂无上刊客户</h3>
                                    </td>
								</tr>
							</tbody>

						</table>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-primary" @click="strChecks">确定</button>
						<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
					</div>
				</div>
				<!-- /.modal-content -->
			</div>
			<!-- /.modal-dialog -->
		</div>
		<!-- /.modal -->
		<my-resource :url="parentUrl"></my-resource>
	</div>
</template>

<script>
	import { getSkglCoinList } from 'api/skgl'
	import { SUCCESS_OK } from 'api/config'
	import {getArr,getDicName,newObjArr} from 'api/commonUtil.js'
	import myResource from './resource'
	import pagination from 'base/pagination.vue'
	
	export default {
		data() {
			return {
				notAllList: '',
				checkPuts:[],
				parentUrl:{},
				total: 1,
				pageSize:5, //每页有多少条记录
				current: 1
			}
		},
		props: ['time'],
		components: {
			myResource,
			'v-pagination':pagination
		},
		created: function() {

			this._getSkglCoin();
		},
		mounted(){
			this.parentUrl={
				putin_id:'',
				display_type:''
			}
		},
		watch: {
			time: function() {
				this._getSkglCoin();
			}
		},
		filters:{
			putTypeName:function(v){
				let name=getDicName("putin_type",v);
	   	 		return name;
			}
		},
		methods: {
			_getSkglCoin: function(page) {
				var timeArr = this.time.split(',');
				var para = {};
				var para = {
					"page": page == '' || page == undefined ? 1 : page,
					"pagesize": this.pageSize,
					"putin_begin_date":timeArr[0],
					"putin_end_date":timeArr[1]
				};
				getSkglCoinList(para).then((res) => {
					if(res.repCode == SUCCESS_OK) {
						this.notAllList = res.datas;
						this.total = res.totalCount;
						this.pageSize = res.pageSize;
					}
				})
			},
			lookMaterail(id,type){
				$("#resourceModal").show();
				$("#resourceModal").modal();
				if(id!=null){
					this.parentUrl.putin_id=id;
				    this.parentUrl.display_type=this.type;
				}	
                 
				
			},
			strChecks:function(){
				var arr_name=[],arr_id=[];
				
				let checks=this.checkPuts;
				let t_Arr=[]
				for(var i=0;i<checks.length;i++){
					var m_Arr=checks[i].split('-');
					arr_id.push(m_Arr[0]);	
					arr_name.push(m_Arr[1])
				}
				this.$emit('child-param',{"ids":arr_id.join(','),"names":arr_name.join(',')});
				
				$("#adverTiserModal").modal('hide')
			},
			pagechange(page) {
				this._getSkglCoin(page);
			}

		}

	}
</script>

<style>
	#adverTiserModal {
		display: none;
		width: 80%;
		left: 30%;
	}
	#notALL_table tr th, #notALL_table tr td{
		text-align: center;
	}
	.testClass {
		float: right;
	}
	
	.testClass .pagination {
		text-align: center;
	}
	
	.testClass .pagination li {
		list-style: none;
		float: left;
		display: inline-block;
		width: 40px;
		height: 30px;
		line-height: 30px;
		text-align: center;
	}
	
	.testClass .active {
		background-color: #d84a38;
	}
	
	.testClass .active a {
		color: #FFFFFF;
	}
</style>