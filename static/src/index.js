import Vue from 'vue';
import App from './App.vue';
import store from './store';
import router from './router';
import './common/rem';
import { Toast, Button, Dialog } from 'vant';

import '@/styles/app.less';

import 'vant/lib/index.css';

Vue.use(Toast);
Vue.use(Dialog);
window.Vue = Vue;

Vue.component(Button.name, Button);

new Vue({
	el: '#app',
	store,
	router,
	render: h => h(App)
});
