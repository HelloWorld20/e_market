<template>
	<div class="cate">
		<div class="cate-menu">
			<side-menu
				:menuData="menuData"
				@menuChange="menuChange"
			></side-menu>
		</div>
		<div class="cate-list">
			<ul>
				<li
					class="cate-list-item"
					:key="item.id"
					v-for="item in goodsData"
				>
					<div
						class="item-image"
						:style="{
							backgroundImage: `url(${getImages(item.images)})`
						}"
					></div>
					<div class="content">
						<div class="item-content-title">{{ item.name }}</div>
						<div class="item-content-prise">
							单价：<b>￥{{ item.prise }}{{ item.unit }}</b
							><br />
						</div>
					</div>
					<div class="item-control">
						<mt-button
							@click="add2cart(item.id)"
							type="primary"
							plain
							size="small"
							>添加购物车</mt-button
						>
					</div>
				</li>
			</ul>
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
			await addOrUpdateCart(goodsId, 1);
			this.$toast('添加购物车成功');
		},
		getImages(imageArr) {
			return `${window.location.protocol}//${imageArr[0]}`;
		}
	}
};
</script>

<style lang="less" scoped src="./index.less"></style>
