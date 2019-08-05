
import Layout from '../views/layout/Layout'

export default function handleRouter(menus) {
  	const routerList = []
	if(!menus) return routerList;
  	for (let i = 0; i < menus.length; i++) {
        const routerItem = {
          	path: formatRouterPath(menus[i].url),
          	component: Layout,
          	redirect: formatRouterPath(menus[i].url),
          	name: menus[i].name,
          	meta: {
            	icon: menus[i].icon ? menus[i].icon : "eye",
            	title: menus[i].name,
          	},
          	isDynamic:true,
          	children: []
        }
		if ( menus[i].children.length > 0 ) {
			for (let j = 0; j < menus[i].children.length; j++) {
	            let component = menus[i].children[j].params
	            const childItem = {
	              	path: formatRouterPath(menus[i].children[j].url),
	              	component: () => import('@/' + component),
	              	// redirect: menus[i].children[j].url,
	              	name: menus[i].children[j].name,
	              	meta: {
	                	icon: menus[i].children[j].icon,
	                	title: menus[i].children[j].name
	              	}
	            }
				routerItem.children.push(childItem)
			}
		}else{
	        const topChild = {
	          path: '',
	          name: '',
	          meta: {
	            icon: menus[i].icon ? menus[i].icon : "eye",
	            title: menus[i].name,
	            address: menus[i].params
	          },
	          component: () => import('@/' + menus[i].params)
	        }
			routerItem.children.push(topChild)
		}
		routerList.push(routerItem)
  	}
	console.log(routerList)
  	return routerList
}

function formatRouterPath(path){
	if(path) return path
	return ""
}
