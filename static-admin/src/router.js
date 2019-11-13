import Vue from 'vue';
import Router from 'vue-router';

import Helloworld from '@/pages/Helloworld';
import Category from '@/pages/Category';
import Login from '@/pages/Login';

Vue.use(Router);
const router = new Router({
	routes: [{
		path: '/',
		name: '',
		component: Helloworld
	}, {
		path: '/Category',
		name: 'Category',
		component: Category
	}, {
		path: '/Login',
		name: 'Login',
		component: Login
	}, {
		path: '*',
		name: '*',
		component: Login
	}]
});

export default router;
