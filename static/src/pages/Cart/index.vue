<template>
	<section class="cart">
		<mt-header fixed title="购物车"></mt-header>
		<div class="cart-content">
			<div
				class="cart-content-item"
				:key="item.id"
				v-for="(item, index) in cartsData"
			>
				<div class="item-delete" @click="handleDelete(item.id)">
					删除
				</div>
				<div
					class="item-image"
					:style="{
						backgroundImage: `url(${getImage(item.images)})`
					}"
				></div>
				<div class="item-content">
					<div class="item-content-title">{{ item.name }}</div>
					<div class="item-content-prise">
						单价：￥{{ item.prise }}{{ item.unit }}<br />
						总价：<b>￥{{ item.totalPrise }}</b>
					</div>
				</div>
				<div class="item-control">
					<div
						class="item-control-sub item-control-btn"
						@click="subNumber(index)"
					>
						-
					</div>
					<div class="item-control-number">{{ item.number }}</div>
					<div
						class="item-control-add item-control-btn"
						@click="addNumber(index)"
					>
						+
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
import { Header } from 'mint-ui';
import { mapActions } from 'vuex';
import { getCart, addOrUpdateCart, delCart } from '../../http/apis';
import * as _ from 'lodash';
export default {
	data() {
		return {
			cartsData: [],
			addOrUpdateCart: () => {}
		};
	},
	components: {
		[Header.name]: Header
	},
	async created() {
		this.addOrUpdateCart = this.createAddOrUpdateCart();
		this.init();
	},
	methods: {
		...mapActions(['getUserInfo']),
		init() {
			return getCart().then(cartsData => (this.cartsData = cartsData));
		},
		async addNumber(index) {
			if (this.cartsData[index].number >= this.cartsData[index].restNum) {
				this.$toast('库存不足');
				return;
			}
			this.cartsData[index].number++;
			const goods = this.cartsData[index];
			await this.addOrUpdateCart(goods.id, goods.number);
			this.init();
		},
		async subNumber(index) {
			if (this.cartsData[index].number === 0) return;
			this.cartsData[index].number--;
			const goods = this.cartsData[index];
			await this.addOrUpdateCart(goods.id, goods.number);
			this.init();
		},
		async handleDelete(goodsId) {
			this.$confirm('确定要删除吗？', '删除提示').then(async() => {
				await delCart(goodsId);
				await this.init();
				this.$toast('删除成功');
			});
		},
		getImage(imgArr) {
			return `${window.location.protocol}//${imgArr[0]}`;
		},
		createAddOrUpdateCart() {
			return _.debounce(async(id, number) => {
				return addOrUpdateCart(id, number);
			}, 500);
		}
	}
};
</script>

<style lang="less" scoped src="./index.less"></style>
