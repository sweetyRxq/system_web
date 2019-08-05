import request from '@/utils/request'
import { Message, MessageBox } from 'element-ui'

/**
 *
 *  处理POST、PUT、DELETE的公共函数
 *  type	: 提交类型
 *  uri 	: 请求相对地址
 *  params 	: 请求参数（JSON格式）
 *  success	: 成功处理函数
 *  fail	: 失败处理函数
 *  error 	: 错误处理函数
 *
 **/
export function submitJson(type, uri, params, success, fail, error){
	let response = request({
    	url: uri,
    	method: type,
    	data: params,
    	headers: {
      	  'Content-Type': 'application/json'
    	}
  	})
	response.then(response => {
		handleResponse(response, success, fail)
	}).catch(()=>{
		if(error){ 
			error()
		}else{
			// Do nothing so far
		}
	})
}

export function postJson(uri, params, success, fail, error){
	submitJson('post', uri, params, success, fail, error)
}

export function putJson(uri, params, success, fail, error){
	submitJson('put', uri, params, success, fail, error)
}

export function deleteJson(uri, params, success, fail, error){
	submitJson('delete', uri, params, success, fail, error)
}

export function getJson(uri, params, success, fail, error){
	let response = request({
    	url: uri,
    	method: 'get',
    	params: params,
    	headers: {
      	  'Content-Type': 'application/json'
    	}
  	})
	response.then(response => {
		handleResponse(response, success, fail)
	}).catch(()=>{
		if(error){ 
			error()
		}else{
			// Do nothing so far
		}
	})
}

export function handleFailure(response){
	let statement = 'Unknown error'
	if(response.errors && response.errors.length > 0){
		statement = response.errors[0].statement
	}
  	Message({
    	message: statement,
    	type: 'error',
    	duration: 5 * 1000
  	})
}

function handleResponse(response, success, fail){
	if(response.retCode == '00' || response.retCode == '000'){
		if(success) success(response)
	}else{
		if(fail) {// 如果自定义失败函数则使用自定义函数
			fail(response)
		}else{
			// 如果没有自定义失败函数则通过消息的方式显示第一个错误信息
			handleFailure(response)
		}
	}
}