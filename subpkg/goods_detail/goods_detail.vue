<template>
	<view v-if="goods_info.goods_name" class="goods-detail-page">
		<!-- 轮播图区域 -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" circular="true">
			<swiper-item v-for="(item, index) in goods_info.pics" :key="index">
				<image :src="item.pics_big_url" @click="preview(index)"></image>
			</swiper-item>
		</swiper>
		<!-- 商品信息区域 -->
		<view class="goods-info-box">
			<!-- 商品信息价格 -->
			<view class="price">
				￥{{goods_info.goods_price}}
			</view>
			<!-- 商品信息主体 -->
			<view class="goods-info-body">
				<view class="goods-name">
					{{goods_info.goods_name}}
				</view>
				<view class="favi">
					<uni-icons type="star" color="gray" size="18"></uni-icons>
					<view class="text">
						收藏
					</view>
				</view>
			</view>
			<!-- 商品信息运费 -->
			<view class="yf">
				运费：免运费 {{total}}
			</view>
		</view>
		<!-- 商品下方介绍 -->
		<view>
			<rich-text :nodes="goods_info.goods_introduce"></rich-text>
		</view>
		<view class="uni-goods-nav">
			<uni-goods-nav :fill="true"  :options="options" :buttonGroup="buttonGroup"  @click="onClick" @buttonClick="buttonClick" />
		</view>
	</view>
</template>
<script>
	import { mapState, mapMutations, mapGetters } from 'vuex'
	export default {
		computed: {
			...mapState('cart', ['cart']),
			...mapGetters('cart', ['total'])
		},
		data() {
			return {
				goods_info: {},
				// 自己做的解决双击预览图片报错的节流阀，不清楚有没有bug
				isloading: false,
				options: [{
					icon: 'headphones',
					text: '客服'
				}, {
					icon: 'shop',
					text: '店铺',
					// info: 2,
					infoBackgroundColor: '#007aff',
					// infoColor:"red"
				}, {
					icon: 'cart',
					text: '购物车',
					info: 0
				}],
				buttonGroup: [{
						text: '加入购物车',
						backgroundColor: '#ff0000',
						color: '#fff'
					},
					{
						text: '立即购买',
						backgroundColor: '#ffa200',
						color: '#fff'
					}
				]
			};
		},
		onLoad(options) {
			const goods_id = options.goods_id
			this.getGoodsDetail(goods_id)
			// this.options.find(item => item.text === '购物车') ? this.options.find(item => item.text === '购物车').info = this.total : ''
		},
		methods: {
			...mapMutations('cart', ['addToCart']),
			buttonClick (e) {
				if (e.content.text === '加入购物车') {
					const goods = {
						goods_id: this.goods_info.goods_id,
						goods_name: this.goods_info.goods_name,
						goods_price: this.goods_info.goods_price,
						goods_count: 1,
						goods_small_logo: this.goods_info.goods_small_logo,
						goods_state: true
					}
					this.addToCart(goods)
					console.log(this.cart)
				}
			},
			async getGoodsDetail(goods_id) {
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/goods/detail', {
					goods_id
				})
				if (res.meta.status !== 200) return uni.$showMsg('请求异常')
				res.message.goods_introduce = res.message.goods_introduce.replace(/<img /g, '<img style="display:block;"')
					.replace(/.webp/g, '.jpg')
				this.goods_info = res.message
			},
			preview(index) {
				// 自己做的解决双击预览图片报错的节流阀，不清楚有没有bug
				if (this.isloading) return
				this.isloading = true
				uni.previewImage({
					current: index,
					urls: this.goods_info.pics.map(item => item.pics_big_url)
				})
			},
			onClick(e) {
				if (e.content.text === '购物车') {
					uni.switchTab({
						url: '/pages/cart/cart'
					})
				}
			}
		},
		watch: {
			total: {
				immediate: true,
				handler (newValue) {
					const findResult = this.options.find(item => item.text === '购物车')
					if (findResult) {
						findResult.info = newValue
					}
				}
			}
		},
		// 自己做的解决双击预览图片报错的节流阀，不清楚有没有bug
		onShow() {
			// 自己做的解决双击预览图片报错的节流阀，不清楚有没有bug
			this.isloading = false
		}
	}
</script>
<!-- <script setup>

	import { ref } from 'vue'
	import { onLoad, onShow } from '@dcloudio/uni-app'
	import { useCartStore } from '@/stores/cart.js'
	const carts = useCartStore()
	const goods_info = ref({})
	// 自己做的解决双击预览图片报错的节流阀，不清楚有没有bug
	const isloading = ref(false)
	const options = [{
		icon: 'headphones',
		text: '客服'
	}, {
		icon: 'shop',
		text: '店铺',
		// info: 2,
		infoBackgroundColor: '#007aff',
		// infoColor:"red"
	}, {
		icon: 'cart',
		text: '购物车',
		info: 2
	}]
	const buttonGroup = [{
			text: '加入购物车',
			backgroundColor: '#ff0000',
			color: '#fff'
		},
		{
			text: '立即购买',
			backgroundColor: '#ffa200',
			color: '#fff'
		}
	]
	onLoad((options) => {
		const goods_id = options.goods_id
		getGoodsDetail(goods_id)
	})
	const getGoodsDetail = async (goods_id) => {
		const {
			data: res
		} = await uni.$http.get('/api/public/v1/goods/detail', {
			goods_id
		})
		console.log(res)
		if (res.meta.status !== 200) return uni.$showMsg('请求异常')
		res.message.goods_introduce = res.message.goods_introduce.replace(/<img /g, '<img style="display:block;"')
			.replace(/.webp/g, '.jpg')
		goods_info.value = res.message
	}
	const preview = (index) => {
		// 自己做的解决双击预览图片报错的节流阀，不清楚有没有bug
		if (isloading.value) return
		isloading.value = true
		uni.previewImage({
			current: index,
			urls: goods_info.value.pics.map(item => item.pics_big_url)
		})
	}
	const onClick = (e) => {
		if (e.content.text === '购物车') {
			uni.switchTab({
				url: '/pages/cart/cart'
			})
		}
	}
	// 自己做的解决双击预览图片报错的节流阀，不清楚有没有bug
	onShow(() => {
		// 自己做的解决双击预览图片报错的节流阀，不清楚有没有bug
		isloading.value = false
	})
</script>
 -->
<style lang="scss">
.goods-detail-page {
	padding-bottom: 50px;
}
swiper {
	height: 750rpx;
	image {
		width: 100%;
		height: 100%;
	}
}
.goods-info-box {
	padding: 10px;
	padding-right: 0;
	.price {
		color: #c00000;
	}
	.goods-info-body {
		display: flex;
		justify-content: space-between;
		.goods-name {
			font-size: 13px;
			margin-right: 10px;
		}
		.favi {
			width: 120px;
			font-size: 12px;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			color: gray;
			border-left: 1px solid #efefef;
		}
	}
	.yf {
		font-size: 12px;
		color: gray;
		margin: 10px 0;
	}
}
.uni-goods-nav {
	width: 100%;
	position: fixed;
	bottom: 0;
	left: 0;
}
</style>
