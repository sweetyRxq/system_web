import Vue from 'vue'

import 'normalize.css/normalize.css'// A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import router from './router'
import store from './store'

import '@/icons' // icon
import '@/permission'
import i18n from './locales'



Vue.use(ElementUI, { locale })
window.joint = require('jointjs');
window.uuidv1 = require('uuid/v1');

window.Vue = new Vue({
  el: '#app',
  router,
  store,
  i18n, // MultiLanguage
  render: h => h(App)
})
