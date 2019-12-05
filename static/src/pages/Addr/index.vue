<template>
	<section class="addr">
		<van-nav-bar
			fixed
			left-arrow
			@click-left="$router.back()"
			title="我的地址"
		></van-nav-bar>
		<div class="addr-content">
			<van-contact-card @click="newAddr"></van-contact-card>
			<vue-addr
				:addrs="addrs"
				@handleEdit="handleEdit"
				@handleDelete="handleDelete"
			></vue-addr>
		</div>

		<van-popup v-model="showPopup" position="right">
			<vue-edit
				ref="edit"
				@close="showPopup = false"
				@valueChange="valueChange"
			></vue-edit>
		</van-popup>
	</section>
</template>

<script>
import { NavBar, Popup, ContactCard } from 'vant';
import { getAddr, addOrUpdateAddr, delAddr } from '../../http/apis';
import VueEdit from './Edit';
import VueAddr from '../../components/Addr';
export default {
	data() {
		return {
			showPopup: false,
			addrs: []
		};
	},
	components: {
		[NavBar.name]: NavBar,
		[Popup.name]: Popup,
		[ContactCard.name]: ContactCard,
		VueEdit,
		VueAddr
	},
	created() {
		this.init();
	},
	methods: {
		init() {
			return getAddr().then(res => (this.addrs = res));
		},
		newAddr() {
			this.showPopup = true;
			this.$nextTick(() => this.$refs['edit'].$emit('clearValue'));
		},
		handleEdit({ id, orderName, orderPhone, orderAddr }) {
			this.showPopup = true;
			this.$nextTick(() => {
				this.$refs['edit'].$emit('setValue', {
					id,
					name: orderName,
					phone: orderPhone,
					addr: orderAddr
				});
			});
		},
		async handleDelete(id) {
			this.$dialog
				.confirm({
					title: '删除提示',
					message: '确定要删除吗？'
				})
				.then(async () => {
					await delAddr(id);
					await this.init();
					this.$toast('删除成功');
				});
		},
		async valueChange(value) {
			await addOrUpdateAddr({ ...value });
			await this.init();
			this.$toast('更新成功');
		},
		closePopup() {}
	}
};
</script>

<style lang="less" scoped src="./index.less"></style>
