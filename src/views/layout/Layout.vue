<template>
	<div class="layout">
		<keep-alive>
			<router-view />
		</keep-alive>
		<van-tabbar v-model="active" route>
			<van-tabbar-item replace to="/home" icon="home-o">首页</van-tabbar-item>
			<van-tabbar-item replace to="/qa" icon="comment-o">问答</van-tabbar-item>
			<van-tabbar-item replace to="/video" icon="video-o">视频</van-tabbar-item>
			<van-tabbar-item replace to="/my" icon="manager-o">我的</van-tabbar-item>
		</van-tabbar>
	</div>
</template>

<script>
	export default {
		name: 'Layout',
		data() {
			return {
				active: 0
			}
		},
		created() {

		},
		mounted() {
			this.$store.commit('addCachePage', 'Layout')
		},
		methods: {

		}
	}
</script>

<style lang="less" scoped>
	.layout{
		.van-tabbar-item--active {
			color: orangered;
		}
	}
</style>
