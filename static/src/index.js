import Vue from 'vue';
import App from './App.vue';
import store from './store';
import router from './router';
import './common/rem';

import mint, { Button, MessageBox, Toast } from 'mint-ui';

import 'mint-ui/lib/style.css';
import '@/styles/app.less';
import 'mint-ui/lib/style.css';
import '@/styles/theme.less';

Vue.component(Button.name, Button);
window.mint = mint;
window.MessageBox = MessageBox;
window.Vue = Vue;
Vue.prototype.$message = opts => MessageBox(opts);
Vue.prototype.$confirm = MessageBox.confirm;

Vue.prototype.$toast = opts => Toast(opts);

new Vue({
	el: '#app',
	store,
	router,
	render: h => h(App)
});
