<template>
	<div id="noticeList">
		<my-title></my-title>
		<div class="underContent">
		<button type="button" class="btn red add_btn" @click="addUser">添加用户</button>
		<table class="table table-striped table-bordered table-hover" id="table">

			<thead>

				<tr>
					<th class="hidden-480">用户名</th>
					<th class="hidden-480">密码</th>
					<th class="hidden-480">角色类型</th>
					<th class="hidden-480">是否可用</th>

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
			<tbody>
				<tr class="odd gradeX" v-for="(listitems,index) in list">
					<td class="hidden-480">{{listitems.user_name}}</td>

					<td class="hidden-480">
						{{listitems.pwd}}
					</td>
                     <td  class="hidden-480">{{listitems.user_type|typeName}}</td>
					<td class="hidden-480">{{listitems.state|stateName}}</td>

					<td class="hidden-480 editUser">
						<a href="javascript:void(0)" class="btn yellow mini" @click="editUser(listitems)"><i class="icon-user"></i>&nbsp;&nbsp;修改信息</a>
						<a href="javascript:void(0)" class="btn grey mini" @click="resetPwd(listitems.user_id)"><i class="icon-pencil"></i>&nbsp;&nbsp;重置密码</a>
					</td>
				</tr>
			</tbody>

		</table>
		</div>
		<my-model :params="parentParams" @refreshList="onRefresList"></my-model>
		<my-pwd :pwdparams='parentPwd' @refreshPwd="onRefresPwd"></my-pwd>
	</div>
</template>

<script>
	// 引入vue头部组件
	import myTitle from 'base/page/title'
	import myLoading from 'base/page/Loading.vue'
	import { getDicName } from 'api/commonUtil.js'
	import myModel from './add'
	import myPwd from './resetPwd.vue'

	import { getUserList,repeatPwd } from 'api/user'
	import { SUCCESS_OK } from 'api/config'
	import pagination from 'base/pagination.vue'

	export default {

		data() {
			return {
				
				list: '',
				parentParams: '',
				parentPwd: '',
				total: 1,
				pageSize: 10, //每页有多少条记录
				current: 1,
				loading:true
			}
		},
		filters: {
			stateName: function(val) {
				let name = getDicName("state", val);
				return name;
			},
			typeName:function(val){
				let name = getDicName("user_type", val);
				return name;
			}
		},
		name: 'noticeList',
		components: {
			myTitle,
			myLoading,
			myModel,
			myPwd,
			'v-pagination':pagination
		},

		created: function() {
			this.parentParams = {
				user_name: ""
			};

			this._getUserList();
		},
		methods: {
			_getUserList: function(page) {
				var para = {
					"page": page == '' || page == undefined ? 1 : page,
					"pagesize": this.pageSize
				};
				this.loading=true;
				this.list=[];
				getUserList(para).then((res) => {
					if(res.repCode == SUCCESS_OK) {
						this.loading=false;
						this.list = res.datas;
						this.total = res.totalCount;
						this.pageSize = res.pageSize;
					}
				})
			},
			resetPwd: function(id) {
				
				// 初始化密码
                var _this=this;
				  //询问层
			    jeBox({
			        padding:"0px 50px",
			        title:"重置密码",
			        boxSize:["auto","170px"],
			        content:'<p id="choseTip">确认要重置密码吗?</p>',
			        maskLock : true ,
			        btnAlign:"center",
			        button: [{
						name: "确定",
						callback:function(index){
							var duration = jeBox.loading(1,"请稍等");
			                jeBox.close(index);
			                var params={
			                	"user_id":id
			                }
			                repeatPwd(params).then((res) => {
			                	jeBox.close(duration);
								if(res.repCode == SUCCESS_OK) {
									_this._getUserList();
									jeBox.msg('操作成功',{time:1});
								}
							})
			            }
					}, {
						name: "取消",
						callback:function(index){
							jeBox.close(index);
						}
					}]
			    })
			},
			addUser: function() {
				$('#repeatPwdModal').hide();
				$("#userAddModal").show();
				$('#userAddModal').modal();
				this.parentParams = {
					user_name: "",
					pwd: "",
				};
			},
			editUser: function(obj) {
				$('#repeatPwdModal').hide();
				$("#userAddModal").show();
				$('#userAddModal').modal();
				this.parentParams = obj;
			},
			pagechange(page) {
				this._getUserList(page);
			},
			onRefresList: function() {
				this._getUserList();
			},
			onRefresPwd() {
				this._getUserList();
			}
		}
	}
</script>

<style>
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
	
	#table {
		width: 98%;
		margin: 0px auto;
	}
	
	#table tr th,
	#table tr td {
		text-align: center;
	}
	
	.add_btn {
		margin-left: 1%;
		margin-bottom: 1% !important;
	}
	.editUser{
		width: 20%;
	}
</style>