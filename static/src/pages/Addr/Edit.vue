<template>
	<section class="edit">
		<van-nav-bar title="编辑我的地址"></van-nav-bar>
		<van-field
			required
			clearable
			label="姓名"
			placeholder="请输入姓名"
			v-model="name"
			:error-message="errName"
		></van-field>
		<van-field
			required
			clearable
			label="手机号"
			placeholder="请输入手机号"
			type="number"
			v-model="phone"
			:error-message="errPhone"
		></van-field>
		<van-field
			required
			clearable
			label="详细地址"
			placeholder="请输入详细地址"
			type="textarea"
			rows="4"
			:error-message="errAddr"
			v-model="addr"
		></van-field>
		<div class="edit-control">
			<van-button @click="handleConfirm" type="primary">确认</van-button>
			<van-button @click="handleCancel">取消</van-button>
		</div>
	</section>
</template>

<script>
import { Field, NavBar } from 'vant';
import { mapActions } from 'vuex';

const ERR = {
	RQ_NAME: '请输入姓名',
	RQ_PHONE: '请输入手机号',
	RQ_ADDR: '请输入地址'
};

export default {
	data() {
		return {
			id: null,
			name: '',
			phone: '',
			addr: '',
			errName: '',
			errPhone: '',
			errAddr: ''
		};
	},
	components: {
		[NavBar.name]: NavBar,
		[Field.name]: Field
	},
	created() {
		this.$on('setValue', this.valueChange);
		this.$on('clearValue', this.clearValue);
	},
	methods: {
		...mapActions(['getAddr']),
		handleConfirm() {
			// 校验
			if (!this.name) {
				this.clearErr();
				this.errName = ERR.RQ_NAME;
				return;
			}
			if (!this.phone) {
				this.clearErr();
				this.errPhone = ERR.RQ_PHONE;
				return;
			}
			if (!this.addr) {
				this.clearErr();
				this.errPhone = ERR.RQ_ADDR;
				return;
			}
			this.$emit('close');
			this.$emit('valueChange', {
				id: this.id,
				name: this.name,
				phone: this.phone,
				addr: this.addr
			});
			this.clearErr();
			this.clearValue();
		},
		handleCancel() {
			this.$emit('close');
			this.clearErr();
			this.clearValue();
		},
		valueChange({ id, name, phone, addr }) {
			this.id = id;
			this.name = name;
			this.phone = phone;
			this.addr = addr;
		},
		clearValue() {
			this.id = null;
			this.name = '';
			this.phone = null;
			this.addr = '';
		},
		clearErr() {
			this.errName = '';
			this.errPhone = '';
			this.errAddr = '';
		}
	},
	beforeDestroyed() {
		this.$off('setValue', this.valueChange);
		this.$off('clearValue', this.clearValue);
	}
};
</script>

<style lang="less" scoped src="./Edit.less"></style>
