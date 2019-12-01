<!-- 历史订单 -->
<template>
	<section class="myorder">
		<van-nav-bar
			left-arrow
			fixed
			@click-left="$router.back()"
			title="历史订单"
		></van-nav-bar>
		<div class="myorder-content">
			<van-tabs v-model="activeName">
				<van-tab title="代付款" name="0">
					<vue-item
						v-for="item in orderData['0']"
						:key="item.id"
						:data="item"
					></vue-item>
				</van-tab>
				<van-tab title="待收货" name="1"
					><vue-item
						v-for="item in orderData['1']"
						:key="item.id"
						:data="item"
					></vue-item
				></van-tab>
				<van-tab title="已完成" name="2"
					><vue-item
						v-for="item in orderData['2']"
						:key="item.id"
						:data="item"
					></vue-item
				></van-tab>
				<van-tab title="所有" name="all"
					><vue-item
						v-for="item in orderData['all']"
						:key="item.id"
						:data="item"
					></vue-item
				></van-tab>
			</van-tabs>
		</div>
	</section>
</template>
<script>
import { NavBar, Tabs, Tab } from 'vant';
import VueItem from './Item';
import { getOrder } from '../../http/apis';
export default {
	data() {
		return {
			activeName: 0,
			orderData: {}
		};
	},
	components: {
		[NavBar.name]: NavBar,
		[Tabs.name]: Tabs,
		[Tab.name]: Tab,
		VueItem
	},
	methods: {
		init() {
			let status = null;
			if (this.activeName !== 'all') status = this.activeName;
			return getOrder(status).then(res => (this.orderData[0] = res));
		}
	},
	watch: {
		activeName(val) {
			this.$nextTick(() =>
				console.log(this.orderData, this.orderData[val])
			);
			if (val === 'all') {
				getOrder().then(res => this.$set(this.orderData, 'all', res));
			} else {
				getOrder(val).then(res => this.$set(this.orderData, val, res));
			}
		}
	}
};
</script>
<style scoped lang="less" src="./index.less"></style>
