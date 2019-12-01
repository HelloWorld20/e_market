<template>
	<section class="myorder-item">
		<div class="myorder-item-head">
			<div class="myorder-item-head-time">
				{{ dateFormat(data.createTime) }}
			</div>
			<div class="myorder-item-head-status">
				{{ getStatus(data.status) }}
			</div>
		</div>
		<div class="myorder-item-img"></div>
		<div class="myorder-item-info">
			共{{ data.goods.length }}份商品&nbsp;&nbsp;实付￥{{
				data.orderPriseAll
			}}
		</div>
	</section>
</template>

<script>
import moment from 'moment';
export default {
	props: {
		data: {
			type: Object,
			require: true
		}
	},
	created() {
		window.moment = moment;
		console.log(this.data);
	},
	methods: {
		dateFormat(timestamp) {
			return moment(Number(timestamp)).format('YYYY-MM-DD hh:mm:ss');
		},
		getStatus(status) {
			const map = {
				0: '待付款',
				1: '待收货',
				2: '已完成',
				all: '所有'
			};
			return map[status];
		}
	}
};
</script>

<style lang="less" scoped></style>
