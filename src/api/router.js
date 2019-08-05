import request from '@/utils/request'

export function getRoutersData(params) {
    return request({
      	url: '/api/sys/menu/authed',
      	method: 'get',
      	headers: {
        	'Content-Type': 'application/json'
      	}
    })
}
export function setRoutersData(params) {
  return localStorage.setItem('test-routers',JSON.stringify(params))
}
