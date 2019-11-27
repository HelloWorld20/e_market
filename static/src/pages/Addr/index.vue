<template>
	<section class="addr">
		<mt-header fixed title="我的地址"></mt-header>
		<div class="addr-content">
			<div class="addr-content-item">
				<div class="item-msg"></div>
				<div class="item-control">
					<mt-button>编辑</mt-button>
					<mt-button>删除</mt-button>
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
// import { mapActions } from 'vuex';
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
		// ...mapActions(['getUserInfo']),
		init() {
			// this.getUserInfo().then(userInfo => (this.addrs = userInfo.addr));
			getAddr().then(res => console.log(res));
		},
		newAddr() {
			this.$refs['edit'].$emit('clearValue');
			this.showPopup = true;
		},
		valueChange(value) {
			addOrUpdateAddr({ ...value });
			// console.log(value);
		},
		closePopup() {}
	}
};
</script>

<style lang="less" scoped src="./index.less"></style>
