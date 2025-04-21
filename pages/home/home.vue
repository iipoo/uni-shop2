<template>
	<view>
		<!-- 顶部搜索组件 -->
		<view class="search-box">
			<my-search @click="goSearch"></my-search>
		</view>
		<!-- 轮播图区域 -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" circular="true">
			<swiper-item v-for="(item, index) in swiperList" :key="index">
				<navigator class="swiper-item" :url="'/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id">
					<image :src="item.image_src"></image>
				</navigator>
			</swiper-item>
		</swiper>
		<!-- 导航栏区域 -->
		<view class="nav">
			<view class="nav-item" v-for="(item, index) in navList" :key="index" @click="navClickHandler(item)">
				<image :src="item.image_src"></image>
			</view>
		</view>
		<!-- 楼层区域 -->
		<!-- 楼层的容器 -->
		<view class="floor">
			<!-- 每一个楼层的item项 -->
			<view class="floor-item" v-for="(item, index) in floorList" :key="index">
				<!-- 楼层的标题 -->
				<image :src="item.floor_title.image_src" mode="widthFix"></image>
				<!-- 楼层的图片区域 -->
				<view class="floor-img-box">
					<!-- 左侧图片区域 -->
					<navigator :url="item.product_list[0].url" class="left-img">
						<image :src="item.product_list[0].image_src" :style="{width:item.product_list[0].image_width + 'rpx'}" mode="widthFix"></image>
					</navigator>
					<!-- 右侧图片区域 -->
					<view class="right-img">
						<navigator :url="item2.url" class="right-img-item" v-for="(item2, index2) in item.product_list.slice(1)" :key="index2">
							<image :src="item2.image_src" :style="{width:item2.image_width + 'rpx'}" mode="widthFix"></image>
						</navigator>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 轮播图数据列表
				swiperList: [],
				navList: [],
				floorList: []
			};
		},
		onLoad() {
			this.getSwiperList()
			this.getNavList()
			this.getFloorList()
		},
		methods: {
			async getSwiperList () {
				const res = await uni.$http.get('/api/public/v1/home/swiperdata')
				if(res.data.meta.status !== 200) return uni.$showMsg('请求失败')
				this.swiperList = res.data.message
			},
			async getNavList() {
				const res = await uni.$http.get('/api/public/v1/home/catitems')
				if(res.data.meta.status !== 200) return uni.$showMsg('请求失败')
				this.navList = res.data.message
			},
			async getFloorList() {
				const res = await uni.$http.get('/api/public/v1/home/floordata')
				if(res.data.meta.status !== 200) return uni.$showMsg('请求失败')
				// 先把请求得到的数据进行拼接处理
				res.data.message.forEach(floor => {
					floor.product_list.forEach(prod => {
						prod.url = "/subpkg/goods_list/goods_list?" + prod.navigator_url.split('?')[1]
					})
				})
				this.floorList = res.data.message
			},
			navClickHandler (item) {
				if(item.name === '分类') {
					uni.switchTab({
						url:'/pages/cate/cate'
					})
				}
			},
			goSearch () {
				uni.navigateTo({
					url: '/subpkg/search/search'
				})
			}
		}
	}
</script>

<style lang="scss">
	.search-box {
		position: sticky;
		top: 0;
		z-index: 999;
	}
swiper-item {
	height: 330rpx;
	.swiper-item,
	image {
		height: 100%;
width: 100%;
	}
	
}
.nav {
	margin: 15rpx 0;
	display: flex;
	justify-content: space-around;
	.nav-item image{
		width: 128rpx;
height: 140rpx;
	}
}
.floor-img-box {
	display: flex;
	padding-left: 10rpx;
	.right-img {
		display: flex;
		justify-content: space-around;
		flex-wrap: wrap;
	}
}
</style>
