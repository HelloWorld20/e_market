<template>
	<section class="order">
		<mt-header fixed title="我的地址"></mt-header>
		<div class="order-content">
			<!-- :key="item.id" -->
				<!-- v-for="(item, index) in ordersData" -->
			<div
				class="order-content-item"

			>


			</div>
		</div>
	</section>
</template>
<script>
import { Header } from 'mint-ui';
export default {
	data() {
		return {};
	},
	components: {
		[Header.name]: Header
	}
};
</script>
<style scoped lang="less" src="./index.less"></style>
