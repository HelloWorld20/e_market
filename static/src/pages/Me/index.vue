<template>
	<section class="me">
		<van-nav-bar title="我的"></van-nav-bar>
		<div class="me-content">
			<div
				class="me-content-avatar"
				:style="{ backgroundImage: `url(${userInfo.headimgurl})` }"
			></div>
			<div class="me-content-name">{{ userInfo.nickName }}</div>
			<div class="me-content-cell">
				<van-cell title="我的订单" is-link to="/MyOrder"></van-cell>
				<van-cell title="我的地址" is-link to="/Addr"></van-cell>
				<van-cell
					title="关于"
					is-link
					@click="showPopUp = true"
				></van-cell>
			</div>
		</div>
		<van-popup
			v-model="showPopUp"
			round
			position="bottom"
			:style="{ height: '20%' }"
		>
			<div class="popup">
				版本：1.0.0
				开发者：292701515@qq.com
			</div>
		</van-popup>
	</section>
</template>

<script>
import { NavBar, Cell, Popup } from 'vant';
import { mapActions } from 'vuex';
export default {
	data() {
		return {
			userInfo: {},
			showPopUp: false
		};
	},
	components: {
		[NavBar.name]: NavBar,
		[Cell.name]: Cell,
		[Popup.name]: Popup
	},
	created() {
		this.init();
	},
	methods: {
		...mapActions(['getUserInfo']),
		init() {
			this.getUserInfo().then(userInfo => (this.userInfo = userInfo));
		}
	}
};
</script>

<style lang="less" scoped src="./index.less"></style>
