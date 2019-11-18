import Vue from 'vue';
import Router from 'vue-router';

import Category from '@/pages/Category';
import Login from '@/pages/Login';
import Goods from '@/pages/Goods';
import HomaManage from '@/pages/HomaManage';

Vue.use(Router);
const router = new Router({
	routes: [{
		path: '/',
		name: '',
		component: Login
	}, {
		path: '/Category',
		name: 'Category',
		component: Category
	}, {
		path: '/Login',
		name: 'Login',
		component: Login
	}, {
		path: '/HomaManage',
		name: 'HomaManage',
		component: HomaManage
	}, {
		path: '/Goods',
		name: 'Goods',
		component: Goods
	}, {
		path: '*',
		name: '*',
		component: Login
	}]
});

export default router;
