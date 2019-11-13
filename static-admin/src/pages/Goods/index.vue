<template>
  <section class="goods">
	  <h1>商品管理</h1>
	  <div class="goods-btns">
			<el-button type="primary" @click="handleCreate">新增</el-button>
		</div>
  </section>
</template>

<script>
import { Table, TableColumn, Popover } from 'element-ui';
export default {
	components: {
		[Table.name]: Table,
		[TableColumn.name]: TableColumn,
		[Popover.name]: Popover,
	},
}
</script>

<style lang="less" scoped>

</style>

