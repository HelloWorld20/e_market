<template>
	<el-dialog title="商品操作" :visible.sync="visible">
		<el-form :model="form">
			<el-form-item label="分类名称" :label-width="formLabelWidth">
				<el-input v-model="form.name" autocomplete="off"></el-input>
			</el-form-item>
			<el-form-item label="分类优先级" :label-width="formLabelWidth">
				<el-input-number v-model="form.preority"></el-input-number>
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
import { Dialog, Form, FormItem } from "element-ui";
export default {
	data() {
		return {
			form: {
				name: "",
				preority: 0,
				id: undefined
			},
			formLabelWidth: "120px"
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
	}
};
</script>

<style lang="less" scope></style>
