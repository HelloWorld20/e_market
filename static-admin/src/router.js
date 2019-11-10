import Vue from 'vue';
import Router from 'vue-router';

import Helloworld from '@/pages/Helloworld';
import Category from '@/pages/Category';

Vue.use(Router);

export default new Router({
	routes: [{
		path: '/',
		component: Helloworld
	}, {
		path: '/Category',
		component: Category
	}]
});
