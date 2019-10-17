export default {
	baseUrl() {
		if (process.env.NODE_ENV !== 'production') {
			return 'https://easy-mock.com/mock/5cd4159c4031143439b76a0c';
		} else {
			return 'https://easy-mock.com/mock/5cd4159c4031143439b76a0c';
		}
	}
};
