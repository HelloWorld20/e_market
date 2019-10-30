
const API_HOST = (function() {
	if (process.env.NODE_ENV === 'development') {
		return 'http://localhost:3001';
	} else {
		return '';
	}
})();

let urls = {
	testUrl: '/api/test',
	redis: '/api/test/redis',
	mongo: 'api/test/mongo'
};

for (let o in urls) {
	urls[o] = API_HOST + urls[o];
}
console.log('urls', urls);
export default urls;
