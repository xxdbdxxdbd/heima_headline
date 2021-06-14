<template>
	<div class="login">
		<!-- 导航区域 -->
		<van-nav-bar class="login_nav" title="注册/登录" left-arrow @click-left="onClickLeft" />
		<van-form @submit="submit" :show-error="false" :show-error-message="false" @failed="failSubmit" validate-first
			ref="loginFormRef">
			<van-field v-model="user.mobile" name="mobile" placeholder="请输入手机号" left-icon="phone-o" :rules="userRules.mobile" center />
			<!-- 验证码区域 -->
			<van-field class="code_wrap" v-model="user.code" name="code" placeholder="请输入验证码" left-icon="comment-o" :rules="userRules.code"
				center>
				<!-- 发送验证码按钮 -->
				<template #button>
					<van-button class="code_wrap_btn" size="mini" round @click.prevent="sendSms" v-if="!countDownFlag"
						:loading="loading">
						发送验证码
					</van-button>
					<van-count-down :time="1000 * 60" format="ss s" v-else @finish="countDownFlag = false" />
				</template>
			</van-field>
			<!-- 提交区域 -->
			<div class="sub_wrap">
				<!-- 提交按钮 -->
				<van-button class="sub_wrap_btn" type="info" block>提交</van-button>
			</div>
		</van-form>
	</div>
</template>

<script>
	import {
		login,
		sendSms
	} from '@/api/api.js'

	export default {
		name: 'Login',
		data() {
			return {
				user: {
					mobile: '13911111111',
					code: '246810'
				},
				userRules: {
					mobile: [{
						required: true,
						message: '请填写手机号'
					}, {
						pattern: /^1(3[0-9]|4[01456879]|5[0-35-9]|6[2567]|7[0-8]|8[0-9]|9[0-35-9])\d{8}$/,
						message: '手机号格式错误'
					}],
					code: [{
						required: true,
						message: '请填写验证码'
					}, {
						pattern: /^\d{6}$/,
						message: '验证码格式错误'
					}]
				},
				// 倒计时flag
				countDownFlag: false,
				loading: false
			}
		},
		created() {

		},
		methods: {
			/**
			 * 点击返回
			 */
			onClickLeft() {
				this.$router.back()
			},

			/**
			 * 登录提交
			 */
			async submit() {
				this.$toast.loading({
					duration: 0,
					forbidClick: true,
					message: '验证中',
				})
				try {
					const res = await login(this.user)
					console.log(res)
					this.$toast.success('登录成功')
					this.$store.commit('setUser', res.data.data)
					this.$store.commit('removeCachePage', 'Layout')
					this.$router.push(this.$route.query.returnURL || '/')
				} catch (e) {
					// console.log(e)
					this.$toast.fail('登录失败，手机或验证码错误')
				}
			},

			/**
			 * 验证失败
			 */
			failSubmit(data) {
				// console.log(data)
				if (data.errors[0]) {
					this.$toast({
						message: data.errors[0].message,
						position: 'top'
					})
				}
			},

			/**
			 * 发送验证码
			 */
			async sendSms() {
				// console.log('sendSms')
				try {
					await this.$refs.loginFormRef.validate('mobile')
					this.loading = true
					await sendSms(this.user.mobile)
					this.countDownFlag = true
				} catch (e) {
					// console.log(e)
					// console.dir(e)
					let msg = ''
					if (e && e.response && e.response.status === 429) {
						msg = '发送过于频繁，请稍后重试'
					} else if (e.name = 'mobile') {
						msg = e.message
					} else {
						msg = '发送失败，请稍后重试'
					}
					this.$toast({
						message: msg,
						position: 'top'
					})
				}
				this.loading = false
			}
		}
	}
</script>

<style lang="less" scoped>
	.login {

		// 导航区域
		.login_nav {
			background-color: orangered;

			/deep/ .van-icon {
				color: #ffffff;
			}

			/deep/ .van-nav-bar__title {
				color: #ffffff;
			}
		}

		// 验证码区域
		.code_wrap {

			// 发送验证码按钮
			.code_wrap_btn {
				width: 84px;
				height: 24px;
				background-color: #ededed;
				color: #666666;
			}
		}

		// 提交区域
		.sub_wrap {
			margin: 25px 15px;

			// 提交按钮
			.sub_wrap_btn {
				font-size: 16px;
				border: none;
				border-radius: 5px;
				background-color: coral;
			}
		}
	}
</style>
