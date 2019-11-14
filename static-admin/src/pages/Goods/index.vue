<template>
	<section class="goods">
		<h1>商品管理</h1>
		<div class="goods-btns">
			<el-button type="primary" @click="handleCreate">新增</el-button>
		</div>
		<el-table border style="width: 100%" :data="tableData">
			<el-table-column
				label="创建时间"
				prop="creatTime"
				:formatter="createTimeFormat"
			></el-table-column>
			<el-table-column
				label="更新时间"
				prop="updateTime"
				:formatter="createTimeFormat"
			></el-table-column>
			<el-table-column label="分类名称" prop="name"></el-table-column>
			<el-table-column label="描述" prop="desc"></el-table-column>
			<el-table-column label="单价" prop="prise"></el-table-column>
			<el-table-column label="单位" prop="unit"></el-table-column>
			<el-table-column label="图片" prop="images"></el-table-column>
			<el-table-column label="总数" prop="totalNum"></el-table-column>
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
						<el-button
							type="danger"
							size="small"
							>删除</el-button
						>
					</vue-del-pop>
				</template>
			</el-table-column>
		</el-table>
		<vue-dialog
			ref="dialog"
			:visible="dialogVisible"
			@close="handleDialogClose"
			@submit="handleDialogSubmit"></vue-dialog>
	</section>
</template>

<script>
import { Table, TableColumn, Popover } from 'element-ui';
import { getGoods, addOrUpdateGoods, delGoods } from '../../http/apis';
import VueDelPop from '../../components/delPop';
import VueDialog from './dialog';
import moment from 'moment';
export default {
	data() {
		return {
			tableData: [],
			dialogVisible: false
		};
	},
	components: {
		[Table.name]: Table,
		[TableColumn.name]: TableColumn,
		[Popover.name]: Popover,
		VueDelPop, VueDialog
	},
	created() {
		getGoods({ pageNo: 0 }).then(res => (this.tableData = res));
	},
	methods: {
		handleCreate() {
			this.dialogVisible = true;

			// addOrUpdateGoods({
			// 	name: '皇帝柑',
			// 	desc: '广西产皇帝柑',
			// 	prise: '5.00',
			// 	unit: '元/斤',
			// 	category: 6,
			// 	images: 'images',
			// 	totalNum: 100,
			// 	restNum: 100
			// });
		},
		handleEdit(row) {},
		async handleDelete(id) {},
		handleDialogClose() { this.dialogVisible = false; },
		handleDialogSubmit(form) {},
		createTimeFormat(row) {
			if (!row.createTime) return '';
			return moment(Number(row.createTime)).format('YYYY-MM-DD HH:mm:ss');
		},
		updateTimeFormat(row) {
			if (!row.updateTime) return '';
			return moment(Number(row.updateTime)).format('YYYY-MM-DD HH:mm:ss');
		}
	}
};
</script>

<style lang="less" scoped></style>
