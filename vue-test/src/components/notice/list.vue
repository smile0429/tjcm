<template>
	<div id="noticeList">
        <my-title></my-title>
        <div class="underContent">
        <button type="button" class="btn red add_btn" @click="addNotice"  data-toggle="modal">添加公告</button>
		<table class="table table-striped table-bordered table-hover" id="notice_table">

			<thead>

				<tr>

					
					<th>标题</th>

					<th class="hidden-480 notice_content">内容</th>

					<th class="hidden-480">添加时间</th>

					<th class="hidden-480">添加人员</th>
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

					

					<td>{{listitems.title}}</td>

					<td ><p class="contentWrap">{{listitems.content}}</p></td>
					<td>{{listitems.add_time_str}}</td>
					<td>{{listitems.user_name}}</td>
					<td><a href="javascript:void(0)" @click="lookDetail(listitems)">查看</a></td>

				</tr>
				
				<tr v-if="!list||list.length==0">
            		<td colspan="5">
            			<h4>暂无公告数据！</h4>
            		</td>
            	</tr>

			</tbody>
			

		</table>
        </div>
        <my-model @refreshList="onRefresList"></my-model>
        <my-detail :params="parentParams"></my-detail>
	</div>
</template>

<script>
	
	
	import myTitle from 'base/page/title'
	import myLoading from 'base/page/Loading.vue'
	import {getNoticeList} from 'api/notice'
	 import {SUCCESS_OK} from 'api/config'
	import myModel from './addModel'
	import myDetail from './noticeDetail'
	import pagination from 'base/pagination.vue'
	
	export default{
		 data(){
	   	 	return {
	   	 		list:'',
	   	 		parentParams:'',
	   	 		total:1,
	   	 		pageSize:10, //每页有多少条记录
				current: 1,
				loading:true
	   	 	}
	   	 },
		name: 'noticeList',
		components: {
			myTitle,
			myLoading,
			myModel,
			'v-pagination':pagination,
			myDetail
		},
        mounted() {
        	
			this._getList()
		},
		methods:{
			_getList:function(page){
				var params = {
					"page":page==''||page==undefined?1:page,
					"pagesize":this.pageSize
				};
				this.loading=true;
				this.list=[];
				getNoticeList(params).then((res)=>{
					this.loading=false;
					if(res.repCode==SUCCESS_OK){
						this.list=res.datas;
						this.total = res.totalCount;
						this.pageSize =res.pageSize;
					}
				})
			},
			addNotice:function(){
				$('#addNoticeModal').modal({});
			},
			onRefresList:function(){
				this._getList();
			},
			pagechange(page){
				this._getList(page);
			},
			lookDetail(item){
				this.parentParams=item;
				$("#noticeDetail").show();
				$("#noticeDetail").modal();
				
			}
		}
	}
</script>

<style>
	#notice_table tr th,#notice_table tr td{
		text-align: center;
		   
	}
	#notice_table{
		width:98%;
		margin:0px auto;
	}
	.add_btn{
		margin-left: 1%;
		margin-bottom: 1% !important;
	}
	.notice_content{
		width:30%;
        overflow: hidden;
	}
	.contentWrap{
	   width:300px;
	    white-space:nowrap;
	     text-overflow:ellipsis; 
	     overflow:hidden;
	}
</style>