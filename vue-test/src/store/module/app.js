import {otherRouter, appRouter} from '@/router/router';
import Cookies from 'js-cookie';
import Vue from 'vue';

const app = {
	state:{
		headTitle:'',
		stepFlag:1, // 代表在增加上刊的时候的步骤数
		menuList: [],
		putin_id:'',// 点击上一步的投放id
		putin_state:1, //默认是一个草稿状态
		playType:1,
		isList:1, //1代表下一步 2代表回到列表  3代表回到列表之前先要保存所做的更新4代表什么也不操作
		editeype:1 //1代表正常操作 2代表从列表进来
	},
	mutations:{
		//
		updateIsList(state,flag){
		 	state.isList =flag;
		},
		//更新操作来源
		updataEditeype(state,type){
			state.editeype =type;
		},
		 //更新当前播放类型
		 updatePlayType(state,type){
		 	state.playType =type;
		 },
		//保持当前列表的步数是1
		keepStep(state){
			state.stepFlag =1;
		},
		// 下一步的增加
		nextStep(state){
			state.stepFlag +=1;
		},
		//上一步的状态减少
		preStep(state){
			state.stepFlag -=1;
		},
		// 更新当前的状态
		updateStep(state,stats){
			state.stepFlag =stats;
		},
		//更新投放id
	    updatePutinId(state,id){
	    	state.putin_id =id;
	    },
	    // 更新投放状态
	    updatePutinstate(state,num){
	    	state.putin_state =num;
	    },
	    keepPutinstate(state){
	    	state.putin_state =1;
	    },
		// 包括菜单的权限控制
		updateMenulist (state) {
            let userType=parseInt(Cookies.get('user_type'))
            let menuList = [];
 
            if(userType!=undefined&&userType!=null){
    			var twins = appRouter.filter((m) => {	
	    			var values = m.owner.split(",");
	    			var isOwner = false;
	    			for (var i = 0; i < values.length; i++) {  
			            if (values[i] == userType) {  
			                isOwner = true;  
			            }  
			       }  					        
			        return isOwner;
			    
				});
    		}else{
    			var twins=[];
    		}
    		
    		// 增加子菜单权限判断
    		if(twins!=undefined&twins!=null&&twins.length>0){
    			for(var i in twins){
    				if(twins[i]!=undefined&&twins[i].type!=undefined&&twins[i].type=="0"){
    					var menuChilds = twins[i].children;
    					var mPath = menuChilds[0].path; 
    					if(!(twins[i].path.indexOf(mPath)!=-1)){
    						twins[i].path = twins[i].path + "/" + menuChilds[0].path;
    					}
    					
    				}else{
    					if(twins[i]!=undefined&twins[i].children!=null&&twins[i].children!=undefined){
			        		var menuChilds = twins[i].children;
			        		for(var j in menuChilds){
			        			if(!(menuChilds[j].path.indexOf(twins[i].path)!=-1)){
		    						menuChilds[j].path = twins[i].path + "/" +menuChilds[j].path;
		    					}
			        			
			        		}
		        				        		
		        			twins[i].children = menuChilds;
        				}
    				}
    				
    			}
    		}
   			
            state.menuList = twins;
       },
        
    // 头部面包屑的显示
        showHeadTitle(state,name){
        	state.headTitle = name;
        }
	}
};
export default app;
