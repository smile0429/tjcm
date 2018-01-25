<template>
	<div class="login" id="login" @keyup="touchKey($event)">
		<div class="content">
		<form class="form-vertical login-form" action="index.html">
			<h3 class="form-title">天捷传媒上刊系统</h3>
			<div class="control-group">
				<label class="control-label visible-ie8 visible-ie9">用户名</label>

				<div class="controls">

					<div class="input-icon left">

						<i class="icon-user"></i>

						<input class="m-wrap placeholder-no-fix" type="text" placeholder="请输入用户名" :class="'log-input' + (account==''?' log-input-empty':'')" v-model="account"/>

					</div>

				</div>

			</div>

			<div class="control-group">

				<label class="control-label visible-ie8 visible-ie9">密码</label>

				<div class="controls">

					<div class="input-icon left">

						<i class="icon-lock"></i>

						<input class="m-wrap placeholder-no-fix" type="password" placeholder="请输入密码" :class="'log-input' + (password==''?' log-input-empty':'')" v-model="password"/>

					</div>

				</div>

			</div>

			<div class="form-actions">

				

				<a href="javascript:void(0)"  class="btn green" @click="login" >

				登陆 <i class="m-icon-swapright m-icon-white"></i>

				</a>     
			</div>

		</form>
        </div>
	</div>
</template>

<script>
	import Cookies from 'js-cookie';
	import {setValues} from 'api/commonUtil.js';
	import {SUCCESS_OK} from '@/api/config'
	import {formLogin} from '@/api/login.js';
	
	
	export default {
		name: 'Login',
		data() {
			return {
				account: '',
				password: ''
			}
		},
		mounted () {
	    	$(".login").parent().parent().css("height","100%");
	    	setValues("dictionary");
	    },
		methods: {
            touchKey(ev){
            	if(ev.keyCode==13){
                     this.login();
                }
            },
			//登录逻辑
			login() {
                 var loginTip = jeBox.loading(3,"正在登陆...",{maskLock:false,maskClose:false});
				// 登陆不为空的判断
				if(this.account != '' && this.password != '') {
					this.toLogin();
				} else {
					jeBox.msg('请填写完整的登陆信息', {
						time: 1
					});
					jeBox.close(loginTip);
				}
			},

			//登录请求
			toLogin() {

                var loginTip = jeBox.loading(3,"正在登陆...",{maskLock:false,maskClose:false});
				//需要想后端发送的登录参数
				let loginParam = {
					user_name: this.account,
					pwd: this.password
				}
				
				formLogin(loginParam).then((res)=>{
					if(res.repCode==SUCCESS_OK){
						jeBox.close(loginTip);
	                     Cookies.set('user_name',res.datas.user_name);
	                     Cookies.set('user_id',res.datas.user_id);
	                     Cookies.set('user_type',res.datas.user_type);
						this.$router.push({
	                        name: 'otherRouter'
	                    });
					}else{
						jeBox.msg(res.errorMsg, {
							time: 1
						});
						jeBox.close(loginTip);
					}
				})
			}
		}
	}
</script>

