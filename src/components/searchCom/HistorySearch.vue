<template>
	<div class="history_search">
		<van-cell title="搜索历史" @click="isDeleteShow = !isDeleteShow">
			<template v-if="isDeleteShow">
				<span @click="allDelete">全部删除</span>
				&nbsp;
				<span>完成</span>
			</template>
			<template v-else>
				<van-icon name="delete" />
			</template>
		</van-cell>
		<van-cell :title="item" v-for="(item, index) in historySearchList" :key="index" @click="onLoad(item)">
			<van-icon name="close" @click="onDelete(item, index)" v-if="isDeleteShow" />
		</van-cell>
	</div>
</template>

<script>
	export default {
		name: 'HistorySearch',
		props: {
			historySearchList: {
				type: Array,
				required: true
			}
		},
		data() {
			return {
				// delete的flag
				isDeleteShow: false
			}
		},
		methods: {
			/**
			 * 搜索历史全部删除
			 */
			allDelete(){
				this.$emit('all_delete', [])
			},
			/**
			 * 点击跳转
			 */
			onLoad(item) {
				if(!this.isDeleteShow){
					this.$emit('history-event', item)
				}
			},
			/**
			 * 删除搜索历史 
			 */
			onDelete(item, index) {
				// console.log(item)
				// console.log(index)
				this.historySearchList.splice(index, 1)
			}
		}
	}
</script>

<style lang="less" scoped>
	.history_search {}
</style>
