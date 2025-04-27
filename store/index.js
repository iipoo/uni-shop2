// 页面路径：store/index.js
import { createStore } from 'vuex'
import cart from './modules/cart'
import user from './modules/user'
const store = createStore({
	state:{//存放状态
		"username":"foo",
		"age":18
	},
	modules: {
		cart,
		user
	}
})

export default store
