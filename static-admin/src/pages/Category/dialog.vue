<template>
	<el-dialog
		title="分类操作"
		:visible.sync="visible"
		:before-close="() => $emit('close')"
	>
		<el-form :model="form" :rules="rules" ref="form">
			<el-form-item prop="name" label="分类名称" label-width="120px">
				<el-input v-model="form.name" autocomplete="off"></el-input>
			</el-form-item>
			<el-form-item label="分类优先级" label-width="120px">
				<el-input-number v-model="form.preority"></el-input-number>
			</el-form-item>
			<el-form-item prop="image" label="商品图片:" label-width="120px">
				<el-upload
					class="uploader"
					:action="uploadUrl"
					:show-file-list="false"
					:on-success="handleUploadSuccess"
					:before-upload="beforeUpload"
				>
					<img v-if="imageUrl" :src="imageUrl" class="preview" />
					<i v-else class="el-icon-plus uploader-icon"></i>
				</el-upload>
			</el-form-item>
		</el-form>
		<div slot="footer" class="dialog-footer">
			<el-button @click="$emit('close')">取 消</el-button>
			<el-button type="primary" @click="handleSubmit">确 定</el-button>
		</div>
	</el-dialog>
</template>

<script>
import { Dialog, Form, FormItem, Upload } from 'element-ui';
import apis from '../../http/apis';
export default {
	data() {
		return {
			uploadUrl: apis.upload,
			imageUrl: '',
			form: {
				name: '',
				preority: 0,
				id: undefined
			},
			rules: {
				name: [
					{
						required: true,
						message: '请输入分类名称',
						trigger: 'blur'
					}
				]
			}
		};
	},
	created() {
		this.$on('setValue', this.setValue);
		this.$on('clearValue', this.clearValue);
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
		[FormItem.name]: FormItem,
		[Upload.name]: Upload
	},
	methods: {
		setValue(opts) {
			this.form.name = opts.name;
			this.form.preority = opts.preority;
			if (opts.id) {
				this.form.id = opts.id;
			} else {
				this.form.id = undefined;
			}
			if (opts.images.length > 0) {
				this.imageUrl = `${window.location.protocol}//${opts.images[0]}`;
			}
		},
		clearValue() {
			this.form = { name: '', preority: 0 };
			this.imageUrl = '';
		},
		handleSubmit() {
			this.$refs['form'].validate(valid => {
				if (valid) {
					this.$emit('submit', this.form);
				}
			});
		},
		beforeUpload(file) {
			const isExt =
				file.type === 'image/jpeg' || file.type === 'image/png';
			const isLt2M = file.size / 1024 / 1024 < 1;
			let message = '';
			if (!isExt) {
				message = '上传格式只能是png，jpg，jpeg';
			}
			if (!isLt2M) {
				message = '上传头像图片大小不能超过 2MB!';
			}

			if (message) {
				this.$message({ message, type: 'error' });
				return false;
			}
			return true;
		},
		handleUploadSuccess(data) {
			const url = data.data;
			this.imageUrl = `${window.location.protocol}//${url}`;
			this.form.images = [url];
		}
	},
	beforeDestroyed() {
		this.$off('setValue', this.setValue);
		this.$off('clearValue', this.clearValue);
	}
};
</script>

<style lang="less" scoped>
.uploader .el-upload {
	border: 1px dashed #d9d9d9;
	border-radius: 6px;
	cursor: pointer;
	position: relative;
	overflow: hidden;
	.el-upload:hover {
		border-color: #409eff;
	}
	.uploader-icon {
		font-size: 28px;
		color: #8c939d;
		width: 100px;
		height: 100px;
		line-height: 100px;
		text-align: center;
	}
	.preview {
		width: 100px;
		height: 100px;
		display: block;
	}
}
</style>
