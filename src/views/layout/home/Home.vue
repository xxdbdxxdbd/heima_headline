<template>
	<div class="home">
		<!-- 导航区域 -->
		<van-nav-bar class="home_nav" title="标题">
			<template #title>
				<van-button class="home_nav_button" icon-prefix="iconfont" icon="sousuo" round size="small"
					to="/search">搜索
				</van-button>
			</template>
		</van-nav-bar>
		<!-- 列表区域 -->
		<van-tabs class="home_tabs" v-model="active">
			<van-tab :title="item.name" v-for="(item, index) in userChannelsList" :key="item.id">
				<article-list :channel="item"></article-list>
			</van-tab>
			<template #nav-right>
				<div class="nav-placeholder"></div>
			</template>
		</van-tabs>
		<!-- 汉堡区域 -->
		<div class="ham" @click="showPopup = true">
			<van-icon name="wap-nav" />
		</div>
		<!-- 频道弹出层区域 -->
		<van-popup class="pop" v-model="showPopup" closeable close-icon-position="top-left" position="bottom">
			<channel-edit :user-channels-list="userChannelsList" :active-index="active" @close-popup="showPopup = false"
				@turn-channel="active = $event"></channel-edit>
		</van-popup>
	</div>
</template>

<script>
	import {
		getUserChannels
	} from '@/api/api.js'
	import ChannelEdit from '@/components/homeCom/ChannelEdit.vue'
	import ArticleList from '@/components/homeCom/ArticleList.vue'
	import {
		mapState
	} from 'vuex'
	import {
		getItem
	} from '@/utils/storage.js'

	export default {
		name: 'Home',
		data() {
			return {
				userChannelsList: [],
				active: 0,
				showPopup: false
			}
		},
		components: {
			'channel-edit': ChannelEdit,
			'article-list': ArticleList
		},
		created() {
			this.getUserChannelsList()
		},
		computed: {
			...mapState(['x_user'])
		},
		methods: {
			/**
			 * 获取用户频道列表
			 */
			async getUserChannelsList() {
				let channels = []
				if (this.x_user) {
					// 如果已登录
					const {
						data
					} = await getUserChannels()
					console.log(data)
					channels = data.data.channels
				} else {
					// 如果未登录
					const local_channels = getItem('user_channelsList')
					if (local_channels) {
						// 如果vuex有数据
						channels = local_channels
					} else {
						// 如果vuex没有数据
						const {
							data
						} = await getUserChannels()
						// console.log(data)
						channels = data.data.channels
					}
				}
				this.userChannelsList = channels
			}
		}
	}
</script>

<style lang="less" scoped>
	.home {

		// 导航区域
		.home_nav {
			background-color: orangered;

			/deep/ .van-nav-bar__title {
				max-width: none;
			}

			.home_nav_button {
				width: 275px;
				height: 35px;
				border: none;
				color: #ffffff;
				background-color: coral;

				.van-button__icon {
					font-size: 18px;
				}

				.van-button__text {
					font-size: 18px;
				}
			}
		}

		// 列表区域
		.home_tabs {
			/deep/ .van-tabs__nav--complete {
				padding: 0;
			}

			/deep/ .van-tab {
				width: 104px;
				border: 1px solid #eeeeee;
			}

			/deep/ .van-tab__text {
				font-size: 16px;
			}

			/deep/ .van-tabs__line {
				bottom: 7px;
				width: 15px;
				background-color: orangered;
			}

			.nav-placeholder {
				flex-shrink: 0;
				width: 40px;
				// border: 1px solid red;
			}
		}

		.ham {
			position: fixed;
			top: 46px;
			right: 0;
			width: 40px;
			text-align: center;
			line-height: 49px;
			background-color: #ffffff;
			opacity: 0.9;
			// border: 1px solid red;

			&:before {
				content: '';
				width: 1px;
				height: 30px;
				background: gray;
				background-size: contain;
				position: absolute;
				left: 0;
				top: 6px;
			}
		}

		// 频道弹出层
		.pop {
			height: 100%;
		}
	}
</style>
