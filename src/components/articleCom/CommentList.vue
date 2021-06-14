<template>
	<div class="comment_list">
		<van-cell title="全部评论"></van-cell>
		<van-list v-model="loading" :finished="finished" finished-text="没有更多评论了" @load="onLoad">
			<comment-list-item v-for="(item, index) in commentList" :key="index" :data="item"
				@comment-reply="commentReply"></comment-list-item>
		</van-list>
	</div>
</template>

<script>
	import {
		getComments
	} from '@/api/api.js'
	import CommentListItem from '@/components/articleCom/CommentListItem.vue'

	export default {
		name: 'Comment',
		props: {
			type: {
				type: String,
				default: 'a'
			},
			source: {
				type: [Number, String, Object],
				required: true
			},
			commentList: {
				type: Array,
				default: () => []
			}
		},
		components: {
			'comment-list-item': CommentListItem
		},
		data() {
			return {
				loading: false,
				finished: false,
				offset: null,
				limit: 10
			}
		},
		created() {
			// console.log(this.type)
			// console.log(this.source)
		},
		methods: {
			async onLoad() {
				const {
					data
				} = await getComments({
					type: this.type,
					source: this.source.toString(),
					offset: this.offset,
					limit: this.limit
				})
				console.log(data)
				this.commentList.push(...data.data.results)
				this.loading = false
				if (data.data.results.length) {
					this.offset = data.data.last_id
				} else {
					this.finished = true
				}
				this.$emit('total_count', data.data.total_count)
			},

			/**
			 * 点击评论回复
			 */
			commentReply(data) {
				// console.log(data)
				this.$emit('comment-reply', data)
			}
		}
	}
</script>

<style lang="less" scoped>
	.comment_list {}
</style>
