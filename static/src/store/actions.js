import {$get, $post} from '../http/request';
import apis from '../http/apis';

export default {
	getTestData({state, commit}) {
		return new Promise((resolve, reject) => {
			$get(apis.testUrl).then(res => {
				resolve(res);
			}, err => {
				reject(err);
			});
		});
	}
};
