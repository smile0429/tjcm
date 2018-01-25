<template>
	<div id="operateList">
		<my-title></my-title>
		<div class="underContent">
		<button type="button" class="btn red add_btn" @click="addOperate">添加指令</button>
		
		<table class="table table-striped table-bordered table-hover" id="operationTable">

			<thead>

				<tr>
					
					<th class="hidden-480">添加时间</th>
					<th class="hidden-480">关机时间</th>
					<th class="hidden-480">音量大小</th>
					
					<th class="hidden-480">备注</th>
					<th class="hidden-480">操作人</th>
					<th class="hidden-480">执行结果</th>
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
			<tbody v-show="!loading">
				<tr class="odd gradeX" v-for="(listitems,index) in list">
					
					<td>{{listitems.add_time_str}}</td>
					<td>{{listitems.power_off_time_command}}</td>
					<td>{{listitems.volume_command}}</td>
					
					<td>{{listitems.remark}}</td>
					<td>{{listitems.user_name}}</td>
					<td> 
						<a href="javascript:void(0)" class="btn yellow mini" @click="lookDetail(listitems.command_id)"><i class="icon-pencil"></i>&nbsp;&nbsp;查看详情</a>
					</td>
				</tr>
			</tbody>

		</table>
		
		</div>
		<my-detail :operateParams="parentParams"></my-detail>
		
		<my-add @refreshList="onRefresList"></my-add>
		
	</div>
	
</template>

<script>
	import myDetail from './detail'
	import myAdd from './add'
	import myTitle from 'base/page/title'
	import myLoading from 'base/page/Loading.vue'
	import pagination from 'base/pagination.vue'
	import {getCommandList,lookCommand} from 'api/pzgl'
    import {SUCCESS_OK} from 'api/config'
    import {getDicName} from 'api/commonUtil.js'
	
	
	export default {
		data() {
			return {
				list: '',
				parentParams:'',
				total:1,
	   	 		pageSize:10,
	   	 		current: 1,
	   	 		loading:true
			}
		},
		name: 'operateList',
		components: {
			 myDetail,
			 myAdd,
			 myTitle,
			 myLoading,
			 'v-pagination':pagination
		},
        
		created: function() {
			  this.parentParams={
					terminal_id:"",
					mac_address:"",
					had_got:'',
					power_off_time_execute_time_str:'',
					result_power_off_time:'',
					volume_execute_time:'',
					result_volume:''
				}
			  
			this._getCommndList(); 
		},
		
		mounted() {
			$("#test01").jeDate({
		        format:"YYYY-MM-DD hh:mm:ss",
		        isinitVal:false
		  });
		},
		methods: {
			_getCommndList:function(page){
				var params = {
					"page":page==''||page==undefined?1:page,
					"pagesize":this.pageSize
				};
				this.loading=true;
				this.list=[];
				getCommandList(params).then((res)=>{
					if(res.repCode==SUCCESS_OK){
						this.loading=false;
						this.list =res.datas;
						this.total = res.totalCount;
						this.pageSize =res.pageSize;
					}
				})
			},
			onRefresList(){
				this._getCommndList();
			},
			addOperate: function() {
				$('#opearateDetailModal').hide();
				$('#opearateAddModal').show();
				$('#opearateAddModal').modal();
			},
			lookDetail: function(command_id) {
				$('#opearateDetailModal').show();
				$('#opearateAddModal').hide();
				 $('#opearateDetailModal').modal();
				 this.parentParams=command_id;
			},
			pagechange(page){
				this._getCommndList(page);
			}
		}
	}
</script>

<style>
	.testClass{
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
	#operationTable tr th, #operationTable tr td{
		text-align: center;
	}
	#operationTable{
		width:98%;
		margin:0px auto;
	}
	.add_btn{
		margin-left: 1%;
		margin-bottom: 1% !important;
	}
</style>