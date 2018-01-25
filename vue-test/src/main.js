
import Vue from 'vue'
import App from './App'
import VueLazyload from 'vue-lazyload'
import {router} from './router/index'
import {appRouter} from './router/router'; //包含着主页面的左侧菜单信息
import store from './store';
import Config from 'api/config'
import 'jquery'
//import 'vendor/jeDate/skin/jedate.css'
import 'bootstrap/dist/js/bootstrap.min' 

import 'vendor/jeDate/jquery.jedate.js'
import {setValues} from 'api/commonUtil.js'
import {SUCCESS_OK} from 'api/config'

Vue.config.productionTip = false;
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: './static/image/error.jpg',
  loading: './static/image/loading.gif',
  attempt: 1
})
new Vue({
    el: '#app',
    router: router,
    store:store,
    render: h => h(App),
    data(){
    	return{
    		
    	}
    },
    watch: {  
        $route(to, from) { 
            this.$store.commit('showHeadTitle',to.meta.title);
            this.$store.commit('updatePutinId','');
            this.$store.commit('updatePlayType',1);
            this.$store.commit('keepStep');       
        }
    },  
    mounted () {
    	 var typeList=this.$store.state.app.menuList;
    }
})



