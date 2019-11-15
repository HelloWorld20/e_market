<template>
	<section class="goods">
		<h1>商品管理</h1>
		<div class="goods-btns">
			<el-button type="primary" @click="handleCreate">新增</el-button>
		</div>
		<el-pagination
			background
			layout="prev, pager, next"
			:total="totalPage"
			@current-change="pageChange"
		></el-pagination>
		<el-table border style="width: 100%" :data="tableData">
			<el-table-column
				label="创建时间"
				prop="createTime"
				:formatter="timeFormat"
			></el-table-column>
			<el-table-column
				label="更新时间"
				prop="updateTime"
				:formatter="timeFormat"
			></el-table-column>
			<el-table-column label="分类名称" prop="name"></el-table-column>
			<el-table-column label="描述" prop="desc"></el-table-column>
			<el-table-column label="单价" prop="prise"></el-table-column>
			<el-table-column label="单位" prop="unit"></el-table-column>
			<el-table-column label="图片" prop="images">
				<template slot-scope="scope">
					<el-image
						style="width: 100px; height: 100px"
						:src="getImageLocation(scope.row.images[0])"
						:preview-src-list="getImageLocation(scope.row.images)"
					/>
				</template>
			</el-table-column>
			<el-table-column label="当前库存" prop="restNum"></el-table-column>
			<el-table-column label="总库存" prop="totalNum"></el-table-column>
			<el-table-column label="操作">
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
						:handleDelete="handleDelete.bind(scope.row.id)"
					>
						<el-button type="danger" size="small">删除</el-button>
					</vue-del-pop>
				</template>
			</el-table-column>
		</el-table>

		<vue-dialog
			ref="dialog"
			:visible="dialogVisible"
			@close="handleDialogClose"
			@submit="handleDialogSubmit"
		></vue-dialog>
	</section>
</template>

<script>
import { Table, TableColumn, Popover, Pagination, Image } from "element-ui";
import { getGoods, addOrUpdateGoods, delGoods } from "../../http/apis";
import VueDelPop from "../../components/delPop";
import VueDialog from "./dialog";
import moment from "moment";
import * as _ from "lodash";
export default {
	data() {
		return {
			tableData: [],
			dialogVisible: false,
			currentPage: 0,
			totalPage: 1
		};
	},
	components: {
		[Table.name]: Table,
		[TableColumn.name]: TableColumn,
		[Popover.name]: Popover,
		[Image.name]: Image,
		[Pagination.name]: Pagination,
		VueDelPop,
		VueDialog
	},
	async created() {
		const result = await getGoods({ pageNo: this.currentPage });
		this.tableData = result.data;
		this.totalPage = result.total;
	},
	methods: {
		handleCreate() {
			this.dialogVisible = true;
			this.$refs["dialog"].$emit("clearValue");
		},
		handleEdit(row) {
			this.dialogVisible = true;
			this.$refs["dialog"].$emit("setValue", row);
		},
		async handleDelete(id) {
			await delGoods(Number(id));
			const result = await getGoods({ pageNo: this.currentPage });
			this.tableData = result.data;
			this.totalPage = result.total;
			this.$message({ message: "删除成功", type: "success" });
		},
		handleDialogClose() {
			this.dialogVisible = false;
		},
		async handleDialogSubmit(form) {
			await addOrUpdateGoods(form);
			const result = await getGoods({ pageNo: this.currentPage });
			this.tableData = result.data;
			this.totalPage = result.total;
			this.$message({ message: "更新成功", type: "success" });
			this.dialogVisible = false;
		},
		async pageChange(page) {
			this.currentPage = page - 1;
			const result = await getGoods({ pageNo: this.currentPage });
			this.tableData = result.data;
			this.totalPage = result.total;
		},
		timeFormat(row, el) {
			if (!row[el.property]) return "";
			return moment(Number(row[el.property])).format("YYYY-MM-DD HH:mm:ss");
		},
		getImageLocation(url) {
			if (_.isArray(url)) {
				return url.map(v => {
					return `${location.protocol}//${v}`;
				});
			}
			return `${location.protocol}//${url}`;
		}
	}
};
</script>

<style lang="less" scoped></style>
