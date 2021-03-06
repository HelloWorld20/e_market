import Vue from 'vue';
import App from './App.vue';
import store from './store';
import router from './router';
import { Loading, InputNumber, Button, Input, Select, Option, Divider, Checkbox, Link, Tag, Message } from 'element-ui';

import 'element-ui/lib/theme-chalk/index.css';
import '@/styles/app.less';


Vue.use(Loading);
Vue.component(Button.name, Button);
Vue.component(Input.name, Input);
Vue.component(InputNumber.name, InputNumber);
Vue.component(Select.name, Select);
Vue.component(Option.name, Option);
Vue.component(Divider.name, Divider);
Vue.component(Checkbox.name, Checkbox);
Vue.component(Link.name, Link);
Vue.component(Tag.name, Tag);

Vue.prototype.$message = function(opts) {
	Message(opts);
};

window.Vue = Vue;

new Vue({
	el: '#app',
	store,
	router,
	render: h => h(App)
});
