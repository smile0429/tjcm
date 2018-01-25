<template>
	<div id="skList">
		<my-title></my-title>
		<div class="underContent">
		<div>
			<table id="searchTable">
				<tr>
					<td>
						上刊名称&nbsp;
					</td>
					<td>
						<input type="text" class="input-td" v-model="putin_name"/>&nbsp;&nbsp;&nbsp;&nbsp;
					</td>
					<td>
						投放状态&nbsp;
					</td>
					<td>
						<select v-model="getPutInState" class="chosen-with-diselect input-td" tabindex="-1">
							<option value="">全部</option>

							<option v-for="putinItems in putin_state.items" :value="putinItems.dic_item_value">
								{{putinItems.dic_item_name}}
							</option>

						</select>
						&nbsp;&nbsp;&nbsp;
					</td>
					<td>
						<a href="javascript:void(0)" class="btn blue" @click="search"><i class="icon-search"></i>&nbsp;搜索</a>
						<!--<a v-if="user_type==2||user_type==3" href="javascript:void(0)" class="btn yellow" @click="firstALLcheck"><i class="icon-file"></i>&nbsp;批量初审</a>
						<a v-if="user_type==2||user_type==3" href="javascript:void(0)" class="btn yellow" @click="secondALLcheck"><i class="icon-file"></i>&nbsp;批量复审</a>-->
					</td>
				</tr>
			</table>
		</div>
		<table class="table table-striped table-bordered table-hover" id="skglTable" >

    
			<thead>

				<tr>

					<!--<th style="width:8px;" v-if="user_type==2||user_type==3"><input type="checkbox" v-model="allStatus" @click="checkAll"/></th>-->
                    <th class="hidden-480">上刊名称</th>
					<th>客户名称</th>
					<th class="hidden-480">播放类型</th>
					<th class="hidden-480">时间段</th>
					<th class="hidden-480">上下刊时间</th>
					<th class="hidden-480">是否付费</th>
					<th class="hidden-480">素材</th>
					<th class="hidden-480">不相邻投放</th>
					<th class="hidden-480">状态</th>
					<th class="hidden-480">操作</th>
				</tr>

			</thead>
			<tfoot>
				<tr>
					<td colspan="10" v-show="!loading">
						<v-pagination :total="total" :pageSize="pageSize" :current-page='current' @pagechange="pagechange" ></v-pagination>
					</td>
					<td colspan="10" v-show="loading">
						<my-loading ></my-loading>
					</td>
				</tr>
			</tfoot>
			<tbody v-show="!loading">
				<tr class="odd gradeX" v-for="(listitems,index) in list">
                    <td class="hidden-480">
                    	<router-link :to="{ name:'/skgl/add', params: {putin_id:listitems.putin_id,stepParam:4,putin_state:listitems.putin_state,editType:3}}">
							<a href="javascript:void(0)" >{{listitems.putin_name}}</a>
						</router-link>
						
					</td>
					<td>
					    {{listitems.customer_name}}
					</td>
					<td class="hidden-480">{{listitems.display_type|playName}}</td>

					<td class="center hidden-480" v-if="listitems.display_type!=1">{{listitems.interrupt_display_begin_time}}至{{listitems.interrupt_display_end_time}}</td>
					<td class="center hidden-480" v-if="listitems.display_type==1">无</td>

					<td class="center hidden-480">{{listitems.putin_begin_date_str}}到{{listitems.putin_end_date_str}}</td>
					<td class="center hidden-480">{{listitems.putin_type | putTypeName}}</td>
					<td class="center hidden-480">
						<a href="javascript:void(0)" @click="lookResource(listitems.putin_id,listitems.display_type)">查看</a>
					</td>
					<td class="center hidden-480">{{listitems.not_near_putin_name}}</td>
					<td class="center hidden-480">{{listitems.putin_state |stateName}}</td>
					<td class="center hidden-480 editList">
						<router-link :to="{ name:'/skgl/add', params: {putin_id:listitems.putin_id,stepParam:1,putin_state:listitems.putin_state,display_type:listitems.display_type,editType:2}}">
							<a href="javascript:void(0)" v-if="(listitems.putin_state==1||listitems.putin_state==8)&&(user_type==2||user_type==3)">编辑信息</a>
						</router-link>
						<router-link :to="{ name:'/skgl/add', params: {putin_id:listitems.putin_id,stepParam:2,putin_state:listitems.putin_state,display_type:listitems.display_type,editType:2}}">
							<a href="javascript:void(0)" v-if="(listitems.putin_state==1||listitems.putin_state==4||listitems.putin_state==5||listitems.putin_state==8)&&(user_type==2||user_type==3)">修改素材</a>
						</router-link>
						<router-link :to="{ name:'/skgl/add', params: {putin_id:listitems.putin_id,stepParam:3,putin_state:listitems.putin_state,display_type:listitems.display_type,editType:2}}">
							<a href="javascript:void(0)" v-if="(listitems.putin_state==1||listitems.putin_state==4||listitems.putin_state==5||listitems.putin_state==8)&&(user_type==2||user_type==3)">修改终端</a>
						</router-link>
						<a href="javascript:void(0)" @click="check(listitems.putin_id,listitems.log_id,listitems.putin_state)" v-if="(listitems.putin_state==2||listitems.putin_state==3)&&(user_type==2||user_type==3)">审核</a>
						<a href="javascript:void(0)" @click="submitfirstCheck(listitems.putin_id)" v-if="(listitems.putin_state==1)&&(user_type==2||user_type==3)">提交审核</a>
						<a href="javascript:void(0)" @click="editPut(listitems.putin_id,2)" v-if="listitems.putin_state==4||listitems.putin_state==5">下刊</a>
						<a href="javascript:void(0)" @click="putRecord(listitems)" v-if="listitems.putin_state==5||listitems.putin_state==6||listitems.putin_state==7">查看播放记录</a>
					</td>

				</tr>
                <tr v-if="list.length==0">
                	<td colspan="10">
                		<h4>暂无数据！</h4>
                	</td>
                </tr>
                
                
			</tbody>
			
			

		</table>
        </div>
		<my-check :putItems="checkItems" @refreshList="onRefresList"></my-check>
		<my-submit :subPara="pageSubmit" @requestList="onRefresList"></my-submit>
		<my-resource :url="parentUrl"></my-resource>
		<my-record :putinObj="parentPId"></my-record>
	</div>
</template>

<script>
	// 引入vue头部组件
	import Cookies from 'js-cookie'
	import myTitle from 'base/page/title'
	import myLoading from 'base/page/Loading.vue'
	import Config from 'api/config'
	import myCheck from '../check/check'
	import mySubmit from '../check/submitCheck'
    import myResource from '../advertiser/resource'
    import myRecord from 'components/play/putplay'
	import { getSkglList, updateSkglList } from 'api/skgl'
	import { SUCCESS_OK } from 'api/config'
	import { dicItem,getDicName,getArr,newObjArr} from 'api/commonUtil.js'
	import pagination from 'base/pagination.vue'

	export default {
		data() {
			return {
				user_type:JSON.parse(Cookies.get('user_type')),
				list: '',
				puts:[],
				allStatus: false,
				putin_state: dicItem("putin_state"),
				parentPId:{},
				parentUrl:{},
				getPutInState: '',
				putin_name:'',
				checkItems:{},
				pageSubmit:'',
				total: 1,
				pageSize:10,
				current: 1,
				loading:true
			}
		},
		name: 'skList',
		components: {
			myTitle,
			myLoading,
			pagination,
			myCheck,
			myResource,
			mySubmit,
			myRecord,
			'v-pagination':pagination
		},
		filters:{
			putTypeName:function(v){
				let name=getDicName("putin_type",v);
	   	 		return name;
			},
			stateName:function(v){
				let name=getDicName("putin_state",v);
	   	 		return name;
			},
			playName(v){
				let name=getDicName("display_type",v);
	   	 		return name;
			}
		},
		created: function() {
			
			this._getSkglList();
		},
		mounted(){
			this.parentUrl={
				putin_id:'',
				display_type:''
			}
		},
        watch:{
			'puts':function(to,from){
				var _this = this;
				if(to.length==_this.list.length){
					this.allStatus=true;
				}else{
					this.allStatus=false;
				}
			}
		},
		methods: {
			checkAll() {
				var _this = this;
				//询问层
			    jeBox({
			        cell:"jbx",
			        padding:"0px 50px",
			        title:"批量审核",
			        boxSize:["auto","150px"],
			        content:'<p id="choseTip">请选择审核的类型</p>',
			        maskLock : true ,
			        btnAlign:"center",
			        button:[
			            {
			                name: '批量初审',
			                callback: function(index){
			                    if(this.allStatus) { //实现反选
									_this.puts = [];
									_this.allStatus = false;
									this.allStatus = false;
								} else { //实现全选
									_this.allStatus = true;
									this.allStatus = true;
									_this.puts = [];
									_this.list.forEach(function(item) {
										if(item.putin_state==2){
											_this.puts.push(item.putin_id+'|'+item.log_id)
										}
										
									})
				
								}
			                    jeBox.close(index);
			                    
			        
			                }
			            },
			            {
			                name: '批量复审',
			                callback:function(index){
			                	 if(this.allStatus) { //实现反选
										_this.puts = [];
										_this.allStatus = false;
										this.allStatus = false;
									} else { //实现全选
										_this.allStatus = true;
										this.allStatus = true;
										_this.puts = [];
										_this.list.forEach(function(item) {
											if(item.putin_state==3){
												_this.puts.push(item.putin_id+'|'+item.log_id)
											}
											
										})
					
									}
			                    jeBox.close(index);
			                   jeBox.close(index);
			                }
			            },
			            {
			                name: '取消',
			                callback:function(index){
			                   jeBox.close(index);
			                }
			            }
			        ]
			    })
			},
			onRefresList(){
				this.puts = [];
				this._getSkglList();
			},
			putRecord(obj){
				$("#putPlaydModal").show();
				$("#putPlaydModal").modal();
				this.parentPId=obj;
			},
			lookResource(id,display_type){
				$("#resourceModal").show();
				$("#resourceModal").modal();
				if(id!=null){
					this.parentUrl.putin_id=id;
					this.parentUrl.display_type=display_type;
				}	
                
			},
			_getSkglList: function(page) {
				var params = {
					"page":page==''||page==undefined?1:page,
					"pagesize":this.pageSize,
					"putin_name":this.putin_name,
					"putin_state":this.getPutInState
				};
				this.loading=true;
				this.list=[];
				getSkglList(params).then((res) => {
					this.loading=false;
					if(res.repCode == SUCCESS_OK) {
						this.list = res.datas;
						this.total = res.totalCount;
						this.pageSize = res.pageSize;
						
					}else{
						alert(res.errorMsg)
					}
				})
			},
			// 草稿状态下的单条提交审批
			submitfirstCheck(id){
				this.pageSubmit=id;
				$("#submitcheckModal").show();
				$("#submitcheckModal").modal({})
			},
			// 单条审核
			check: function(pId,lId,status) {
				this.checksModal(pId,lId,status);
			},
			// 批量初审
			firstALLcheck(){
				if(this.puts.length==0){
					jeBox.msg('请至少选择一个投放进行审核',{time:1});
					return false;
				}
				this.checksArr(2);
			},
			// 批量复审
			secondALLcheck(){
				if(this.puts.length==0){
					jeBox.msg('请至少选择一个投放进行审核',{time:1});
					return false;
				}
				this.checksArr(3);
			},
			checksArr(type){
				let checks=this.puts;
				let put_ids=[], put_logs=[];
				for(var i=0;i<checks.length;i++){
					var t_arr=checks[i].split('|');
					put_ids.push(t_arr[0]);
					put_logs.push(t_arr[1]);
				}
				this.checksModal(put_ids.join(','),put_logs.join(','),type);
			},
			checksModal:function(ids,logs,type){
				this.checkItems={
					"put_ids":ids,
					"put_logs":logs,
					"putin_state":type
				}
				$("#checkModal").show();
				$("#checkModal").modal({})
			},
			editPut: function(ids, type) {
				var _this=this;
				
				
				var	up_state = 7;
				
				let param = {
					"add_user_id":JSON.parse(Cookies.get('user_id')),
					"putin_id": ids,
					"putin_state": up_state
				}
			    jeBox({
			        padding:"0px 50px",
			        title:"下刊",
			        boxSize:["auto","170px"],
			        content:'<p id="choseTip">确认要下刊吗?</p>',
			        maskLock : true ,
			        btnAlign:"center",
			         button: [ 
				        {
				            name: '确定',
				            callback:function(index){
				                jeBox.close(index);
				                updateSkglList(param).then((res) => {
									if(res.repCode == SUCCESS_OK) {
										_this._getSkglList();
										jeBox.msg('操作成功',{time:1});
									}
								})
				            }
				        },{
				            name: '取消'
				        }
				    ]
			    })
				
				
				
				
				
				
				
			},

			pagechange(page) {
				this._getSkglList(page);
			},
			search:function(){
				this._getSkglList();
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
</style>
<style scoped>
	.input-td {
		margin-top: 10px;
	}
	#skglTable{
		width: 98%;
		margin: 0px auto;
	}
	#searchTable{
		margin-left: 1%;
	}
	#skglTable tr th, #skglTable tr td{
		text-align: center;
		vertical-align: middle;
	}
	#skglTable{
	   width: 98%;
	   margin: 0px auto;
	}
	.editList a{
		display: block;
	}
	
</style>


