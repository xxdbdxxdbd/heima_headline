import axios from 'axios'
import
store
from '@/store/index.js'
import JSONbig from 'json-bigint'
import {
	Toast,
	Dialog
} from 'vant'
import router from '@/router/index.js'

const refreshTokenRequest = axios.create({
	baseURL: 'http://ttapi.research.itcast.cn'
})

const request = axios.create({
	baseURL: 'http://ttapi.research.itcast.cn',
	transformResponse: [data => {
		try {
			return JSONbig.parse(data)
		} catch (e) {
			//TODO handle the exception
			console.log(e)
			return data
		}
	}]
})

/**
 * 请求拦截器
 */
request.interceptors.request.use(config => {
	const {
		x_user
	} = store.state
	if (x_user) {
		config.headers.Authorization = `Bearer ${x_user.token}`
	}
	return config
}, error => {
	return Promise.reject(error)
})

/**
 * 拦截拦截器
 */
request.interceptors.response.use(config => {
	return config
}, async error => {
	// console.dir(error)
	const status = error.response.status
	if (status == 400) {
		// Toast.fail('400了')
	} else if (status === 401) {
		// Toast.fail('401了')
		const {
			x_user
		} = store.state
		if (!x_user || !x_user.token) {
			return redirectLogin()
		}
		try {
			const {
				data
			} = await refreshTokenRequest({
				method: 'PUT',
				url: '/app/v1_0/authorizations',
				headers: {
					Authorization: `Bearer ${x_user.refresh_token}`
				}
			})
			console.log(data)
			x_user.token = data.data.token
			store.commit('setUser', x_user)
			return request(error.config)
		} catch (e) {
			redirectLogin()
		}
	} else if (status === 403) {
		// Toast.fail('403了')
	} else if (status >= 500) {
		// Toast.fail('500了')
	}
	return Promise.reject(error)
})

function redirectLogin() {
	Dialog.confirm({
			title: '此功能需要登录，是否登录'
		})
		.then(() => {
			router.replace({
				name: 'login',
				query: {
					returnURL: router.currentRoute.fullPath
				}
			})
		})
		.catch(() => {
			// on cancel
		})
}

export default request
