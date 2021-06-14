<template>
	<div class="article_list_item">
		<van-cell @click="goArticle">
			<template #title>
				<div class="title van-multi-ellipsis--l2">
					{{data.title}}
				</div>
			</template>
			<template #label>
				<!-- 三张图片区域 -->
				<div class="three" v-if="data.cover.type === 3">
					<van-image class="three_item" v-for="(item, index) in data.cover.images" fit="cover" :src="item" />
				</div>
				<!-- 置顶 -->
				<van-tag class="is_top" type="danger" v-if="data.is_top">置顶</van-tag>
				<span class="aut_name">{{data.aut_name}}</span>
				<span class="comm_count">{{data.comm_count}}评论</span>
				<span class="pubdate">{{data.pubdate | relativeTime}}</span>
			</template>
			<template #default v-if="data.cover.type === 1">
				<!-- 单张图片区域 -->
				<div class="one">
					<van-image class="one_item" fit="cover" :src="data.cover.images[0]" />
				</div>
			</template>
		</van-cell>
	</div>
</template>

<script>
	export default {
		name: 'ArticleListItem',
		props: {
			data: {
				type: Object,
				required: true
			}
		},
		created() {
			// console.log(this.data)
		},
		data() {
			return {

			}
		},
		methods: {
			goArticle() {
				this.$router.push(`/article/${this.data.art_id}`)
			}
		}
	}
</script>

<style lang="less" scoped>
	.article_list_item {
		border-bottom: 1px solid #eeeeee;

		.title {
			font-size: 18px;
			margin: 10px 0;
			// border: 1px solid red;
		}

		// 三张图片区域
		.van-cell__label {
			margin: 0;
		}

		.three {
			padding: 10px 0;
			display: flex;
			// border: 1px solid red;

			.three_item {
				flex: 1;
				height: 70px;
				padding-left: 5px;
			}

			.three_item:first-child {
				padding: 0
			}

		}

		// 置顶
		.is_top {
			margin-right: 10px;
		}

		.aut_name {
			margin-right: 10px;
		}

		.comm_count {
			margin-right: 10px;
		}

		// 单张图片区域
		.one {
			.one_item {
				width: 100px;
				height: 70px;
			}
		}
	}
</style>
