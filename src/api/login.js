import request from '@/utils/request'

export function login(username, password) {
  	return request({
    	url: '/auth/login',
    	method: 'post',
    	data: {
      	  	username: username,
      	  	password: password
    	},
    	headers: {
      	  	'Content-Type': 'application/json'
    	}
  	})
}

export function logout() {
  	return request({
    	url: '/user/logout',
    	method: 'post'
  	})
}
