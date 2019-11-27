<template>
	<div class="cate">
		<div class="cate-menu">
			<side-menu
				:menuData="menuData"
				@menuChange="menuChange"
			></side-menu>
		</div>

	</div>
</template>

<script>
import SideMenu from '@components/SideMenu';
import { mapActions } from 'vuex';
import { addOrUpdateCart } from '../../http/apis';
export default {
	data() {
		return {
			menuData: [],
			goodsData: []
		};
	},
	components: { SideMenu },
	async mounted() {
		const menuData = await this.getCategory();
		if (menuData.length > 0) {
			const goodsData = await this.getGoods(menuData[0].id);

			this.menuData = menuData;
			this.goodsData = goodsData.data;
		}
	},
	methods: {
		...mapActions(['getCategory', 'getGoods']),
		async menuChange(id) {
			const goodsData = await this.getGoods(id);
			this.goodsData = goodsData.data;
		},
		async add2cart(goodsId) {
			await addOrUpdateCart(goodsId);
			this.$toast('添加购物车成功');
		},
		getImages(imageArr) {
			return `${window.location.protocol}//${imageArr[0]}`;
		}
	}
};
</script>

<style lang="less" scoped src="./index.less"></style>
