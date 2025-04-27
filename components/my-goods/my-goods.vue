<template>
	<view>
		<view class="goods-item">
			<view class="goods-left">
				<radio :checked="goods.goods_state" color="#c00000" v-if="showRadio" @click="radioChangeHandler"></radio>
				<image :src="goods.goods_small_logo || defaultPic"></image>
			</view>
			<view class="goods-right">
				<view class="goods-name">{{goods.goods_name}}</view>
				<view class="goods-info">
					<view class="goods-price">￥{{goods.goods_price.toFixed(2)}}</view>
					<uni-number-box @change="updateCartCount" :min="1" :max="999" v-model="goods.goods_count" v-if="showNum"></uni-number-box>
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
			},
			showRadio: {
				type: Boolean,
				default: false
			},
			showNum: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png'
			};
		},
		methods: {
			radioChangeHandler () {
				this.$emit('clickChangeRadio', {
					goods_id: this.goods.goods_id,
					goods_state: this.goods.goods_state
				})
			},
			updateCartCount () {
				this.$emit('updateCartCount', {
					goods_id: this.goods.goods_id,
					goods_count: this.goods.goods_count
				})
			}
		}
	}
</script>

<style lang="scss">
.goods-item {
	display: flex;
	padding: 10px 5px;
	border-bottom: 1px solid #efefef;
	.goods-left {
		display: flex;
		align-items: center;
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
		flex: 1;
		.goods-name {
			font-size: 13px;
		}
		.goods-info {
			display: flex;
			justify-content: space-between;
		}
		.goods-price {
			font-size: 16px;
			color: #c00000;
		}
	}
}
</style>