<template>
	<el-dialog title="商品操作" :visible.sync="visible">
		<el-form :model="form">
			<el-form-item label="商品名称" label-width="120px">
				<el-input v-model="form.name" autocomplete="off"></el-input>
			</el-form-item>
			<el-form-item label="商品描述" label-width="120px">
				<el-input-number v-model="form.desc"></el-input-number>
			</el-form-item>
			<el-form-item label="商品价格" label-width="120px">
				<el-input-number v-model="form.prise"></el-input-number>
			</el-form-item>
			<el-form-item label="价格单位" label-width="120px">
				<el-input-number v-model="form.unit"></el-input-number>
			</el-form-item>
			<el-form-item label="所属分类" label-width="120px">
				<el-input-number v-model="form.category"></el-input-number>
			</el-form-item>
			<el-form-item label="商品图片" label-width="120px">
				<el-input-number v-model="form.image"></el-input-number>
			</el-form-item>
			<el-form-item label="商品总库存" label-width="120px">
				<el-input-number v-model="form.totalNum"></el-input-number>
			</el-form-item>
			<el-form-item label="商品当前库存" label-width="120px">
				<el-input-number v-model="form.restNum"></el-input-number>
			</el-form-item>
		</el-form>
		<div slot="footer" class="dialog-footer">
			<el-button @click="$emit('close')">取 消</el-button>
			<el-button type="primary" @click="$emit('submit', form)"
				>确 定</el-button
			>
		</div>
	</el-dialog>
</template>

<script>
import { Dialog, Form, FormItem } from 'element-ui';
export default {
	data() {
		return {
			form: {
				name: '',
				desc: '',
				prise: 0,
				unit: '',
				category: 0,
				images: '',
				totalNum: 1,
				restNum: 1,
				id: undefined
			}
		};
	},
	components: {
		[Dialog.name]: Dialog,
		[Form.name]: Form,
		[FormItem.name]: FormItem
	},
	props: {
		visible: {
			require: true,
			type: Boolean,
			default: false
		}
	},
	created() {
		this.$on('setDialogValue', this.setDialogValue);
		this.$on('clearDialogValue', this.clearValue);
	},
	methods: {
		setDialogValue(opts) {
			this.form.name = opts.name;
			this.form.desc = opts.desc;
			this.form.prise = opts.prise;
			this.form.unit = opts.unit;
			this.form.category = opts.category;
			this.form.images = opts.images;
			this.form.totalNum = opts.totalNum;
			this.form.restNum = opts.restNum;
			if (opts.id) {
				this.form.id = opts.id;
			} else {
				this.form.id = undefined;
			}
		},
		clearValue() {
			this.form = {
				name: '',
				desc: '',
				prise: 0,
				unit: '',
				category: 0,
				images: '',
				totalNum: 1,
				restNum: 1,
				id: undefined
			};

		}
	},
	beforeDestroyed() {
		this.$off('setDialogValue', this.setDialogValue);
	}
};
</script>

<style lang="less" scope></style>
