import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  	{ path: '/login', component: () => import('@/views/login/index'), hidden: true },
  	{ path: '/404', component: () => import('@/views/404'), hidden: true },
  	{
    	path: '/',
    	component: () => import('@/views/login/index'),
    	name: '',
    	hidden: true
  	},
  	{
    	path: '/home',
    	component: Layout,
    	redirect: '/home',
    	name: '首页',
    	meta: { title: '首页', icon: 'home' },
	  	hidden: true,
    	children: [
      	  	{
        	  	path: '',
        		name: '',
        		component: () => import('@/views/home/index'),
        		meta: { title: '首页', icon: 'call' }
      	  	}
    	]
  	}/*,
	{
		path: '/test',
		component: Layout,
		redirect: '/test',
		name: '测试',
		meta: {title: '测试', icon: 'user'},
		hidden: false,
		children: [
			{
				path: '/sysfunc',
				name: '功能',
				component: () => import('@/views/sysfunction/index'),
				meta: {title: '功能', icon: 'user'}
			}
		]
	}
	
  	{
    	path: '/application',
    	component: Layout,
    	redirect: '/application/sample',
    	name: '应用',
    	meta: { title: '应用', icon: 'form' },
    	hidden: true,
    	children: [
      	  	{
        		path: '/application/sample',
        		name: 'sample',
        		component: () => import('@/views/complain/index'),
        		meta: { title: '投诉管理', icon: 'call' },
      	  	}
    	]
  	},
  	{ path: '*', redirect: '/login', hidden: true }*/
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

