import {
	$get,
	$post,
	$delete,
	$put
} from '../http/request';
import apis from '../http/apis';

export default {
	getTestData({
		state,
		commit
	}) {
		return $get(apis.testUrl);
	},
	getRedis({
		state,
		commit
	}) {
		return $get(apis.redis);
	},
	setRedis({
		state,
		commit
	}) {
		return $post(apis.redis);
	},
	getMongo({
		state,
		commit
	}) {
		console.log('getMongo');
		return $get(apis.mongo);
	},
	addMongo({
		state,
		commit
	}) {
		return $put(apis.mongo);
	},
	delMongo({
		state,
		commit
	}) {
		return $delete(apis.mongo);
	},
	updateMongo({
		state,
		commit
	}) {
		return $post(apis.mongo);
	}
};
