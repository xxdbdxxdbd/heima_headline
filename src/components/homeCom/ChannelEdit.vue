<template>
	<div class="channel_edit">
		<!-- 我的频道 -->
		<van-cell :border="false" center>
			<template #title>
				<span class="span">我的频道</span>
			</template>
			<template>
				<van-button type="warning" size="mini" plain round @click="isEdit = !isEdit">{{ isEdit ? '完成' : '编辑' }}
				</van-button>
			</template>
		</van-cell>
		<van-grid :gutter="10">
			<van-grid-item :class="{ active : index === activeIndex }" v-for="(item, index) in userChannelsList"
				:key="index" :text="item.name" :icon="isEdit && index !== 0 ? 'clear' : ''"
				@click="onChannel(item, index)" />
		</van-grid>
		<!-- 频道推荐 -->
		<van-cell :border="false" center>
			<template #title>
				<span class="span">频道推荐</span>
			</template>
		</van-cell>
		<van-grid :gutter="10">
			<van-grid-item v-for="(item, index) in recommandChannelsList" :key="index" :text="item.name" icon="plus"
				@click="addChannel(item)" />
		</van-grid>
	</div>
</template>

<script>
	import {
		getChannels,
		patchUserChannels,
		deleteUserChannels
	} from '@/api/api.js'
	import {
		mapState
	} from 'vuex'
	import {
		setItem
	} from '@/utils/storage.js'

	export default {
		name: 'ChannelEdit',
		props: {
			userChannelsList: {
				type: Array,
				required: true
			},
			activeIndex: {
				type: Number,
				required: true
			}
		},
		data() {
			return {
				channelsList: [],
				isEdit: false
			}
		},
		created() {
			this.getChannels()
		},
		computed: {
			...mapState([
				'x_user'
			]),
			recommandChannelsList() {
				return this.channelsList.filter(data01 => {
					return !this.userChannelsList.find(data02 => {
						return data02.id === data01.id
					})
				})
			}
		},
		methods: {
			/**
			 * 获取全部频道列表
			 */
			async getChannels() {
				const {
					data
				} = await getChannels()
				// console.log(data)
				this.channelsList = data.data.channels
			},

			/**
			 * 添加频道
			 */
			async addChannel(data) {
				// console.log('addChannel')
				// console.log(data)
				this.userChannelsList.push(data)
				if (this.x_user) {
					await patchUserChannels({
						channels: [{
							id: data.id,
							seq: this.userChannelsList.length
						}]
					})
				} else {
					setItem('user_channels_list', this.userChannelsList)
				}
			},

			/**
			 * 点击频道
			 */
			onChannel(item, index) {
				if (this.isEdit === true && index !== 0) {
					this.deleteChannel(item, index)
				} else {
					this.switchChannel(index)
				}
			},

			/**
			 * 删除频道
			 */
			async deleteChannel(item, index) {
				if (index < this.activeIndex) {
					this.$emit('turnChannel', this.activeIndex - 1)
				}
				this.userChannelsList.splice(index, 1)
				if (this.x_user) {
					await deleteUserChannels(item.id)
				} else {
					setItem('user_channels_list', this.userChannelsList)
				}
			},

			/**
			 * 转到频道
			 */
			switchChannel(data) {
				// console.log('switchChannel')
				// console.log(data)
				this.$emit('close-popup')
				this.$emit('turn-channel', data)
			}
		}
	}
</script>

<style lang="less" scoped>
	.channel_edit {
		padding-top: 55px;

		.active {
			/deep/ .van-grid-item__text {
				color: orangered;
			}
		}

		.span {
			font-size: 16px;
		}

		.van-button {
			width: 50px;
		}

		.van-grid {
			margin: 10px 0;
		}

		/deep/ .van-grid-item__icon {
			position: absolute;
			top: -10px;
			right: 1px;
			width: 10px;
			height: 10px;
			font-size: 20px;
			color: #cccccc;
		}

		/deep/ .van-grid-item__content {
			width: 80px;
			height: 40px;
			border-radius: 10px;
			background-color: #f4f5f6;
		}

		/deep/ .van-grid-item__content--surround::after {
			border: none;
		}

		/deep/ .van-grid-item__text {
			margin-top: 0;
			font-size: 14px;
		}

		/deep/ .van-icon-plus {
			position: absolute;
			top: 4px;
			right: 5px;
			font-size: 12px;
			color: #000000;
		}
	}
</style>
