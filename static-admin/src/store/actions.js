import {$get, $post} from '../http/request';
import apis from '../http/apis';

export default {
	getTestData({state, commit}) {
		return $get(apis.testUrl);
	},
	getCategory({state, commit}) {
		return $get(apis.cate);
	}
};
