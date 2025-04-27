<template>
	<view>
		<!-- 收货地址组件 -->
		<!-- 选择收货地址的盒子 -->
		<view class="address-choose-box" v-if="JSON.stringify(address) === '{}'">
			<button @click="chooseAddress" type="primary" size="mini">选择收货地址+</button>
		</view>
		<!-- 收货地址信息展示 -->
		<view class="address-info-box" v-else @click="chooseAddress">
			<view class="row1">
				<view class="row1-left">
					<view class="name">
						收件人姓名：{{address.userName}}
					</view>
				</view>
				<view class="row1-right">
					<view class="phone">
						收件人电话：{{address.telNumber}}
					</view>
				</view>
			</view>
			<view class="row2">
				<view class="row2-left">
					<view class="">
						地址：
					</view>
				</view>
				<view class="row2-right">
					<view class="">
						{{addressInfo}}
					</view>
					<uni-icons type="arrowright" size="12"></uni-icons>
				</view>
			</view>
		</view>
		<!-- 底部的边框线 -->
		<image class="address-border" src="@/static/cart_border@2x.png"></image>
	</view>
</template>

<script>
	import { mapMutations, mapState, mapGetters } from 'vuex'
	export default {
		name:"my-address",
		data() {
			return {
				// address: {}
			};
		},
		methods: {
			...mapMutations('user', ['updateAddress']),
			async chooseAddress() {
				const res = await uni.chooseAddress().catch(err => err)
				if (res.errMsg === 'chooseAddress:ok') {
					// this.address = res
					this.updateAddress(res)
					console.log(this.address)
				}
			}
		},
		computed: {
			...mapState('user', ['address']),
			...mapGetters('user', ['addressInfo'])
		}
	}
</script>

<style lang="scss">
.address-border {
	display: block;
	width: 100%;
	height: 5px;
}
.address-choose-box {
	height: 90px;
	display: flex;
	align-items: center;
	justify-content: center;
}
.address-info-box {
	padding: 0 5px 5px 5px;
	font-size: 12px;
	.row1 {
		display: flex;
		justify-content: space-between;
		.row1-left {
			
		}
		.row1-right{
			
		}
	}
	.row2 {
		margin-top: 10px;
		display: flex;
		align-items: center;
		.row2-left {
			white-space: nowrap;
		}
		.row2-right {
			display: flex;
			justify-content: space-between;
			align-items: center;
		}
	}
}
</style>