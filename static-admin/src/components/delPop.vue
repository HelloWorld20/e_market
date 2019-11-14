<template>
	<!-- v-model="visible" -->
	<el-popover placement="top" v-model="visible">
		<p>{{title}}</p>
		<div style="text-align: right; margin: 0">
			<el-button type="danger" size="mini" @click="handleDel"
				>删除</el-button
			>
		</div>
		<slot slot="reference"></slot>
	</el-popover>
</template>

<script>
import { Popover } from "element-ui";
export default {
	data() {
		return {
			visible: false
		};
	},
	props: {
		id: {
			require: true
		},
		title: {
			require: true,
		},
		handleDelete: {
			type: Function,
			requrie: true
		}
	},
	components: {
		[Popover.name]: Popover
	},
	methods: {
		async handleDel() {
			await this.handleDelete(this.id);
			this.visible = false;
		}
	}
};
</script>

<style lang="less" scoped></style>
