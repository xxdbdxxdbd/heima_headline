<template>
	<div class="user_profile">
		<van-nav-bar title="个人信息" left-arrow @click-left="onClickLeft">
			<template #left>
				<van-icon name="arrow-left" />
			</template>
		</van-nav-bar>
		<van-cell class="photo" title="头像" is-link center @click="showUpdatPhoto">
			<van-image :src="userProfileList.photo" round @click.stop="showPreviewPhoto" />
		</van-cell>
		<van-cell title="昵称" is-link :value="userProfileList.name" @click="showUpdatNamePopup = true" center />
		<van-cell title="性别" is-link :value="userProfileList.gender === 0 ? '男' : '女'"
			@click="showUpdatGenderPopup = true" center />
		<van-cell title="生日" is-link :value="userProfileList.birthday" @click="showUpdateBirthdayPopup = true" center />
		<!-- 修改头像弹出层 -->
		<van-popup v-model="showUpdatPhotoPopup" position="bottom" :style="{height: '100%'}" v-if="showUpdatPhotoPopup">
			<update-photo :photoFile="photoFile" @photo-success="userProfileList.photo = $event"
				@close="showUpdatPhotoPopup = false">
			</update-photo>
		</van-popup>
		<!-- 修改昵称弹出层 -->
		<van-popup v-model="showUpdatNamePopup" position="bottom" :style="{height: '50%'}" v-if="showUpdatNamePopup">
			<update-name :name="userProfileList.name" @name-success="userProfileList.name = $event"
				@close="showUpdatNamePopup = false">
			</update-name>
		</van-popup>
		<!-- 修改性别弹出层 -->
		<van-popup v-model="showUpdatGenderPopup" position="bottom" :style="{height: '50%'}"
			v-if="showUpdatGenderPopup">
			<update-gender :gender="userProfileList.gender" @gender-success="userProfileList.gender = $event"
				@close="showUpdatGenderPopup = false">
			</update-gender>
		</van-popup>
		<!-- 修改生日弹出层 -->
		<van-popup v-model="showUpdateBirthdayPopup" position="bottom" :style="{height: '50%'}"
			v-if="showUpdateBirthdayPopup">
			<update-birthday :birthday="userProfileList.birthday" @birthday-success="userProfileList.birthday = $event"
				@close="showUpdateBirthdayPopup = false">
			</update-birthday>
		</van-popup>
		<input type="file" accept="image/*" hidden ref="inputPhotoRef" @change="onPhotoChange"></input>
	</div>
</template>

<script>
	import {
		getUserProfile
	} from '@/api/api.js'
	import {
		ImagePreview
	} from 'vant'

	import UpdatePhoto from '@/components/userCom/UpdatePhoto.vue'
	import UpdateName from '@/components/userCom/UpdateName.vue'
	import UpdateGender from '@/components/userCom/UpdateGender.vue'
	import UpdateBirthday from '@/components/userCom/UpdateBirthday.vue'

	export default {
		name: 'UserProfile',
		components: {
			'update-photo': UpdatePhoto,
			'update-name': UpdateName,
			'update-gender': UpdateGender,
			'update-birthday': UpdateBirthday
		},
		data() {
			return {
				userProfileList: {},
				// 修改头像弹出层flag
				showUpdatPhotoPopup: false,
				photoFile: null,
				// 修改昵称弹出层flag
				showUpdatNamePopup: false,
				// 修改性别弹出层flag
				showUpdatGenderPopup: false,
				// 修改生日弹出层flag
				showUpdateBirthdayPopup: false
			}
		},
		created() {
			this.getUserProfile()
		},
		methods: {
			onClickLeft() {
				console.log('onClickLeft')
				this.$router.back()
			},
			async getUserProfile() {
				const {
					data
				} = await getUserProfile()
				console.log(data)
				this.userProfileList = data.data
			},

			/**
			 * 预览头像
			 */
			showPreviewPhoto() {
				ImagePreview([this.userProfileList.photo])
			},
			showUpdatPhoto() {
				// console.log(this.$refs)
				// console.log(this.$refs.inputPhotoRef)
				this.$refs.inputPhotoRef.click()
				this.$refs.inputPhotoRef.files.value = ''
			},
			onPhotoChange() {
				// console.log('onPhotoChange')
				const blob = this.$refs.inputPhotoRef.files[0]
				// console.log(blob)
				this.photoFile = blob
				this.showUpdatPhotoPopup = true
			}
		}
	}
</script>

<style lang="less" scoped>
	.user_profile {
		.van-nav-bar {
			background-color: #3296fa;

			.van-icon {
				color: #ffffff;
			}

			/deep/ .van-nav-bar__title {
				color: #ffffff;
			}

			/deep/ .van-nav-bar__text {
				color: #ffffff;
			}
		}

		.photo {
			.van-cell__value {
				display: flex;
				justify-content: flex-end;
			}

			/deep/ .van-image__img {
				width: 30px;
				height: 30px;
			}
		}

		.van-popup {
			background-color: #f5f5f5;
		}

	}
</style>
