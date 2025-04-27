<template>
	<my-search @click="searchHandler"></my-search>
	<view>
		<view class="scroll-view-container">
			<!-- 左侧一级分类 -->
			<scroll-view class="left-scorll" scroll-y="true" :style="{height: wh + 'px'}">
				<!-- 一级分类item项 -->
				<block v-for="(item, index) in cateList" :key="index">
					<!-- 一级分类标题 -->
					<view :class="index === active ? 'active' : ''" @click="changeActive(index)">
						{{item.cat_name}}
					</view>
				</block>
			</scroll-view>
			<!-- 右侧二级分类 -->
			<scroll-view class="right-scroll" scroll-y="true" :style="{height: wh + 'px'}" :scroll-top="scrollTop">
				<!-- 二级分类 -->
				<view class="cate-level2" v-for="(item2, index2) in cateList2" :key="index2">
					<!-- 二级分类文本 -->
					<view class="cate-level2-text">
						{{item2.cat_name}}
					</view>
					<!-- 三级分类 -->
					<view class="cate-level3">
						<view class="cate-level3-item" v-for="(item3, index3) in item2.children" :key="index3" @click="goGoodsList(item3)">
							<!-- 三级分类图片 -->
							<image :src="item3.cat_icon" class="cate-level3-pic"></image>
							<!-- 三级分类文本 -->
							<text class="cate-level3-text">
								{{item3.cat_name}}
							</text>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import badge from '../../mixins/tabbar-badge.js'
	export default {
		mixins: [badge],
		data() {
			return {
				wh: 0,
				cateList: [],
				active: 0,
				cateList2: [],
				scrollTop: 0
			};
		},
		onLoad() {
			const sysInfo = uni.getSystemInfoSync()
			this.wh = sysInfo.windowHeight - 50
			this.getCateList()
		},
		methods: {
			async getCateList () {
				const res = await uni.$http.get('/api/public/v1/categories')
				console.log(res)
				if (res.data.meta.status !== 200) return uni.$showMsg('请求错误')
				this.cateList = res.data.message
				this.cateList2 = res.data.message[0].children
			},
			changeActive (index) {
				this.active = index
				this.cateList2 = this.cateList[index].children
				// 变量值如果赋值相同参数会导致赋值失败，所以在1和0之间切换赋值
				this.scrollTop = this.scrollTop === 0 ? 1 : 0
			},
			goGoodsList (item3) {
				uni.navigateTo({
					url:'/subpkg/goods_list/goods_list?cid=' + item3.cat_id
				})
			},
			searchHandler () {
				uni.navigateTo({
					url: '/subpkg/search/search'
				})
			}
		}
	}
</script>

<style lang="scss">
.scroll-view-container {
	display: flex;
	.left-scorll {
		width: 120px;
		view {
			border: 1px solid #000;
			text-align: center;
			line-height: 60px;
			&.active {
				position: relative;
				background-color: #ccc;
				&::before {
					content: "";
					display: block;
					position: absolute;
					top: 50%;
					left: 0;
					transform: translateY(-50%);
					background-color: blue;
					width: 3px;
					height: 30px;
				}
			}
		}
	}
	.right-scroll {
		text-align: center;
		.cate-level2-text {
			font-weight: 700;
		}
		.cate-level3 {
			margin-top: 15px;
			display: flex;
			flex-wrap: wrap;
			.cate-level3-item{
				margin-bottom: 10px;
				width: 33.33%;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				.cate-level3-pic {
					width: 60px;
					height: 60px;
				}
				text {
					font-size: 12px;
				}
			}
		}
	}
}
</style>
