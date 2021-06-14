<template>
	<div class="my">
		<van-cell-group class="my_cell_group" v-if="x_user">
			<!-- 头部区域 -->
			<van-cell class="my_cell" :border="false" center>
				<template #icon>
					<van-image class="my_cell_image" :src="user.photo" round fit="cover" />
				</template>
				<template #title>
					<div class="my_cell_title">{{user.name}}</div>
				</template>
				<van-button class="my_cell_button" type="default" round @click="goUser">编辑资料</van-button>
			</van-cell>
			<!-- 数据区域 -->
			<van-grid class="my_data" :border="false">
				<van-grid-item class="my_data_item">
					<div class="my_data_item_slot">
						<div class="my_data_item_number">{{user.art_count}}</div>
						<div class="my_data_item_word">头条</div>
					</div>
				</van-grid-item>
				<van-grid-item class="my_data_item">
					<div class="my_data_item_slot">
						<div class="my_data_item_number">{{user.follow_count}}</div>
						<div class="my_data_item_word">关注</div>
					</div>
				</van-grid-item>
				<van-grid-item class="my_data_item">
					<div class="my_data_item_slot">
						<div class="my_data_item_number">{{user.fans_count}}</div>
						<div class="my_data_item_word">粉丝</div>
					</div>
				</van-grid-item>
				<van-grid-item class="my_data_item">
					<div class="my_data_item_slot">
						<div class="my_data_item_number">{{user.like_count}}</div>
						<div class="my_data_item_word">获赞</div>
					</div>
				</van-grid-item>
			</van-grid>
		</van-cell-group>
		<!-- 头部区域（未登录） -->
		<div class="no_login" v-else @click="goLogin">
			<div>
				<van-image class="no_login_image" src="https://img01.yzcdn.cn/vant/cat.jpeg" round fit="cover" />
			</div>
			<div class="no_login_text">
				登录 / 注册
			</div>
		</div>
		<!-- 收藏历史区域 -->
		<van-grid class="my_his" :column-num="2" :border="false">
			<van-grid-item class="my_his_item">
				<van-icon name="star-o" />
				<span>收藏</span>
			</van-grid-item>
			<van-grid-item class="my_his_item">
				<van-icon name="clock-o" />
				<span>历史</span>
			</van-grid-item>
		</van-grid>
		<!-- 消息通知单元格区域 -->
		<van-cell class="my_message" title="消息通知" is-link to="/" center />
		<!-- 小智同学单元格区域 -->
		<van-cell class="my_xiaozhi" title="小智同学" :border="false" is-link center />
		<!-- 退出登录单元格区域 -->
		<van-cell class="my_exit" title="退出登录" v-if="x_user" @click="logout" center />
	</div>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	import {
		getUser
	} from '@/api/api.js'

	export default {
		name: 'My',
		data() {
			return {
				// 用户信息
				user: {}
			}
		},
		created() {
			this.getUser()
		},
		computed: {
			...mapState(['x_user'])
		},
		methods: {
			/**
			 * 获取用户自己信息
			 */
			async getUser() {
				if (this.x_user) {
					const {
						data
					} = await getUser()
					console.log(data)
					this.user = data.data
				}
			},

			/**
			 * 退出登录
			 */
			logout() {
				this.$dialog.confirm({
						title: '提示信息',
						message: '是否退出登录？',
					})
					.then(() => {
						// on confirm
						this.$store.commit('setUser', null)
					})
					.catch(() => {
						// on cancel
					});
			},

			/**
			 * 跳转用户个人资料页面
			 */
			goUser() {
				this.$router.push('/user/userProfile')
			},

			/**
			 * 跳转登录页面
			 */
			goLogin() {
				this.$router.push({
					name: 'login',
					query: {
						returnURL: '/my'
					}
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.my {
		.my_cell_group {
			background-color: coral;

			.van-cell {
				background-color: unset;
			}

			// 头部区域
			.my_cell {
				height: 120px;

				.my_cell_image {
					width: 70px;
					height: 70px;
					border: 1px solid #ffffff;
				}

				.my_cell_title {
					margin-left: 12px;
					font-size: 16px;
					color: #ffffff;
				}

				.van-cell__value {
					line-height: 0;
				}

				.my_cell_button {
					height: 30px;
					color: #666666;
				}
			}

			// 数据区域
			.my_data {
				height: 60px;

				.my_data_item {
					/deep/ .van-grid-item__content {
						padding: 0;
						background-color: unset;
					}

					.my_data_item_slot {
						display: flex;
						flex-direction: column;
						align-items: center;

						.my_data_item_number {
							font-size: 18px;
							color: #ffffff;
						}

						.my_data_item_word {
							font-size: 14px;
							color: #ffffff;
						}
					}
				}
			}
		}

		// 头部区域（未登录）
		.no_login {
			height: 180px;
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;
			background-color: coral;

			.no_login_image {
				width: 70px;
				height: 70px;
				border: 1px solid #ffffff;
			}

			.no_login_text {
				font-size: 15px;
				color: #ffffff;
			}
		}

		// 收藏历史区域
		.my_his {
			height: 70px;

			.my_his_item {
				/deep/ .van-grid-item__content {
					padding: 0;
				}

				.van-icon {
					color: orangered;
					margin: 2px 0;
				}

				span {
					font-size: 16px;
				}
			}
		}

		// 消息通知单元格区域
		.my_message {
			margin-top: 5px;
			height: 50px;
		}

		// 小智同学单元格区域
		.my_xiaozhi {
			height: 50px;
		}

		// 退出登录单元格区域
		.my_exit {
			margin-top: 5px;
			height: 50px;
			line-height: 50px;
			padding: 0;
			color: red;
			text-align: center;
		}
	}
</style>
