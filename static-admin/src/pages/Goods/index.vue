<template>
	<section class="goods">
		<h1 class="title">商品管理</h1>
		<div class="goods-btns">
			<el-button type="primary" @click="handleCreate">新增</el-button>
			<el-button type="danger" @click="handleDeleteMulti">删除</el-button>
			<el-button type="primary" @click="handleAdd2Recommend"
				>添加推荐</el-button
			>
			<el-button type="primary" @click="handleRemoveRecommend"
				>移除推荐</el-button
			>
		</div>
		<el-divider></el-divider>

		<el-form :modal="form" ref="form">
			<el-form-item prop="name" label="商品名称:" label-width="150px">
				<el-input
					v-model="form.name"
					placeholder="请输入商品名称"
				></el-input>
			</el-form-item>
			<el-form-item prop="minPrise" label="价格范围:" label-width="150px">
				<el-input-number v-model="form.minPrise"></el-input-number>
				<span style="text-align: center">~</span>
				<el-input-number v-model="form.maxPrise"></el-input-number>
			</el-form-item>

			<el-form-item prop="category" label="分类:" label-width="150px">
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
			<el-form-item
				prop="isRecommend"
				label="是否推荐："
				label-width="150px"
			>
				<el-select v-model="form.isRecommend">
					<el-option :key="0" label="无" :value="0"></el-option>
					<el-option
						:key="1"
						label="有推荐"
						:value="true"
					></el-option>
					<el-option
						:key="2"
						label="不推荐"
						:value="false"
					></el-option>
				</el-select>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="handleSearch">搜索</el-button>
				<el-button @click="handleReset">重置</el-button>
			</el-form-item>
		</el-form>
		<el-divider></el-divider>
		<el-pagination
			background
			layout="prev, pager, next"
			:total="totalPage"
			@current-change="pageChange"
		></el-pagination>
		<el-table
			border
			style="width: 100%; margin-bottom: 50px"
			:data="tableData"
			@selection-change="handleSelectionChange"
		>
			<el-table-column type="selection" width="55"> </el-table-column>
			<el-table-column
				label="创建时间"
				prop="createTime"
				:formatter="timeFormat"
				width="140"
			></el-table-column>
			<el-table-column
				label="更新时间"
				prop="updateTime"
				:formatter="timeFormat"
				width="140"
			></el-table-column>
			<el-table-column
				label="名称"
				prop="name"
				width="100"
			></el-table-column>
			<el-table-column label="分类名称" prop="name" width="100">
				<template slot-scope="scope">
					<span>{{ getCateName(scope.row.category) }}</span>
				</template>
			</el-table-column>
			<el-table-column
				label="描述"
				prop="desc"
				width="200"
			></el-table-column>
			<el-table-column
				label="单价"
				prop="prise"
				width="70"
			></el-table-column>
			<el-table-column
				label="单位"
				prop="unit"
				width="70"
			></el-table-column>
			<el-table-column label="图片" prop="images" width="120">
				<template slot-scope="scope">
					<el-image
						style="width: 100px; height: 100px"
						:src="getImageLocation(scope.row.images[0])"
						:preview-src-list="getImageLocation(scope.row.images)"
					/>
				</template>
			</el-table-column>
			<el-table-column
				label="当前库存"
				prop="restNum"
				width="70"
			></el-table-column>
			<el-table-column
				label="总库存"
				prop="totalNum"
				width="70"
			></el-table-column>
			<el-table-column
				label="是否是推荐商品"
				prop="isRecommend"
				width="100"
			>
				<template slot-scope="scope">
					<span>{{ scope.row.isRecommend ? '是' : '否' }}</span>
				</template>
			</el-table-column>
			<el-table-column label="操作" fixed="right" width="150">
				<template slot-scope="scope">
					<el-button
						@click="handleEdit(scope.row)"
						type="primary"
						size="small"
						>编辑</el-button
					>
					<vue-del-pop
						:id="scope.row.id"
						title="确定要删除商品吗？"
						:handleDelete="handleDelete.bind([scope.row.id])"
					>
						<el-button type="danger" size="small">删除</el-button>
					</vue-del-pop>
				</template>
			</el-table-column>
		</el-table>
		<vue-dialog
			ref="dialog"
			:category="category"
			:visible="dialogVisible"
			@close="dialogVisible = false"
			@submit="handleDialogSubmit"
		></vue-dialog>
	</section>
</template>

<script>
import {
	Table,
	TableColumn,
	Popover,
	Pagination,
	Image,
	Form,
	FormItem,
	Input,
	InputNumber,
	MessageBox
} from 'element-ui';
import {
	getGoods,
	addOrUpdateGoods,
	delGoods,
	getCategory,
	updateRecommend,
	delRecommend
} from '../../http/apis';
import VueDelPop from '../../components/delPop';
import VueDialog from './dialog';
import moment from 'moment';
import * as _ from 'lodash';
export default {
	data() {
		return {
			tableData: [],
			category: [],
			form: {
				name: '',
				category: 0,
				minPrise: 0,
				maxPrise: 0,
				isRecommend: 0
			},
			dialogVisible: false,
			currentPage: -1,
			totalPage: 1,
			selectedRow: []
		};
	},
	components: {
		[Table.name]: Table,
		[TableColumn.name]: TableColumn,
		[Popover.name]: Popover,
		[Image.name]: Image,
		[Pagination.name]: Pagination,
		[Form.name]: Form,
		[FormItem.name]: FormItem,
		[Input.name]: Input,
		[InputNumber.name]: InputNumber,
		VueDelPop,
		VueDialog
	},
	created() {
		this.updateTable();
		getCategory().then(category => (this.category = category));
	},
	methods: {
		async updateTable() {
			const goodsList = await getGoods({
				pageNo: this.currentPage >= 0 ? this.currentPage : 0,
				name: this.form.name ? this.form.name : undefined,
				maxPrise:
					this.form.maxPrise > 0 ? this.form.maxPrise : undefined,
				minPrise:
					this.form.minPrise > 0 ? this.form.minPrise : undefined,
				createTime: undefined,
				updateTime: undefined,
				rest: undefined,
				category: this.form.category ? this.form.category : undefined,
				isRecommend:
					this.form.isRecommend === 0
						? undefined
						: this.form.isRecommend
			});
			console.log('params', {
				pageNo: this.currentPage,
				name: this.form.name,
				maxPrise: this.form.maxPrise,
				minPrise: this.form.minPrise,
				createTime: undefined,
				updateTime: undefined,
				rest: undefined,
				category: this.form.category && this.form.category,
				isRecommend:
					this.form.isRecommend === 0
						? undefined
						: this.form.isRecommend
			});
			this.tableData = goodsList.list;
			this.totalPage = goodsList.total;
		},
		async handleSearch() {
			this.currentPage = 0;
			this.updateTable();
		},
		async handleReset() {
			this.$set(this, 'form', {
				name: '',
				category: 0,
				minPrise: 0,
				maxPrise: 0
			});
			this.currentPage = 0;
			const goodsList = await getGoods({ pageNo: this.currentPage });
			this.tableData = goodsList.list;
			this.totalPage = goodsList.total;
		},
		handleCreate() {
			this.dialogVisible = true;
			this.$refs['dialog'].$emit('clearValue');
		},
		// 批量标记商品到推荐
		async handleAdd2Recommend() {
			if (this.selectedRow.length <= 0) {
				this.$message({ message: '请勾选商品' });
				return;
			}
			await updateRecommend(this.selectedRow);
			await this.updateTable();
			this.$message({ message: '更新完成', type: 'success' });
			this.selectedRow = [];
		},
		// 批量清除商品推荐标记
		async handleRemoveRecommend() {
			if (this.selectedRow.length <= 0) {
				this.$message({ message: '请勾选商品' });
				return;
			}

			await delRecommend(this.selectedRow);
			await this.updateTable();
			this.$message({ message: '更新完成', type: 'success' });
			this.selectedRow = [];
		},
		handleEdit(row) {
			this.dialogVisible = true;
			this.$refs['dialog'].$emit('setValue', row);
		},
		async handleDelete(ids) {
			await delGoods([ids]);
			await this.updateTable();
			this.$message({ message: '删除成功', type: 'success' });
		},
		handleDeleteMulti() {
			if (this.selectedRow.length <= 0) {
				this.$message({ message: '请勾选商品' });
				return;
			}
			MessageBox.confirm('此操作将永久删除商品, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			})
				.then(() => {
					this.handleDelete(this.selectedRow).then(
						() => (this.selectedRow = [])
					);
				})
				.catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
		},
		handleSelectionChange(val) {
			this.selectedRow = val.map(v => v.id);
		},
		async handleDialogSubmit(form) {
			console.log('form', form);
			await addOrUpdateGoods(form);
			await this.updateTable();
			this.$message({ message: '更新成功', type: 'success' });
			this.dialogVisible = false;
		},
		async pageChange(page) {
			this.currentPage = page - 1;
			this.updateTable();
		},
		timeFormat(row, el) {
			if (!row[el.property]) return '';
			return moment(Number(row[el.property])).format(
				'MM-DD HH:mm:ss'
			);
		},
		getImageLocation(url) {
			if (_.isArray(url)) {
				return url.map(v => {
					return `${location.protocol}//${v}`;
				});
			}
			return `${location.protocol}//${url}`;
		},
		getCateName(type) {
			if (this.category.length > 0) {
				const result = this.category.find(v => v.id === type);
				if (result) {
					return result.name;
				}
				return '没有对应分类';
			}
			return '加载中...';
		}
	}
};
</script>

<style lang="less" scoped src="./style.less"></style>
