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
					<van-button
						type="primary"
						icon="cart-o"
						@click="add2cart(item.id)"
					></van-button>
				</div>
			</van-card>
		</div>
	</div>
</template>

<script>
import { Sidebar, SidebarItem, Card } from 'vant';
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
		[Sidebar.name]: Sidebar,
		[SidebarItem.name]: SidebarItem,
		[Card.name]: Card
	},
	async mounted() {
		const id = this.$route.query.id;
		const menuData = await this.getCategory();
		this.menuData = menuData;
		if (id) {
			this.activeKey = menuData.findIndex(v => id === v.id);
			const goodsData = await this.getGoods(id);
			this.goodsData = goodsData.data;
		} else {
			if (menuData.length > 0) {
				const goodsData = await this.getGoods(menuData[0].id);
				this.goodsData = goodsData.data;
			}
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
