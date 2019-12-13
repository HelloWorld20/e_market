<template>
	<section class="home-mana">
		<h1 class="title">首页管理</h1>
		<el-divider></el-divider>
		<h2>轮播图管理</h2>
		<br />
		<p>
			*图片过大的话，用在线压缩网站压缩图片再上传：<a
				href="https://tinypng.com/"
				>https://tinypng.com/</a
			>
		</p>
		<div style="display: flex">
			<el-upload
				class="uploader"
				:action="uploadUrl"
				:show-file-list="false"
				:on-success="handleUploadSuccess(0)"
				:before-upload="beforeUpload"
			>
				<img v-if="carousel[0]" :src="carousel[0]" class="preview" />
				<i v-else class="el-icon-plus uploader-icon"></i>
			</el-upload>
			<el-upload
				class="uploader"
				:action="uploadUrl"
				:show-file-list="false"
				:on-success="handleUploadSuccess(1)"
				:before-upload="beforeUpload"
			>
				<img v-if="carousel[1]" :src="carousel[1]" class="preview" />
				<i v-else class="el-icon-plus uploader-icon"></i>
			</el-upload>
			<el-upload
				class="uploader"
				:action="uploadUrl"
				:show-file-list="false"
				:on-success="handleUploadSuccess(2)"
				:before-upload="beforeUpload"
			>
				<img v-if="carousel[2]" :src="carousel[2]" class="preview" />
				<i v-else class="el-icon-plus uploader-icon"></i>
			</el-upload>
			<el-upload
				class="uploader"
				:action="uploadUrl"
				:show-file-list="false"
				:on-success="handleUploadSuccess(3)"
				:before-upload="beforeUpload"
			>
				<img v-if="carousel[3]" :src="carousel[3]" class="preview" />
				<i v-else class="el-icon-plus uploader-icon"></i>
			</el-upload>
			<el-upload
				class="uploader"
				:action="uploadUrl"
				:show-file-list="false"
				:on-success="handleUploadSuccess(4)"
				:before-upload="beforeUpload"
			>
				<img v-if="carousel[4]" :src="carousel[4]" class="preview" />
				<i v-else class="el-icon-plus uploader-icon"></i>
			</el-upload>
		</div>
		<el-button type="primary" @click="submit">保存</el-button>
	</section>
</template>

<script>
import { Dialog, Form, FormItem, Upload } from 'element-ui';
import apis, { getHome, updateHome } from '../../http/apis';
export default {
	data() {
		return {
			uploadUrl: apis.upload,
			dialogVisible: false,
			dialogImageUrl: '',
			carousel: ['', '', '', '', '']
		};
	},
	components: {
		[Dialog.name]: Dialog,
		[Form.name]: Form,
		[FormItem.name]: FormItem,
		[Upload.name]: Upload
	},
	created() {
		getHome().then(res => {
			this.carousel = this.carousel.map((v, i) => {
				if (res.carousel[i]) {
					return res.carousel[i];
				}
				return v;
			});
		});
	},
	methods: {
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
		handleUploadSuccess(index) {
			return ({ data: url }) => {
				console.log(url);
				this.$set(
					this.carousel,
					index,
					`${window.location.protocol}//${url}`
				);
				console.log(url);
				this.$message({ message: '图片上传成功', type: 'success' });
			};
		},
		async submit() {
			await updateHome({ carousel: this.carousel });
			this.$message({ message: '更新成功', type: 'success' });
		}
	},
	watch: {
		carousel(val) {
			console.log('carousel', val);
		}
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
	margin: 10px;
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
