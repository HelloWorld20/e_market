import Vue from 'vue';
import axios from 'axios';
import router from '../router';
// import config from '@config';
import { Loading } from 'element-ui';

let loadingIns;

let $axios = axios.create({
	// baseURL: config.baseUrl(),
	timeout: 10000
});

let loadingCount = 0;

// 请求拦截
$axios.interceptors.request.use(config => {
	if (loadingCount++ === 0) {
		// Indicator.open();
		loadingIns = Loading.service({ fullscreen: true });
	}
	// Do something before request is sent
	return config;
}, error => {
	loadingCount = loadingCount > 0
		? loadingCount - 1 : 0;

	if (loadingCount === 0) {
		// Indicator.close();
		loadingIns.close();
	}
	// Do something with request error
	return Promise.reject(error);
});

// 返回拦截
$axios.interceptors.response.use(response => {
	console.log('统一接口拦截', response);
	if (response.status !== 200 && response.status !== 304) {
		return Promise.reject(response);
	}
	loadingCount = loadingCount > 0
		? loadingCount - 1 : 0;

	if (loadingCount === 0) {
		// Indicator.close();
		loadingIns.close();
	}
	return response.data;
}, err => {
	loadingCount = loadingCount > 0
		? loadingCount - 1 : 0;

	if (loadingCount === 0) {
		loadingIns.close();
		Vue.prototype.$message({
			message: err.response.data,
			type: 'error'
		});
	}
	if (err.response.status === 403) {
		router.replace('Login');
	}
	// Do something with response error
	return Promise.reject(err);
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
