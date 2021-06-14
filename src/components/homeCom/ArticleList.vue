<template>
	<div class="article_list" ref="articleListRef">
		<van-pull-refresh v-model="isPullRefreshLoading" :success-text="successText" @refresh="onRefresh"
			success-duration="1000">
			<van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
				<article-list-item v-for="(item, index) in articleList" :key="index" :data="item"></article-list-item>
			</van-list>
		</van-pull-refresh>
	</div>
</template>

<script>
	import {
		getArticles
	} from '@/api/api.js'
	import {
		debounce
	} from 'lodash'

	import ArticleListItem from '@/components/homeCom/ArticleListItem.vue'

	export default {
		name: 'ArticleList',
		props: {
			channel: {
				type: Object,
				required: true
			}
		},
		components: {
			'article-list-item': ArticleListItem
		},
		data() {
			return {
				articleList: [],
				loading: false,
				finished: false,
				timestamp: null,
				isPullRefreshLoading: false,
				// 下拉刷新成功提示文案
				successText: '',
				scrollNumber: 0
			}
		},
		created() {

		},
		mounted() {
			const articleList = this.$refs.articleListRef
			articleList.onscroll = debounce(() => {
				// console.log(articleList.scrollTop)
				this.scrollNumber = articleList.scrollTop
			}, 50)
		},
		activated() {
			this.$refs.articleListRef.scrollTop = this.scrollNumber
		},
		methods: {
			/**
			 * onLoad事件
			 */
			async onLoad() {
				// console.log('onLoad')
				const {
					data
				} = await getArticles({
					channel_id: this.channel.id,
					timestamp: this.timestamp || Date.now(),
					with_top: 1
				})
				console.log(data)
				this.articleList.push(...data.data.results)
				this.loading = false
				if (data.data.results.length) {
					this.timestamp = data.data.pre_timestamp
				} else {
					this.finished = true
				}
			},
			/**
			 * onRefresh事件
			 */
			async onRefresh() {
				// console.log('onRefresh')
				const {
					data
				} = await getArticles({
					channel_id: this.channel.id,
					timestamp: Date.now(),
					with_top: 1
				})
				this.articleList.unshift(...data.data.results)
				this.successText = `刷新成功，共更新${data.data.results.length}条数据`
				this.isPullRefreshLoading = false
			}
		}
	}
</script>

<style lang="less" scoped>
	.article_list {
		position: fixed;
		left: 0;
		top: 90px;
		right: 0;
		bottom: 50px;
		overflow: auto;
	}
</style>
