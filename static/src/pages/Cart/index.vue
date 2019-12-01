<template>
	<section class="cart">
		<van-nav-bar title="购物车" fixed></van-nav-bar>
		<div class="cart-content">
			<vue-cart
				:cartsData="cartsData"
				@handleDelete="handleDelete"
				@subNumber="subNumber"
				@addNumber="addNumber"
			></vue-cart>
		</div>
		<van-submit-bar
			@submit="$router.push('/Order')"
			:price="totalPrise"
			button-text="去结算"
		></van-submit-bar>
	</section>
</template>

<script>
import { NavBar, SubmitBar } from 'vant';
import { mapActions, mapMutations } from 'vuex';
import { getCart, addOrUpdateCart, delCart } from '../../http/apis';
import VueCart from '../../components/Cart';
import * as _ from 'lodash';
export default {
	data() {
		return {
			totalPrise: 0,
			cartsData: [],
			addOrUpdateCart: () => {}
		};
	},
	components: {
		[NavBar.name]: NavBar,
		[SubmitBar.name]: SubmitBar,
		VueCart
	},
	async created() {
		this.addOrUpdateCart = this.createDebounce(addOrUpdateCart);
		this.debounceInit = this.createDebounce(this.init);
		this.init();
	},
	methods: {
		...mapActions(['getUserInfo']),
		...mapMutations(['updateCartData']),
		init() {
			return getCart().then(cartsData => {
				this.cartsData = cartsData.cart;
				this.totalPrise = cartsData.totalPrise * 100;
				this.updateCartData(cartsData);
			});
		},
		async addNumber(index) {
			if (this.cartsData[index].number >= this.cartsData[index].restNum) {
				this.$toast('库存不足');
				return;
			}
			this.cartsData[index].number++;
			const goods = this.cartsData[index];
			await this.addOrUpdateCart(goods.id, goods.number);
			this.debounceInit();
		},
		async subNumber(index) {
			if (this.cartsData[index].number <= 1) return;
			this.cartsData[index].number--;
			const goods = this.cartsData[index];
			await this.addOrUpdateCart(goods.id, goods.number);
			this.debounceInit();
		},
		handleDelete(goodsId) {
			this.$dialog
				.confirm({
					title: '删除提示',
					message: '确定要删除吗？'
				})
				.then(async() => {
					await delCart(goodsId);
					await this.init();
					this.$toast('删除成功');
				});
		},
		createDebounce(cb) {
			return _.debounce(async(id, number) => {
				return cb(id, number);
			}, 500);
		}
	}
};
</script>

<style lang="less" scoped src="./index.less"></style>
