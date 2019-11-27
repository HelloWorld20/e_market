<template>
	<section class="edit">
		<mt-field
			label="姓名"
			placeholder="请输入姓名"
			v-model="name"
		></mt-field>
		<mt-field
			label="手机号"
			placeholder="请输入手机号"
			type="tel"
			v-model="phone"
		></mt-field>
		<mt-field
			label="详细地址"
			placeholder="请输入详细地址"
			type="textarea"
			rows="4"
			v-model="addr"
		></mt-field>
		<div class="edit-control">
			<mt-button @click="handleConfirm" type="primary">确认修改</mt-button>
			<mt-button @click="handleCancel">取消修改</mt-button>
		</div>
	</section>
</template>

<script>
import { Field } from 'mint-ui';
import { mapActions } from 'vuex';
export default {
	data() {
		return {
			name: '',
			phone: '',
			addr: ''
		};
	},
	components: {
		[Field.name]: Field
	},
	created() {
		this.$on('setValue', this.valueChange);
		this.$on('clearValue', this.clearValue);
	},
	methods: {
		...mapActions(['getAddr']),
		handleConfirm() {
			this.$emit('close');
			// 校验
			this.$emit('valueChange', {
				name: this.name,
				phone: this.phone,
				addr: this.addr
			});
			this.clearValue();
		},
		handleCancel() {
			this.$emit('close');
			this.clearValue();
		},
		valueChange(name, phone, addr) {
			this.name = name;
			this.phone = phone;
			this.addr = addr;
		},
		clearValue() {
			this.name = '';
			this.phone = null;
			this.addr = '';
		}
	},
	beforeDestroyed() {
		this.$off('setValue', this.valueChange);
		this.$off('clearValue', this.clearValue);
	}
};
</script>

<style lang="less" scoped src="./Edit.less"></style>
