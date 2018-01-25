<template>
	<div id="appList">
		<my-title></my-title>
		<div class="underContent">
		<button type="button" class="btn red add_btn" @click="addApp">添加App</button>
		<table class="table table-striped table-bordered table-hover" id="appTable">

			<thead>

				<tr>
					
					<th class="hidden-480">版本号</th>
					<th class="hidden-480">App路径</th>
					<th class="hidden-480">添加时间</th>
					
					<th class="hidden-480">添加人员</th>
					
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
				<tr class="odd gradeX" v-for="(listitems,index) in list">
					
					<td>{{listitems.version_num}}</td>
					<td>{{listitems.app_url|urlName}}</td>
					<td>{{listitems.add_time_str}}</td>
					
					<td>{{listitems.user_name}}</td>
					
				</tr>
			</tbody>

		</table>
		</div>
		<my-add @refreshList="onRefresList"></my-add>
	</div>
	
</template>

<script>
	// 引入vue头部组件
	import myAdd from './add'
	import myLoading from 'base/page/Loading.vue'
	import myTitle from 'base/page/title'
	import {getArr} from 'api/commonUtil.js'
	import {getAppList} from 'api/pzgl'
    import {SUCCESS_OK} from 'api/config'
    import pagination from 'base/pagination.vue'
    
	export default {
		data() {
			return {
				list: '',
				parentParams:'',
				total:1,
	   	 		pageSize:10, //每页有多少条记录
	   	 		current: 1,
	   	 		loading:true
			}
		},
		name: 'operateList',
		components: {
			 
			 myAdd,
			 myTitle,
			 myLoading,
			 'v-pagination':pagination
		},
		filters:{
			urlName:function(v){
				
				let vArr=getArr(v.split(','));
				let vname=vArr.join(',');
	   	 		return vname;
			}
		},
		created:function(){
			
			this._getAppList();
		},
		methods: {
			_getAppList:function(page){
				var para = {
					"page":page==''||page==undefined?1:page,
					"pagesize":this.pageSize
				};
				this.loading=true;
				this.list=[];
				getAppList(para).then((res)=>{
					if(res.repCode==SUCCESS_OK){
						this.loading=false;
						this.list=res.datas;
						this.total = res.totalCount;
						this.pageSize =res.pageSize;
					}
				})
			},
			onRefresList(){
				this._getAppList();
			},
			addApp: function() {
				$('#appAddModal').modal();
			},
			pagechange(page){
				this._getAppList(page);
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
	#appTable tr th, #appTable tr td{
		text-align: center;
	}
	#appTable{
		width:98%;
		margin:0px auto;
	}
	.add_btn{
		margin-left: 1%;
		margin-bottom: 1% !important;
	}
</style>