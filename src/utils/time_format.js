import Vue from 'vue'
import dayjs from 'dayjs'

import 'dayjs/locale/zh-cn'
dayjs.locale('zh-cn')

import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

Vue.filter('dateTime', (value, format = 'YYYY-MM-DD hh:mm:ss')  => {
	return dayjs(value).format(format)
})

Vue.filter('relativeTime', value => {
	return dayjs(value).from(dayjs())
})
