<template>
	<div class="update_birthday">
		<van-datetime-picker v-model="currentDate" type="date" :min-date="minDate" :max-date="maxDate"
			@change="onChange" @cancel="onCancel" @confirm="onConfirm" />
	</div>
</template>

<script>
	import {
		patchUserProfile
	} from '@/api/api.js'
	import dayjs from 'dayjs'

	export default {
		name: 'UpdateGender',
		props: {
			birthday: {
				type: String,
				required: true
			}
		},
		data() {
			return {
				minDate: new Date(1930, 0, 1),
				maxDate: new Date(),
				currentDate: new Date(this.birthday),
			}
		},
		created() {

		},
		methods: {
			onChange() {
				// console.log(this.currentDate)
				// console.log(dayjs(this.currentDate).format('YYYY-MM-DD'))
			},
			
			/**
			 * 取消
			 */
			onCancel() {
				// console.log('onCancel')
				this.$emit('close')
			},
			
			/**
			 * 确认提交
			 */
			async onConfirm() {
				this.$toast.loading({
					message: '处理中...',
					forbidClick: true,
				})
				const data = await patchUserProfile({
					birthday: dayjs(this.currentDate).format('YYYY-MM-DD')
				})
				console.log(data)
				this.$toast.success('修改生日成功')
				this.$emit('birthday-success', dayjs(this.currentDate).format('YYYY-MM-DD'))
				this.$emit('close')
			}
		}
	}
</script>

<style lang="less" scoped>
	.update_birthday {}
</style>
