<template>
	<div id="app">
		<keep-alive :include="x_cachePage">
			<router-view />
		</keep-alive>
	</div>
</template>

<script>
	import {
		mapState
	} from 'vuex'

	export default {
		name: 'App',
		computed: {
			...mapState(['x_cachePage'])
		}
	}
</script>

<style lang="less">

</style>
