export default {
	namespaced: true,
	state: () => ({
		cart: JSON.parse(uni.getStorageSync('cart') || '[]')
	}),
	getters: {
		total: state => {
			// let c = 0
			// state.cart.forEach(item => c += item.goods_count)
			// return c
			return state.cart.reduce((total, current) => total += current.goods_count, 0)
		},
		checkedCount (state) {
			return state.cart.filter(item => item.goods_state).reduce((sum, current) => sum += current.goods_count, 0)
		},
		checkedGoodsAmount (state) {
			return state.cart.filter(item => item.goods_state === true).reduce((sum, item) => sum += item.goods_price * item.goods_count, 0).toFixed(2)
		}
	},
	mutations: {
		addToCart(state, goods) {
			const findResult = state.cart.find(item => item.goods_id === goods.goods_id)
			if (!findResult) {
				state.cart.push(goods)
			} else {
				findResult.goods_count++
			}
			this.commit('cart/saveLocstorage')
		},
		saveLocstorage (state) {
			uni.setStorageSync('cart', JSON.stringify(state.cart))
		},
		radioChangeHandler (state, e) {
			const findResult = state.cart.find(item => item.goods_id === e.goods_id)
			if (findResult) {
				findResult.goods_state = !findResult.goods_state
				this.commit('cart/saveLocstorage')
				console.log(findResult.goods_state)
			}
		},
		updateCartCountVuex (state, e) {
			const findResult = state.cart.find(item => item.goods_id === e.goods_id)
			if (findResult) {
				findResult.goods_count = e.goods_count
				this.commit('cart/saveLocstorage')
				console.log(findResult.goods_count)
			}
		},
		subToCart (state, goods_id) {
			state.cart = state.cart.filter(item => item.goods_id !== goods_id)
			this.commit('cart/saveLocstorage')
		},
		updateAllGoodsState (state, newState) {
			state.cart.forEach(item => item.goods_state = newState)
			this.commit('cart/saveLocstorage')
		}
	},
	actions: {

	}
}