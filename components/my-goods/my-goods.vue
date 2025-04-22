<template>
	<view>
		<view class="goods-item">
			<view class="goods-left">
				<image :src="goods.goods_small_logo || defaultPic"></image>
			</view>
			<view class="goods-right">
				<view class="goods-name">{{goods.goods_name}}</view>
				<view class="goods-info">
					<view class="goods-price">￥{{goods.goods_price.toFixed(2)}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"my-goods",
		props: {
			goods: {
				type: Object,
				default: {}
			}
		},
		data() {
			return {
				defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png'
			};
		}
	}
</script>

<style lang="scss">
.goods-item {
	display: flex;
	padding: 10px 5px;
	border-bottom: 1px solid #efefef;
	.goods-left {
		padding-right: 5px;
		image {
			width: 100px;
			height: 100px;
		}
	}
	.goods-right {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		.goods-name {
			font-size: 13px;
		}
		.goods-price {
			font-size: 16px;
			color: #c00000;
		}
	}
}
</style>