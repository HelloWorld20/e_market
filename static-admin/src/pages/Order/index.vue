<template>
	<section class="order" style="margin-bottom: 100px;">
		<h1>订单管理</h1>
		<el-form v-model="form">
			<el-form-item prop="state" label="订单状态:" label-width="150px">
				<el-select v-model="form.state">
					<el-option :key="-2" label="无" :value="-2">无</el-option>
					<el-option :key="-1" label="关闭" :value="0"
						>关闭</el-option
					>
					<el-option :key="0" label="未支付" :value="0"
						>未支付</el-option
					>
					<el-option :key="1" label="已支付" :value="1"
						>已支付</el-option
					>
					<el-option :key="2" label="商家接单" :value="2"
						>商家接单</el-option
					>
					<el-option :key="3" label="正在配送" :value="3"
						>正在配送</el-option
					>
					<el-option :key="4" label="配送完成" :value="4"
						>配送完成</el-option
					>
				</el-select>
			</el-form-item>
			<el-form-item prop="userName" label="用户昵称:" label-width="150px">
				<el-input v-model="form.userName"></el-input>
			</el-form-item>
			<el-form-item
				prop="orderName"
				label="订单姓名:"
				label-width="150px"
			>
				<el-input v-model="form.orderName"></el-input>
			</el-form-item>
			<el-form-item
				prop="userName"
				label="订单手机号:"
				label-width="150px"
			>
				<el-input-number v-model="form.orderPhone"></el-input-number>
			</el-form-item>
			<el-form-item
				prop="deleverPhone"
				label="快递员手机号:"
				label-width="150px"
			>
				<el-input-number v-model="form.deleverPhone"></el-input-number>
			</el-form-item>
			<el-form-item prop="timeKey" label="时间分类:" label-width="150px">
				<el-select v-model="form.timeKey">
					<el-option :key="-1" label="无" :value="-2">无</el-option>
					<el-option
						key="createTime"
						label="创建时间"
						value="createTime"
						>配送完成</el-option
					>
					<el-option
						key="updateTime"
						label="修改时间"
						value="updateTime"
						>修改时间</el-option
					>
					<el-option key="payTime" label="支付时间" value="payTime"
						>修改时间</el-option
					>
					<el-option
						key="acceptTime"
						label="接单时间"
						value="acceptTime"
						>接单时间</el-option
					>
					<el-option
						key="deleverTime"
						label="配送时间"
						value="deleverTime"
						>配送时间</el-option
					>
					<el-option
						key="dealTime"
						label="订单完成时间"
						value="dealTime"
						>订单完成时间</el-option
					>
				</el-select>
			</el-form-item>
			<el-form-item
				prop="timeRange"
				label="时间范围:"
				label-width="150px"
			>
				<el-date-picker
					v-model="form.timeRange"
					type="datetimerange"
					range-separator="至"
					start-placeholder="开始日期"
					end-placeholder="结束日期"
					align="right"
				>
				</el-date-picker>
			</el-form-item>
			<!-- 再来个时间选择器 -->
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
			ref="table"
		>
			<el-table-column width="100" type="expand">
				<template slot-scope="props">
					<el-form
						label-position="left"
						inline
						class="order-table-expand"
					>
						<el-form-item label="订单ID">
							<span>{{ props.row.orderId }}</span>
						</el-form-item>
						<el-form-item label="用户昵称">
							<span>{{ props.row.nickName }}</span>
						</el-form-item>
						<el-form-item label="配送姓名">
							<span>{{ props.row.orderName }}</span>
						</el-form-item>
						<el-form-item label="配送电话">
							<span>{{ props.row.orderPhone }}</span>
						</el-form-item>
						<el-form-item label="配送地址">
							<span>{{ props.row.orderAddr }}</span>
						</el-form-item>
						<el-form-item label="留言：">
							<span>{{ props.row.desc }}</span>
						</el-form-item>
						<el-form-item label="订单总价格：">
							<span>{{ props.row.orderPriseAll }}</span>
						</el-form-item>
						<el-form-item label="订单状态">
							<span>{{ props.row.status }}</span>
						</el-form-item>
						<el-form-item label="创建时间">
							<span>{{
								timeFormatRaw(props.row.createTime)
							}}</span>
						</el-form-item>
						<el-form-item label="更新时间">
							<span>{{
								timeFormatRaw(props.row.updateTime)
							}}</span>
						</el-form-item>
						<el-form-item label="支付时间">
							<span>{{ timeFormatRaw(props.row.payTime) }}</span>
						</el-form-item>
						<el-form-item label="接单时间时间">
							<span>{{
								timeFormatRaw(props.row.acceptTime)
							}}</span>
						</el-form-item>
						<el-form-item label="配送时间">
							<span>{{
								timeFormatRaw(props.row.deleverTime)
							}}</span>
						</el-form-item>
						<el-form-item label="交易完成时间">
							<span>{{ timeFormatRaw(props.row.dealTime) }}</span>
						</el-form-item>
						<el-form-item label="支付id">
							<span>{{ props.row.payId || '无' }}</span>
						</el-form-item>
					</el-form>
					<el-table
						border
						style="width: 100%"
						:data="props.row.goods"
					>
						<el-table-column
							label="图片"
							prop="goodsImage"
							width="170"
						>
							<template slot-scope="scope">
								<el-image
									style="width: 100px; height: 100px"
									:src="
										getImageLocation(
											scope.row.goodsImage[0]
										)
									"
									:preview-src-list="
										getImageLocation(scope.row.goodsImage)
									"
								/>
							</template>
						</el-table-column>
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
				</template>
			</el-table-column>
			<el-table-column label="订单id" prop="orderId"></el-table-column>
			<el-table-column label="用户昵称" prop="nickName"></el-table-column>
			<el-table-column
				label="送货用户名"
				prop="orderName"
			></el-table-column>
			<el-table-column
				label="送货手机号"
				prop="orderPhone"
			></el-table-column>
			<el-table-column
				label="送货地址"
				prop="orderAddr"
			></el-table-column>

			<el-table-column label="留言" prop="desc"></el-table-column>
		</el-table>
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
	DatePicker
} from 'element-ui';
import { getOrder } from '../../http/apis';
import moment from 'moment';
import * as _ from 'lodash';
export default {
	data() {
		return {
			tableData: [],
			form: {
				state: '',
				userName: '',
				orderName: '',
				orderPhone: '',
				deleverPhone: '',
				timeKey: '',
				timeRange: []
			},
			currentPage: 0,
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
		[DatePicker.name]: DatePicker,
		VueDialog
	},
	created() {
		this.updateTable();
	},
	methods: {
		async updateTable() {
			const orderList = await getOrder({
				pageNo: this.currentPage,
				state: this.form.state === -2 ? undefined : this.form.state,
				timeKey: this.form.timeKey && this.form.timeKey,
				startTime:
					this.form.timeRange[0] &&
					new Date(this.form.timeRange[0]).getTime(),
				endTime:
					this.form.timeRange[1] &&
					new Date(this.form.timeRange[1]).getTime(),
				userName: this.form.userName && this.form.userName,
				orderName: this.form.orderName && this.form.orderName,
				orderPhone: this.form.orderPhone && this.form.orderPhone,
				deleverPhone: this.form.deleverPhone && this.form.deleverPhone
			});
			this.tableData = orderList.list;
			this.totalPage = orderList.totalPage;
		},
		handleSearch() {},
		handleReset() {},
		pageChange() {},
		handleTableClick(row) {
			this.$refs['table'].toggleRowExpansion(row);
		},
		handleEdit() {},
		handleDialogSubmit() {},
		timeFormat(row, el) {
			if (!row[el.property]) return '';
			return moment(Number(row[el.property])).format(
				'YYYY-MM-DD HH:mm:ss'
			);
		},
		timeFormatRaw(time) {
			if (!time) return '无';
			return moment(Number(time)).format('YYYY-MM-DD HH:mm:ss');
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

<style>
.order-table-expand {
	font-size: 0;
}
.order-table-expand label {
	width: 120px;
	color: #99a9bf;
}
.order-table-expand .el-form-item {
	margin-right: 0;
	margin-bottom: 0;
	width: 50%;
}
</style>
