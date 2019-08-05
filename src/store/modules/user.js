import { login, logout, getInfo } from '@/api/login'
import { getRoutersData } from '@/api/router'
import { getToken, setToken, removeToken, getUserData, setUserData, removeUserData } from '@/utils/auth'

const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    routers: [],
    userData: {}
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROUTERS: (state, routers) => {
      state.routers = routers
    },
    SET_USERDATA: (state, userData) => {
        state.userData = userData
    }
  },

	actions: {
    	// 登录
    	Login({ commit }, userInfo) {
      	  	const username = userInfo.username.trim()
      	  	return new Promise((resolve, reject) => {
        		login(username, userInfo.password).then(response => {
					if(response.retCode == '00' || response.retCode == '000'){
        				setToken(response.retObject.token)
        				commit('SET_TOKEN', response.retObject.token)
                        setUserData(response.retObject.user)
                        commit('SET_USERDATA', response.retObject.user)
        				resolve()
					}else{
						reject(response.errors[0].statement)
					}
        		}).catch(error => {
        			reject(error)
        		})
      		})
    	},

    // 获取用户信息
    GetInfo({ commit, state }) {
      const info = getRoutersData()
        commit('SET_ROUTERS', info)
        commit('SET_USERDATA', getUserData())
      // this.$router.addRoutes(info)
      // console.log(this.$router)
      return info
    },

    // 登出
    LogOut({ commit, state }) {
      commit('SET_TOKEN', '')
      commit('SET_ROUTERS', [])
      removeToken()
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        commit('SET_USERDATA', null)
        removeUserData()
        resolve()
      })
    }
  }
}

export default user
