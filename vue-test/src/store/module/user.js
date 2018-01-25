import Cookies from 'js-cookie';
const user = {
	state:{
		showFlag:false
	},
	mutations:{
		logout(state,vm){
			Cookies.remove('user_name');
			Cookies.remove('user_id');
			Cookies.remove('user_type');
			
		},
		//
		updateLoading(state,flag){
		 	state.showFlag =flag;
		 	if(state.showFlag){//
		 		jeBox.loading(1,"玩命加载中",{maskLock:true,maskClose:false});
		 	}else{
		 		jeBox.close(loginTip);
		 	}
		},
	}
};

export default user;