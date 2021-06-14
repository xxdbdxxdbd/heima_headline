<template>
	<div class="popup_comment_reply">
		<!-- 导航区域 -->
		<van-nav-bar :title="`${commentReplyObj.reply_count}条回复`" left-text="返回">
			<template #left>
				<van-icon name="cross" @click="close" />
			</template>
		</van-nav-bar>
		<!-- 主评论区域 -->
		<comment-list-item :data="commentReplyObj"></comment-list-item>
		<!-- 评论回复列表区域 -->
		<comment-list type="c" :source="commentReplyObj.com_id" :comment-list="list"></comment-list>
		<!-- 底部区域 -->
		<div class="footer">
			<van-button type="default" round plain @click="showPopupComment = true">写评论</van-button>
		</div>
		<!-- 发布评论回复弹出层 -->
		<van-popup v-model="showPopupComment" position="bottom">
			<popup-comment :target="commentReplyObj.com_id.toString()" :art_id="articleId" @post-comments="postComments">
			</popup-comment>
		</van-popup>
	</div>
</template>

<script>
	import CommentListItem from '@/components/articleCom/CommentListItem.vue'
	import CommentList from '@/components/articleCom/CommentList.vue'
	import PopupComment from '@/components/articleCom/PopupComment.vue'
	
	export default {
		props: {
			commentReplyObj: {
				type: Object,
				required: true
			},
			articleId: {
				type: [Number, String, Object],
				required: true
			}
		},
		components: {
			'comment-list-item': CommentListItem,
			'comment-list': CommentList,
			'popup-comment': PopupComment
		},
		data() {
			return {
				// 发布评论回复弹出层flag
				showPopupComment: false,
				list: [],
				totalCount: 0
			}
		},
		created() {
			// console.log(this.commentReplyObj)
		},
		methods: {
			/**
			 * 点击关闭
			 */
			close() {
				this.$emit('close')
			},

			/**
			 * 发布评论回复
			 */
			postComments(data) {
				// console.log(data)
				this.list.unshift(data)
				this.commentReplyObj.reply_count++
				this.showPopupComment = false
			}
		}
	}
</script>

<style lang="less" scoped>
	.popup_comment_reply {
		.footer {
			position: fixed;
			left: 0;
			right: 0;
			bottom: 0;
			height: 40px;
			display: flex;
			justify-content: center;
			align-items: center;
			border-top: 1px solid #eeeeee;
			background-color: #ffffff;

			.van-button {
				margin: 0 auto;
				width: 200px;
				height: 30px;
			}
		}
	}
</style>
