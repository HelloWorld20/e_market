<!-- 历史订单 -->
<template>
	<section class="myorder">
		<van-nav-bar
			left-arrow
			fixed
			@click-left="$router.back()"
			title="历史订单"
		></van-nav-bar>
		<div class="myorder-addr">

		</div>
		<div class="myorder-cart"></div>
	</section>
</template>
<script>
import { NavBar } from 'vant';
export default {
	data() {
		return {};
	},
	components: {
		[NavBar.name]: NavBar
	}
};
</script>
<style scoped lang="less" src="./index.less"></style>
