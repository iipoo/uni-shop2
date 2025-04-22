<template>
	<view>
		<view class="goods-list">
			<view v-for="(item, index) in goodsList" :key="index" @click="gotoGoodsDetail(item)">
				<my-goods :goods="item"></my-goods>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				queryObj: {
					query: '',
					cat_id: '',
					pagenum: 1,
					pagesize: 10
				},
				goodsList: [],
				total: 0,
				isloading: false
			};
		},
		onLoad(options) {
			this.queryObj.query = options.query || ''
			this.queryObj.cat_id = options.cid || ''
			this.getGoodsList()
		},
		methods: {
			async getGoodsList(callback) {
				this.isloading = true
				const { data: res } = await uni.$http.get('/api/public/v1/goods/search', this.queryObj)
				callback && callback()
				this.isloading = false
				console.log(res)
				if(res.meta.status !== 200) return uni.$showMsg('请求有误')
				this.goodsList = [...this.goodsList, ...res.message.goods]
				this.total = res.message.total
			},
			gotoGoodsDetail (item) {
				uni.navigateTo({
					url: '/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id
				})
			}
		},
		onReachBottom() {
			if (this.queryObj.pagenum * this.queryObj.pagesize >= this.total) return uni.$showMsg('已经是最后一页')
			if (this.isloading) return
			this.queryObj.pagenum++
			this.getGoodsList()
		},
		onPullDownRefresh() {
			this.queryObj.pagenum = 1
			this.goodsList = []
			this.total = 0
			this.isloading = false
			this.getGoodsList(() => uni.stopPullDownRefresh())
		}
		
	}
</script>

<style lang="scss">

</style>
