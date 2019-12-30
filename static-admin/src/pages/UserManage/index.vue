<template>
	<section class="user">
		<h1 class="title">用户管理</h1>
		<el-form
			v-model="form"
			label-position="left"
			inline
			class="order-search-expand"
		>
			<el-form-item prop="state" label="用户状态:" label-width="150px">
				<el-select v-model="form.state">
					<el-option :key="-1" label="无" :value="0">无</el-option>
					<el-option :key="0" label="正常" :value="1">正常</el-option>
					<el-option :key="1" label="封禁" :value="-1"
						>封禁</el-option
					>
				</el-select>
			</el-form-item>
			<el-form-item prop="nickName" label="用户昵称:" label-width="150px">
				<el-input v-model="form.nickName"></el-input>
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
			style="width: 100%"
			:data="tableData"
			@row-click="handleTableClick"
			:row-class-name="tableRowClassName"
		>
			<el-table-column label="用户头像" prop="headimgurl">
				<template slot-scope="scope">
					<el-image
						style="width: 100px; height: 100px"
						:src="scope.row.headimgurl"
					/>
				</template>
			</el-table-column>
			<el-table-column label="用户昵称" prop="nickName"></el-table-column>
			<el-table-column label="用户状态" prop="state">
				<template slot-scope="scope">
					<span>{{ scope.row.state === 1 ? '正常' : '封禁' }}</span>
				</template>
			</el-table-column>
			<el-table-column label="openid" prop="openid"></el-table-column>
			<el-table-column label="操作">
				<template slot-scope="scope">
					<vue-del-pop
						v-show="scope.row.state === 1"
						:id="scope.row.openid"
						title="确定封禁用户吗？禁用后用户无法正常交易"
						:handleDelete="handleOperate.bind(scope.row.state, -1)"
					>
						<el-button type="danger" size="small">封禁</el-button>
					</vue-del-pop>
					<vue-del-pop
						v-show="scope.row.state === -1"
						:id="scope.row.openid"
						title="确定解禁用户吗？"
						:handleDelete="handleOperate.bind(scope.row.state, 1)"
					>
						<el-button type="danger" size="small">解禁</el-button>
					</vue-del-pop>
				</template>
			</el-table-column>
		</el-table>
	</section>
</template>

<script>
import {
	Table,
	TableColumn,
	Pagination,
	Image,
	Form,
	Input,
	FormItem,
	MessageBox
} from 'element-ui';
import VueDelPop from '../../components/delPop';
import { getUser, setUserState } from '../../http/apis';

export default {
	data() {
		return {
			form: {
				state: 0,
				nickName: ''
			},
			pageNo: 0,
			totalPage: 0,
			tableData: [],
			tableRowClassName: ''
		};
	},
	components: {
		[Table.name]: Table,
		[TableColumn.name]: TableColumn,
		[Image.name]: Image,
		[Pagination.name]: Pagination,
		[Input.name]: Input,
		[Form.name]: Form,
		[FormItem.name]: FormItem,
		VueDelPop
	},
	mounted() {
		MessageBox.prompt;
		this.init();
	},
	methods: {
		async init() {
			const tableData = await getUser({
				pageNo: this.pageNo,
				name: this.form.nickName,
				state: this.form.state || undefined
			});
			this.totalPage = tableData.total;
			this.tableData = tableData.list;
		},
		async handleSearch() {
			this.pageNo = 0;
			this.init();
		},
		handleReset() {
			this.$set(this, 'form', {
				nickName: '',
				status: 0
			});
			this.pageNo = 0;
			this.init();
		},
		async pageChange(page) {
			this.pageNo = page - 1;
			this.init();
		},
		handleTableClick() {},
		async handleOperate(state, id) {
			await setUserState(id, state);
			await this.init();
			this.$message({ message: '修改成功', type: 'success' });
		}
	}
};
</script>

<style lang="less" scoped></style>
