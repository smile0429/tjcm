<template>
	<div id="endList">
		<my-title></my-title>
		<div class="underContent">
		<button type="button" class="btn red add_btn" @click="addEnd">添加终端</button>
		<div>

			<table id="searchTable">
				<tr>
					<td>
						终端名称&nbsp;
					</td>
					<td>
						<input type="text" class="input-td" v-model="name" />&nbsp;&nbsp;&nbsp;&nbsp;
					</td>
					<td>
						所在城市&nbsp;
					</td>
					<td>
						<select v-model="putCity" class="chosen-with-diselect input-td" tabindex="-1">
							<option value="">全部</option>

							<option v-for="CityItems in City" :value="CityItems.dic_item_value">
								{{CityItems.dic_item_name}}
							</option>

						</select>
						&nbsp;&nbsp;&nbsp;
					</td>
					<td>
						<a href="javascript:void(0)" class="btn blue" @click="search"><i class="icon-search"></i>搜索</a>
					</td>
				</tr>
			</table>
		</div>
		<table class="table table-striped table-bordered table-hover" id="endListTable">

			<thead>
				<tr>
					<th class="hidden-480">终端名称</th>
					<th class="hidden-480">所在城市</th>
					<th class="hidden-480">所属机构</th>
					<th class="hidden-480">Mac地址</th>
					<!--<th class="hidden-480">Ip地址</th>-->
					<th class="hidden-480">是否可用</th>
					<th class="hidden-480">添加者</th>
					<th class="hidden-480">操作</th>
				</tr>

			</thead>
            <tfoot>
				<tr>
					<td colspan="11" v-show="!loading">
						
					
	  			          <v-pagination :total="total"  :pageSize="pageSize" :current-page='current' @pagechange="pagechange" ></v-pagination>
					</td>
					<td colspan="11" v-show="loading">
						<my-loading v-show="loading"></my-loading>
					</td>
				</tr>
			</tfoot>
			<tbody v-show="!loading">
				<tr class="odd gradeX" v-for="(listitems,index) in list">
					<td>{{listitems.name}}</td>
					<td>{{listitems.city|cityName}}</td>
					<td>{{listitems.organization_name|orgaName}}</td>
					<td>{{listitems.mac_address}}</td>
					<!--<td>{{listitems.ip_address}}</td>-->
					<td>{{listitems.state|stateName}}</td>
					<td>{{listitems.user_name}}</td>
					<td>
						<a href="javascript:void(0)" @click="addEnd(listitems)">修改&nbsp;|</a>
						<a href="javascript:void(0)" @click="playRecord(listitems.terminal_id)">查看播放记录</a>
					</td>
				</tr>
				<tr v-if="list.length==0">
					
					<td colspan="8">
						<h4>
							没有符合条件的数据!
						</h4>
					</td>
					
				</tr>
			</tbody>

		</table>
		</div>
		<my-add :params="parentParams" @refreshList="onRefresList"></my-add>
		<my-detail :playRecords="parentRecords"></my-detail>
	</div>
	
</template>

<script>
	// 引入vue头部组件
	import myTitle from 'base/page/title'
	import {getEndList} from 'api/end'
    import {SUCCESS_OK} from 'api/config'
	import {getDicName,dicItem} from 'api/commonUtil.js'
	import myAdd from './add'
	import myLoading from 'base/page/Loading.vue'
	import myDetail from './playRecord'
	import pagination from 'base/pagination.vue'
	
	export default {
		data() {
			return {
				list: '',
				City:dicItem("city").items,
				name:'',
				putCity:'',
				parentParams:'',
				parentRecords:'',
	   	 		total:1,
	   	 		pageSize:10,
	   	 		current: 1,
	   	 		loading:true
			}
		},
		name: 'endList',
		components: {
			 myAdd,
			 myDetail,
			 myLoading,
			 myTitle,
			 'v-pagination':pagination
		},
		created:function(){
			this.parentParams={
				
			},
			this.parentRecords={
				
			}
			
			
			this._getEndlist();
		},
		filters:{
			cityName:function(val){
				let name=(val===null?'_':getDicName("city",val));
	   	 		return name;
			},
	   	 	stateName:function(val){
	   	 		let name=getDicName("state",val);
	   	 		return name;
	   	 	},
	   	 	orgaName:function(val){
	   	 		let name=(val===null?'_':val);
	   	 		
	   	 		return name;
	   	 	}
	   	 },
		methods: {
			_getEndlist:function(page){
				
				let paramsSeacrch = {
					"page":page==''||page==undefined?1:page,
					"pagesize":this.pageSize,
					"name":this.name,
					"city":this.putCity
				};
				this.loading=true;
				this.list=[];
				getEndList(paramsSeacrch).then((res)=>{
					this.loading=false;
					if(res.repCode==SUCCESS_OK){
						this.list=res.datas;
						this.total = res.totalCount;
						/*this.current=res.pageSize;*/
					}
				})
			},
			addEnd: function(obj) {
				$('#addOrEditModal').show();
				$('#addOrEditModal').modal();
				this.parentParams=obj;
			},
			playRecord: function(terminal_id) {
				 $('#playRecordModal').show();
				 $('#playRecordModal').modal();
				 this.parentRecords=terminal_id; 
			},
			onRefresList(){
				this._getEndlist();
			},
			 pagechange:function(currentPage){
		        this._getEndlist(currentPage);
		    },
			search:function(){
				this._getEndlist();
			}
		}
	}
</script>



<style scoped>
	.input-td {
		margin-top: 10px;
	}
	#endListTable tr th, #endListTable tr td{
		text-align: center;
	}
	#endListTable{
		width:98%;
		margin:0px auto;
	}
	.add_btn{
		margin-left: 1%;
		margin-bottom: 1% !important;
	}
	#searchTable{
		margin-left: 1%;
	}
</style>