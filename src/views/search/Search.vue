<template>
	<div class="search">
		<!-- 搜索栏 -->
		<form action="/">
			<van-search v-model="searchContent" show-action placeholder="请输入搜索关键词" @search="onSearch"
				@cancel="$router.back()" @focus="isResultSearch = false" />
		</form>
		<!-- 搜索结果 -->
		<result-search v-if="isResultSearch" :searchContent="searchContent"></result-search>
		<!-- 联想建议 -->
		<suggest-search v-else-if="searchContent" :search-content="searchContent" @suggest-event="onSearch">
		</suggest-search>
		<!-- 搜索历史 -->
		<history-search :history-search-list="historySearchList" @all_delete="historySearchList = $event" @history-event="onSearch" v-else></history-search>
	</div>
</template>

<script>
	import HistorySearch from '@/components/searchCom/HistorySearch.vue'
	import SuggestSearch from '@/components/searchCom/SuggestSearch.vue'
	import ResultSearch from '@/components/searchCom/ResultSearch.vue'
	import {
		getItem,
		setItem
	} from '@/utils/storage.js'
	import {
		mapState
	} from 'vuex'

	export default {
		name: 'Search',
		components: {
			'history-search': HistorySearch,
			'suggest-search': SuggestSearch,
			'result-search': ResultSearch
		},
		data() {
			return {
				// 搜索内容
				searchContent: '',
				// 联想建议
				isResultSearch: false,
				historySearchList: getItem('history_search_list') || []
			}
		},
		created() {

		},
		computed: {
			...mapState(['x_user'])
		},
		watch: {
			historySearchList() {
				setItem('history_search_list', this.historySearchList)
			}
		},
		methods: {
			/**
			 * 点击搜索
			 */
			onSearch(data) {
				console.log(data)
				const index = this.historySearchList.indexOf(data)
				if (index !== -1) {
					this.historySearchList.splice(index, 1)
				}
				this.historySearchList.unshift(data)
				this.isResultSearch = true
			}
		}
	}
</script>

<style lang="less" scoped>
	.search {}
</style>
