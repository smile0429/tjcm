<template>

	<div class="myTwo">

		<div class="portlet box grey">

			<div class="portlet-title">

				<div class="caption">

					<span>待选择的终端列表</span>

				</div>

				<div class="tools hidden-phone">

					<a href="javascript:;" class="collapse"></a>
				</div>

			</div>
			<div class="portlet-body">
				<a href="javascript:;" class="btn yellow  stbtn" @click="addTernals">

					<i class="icon-plus"></i>&nbsp;&nbsp;确认选择

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
							<a href="javascript:;" class="btn blue" @click="searchTernal" ><i class="icon-search"></i>&nbsp;搜索</a>
							
						</td>
					</tr>
				</table>
				<table class="table table-striped table-bordered table-hover" id="choseTable">

					<thead>

						<tr>
							<th><input type="checkbox" v-model="allStatus" @click="checkAll"></th>
							<th class="hidden-480">终端名称</th>
							<th class="hidden-480">所在城市</th>
							<th class="hidden-480">所属机构</th>
							<th class="hidden-480">Mac地址</th>
							<th class="hidden-480">Ip地址</th>
							<th class="hidden-480">是否可用</th>

						</tr>

					</thead>
					<tfoot>
						<tr>
							<td colspan="7" v-show="!loading">
								<v-pagination :total="total" :pageSize="pageSize" :current-page='current' @pagechange="pagechange"></v-pagination>

							</td>
							<td colspan="7" v-show="loading">
								<my-loading></my-loading>

							</td>
						</tr>
					</tfoot>
					<tbody v-show="!loading">
						<tr class="odd gradeX" v-for="(listitems,index) in list">
							<td>
								<input type="checkbox" :value="listitems.terminal_id+'|'+listitems.mac_address" v-model="ternalCheck" v-if="listitems.can_putin!=0">
							</td>
							<td>
								<a href="javascript:void(0)">{{listitems.name}}</a>
							</td>
							<td>{{listitems.city|cityName}}</td>
							<td>{{listitems.organization_id}}</td>
							<td>{{listitems.mac_address}}</td>
							<td>{{listitems.ip_address}}</td>
							<td>{{listitems.can_putin|canName}}</td>
						</tr>
						<tr v-if="list.length==0">

							<td colspan="7" v-if="this.code=='0000'">
								<h4>
									没有符合条件的数据!
								</h4>
							</td>
							<td colspan="7" v-if="this.code!='0000'">
								<h4>
									接口有错误，请检验接口
								</h4>
							</td>

						</tr>
					</tbody>

				</table>
			</div>
		</div>
		<selected-end :selectedId="putin_id" @selectedrefreshList="onRefreshSelectList" ref="selectedEnd"></selected-end>
	</div>
</template>

<script>
	import bus from 'api/event'
	import myLoading from 'base/page/Loading.vue'
	import { canUseEndList } from 'api/end'
	import selectedEnd from './selectedEnd'
	import { addSkglTernal, getSkglDetail, getSkglSelected, deleteSkglSelected } from 'api/skgl'
	import { SUCCESS_OK } from 'api/config'
	import { dicItem, getDicName } from 'api/commonUtil.js'
	import pagination from 'base/pagination.vue'
	export default {
		data() {
			return {
				list: '',
				code: '',
				ternalCheck: [],
				allStatus: false,
				citychose:'',
				city:dicItem("city"),
				ternal_name:'',
				total: 1,
				pageSize: 10, //每页有多少条记录
				current: 1,
				loading:true
			}
		},
		components: {
			selectedEnd,
			myLoading,
			'v-pagination': pagination
		},
		watch: {
			'ternalCheck': function(to, from) {
				var _this = this;
				if(to.length == _this.list.length) {
					this.allStatus = true;
				} else {
					this.allStatus = false;
				}
			}
		},
		filters: {
			canName: function(v) {
				let name = '';
				if(v == 0) { //不可用
					name = "不可用"
				} else if(v == 1) {
					name = "可用"
				} else if(v == 2) {
					name = "去掉垫片可用"
				} else if(v == 3) {
					name = "去掉垫片、赠送可用"
				} else if(v == 4) {
					name = "已选择"
				}
				return name;
			},
			cityName: function(v) {
				let name = getDicName("city", v);
				return name;
			}
		},
		created: function() {
			this.putin_id = this.$store.state.app.putin_id;
			this._canUseEndList();
		},
		methods: {
			onRefreshSelectList() {
				this._canUseEndList();
			},

			checkAll() {
				var _this = this;

				if(this.allStatus) { //实现反选
					_this.ternalCheck = [];
					_this.allStatus = false;
				} else { //实现全选
					_this.allStatus = true;
					_this.ternalCheck = [];
					_this.list.forEach(function(item) {
						_this.ternalCheck.push(item.terminal_id + '|' + item.mac_address)
					})
				}

			},
			searchTernal(){
				
				this._canUseEndList();
			},
			_canUseEndList: function(p) {
				var _this = this;
				var params = {
					"page": (p == '' || p == undefined) ? 1 : p,
					"pagesize": this.pageSize,
					"name":this.ternal_name,
					"city":this.citychose
				};
				let data = Object.assign({}, params, {
					"putin_id": this.$store.state.app.putin_id
				})
				this.loading=true;
				this.list =[];
				canUseEndList(data).then((res) => {
					this.loading=false;
					if(res.repCode == SUCCESS_OK) {
						this.list = res.datas;
						this.total = res.totalCount;
						this.pageSize = res.pageSize;
						this.code = SUCCESS_OK;
					} else {
						this.code = res.repCode;
					}
				})
			},
			pagechange(page) {
				this._canUseEndList(page);
			},
			checkternals() {
				let _this=this;
				if(this.$refs.selectedEnd.selectedlist.length == 0 || !this.$refs.selectedEnd.selectedlist) {
					jeBox.msg('请选择要添加的终端', {
						time: 1
					});
				} else {
					//这里要确定是提交下一步
					if(this.$store.state.app.isList == 1) {
						this.$store.commit('nextStep');
					} else if(this.$store.state.app.isList == 2) {
						var san = jeBox.loading(3, "请稍等", {
							maskLock: true,
							maskClose: false
						});
						setTimeout(function() {
							jeBox.close(san)
							_this.$router.push({
								path: '/skgl/list'
							})
						}, 3000);
					} else if(this.$store.state.app.isList == 3) {
						this.$emit('submitCheck');
					}
				};
			},
			addTernals() {
				this.$store.commit('updateIsList', 4);
				// 定义2个数组 最后进行合并
				let terminals = this.ternalCheck;
				let para = {};
				let t_Arr = []
				for(var i = 0; i < terminals.length; i++) {
					var obj = {}
					var m_Arr = terminals[i].split('|');
					obj.terminal_id = m_Arr[0];
					obj.mac_address = m_Arr[1];
					t_Arr.push(obj);
				}
				para.terminal_list = t_Arr;
				para.putin_id = this.putin_id;
				this._addternals(para);
			},
			_addternals: function(p) {
                 var duration = jeBox.loading(1,"正在添加");
				addSkglTernal(p).then((res) => {
					jeBox.close(duration);
					if(res.repCode == SUCCESS_OK) {
						this.ternalCheck=[];
						this._canUseEndList(); //更新自己的列表
						this.$refs.selectedEnd._getSelected();
						if(this.$store.state.app.isList == 1) {
							this.$store.commit('nextStep');
						} else if(this.$store.state.app.isList == 2) {
							var san = jeBox.loading(3, "请稍等", {
								maskLock: true,
								maskClose: false
							});
							setTimeout(function() {
								jeBox.close(san)
								_this.$router.push({
									path: '/skgl/list'
								})
							}, 3000);
						} else if(this.$store.state.app.isList == 3) {
							this.$emit('submitCheck');
						}
					} else {
						alert(res.errorMsg)

					}
				})

			}
		}
	}
</script>
<style>
	#choseTable tr th,
	#choseTable tr td {
		text-align: center;
	}
</style>
<style scoped>
	.myTwo {
		margin-top: 20px;
	}
	.searchtable{
		display: inline-block;
	}
</style>