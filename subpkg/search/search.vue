<template>
	<view>
		<view class="search-box">
			<uni-search-bar @input="input" :radius="100" cancelButton="none" :focus="true"></uni-search-bar>
		</view>
		<!-- 搜索建议列表 -->
		<view class="sugg-list" v-if="searchList.length !== 0">
			<view class="sugg-item" @click="gotoDetail(item)" v-for="(item, index) in searchList" :key="index">
				<view class="goods-name">{{item.goods_name}}</view>
				<uni-icons type="arrowright" size="16"></uni-icons>
			</view>
		</view>
		<!-- 搜索历史列表 -->
		<view class="history-box" v-else>
			<view class="history-title">
				<text>搜索历史</text>
				<uni-icons @click="clean" type="trash" size="17"></uni-icons>
			</view>
			<view class="history-list">
				<uni-tag @click="gotoGoodsList(item)" v-for="(item, index) in histories" :key="index" :text="item" :inverted="true"></uni-tag>
			</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				timer: null,
				kw: '',
				searchList: [],
				historyList: ['a', 'b', 'c']
			};
		},
		onLoad() {
			this.historyList = JSON.parse(uni.getStorageSync('kw') || '[]')
		},
		methods: {
			input (e) {
				clearTimeout(this.timer)
				this.timer = setTimeout(() => {
					if(e.trim() === '') return this.searchList = []
					this.kw = e
					this.getSearchList()
					this.saveHistoryList()
				}, 500)
			},
			async getSearchList() {
				if(this.kw.length === 0) {
					this.searchList = []
					return
				}
				const res = await uni.$http.get('/api/public/v1/goods/search', {query: this.kw})
				if(res.data.meta.status !== 200) return uni.$showMsg('请求有误')
				this.searchList = res.data.message.goods
			},
			gotoDetail (item) {
				uni.navigateTo({
					url: '/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id
				})
			},
			saveHistoryList () {
				const set = new Set(this.historyList)
				set.delete(this.kw)
				set.add(this.kw)
				this.historyList = Array.from(set)
				uni.setStorageSync('kw', JSON.stringify(this.historyList))
			},
			clean() {
				this.historyList = []
				uni.setStorageSync('kw', '[]')
			},
			gotoGoodsList (item) {
				uni.navigateTo({
					url: '/subpkg/goods_list/goods_list?query=' + item
				})
			}
		},
		computed: {
			histories () {
				return [...this.historyList].reverse()
			}
		}
	}
</script>

<style lang="scss">
.search-box {
	position: sticky;
	top: 0;
	z-index: 999;
	background-color: #c00000;
}
.sugg-item {
	display: flex;
	justify-content: space-between;
	margin: 13px 5px;
	font-size: 12px;
	border: 1px solid #efefef;
	.goods-name {
		// 不允许换行
		white-space: nowrap;
		overflow: hidden;
		// 文本溢出后，使用...代替
		text-overflow: ellipsis;
	}
}
.history-box {
	padding: 0 5px;
	.history-title {
		height: 40px;
		font-size: 13px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1px solid #efefef;
	}
	.history-list {
		display: flex;
		flex-wrap: wrap;
		.uni-tag {
			display: block;
			margin: 5px 5px 0 0;
		}
	}
}
</style>
