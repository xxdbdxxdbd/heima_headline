import Vue from 'vue'
import Vuex from 'vuex'
import {
	getItem,
	setItem
} from '@/utils/storage.js'

Vue.use(Vuex)

const user_key = 'login_user'

export default new Vuex.Store({
	state: {
		x_user: getItem(user_key),
		x_cachePage: ['Layout']
	},
	mutations: {
		setUser(state, data) {
			state.x_user = data
			setItem(user_key, state.x_user)
		},
		addCachePage(state, data) {
			if (!state.x_cachePage.includes(data)) {
				state.x_cachePage.push(data)
			}
		},
		removeCachePage(state, data) {
			const index = state.x_cachePage.indexOf(data)
			if (index !== -1) {
				state.x_cachePage.splice(index, 1)
			}
		}
	},
	actions: {},
	modules: {}
})
