import Vue from 'vue';
import App from './App.vue';
import store from './store';
import router from './router';
// import { Indicator } from 'mint-ui';

import '@/styles/app.scss';
import 'mint-ui/lib/style.css';


new Vue({
	el: '#app',
	store,
	router,
	render: h => h(App)
});
