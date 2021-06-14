<template>
	<div class="update_gender">
		<van-picker title="标题" show-toolbar :default-index="gender" :columns="columns" @confirm="onConfirm"
			@cancel="onCancel" @change="onChange" />
	</div>
</template>

<script>
	import {
		patchUserProfile
	} from '@/api/api.js'

	export default {
		name: 'UpdateGender',
		props: {
			gender: {
				type: Number,
				required: true
			}
		},
		data() {
			return {
				newGender: null,
				columns: ['男', '女']
			}
		},
		created() {
			// console.log(this.gender)
		},
		methods: {
			onCancel() {
				this.$emit('close')
			},
			async onConfirm() {
				this.$toast.loading({
					message: '处理中...',
					forbidClick: true,
				})
				const data = await patchUserProfile({
					gender: this.newGender
				})
				// console.log(data)
				this.$toast.success('修改性别成功')
				this.$emit('gender-success', this.newGender)
				this.$emit('close')
			},
			onChange(picker, value, index) {
				// console.log(picker)
				// console.log(value)
				console.log(index)
				this.newGender = index
			}
		}
	}
</script>

<style lang="less" scoped>
	.update_gender {}
</style>
