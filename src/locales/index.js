import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

const DEFAULT_LANG = 'zh'
const LOCALE_KEY = 'AplLocaleLanguage'

const otherI18nFiles = ['business']
let zhjson = require('./zh.json')
let enjson = require('./en.json')
for(let index = 0; index < otherI18nFiles.length; index++){
	let file = otherI18nFiles[index]
	let otherZhJson = require('./zh_' + file + '.json')
	let otherEnJson = require('./en_' + file + '.json')
	zhjson = Object.assign(zhjson, otherZhJson)
	enjson = Object.assign(enjson, otherEnJson)
}

const locales = {
	//zh: require('./zh.json'),
	//en: require('./en.json')
	zh: zhjson,
	en: enjson
}

const i18n = new VueI18n({
	locale: DEFAULT_LANG,
	messages : locales,
})

export const setup = lang => {
	if(lang == undefined){
		lang = window.localStorage.getItem(LOCALE_KEY)
		if ( locales[lang] == undefined ) {
			lang = DEFAULT_LANG
		}
	}
	window.localStorage.setItem(LOCALE_KEY, lang)
	
	Object.keys(locales).forEach(lang => {
		document.body.classList.remove('lang-${lang}')
	})
	document.body.classList.add('lang-${lang}')
	document.body.setAttribute('lang', lang)
	
	Vue.config.lang = lang
	i18n.locale = lang
}

setup()
export default i18n