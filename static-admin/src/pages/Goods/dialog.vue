<template>
	<el-dialog
		title="商品操作"
		:visible.sync="visible"
		:before-close="() => $emit('close')"
	>
		<el-form :model="form" :rules="rules" ref="form">
			<el-form-item prop="name" label="商品名称:" label-width="120px">
				<el-input v-model="form.name" autocomplete="off"></el-input>
			</el-form-item>
			<el-form-item prop="desc" label="商品描述:" label-width="120px">
				<el-input v-model="form.desc"></el-input>
			</el-form-item>
			<el-form-item prop="prise" label="商品价格:" label-width="120px">
				<el-input-number v-model="form.prise"></el-input-number>
			</el-form-item>
			<el-form-item prop="unit" label="价格单位:" label-width="120px">
				<el-input v-model="form.unit"></el-input>
			</el-form-item>
			<el-form-item prop="category" label="所属分类:" label-width="120px">
				<el-select v-model="form.category">
					<el-option :key="-1" label="无" :value="0"></el-option>
					<el-option
						v-for="(item, i) in category"
						:key="i"
						:label="item.name"
						:value="item.id"
					>
					</el-option>
				</el-select>
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
			<el-form-item
				prop="totalNum"
				label="商品总库存"
				label-width="120px"
			>
				<el-input-number v-model="form.totalNum"></el-input-number>
			</el-form-item>
			<el-form-item
				prop="restNum"
				label="商品当前库存"
				label-width="120px"
			>
				<el-input-number v-model="form.restNum"></el-input-number>
			</el-form-item>
			<el-form-item
				prop="isRecommend"
				label="推荐商品："
				label-width="120px"
			>
				<el-checkbox v-model="form.isRecommend"></el-checkbox>
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
				desc: '',
				prise: 1,
				unit: '',
				category: 0,
				images: [''],
				totalNum: 1,
				restNum: 1,
				id: undefined,
				isRecommend: false
			},
			rules: {
				name: [
					{
						required: true,
						message: '请输入商品名称',
						trigger: 'blur'
					}
				],
				desc: [
					{
						required: true,
						message: '请输入商品描述',
						trigger: 'blur'
					}
				],
				prise: [
					{
						required: true,
						message: '请输入商品价格',
						trigger: 'blur'
					}
				],
				unit: [
					{
						required: true,
						message: '请输入价格单位',
						trigger: 'blur'
					}
				],
				category: [
					{
						required: true,
						message: '请输入所属分类',
						trigger: 'blur'
					}
				],
				images: [
					{
						required: true,
						message: '请输入商品图片',
						trigger: 'blur'
					}
				],
				totalNum: [
					{
						required: true,
						message: '请输入商品总库存',
						trigger: 'blur'
					}
				],
				restNum: [
					{
						required: true,
						message: '请输入商品当前库存',
						trigger: 'blur'
					}
				]
			}
		};
	},
	components: {
		[Dialog.name]: Dialog,
		[Form.name]: Form,
		[FormItem.name]: FormItem,
		[Upload.name]: Upload
	},
	props: {
		visible: {
			require: true,
			type: Boolean,
			default: false
		},
		category: {
			type: Array
		}
	},
	created() {
		this.$on('setValue', this.setValue);
		this.$on('clearValue', this.clearValue);
	},
	methods: {
		handleSubmit() {
			this.$refs['form'].validate(valid => {
				if (valid) {
					if (this.form.restNum > this.form.totalNum) {
						this.$emit('error', '剩余库存不能大于总库存');
					}
					this.$emit('submit', this.form);
				} else {
					this.$emit('error', '校验错误');
				}
			});
		},
		setValue(opts) {
			this.form.name = opts.name;
			this.form.desc = opts.desc;
			this.form.prise = opts.prise;
			this.form.unit = opts.unit;
			this.form.category = opts.category;
			this.form.images = opts.images;
			this.form.totalNum = opts.totalNum;
			this.form.restNum = opts.restNum;
			this.form.isRecommend = opts.isRecommend;
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
			this.imageUrl = '';
			this.form = {
				name: '',
				desc: '',
				prise: 1,
				unit: '',
				category: 0,
				images: '',
				totalNum: 1,
				restNum: 1,
				id: undefined,
				isRecommend: false
			};
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
		this.$off('setDialogValue', this.setDialogValue);
	}
};
</script>

<style lang="less" scope>
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
