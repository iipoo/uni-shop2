import { mapGetters } from 'vuex'
export default {
	computed: {
		...mapGetters('cart', ['total'])
	},
	onShow () {
		this.setBadge()
	},
	methods: {
		setBadge () {
			if (this.total <= 0) {
				uni.removeTabBarBadge({
					index: 2
				})
				return
			}
			uni.setTabBarBadge({
				index: 2,
				text: this.total + ''
			})
		}
	}
}