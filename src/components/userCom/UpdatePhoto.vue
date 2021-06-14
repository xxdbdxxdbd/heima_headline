<template>
	<div class="update_photo">
		<van-image :src="photo" />
		<van-nav-bar left-text="取消" right-text="保存" @click-left="onClickLeft" @click-right="onClickRight" />
	</div>
</template>

<script>
	import {
		patchUserPhoto
	} from '@/api/api.js'

	export default {
		name: 'UpdatePhoto',
		props: {
			photoFile: {
				required: true
			}
		},
		data() {
			return {
				photo: window.URL.createObjectURL(this.photoFile)
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
					message: '保存中',
					forbidclick: true
				})
				const fd = new FormData
				fd.append('photo', this.photoFile)
				// console.log(fd.get('photo'))
				const data = await patchUserPhoto(fd)
				console.log(data)
				this.$toast.success('保存成功')
				this.$emit('photo-success', this.photo)
				this.$emit('close')
			}
		}
	}
</script>

<style lang="less" scoped>
	.update_photo {
		text-align: center;

		.van-image {

			.van-image__img {
				width: 100px;
				height: 100px;
			}
		}

		.van-nav-bar {
			position: absolute;
			left: 0;
			right: 0;
			bottom: 0;
		}
	}
</style>
