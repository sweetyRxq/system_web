import router from './router'
import handleRouter from './router/handleRouter'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
import { Message } from 'element-ui'
import { getToken } from '@/utils/auth' // 验权

const whiteList = ['/login'] // 不重定向白名单
router.beforeEach((to, from, next) => {
	try{
  	console.log(to)
  	// console.log(from)
  	// console.log(next)
  	NProgress.start()
  	if (getToken()) {
    	if (to.path === '/login') {
      	  	next()
      	  	NProgress.done() // if current page is dashboard will not trigger	afterEach hook, so manually handle it
    	} else {
      	  	//console.log(to)
      	  	//next()
      	  	//NProgress.done()
	        if( !router.isNew ){
	          	store.dispatch('GetInfo').then(res => { // 拉取用户信息
	            	var handleRouterData = handleRouter(res.retObject)
	            	router.addRoutes(handleRouterData)
	            	handleRouterData.map((item) => {
	              	  	router.options.routes.push(item)
	            	})
	            	router.isNew = true
				
	            	next({ path: to.fullPath })
	          	}).catch((err) => {
	            	store.dispatch('FedLogOut').then(() => {
	              	  	Message.error(err || 'Verification failed, please login again')
	              	  	next({ path: '/login' })
	            	})
	          	})
	        } else {
	          	if( to.fullPath=='/firstLanding' ){
	            	//如果用户首次登陆，选择用户菜单权限中的第一个菜单，如果用户没有菜单权限，提示用户无权限
	            	let dynamicRouters = router.options.routes.filter( item => item.isDynamic)
	            	if( dynamicRouters.length > 0 ){
	              	  	for( var i=0; i<dynamicRouters.length; i++ ){
	                		let item = dynamicRouters[i]
	                		if( item.children.length>0 ){
	                  		  	next({ path: item.children[0].path == "" ? item.path : item.children[0].path })
	                  		  	return false
	                		} else {
	                  		  	next({ path: item.path })
	                  		  	return false
	                		}
	              	  	}
	            	} else {
	              	  	//Message.error(Vue.$t('no_permission'))
						Message.error('Without any permission now')
	              	  	next({ path: '/login' })
	              	  	NProgress.done()
	            	}
	          	} else {
	            	next()
	            	NProgress.done()
	          	}
	        }
    	}
  	} else {
    	if (whiteList.indexOf(to.path) !== -1) {
      	  	next()
    	} else {
      	  	next('/login')
      	  	NProgress.done()
    	}
  	}
	}catch(e){
		console.log(e)
	}
})

router.afterEach(() => {
	try{
  	NProgress.done() // 结束Progress
	}catch(e){
		console.log(e)
	}
})
