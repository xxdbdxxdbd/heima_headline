import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'

// 导入app.js
import '@/utils/appBack.js'

// 导入vant
import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);

// 导入amfe-flexible
import 'amfe-flexible'

// 导入全局样式
import '@/styles/index.less'

// 导入format
import '@/utils/time_format.js'

Vue.config.productionTip = false

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')
