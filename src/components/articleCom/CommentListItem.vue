<template>
	<div class="comment-list-item">
		<van-cell>
			<template #icon>
				<van-image :src="data.aut_photo" />
			</template>
			<template #title>
				<div class="main">
					<div class="top">
						<div class="name">
							{{data.aut_name}}
						</div>
						<div class="good_wrap">
							<van-icon :name="data.is_liking ? 'good-job' : 'good-job-o'"
								:color="data.is_liking ? 'red' : ''" @click="onCommentsLikings" />
							<span>
								{{data.like_count}}
							</span>
						</div>
					</div>
					<div class="content">
						{{data.content}}
					</div>
					<div class="buttom">
						<div>
							{{data.pubdate | dateTime('MM-DD hh:mm')}}
						</div>
						<van-button type="default" round @click="openPopupCommentReply">
							{{data.reply_count}}回复
						</van-button>
					</div>
				</div>
			</template>
		</van-cell>
	</div>
</template>

<script>
	import {
		postCommentsLikings,
		deleteCommentsLikings
	} from '@/api/api.js'

	export default {
		name: 'CommentItem',
		props: {
			data: {
				type: Object,
				required: true
			}
		},
		data() {
			return {

			}
		},
		methods: {
			/**
			 * 点击点赞
			 */
			async onCommentsLikings() {
				const comId = this.data.com_id.toString()
				if (this.data.is_liking) {
					await deleteCommentsLikings(comId)
					this.data.like_count--
				} else {
					await postCommentsLikings(comId)
					this.data.like_count++
				}
				this.data.is_liking = !this.data.is_liking
			},

			/**
			 * 打开评论回复弹出层
			 */
			openPopupCommentReply() {
				// console.log(this.data)
				this.$emit('comment-reply', this.data)
			}
		}
	}
</script>

<style lang="less" scoped>
	.comment-list-item {
		/deep/ .van-image__img {
			width: 40px;
			height: 40px;
			border-radius: 50%;
		}

		.main {
			margin-left: 15px;

			.top {
				display: flex;
				justify-content: space-between;

				.name {
					font-size: 16px;
					color: orangered;
				}

				.good_wrap {
					display: flex;

					/deep/ .van-icon {
						font-size: 22px;
					}
				}
			}

			.content {
				padding: 6px 0;
				font-size: 24px;
			}

			.buttom {
				display: flex;

				.van-button {
					margin-left: 20px;
					width: 70px;
					height: 20px;
					background-color: #eeeeee;
				}
			}
		}

	}
</style>
