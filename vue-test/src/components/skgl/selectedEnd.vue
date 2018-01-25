<template>
	  <div class="portlet box grey">
	   	
	   	 <div class="portlet-title">

			<div class="caption">

				<span>已经选择的终端列表</span>

			</div>

			<div class="tools hidden-phone">

				<a href="javascript:;" class="collapse"></a>
			</div>

		</div>
		<div class="portlet-body">
			   <a href="javascript:;" class="btn red button-submit stbtn" @click="deleteSelected" v-if="(step!=4)&&(selectedlist.length!=0)">

						<i class=" icon-remove"></i>&nbsp;&nbsp;批量删除终端
	
					</a>
					
					<table class="searchtable">
							<tr>
								<td>
									终端名称&nbsp;
								</td>
								<td>
									<input type="text" class="input-td" v-model="ternal_name"/>&nbsp;&nbsp;&nbsp;&nbsp;
								</td>
								<td>
									城市&nbsp;
								</td>
								<td>
									<select v-model="citychose" class="chosen-with-diselect input-td" tabindex="-1">
										<option value="">全部</option>
			
										<option v-for="putinItems in city.items" :value="putinItems.dic_item_value">
											{{putinItems.dic_item_name}}
										</option>
			
									</select>
									&nbsp;&nbsp;&nbsp;
								</td>
								<td>
									<a href="javascript:void(0)" class="btn blue"  @click="searchselectedTernal"><i class="icon-search"></i>&nbsp;搜索</a>
									
								</td>
							</tr>
				</table>
			  <table class="table table-striped table-bordered table-hover" id="selectedTable">
		
				<thead>
		
					<tr>
						<th v-if="step!=4"><input type="checkbox" v-model="selectedStatus" @click="checkAllselected" ></th>
						<th class="hidden-480">终端名称</th>
						<th class="hidden-480">所在城市</th>
						<th class="hidden-480">所属机构</th>
						<th class="hidden-480">Mac地址</th>
						<th class="hidden-480">Ip地址</th>
						<th class="hidden-480" v-if="step!=4">操作</th>
						
					</tr>
		
				</thead>
		    <tfoot>
				<tr>
					<td colspan="7" v-if="(step!=4)&&(selectedlist.length!=0)">
						<v-pagination :total="total" :pageSize="pageSize" :current-page='current' @pagechange="pagechange" ></v-pagination>
					
					</td>
					<td colspan="5" v-if="(step==4)&&(selectedlist.length!=0)">
						<v-pagination :total="total" :current-page='current' @pagechange="pagechange" ></v-pagination>
					
					</td>
					<!--<td colspan="7" v-if="(step!=4)&&(selectedlist.length!=0)&&(loading)">
						  <my-loading></my-loading>
					</td>-->
					<!--<td colspan="5" v-if="(step==4)&&(selectedlist.length!=0)&&(loading)">
						   <my-loading></my-loading>
					</td>-->
					
					
				</tr>
			</tfoot>
				<tbody>
					<tr class="odd gradeX" v-for="(listitems,index) in selectedlist">
							<td v-if="step!=4">
								<input type="checkbox" :value="listitems.terminal_id" v-model="selectedChecks" >
							</td>
							<td>
								<a href="javascript:void(0)">{{listitems.name}}</a>
							</td>
							<td>{{listitems.city|cityName}}</td>
							<td>{{listitems.organization_name}}</td>
							<td>{{listitems.mac_address}}</td>
							<td>{{listitems.ip_address}}</td>
							<td v-if="step!=4">
								 <a href="javascript:void(0)" @click="downPut" v-if="(step!=4)&&(putin_stata==4||putin_stata==5)">下刊</a>
								 <a href="javascript:void(0)" @click="singledelete(listitems)" v-if="(step!=4)&&(putin_stata==1||putin_stata==2||putin_stata==3||putin_stata==8)">删除</a>
							</td>
						</tr>
						<tr v-if="!selectedlist||!selectedlist.length">
							<td colspan="7">
								<h4>暂无选择的终端</h4>
							</td>
						</tr>
				</tbody>
		
			</table>
			</div>
	</div>
</template>

<script>
	import Cookies from 'js-cookie'
	import {Config} from 'api/config.js'
	import {getSkglSelected,deleteSkglSelected,updateSkglList} from 'api/skgl'
	import pagination from 'base/pagination.vue'
	import { SUCCESS_OK } from 'api/config'
	import { dicItem, getDicName } from 'api/commonUtil.js'
	import myLoading from 'base/page/Loading.vue'
	export default {
		data() {
			return {
				step:this.$store.state.app.stepFlag,
				putin_stata:this.$store.state.app.putin_state,
				selectedChecks:[],  // 被选中的所有
				selectedStatus:false, // 是否全选的状态
				selectedlist:[],
				total: 1,
				pageSize: 10, //每页有多少条记录
				current: 1,
				citychose:'',
				city:dicItem("city"),
				ternal_name:'',
				loading:true
			}
		},
		filters: {
			cityName: function(v) {
				let name = getDicName("city", v);
				return name;
			}
		},
		components: {
			myLoading,
			'v-pagination':pagination
		},
		watch:{
			 /*selectedlist(to,from){
	     	 this.selectedlist=to;
	     },*/
	     'selectedChecks':function(to,from){
					var _this = this;
					if(to.length==_this.selectedlist.length){
						this.selectedStatus=true;
					}else{
						this.selectedStatus=false;
					}
				}
		},
		props: ['selectedId'],
		created:function(){
			 this._getSelected()
		},
		methods:{
			   downPut(){
			   	   let _this=this;
			   	   let param = {
							"add_user_id":JSON.parse(Cookies.get('user_id')),
							"putin_id":this.selectedId,
							"putin_state":7
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
												//	_this._getSkglList();
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
			   searchselectedTernal(){
			   	    this._getSelected();
			   },
			   checkAllselected(){
				        var _this = this;
						    if (this.selectedStatus) {//实现反选
						      _this.selectedChecks = [];
						     _this.selectedStatus=false;
						    }else{//实现全选
						      _this.selectedStatus=true;
						      _this.selectedChecks = [];
						      _this.selectedlist.forEach(function(item){
						      	  _this.selectedChecks.push(item.terminal_id)
						      })
						    }
			   },
				 deleteSelected(){
				 	   let para={}
				 	   let selectArr=[];
				 	   let deleArr=this.selectedChecks;
				 	   $.each(deleArr, function(key,item) {
				 	   	   var obj={};
				 	   	   obj.terminal_id=item;
				 	   	   selectArr.push(obj);
				 	   });
				 	   if(selectArr.length==0){
				 	   	  jeBox.msg('请选择要删除的终端', {
									time: 1
								});
								return false;
				 	   }
				 	   para.putin_id=this.selectedId;
				 	   para.terminal_list=selectArr;
				 	   this._deleteTernal(para);
				 },
				 singledelete(item){
				 	 let singleParam={},singleArr=[],obj={};
				 	   obj.terminal_id=item.terminal_id;
				 	   singleArr.push(obj);
				 	   singleParam.putin_id=this.selectedId;
				 	   singleParam.terminal_list=singleArr;
				 	   this._deleteTernal(singleParam);
				 },
			  _getSelected(page){
			  	/*this.loading=true;
				    this.selectedlist =[];*/
			  	var para = {
			  		  "putin_id":this.selectedId,
							"page": page == '' || page == undefined ? 1 : page,
							"pagesize": this.pageSize,
							"name":this.ternal_name,
					    "city":this.citychose
						};
			  	  getSkglSelected(para).then((res) => {
			  	  	this.loading=false;
							if(res.repCode == SUCCESS_OK) {
								this.selectedlist = res.datas;
								this.total = res.totalCount;
								this.pageSize = res.pageSize;
							}
						})
			  },
			  _deleteTernal(data){
			  	
			  	   var duration = jeBox.loading(1,"正在删除");
			  	   deleteSkglSelected(data).then((res) => {
			  	   	 jeBox.close(duration);
							if(res.repCode == SUCCESS_OK) {
								this.selectedChecks=[];
								  jeBox.msg(res.datas,{time:1});
								  this.selectedStatus=false
								  // 刷新当前已经选择的列表和父级组件的方法
								  this._getSelected();  // 刷新自己的列表
								  this.$emit('selectedrefreshList');
							}else{
								 alert(res.errorMsg);
							}
						})
			  },
			  pagechange(page) {
					this._getSelected(page);
				}
		}
		

	}
</script>

<style>
	#selectedTable tr th, #selectedTable tr td{
		 text-align: center;
	}
	.searchtable{
		display: inline-block;
	}
</style>