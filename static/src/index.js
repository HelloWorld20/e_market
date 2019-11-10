import Vue from 'vue';
import App from './App.vue';
import store from './store';
import router from './router';
import './common/rem';

import {Button} from 'mint-ui';

import 'mint-ui/lib/style.css';
import '@/styles/app.less';
import 'mint-ui/lib/style.css';

Vue.component(Button.name, Button);

new Vue({
	el: '#app',
	store,
	router,
	render: h => h(App)
});
