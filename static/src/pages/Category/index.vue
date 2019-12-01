<template>
	<div class="cate">
		<van-sidebar v-model="activeKey">
			<van-sidebar-item
				v-for="item in menuData"
				:key="item.id"
				:title="item.name"
			></van-sidebar-item>
		</van-sidebar>
		<div class="cate-item">
			<van-card
				v-for="item in goodsData"
				:key="item.id"
				class="goods-item"
				:thumb="getImages(item.images)"
				:desc="item.desc"
				:title="item.name"
				:prise="item.prise"
			>
				<div slot="footer">
					<van-button type="primary" @click="add2cart(item.id)"
						>加入购物车</van-button
					>
				</div>
			</van-card>
		</div>
	</div>
</template>

<script>
import SideMenu from '@components/SideMenu';
import { Sidebar, SidebarItem, Grid, GridItem, Card } from 'vant';
import { mapActions } from 'vuex';
import { addOrUpdateCart } from '../../http/apis';
export default {
	data() {
		return {
			activeKey: '',
			menuData: [],
			goodsData: []
		};
	},
	components: {
		SideMenu,
		[Sidebar.name]: Sidebar,
		[SidebarItem.name]: SidebarItem,
		[Grid.name]: Grid,
		[GridItem.name]: GridItem,
		[Card.name]: Card
	},
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
	},
	watch: {
		async activeKey(index) {
			const id = this.menuData[index].id;
			const goodsData = await this.getGoods(id);
			this.goodsData = goodsData.data;
		}
	}
};
</script>

<style lang="less" scoped src="./index.less"></style>
