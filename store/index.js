import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
	state : {
		loginStatus : false,
		changeImg : "../../../static/我的.png",
	},
	mutations : {
		changeAvator(state,provider){
			console.log(state)
			console.log(provider)
			state.changeImg = provider
		}
	},
	actions : {
		getUserMsg () {
			uni.request({
				url: "http://localhost:5000/keep/users/test",
				method: "GET",
				header: {
					
				},
				success: (res) => {
					console.log(res)
				}
			})
		}
	}
})
export default store