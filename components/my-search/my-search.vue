<template>
	<view class="search-container" :style="{'background-color': bgcolor}" @click="searchHandler">
		<view class="search-box" :style="{'border-radius': radius + 'px'}">
			<uni-icons type="search" size="17"></uni-icons>
			<text class="placeholder">搜索</text>
		</view>
	</view>
</template>
<script>
	export default {
		name: 'my-search',
		props: {
			bgcolor: {
				type: String,
				default: '#c00000'
			},
			radius: {
				type: Number,
				default: 18
			}
		},
		data () {
			return {
				
			}
		},
		methods: {
			searchHandler () {
				console.log('......')
				this.$emit('click')
			}
		}
	}
</script>
<style lang="scss">
	.search-container {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 50px;
		// background-color: #c00000;
		.search-box {
			margin: 0 10px;
			display: flex;
			align-items: center;
			justify-content: center;
			width: 100%;
			height: 36px;
			background-color: #fff;
			// border-radius: 15px;
			.placeholder {
				font-size: 15px;
				margin-left: 5px;
			}
		}
	}

</style>