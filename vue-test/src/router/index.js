import Vue from 'vue'
import VueRouter from 'vue-router'
import Cookies from 'js-cookie'
import {routers,otherRouter,appRouter} from './router';
import {AppJS} from 'common/js/vendorMain.js'
Vue.use(VueRouter)

// 配置路由
const RouterConfig={
	 routes:routers
}

export const router=new VueRouter(RouterConfig);  // 把路由配置导出到main.js

// 以下做一些路由的控制跳转

/*console.log(this.$store.state.app.menuList);*/
router.beforeEach((to,from,next)=>{
	 if (!Cookies.get('user_name') && to.name !== 'login') { // 判断是否已经登录且前往的页面不是登录页
            next({
                name: 'login'
            });
        } else if (Cookies.get('user_name') && to.name === 'login') { // 判断是否已经登录且前往的是登录页
            next({
                name: '/'
            });
        } else {
            next();
        }
})



