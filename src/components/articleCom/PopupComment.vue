<template>
	<div class="popupComment">
		<van-field v-model="commentMessage" rows="2" type="textarea" maxlength="50" placeholder="请输入留言"
			show-word-limit />
		<van-button size="small" @click="onPost">发布</van-button>
	</div>
</template>

<script>
	import {
		postComments
	} from '@/api/api.js'

	export default {
		name: 'PopupComment',
		props: {
			target: {
				type: [Number, String, Object],
				required: true
			},
			art_id: {
				type: [Number, String, Object],
				default: null
			}
		},
		data() {
			return {
				commentMessage: ''
			}
		},
		created() {

		},
		methods: {
			/**
			 * 发布按钮
			 */
			async onPost() {
				this.$toast.loading({
					message: '发布中',
					forbidClick: true
				})
				const {
					data
				} = await postComments({
					target: this.target.toString(),
					content: this.commentMessage,
					art_id: this.art_id ? this.art_id.toString() : null
				})
				// console.log(data)
				this.$emit('post-comments', data.data.new_obj)
				this.$toast.success('发布成功')
			}
		}
	}
</script>

<style lang="less" scoped>
	.popupComment {
		display: flex;
		align-items: center;

		.van-button {
			width: 80px;
		}
	}
</style>
