import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '../store'
import { getToken } from '@/utils/auth'

// 创建axios实例
const service = axios.create({
  	// baseURL: process.env.BASE_API, // api的base_url
  	baseURL: process.env.NODE_ENV === 'development' ? process.env.BASE_API : process.env.BASE_API,
  	timeout: 1000000000, // 请求超时时间
  	headers: {
    	//'Content-Type': 'application/x-www-form-urlencoded'
	  	'Content-Type': 'application/json'
  	}
})

// request拦截器
service.interceptors.request.use(config => {
  	if (store.getters.token) {
    	config.headers['X-Token'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
		config.headers['Authorization'] = "Bearer " + getToken() // Rest API的令牌
  	}
  	return config
}, error => {
  	// Do something with request error
  	console.log(error) // for debug
  	Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  	response => {
		return response.data
  	},
  	error => {
    	console.log('err' + error)// for debug
    	Message({
      	  	message: error.message,
      	  	type: 'error',
      	  	duration: 5 * 1000
    	})
    	return Promise.reject(error)
  	}
)

export default service
