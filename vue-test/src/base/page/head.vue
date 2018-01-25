<template>
	<div class="header navbar navbar-inverse navbar-fixed-top">

		<div class="navbar-inner">

			<div class="container-fluid">
				
				<!---最新公告通知-------->
				<div class="vueBox pull-left">
				    <span><i class="icon-bullhorn"></i>&nbsp;&nbsp;最新公告：</span>
				    <a v-for="(item, index) in marqueeList" href="javascript:void(0)" @click="lookDetail(item)">
				    	{{item.title}}
				    	<span> &nbsp;&nbsp;&nbsp;由{{item.user_name}}用户 发布于 {{item.add_time_str}}，点击查看详情</span>
				    </a>
				    <span v-if="!marqueeList||marqueeList.length==0">暂无最新公告</span>
				</div>
				
				<ul class="nav pull-right">   
					<li class="dropdown user">

						<a href="#" class="dropdown-toggle" data-toggle="dropdown">

                           
							<span class="username">{{username}}</span>

							<i class="icon-angle-down"></i>

						</a>

						<ul class="dropdown-menu">
							
							<li>
								<a @click="editPwd()" href="javascript:void(0)"><i class="icon-user"></i>&nbsp;&nbsp;修改密码</a>
							</li>

							<li>
								<a @click="logout()" href="javascript:void(0)"><i class="icon-key"></i>&nbsp;&nbsp;退出</a>
							</li>
							

						</ul>

					</li>

				</ul>

			</div>

		</div>
		
		<my-pwd ></my-pwd>
		<my-detail :headparams="headParams"></my-detail>
	</div>
</template>

<script>
	
import Cookies from 'js-cookie';
import myPwd from '@/components/user/resetPwd.vue'
import { latestNotice } from 'api/notice'
import { SUCCESS_OK } from 'api/config'
import myDetail from '@/components/notice/headDetail.vue'
export default {
	data() {

		return {
			username:Cookies.get("user_name"),
			animate: false,
			marqueeList: [],
			headParams:'',
		}
	},
	created: function() {
        this.getInfo();
	},
	components: {
		myPwd,
		myDetail
	},
	methods: {
		logout() {
			this.$store.commit('logout', this);
            this.$router.push({
                name: 'login'
            });
		},
		getInfo() {
			latestNotice().then((res) => {
				if(res.repCode == SUCCESS_OK) {
					this.marqueeList = res.datas;
				}
			})

		},
		lookDetail(item){
				$("#headDetail").show();
				$("#headDetail").modal();
				this.headParams=item;
		},
		editPwd() {
			$('#repeatPwdModal').show();
			$('#repeatPwdModal').modal();

		}
	}
}</script>

<style>
	.vueBox{
		vertical-align: middle;
		height: 41px;
		line-height: 41px;
		/*margin-left: 14%;*/
	}
	.user {
	   margin-top: 8px !important;
    }
    .vueBox span, .vueBox a{
    	color: #FFFFFF;
    }
    .vueBox a:hover{
    	color: #FFFFFF;
    }
</style>