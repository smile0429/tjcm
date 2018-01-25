<template>

	<div class="modal fade bs-example-modal-lg" tabindex="-1" role="dialog" id="deviceModal">
		<div class="modal-dialog modal-lg" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-label="Close"></button>
					<h4 class="modal-title">选择终端</h4>
				</div>
				<div class="modal-body">
					<table >
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
					<table class="table table-striped table-bordered table-hover" id="deviceTable">

						<thead>

							<tr>
								<th><input type="checkbox" v-model="allStatus" @click="checkAll"></th>
								<th class="hidden-480">终端名称</th>
								<th class="hidden-480">所在城市</th>
								<th class="hidden-480">所属机构</th>
								<th class="hidden-480">Mac地址</th>
								<th class="hidden-480">是否可用</th>
								<th class="hidden-480">添加者</th>

							</tr>

						</thead>
						<tfoot>
							<tr>
								<td colspan="7" v-show="!loading">
            						<v-pagination :total="total" :pageSize="pageSize" :current-page='current' @pagechange="pagechange" ></v-pagination>
								</td>
								<td colspan="7" v-show="loading">
            						<my-loading v-show="loading"></my-loading>
								</td>
							</tr>
						</tfoot>
						<tbody v-show="!loading">
							<tr class="odd gradeX" v-for="(listitems,index) in Devicelist">
								<td>
									<input type="checkbox" :value="listitems.terminal_id+'|'+listitems.mac_address+'|'+listitems.name" v-model="ternalCheck">
								</td>
								<td>
									<a href="javascript:void(0)">{{listitems.name}}</a>
								</td>
								<td>{{listitems.city}}</td>
								<td>{{listitems.organization_id}}</td>
								<td>{{listitems.mac_address}}</td>
								<td>{{listitems.state|stateName}}</td>
								<td>{{listitems.terminal_id}}</td>

							</tr>
							<tr v-if="Devicelist.length==0" >
								<td colspan="7">
                                     <h4>没有找到符合条件的数据!</h4>
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

		</div>

	</div>

</template>

<script>
	import { getEndList } from 'api/end'
	import myLoading from 'base/page/Loading.vue'
	import { SUCCESS_OK } from 'api/config'
	import { dicItem,getDicName } from 'api/commonUtil.js'
	import pagination from 'base/pagination.vue'
	
	export default {
		data() {
			return {
				Devicelist: '',
				City: dicItem("city").items,
				ternalCheck: [],
				allStatus:false,
				name: '',
				putCity: '',
				total: 1,
				pageSize: 7, //每页有多少条记录
				current: 1,
				loading:true
			}
		},
		name: 'deviceModal',
		components: {
			 myLoading,
			'v-pagination':pagination
		},
		filters:{
			stateName:function(v){
				let name=getDicName("state",v);
	   	 		return name;
			}
		},
		created() {

			var paramsPage = {
				"page": 1,
				"pagesize": 7
			};

			this._getEndlist(paramsPage);
		},
		
		watch:{
			'ternalCheck':function(to,from){
				var _this = this;
				if(to.length==_this.Devicelist.length){
					this.allStatus=true;
				}else{
					this.allStatus=false;
				}
			}
		},
		methods: {
			checkAll(){
				  var _this = this;
				    if (this.allStatus) {//实现反选
				      _this.ternalCheck = [];
				      _this.allStatus=false;
				    }else{//实现全选
				        _this.allStatus=true;
				      _this.ternalCheck = [];
				      _this.Devicelist.forEach(function(item){
				      	  _this.ternalCheck.push(item.terminal_id+'|'+item.mac_address+'|'+item.name)
				      })
				     
				    }
  
			},
			_getEndlist: function(para) {
				let paramsSeacrch = {
					"name": this.name,
					"city": this.putCity
				};
				let data = Object.assign({}, para, paramsSeacrch)
				this.loading=true;
				this.Devicelist=[];
				getEndList(data).then((res) => {
					if(res.repCode == SUCCESS_OK) {
						this.loading=false;
						this.Devicelist = res.datas;
						this.total = res.totalCount;
						this.pageSize = res.pageSize;
					}
				})
			},
			pagechange(page) {
				this._getEndlist({
					"page": page,
					"pagesize": this.pageSize
				});
			},
			search: function(d) {
				console.log(this.ternalCheck);
				this._getEndlist({
					"page": 1,
					"pagesize": this.pageSize
				});
			},
			strChecks:function(){
				let checks=this.ternalCheck;
				let s_Arr=[], totalArr=[];
				for(var i=0;i<checks.length;i++){
					var t_arr=checks[i].split('|');
					var obj={};
					obj.terminal_id=t_arr[0];
					obj.mac_address=t_arr[1];
					totalArr.push(obj);	
					s_Arr.push(t_arr[2]);	
				}
				this.$emit('child-param',{"names":s_Arr.join(','),"obj":totalArr});
				$("#deviceModal").modal('hide');
			}
		}
	}
</script>

<style>
	
	/*.testClass .pagination {
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
	
	.testClass .pagination li:first-child,
	.testClass .pagination li:last-child {
		width: 50px;
	}
	
	.testClass .active {
		background-color: #d84a38;
	}
	
	.testClass .active a {
		color: #FFFFFF;
	}*/
	
</style>

<style scoped>
	.testClass{
		float: right;
	}
	#deviceTable tr th, #deviceTable tr td{
		text-align: center;
	}
	.input-td {
		margin-top: 10px;
	}
	
	#deviceModal {
		display: none;
		width: 80%;
		left: 30%;
	}
	
</style>