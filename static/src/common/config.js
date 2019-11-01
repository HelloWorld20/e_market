export default {
	baseUrl() {
		if (process.env.NODE_ENV === 'development') {
			return 'http://localhost:3001';
		} else {
			return '';
		}
	}
};
