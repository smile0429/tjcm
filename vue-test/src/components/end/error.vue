<template>
	<div id="errorList">
		<my-title></my-title>
		<div class="underContent">
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
						开始日期&nbsp;
					</td>
					<td>
						<input type="text" class="input-td" id="begin_date" placeholder="请选择开始日期"/>&nbsp;&nbsp;&nbsp;&nbsp;
					</td>
					<td>
						结束日期&nbsp;
					</td>
					<td>
						<input type="text" class="input-td" id="end_date" placeholder="请选择结束日期"/>&nbsp;&nbsp;&nbsp;&nbsp;
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
		<table class="table table-striped table-bordered table-hover" id="errortable">

              
			<thead>
				<tr>
					<th class="hidden-480">终端名称</th>
					
					<th class="hidden-480">所属机构</th>
					<th class="hidden-480">Mac地址</th>
					
					<th class="hidden-480">异常次数</th>
					<th class="hidden-480">操作</th>
				</tr>

			</thead>
            <tfoot>
				<tr>
					<td colspan="5" v-show="!loading">
						
	  			          <v-pagination :total="total" :pageSize="pageSize" :current-page='current' @pagechange="pagechange" ></v-pagination>
					</td>
					<td colspan="5" v-show="loading">
						
	  			          <my-loading v-show="loading"></my-loading>
					</td>
				</tr>
			</tfoot>
			<tbody v-show="!loading">
				<tr class="odd gradeX" v-for="(listitems,index) in list">
					<td>{{listitems.name}}</a></td>
				
					<td>{{listitems.organization_id|orgaName}}</td>
					<td>{{listitems.mac_address}}</td>
					
					<td>{{listitems.abnormal_count}}</td>
					<td>
						<a href="javascript:void(0)"  @click="lookError(listitems.mac_address)" v-if="!Number.isNaN(Number(listitems.abnormal_count))">
							查看详情
						</a>
						<a href="javascript:void(0)"  @click="lookError(listitems.mac_address)" v-if="Number.isNaN(Number(listitems.abnormal_count))">
							 _
						</a>
					</td>
					
				</tr>
				<tr v-if="list.length==0">
					
					<td colspan="5" v-if="this.code==1000">
						<h4>
							没有符合条件的数据!
						</h4>
					</td>
					<td colspan="5"  v-if="this.code!=1000">
						<h4>
							终端异常接口有错误，请检验接口
						</h4>
					</td>
					
				</tr>
			</tbody>

		</table>
		</div>
		<my-single :params="parentParams" ></my-single>
	</div>
	
</template>

<script>
	// 引入vue头部组件
	import myTitle from 'base/page/title'
	import myLoading from 'base/page/Loading.vue'
	import mySingle from './errSingle.vue'
	import {errEndList,errEndListSingle}from 'api/end'
    import {SUCCESS_OK} from 'api/config'
	import {getDicName,dicItem} from 'api/commonUtil.js'
	
	import pagination from 'base/pagination.vue'
	
	export default {
		data() {
			return {
				list: '',
				loading:true,
				City:dicItem("city").items,
				name:'',
				putCity:'',
				parentParams:'',
				code:'',
				 total:1,
	   	 		 pageSize: 10,
	   	 		  current: 1
			}
		},
		name: 'errorList',
		components: {
			 mySingle,
			 myLoading,
			 myTitle,
			  'v-pagination':pagination
		},
		created:function(){
			this.parentParams={
			};
			var paramsPage = {"page":1,"pagesize":10};
			
			this._errEndList(paramsPage);
		},
		mounted(){
			$("#begin_date").jeDate({
		        format: "YYYY-MM-DD",
		        okfun:function (elem,value) {
		           
		        }
		    });
		    
		    $("#end_date").jeDate({
		        format: "YYYY-MM-DD",
		        okfun:function (elem,value) {
		            
		        }
		    });
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
			_errEndList:function(para){
				let paramsSeacrch = {
					"name":this.name,
					"city":this.putCity,
					"begin_date":$("#begin_date").val(),
					"end_date":$("#end_date").val()
				};
				let data=Object.assign({},para,paramsSeacrch)
				this.loading=true;
				this.list=[];
				errEndList(data).then((res)=>{
					this.loading=false;
					if(res.repCode==SUCCESS_OK){
						this.list=res.datas;
						this.total = res.totalCount;
						this.current=res.pageSize;
						this.code=SUCCESS_OK;
					}else{
						this.code=res.repCode;
					}
				})
			},
			lookError: function(mac_address) {
				 $('#singleErr').show();
				 $('#singleErr').modal();
				 this.parentParams=mac_address;
				
			},
			/*_errEndListSingle:function(data){
				 errEndListSingle(data).then((res)=>{
					if(res.repCode==SUCCESS_OK){
						this.parentParams.errList=res.datas;
						this.parentParams.mac_add=data.mac_address;
					}
				})
			},*/
			/*pageChanged(page){
				this._errEndList({"page":page,"pagesize":this.pageSize});
			},*/
			pagechange:function(currentPage){
		        this._errEndList({"page":currentPage,"pagesize":this.pageSize});
		    },
			search:function(){
				this._errEndList({"page":1,"pagesize":this.pageSize});
			}
		}
	}
</script>
<style scoped>
	#errortable{
		width:98%;
		margin:0px auto;
	}
	#errortable tr th, #errortable tr td{
		text-align: center;
	}
	.input-td {
		margin-top: 10px;
		width:150px;
	}
	.redLine{
		color: red;
	}
	#searchTable{
		margin-left: 1%;
	}
</style>