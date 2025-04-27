<template>
	<view class="my-settle-container">
		<!-- 左侧全选区域 -->
		<label class="radio" @click="updateAllGoodsState(!isFullChecked)">
			<radio :checked="isFullChecked" color="#c00000" /><text>全选</text>
		</label>
		<!-- 中间合计区域 -->
		<view class="amount-box">
			合计: ￥<text class="amount">{{checkedGoodsAmount}}</text>
		</view>
		<!-- 右侧结算区域 -->
		<view class="btn-settle">
			结算({{checkedCount}})
		</view>
	</view>
</template>

<script>
	import { mapGetters, mapMutations } from 'vuex'
	export default {
		name:"my-settle",
		data() {
			return {
				
			};
		},
		computed: {
			...mapGetters('cart', ['checkedCount', 'total', 'checkedGoodsAmount']),
			isFullChecked () {
				return this.checkedCount === this.total
			}
		},
		methods: {
			...mapMutations('cart', ['updateAllGoodsState'])
		}
	}
</script>

<style lang="scss">
.my-settle-container {
	box-sizing: border-box;
	position: fixed;
	bottom: 0;
	left: 0;
	height: 50px;
	width: 100%;
	background-color: white;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0 5px;
	.radio {}
	.amount-box {
		.amount {
			color: #c00000;
			font-weight: 700;
		}
	}
	.btn-settle {
		background-color: #c00000;
		color: white;
		min-width: 100px;
		line-height: 50px;
		text-align: center;
	}
}
</style>