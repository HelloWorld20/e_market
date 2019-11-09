import Vue from 'vue';
import Router from 'vue-router';

import Helloworld from '@/pages/Helloworld';
import Home from '@/pages/Home';
import Category from '@/pages/Category';
import Me from '@/pages/Me';
import Cart from '@/pages/Cart';

Vue.use(Router);

export default new Router({
	routes: [{
		path: '/',
		component: Helloworld
	}, {
		path: '/Home',
		component: Home
	}, {
		path: '/Category',
		component: Category
	}, {
		path: '/Me',
		component: Me
	}, {
		path: '/Cart',
		component: Cart
	}, {
		path: '/*',
		component: Home
	}]
});
