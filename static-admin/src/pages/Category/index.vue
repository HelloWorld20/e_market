<template>
	<section class="cate">
		<h1>分类管理</h1>
		<div class="cate-btns">
			<el-button type="primary" @click="handleCreate">新增</el-button>
		</div>
		<el-table border style="width: 100%" :data="tableData">
			<el-table-column label="分类名称" prop="name"></el-table-column>
			<el-table-column label="优先级" prop="preority"></el-table-column>
			<el-table-column
				label="创建时间"
				prop="createTime"
				:formatter="createTimeFormat"
			></el-table-column>
			<el-table-column
				label="更新时间"
				prop="updateTime"
				:formatter="updateTimeFormat"
			></el-table-column>
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
						title="确定要删除分类吗？"
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
import { Table, TableColumn, Popover } from 'element-ui';
import { mapActions } from 'vuex';
import VueDialog from './dialog';
import VueDelPop from '../../components/delPop';
import moment from 'moment';
import apis from '../../http/apis';
export default {
	data() {
		return {
			dialogVisible: false,
			tableData: []
		};
	},
	components: {
		[Table.name]: Table,
		[TableColumn.name]: TableColumn,
		[Popover.name]: Popover,
		VueDialog,
		VueDelPop
	},
	created() {
		this.getCategory().then(res => (this.tableData = res));
	},
	methods: {
		...mapActions(['getCategory']),
		handleCreate() {
			this.dialogVisible = true;
			this.$refs.dialog.$emit('setDialogValue', {
				name: '',
				preority: 0
			});
		},
		handleEdit(row) {
			this.$refs.dialog.$emit('setDialogValue', { ...row });
			this.dialogVisible = true;
		},
		handleDialogClose() {
			this.dialogVisible = false;
		},
		async handleDelete(id) {
			await this.$delete(apis.cate, {
				params: { id }
			});
			const res = await this.getCategory();
			this.tableData = res;
			this.$message({
				message: '删除成功',
				type: 'success'
			});
		},
		async handleDialogSubmit(form) {
			this.dialogVisible = false;
			await this.$post(apis.cate, form);
			const res = await this.getCategory();
			this.tableData = res;
			this.$message({
				message: '修改成功',
				type: 'success'
			});
		},

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
