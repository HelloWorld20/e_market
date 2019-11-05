import config from '../common/config';

let urls = {
	testUrl: '/api/test',
	redis: '/api/test/redis',
	mongo: '/api/test/mongo',
	upload: '/api/service/upload'
};

for (let o in urls) {
	urls[o] = config.baseUrl() + urls[o];
}

export default urls;
