<template>
	<el-dialog title="分类操作" :visible.sync="visible" :before-close="() => $emit('close')">
		<el-form :model="form" :rules="rules" ref="form">
			<el-form-item prop="name" label="分类名称" label-width="120px">
				<el-input v-model="form.name" autocomplete="off"></el-input>
			</el-form-item>
			<el-form-item label="分类优先级" label-width="120px">
				<el-input-number v-model="form.preority"></el-input-number>
			</el-form-item>
		</el-form>
		<div slot="footer" class="dialog-footer">
			<el-button @click="$emit('close')">取 消</el-button>
			<el-button type="primary" @click="handleSubmit"
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
				preority: 0,
				id: undefined
			},
			// formLabelWidth: '120px',
			rules: {
				name: [
					{ required: true, message: '请输入分类名称', trigger: 'blur' }
				]
			}
		};
	},
	created() {
		this.$on('setDialogValue', this.setDialogValue);
	},
	props: {
		visible: {
			require: true,
			type: Boolean,
			default: false
		}
	},
	components: {
		[Dialog.name]: Dialog,
		[Form.name]: Form,
		[FormItem.name]: FormItem
	},
	methods: {
		setDialogValue(opts) {
			this.form.name = opts.name;
			this.form.preority = opts.preority;
			if (opts.id) {
				this.form.id = opts.id;
			} else {
				this.form.id = undefined;
			}
		},
		handleSubmit() {
			// console.log('beforeClose');
			this.$refs['form'].validate(valid => {
				if (valid) {
					console.log('submit');
					this.$emit('submit', this.form);
				}
			});
		}
	},
	beforeDestroyed() {
		this.$off('setDialogValue', this.setDialogValue);
	}
};
</script>

<style lang="less" scoped></style>
