export default {
	test: state => state.test,
	category: state => state.category || [],
	goods: state => state.goods || [],
	userInfo: state => state.userInfo || {},
	homeInfo: state => state.homeInfo || {},
	cartsData: state => state.cartsData || {}
};
