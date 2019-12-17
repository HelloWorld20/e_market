<template>
	<section class="crawler">
		<el-select v-model="value" placeholder="请选择">
			<el-option
				v-for="(item, index) in rawData"
				:key="index"
				:label="index"
				:value="index"
			>
				{{ item.name + item.time }}
			</el-option>
		</el-select>
		<div class="e-container" ref="container"></div>
	</section>
</template>
<script>
import echarts from 'echarts';
import { Option, Select } from 'element-ui';
import { getCrawlerLowestPrise } from '../../http/apis';
let myChart = null;
export default {
	data() {
		return {
			value: '',
			rawData: []
		};
	},
	components: {
		[Option.name]: Option,
		[Select.name]: Select
	},
	async mounted() {
		let data = await getCrawlerLowestPrise();
		this.rawData = data;

		const option = this.getOption(0);
		// 使用刚指定的配置项和数据显示图表。
		this.init(option);
	},
	methods: {
		init(option) {
			myChart = echarts.init(this.$refs['container']);
			myChart.setOption(option);
		},
		getOption(index) {
			let data = this.rawData[index].data;
			data = data.filter(v => {
				return !!v.lowestPrice;
			});

			let xAxisData = []; // 横向
			let seriesData = [];
			// {
			// 	from: '', to: '',
			// 	lowestPrice: [{
			// 		20191204: 123,
			// 		20191205: 321
			// 	}]
			// }
			let allLineData = data;
			let partLinesData = allLineData;
			partLinesData.forEach(oneLineData => {
				let priseDataForArrayDay = oneLineData.lowestPrice[0];

				const data = Object.keys(priseDataForArrayDay).map(
					arrayDayKey => {
						console.log(arrayDayKey);
						return priseDataForArrayDay[arrayDayKey];
					}
				);
				console.log(data);
				seriesData.push({
					name: oneLineData.from + ' => ' + oneLineData.to,
					type: 'line',
					stack: '价格',
					data
				});
				xAxisData = xAxisData.map(v => v.slice(4));
			});

			const oneLineData = partLinesData[0];
			Object.keys(oneLineData.lowestPrice[0]).forEach(arrayDayKey => {
				if (
					parseInt(arrayDayKey) > 20191231 &&
					parseInt(arrayDayKey) < 20200215
				) {
					xAxisData.push(arrayDayKey);
				}
			});
			// console.log('xAxisData', xAxisData);
			// console.log('seriesData', seriesData);
			var option = {
				title: {
					text: '折线图堆叠'
				},
				tooltip: {
					trigger: 'axis'
				},
				legend: {
					data: [
						'邮件营销',
						'联盟广告',
						'视频广告',
						'直接访问',
						'搜索引擎'
					]
				},
				grid: {
					left: '3%',
					right: '4%',
					bottom: '3%',
					containLabel: true
				},
				toolbox: {
					feature: {
						saveAsImage: {}
					}
				},
				xAxis: {
					type: 'category',
					boundaryGap: false,
					// data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
					// xAxis: xAxisData
					data: xAxisData
				},
				yAxis: {
					type: 'value'
				},
				series: seriesData
				// series: [
				// 	{
				// 		name: '广州 =》 沈阳',
				// 		type: 'line',
				// 		stack: '价格',
				// 		data: [120, 132, 101, 134, 90, 230, 210]
				// 	}
				// ]
			};
			return option;
		}
	},
	watch: {
		value(val) {
			const option = this.getOption(val);
			myChart.setOption(option);
		}
	}
};
</script>
<style scoped lang="less">
.crawler {
	width: 100%;
	height: 100%;
}
.e-container {
	width: 100%;
	height: 100%;
}
</style>
