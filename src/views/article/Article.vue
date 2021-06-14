<template>
	<div class="article">
		<!-- 导航区域 -->
		<van-nav-bar left-arrow @click-left="onClickLeft">
		</van-nav-bar>
		<!-- 文章区域 -->
		<div class="article_wrap">
			<!-- 标题区域 -->
			<h4 class="main_title">{{articleObj.title}}</h4>
			<!-- 作者区域 -->
			<van-cell center class="author">
				<template #icon>
					<van-image round :src="articleObj.aut_photo" />
				</template>
				<template #title>
					<div class="user_title">
						<div>{{articleObj.aut_name}}</div>
						<div>{{articleObj.pubdate | relativeTime}}</div>
					</div>
				</template>
				<template>
					<van-button round type="info" :icon="articleObj.is_followed ? '' : 'plus'" @click="onFollow"
						:loading="isFollowLoading">
						{{articleObj.is_followed ? '已关注' : '关注'}}
					</van-button>
				</template>
			</van-cell>
			<!-- 详情区域 -->
			<div class="markdown-body" v-html="articleObj.content" ref="contentRef">

			</div>
			<!-- 评论列表区域 -->
			<comment-list type="c" :source="articleId" :comment-list="list" @total_count="totalCount = $event"
				@comment-reply="commentReply">
			</comment-list>
		</div>
		<!-- 底部区域 -->
		<div class="footer">
			<van-button type="default" round plain @click="showPopupComment = true">写评论</van-button>
			<van-icon name="chat-o" :badge="totalCount" />
			<van-icon :name="articleObj.is_collected ? 'star' : 'star-o'" :color="articleObj.is_collected ? 'red' : ''"
				@click="onCollections" />
			<van-icon :name="articleObj.attitude === 1 ? 'good-job' : 'good-job-o'"
				:color="articleObj.attitude === 1 ? 'red' : ''" @click="onLikings" />
			<van-icon name="share" @click="shareSystem" />
		</div>
		<!-- 评论弹出层区域 -->
		<van-popup v-model="showPopupComment" position="bottom">
			<popup-comment :target="articleId" @post-comments="postComments"></popup-comment>
		</van-popup>
		<!-- 评论回复弹出层区域 -->
		<van-popup v-model="showPopupCommentReply" position="bottom">
			<popup-comment-reply v-if="showPopupCommentReply" :comment-reply-obj="commentReplyObj"
				:article-id="articleId" @close="showPopupCommentReply = false"></popup-comment-reply>
		</van-popup>
	</div>
</template>

<script>
	import {
		getArticleById,
		postFollowings,
		deleteFollowings,
		postCollections,
		deleteCollections,
		postLikings,
		deleteLikings
	} from '@/api/api.js'
	import '@/styles/github-markdown.css'
	import {
		ImagePreview
	} from 'vant'
	import {
		mapState
	} from 'vuex'

	import CommentList from '@/components/articleCom/CommentList.vue'
	import PopupComment from '@/components/articleCom/PopupComment.vue'
	import PopupCommentReply from '@/components/articleCom/PopupCommentReply.vue'

	export default {
		name: 'Article',
		props: {
			articleId: {
				type: [Number, String, Object],
				required: true
			}
		},
		components: {
			'comment-list': CommentList,
			'popup-comment': PopupComment,
			'popup-comment-reply': PopupCommentReply
		},
		data() {
			return {
				articleObj: {},
				isFollowLoading: false,
				showPopupComment: false,
				list: [],
				totalCount: '',
				// 评论回复弹出层flag
				showPopupCommentReply: false,
				commentReplyObj: null
			}
		},
		created() {
			// console.log(this.articleId)
			this.getArticle()
		},
		computed: {
			...mapState(['x_user'])
		},
		methods: {
			/**
			 * 获取新闻文章详情
			 */
			async getArticle() {
				const {
					data
				} = await getArticleById(this.articleId.toString())
				console.log(data)
				this.articleObj = data.data
				this.$nextTick(() => {
					this.handleImagePreview()
				})
			},

			/**
			 * 返回箭头
			 */
			onClickLeft() {
				this.$router.back()
			},

			/**
			 * 图片预览
			 */
			handleImagePreview() {
				const article = this.$refs.contentRef
				const imgs = article.querySelectorAll('img')
				const imgPathList = []
				imgs.forEach((item, index) => {
					imgPathList.push(item.src)
					item.onclick = () => {
						ImagePreview({
							images: imgPathList,
							startPosition: index,
						})
					}
				})
			},

			/**
			 * 点击关注图标
			 */
			async onFollow() {
				this.$toast.loading({
					message: '操作中。。。',
					forbidClick: true
				})
				this.isFollowLoading = true
				if (this.articleObj.is_followed) {
					await deleteFollowings(this.articleObj.aut_id)
				} else {
					await postFollowings(this.articleObj.aut_id)
				}
				this.isFollowLoading = false
				if (this.x_user) {
					this.articleObj.is_followed = !this.articleObj.is_followed
					this.$toast.success('关注成功')
				}
			},

			/**
			 * 点击收藏图标
			 */
			async onCollections() {
				this.$toast.loading({
					message: '操作中。。。',
					forbidClick: true
				})
				if (this.articleObj.is_collected) {
					console.log(this.articleObj.art_id)
					const data = await deleteCollections(this.articleObj.art_id)
					// console.log(data)
				} else {
					console.log(this.articleObj.art_id)
					const data = await postCollections(this.articleObj.art_id)
					// console.log(data)
				}
				if (this.x_user) {
					this.articleObj.is_collected = !this.articleObj.is_collected
					this.$toast.success(`${this.articleObj.is_collected ? '收藏成功' : '取消收藏'}`)
				}
			},

			/**
			 * 点击点赞图标
			 */
			async onLikings() {
				this.$toast.loading({
					message: '操作中。。。',
					forbidClick: true
				})
				if (this.articleObj.attitude === 1) {
					const data = await deleteLikings(this.articleObj.art_id)
					// console.log(data)
					if (this.x_user) {
						this.articleObj.attitude = -1
						this.$toast.success('取消点赞')
					}
				} else {
					const data = await postLikings(this.articleObj.art_id)
					// console.log(data)
					if (this.x_user) {
						this.articleObj.attitude = 1
						this.$toast.success('点赞成功')
					}
				}
			},
			
			/**
			 * 点击分享图标
			 */
			shareSystem() {
				plus.share.sendWithSystem({
					type: 'text',
					content: `${this.articleObj.title}`,
					href: 'http://www.dcloud.io/'
				}, function() {
					console.log('分享成功')
				}, function(e) {
					console.log('分享失败：' + JSON.stringify(e))
				})
			},

			/**
			 * postComments
			 */
			postComments(data) {
				// console.log(data)
				this.list.unshift(data)
				this.totalCount++
				this.showPopupComment = false
			},

			/**
			 * 点击评论回复
			 */
			commentReply(data) {
				// console.log(data)
				this.commentReplyObj = data
				this.showPopupCommentReply = true
			}
		}
	}
</script>

<style lang="less" scoped>
	.article {
		.van-nav-bar {
			background-color: orangered;

			/deep/ .van-icon {
				color: #ffffff;
			}
		}

		.article_wrap {
			position: fixed;
			left: 0;
			top: 46px;
			right: 0;
			bottom: 60px;
			overflow: auto;

			// 标题区域 
			.main_title {
				margin: 0;
				padding: 20px 10px;
				background-color: #ffffff;
			}

			// 作者区域
			.author {
				.van-image--round {
					width: 50px;
					height: 50px;
				}

				.user_title {
					margin-left: 10px;
					display: flex;
					flex-direction: column;
				}

				.van-button {
					width: 85px;
					height: 30px;
				}
			}

			// 详情区域
			.markdown-body {
				padding: 20px;
				background-color: #ffffff;
			}
		}

		// 底部区域
		.footer {
			padding: 8px 0;
			position: fixed;
			left: 0;
			right: 0;
			bottom: 0;
			display: flex;
			justify-content: space-around;
			align-items: center;
			background-color: #ffffff;
			border-top: 1px solid #eeeeee;

			// border: 1px solid red;
			.van-button {
				width: 140px;
			}
		}
	}
</style>
