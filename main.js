import Vue from 'vue'
import App from './App'
import store from './store/index.js'
import validate from './js_sdk/fshjie-formvalidate/ys-validate.js'
Vue.config.productionTip = false
Vue.prototype.$validate = validate
Vue.prototype.$store = store
App.mpType = 'app'

const app = new Vue({
    ...App,
	store
})
app.$mount()
