import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'
const UserDataKey = 'Ares-UserData'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getUserData() {
  return JSON.parse(sessionStorage.getItem(UserDataKey))
}

export function setUserData(userData) {
  sessionStorage.setItem(UserDataKey, JSON.stringify(userData))
}

export function removeUserData() {
  sessionStorage.removeItem(UserDataKey)
}