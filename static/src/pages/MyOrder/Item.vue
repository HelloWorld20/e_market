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
		<div class="myorder-item-goods">
			<div
				class="myorder-item-goods-img"
				v-for="item in data.goods"
				:key="item.goodsId"
			>
				<van-image
					style="width: .8rem; height: .8rem;"
					:src="getImages(item.goodsImage)"
				>
					<template v-slot:error>加载失败</template>
				</van-image>
				<div style="font-size: .12rem; text-align: center; line-height: .1rem">{{ item.goodsName }}</div>
			</div>
		</div>
		<div class="myorder-item-info">
			共{{ data.goods.length }}份商品&nbsp;&nbsp;实付￥{{
				data.orderPriseAll
			}}
		</div>
	</section>
</template>

<script>
import moment from 'moment';
import { Image } from 'vant';
export default {
	props: {
		data: {
			type: Object,
			require: true
		}
	},
	components: {
		[Image.name]: Image
	},
	mounted() {
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
		},
		getImages(imageArr) {
			return `${window.location.protocol}//${imageArr[0]}`;
		}
	}
};
</script>

<style lang="less" scoped src="./item.less"></style>
