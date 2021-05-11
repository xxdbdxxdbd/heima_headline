import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 导入全局样式
// import './styles/index.less'

// 导入vant
import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);

// 导入amfe-flexible
import 'amfe-flexible'

Vue.config.productionTip = false

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')
