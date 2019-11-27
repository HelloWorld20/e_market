import Vue from 'vue';
import Router from 'vue-router';

import Home from '@/pages/Home';
import Category from '@/pages/Category';
import Me from '@/pages/Me';
import Cart from '@/pages/Cart';
import Addr from '@/pages/Addr';

Vue.use(Router);

export default new Router({
	routes: [{
		path: '/',
		name: 'Root',
		component: Home
	}, {
		path: '/Home',
		name: 'Home',
		component: Home
	}, {
		path: '/Category',
		name: 'Category',
		component: Category
	}, {
		path: '/Me',
		name: 'Me',
		component: Me
	}, {
		path: '/Cart',
		name: 'Cart',
		component: Cart
	}, {
		path: '/Addr',
		name: 'Addr',
		component: Addr
	}, {
		path: '/*',
		name: 'WildMatch',
		component: Home
	}]
});
