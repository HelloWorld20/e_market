export default {
	updateTest: (state, data) => (state.test = data),
	updateCategory: (state, data) => (state.category = data),
	updateGoods: (state, data) => (state.goods[data.key] = data.value),
	updateUserInfo: (state, data) => (state.userInfo = data),
	updateHomeInfo: (state, data) => (state.homeInfo = data),
	updateCartData: (state, data) => (state.cartsData = data)
};
