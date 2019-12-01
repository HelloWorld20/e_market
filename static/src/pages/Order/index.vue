<!-- 创建订单 -->
<template>
	<section class="order">
		<van-nav-bar
			left-arrow
			fixed
			@click-left="$router.back()"
			title="填写订单"
		></van-nav-bar>

		<div class="order-content">
			<van-contact-card
				class="contact"
				@click="showPopup = true"
				type="edit"
				:name="addr.name"
				:tel="addr.phone"
			></van-contact-card>
			<vue-cart :cartsData="cartsData.cart" :type="'display'"></vue-cart>
		</div>

		<van-submit-bar
			@submit="handleCreateOrder"
			:price="cartsData.totalPrise * 100"
			button-text="提交订单"
		></van-submit-bar>
		<van-popup
			v-model="showPopup"
			position="right"
			style="width: 100vw;height: 100vh"
		>
			<vue-addr
				:addrs="addrs"
				type="choose"
				@itemClick="addrClick"
			></vue-addr>
			<van-button
				type="primary"
				@click="showPopup = false"
				style="width: 95%; margin: 0 auto; display: block"
				>取消</van-button
			>
		</van-popup>
	</section>
</template>
<script>
import { NavBar, ContactCard, SubmitBar, Popup } from 'vant';
import { mapGetters } from 'vuex';
import { getAddr } from '../../http/apis';
import VueAddr from '../../components/Addr';
import VueCart from '../../components/Cart';
export default {
	data() {
		return {
			addr: {
				id: -1,
				name: '',
				phone: '',
				addr: ''
			},
			addrs: [],
			showPopup: false
		};
	},
	components: {
		[NavBar.name]: NavBar,
		[ContactCard.name]: ContactCard,
		[Popup.name]: Popup,
		[SubmitBar.name]: SubmitBar,
		VueAddr,
		VueCart
	},
	mounted() {
		this.init();
		this.addAddr2html();
		console.log('cartsData', this.cartsData);
	},
	computed: {
		...mapGetters(['cartsData'])
	},
	methods: {
		init() {
			getAddr().then(res => {
				this.addrs = res;
				if (res.length > 0) {
					const addr = res[0];
					this.addr.name = addr.orderName;
					this.addr.phone = addr.orderPhone;
					this.addr.addr = addr.orderAddr;
					this.addAddr2html(this.addr.addr);
				}
			});
		},
		handleCreateOrder() {
			console.log('创建订单');
		},
		addrClick(item) {
			this.showPopup = false;
			this.addr.name = item.orderName;
			this.addr.phone = item.orderPhone;
			this.addr.addr = item.orderAddr;
			this.addAddr2html(item.orderAddr);
		},
		addAddr2html(addr) {
			if (!addr) return;
			const wrapper = this.$el.querySelector('.contact .van-cell__value');
			let addrHtml = null;
			if (wrapper.childElementCount >= 3) {
				addrHtml = wrapper.children[2];
				console.log(wrapper, wrapper.children);
				addrHtml.innerHTML = `地址： ${addr}`;
			} else {
				addrHtml = document.createElement('div');
				addrHtml.innerHTML = `地址： ${addr}`;
				wrapper.appendChild(addrHtml);
			}
		}
	}
};
</script>
<style scoped lang="less" src="./index.less"></style>
