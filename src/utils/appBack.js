import {
	Toast
} from 'vant'

/**
 * 解决hbuilder打包app之后点击手机返回键直接退出app的
 */
document.addEventListener('plusready', () => {
	var first = null
	var webview = plus.webview.currentWebview()
	plus.key.addEventListener('backbutton', () => {
		webview.canBack(e => {
			if (e.canBack) {
				webview.back() //这里不建议修改自己跳转的路径
			} else {
				//首次按键，提示‘再按一次退出应用’
				if (!first) {
					first = new Date().getTime() //获取第一次点击的时间戳
					Toast({
						message: '再按一次退出应用'
					})
					setTimeout(() => {
						first = null
					}, 1000)
				} else {
					if (new Date().getTime() - first <
						1000) { //获取第二次点击的时间戳, 两次之差小于1000ms说明1s点击了两次
						plus.runtime.quit() //退出应用
					}
				}
			}
		})
	})
})
