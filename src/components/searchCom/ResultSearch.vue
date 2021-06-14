<template>
	<div class="result_search">
		<van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
			<van-cell v-for="(item, index) in searchList" :key="index" :title="item.title" @click="goArticle(item)" />
		</van-list>
	</div>
</template>

<script>
	import {
		getSearch
	} from '@/api/api.js'

	export default {
		name: 'ResultSearch',
		props: {
			searchContent: {
				type: String,
				required: true
			}
		},
		data() {
			return {
				searchList: [],
				loading: false,
				finished: false,
				page: 1,
				per_page: 10,
				q: ''
			}
		},
		methods: {
			async onLoad() {
				const {
					data
				} = await getSearch({
					page: this.page,
					per_page: this.per_page,
					q: this.searchContent
				})
				console.log(data)
				const {
					results
				} = data.data
				this.searchList.push(...results)
				this.loading = false
				if (results.length) {
					this.page++
				} else {
					this.finished = true
				}
			},

			/**
			 * 跳转到文章详情
			 */
			goArticle(item) {
				this.$router.push(`/article/${item.art_id}`)
			}
		}
	}
</script>

<style lang="less" scoped>
	.result_search {
		position: fixed;
		left: 0;
		top: 55px;
		right: 0;
		bottom: 0;
		overflow: auto;
	}
</style>
