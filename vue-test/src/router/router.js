import Main from 'base/Main.vue';
import Login from 'base/page/login.vue';
import otherpage from 'components/skgl/list.vue'
export const loginRouter = {
	path: '/login',
	name: 'login',
	meta: {
		title: 'Login-登陆'
	},
	component: Login
}
export const otherRouter = {
	path: '/',
	name: 'otherRouter',
	redirect:'/notice/list',
	component: Main,
	children: [{
		path: 'list',
		title: '公告管理',
		name: 'list',
		component: resolve => {
			require(['components/notice/list.vue'], resolve);
		}
	}]
};
// 以下是登陆之后看到的路由页面

export const appRouter = [{
		path: '/skgl',
		icon: "icon-sitemap",
		name: 'skgl',
		title: '上刊管理',
		owner: "1,2,3",
		
		component: Main,
		children: [{
				path: 'add',
				title: '新增上刊',
				meta: {
					title: '新增上刊'
				},
				name: '/skgl/add',
				component: resolve => {
					require(['components/skgl/add.vue'], resolve);
				}
			},
			{
				path: 'list',
				title: '上刊列表',
				meta: {
					title: '上刊列表'
				},
				name: 'list',
				component: resolve => {
					require(['components/skgl/list.vue'], resolve);
				}
			}
		]
	},
	{
		path: '/end',
		icon: "icon-briefcase",
		name: 'end',
        
		owner: "3,4",
		title: '终端管理',
		component: Main,
		children: [{
				path: 'list',
				title: '终端列表',
				name: 'list',
				meta: {
					title: '终端列表'
				},
				component: resolve => {
					require(['components/end/list.vue'], resolve);
				}
			},
			{
				path: 'err',
				title: '异常终端',
				name: 'err',
				meta: {
					title: '异常终端'
				},
				component: resolve => {
					require(['components/end/error.vue'], resolve);
				}
			}
		]
	},
	{
		path: '/app',
		icon: "icon-cogs",
		
		name: 'app',
		owner: "3,4",
		title: 'App管理',
		component: Main,
		children: [{
				path: 'operation',
				title: '指令管理',
				name: 'operation',
				meta: {
					title: '指令管理'
				},
				component: resolve => {
					require(['components/pzgl/operation/list.vue'], resolve);
				}
			},
			{
				path: 'update',
				title: '更新管理',
				name: 'update',
				meta: {
					title: '更新管理'
				},
				component: resolve => {
					require(['components/pzgl/app_update/list.vue'], resolve);
				}
			}
		]
	},
	{
		path: '/notice',
		icon: 'icon-bullhorn',
		name: 'notice',
		owner: "1,2,3,4",
		
		title: '公告管理',
		component: Main,
		type: '0',
		children: [{
			path: 'list',
			title: '公告管理',
			name: 'list',
			meta: {
				title: '公告管理'
			},
			component: resolve => {
				require(['components/notice/list.vue'], resolve);
			}
		}]
	},
	{
		path: '/user',
		icon: 'icon-user',
		
		name: 'user',
		owner: "3",
		title: '用户管理',
		component: Main,
		type: '0',
		children: [{
			path: 'list',
			title: '用户管理',
			meta: {
				title: '用户管理'
			},
			name: 'list',
			component: resolve => {
				require(['components/user/list.vue'], resolve);
			}
		}]
	}
]

export const routers = [
	loginRouter,
	otherRouter,
	...appRouter
]