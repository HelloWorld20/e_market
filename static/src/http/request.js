import Vue from 'vue';
import axios from 'axios';
import config from '@config';
import {
	Indicator
} from 'mint-ui';

let $axios = axios.create({
	baseURL: config.baseUrl(),
	timeout: 10000
});

let loadingCount = 0;

// 请求拦截
$axios.interceptors.request.use(function(config) {
	if (loadingCount++ === 0) {
		Indicator.open();
	}
	// Do something before request is sent
	return config;
}, function(error) {
	loadingCount = loadingCount > 0
		? loadingCount - 1 : 0;

	if (loadingCount === 0) {
		Indicator.close();
	}
	// Do something with request error
	return Promise.reject(error);
});

// 返回拦截
$axios.interceptors.response.use(function(response) {
	console.log('统一接口拦截', response);
	if (response.status !== 200 && response.status !== 304) {
		return Promise.reject(response);
	}
	loadingCount = loadingCount > 0
		? loadingCount - 1 : 0;

	if (loadingCount === 0) {
		Indicator.close();
	}
	return response.data;
}, function(error) {
	loadingCount = loadingCount > 0
		? loadingCount - 1 : 0;

	if (loadingCount === 0) {
		Indicator.close();
	}
	// Do something with response error
	return Promise.reject(error);
});

Vue.prototype.$axios = $axios;
Vue.prototype.$get = $axios.get;
Vue.prototype.$post = $axios.post;
Vue.prototype.$delete = $axios.delete;
Vue.prototype.$put = $axios.put;

export const $get = $axios.get;
export const $post = $axios.post;
export const $delete = $axios.delete;
export const $put = $axios.put;

export default $axios;
