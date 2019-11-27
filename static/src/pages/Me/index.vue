<template>
	<section class="me">
		<mt-header fixed title="我的"></mt-header>
		<div class="me-content">
			<div
				class="me-content-avatar"
				:style="{ backgroundImage: `url(${userInfo.headimgurl})` }"
			></div>
			<div class="me-content-name">{{userInfo.nickName}}</div>
			<div class="me-content-cell">
				<mt-cell title="我的订单" is-link ></mt-cell>
				<mt-cell title="我的地址" is-link to="/Addr"></mt-cell>
				<mt-cell title="关于" is-link></mt-cell>
			</div>
		</div>
	</section>
</template>

<script>
import { Header, Cell } from 'mint-ui';
import { mapActions } from 'vuex';
export default {
	data() {
		return {
			userInfo: {}
		};
	},
	components: {
		[Header.name]: Header,
		[Cell.name]: Cell
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
