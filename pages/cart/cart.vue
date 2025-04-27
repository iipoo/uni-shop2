<template>
	<view class="cart-container" v-if="cart.length !== 0">
		<!-- 收货地址 -->
		<my-address></my-address>
		<!-- 购物车标题 -->
		<view class="cart-title">
			<uni-icons type="shop" size="18"></uni-icons>
			<text class="cart-title-text">购物车</text>
		</view>

		<!-- 购物车列表展示区域 -->
		<uni-swipe-action>
			<block class="goods-list" v-for="(item, index) in cart" :key="item.goods_id">
				<uni-swipe-action-item :right-options="options" @click="onClick(item)">
					<my-goods :showNum="true" @updateCartCount="updateCartCount" :goods="item" :showRadio="true" @clickChangeRadio="radioChangeHandler"></my-goods>
				</uni-swipe-action-item>
			</block>
		</uni-swipe-action>
		<my-settle></my-settle>
	</view>
	<view class="empty-cart" v-else>
		<image src="/static/cart_empty@2x.png" class="empty-img"></image>
		<text class="empty-text">空空如也~</text>
	</view>
</template>

<script>
	// import { mapGetters } from 'vuex'
	import { mapState, mapMutations } from 'vuex'
	import badge from '../../mixins/tabbar-badge.js'
	export default {
		mixins: [badge],
		data() {
			return {
				options: [{
					text: '删除',
					style: {
						backgroundColor: '#dd524d'
					}
				}]
			};
		},
		computed: {
			// ...mapGetters('cart', ['total'])
			...mapState('cart', ['cart'])
		},
		onShow() {
			// this.setBadge()
		},
		methods: {
			...mapMutations('cart', ['updateCartCountVuex', 'subToCart']),
			// setBadge() {
			// 	uni.setTabBarBadge({
			// 		index: 2,
			// 		text: this.total + ''
			// 	})
			// }
			radioChangeHandler(e) {
				this.$store.commit('cart/radioChangeHandler', e)
			},
			updateCartCount (e) {
				this.updateCartCountVuex(e)
				this.setBadge()
			},
			onClick (goods) {
				this.subToCart(goods.goods_id)
				this.setBadge()
			}
		}
	}
</script>

<style lang="scss">
.cart-title {
	height: 40px;
	display: flex;
	align-items: center;
	padding-left: 5px;
	border-bottom: 1px solid #efefef;
	.cart-title-text {
		margin-left: 5px;
		font-size: 14px;
	}
}

.cart-container {
	padding-bottom: 50px;
}
.empty-cart {
	display: flex;
	flex-direction: column;
	align-items: center;
	padding-top: 150px;
	.empty-img {
		width: 90px;
		height: 90px;
	}
	.empty-text {
		margin-top: 15px;
		font-size: 12px;
		color: gray;
	}
}
</style>
