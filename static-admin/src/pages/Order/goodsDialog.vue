<template>
	<el-dialog
		title="商品信息"
		:visible.sync="visible"
		:before-close="() => $emit('close')"
	>
		<el-table border style="width: 100%" :data="tableData">
			<el-table-column
				label="图片"
				prop="goodsImage"
				width="170"
			></el-table-column>
			<el-table-column
				label="商品名称"
				prop="goodsName"
				width="170"
			></el-table-column>
			<el-table-column
				label="商品数量"
				prop="goodsNum"
				width="170"
			></el-table-column>
			<el-table-column
				label="单价"
				prop="goodsPrise"
				width="170"
			></el-table-column>
			<el-table-column
				label="总价"
				prop="goodsTotalPrise"
				width="170"
			></el-table-column>
		</el-table>
	</el-dialog>
</template>

<script>
import { Dialog, Table, TableColumn } from 'element-ui';
export default {
	props: {
		visible: {
			type: Boolean,
			default: false
		},
		tableData: {
			type: Array,
			require: true
		}
	},
	components: {
		[Dialog.name]: Dialog,
		[Table.name]: Table,
		[TableColumn.name]: TableColumn
	}
};
</script>

<style></style>
