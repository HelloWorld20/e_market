<template>
	<section class="addr">
		<mt-header fixed title="我的地址"></mt-header>
		<div class="addr-content">
			<div class="addr-content-item" :key="item.id" v-for="item in addrs">
				<div class="item-msg">
					<div class="item-msg-addr">{{ item.orderAddr }}</div>
					<div class="item-msg-contact">
						<div class="item-msg-contact-name">
							{{ item.orderName }}
						</div>
						<div class="item-msg-contact-phone">
							{{ item.orderPhone }}
						</div>
					</div>
				</div>
				<div class="item-control">
					<mt-button @click="handleEdit(item)" type="primary"
						>编辑</mt-button
					>
					<mt-button @click="handleDelete(item.id)" type="danger"
						>删除</mt-button
					>
				</div>
			</div>
		</div>
		<mt-button @click="newAddr" type="primary" style="width: 100%"
			>新增地址</mt-button
		>
		<mt-popup v-model="showPopup" position="right">
			<vue-edit
				ref="edit"
				@close="showPopup = false"
				@valueChange="valueChange"
			></vue-edit>
		</mt-popup>
	</section>
</template>

<script>
import { Header, Field, Popup } from 'mint-ui';
import { getAddr, addOrUpdateAddr } from '../../http/apis';
import VueEdit from './Edit';
export default {
	data() {
		return {
			showPopup: false,
			addrs: []
		};
	},
	components: {
		[Header.name]: Header,
		[Field.name]: Field,
		[Popup.name]: Popup,
		VueEdit
	},
	created() {
		this.init();
	},
	methods: {
		init() {
			return getAddr().then(res => (this.addrs = res));
		},
		newAddr() {
			this.$refs['edit'].$emit('clearValue');
			this.showPopup = true;
		},
		async handleEdit({id, orderName, orderPhone, orderAddr}) {
			this.$refs['edit'].$emit('setValue', {
				id,
				name: orderName,
				phone: orderPhone,
				addr: orderAddr
			});
			this.showPopup = true;
			await this.init();
			this.$toast('更新成功');
		},
		handleDelete(id) {

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
