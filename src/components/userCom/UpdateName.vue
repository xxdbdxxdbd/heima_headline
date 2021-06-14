<template>
	<div class="update_name">
		<van-nav-bar left-text="取消" title="修改昵称" right-text="完成" @click-left="onClickLeft" @click-right="onClickRight">
		</van-nav-bar>
		<div class="field_wrap">
			<van-field v-model="newName" rows="2" autosize type="textarea" maxlength="7" placeholder="请输入昵称"
				show-word-limit />
		</div>
	</div>
</template>

<script>
	import {
		patchUserProfile
	} from '@/api/api.js'

	export default {
		name: 'UpdateName',
		props: {
			name: {
				type: String,
				required: true
			}
		},
		data() {
			return {
				newName: this.name
			}
		},
		created() {

		},
		methods: {
			onClickLeft() {
				this.$emit('close')
			},
			async onClickRight() {
				this.$toast.loading({
					message: '处理中...',
					forbidClick: true,
				})
				try {
					const data = await patchUserProfile({
							name: this.newName
						})
					console.log(data)
					this.$toast.success('修改昵称成功')
					this.$emit('name-success', this.newName)
					this.$emit('close')
				} catch (e) {
					// console.log(e)
					// console.log(e.response)
					if (e && e.response.status === 409) {
						this.$toast.fail('该用户名已被占用，请重新输入')
					}
				}
			}
		}
	}
</script>

<style lang="less" scoped>
	.update_name {
		.field_wrap {
			padding: 10px;

			/deep/ .van-field {
				padding: 10px;
			}
		}
	}
</style>
