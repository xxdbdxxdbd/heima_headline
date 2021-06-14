<template>
	<div class="suggest_search">
		<van-cell icon="search" v-for="(item, index) in suggestList" :key="index" @click="suggestEvent(item)">
			<template #title>
				<div v-html="highlight(item)"></div>
			</template>
		</van-cell>
	</div>
</template>

<script>
	import {
		getSuggest
	} from '@/api/api.js'
	import {
		debounce
	} from 'lodash'

	export default {
		name: 'SuggestSearch',
		props: {
			searchContent: {
				type: String,
				required: true
			}
		},
		data() {
			return {
				// 联想建议数据
				suggestList: []
			}
		},
		watch: {
			searchContent: {
				handler: debounce(async function() {
					const {
						data
					} = await getSuggest(this.searchContent)
					console.log(data)
					this.suggestList = data.data.options
				}, 300),
				immediate: true
			}
		},
		methods: {
			/**
			 * 联想建议
			 */
			suggestEvent(item) {
				this.$emit('suggest-event', item)
			},

			/**
			 * 高亮显示
			 */
			highlight(data) {
				return data.replace(new RegExp(this.searchContent, 'gi'),
					`<span style="color: red">${this.searchContent}</span>`)
			}
		}
	}
</script>

<style lang="less" scoped>
	.suggest_search {}
</style>
